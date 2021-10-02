import os
from fastapi import FastAPI
import keras
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import datetime

app = FastAPI()


def prediction(dataset, imgname):

    model = keras.models.load_model("datasets/" + dataset)
    img = Image.open("uploads/"+imgname).resize((256, 256))
    img = np.uint8(img) / 127.5 - 1
    img = img[np.newaxis, :, :, :]
    output = model.predict(img)
    output = 0.5 * output + 0.5
    plt.imshow(output[0])
    plt.axis("off")
    endpoint = 'converts/'+imgname
    plt.savefig(endpoint)
    plt.close()
    return endpoint


@app.get("/convert")
async def convert(dataset: str, imgname: str, imgID: str):
    t = datetime.datetime.now()
    a = (t-datetime.datetime(2021,1,1)).total_seconds()
    a = int(a)
    dataset = dataset.lower()
    prediction(dataset, imgname+'.jpg')
    print(dataset, imgname+'.jpg')
    return {"img_id": imgID, "time": a}


# pip install -r ./webpy/requirements.txt
# start with..
# uvicorn web:app --reload --port=9889