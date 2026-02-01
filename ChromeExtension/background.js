chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "classifyEmail") {
    // Calling your Node.js server on port 3002
    fetch("http://localhost:3002/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: request.text })
    })
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      // Ensure we send back the exact keys the content script expects
      sendResponse({ 
        label: data.label || "safe", 
        confidence: data.confidence ?? 0 
      });
    })
    .catch(err => {
      console.error("Fetch error:", err);
      sendResponse({ label: "error", confidence: 0, details: err.message });
    });
    
    return true; // Keeps the channel open for the async fetch
  }
});
