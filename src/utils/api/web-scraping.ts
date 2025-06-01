import { Fixture, Point, Result } from "@/types/match";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export function getFixturesData() {
  const htmlPath = path.join(process.cwd(), "src/html/fixtures.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  const $ = cheerio.load(html);

  const matches: Fixture[] = [];
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
    const teams: Fixture["teams"] = [];

    $(el)
      .find(".vn-shedTeam")
      .each((_, teamEl) => {
        teams.push({
          logo: $(teamEl).find("img").attr("ng-src"),
          name: $(teamEl).find(".vn-teamName").text().trim(),
        });
      });
    matches.push({ matchOrder, venue, schedule, teams });
  });

  return matches;
}

export function getResultsData() {
  const htmlPath = path.join(process.cwd(), "src/html/results.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  const $ = cheerio.load(html);

  const results: Result[] = [];
  $(".vn-resultsList > ul > li").each((_, el) => {
    const matchOrder = $(el).find(".vn-matchOrder").text().trim();
    const venue = $(el).find(".vn-venueDet").text().trim();
    const dateTime = $(el).find(".vn-matchDateTime").text().trim();
    const comments = $(el).find(".vn-ticketTitle").text().trim();
    const teams: Result["teams"] = [];
    $(el)
      .find(".vn-shedTeam")
      .each((_, teamEl) => {
        teams.push({
          logo: $(teamEl).find("img").attr("ng-src"),
          name: $(teamEl).find(".vn-teamName > h3").text().trim(),
          score: $(teamEl).find(".vn-teamTitle > p").text().trim(),
        });
      });
    results.push({ matchOrder, venue, dateTime, comments, teams });
  });

  return results;
}

export function getPointsData() {
  const htmlPath = path.join(process.cwd(), "src/html/points-table.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  const $ = cheerio.load(html);

  const data: Point[] = [];
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
    data.push({
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
  return data;
}
