const Joi = require('joi');

const registerSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
});

const updateUserSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Admin & Member
const registerAdminMemberSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('member'),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const updateUserAdminSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('admin', 'member'),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const updateUserMemberSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('member'),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

module.exports = {
	registerSchema,
	loginSchema,
	updateUserSchema,
	registerAdminMemberSchema,
	updateUserAdminSchema,
	updateUserMemberSchema,
};
