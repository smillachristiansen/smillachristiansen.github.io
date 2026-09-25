import json
import urllib.request
import urllib.parse


print("🥤 RAMLÖSA + CARLSBERG")
print("-----------------------")


# =========================
# API 1 – VÄDER
# =========================

weather_url = (
    "https://api.open-meteo.com/v1/forecast"
    "?latitude=59.3293"
    "&longitude=18.0686"
    "&current=temperature_2m"
)

try:
    with urllib.request.urlopen(weather_url, timeout=10) as response:
        weather_data = json.loads(response.read().decode())

    temperature = weather_data["current"]["temperature_2m"]

    print("\n🌤 API 1 – Väder")
    print("Temperatur i Stockholm:", temperature, "°C")

except Exception as error:
    temperature = None
    print("\n❌ Kunde inte hämta vädret.")
    print(error)


# =========================
# API 2 – PLATSER
# =========================

params = urllib.parse.urlencode({
    "q": "cafe Stockholm Sweden",
    "format": "jsonv2",
    "limit": 5
})

places_url = "https://nominatim.openstreetmap.org/search?" + params

request = urllib.request.Request(
    places_url,
    headers={
        "User-Agent": "RamlosaSchoolProject/1.0"
    }
)

places = []

try:
    with urllib.request.urlopen(request, timeout=10) as response:
        places = json.loads(response.read().decode())

    print("\n📍 API 2 – Potentiella försäljningsställen")

    if len(places) == 0:
        print("Inga platser hittades.")
    else:
        for place in places:
            print("-", place["display_name"])

except Exception as error:
    print("\n❌ Kunde inte hämta platser.")
    print(error)


# =========================
# KOMBINERA API:ERNA
# =========================

print("\n📊 RAMLÖSA / CARLSBERG ANALYS")
print("-----------------------------")

if temperature is not None:

    if temperature >= 20:
        print("☀️ Varmt väder.")
        print("➡️ Hög prioritet för Ramlösa-försäljning.")

    elif temperature >= 10:
        print("🌤 Mild temperatur.")
        print("➡️ Normal prioritet för Ramlösa-försäljning.")

    else:
        print("❄️ Kallt väder.")
        print("➡️ Lägre prioritet för väderbaserad Ramlösa-försäljning.")


if len(places) > 0:
    print("\nCarlsberg Sverige kan använda informationen")
    print("för att identifiera potentiella försäljningsställen")
    print("för Ramlösa i Stockholm.")


print("\n✅ Analysen är klar.")