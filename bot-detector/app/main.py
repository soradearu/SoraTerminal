import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import (
    initialize_database,
    save_event,
    get_recent_events,
)

from .detector import analyze_request

from .models import PageEvent


app = FastAPI(
    title="Sora Bot Detection API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://soradearu.github.io",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

initialize_database()


@app.get("/")
def root():

    return {
        "name": "Sora Bot Detection API",
        "status": "online",
    }


@app.post("/events")
def receive_event(event: PageEvent):

    timestamp = (
        event.timestamp
        if event.timestamp is not None
        else time.time()
    )

    result = analyze_request(
        event.path
    )

    save_event(
        timestamp=timestamp,
        path=event.path,
        event_type="PAGE_VIEW",
        classification=result["classification"],
        score=result["score"],
    )

    return {
        "path": event.path,
        "classification": result["classification"],
        "score": result["score"],
        "reasons": result["reasons"],
    }


@app.get("/events")
def events():

    return get_recent_events()