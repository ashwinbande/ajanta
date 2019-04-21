const URL = require("./ajanta/url");
const views = require("./views");

const urls = [
  new URL({
    path: "ashwin",
    name: "ashwin",
    view: views.ashwinView,
    children: [
      new URL({ path: "priyanka", name: "priyanka", view: views.priyankaView }),
      new URL({ path: "sadhana", name: "sadhana", view: views.sadhanaView })
    ]
  }),
  new URL({ path: "priyanka/name", name: "piu", view: views.piuView }),
  new URL({
    path: "<str:name>/ofage/<int:id>",
    name: "piu",
    view: views.piuView
  })
];

module.exports = urls;
