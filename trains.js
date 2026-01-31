console.log(`Loaded ${emails.length} emails`);

emails.forEach((item) => {
  classifier.addDocument(item.text, item.label);
});

console.log("Starting training...");
console.time("train");
classifier.train();
console.timeEnd("train");

console.log("Saving model...");
classifier.save("spamClassifier.json", (err) => {
  if (err) console.error(err);
  else console.log("Model saved");
});
