from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

app = FastAPI()

# =========================
# CORS FIX
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://aether-theta-two.vercel.app",
    "http://127.0.0.1:5173"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# REQUEST MODEL
# =========================

class PromptRequest(BaseModel):
    prompt: str

# =========================
# AI CHAT ENDPOINT
# =========================

@app.post("/ask-ai")
async def ask_ai(data: PromptRequest):

    try:

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": data.prompt
                }
            ]
        )

        return {
            "response":
            response.choices[0].message.content
        }

    except Exception as e:

        return {
            "response":
            f"AI Error: {str(e)}"
        }

# =========================
# PRODUCTIVITY INSIGHTS
# =========================

@app.get("/productivity-insights")
async def productivity_insights():

    insights = [
        "Productivity increased by 18% this week.",
        "3 tasks are overdue.",
        "AI recommends reducing meeting load tomorrow.",
        "Focus hours detected between 2 PM and 5 PM.",
        "Team collaboration score improved this month."
    ]

    return {
        "insights": insights
    }