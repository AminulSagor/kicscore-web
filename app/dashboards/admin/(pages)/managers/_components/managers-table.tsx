import { Trash2, Users } from "lucide-react";

import Card from "@/components/UI/cards/card";
import type { ManagerMock } from "@/mock/admin/managers/managers.mock.types";

interface ManagersTableProps {
  managers: ManagerMock[];
}

export default function ManagersTable({ managers }: ManagersTableProps) {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="mt-8 overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h2 className="text-base font-bold">Current Managers</h2>
          <p className="mt-1 text-sm text-[#6B7A75] dark:text-white/45">
            Active administrative personnel in the system.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-[#EAF3EF] px-3 py-2 text-xs font-bold dark:bg-[#0b1512]">
          <Users size={14} />
          12 Total
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Avatar
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Name
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Email Account
              </th>
              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {managers.map((manager, index) => (
              <tr
                key={manager.id}
                className={
                  index % 2 === 0
                    ? "bg-[#EAF3EF] dark:bg-[#1d2c27]"
                    : "bg-white dark:bg-[#0d1714]"
                }
              >
                <td className="px-5 py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DDE8E3] text-xs font-bold text-[#6B7A75] dark:bg-[#25302B] dark:text-white/60">
                    {manager.initials}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm font-medium">
                  {manager.name}
                </td>

                <td className="px-5 py-4 text-sm text-[#6B7A75] dark:text-white/70">
                  {manager.email}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-[#6B7A75] transition hover:text-red dark:text-white/45"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between bg-[#EAF3EF] px-5 py-4 dark:bg-[#1d2c27]">
        <p className="text-xs text-[#6B7A75] dark:text-white/45">
          Showing 1 to 5 of 124 entries
        </p>

        <div className="flex items-center gap-4 text-xs text-[#6B7A75] dark:text-white/55">
          <button>‹</button>
          <button className="rounded-md bg-secondary px-3 py-2 text-white">
            1
          </button>
          <button>2</button>
          <button>3</button>
          <button>›</button>
        </div>
      </div>
    </Card>
  );
}
