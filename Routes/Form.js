const express = require('express');
const passport = require('passport');
const FormRoutes = express.Router();
const FormController = require('../Controller/Form');
FormRoutes.get('/getpublishedpages/:id',FormController.getPublishedPages);
FormRoutes.post('/saveformresponse', FormController.saveFormResponse);

FormRoutes.use(passport.authenticate('jwt', { session: false }));
FormRoutes.post('/createform', FormController.createForm);
FormRoutes.patch('/updateform', FormController.updateForm);
FormRoutes.delete('/deleteform', FormController.deleteForm); 
FormRoutes.get('/getforms',FormController.getAllUserForms);
FormRoutes.get('/getformpages/:id',FormController.getFormPages);
FormRoutes.get('/getformresponses/:id',FormController.getResponsesofForms);
module.exports = FormRoutes;