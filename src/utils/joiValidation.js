const Joi = require('joi');

//! LOGIN
const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
});

//! Superadmin
const onlySuperAdmin = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlySuperAdminUpdate = Joi.object({
	name: Joi.string().max(60),
	role: Joi.string().valid('superadmin', 'admin', 'member'),
	email: Joi.string().email(),
	password: Joi.string().min(8).alphanum(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Admin & Member
const onlyMemberAndAdmin = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required().valid('member'),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlyMemberUpdate = Joi.object({
	name: Joi.string().max(60),
	role: Joi.string().valid('member'),
	email: Joi.string().email(),
	password: Joi.string().min(8).alphanum(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlyAdminUpdate = Joi.object({
	name: Joi.string().max(60),
	role: Joi.string().valid('admin', 'member'),
	email: Joi.string().email(),
	password: Joi.string().min(8).alphanum(),
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

const carUpdateSchema = Joi.object({
	plate: Joi.string().max(15),
	manufacture: Joi.string().max(40),
	rentPerDay: Joi.number().min(0),
	capacity: Joi.string().valid('2', '4', '6'),
	description: Joi.string(),
	availableAt: Joi.string(),
	available: Joi.boolean(),
	type: Joi.string(),
	year: Joi.string().max(4),
	transmission: Joi.string(),
});

module.exports = {
	loginSchema,
	onlySuperAdmin,
	onlySuperAdminUpdate,
	onlyMemberAndAdmin,
	onlyMemberUpdate,
	onlyAdminUpdate,
	carSchema,
	carUpdateSchema,
};
