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
    endpoint = 'converts/'+imgname
    plt.savefig(endpoint)
    plt.close()
    return endpoint


@app.get("/convert")
async def convert(dataset: str, imgname: str):
    now = datetime.datetime.now()
    dataset = dataset.lower()
    prediction(dataset, imgname+'.jpg')
    print(dataset, imgname+'.jpg')
    str1 = f'{dataset}_{imgname}'
    return {"img_id": str1, "time": now}


# pip install -r ./webpy/requirements.txt
# start with..
# uvicorn web:app --reload --port=9889