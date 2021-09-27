from fastapi import FastAPI
from pydantic import BaseModel
import keras
import numpy as np
from PIL import Image
import uvicorn

app = FastAPI()


def prediction(dataset, imgpath):
    model = keras.models.load_model("./" + dataset)
    img = Image.open(imgpath).resize((256, 256))
    img = np.uint8(img) / 127.5 - 1
    model.predict(img)


class Imgs(BaseModel):
    UserID: str
    origin: str
    convert: str


@app.post("/convert")
async def read_root(img_info: Imgs):
    # image 받으면 origin image로 저장
    userid = img_info.UserID
    ori = img_info.origin
    conv = img_info.convert
    dataset = ori + "2" + conv
    prediction(dataset, )
    return {"img_id": f'{userid}_{ori}_{conv}'}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=9889)

#  pip install -r requirements.txt