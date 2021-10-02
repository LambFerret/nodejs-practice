import os
from fastapi import FastAPI
import keras
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

app = FastAPI()


def prediction(dataset, imgname):

    model = keras.models.load_model("webpy/datasets/" + dataset)
    img = Image.open("webpy/uploads/"+imgname).resize((256, 256))
    img = np.uint8(img) / 127.5 - 1
    img = img[np.newaxis, :, :, :]
    output = model.predict(img)
    output = 0.5 * output + 0.5
    plt.imshow(output[0])
    endpoint = 'webpy/converts/'+imgname
    plt.savefig(endpoint)
    plt.close()
    return endpoint


@app.get("/convert")
async def convert(dataset: str, imgname: str):
    dataset = dataset.lower()
    prediction(dataset, imgname+'.jpg')
    print(dataset, imgname+'.jpg')
    str1 = f'{dataset}_{imgname}'
    return {"img_id": str1}


# pip install -r ./webpy/requirements.txt
# start with..
# uvicorn web:app --reload --port=9889