from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import tensorflow as tf
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask("Emotion_Recognition")
CORS(app, resources={r"/*": {"origins": "*"}})

loaded_model = tf.keras.models.load_model('model.h5')

@app.route("/greet", methods=["GET"])
def greeting():
    print("Called")
    response = jsonify({ "message": "Hello there, - from Team" })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




@app.route("/user/predict", methods=["POST"])
def user():
    body = request.get_json()["data"]
    columnsRequired = ['LnHF', 'HTI', 'HF', 'SampEn', 'SD2', 'TINN', 'LFn', 'MedianNN',
       'MadNN', 'MCVNN', 'HFn', 'LF', 'VHF', 'psdalpha_14', 'CSI_Modified',
       'CVNN', 'SDNN', 'psdtheta_14', 'Rate_Mean', 'CVI', 'SD2SD1', 'MeanNN',
       'psdbeta_8', 'psdbeta_1', 'psdbeta_14']

    data = dict()
    for column in columnsRequired:
        data[column] = float(body[column])

    df = pd.DataFrame(data, index=[0])
    
    pred = loaded_model.predict(df)
    ind = np.argmax(pred)
    
    emotions = ["Fear", "Happy", "Anger", "Sad"]

    percentage = round(pred[0][ind]*100, 2)

    response = jsonify({ "prediction": emotions[ind], 'percentage': percentage})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9090)