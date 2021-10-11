from fastapi import FastAPI
# import keras
# import numpy as np
# from PIL import Image
# import matplotlib.pyplot as plt
# import datetime

app = FastAPI()

# def prediction(dataset, imgname, imgID):
#     model = keras.models.load_model("datasets/" + dataset)
#     img = Image.open("uploads/"+imgname).resize((256, 256))
#     img = np.uint8(img) / 127.5 - 1
#     img = img[np.newaxis, :, :, :]
#     output = model.predict(img)
#     output = 0.5 * output + 0.5
#     t = datetime.datetime.now()
#     a = (t-datetime.datetime(2021,1,1)).total_seconds()
#     a = str(int(a))
#     plt.imshow(output[0])
#     plt.axis("off")
#     endpoint = "converts/"+a+imgID
#     plt.savefig(endpoint)
#     plt.close()
#     return endpoint
print("bye")
@app.get("/convert")
def convert(dataset: str, imgname: str, imgID: str):
    dataset = dataset.lower()
    print("hihihihi")
    filename = "asdfasdf" #prediction(dataset, imgname+'.jpg', imgID)
    return {"img_id": filename}


# pip install -r ./webpy/requirements.txt
# start with..
# uvicorn web:app --reload --port=9889