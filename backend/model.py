from pydantic import BaseModel
from typing import List, Optional

class Model(BaseModel):
  name: str
  description: str
  email: str
  status: bool
  size: int
  tags: Optional[List[str]] = None
