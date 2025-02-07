from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Initialize Flask app
app = Flask(__name__, template_folder="templates")

# Rate limiter to prevent abuse (10 requests per minute per IP)
limiter = Limiter(get_remote_address, app=app, default_limits=["10 per minute"])

# Constants
MODEL_PATH = "model/garbage_classification_VGG16.h5"
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
CLASS_LABELS = [
    "battery", "biological", "brown-glass", "cardboard", "clothes",
    "green-glass", "metal", "paper", "plastic", "shoes", "trash", "white-glass"
]

# Create upload folder if not exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Lazy load model
model = None
def load_trained_model():
    """Load model only when needed to improve performance."""
    global model
    if model is None:
        model = load_model(MODEL_PATH)

def allowed_file(filename):
    """Check if the uploaded file has a valid image extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    """Render homepage."""
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
@limiter.limit("10 per minute")
def predict():
    """Handles image upload and waste classification."""
    load_trained_model()

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type! Only PNG, JPG, and JPEG allowed."}), 400

    if request.content_length > MAX_FILE_SIZE:
        return jsonify({"error": "File too large! (Max 5MB)"}), 400

    try:
        # Save file
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        # Preprocess image
        img = image.load_img(filepath, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0  

        # Predict
        prediction = model.predict(img_array)
        predicted_class = CLASS_LABELS[np.argmax(prediction)]
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)  # Remove the uploaded file after prediction

    return render_template(f"{predicted_class}.html")

if __name__ == "__main__":
    app.run(debug=False)
