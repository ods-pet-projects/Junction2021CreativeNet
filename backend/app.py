import flask
import json
from flask import Flask, jsonify
import pandas as pd
from models import kone_dir
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/get_queries")
def get_queries():
    with open(f"{kone_dir}/samples_100.json") as ifile:
        lines = json.load(ifile)
    # df_pred = pd.read_csv(f'{kone_dir}/test_predicted_add.csv')
    # return jsonify(df_pred.head(100).to_json())
    return jsonify(lines)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="25000")
