# Eventbyrå Scraper

Detta projekt är en web scraper byggd med JavaScript, Node.js och Cheerio.

Scrapern hämtar information om eventbyråer från Allabolag och samlar informationen i en CSV-fil.

## Data som samlas in

För varje företag hämtas:

- Företagsnamn
- Organisationsnummer
- Telefonnummer
- Adress

Scrapern hämtar fem sidor med sökresultat och väntar 500 ms mellan varje sida.

Resultatet sparas i:

`foretag.csv`

## Teknik

- JavaScript
- Node.js
- Cheerio
- Fetch
- CSV

## Kör projektet

Installera dependencies:

npm install

Kör scrapern:

node scraper.js