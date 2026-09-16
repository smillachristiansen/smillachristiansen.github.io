import requests
from bs4 import BeautifulSoup
import csv

# Webbsidan vi vill scrapa
url = "https://quotes.toscrape.com/"

# Hämta webbsidan
response = requests.get(url)

# Läs sidans HTML
soup = BeautifulSoup(response.text, "html.parser")

# Hitta alla citat på sidan
quotes = soup.find_all("div", class_="quote")

# Skapa en CSV-fil och spara resultatet
with open("quotes.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)

    # Rubriker i CSV-filen
    writer.writerow(["Quote", "Author"])

    # Hämta citat och författare
    for quote in quotes:
        text = quote.find("span", class_="text").get_text()
        author = quote.find("small", class_="author").get_text()

        writer.writerow([text, author])

print(f"Klart! {len(quotes)} citat sparades i quotes.csv")