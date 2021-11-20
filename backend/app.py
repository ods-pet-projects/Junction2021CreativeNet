import flask
import json
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api/get_queries")
def get_queries():
    with open('/home/junc/mlcup/kone/samples_100.json') as ifile:
        lines = json.load(ifile)
    return jsonify(lines)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='25000')
