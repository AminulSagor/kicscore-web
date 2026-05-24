import { Upload } from "lucide-react";
import Image from "next/image";
import type { ChangeEventHandler, RefObject } from "react";

import { IMAGE } from "@/constants/image.path";

type Props = {
    fileInputRef: RefObject<HTMLInputElement | null>;
    previewImageUrl: string | null;
    savedProfilePhotoUrl: string | null;
    isUploadingPhoto: boolean;
    onProfilePhotoChange: ChangeEventHandler<HTMLInputElement>;
};

export default function AdminAvatarSection({
    fileInputRef,
    previewImageUrl,
    savedProfilePhotoUrl,
    isUploadingPhoto,
    onProfilePhotoChange,
}: Props) {
    return (
        <div className="flex items-center gap-5">
            <Image
                src={previewImageUrl ?? savedProfilePhotoUrl ?? IMAGE.profile_image}
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

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                    onChange={onProfilePhotoChange}
                />

                <button
                    type="button"
                    disabled={isUploadingPhoto}
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 flex cursor-pointer items-center gap-2 text-sm font-bold text-secondary transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 dark:text-mint-green"
                >
                    <Upload size={14} />
                    {isUploadingPhoto ? "Uploading..." : "Change Profile Photo"}
                </button>
            </div>
        </div>
    );
}