
from pydantic import BaseModel
from typing import List, Optional

class Club(BaseModel):
  name: str
  description: str
  size: int
  status: bool
  email: str
  tags: Optional[List[str]] = None
  