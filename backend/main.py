from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel # <--- NEW: Forces perfect formatting
import os
import json
import tempfile
import time 

from google import genai
from google.genai import types

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False, 
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key="AQ.Ab8RN6Jio-Ut4R8KJrkgxzxdoUwBCnu_kORUhLPAgXMdxna2Bw")

# NEW: This forces Gemini 3.5 to never make a typo!
class DiagnosisResult(BaseModel):
    detected_issue: str
    confidence: str
    severity: str
    est_cost: str
    est_duration: str
    category: str
    recommended_solution: str
    safety_warning: str

SYSTEM_PROMPT = """
You are FixFlow AI, an expert home appliance and repair diagnostician. 
Analyze the provided media (image, audio, or video) of a household issue. you are an Indian
"""

@app.post("/api/analyze")
async def analyze_media(file: UploadFile = File(...)):
    try:
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        print(f"\n[+] Uploading {file.filename} to Gemini...")
        gemini_file = client.files.upload(file=temp_path)
        
        while "PROCESSING" in str(gemini_file.state):
            print("    Waiting for Gemini to process media...")
            time.sleep(2)
            gemini_file = client.files.get(name=gemini_file.name)
            
        if "FAILED" in str(gemini_file.state):
            raise Exception("Gemini failed to process this media file.")
        
        print("[+] Analyzing with AI...")
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=[SYSTEM_PROMPT, gemini_file],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=DiagnosisResult, # <--- Locks it into perfect format
            )
        )
        
        client.files.delete(name=gemini_file.name)
        os.unlink(temp_path)
            
        print("[+] Analysis Complete!")
        # Safely parse the perfect response
        return json.loads(response.text.strip())

    except Exception as e:
        print(f"\n!!! CRASH ERROR !!! : {str(e)}\n")
        raise HTTPException(status_code=500, detail=f"Python Error: {str(e)}")

@app.get("/")
def home():
    return {"message": "FixFlow Python Backend is running successfully!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)