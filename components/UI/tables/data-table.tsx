"use client";

import type { DataTableProps } from "./table.types";

export default function DataTable<T>({
  data,
  columns,
  getRowKey,
  emptyMessage = "No data found",
  className = "",
  tableClassName = "",
}: DataTableProps<T>) {
  return (
    <div
      className={`
        w-full overflow-hidden rounded-2xl border border-[#DDE8E3]
        bg-white dark:border-white/10 dark:bg-[#111d1a]
        ${className}
      `}
    >
      <div className="overflow-x-auto">
        <table
          className={`w-full min-w-[760px] border-collapse text-left ${tableClassName}`}
        >
          <thead className="bg-[#EAF3EF] text-xs font-bold uppercase text-[#6B7A75] dark:bg-[#25302B] dark:text-white/60">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 ${column.headerClassName ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDE8E3] text-sm dark:divide-white/10">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={getRowKey(item, index)}
                  className="
                    text-[#10201B] transition hover:bg-[#F6FAF8]
                    dark:text-white dark:hover:bg-white/5
                  "
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 ${column.cellClassName ?? ""}`}
                    >
                      {column.render(item, index)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm font-medium text-[#6B7A75] dark:text-white/60"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
