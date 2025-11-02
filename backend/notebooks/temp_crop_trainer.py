import pandas as pd
import xgboost as xgb
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Load the dataset
data = pd.read_csv("../datasets/Crop_recommendation.csv")

# Prepare the data
X = data.drop(columns=['label'])  # features
y = data['label']                 # target

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Encode the target variable
le = LabelEncoder()
y_train_scaled = le.fit_transform(y_train)

# Initialize and train the model
XGB = xgb.XGBClassifier()
XGB.fit(X_train, y_train_scaled)

# Save the trained model
with open("crop_model.pkl", "wb") as f:
    pickle.dump(XGB, f)

print("crop_model.pkl has been regenerated successfully.")
