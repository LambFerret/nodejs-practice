model = require("@tensorflow/tfjs-converter")
const tf = require("@tensorflow/tfjs")


exports.prediction = async (style, isForward, pic) => {
    if (isForward) { direction = 'gAB' }
    else { direction = 'gBA' }
    ls = ['spring2summer', 'spring2autumn', 'spring2winter', 'summer2autumn', 'summer2winter', 'autumn2winter']
    var MODEL_URL = `http://localhost:3000/${ls[style]}/${direction}/model.json`;
    const model = tf.loadGraphModel(MODEL_URL)
    result = pic //(await model).predict(pic)
    return result
}

