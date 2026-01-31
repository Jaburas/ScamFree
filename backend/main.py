from fastapi import FastAPI
from pydantic import BaseModel #The Form Builder for the API

#creating an instance
app = FastAPI()

# 2. Define a 'Path Operation' (A Route)
@app.get("/") #decorator,
def read_root():
    return {"status": "Online"}

#The Contract
class ScanRequest(BaseModel):
    website_text:str
    url:str

#The Route
@app.post("/analyze")
def analyze(request: ScanRequest):
    raw_text = request.website_text #extracting 
    is_scam = "win" in raw_text.lower()