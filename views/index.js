const views = {
  ashwinView(request, response) {
    response.write("<h1>Hello Ashwin!</h1>");
    response.end();
  },
  priyankaView(request, response) {
    response.write("Hello Priyanka!");
    response.end();
  },
  sadhanaView(request, response) {
    response.write("Hello Sadhana!");
    response.end();
  },
  piuView(request, response) {
    response.write("Hello piu!");
    response.end();
  }
};

module.exports = views;
