const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const path = require('path');

//Load Validation
const validateProjectInput = require('../../validator/project');
// Load Update Project Validation
const validateUpdateProject = require('../../validator/updateProject');
// Load Project Model
const Projects = require('../../models/Projects');
// Load Images Model
const Images = require('../../models/Images');

//Set storage engine
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb) {
		cb(null, 
			file.fieldname + 
			'-' + 
			Date.now() + 
			path.extname(file.originalname)
		);
	}
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5000000,
	},
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb);
	}
}).single('projectImg')

//Check file type
const checkFileType = (file, cb) => {
	// Allow ext
	const fileTypes = /jpeg|jpg|png|gif/;

	//Check ext
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	//Check mime
	const mimetype = fileTypes.test(file.mimetype);
	if(mimetype && extname) {
		return cb(null, true)
	} else {
		cb('Erro: Insira apenas imagens');
	};
}

// @route   POST api/projects/upload
// @desc    Upload project img
// @access  Private
router.post('/upload', passport.authenticate('jwt', { session: false }),
	(req, res) => {
		upload(req, res, (err) => {
			const errors = {}

			if(err) {
				return res.status(404).json(err);			
			}

			if(!req.file) {
				errors.upload = 'Insira uma foto de capa para seu projeto';
				return res.status(400).json(errors);				
			}

			// Save Img
			new Images({ ...req.file, userId: req.user.id })
				.save()
					.then(img => res.json({
						msg: 'Upload da imagem foi bem sucedido!',
						file: `uploads/${img.filename}`,
						id: img._id
					}))
				.catch(err => res.status(404).json(err));				
		});
})

// @route   GET api/projects/image
// @desc    Get project img
// @access  Public
router.get('/image/:id', (req, res) => {
	const errors = {};
	Images.findById(req.params.id)
		.then(img => {
			console.log(img);
			res.send(img);
		})
})

// @route   GET api/projects/
// @desc    Get current user projects
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), 
	(req, res) => {
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
	}
);

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
		.catch(err => res.status(404).json({ 
			projects: 'Não existem projetos ainda' 
		}));
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
router.post('/', passport.authenticate('jwt', { session: false }), 
	(req, res) => {
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
    if(req.body.img) projectFields.img = req.body.img;
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
						new Projects(projectFields).save()
							.then(project => res.json(project));
					})
			})
			.catch(err => res.status(404).json({ 
				newProject: 'Algo de errado ocorreu ao criar o projeto' 
			}));
	}
);

// @route   POST api/projects/user/:projectHandle
// @desc    Update user project
// @access  Private
router.post('/user/:projectHandle', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    const { errors, isValid } = validateUpdateProject(req.body);

    // Check Validation
    if(!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
    }
    
    // Get fields
    const projectFields = {};
    if(req.body.category) projectFields.category = req.body.category;
    if(req.body.description) projectFields.description = req.body.description;
    if(req.body.objective) projectFields.objective = req.body.objective;
    if(req.body.format) projectFields.format = req.body.format;    
    if(req.body.location) projectFields.location = req.body.location;
    if(req.body.estimatedValue) projectFields.estimatedValue = req.body.estimatedValue;
    if(req.body.tags) projectFields.tags = req.body.tags;

    // Only let own user projects be updated - probably use map and filter
    //Update project
    Projects.findOneAndUpdate (
			{ handle: req.params.projectHandle },
			{ $set: projectFields },
			{ new: true }
    )
    .then(project => res.json(project))
    .catch(err => res.status(404).json({ 
			updateProject: 'Um erro aconteceu ao atualizar o projeto' 
    }));
	}
);

module.exports = router;