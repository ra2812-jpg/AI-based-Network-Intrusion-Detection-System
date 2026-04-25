from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json["features"]

        # Convert to numpy array
        features = np.array(data).reshape(1, -1)

        # Scale input
        features = scaler.transform(features)

        # Predict
        prediction = model.predict(features)[0]

        result = "Attack" if prediction == 1 else "Normal"

        return jsonify({
            "prediction": result
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)