from fastapi import FastAPI
from pydantic import BaseModel
import keras
import numpy as np
from PIL import Image
import uvicorn

app = FastAPI()


def prediction(dataset, imgpath):
    model = keras.models.load_model("./dataset/" + dataset)
    img = Image.open(imgpath).resize((256, 256))
    img = np.uint8(img) / 127.5 - 1
    model.predict(img)


@app.get("/convert")
async def convert(dataset: str, imgname: str):
    str1 = f'{dataset}_{imgname}'
    print(str1)
    return {"img_id": str1}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=9889)
