import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "features": [0,1,2,3,100,200,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,10,10,0.1,0.1,0,0,1,0,0,255,10,0.5,0.1,0.1,0,0.1,0.1,0,0]
}

response = requests.post(url, json=data)

print("Response:", response.json())