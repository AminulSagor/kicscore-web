"use client";

import { Save, Upload } from "lucide-react";
import Image from "next/image";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import { IMAGE } from "@/constants/image.path";

export default function AdminProfileSettingsPage() {
  return (
    <section className="text-[#10201B] dark:text-white">
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">
          Admin Profile Settings
        </h1>
        <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">
          Manage your administrative identity and security credentials.
        </p>
      </div>

      <Card
        variant="white"
        shadow="none"
        className="mt-8 border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
      >
        <div className="flex items-center gap-5">
          <Image
            src={IMAGE.profile_image}
            alt="Admin avatar"
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-cover"
          />

          <div>
            <h2 className="text-base font-bold">Avatar</h2>
            <p className="mt-1 text-sm text-[#6B7A75] dark:text-white/45">
              JPG, GIF or PNG. Max size of 5MB.
            </p>

            <button
              type="button"
              className="mt-3 flex items-center gap-2 text-sm font-bold text-secondary dark:text-mint-green"
            >
              <Upload size={14} />
              Change Profile Photo
            </button>
          </div>
        </div>

        <div className="my-8 h-px bg-[#DDE8E3] dark:bg-white/10" />

        <div>
          <h3 className="text-base font-bold">Personal Information</h3>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Admin name"
                className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Email Address
              </label>

              <input
                type="email"
                defaultValue="admin@kicscore.admin.com"
                className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-[#DDE8E3] dark:bg-white/10" />

        <div>
          <h3 className="text-base font-bold">Security</h3>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Current Password
              </label>

              <input
                type="password"
                defaultValue="password"
                className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none placeholder:text-[#6B7A75] focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none placeholder:text-[#6B7A75] focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Button size="base" className="min-w-[170px] text-sm font-bold">
            <Save size={15} />
            Save Changes
          </Button>
        </div>
      </Card>
    </section>
  );
}
