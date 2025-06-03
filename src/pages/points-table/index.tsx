import { useEffect, useState } from "react";
import { Point } from "@/types/match";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Image from "next/image";

type PointsTableResponse = {
  data: Point[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const LIMIT_OPTIONS = [3, 5, 10];

export default function PointsTablePage() {
  const [points, setPoints] = useState<Point[] | null>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const fetchPoints = async (pageNum: number, limitNum: number) => {
    setLoading(true);
    const res = await fetch(
      `/api/points-table?page=${pageNum}&limit=${limitNum}`
    );
    const data: PointsTableResponse = await res.json();
    setPoints(data.data);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    if (!points) {
      fetchPoints(page, limit);
    }
  }, [page, limit, points]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchPoints(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    fetchPoints(1, newLimit);
  };

  // Helper to generate page numbers (with ellipsis if needed)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          -1,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, -1, page - 1, page, page + 1, -1, totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="container min-h-screen mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Points Table</h1>
      <div className="flex justify-end mb-4">
        <label className="mr-2 font-medium" htmlFor="limit-select">
          Rows per page:
        </label>
        <select
          id="limit-select"
          className="border rounded px-2 py-1"
          value={limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
        >
          {LIMIT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {loading || !points ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="min-w-full border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2">Pos</th>
              <th className="px-2 py-2">Team</th>
              <th className="px-2 py-2">P</th>
              <th className="px-2 py-2">W</th>
              <th className="px-2 py-2">L</th>
              <th className="px-2 py-2">NR</th>
              <th className="px-2 py-2">NRR</th>
              <th className="px-2 py-2">Pts</th>
              <th className="px-2 py-2">Recent</th>
            </tr>
          </thead>
          <tbody>
            {points.map((row) => (
              <tr key={row.team.name} className="text-center border-t">
                <td className="px-2 py-2">{row.pos}</td>
                <td className="px-2 py-2 flex items-center gap-2 justify-center">
                  {row.team.logo && (
                    <Image
                      src={row.team.logo}
                      alt={row.team.name}
                      width={56}
                      height={56}
                      className="w-14 h-14"
                    />
                  )}
                  <span>{row.team.name}</span>
                </td>
                <td className="px-2 py-2">{row.p}</td>
                <td className="px-2 py-2">{row.w}</td>
                <td className="px-2 py-2">{row.l}</td>
                <td className="px-2 py-2">{row.nr}</td>
                <td className="px-2 py-2">{row.nrr}</td>
                <td className="px-2 py-2">{row.pts}</td>
                <td className="px-2 py-2">
                  {row.recentForm.map((f, i) => (
                    <span
                      key={row.team.name + "-recentForm-" + i}
                      className={`inline-block w-5 h-5 rounded-full text-xs font-bold mx-0.5 ${
                        f === "W"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && handlePageChange(page - 1)}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : 0}
              style={{ pointerEvents: page === 1 ? "none" : undefined }}
            />
          </PaginationItem>
          {getPageNumbers().map((pNum, idx) =>
            pNum === -1 ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={`page-${pNum}`}>
                <PaginationLink
                  isActive={pNum === page}
                  onClick={() => handlePageChange(pNum)}
                  href="#"
                >
                  {pNum}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && handlePageChange(page + 1)}
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : 0}
              style={{
                pointerEvents: page === totalPages ? "none" : undefined,
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
