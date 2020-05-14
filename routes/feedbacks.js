const express= require('express');
const router = express.Router();


module.exports = params =>{

  const {feedbackService} = params;

  router.get('/', (request, response)=>
    {
      const feedback = feedbackService.getList();
      return response.json(feedback);
    }
  );

  router.post('/',(request, response)=>{
    return response.send(`form has been posted`);
  });

  return router;
};
