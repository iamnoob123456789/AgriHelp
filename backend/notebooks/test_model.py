# test_model.py (100% WORKING)
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image

# Load model
model = load_model("plant_leaf_diseases_model.h5")
print("Model loaded successfully!")

# AUTO-BUILD: Run one dummy prediction to define input shape
dummy_input = np.zeros((1, 256, 256, 3), dtype=np.float32)
_ = model.predict(dummy_input, verbose=0)  # This builds the model
print("Model built via dummy prediction.")

# NOW input is defined!
print("Input shape:", model.inputs)        # → (None, 256, 256, 3)
#print("Output classes:", model.output.shape[-1]) # → 15

# Test with real dummy image
img = Image.new('RGB', (256, 256), color='green')
img_array = np.array(img) / 255.0
img_array30 = np.expand_dims(img_array, 0)

pred = model.predict(img_array30)
print("Prediction shape:", pred.shape)
print("Top class index:", np.argmax(pred))