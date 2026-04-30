"use client";

import Accordion from "@/components/UI/accordion/accordion";
import type { DataTableProps } from "./table.types";

export default function DataTable<T>({
  data,
  columns,
  getRowKey,
  emptyMessage = "No data found",
  className = "",
  tableClassName = "",
  title,
  defaultOpen = true,
}: DataTableProps<T>) {
  const tableContent = (
    <div className="overflow-x-auto">
      <table
        className={`w-full min-w-[760px] border-collapse text-left ${tableClassName}`}
      >
        <thead className="text-xs font-bold text-[#6B7A75] dark:text-white/65">
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

        <tbody className="text-sm">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={getRowKey(item, index)}
                className="text-[#10201B] transition hover:bg-[#F6FAF8] dark:text-white dark:hover:bg-white/5"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3.5 ${column.cellClassName ?? ""}`}
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
  );

  if (title) {
    return (
      <Accordion title={title} defaultOpen={defaultOpen} className={className}>
        {tableContent}
      </Accordion>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white dark:border-white/10 dark:bg-[#111d1a] ${className}`}
    >
      {tableContent}
    </div>
  );
}
