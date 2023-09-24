from flask import Flask, jsonify, request
import dill
import re
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__)

@app.route('/debug')
def debug():
    return jsonify({'status': 'ok'})

@app.route('/answer', methods=['POST'])
def transform_string():
    obj = request.get_json(force=True)

    if not 'prompt' in obj:
        return jsonify({'error': 'Input string is missing'}), 400

    answer = model.forward(obj['prompt'])

    return jsonify({'answer': answer})

if __name__ == '__main__':
    model = dill.load(open(dir_path + "/model_bert.pkl", "rb"))

    # load model here
    app.run(
        host='0.0.0.0',
        port=5001,
        debug=True
    )
