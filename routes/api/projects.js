const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateProjectInput = require('../../validator/project');
// Load Profile Model
const Projects = require('../../models/Projects');
// Load User Profile
const User = require('../../models/Users');

// @route   GET api/projects/test
// @desc    Tests projects route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Projects Works' }));

// @route   GET api/projects/
// @desc    Get current users projects
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}
    Projects.findOne({ user: req.user.id })
        .then(project => {
            if(!project) {
                errors.noprojects = 'Esse usuário ainda não possui nenhum projeto';
                return res.status(404).json(errors);
            }
            res.json(project);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/projects/
// @desc    Create user project
// @access  Private
// TODO: PROBLEMA -> NÃO ESTÁ ADICIONANDO!
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    
    // Get fields
    const projectFields = {};
    projectFields.user = req.user.id;
    if(req.body.handle) projectFields.handle = req.body.handle;
    if(req.body.name) projectFields.name = req.body.name;
    if(req.body.category) projectFields.category = req.body.category;
    if(req.body.description) projectFields.description = req.body.description;
    if(req.body.format) projectFields.format = req.body.format;
    if(req.body.location) projectFields.location = req.body.location;
    if(req.body.estimatedValue) projectFields.estimatedValue = req.body.estimatedValue;
    if(req.body.pictureUrl) projectFields.pictureUrl = req.body.pictureUrl;

    // Special Needs - Split into array
    if(typeof req.body.specialNeeds !== 'undefined') {
        projectFields.specialNeeds = req.body.specialNeeds.split(',');
    }
    // Tags - Split into array
    if(typeof req.body.tags !== 'undefined') {
        projectFields.tags = req.body.tags.split(',');
    }

    Projects.findOne({ user: req.user.id })
        .then(project => {
            if(project) {
                 //Update
                 Projects.findOneAndUpdate (
                     { user: req.user.id },
                     { $set: projectFields },
                     { new: true }
                 ).then(project => res.json(project));
            } else {
                // Create
                // Check if handle exists -> TALVEZ REMOVER ISSO POIS UM USUARIO PODE TER VARIOS PROJETOS
                Projects.findOne({ handle: projectFields.handle })
                    .then(project => {
                        if(project) {
                            errors.handle = 'Esse handle já existe'
                            res.status(400).json(errors);
                        }
                        // Save Project
                        new Projects(projectFields).save().then(project => res.json(project));
                })
            }
        })
});

module.exports = router;