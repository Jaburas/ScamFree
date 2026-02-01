console.log("Scam detector running");
let lastEmailtext = "";
//Observing the Gmail DOM, waiting to be in email vs inbox, taking the raw text in the email
const observer = new MutationObserver(()=>{
    const emailBody = document.querySelector("div.a3s.aiL");
    if(!emailBody)return;

    const text = emailBody.innerText.trim();

    if(!text || text === lastEmailtext)return;

    lastEmailtext = text;

    console.log("Email opened:");
    console.log("Email text:", text);
    if(document.getElementById("scam-warning"))return;
    const warning = document.createElement("div");
    warning.id = "scam-warning";
    warning.innerText = "This email is being checked for scams.";


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

