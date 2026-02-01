const express = require("express");
const cors = require("cors");
const natural = require("natural");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const MODEL_PATH = path.join(__dirname, "spamClassifier.json");

// Load model ONCE
let classifier;
natural.BayesClassifier.load(MODEL_PATH, null, (err, loaded) => {
  classifier = loaded;
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/classify", (req, res) => {
  const text = (req.body.text || "").toString().trim();
//chat 
  const label = classifier.classify(text);

  const scores = classifier.getClassifications(text);
  const total = scores.reduce((sum, s) => sum + s.value, 0) || 1;
  const confidence = Math.round((scores[0].value / total) * 100);

  res.json({
    risk: label === "Spam" ? "Scam" : "Safe",
    label,
    confidence
  });
});
//end

app.listen(3002, () => {
  console.log("app listening on port 3002");
});
