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
class CropPredictionRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class FertilizerPredictionRequest(BaseModel):
    temperature: float
    moisture: float
    rainfall: float
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    carbon: float
    soil: str
    crop: str

# Define class names for the disease model
# IMPORTANT: You need to replace these with your actual class names in the correct order.
DISEASE_CLASS_NAMES = [
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___healthy',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___healthy',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot'
]

REMEDIES = {
    'Blueberry___healthy': ['Your plant is healthy. Keep up the good work!'],
    'Cherry_(including_sour)___Powdery_mildew': ['Apply fungicides like sulfur, potassium bicarbonate, or neem oil.', 'Prune affected areas to improve air circulation.'],
    'Cherry_(including_sour)___healthy': ['Your plant is healthy. Keep up the good work!'],
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': ['Use resistant hybrids.', 'Practice crop rotation.', 'Apply fungicides when necessary.'],
    'Corn_(maize)___Common_rust_': ['Plant resistant varieties.', 'Apply fungicides at the first sign of disease.'],
    'Corn_(maize)___healthy': ['Your plant is healthy. Keep up the good work!'],
    'Corn_(maize)___Northern_Leaf_Blight': ['Use resistant hybrids.', 'Practice tillage to bury crop residue.', 'Apply fungicides.'],
    'Grape___Black_rot': ['Remove and destroy infected canes, leaves, and fruit.', 'Apply fungicides during the growing season.'],
    'Grape___Esca_(Black_Measles)': ['Prune out dead or dying arms.', 'There is no effective chemical control.'],
    'Grape___healthy': ['Your plant is healthy. Keep up the good work!'],
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': ['Remove and destroy infected leaves.', 'Apply fungicides if the disease is severe.'],
    'Orange___Haunglongbing_(Citrus_greening)': ['Remove infected trees.', 'Control psyllid populations with insecticides.'],
    'Peach___Bacterial_spot': ['Use resistant varieties.', 'Apply copper-based bactericides.'],
    'Peach___healthy': ['Your plant is healthy. Keep up the good work!'],
    'Pepper,_bell___Bacterial_spot': ['Use disease-free seed.', 'Rotate crops.', 'Apply copper-based bactericides.']
}

@app.get("/")
def read_root():
    return {"message": "AgriHelp ML API is running."}

@app.post("/predict/crop")
async def predict_crop(request: CropPredictionRequest):
    try:
        features = np.array([[
            request.nitrogen,
            request.phosphorus,
            request.potassium,
            request.temperature,
            request.humidity,
            request.ph,
            request.rainfall
        ]])
        prediction = crop_model.predict(features)
        # Mock data for image and confidence
        return {
            "crop": prediction[0],
            "confidence": np.random.uniform(80, 95),
            "imageUrl": f"https://images.unsplash.com/photo-1592408666037-3eb5a5d01567?w=500&h=300&fit=crop"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/fertilizer")
async def predict_fertilizer(request: FertilizerPredictionRequest):
    try:
        # The fertilizer model expects numerical inputs. We need to convert
        # the categorical 'soil' and 'crop' fields into a numerical format.
        # This is a placeholder for a more robust encoding strategy.
        soil_mapping = {soil: i for i, soil in enumerate(['Sandy', 'Loamy', 'Clay', 'Red', 'Black'])}
        crop_mapping = {crop: i for i, crop in enumerate(['Rice', 'Wheat', 'Cotton', 'Maize', 'Sugarcane', 'Pulses', 'Barley', 'Millets'])}

        soil_encoded = soil_mapping.get(request.soil, -1)
        crop_encoded = crop_mapping.get(request.crop, -1)

        features = np.array([[
            request.temperature,
            request.moisture,
            request.rainfall,
            request.ph,
            request.nitrogen,
            request.phosphorus,
            request.potassium,
            request.carbon,
            soil_encoded,
            crop_encoded
        ]])

        prediction = fertilizer_model.predict(features)
        return {
            "fertilizer": prediction[0],
            "confidence": np.random.uniform(85, 98),
            "description": "This balanced fertilizer is ideal for your soil conditions and crop type.",
            "imageUrl": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop"
        }
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
            remedies = REMEDIES.get(predicted_class_name, ["No specific remedy found."])
        else:
            predicted_class_name = f"Unknown Class (index: {predicted_class_index})"
            remedies = ["Cannot determine remedy for unknown class."]

        confidence = float(np.max(predictions[0]))

        return {
            "disease": predicted_class_name.replace('___', ' - ').replace('_', ' '),
            "confidence": confidence * 100,
            "remedies": remedies
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
