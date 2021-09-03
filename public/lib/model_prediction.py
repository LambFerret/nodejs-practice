from keras import models
import numpy as np
import matplotlib.pyplot as plt
from glob import glob
import os, sys
from PIL import Image
import cgi, cgitb
data = cgi.FieldStorage()
output = data.getvalue['some']

class Predictions:
    def __init__(self, dataset, isForword, img):
        direction = 'gAB' if isForword else 'gBA'
        self.model_path = f'http://localhost:3000/{dataset}/{direction}/model.json'
        self.selected_model = models.load_model(self.model_path)
        img = Image.open(img).resize((256, 256))
        img = np.uint8(img)/127.5 - 1
        self.img = img[np.newaxis, :, :, :]
    
    def sample_images(self):
        gener_img = self.selected_model.predict(self.img)
        gener_img = 0.5* gener_img +0.5
        plt.imshow(gener_img)
        plt.savefig('./outputPic/temp.jpg')
        plt.close()
        


# print(sys.argv[1])
w = open("C://testhere/txt.txt",'w')
w.write(output)
w.close()
print("this is python script")
# if __name__ == '__main__':
#     predict = Predictions(dataset=sets, isForword=True, img='img path')
#     predict.sample_images()