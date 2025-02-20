# SortSmart - A Waste Material Classification System

![SortSmart Logo](https://github.com/user-attachments/assets/ca513624-ea35-481c-b5cc-c5cfda71439d)
[Live Demo](https://sortsmart-a-waste-material.onrender.com)

## Introduction
SortSmart is a waste material classification system that uses a deep learning model to classify waste images into different categories. The project utilizes a Flask web application for real-time predictions.

## Features
- Upload an image of waste material
- Predict the category of the waste using a trained VGG16 model
- Display category-specific information on separate result pages
- Secure API with rate limiting (Flask-Limiter)
- 
## Tech Stack
- **Backend:** Flask, TensorFlow/Keras, Python
- **Frontend:** HTML, CSS, JavaScript
- **Model:** Pre-trained VGG16

## Project Structure
```
Garbage_Classification_Project/
│── app.py                    # Main Flask backend
│
├── model/      
│   ├── garbage_classification_VGG16.h5 # Trained model file
│
│── requirements.txt                # Python dependencies
│── uploads/                        # Temporary uploaded files
│
├── templates/                      # HTML Templates
│   ├── index.html                   # Main UI for uploading images
│   ├── <category>.html              # Individual result pages
│
├── static/                          # Static assets (CSS, JS, images, videos)
│   ├── css/style.css                # Main stylesheet
│   ├── js/script.js                 # JavaScript logic
│   ├── images/                       # UI assets
│   ├── videos/                       # Background videos for UI
│
├── notebook/                        # Jupyter Notebooks for training the model
│   ├── garbage_classifier_inference.ipynb             
│   ├── garbage_classifier_training.ipynb              
│
└── README.md                        # Project documentation
```

## Installation
### 1. Clone the Repository
```sh
git clone https://github.com/supriya811106/SortSmart-A-Waste-Material-Classification-System.git
cd SortSmart-A-Waste-Material-Classification-System
```

### 2. Set Up a Virtual Environment (Optional but Recommended)
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```sh
pip install -r requirements.txt
```

### 4. Run the Application
```sh
python app.py
```
The application will run on `http://127.0.0.1:5000/`

## How to Use
1. Open the web application in your browser: [SortSmart Live](https://sortsmart-a-waste-material.onrender.com)
2. Upload an image of waste material.
3. Click on "Predict Waste Material" to classify the waste.
4. The system will display the corresponding waste category with relevant details.

## Contact
For any queries, reach out at [supriyasuman0708@gmail.com](mailto:supriyasuman0708@gmail.com)
