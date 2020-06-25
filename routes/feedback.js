const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");

const validations = [check('name').trim().isLength({min: 3}).escape().withMessage('Name is required'),
    check('email').trim().isEmail().normalizeEmail().withMessage('Valid Email is required'),
    check('title').trim().isLength({min: 3}).escape().withMessage('Title is required'),
    check('message').trim().isLength({min: 3}).escape().withMessage('Message is required'),];

module .exports = params =>{
    const {feedbackService} = params;

    router.get('/', async (request, response, next)=>
    {
        try{
            const feedback =  await feedbackService.getList();
           const errors = request.session.feedback ? request.session.feedback.errors : false;
            const success = request.session.feedback ? request.session.feedback.message : false;
          request.session.feedback = {};

            console.log(feedback);
            return response.render('layout', {pageTitle: "congrats", template: "feedback", feedback, errors});
        }
        catch(err){
            return next(err);
        }

    });
    router.post('/', validations ,async (request, response, next)=>{
        try{
            const errors = validationResult(request);

            if(!errors.isEmpty()){
                request.session.feedback = {
                    errors: errors.array(),
                };
                return response.redirect('/feedback');
            }
            return response.send("Feedback errors");

            const{name, email, title, message} = request.body;
            await feedbackService.addEntry(name, email, title, message);
            request.session.feedback = {
                message: "Thanks",
            };
        }catch(err){
            return next(err);
        }


    });

    router.post('/api', validations, async (request, response, next)=>{
        try{
            const errors= validationResult(request);
            if(!errors.isEmpty()){
                return response.json({errors: errors.array()});
            }
            const{name, email, title, message} = request.body;
            await feedbackService.addEntry(name, email, title, message);
            const feedback = await feedbackService.getList();
            return response.json({feedback});


        }catch(err){
            return next(err);
        }
    });
    return router;
};
