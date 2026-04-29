import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (item: T, index: number) => ReactNode;
};

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (item: T, index: number) => string;
  emptyMessage?: string;
  className?: string;
  tableClassName?: string;
};
