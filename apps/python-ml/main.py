from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/debug')
def debug():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    # load model here
    app.run(port=5000, debug=True)
