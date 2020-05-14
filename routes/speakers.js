const express= require('express');
const app=express();
const router = express.Router();


module.exports = params =>{

  const {speakerService} = params;

  router.get('/', async (request, response)=>
    {
      const speakers= await speakerService.getList();
      return response.json(speakers);
    }
  );

  router.get('/:shortname',(request, response)=>{
    return response.send(`form has ${request.params.shorthand}`);
  });

  return router;
};
