const express = require("express");
const router = express.Router();
const feedbackRoute = require("./feedback");
const speakerRoute = require("./speaker");


module .exports = params =>{

    const {speakerService} = params;

    router.get('/',async (request, response, next)=>
    {
        try{
            const artwork = await speakerService.getAllArtwork();
            const topSpeakers = await speakerService.getList();
            console.log(topSpeakers);
            return response.render('layout', {pageTitle: "congrats", template: "index", topSpeakers, artwork});

        }catch (err) {
            return next(err);

        }

    });

    router.use('/speakers', speakerRoute(params));
    router.use('/feedback', feedbackRoute(params));
    return router;
}

