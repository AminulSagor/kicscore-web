"use client";

import { Camera, Plus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface ProfileImageUploaderProps {
  imagePreview: string | null;
  onFileSelect: (file: File, previewUrl: string) => void;
}

export default function ProfileImageUploader({
  imagePreview,
  onFileSelect,
}: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //======= Handle photo select =======//
  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onFileSelect(file, previewUrl);
  };

  //======= Trigger file input =======//
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-22 overflow-visible">
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
      relative flex h-[200px] w-[200px] cursor-pointer items-center justify-center
      rounded-full bg-[#cedad5]
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
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center">
            <Camera size={42} className="text-secondary" />
            <span className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#6B7A75] dark:text-white/55">
              Select Photo
            </span>
          </div>
        )}

        <span
          className="
        absolute bottom-1 right-0 z-10 flex h-[60px] w-[60px]
        items-center justify-center rounded-full bg-secondary text-white
      "
        >
          <Plus size={34} />
        </span>
      </button>
    </div>
  );
}
