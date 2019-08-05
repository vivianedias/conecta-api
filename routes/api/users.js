const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

// Load Input Validation
const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');
// Load User model
const User = require('../../models/Users');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	
	//Check Validation
	if(!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
		errors.email = 'Email already exists'
		return res.status(400).json(errors);
		} else {
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			birthday: req.body.birthday,
			gender: req.body.gender,
			color: req.body.gender,
			state: req.body.state,
			city: req.body.city,
			currentField: req.body.currentField,
			socialNumber: req.body.socialNumber
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser
				.save()
				.then(user => res.json(user))
				.catch(err => console.log(err));
			});
		});
		}
	});
	});

	// @route   GET api/users/login
	// @desc    Login User / Returning JWT Token
	// @access  Public
	router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

		//Check Validation
		if(!isValid) {
		return res.status(400).json(errors);
		}

		const email = req.body.email;
		const password = req.body.password;

		// Find user by email
		User.findOne({ email }).then(user => {
		// Check for user
		if (!user) {
			errors.email = 'Usuário não encontrado'
			return res.status(400).json(errors);
		}
	
		// Check Password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User Matched
				// Create JWT Payload
				const payload = { id: user.id, name: user.name, email: user.email }; 

				// Sign Token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token
					});
					}
				);
			} else {
			errors.password = 'Senha incorreta';
			return res.status(400).json(errors);
			}
		});
		});
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
	router.get('/current',
		passport.authenticate('jwt', { session: false }),
		(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
		}
	);

// @route   POST api/users/forgot-password
// @desc    Send email to reset password
// @access  Public
router.post('/forgot-password', (req, res) => {
	const errors = {}
	const email = req.body.email;
	const token = crypto.randomBytes(20).toString('hex');

	const update = { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }

	//Update
	User.findOneAndUpdate(
		{ email: req.body.email },
		{ $set: update },
		{ new: true }
	)
	.then(user => res.json(user))
	.catch(err => res.status(404).json({ setToken: 'Um erro aconteceu ao atualizar o código de recuperação' }));

	User.findOne({ email })
		.then(user => {
			// Check for user
			if (!user) {
				errors.email = 'Usuário não encontrado'
				return res.status(400).json(errors);
			}
			
			sgMail.setApiKey(keys.SENDGRID_API_KEY);

			const msg = {
				to: email,
				from: 'abebe.conecta@gmail.com',
				subject: 'Recuperação de Senha - Abebe Conecta',
				text: 'Você está recebendo esse e-mail porque você (ou outra pessoa) fez um pedido de recuperação de senha para sua conta. \n\n' +
				'Por favor, clique no link abaixo ou cole em seu navegador para completar o processo: \n\n' +
				'http://' + req.headers.host + '/reset/' + token + '\n\n' +
				'Se você não fez essa requisição, por favor ignore esse email e sua senha se manterá a mesma. \n'
			};
			
			sgMail.send(msg)
			.then(() => res.json('Se esse e-mail estiver cadastrado em nossa base de usuários, enviaremos um e-mail com as instruções para redefinir sua senha :)'))
			.catch(err => res.status(404).json({ sendEmail: 'Um erro ocorreu ao enviar o código de restauração' }))
		})
		.catch(err => res.status(404).json({ findUser: 'Um erro ocorreu ao tentar encontrar esse usuário' }));
});

// router.post('/reset/:token', (req, res, next) => {

// 		// if passwords don't match, flash error and send back to form
// 		if (req.body.password != req.body['password-confirm']) {
// 			req.flash('error', 'Passwords do not match!');
// 			res.redirect('/users/change-password');  // insert actual form URL
// 			return; // we're done handling the route, exit function
// 		}

// 		// if we get to here, the passwords match
// 		User.findOne({
// 		resetPasswordToken: req.params.token,
// 		resetPasswordExpires: {
// 			$gt: Date.now()
// 		}
// 		}, function(err, user) {
// 		if (!user) {
// 			req.flash('error', ' Password reset is invalid or has expired');
// 			res.redirect(302, '/login');
// 		}

// 		const setPassword = promisify(user.setPassword, user);
// 		setPassword(req.body.password);
// 		user.resetPasswordToken = undefined;
// 		user.resetPasswordExpires = undefined;
// 		const updatedUser = user.save();
// 		req.login(updatedUser);
// 		req.flash('success_msg', 'Your password has been reset successfully! You are now logged in!');
// 		res.redirect('/dashboard');
// 		});
// });

module.exports = router;