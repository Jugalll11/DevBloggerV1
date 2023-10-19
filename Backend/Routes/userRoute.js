const {getAllUsers, Register, getID, getPFP, getUser, updateUserProfile, getProfile} = require('../Controllers/userController')
const router = require('express').Router();
const express = require("express");

router.use(express.json());
router.use(express.urlencoded());

router.post('/register', Register);
router.post('/getAllUsers', getAllUsers);
router.post('/getID', getID);
router.post('/getPFP', getPFP);
router.post('/getUser', getUser);
router.post('/updateUser', updateUserProfile);
router.post('/getProfile', getProfile);

module.exports = router;