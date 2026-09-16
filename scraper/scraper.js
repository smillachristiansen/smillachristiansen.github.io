const cheerio = require("cheerio");
const fs = require("fs");

const urls = [
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Eventbyr%C3%A5er",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Eventbyr%C3%A5er&page=2",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Eventbyr%C3%A5er&page=3",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Eventbyr%C3%A5er&page=4",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Eventbyr%C3%A5er&page=5"
];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "Cache-Control": "no-cache"
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapePage(url) {
  const response = await fetch(url, {
    headers,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const foretag = [];

  $(".SearchResultCard-card").each((i, element) => {
    const card = $(element);

    const namn = card.find("h2 a").first().text().trim();

    const orgnr = card
      .find(".CardHeader-propertyList")
      .filter((i, el) => $(el).text().includes("Org.nr"))
      .first()
      .text()
      .replace("Org.nr", "")
      .trim();

    const telefon = card
      .find(".CardHeader-phone")
      .first()
      .text()
      .replace("Telefon", "")
      .trim();

    const adress = card
      .find(".CardHeader-propertyList")
      .filter((i, el) => {
        const text = $(el).text();
        return !text.includes("Org.nr") && !text.includes("Telefon");
      })
      .first()
      .text()
      .trim();

    foretag.push({
      namn,
      orgnr,
      telefon,
      adress
    });
  });

  return foretag;
}

async function scrape() {
  const allaForetag = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    try {
      console.log(`Hämtar sida ${i + 1}...`);

      const foretag = await scrapePage(url);

      console.log(`Sida ${i + 1}: ${foretag.length} företag`);

      allaForetag.push(...foretag);
    } catch (error) {
      console.error(`Fel på sida ${i + 1}: ${error.message}`);
    }

    if (i < urls.length - 1) {
      await sleep(500);
    }
  }

  let csv = "Företagsnamn;Org.nr;Telefon;Adress\n";

  allaForetag.forEach((f) => {
    csv += `"${f.namn}";"${f.orgnr}";"${f.telefon}";"${f.adress}"\n`;
  });

  fs.writeFileSync("foretag.csv", csv, "utf8");

  console.log(`Klart! Totalt ${allaForetag.length} företag sparades.`);
}

scrape();