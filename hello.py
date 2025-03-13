from flask import Flask
from flask import render_template, request, jsonify

import os

app = Flask(__name__)


# consfigure upload folder
UPLOAD_FOLDER='uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
@app.route('/hello/')
def hello():
    return render_template('hello.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    print(request.form)
    print('\n\n')
    # return 'OK'

