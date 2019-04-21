const http = require("http");
const url = require("url");

class AJANTA {
  constructor({ settings, urls }) {
    this.$urls = urls;
    this.$settings = settings;
    console.log("AJANTA INSTANCE CREATED");
  }
  start() {
    const server = http.createServer();
    server.on("request", (request, response) =>
      this.processRequest(request, response)
    );
    server.listen(this.$settings.PORT, () => {
      console.log(`Server listening at ${this.$settings.PORT}`);
    });
  }
}

AJANTA.prototype.processRequest = function(request, response) {
  // const { headers, url, method } = request;
  const args = {};
  const pathArray = url
    .parse(request.url)
    .pathname.split("/")
    .filter(el => el);
  const view = this.$urls.reduce(
    (view, url) => view || url.match(pathArray, args),
    false
  );
  if (view) view(request, response, args);
  else {
    // Do something if no Match if Found
    function noViewFound(request, response, args) {
      response.write("No View Found for URL<br>");
      response.write(` args: ${JSON.stringify(args)}`);
      response.end();
    }
    noViewFound(request, response, args);
  }
};

module.exports = AJANTA;
