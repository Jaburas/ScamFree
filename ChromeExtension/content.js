console.log("Scam detector running");
let lastEmailtext = "";
//scanning email and sending it to AI
//This code was debugged by chat gtp
async function scanEmail(emailText) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(
            { action: "classifyEmail", text: emailText },
            (response) => {
                resolve(response);
            }
        );
    });
}
//=================
//Observing the Gmail DOM, waiting to be in email vs inbox, taking the raw text in the email
const observer = new MutationObserver(()=>{
    const emailBody = document.querySelector("div.a3s.aiL");
    if(!emailBody)return;

    const text = emailBody.innerText.trim();

    if(!text || text === lastEmailtext)return;

    lastEmailtext = text;
    

    console.log("Email opened:");
    console.log("Email text:", text);
    //Create banner if its not on screen!
    if(document.getElementById("scam-warning"))return;
    const warning = document.createElement("div");
    warning.id = "scam-warning";
    warning.innerText = "This email is being checked for scams.";

    scanEmail(text).then(result => {
    console.log("Result from background:", result);
    
    // 1. Convert to lowercase to be safe
    // 2. Check for BOTH "scam" and "spam" labels cuz Ai checks for both
    const label = result.label ? result.label.toLowerCase() : "";
    const isSuspicious = (label === "scam" || label === "spam");
    //Turn percentage
    const confidence = result.confidence ? Math.round(result.confidence * 100) : 0;
    //Show the banner depending on the result
    if (isSuspicious) {
        warning.innerText = `Scam  or Spam detected (${confidence}%)`;
        warning.style.background = "#f8d7da";
        warning.style.color = "#842029";
    } else {
        warning.innerText = `Looks safe! (${confidence}%)`;
        warning.style.background = "#d1e7dd";
        warning.style.color = "#0f5132";
    }
});

    warning.style.background = "#6FB5E7";
    warning.style.color = "#334D84";
    warning.style.padding ="10px";
    warning.style.marginBottom = "10px";
    warning.style.fontWeight = "bold";

    emailBody.prepend(warning);



    
});
observer.observe(document.body,{
    childList: true,
    subtree: true
});
//=============

