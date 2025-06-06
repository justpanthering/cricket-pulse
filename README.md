# Cricket Pulse

## Introduction
Cricket pulse is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app), that scrapes the data sourced from [iplt20.com](iplt20.com) to showcase match fixtures, previous match results and points table.

## Next.js Features

1. The Pages Router methodology has been used to implement this project.
2. All the pages take advantage of Server Side Rendering (SSR). Static Site Generation (SSG) has not been used in this case as it is best suited for content with static content, such as blog posts.
3. The following apis have been created, that scrape content in the server and provide the response data to the client:
    - `/api/fixtures`
      - Query params:
        - `page`: current page number
        - `limit`: number of items per page
    - `/api/results`
      - Query params:
        - `page`: current page number
        - `limit`: number of items per page
    - `/api/points-table`
      - Query params:
        - `page`: current page number
        - `limit`: number of items per page

## Caching

1. `@tanstack/react-query`:
    - `useInfiniteQuery` has been used for FixturesTimeline and ResultsTimeline api handling.
    - `useQuery` has been used for PointsTable api handling.
2. `React.memo`: FixturesTimeline and ResultsTimeline components have been memoized to prevent unnecessary re-rendering.

## Live Data

`@tanstack/react-query`'s `refetchInterval` has been used for data polling to ensure data is refreshed periodically.

## User Interface
1. `Tailwind CSS` has been used for styling and mobile-first design.
2. `shadcn` has been used for involving complex components, such as Carousel and Table.

## Scraping

### Challenges:
The response from [iplt20.com](iplt20.com), when fetched using `node-fetch` or `puppeteer`, in the form of:

```
<html><head>
<title>Access Denied</title>
</head><body>
<h1>Access Denied</h1>
 
You don't have permission to access "http://www.iplt20.com/matches/fixtures" on this server.<p>
Reference #18.c6792c31.1748662261.7613d077
</p><p>https://errors.edgesuite.net/18.c6792c31.1748662261.7613d077</p>


</body></html>
```

suggests that the site is using `Akamai`'s bot protection, making the process of scraping not possible.

However, in order to demonstrate the process of scraping in this project, the html files from [iplt20.com](iplt20.com) were downloaded and saved into the following files:
  - `/src/html/fixtures.html`
  - `/src/html/results.html`
  - `/src/html/points-table.html`

The data was downloaded on `1st June 2025`, and therefore the website reflects stale data.

Thereafter, `cheerio` has been used to scrape date from these html pages.

# Instructions

## Setup

To start the development server, run:

```
yarn install
yarn dev
```

