const express = require('express');
const path = require('path');

const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');


const app = express();

const port = 3000;
console.log("hello there");
console.log("hello there");

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));

app.use('/', express.static(path.join(__dirname, '/static' )));



app.use('/', routes(
  {
      feedbackService,
      speakerService,
  }
));

app.listen(port, ()=>{
    console.log("This port is listening");
});
