const axios = require('axios');

const playVideoIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'PlayVideoIntent'
    );
  },
  async handle(handlerInput) {
    const video = handlerInput.requestEnvelope.request.intent.slots.video.value;
    const apiKey = process.env.YOUTUBE_API_KEY;

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${encodeURIComponent(
      video
    )}&type=video`;

    const { data } = await axios.get(searchUrl);
    const videoId = data.items[0].id.videoId;

    const url = `https://www.youtube.com/embed/${videoId}`;

    const speechOutput = `Playing ${video} on YouTube`;
    const displayUrl = {
      templateToken: 'videoPlayer',
      values: {
        url,
      },
    };

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.4',
        document: require('./videoPlayer.json'),
        datasources: {
          data: displayUrl,
        },
      })
      .getResponse();
  },
};

module.exports = {
  playVideoIntentHandler,
};
