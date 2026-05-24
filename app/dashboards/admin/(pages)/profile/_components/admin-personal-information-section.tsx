import type { ChangeEventHandler } from "react";

type Props = {
    fullName: string;
    email: string;
    onFullNameChange: ChangeEventHandler<HTMLInputElement>;
};

export default function AdminPersonalInformationSection({
    fullName,
    email,
    onFullNameChange,
}: Props) {
    return (
        <div>
            <h3 className="text-base font-bold">Personal Information</h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={onFullNameChange}
                        className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
}