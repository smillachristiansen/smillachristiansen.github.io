const token = process.env.KAGGLE_TOKEN;
const url =
  "https://www.kaggle.com/api/v1/datasets/download/rodsaldanha/arketing-campaign/marketing_campaign.csv";

async function main() {
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  console.log("Status:", response.status);

  const text = await response.text();

  if (!response.ok) {
    console.log(text);
    return;
  }

  const rows = text.trim().split("\n").slice(1);

  const accepted = rows.filter(row => {
    const columns = row.trim().split(";");
    return columns.at(-1) === "1";
  }).length;

  console.log("Customers:", rows.length);
  console.log("Accepted the last campaign:", accepted);
}

main();