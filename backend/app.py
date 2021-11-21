import flask
import os
import json
from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

if os.path.exists('/home/junc/mlcup/kone'):
    kone_dir = '/home/junc/mlcup/kone'
else:
    kone_dir = '/Users/o/PycharmProjects/Junction2021CreativeNet/kone_dir'

app = Flask(__name__)
CORS(app)


def dataframe_to_json(df):
    lines = []
    for i, row in df.iterrows():
        lines.append(dict(row))
    return lines


@app.route("/api/get_queries")
def get_queries():
    # with open(f"{kone_dir}/samples_100.json") as ifile:
    #     lines = json.load(ifile)
    # return jsonify(lines)
    #
    # "id": "ele0030053",
    # "probability": "0.8883406824917287",
    # "action_type": "art01",
    # "sensor_quality": "0.6817229639907736",
    # "loading": "6",
    # "area_id": "ga00000073",
    # "speed": "7"

    df_pred = pd.read_csv(f'{kone_dir}/train_predicted_add_300.csv')
    df_pred['shap_vals_plot'] = df_pred['shap_vals_plot'].apply(json.loads)
    cols = ['equipment_id',
            'probability',
            'action_recommendation_type',
            'sensor_quality',
            'load_category',
            'equipment_area',
            'speed_category',
            'shap_vals_plot',
            'shap_inter_str']

    df_pred = df_pred[cols]
    rows = dataframe_to_json(df_pred)
    return jsonify(rows)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="25000")
