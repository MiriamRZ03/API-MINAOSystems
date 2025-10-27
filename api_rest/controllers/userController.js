const { request, response } = require("express");
const { generateJWT } = require('../utils/createJWT');
const HttpStatusCodes = require('../utils/enums');
const e = require ("express");
const { createUser, findUserByEmail, login } = require("../database/dao/userDAO");

const resetTokens = {};

const registerUser = async (req, res = response) => {
    const {userName, paternalSurname, maternalSurname, email, userPassword, userType } = req.body;
    const nameValidation = validateRegisterInput(req.body);
    if (!nameValidation.valid) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: nameValidation.message
        });
    }
     const loginValidation = validateLoginInput({ email, userPassword });
    if (!loginValidation.valid) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: loginValidation.message
        });
    }

    if (!userName || !paternalSurname || !maternalSurname || !email || !userPassword || !userType){
         return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: "Invalid data, please resubmit your request."
        });
    }

    try{
        const existingEmail = await findUserByEmail(email);
        if (existingEmail){
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                error: true,
                statusCode: HttpStatusCodes.BAD_REQUEST,
                details: "The email has already been registered"
            });
        }

        const newUser = {
            userName, paternalSurname, maternalSurname, email, userPassword, userType
        };

        const result = await createUser(newUser);
        return res.status(HttpStatusCodes.CREATED).json({
            message: "The user has registered successfully",
            email: result.email
        });
    } catch (error){
        console.error(error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error creating new user. Try again later"
        });
    }
};

const validateName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]{1,69}$/;
const validateRegisterInput = (data) => {
    const {userName, paternalSurname, maternalSurname, userType } = data;
    if(!userName|| !userName.match(validateName)){
        return {valid: false, message: "Invalid name. Please provide a valid name (must contain at least 1 to 69 characters, only Spanish alphabet characters and spaces)."};
    }
    if(!paternalSurname|| !paternalSurname.match(validateName)){
        return {valid: false, message: "Invalid name. Please provide a valid paternal surname (must contain at least 1 to 69 characters, only Spanish alphabet characters and spaces)."};
    }
    if(!maternalSurname|| !maternalSurname.match(validateName)){
        return {valid: false, message: "Invalid name. Please provide a valid maternal surname (must contain at least 1 to 69 characters, only Spanish alphabet characters and spaces)."};
    }
    if(userType !== 'Student' && userType !== 'Instructor'){
        return { valid: false, message: "Invalid role. Role must be either 'Student' or 'Instructor'." };
    }
    return { valid: true };
};

const validateMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const validateLoginInput = (email, userPassword) => {
    if(!email || !email.match(validateMail)){
        return {valid: false, message: "Invalid email. Please provide a new email address."};
    }
    if(!userPassword || typeof userPassword !== 'string' || userPassword.trim() ===''){
        return { valid: false, message: "Invalid password. Please provide a valid password." };
    }
    return { valid: true };
};

const userLogin = async (req, res = response) => {
    const {email, userPassword} = req.body;
    const validation = validateLoginInput(email, userPassword);

    if (!validation.valid) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            statusCode: HttpStatusCodes.BAD_REQUEST,
            details: validation.message
        });
    }

    try{
        const user = await login(email, userPassword);
        if(user==null){
            res.status(HttpStatusCodes.BAD_REQUEST).json({
                error: true,
                statusCode: HttpStatusCodes.BAD_REQUEST,
                details: "Invalid credentials, please check your username and password and try again"
            });
            return;
        }
        const token = await generateJWT(email);
        res.status(HttpStatusCodes.CREATED)
                .json({
                    token,
                    ...user
                });
    }catch(error){
        console.error(error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            details: "Error logging in. Try again later"
        });
    }
}

module.exports = {registerUser, userLogin};