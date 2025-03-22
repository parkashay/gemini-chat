import * as cheerio from "cheerio";

export async function scrapeWebsite(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    let text = "";
    $("p, h1, h2, h3, li").each((index, element) => {
      text += $(element).text() + "\n";
    });
    return text;
  } catch (error) {
    console.error("Error scraping website:", error);
    return null;
  }
}
