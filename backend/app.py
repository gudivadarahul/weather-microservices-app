from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

NWS_API_BASE_URL = "https://api.weather.gov"

@app.route('/weather')
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if not lat or not lon:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    try:
        float(lat), float(lon)
    except ValueError:
        return jsonify({"error": "Invalid latitude or longitude"}), 400

    headers = {
        "User-Agent": "(weather-app, contact@example.com)"
    }
    
    try:
        points_url = f"{NWS_API_BASE_URL}/points/{lat},{lon}"
        response = requests.get(points_url, headers=headers)
        response.raise_for_status()
        
        grid_data = response.json()
        forecast_url = grid_data['properties']['forecast']
        
        forecast_response = requests.get(forecast_url, headers=headers)
        forecast_response.raise_for_status()
        
        forecast_data = forecast_response.json()
        periods = forecast_data['properties']['periods']
        current_forecast = periods[0]

        weather_info = {
            "temperature": current_forecast['temperature'],
            "temperatureUnit": current_forecast['temperatureUnit'],
            "windSpeed": current_forecast['windSpeed'],
            "windDirection": current_forecast['windDirection'],
            "shortForecast": current_forecast['shortForecast'],
            "detailedForecast": current_forecast['detailedForecast']
        }

        return jsonify(weather_info)
    
    except requests.RequestException as e:
        return jsonify({"error": "Failed to fetch weather data"}), 500

# Add this route for health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
