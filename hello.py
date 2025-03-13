import os, shutil
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

# configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#  this is for dev phase only to empty the directory for testing
# shutil.rmtree(UPLOAD_FOLDER, ignore_errors=True, onerror=None)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
@app.route('/hello/')
def hello():
    return render_template('hello.html')

def allowed_file(filename):
    """
    This function performs a utility task.

    It takes one argument, filename, and returns a boolean value if it is of an allowed file type.

    Args:
        filename: a filename e.g. hell_of_treblinka.pdf

    Returns:
        A boolean value
    """
    return '.' in filename and \
           filename.split('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():

    if 'file' not in request.files:
        return jsonify({'error': 'no file part'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):

        # secure the filename to prevent path traversal attacks
        filename = secure_filename(file.filename)

        # save the file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        return jsonify({
            'success': True,
            'filename': filename,
            'message': 'File successfuly uploaded!✅'
        })
    
    return jsonify({'error': 'File must be PDF❌'}), 400
