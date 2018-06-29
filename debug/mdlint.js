const markdownlint = require("markdownlint");
const myrule = require("../linting-rules/whitelist-mail-and-host.js");

const options = {
  "files": ["./debug/foo.md"],
  customRules: [myrule]
};

markdownlint(options, function callback(err, result) {  
  if (!err) {
    console.log(result.toString());
  }
});