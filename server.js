const express = require("express");
const app= express();
const port = 3000;
const path = require('path');
const routes = require('./routes');
const httpError = require("http-errors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'session',
    keys: ['fasjfkjd3fjhsd','dfhj28ur233290'],
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = "ROUX meetups";
 app.use(express.static(path.join(__dirname, "./")));

 app.use(async (request, response, next) =>{
     try{
         const names = await speakerService.getNames();
         response.locals.speakerNames = names;
         return next();
     }catch(err){
         return next(err);
     }
});

 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());

app.use('/', routes({
    feedbackService,
    speakerService,
})
);

app.use((request, response, next)=>{
    return next(httpError(404, "page not found"));
});

app.use((err, request, response)=>{
    response.locals.message = err.message;
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
});
app.listen(port, ()=>{
    console.log(`Express is listening $(port)`);
})
