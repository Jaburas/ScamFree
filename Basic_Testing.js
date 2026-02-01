const natural = require("natural");

const text = process.argv.slice(2).join(" ");

if (!text) {
    console.log('Usage: node predict.js "email text here"' );
    process.exit();
}
natural.BayesClassifier.load("spamClassifier.json", null, (err,classifier) => { 
    if (err) throw err;

    const result  =classifier.classify(text);
    console.log(result == "Spam" ? "This is a spam email" : "This is not a spam email");

});