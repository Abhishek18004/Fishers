from flask import Flask, request, jsonify, render_template
import pickle
from feature_extraction import FeatureExtraction  # Import your FeatureExtraction class

# Initialize the Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

# Load the trained model from the pickle file
with open('phishing_classifier.pkl', 'rb') as model_file:
    model = pickle.load(model_file)  

@app.route('/')
def home():
    # Render the main HTML template
    return render_template('fishers.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        url = data['url']  # Expecting 'url' key in JSON

        # Extract features using FeatureExtraction class
        feature_extractor = FeatureExtraction(url)
        features = feature_extractor.getFeaturesList()

        # Predict using the model
        predictions = model.predict([features])  # model expects list of features

        # Return JSON response
        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
