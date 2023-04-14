from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Club(BaseModel):
  name: str
  description: str
  email: str
  status: bool
  size: int
  tags: Optional[List[str]] = None

class Event(BaseModel):
  clubName: str
  name: str
  description: str
  date: datetime
  