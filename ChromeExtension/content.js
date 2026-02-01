console.log("Scam detector running");
let lastEmailtext = "";
//scanning email and sending it to AI
async function scanEmail(emailText){
    const res = await fetch("http://localhost:3003/classify",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: emailText
        })
    });
    return await res.json();
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
    if(document.getElementById("scam-warning"))return;
    const warning = document.createElement("div");
    warning.id = "scam-warning";
    warning.innerText = "This email is being checked for scams.";

    scanEmail(text).then(result => {
        console.log(result);
        if(result.label === "scam"){
            warning.innerText =`Scam detected(${Math.round(result.confidence*100)}%)`;
            warning.style.background = "#f8d7da";
            warning.style.color ="#842029";
        }else{
            warning.innerText =`Looks safe!(${Math.round(result.confidence*100)}%)`;
            warning.style.background = "#d1e7dd";
            warning.style.color ="#0f5132";

        }
    })

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

