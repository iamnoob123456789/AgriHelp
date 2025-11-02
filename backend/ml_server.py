import pickle
import numpy as np
from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from tensorflow.keras.models import load_model
import os
import io
from PIL import Image

app = FastAPI()

# CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Determine the absolute path to the notebooks directory
# __file__ is the path to the current script (ml_server.py)
# os.path.dirname(__file__) is the directory of the script (backend)
MODEL_DIR = os.path.join(os.path.dirname(__file__), "notebooks")

# Load models
try:
    crop_model_path = os.path.join(MODEL_DIR, "crop_model.pkl")
    fertilizer_model_path = os.path.join(MODEL_DIR, "fertilizer.pkl")
    disease_model_path = os.path.join(MODEL_DIR, "plant_leaf_diseases_model.h5")

    with open(crop_model_path, 'rb') as f:
        crop_model = pickle.load(f)

    with open(fertilizer_model_path, 'rb') as f:
        fertilizer_model = pickle.load(f)

    disease_model = load_model(disease_model_path)
except Exception as e:
    print(f"Error loading models: {str(e)}")
    # If models fail to load, the server shouldn't start.
    raise

# Pydantic models for request body validation
class PredictionRequest(BaseModel):
    features: list

# Define class names for the disease model
# IMPORTANT: You need to replace these with your actual class names in the correct order.
DISEASE_CLASS_NAMES = [
    'class_1_name',
    'class_2_name',
    'class_3_name',
    # ... add all your class names here
]

@app.get("/")
def read_root():
    return {"message": "AgriHelp ML API is running."}

@app.post("/predict/crop")
async def predict_crop(request: PredictionRequest):
    try:
        features = np.array([request.features])
        prediction = crop_model.predict(features)
        return {"prediction": prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/fertilizer")
async def predict_fertilizer(request: PredictionRequest):
    try:
        features = np.array([request.features])
        prediction = fertilizer_model.predict(features)
        return {"prediction": prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/disease")
async def predict_disease(file: UploadFile = File(...)):
    try:
        # Read image contents
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Preprocess the image
        # The model expects a specific size, e.g., 224x224. Adjust if needed.
        img_resized = image.resize((224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img_resized)
        img_array = tf.expand_dims(img_array, 0)  # Create batch dimension

        # Make prediction
        predictions = disease_model.predict(img_array)
        predicted_class_index = np.argmax(predictions[0])
        
        # Map index to class name if available, otherwise return index
        if predicted_class_index < len(DISEASE_CLASS_NAMES):
            predicted_class_name = DISEASE_CLASS_NAMES[predicted_class_index]
        else:
            predicted_class_name = f"Unknown Class (index: {predicted_class_index})"

        confidence = float(np.max(predictions[0]))

        return {"prediction": predicted_class_name, "confidence": confidence}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
