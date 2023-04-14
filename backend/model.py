from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class Club(BaseModel):
    """Hold information about clubs or organizations."""
    name: str
    description: str
    email: str
    status: bool
    size: int
    tags: Optional[List[str]] = None

class Event(BaseModel):
    """Hold Information about events."""
    clubName: str
    name: str
    description: str
    date: datetime
