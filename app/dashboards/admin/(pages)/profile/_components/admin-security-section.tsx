import type { ChangeEventHandler } from "react";

type Props = {
    currentPassword: string;
    newPassword: string;
    onCurrentPasswordChange: ChangeEventHandler<HTMLInputElement>;
    onNewPasswordChange: ChangeEventHandler<HTMLInputElement>;
};

export default function AdminSecuritySection({
    currentPassword,
    newPassword,
    onCurrentPasswordChange,
    onNewPasswordChange,
}: Props) {
    return (
        <div>
            <h3 className="text-base font-bold">Security</h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                        Current Password
                    </label>

                    <input
                        type="password"
                        value={currentPassword}
                        onChange={onCurrentPasswordChange}
                        placeholder="Enter current password"
                        className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none placeholder:text-[#6B7A75] focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/40"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                        New Password
                    </label>

                    <input
                        type="password"
                        value={newPassword}
                        onChange={onNewPasswordChange}
                        placeholder="Enter new password"
                        className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none placeholder:text-[#6B7A75] focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/40"
                    />
                </div>
            </div>
        </div>
    );
}