"use client";

import { Camera, Plus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import Button from "@/components/UI/buttons/button";

export default function ProfileUploadPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ============ Handle Photo Select ============ */
  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  /* ============ Handle Upload Click ============ */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="px-4 py-10 text-foreground">
      <section className="mx-auto flex w-full max-w-[430px] flex-col items-center text-center">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-[#10201B] dark:text-white lg:text-3xl">
            Verified! Let&apos;s set up
            <br />
            your profile.
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#6B7A75] dark:text-white/60">
            Upload a photo so your friends can
            <br />
            find you.
          </p>
        </div>

        <div className="mt-28">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleUploadClick}
            className="
              relative flex h-[164px] w-[164px] items-center justify-center
              cursor-pointer rounded-full bg-[#cedad5]
              shadow-[0_25px_55px_rgba(10,124,88,0.12)]
              transition hover:scale-[1.02]
              dark:bg-[#25302B]
            "
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Selected profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Camera size={34} className="text-secondary" />
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7A75] dark:text-white/55">
                  Select Photo
                </span>
              </div>
            )}

            <span
              className="
                absolute bottom-2 right-2 flex h-12 w-12 items-center
                justify-center rounded-full bg-secondary text-white
              "
            >
              <Plus size={24} />
            </span>
          </button>
        </div>

        <Button
          type="button"
          rounded="full"
          className="mt-24 h-13 w-full text-xs font-bold uppercase tracking-[0.22em]"
        >
          Continue
        </Button>

        <button
          type="button"
          className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7A75] transition hover:text-secondary dark:text-white/50 dark:hover:text-mint-green"
        >
          Skip for now
        </button>
      </section>
    </main>
  );
}
