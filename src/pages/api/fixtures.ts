import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const htmlPath = path.join(process.cwd(), "src/html/fixtures.html");
    const html = fs.readFileSync(htmlPath, "utf-8");

    const $ = cheerio.load(html);

    const matches: {
      matchOrder: string;
      venue: string;
      schedule: { date: string; time: string };
    }[] = [];
    $(".vn-sheduleList ul > li").each((_, el) => {
      const matchOrder = $(el)
        .find(".vn-schedule-head .vn-matchOrder")
        .text()
        .trim();
      const venue = $(el).find(".vn-schedule-head .vn-venueDet").text().trim();
      const schedule = {
        date: $(el).find(".vn-matchDateTime > .vn-matchDate").text().trim(),
        time: $(el).find(".vn-matchDateTime > .vn-matchTime").text().trim(),
      };
      const teams = [];

      $(el)
        .find(".vn-shedTeam")
        .each((_, teamEl) => {
          teams.push({
            logo: $(teamEl).find("img").attr("ng-src"),
            name: $(teamEl).find(".vn-teamName").text().trim(),
          });
        });
      matches.push({ matchOrder, venue, schedule });
    });

    res.status(200).json({ matches });
  } catch (error: unknown) {
    console.error("Error fetching fixtures:", error);
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
}
