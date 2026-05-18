"""
routes/chat.py — AI-powered chatbot for the Blood Donation Management System.

Uses the Anthropic Claude API to answer blood-donation-related questions:
  - Eligibility queries ("Can I donate if I took aspirin?")
  - Blood group compatibility ("Who can receive O- blood?")
  - Camp information guidance
  - General donation FAQs

POST /chat/message  — send a message, get an AI reply (with history support)
"""

import os
import httpx
from fastapi import APIRouter, HTTPException
from app.schemas import ChatRequest, ChatMessage

router = APIRouter(prefix="/chat", tags=["AI Chat"])

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
MODEL = "claude-sonnet-4-20250514"

SYSTEM_PROMPT = """You are a helpful assistant for a Blood Donation Management System (BDMS).
Your role is to help users with:
- Blood donation eligibility (age, health conditions, medications, waiting periods)
- Blood group compatibility and transfusion information
- How to register as a donor or find blood for a patient
- Information about donation camps and how to participate
- General facts about blood donation, safety, and benefits

Keep answers concise, accurate, and compassionate. If asked something outside your scope
(e.g. general medical diagnoses), politely redirect the user to consult a doctor.
Do not invent specific camp dates or donor contact details — guide users to use the app features instead.
"""


@router.post("/message")
async def chat_message(request: ChatRequest):
    """
    Send a message to the AI assistant and receive a response.
    Pass `history` to maintain conversation context across turns.
    """
    if not ANTHROPIC_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="AI chat is not configured. Set the ANTHROPIC_API_KEY environment variable."
        )

    # Build message list: history + current message
    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in request.history
    ]
    messages.append({"role": "user", "content": request.message})

    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }

    payload = {
        "model": MODEL,
        "max_tokens": 1024,
        "system": SYSTEM_PROMPT,
        "messages": messages,
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(ANTHROPIC_API_URL, json=payload, headers=headers)
            resp.raise_for_status()
            data = resp.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"AI API error: {e.response.text}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Could not reach AI service: {str(e)}")

    reply = data["content"][0]["text"]

    # Return the reply and updated history so the client can track context
    updated_history = request.history + [
        ChatMessage(role="user", content=request.message),
        ChatMessage(role="assistant", content=reply),
    ]

    return {
        "reply": reply,
        "history": updated_history,
    }
