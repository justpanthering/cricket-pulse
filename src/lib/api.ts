export async function fetchFixtures(page = 1, limit = 5) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/fixtures?page=${page}&limit=${limit}`
  );
  return res.json();
}

export async function fetchResults(page?: number, limit?: number) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/results`;
  if (page && limit) url += `?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchPointsTable(page?: number, limit?: number) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/points-table`;
  if (page && limit) url += `?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  return res.json();
}