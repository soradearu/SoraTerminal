from pydantic import BaseModel


class PageEvent(BaseModel):
    path: str
    timestamp: float | None = None