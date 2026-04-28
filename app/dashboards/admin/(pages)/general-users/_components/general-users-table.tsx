import { Ban, RotateCcw, Trash2 } from "lucide-react";
import Image from "next/image";

import Card from "@/components/UI/cards/card";
import type { GeneralUserMock } from "@/mock/admin/general-users/general-users.mock.types";

interface GeneralUsersTableProps {
  users: GeneralUserMock[];
}

export default function GeneralUsersTable({ users }: GeneralUsersTableProps) {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="mt-6 overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead className="bg-[#EAF3EF] dark:bg-[#1d2c27]">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                User
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Email Address
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Status
              </th>
              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-[#101c19]"
                    : "bg-[#F6FAF8] dark:bg-[#0d1714]"
                }`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={34}
                      height={34}
                      className="h-8.5 w-8.5 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-sm font-bold">{user.name}</h3>
                      <p className="text-xs text-[#6B7A75] dark:text-white/45">
                        Joined {user.joinedDate}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-[#10201B]/80 dark:text-white/75">
                  {user.email}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-md px-3 py-1 text-xs font-bold capitalize ${
                      user.status === "active"
                        ? "bg-secondary/15 text-secondary dark:bg-secondary/20 dark:text-mint-green"
                        : "bg-red/15 text-red dark:bg-red/25"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="text-[#6B7A75] transition hover:text-secondary dark:text-white/55 dark:hover:text-mint-green"
                    >
                      {user.status === "blocked" ? (
                        <RotateCcw size={17} />
                      ) : (
                        <Ban size={17} />
                      )}
                    </button>

                    <button
                      type="button"
                      className="text-[#6B7A75] transition hover:text-red dark:text-white/55"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
