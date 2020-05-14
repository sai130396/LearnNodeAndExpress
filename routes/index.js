const express= require('express');

const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedbacks');

const router = express.Router();

module.exports = params =>{
  router.get('/', (request, response)=>
    {
      response.render('layout', {pageTitle: "Welcome", template: "index"});
    }
  );

  router.use('./speaker', speakerRoute(params));
  router.use('./feedback', feedbackRoute(params));

  return router;
};
