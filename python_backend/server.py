from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from NumNumPython import get_ai_response  # Import AI functionality

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route("/")
def home():
    return "Welcome to the NumNum API!"

# Route for AI processing
@app.route("/api/analyze", methods=["POST"])
def analyze():
    # Extract data sent by the frontend
    data = request.json
    if not data or "input" not in data:
        return jsonify({"error": "No input provided"}), 400

    user_input = data["input"]

    try:
        # Pass the input to the AI logic
        ai_response = get_ai_response(user_input)  # AI logic from NumNumPython
        return jsonify({"message": ai_response})
    except Exception as e:
        return jsonify({"error": f"AI processing failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
