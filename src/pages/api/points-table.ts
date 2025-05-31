import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const htmlPath = path.join(process.cwd(), "src/html/points-table.html");
    const html = fs.readFileSync(htmlPath, "utf-8");

    const $ = cheerio.load(html);

    const matches: {
      pos: string;
      team: { name: string; logo: string | undefined };
      p: string;
      w: string;
      l: string;
      nr: string;
      nrr: string;
      fr: string;
      against: string;
      pts: string;
      recentForm: ("W" | "L")[];
    }[] = [];
    $("tbody[id=pointsdata] > tr").each((_, el) => {
      const pos = $(el).find("td:nth-child(1)").text().trim();
      const team = {
        logo: $(el).find("td:nth-child(3) img").attr("ng-src"),
        name: $(el).find("td:nth-child(3) h2").text().trim(),
      };
      const p = $($("tbody[id=pointsdata] > tr")[0])
        .find("td:nth-child(4)")
        .text()
        .trim();
      const w = $(el).find("td:nth-child(5)").text().trim();
      const l = $(el).find("td:nth-child(6)").text().trim();
      const nr = $(el).find("td:nth-child(7)").text().trim();
      const nrr = $(el).find("td:nth-child(8)").text().trim();
      const fr = $(el).find("td:nth-child(9)").text().trim();
      const against = $(el).find("td:nth-child(10)").text().trim();
      const pts = $(el).find("td:nth-child(11)").text().trim();
      const recentForm: ("W" | "L")[] = [];
      $(el)
        .find("td:nth-child(12) span")
        .each((_, formEl) => {
          recentForm.push($(formEl).text().trim() as "W" | "L");
        });
      matches.push({
        pos,
        team,
        p,
        w,
        l,
        nr,
        nrr,
        fr,
        against,
        pts,
        recentForm,
      });
    });

    res.status(200).json({ matches });
  } catch (error: unknown) {
    console.error("Error fetching points data:", error);
    res.status(500).json({ error: "Failed to fetch points data" });
  }
}
