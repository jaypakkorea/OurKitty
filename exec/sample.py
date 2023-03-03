import requests

url = "https://apis.openapi.sk.com/tmap/pois/search/around?version=1&centerLon=126.98452047&centerLat=37.56656541&categories=%ED%8E%B8%EC%9D%98%EC%A0%90&page=1&count=20&radius=1&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&multiPoint=N"

headers = {
    "accept": "application/json",
    "appKey": "l7xx846db5f3bc1e48d29b7275a745d501c8"
}

response = requests.get(url, headers=headers)

print(response.text)