export interface Fixture {
  matchOrder: string;
  venue: string;
  schedule: { date: string; time: string };
}

export interface Result {
  matchOrder: string;
  venue: string;
  dateTime: string;
  comments: string;
  teams: {
    logo: string | undefined;
    name: string;
    score: string;
  }[];
}

export interface Point {
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
}
