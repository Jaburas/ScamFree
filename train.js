const natural = require('natural');
const { loadEmails } = require("./CSV_Parser");
//const Classifier = new natural.BayesClassifier();

async function train() {
    const classifier = new natural.BayesClassifier();

    const emails = await loadEmails("./123.csv");
    console.log(`Loaded ${emails.length} emails`);

    emails.forEach((item) => {
        classifier.addDocument(item.text, item.label);
    });
    classifier.train();
    console.log("Training complete");

    classifier.save("spamClassifier.json", (err) => {
        if (err) console.error(err);
        else console.log("Model saved");
    });
}
train().catch(console.error);


