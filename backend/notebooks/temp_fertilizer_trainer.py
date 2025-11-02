import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pickle

# Load the dataset
data = pd.read_csv("../datasets/fertilizer_recommendation_dataset.csv")

# Prepare the data
X = data.drop(["Fertilizer", "Remark"], axis=1)
y = data["Fertilizer"]

# Encode categorical features
num_cols = X.select_dtypes(include=["int64", "float64"]).columns
cat_cols = X.select_dtypes(include=["object"]).columns

for col in cat_cols:
    X[col] = LabelEncoder().fit_transform(X[col])

# Scale numerical features
scaler = StandardScaler()
X[num_cols] = scaler.fit_transform(X[num_cols])

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model
with open("fertilizer.pkl", "wb") as f:
    pickle.dump(model, f)

print("fertilizer.pkl has been regenerated successfully.")
