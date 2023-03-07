const { playVideoIntentHandler } = require('./playVideoIntent');
const Alexa = require('ask-sdk-core');


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    playVideoIntentHandler
  )
  .lambda();
