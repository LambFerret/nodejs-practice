import numpy as np
from PIL import Image

from typing import Optional
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


def load_img(path):
    img = Image.open(path).resize((256,256))
    img = np.uint8(img) / 127.5 - 1
    return img[np.newaxis, :, :, :]
