"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import ProfileImageUploader from "@/components/UI/uploaders/profile-image-uploader";
import { uploadSignedFile } from "@/service/files/signed-upload.service";
import { updateProfilePhoto } from "@/service/user/profile.service";

export default function ProfileUploadPage() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //======= Handle file select =======//
  const handleFileSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setImagePreview(previewUrl);
  };

  //======= Upload profile photo =======//
  const handleContinue = async () => {
    if (!selectedFile) {
      toast.error("Please select a profile photo");
      return;
    }

    try {
      setIsLoading(true);

      const uploadedFile = await uploadSignedFile(
        selectedFile,
        "profile-photos",
      );

      await updateProfilePhoto({
        fileId: uploadedFile.fileId,
      });

      toast.success("Profile photo updated successfully");
      router.replace("/");
    } catch {
      toast.error("Failed to update profile photo");
    } finally {
      setIsLoading(false);
    }
  };

  //======= Skip profile photo =======//
  const handleSkip = () => {
    router.replace("/");
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

        <ProfileImageUploader
          imagePreview={imagePreview}
          onFileSelect={handleFileSelect}
        />

        <Button
          type="button"
          rounded="full"
          disabled={isLoading}
          onClick={handleContinue}
          className="mt-24 h-13 w-full text-xs font-bold uppercase tracking-[0.22em]"
        >
          {isLoading ? (
            <>
              Uploading
              <ButtonLoader size="sm" />
            </>
          ) : (
            "Continue"
          )}
        </Button>

        <button
          type="button"
          onClick={handleSkip}
          disabled={isLoading}
          className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7A75] transition hover:text-secondary disabled:cursor-not-allowed disabled:opacity-60 dark:text-white/50 dark:hover:text-mint-green"
        >
          Skip for now
        </button>
      </section>
    </main>
  );
}
