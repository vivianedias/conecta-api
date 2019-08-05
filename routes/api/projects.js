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

// @route   GET api/projects/
// @desc    Get current user projects
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}
    Projects.find({ userId: req.user.id })
        .then(projects => {
            if(!projects) {
                errors.noprojects = 'Esse usuário ainda não possui nenhum projeto';
                return res.status(404).json(errors);
            }
            res.json(projects);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/projects/all
// @desc    Get projects
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
    Projects.find()
        .sort({ createdAt: -1 })
        .then(projects => {
            if(!projects) {
                errors.noprojects = 'Não existem projetos ainda'
                return res.status(404).json(errors)
            }

            res.json(projects);
        })
        .catch(err => res.status(404).json({ projects: 'Não existem projetos ainda' }));
})

// @route   GET api/projects/:id
// @desc    Get project by id
// @access  Public
router.get('/:projectId', (req, res) => {
    const errors = {};
    Projects.findById(req.params.projectId)
    .then(project => {
        if(!project) {
            errors.noprojects = 'Esse projeto não existe';
            res.status(404).json(errors);
        }
        res.json(project);
    })
    .catch(err => res.status(404).json({ project: 'Esse projeto não existe' }));
});

// @route   GET api/projects/name/:handle
// @desc    Get project by handle
// @access  Public
router.get('/name/:projectHandle', (req, res) => {
    const errors = {};
    Projects.find({ handle: req.params.projectHandle})
    .then(project => {
        if(!project) {
            errors.noprojects = 'Esse projeto não existe';
            res.status(404).json(errors);
        }
        // Remove array
        res.json(project[0]);
    })
    .catch(err => res.status(404).json({ project: 'Esse projeto não existe' }));
});

// @route   POST api/projects/
// @desc    Create user project
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    
    // Get fields
    const projectFields = {};
    projectFields.userId = req.user.id;
    projectFields.userName = req.user.name;
    if(req.body.handle) projectFields.handle = req.body.handle;
    if(req.body.name) projectFields.name = req.body.name;
    if(req.body.category) projectFields.category = req.body.category;
    if(req.body.description) projectFields.description = req.body.description;
    if(req.body.objective) projectFields.objective = req.body.objective;
    if(req.body.format) projectFields.format = req.body.format;
    if(req.body.location) projectFields.location = req.body.location;
    if(req.body.estimatedValue) projectFields.estimatedValue = req.body.estimatedValue;
    if(req.body.pictureUrl) projectFields.pictureUrl = req.body.pictureUrl;
    if(req.body.tags) projectFields.tags = req.body.tags;
    if(req.body.specialNeeds) projectFields.specialNeeds = req.body.specialNeeds;

    Projects.findOne({ user: req.user.id })
        .then(() => {
            // Create
            // Check if handle exists
            Projects.findOne({ handle: projectFields.handle })
                .then(project => {
                    if(project) {
                        errors.handle = 'Essa url já foi usada'
                        res.status(400).json(errors);
                    }
                    // Save Project
                    new Projects(projectFields).save().then(project => res.json(project));
            })
        })
        .catch(err => res.status(404).json({ newProject: 'Algo de errado ocorreu ao criar o projeto' }));
});

// @route   POST api/projects/user/:projectId
// @desc    Update user project
// @access  Private
router.post('/user/:projectId', passport.authenticate('jwt', { session: false }), (req, res) => {
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
    if(req.body.objective) projectFields.objective = req.body.objective;
    if(req.body.format) projectFields.format = req.body.format;
    if(req.body.location) projectFields.location = req.body.location;
    if(req.body.estimatedValue) projectFields.estimatedValue = req.body.estimatedValue;
    if(req.body.pictureUrl) projectFields.pictureUrl = req.body.pictureUrl;
    if(req.body.tags) projectFields.tags = req.body.tags;
    if(req.body.specialNeeds) projectFields.specialNeeds = req.body.specialNeeds;

    // Only let own user projects be updated - probably use map and filter
    //Update
    Projects.findOneAndUpdate (
        { _id: req.params.projectId },
        { $set: projectFields },
        { new: true }
    )
    .then(project => res.json(project))
    .catch(err => res.status(404).json({ updateProject: 'Um erro aconteceu ao atualizar o projeto' }));
});

module.exports = router;