const AJANTA = require("./ajanta/core");
const urls = require("./urls");

const settings = {
  DEBUG: true,
  ALLOWED_HOSTES: [],
  PORT: 8000
};

const ajanata = new AJANTA({ settings, urls });
ajanata.start();
