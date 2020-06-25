const express = require("express");
const router = express.Router();

module .exports = params =>{
    const {speakerService} = params;
    router.get('/',async (request, response, next)=>
    {
        try{
            const speakers = await speakerService.getList();
            const artwork = await speakerService.getAllArtwork();
            return response.render('layout', {pageTitle: "Speakers", template: "speakers", speakers, artwork});
        }catch(err){
            return next(err);
        }

    });
    router.get('/:shortname',async (request, response,next)=>{
        try{
            const speaker = await speakerService.getSpeaker(request.params.shortname);
            console.log(speaker);
            const artwork = await speakerService.getArtworkForSpeaker(request.params.shortname);
            console.log(artwork);
            return response.render('layout', {pageTitle: "Speaker's details", template: "speaker-details", speaker, artwork});
        }catch(err){
            return next(err);
        }
    });
    return router;
};
