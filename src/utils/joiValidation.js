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

const updateUserAdminMemberSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('admin', 'member'),
	email: Joi.string().email(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const updateUserMemberSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('member'),
	email: Joi.string().email(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Cars
const carSchema = Joi.object({
	plate: Joi.string().max(15).required(),
	manufacture: Joi.string().max(40).required(),
	rentPerDay: Joi.number().min(0).required(),
	capacity: Joi.string().valid('2', '4', '6').required(),
	description: Joi.string().required(),
	availableAt: Joi.string().required(),
	available: Joi.boolean().required(),
	type: Joi.string().required(),
	year: Joi.string().max(4).required(),
	transmission: Joi.string().required(),
});

module.exports = {
	registerSchema,
	loginSchema,
	updateUserSchema,
	registerAdminMemberSchema,
	updateUserAdminMemberSchema,
	updateUserMemberSchema,
	carSchema,
};
