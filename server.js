const express = require("express");
const cors = require("cors");
const natural = require("natural");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

function getTriggers(text) {
  const t = (text || "").toLowerCase();

const rules = [
    //chat startt
  {
    name: "Urgency",
    patterns: ["urgent", "immediately", "act now", "final notice"],
    explain: "Creates urgency to pressure you into acting quickly"
  },//chat end
  {
    name: "Account threat",
    patterns: ["unauthorized", "suspended", "locked", "disabled"],
    explain: "Claims there is a problem with your account"
  },
  {
    name: "Sensitive info request",
    patterns: ["login", "password", "verify", "code", "otp"],
    explain: "Asks you to verify or provide sensitive information"
  },
  {
    name: "Too good to be true",
    patterns: ["won", "winner", "free", "prize", "gift"],
    explain: "Promises rewards that seem too good to be true"
  }
];

  const reasons = [];

  // basic link check
  const hasLink = /https?:\/\/|www\./i.test(text);
  if (hasLink) reasons.push("Contains a link");

  for (const rule of rules) {
    const hits = rule.patterns.filter(p => t.includes(p));
    if (hits.length) reasons.push(`${rule.name} (Reason: ${hits.slice(0, 2).join(", ")})`);
    if (reasons.length >= 6) break; // keep it short
  }

  return reasons;
}
//chat end





const MODEL_PATH = path.join(__dirname, "spamClassifier.json");


let classifier;
natural.BayesClassifier.load(MODEL_PATH, null, (err, loaded) => {
  classifier = loaded;
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/classify", (req, res) => {
  const text = (req.body.text || "").toString().trim();

  const label = classifier.classify(text);
  const scores = classifier.getClassifications(text);
  const total = scores.reduce((sum, s) => sum + s.value, 0) || 1;
  const confidence = (scores[0].value / total);

  const reasons = getTriggers(text);

  res.json({
    risk: label === "Spam" ? "Scam" : "Safe",
    label,
    confidence,
    reasons
  });
});


app.listen(3002, () => {
  console.log("app listening on port 3002");
});
