chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "classifyEmail") {
    // The background script does the actual fetch
    fetch("http://localhost:3003/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: request.text })
    })
    .then(res => res.json())
    .then(data => sendResponse(data))
    .catch(err => sendResponse({ error: err.message }));
    
    return true; // Keeps the connection open for the async response
  }chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "classifyEmail") {
        // Use the link your friend gave you here
        fetch("http://localhost:3003/classify", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: request.text })
        })
        .then(res => res.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({ error: "Server not found", details: err }));

        return true; // Keeps the line open for the async response
    }
});
});