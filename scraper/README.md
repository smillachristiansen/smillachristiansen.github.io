# Web Scraper

Detta är en enkel web scraper skapad i Python.

Scrapern hämtar data från quotes.toscrape.com, en webbplats skapad för att öva web scraping.

## Vad scrapern gör

1. Hämtar webbsidans HTML med Requests.
2. Läser HTML-koden med BeautifulSoup.
3. Hittar citat och tillhörande författare.
4. Sparar resultatet i filen `quotes.csv`.

## Filer

- `scraper.py` – Python-koden som utför scrapingen.
- `quotes.csv` – resultatet från scrapingen.

## Kör scrapern

```bash
python3 scraper.py
```