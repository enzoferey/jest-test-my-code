const fs = require("fs");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const jest = require("jest");

// create application/json parser
const jsonParser = bodyParser.json();

// Complements jest.config.js file
const jestConfig = {
  projects: ["."],
  silent: true // no console from tests
};

app.post("/", jsonParser, (req, res) => {
  if (!req.body) res.end();

  const token = Math.floor(Math.random() * 1000) + 1; // random number between 1 and 1000, could be a unique idetifier for each user

  // Write the code to test
  const filePath = `./__tests__/tmp/setup${token}.js`;
  const code = req.body.code; // "const add = (a, b) => a + b;"
  const fileContent = code + "\n\nglobal.add = add";

  fs.writeFileSync(filePath, fileContent);

  // Setup the file to set global function to be used in the tests
  jestConfig.setupTestFrameworkScriptFile = filePath;

  // Run Jest and send back the result
  jest.runCLI(jestConfig, jestConfig.projects).then(result => {
    res.send({ success: result.results.success });
  });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
