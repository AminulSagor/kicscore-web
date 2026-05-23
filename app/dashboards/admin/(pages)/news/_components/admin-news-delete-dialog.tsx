"use client";

import Button from "@/components/UI/buttons/button";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import Dialog from "@/components/UI/dialogs/dialog";

type AdminNewsDeleteDialogProps = {
  open: boolean;
  isDeleting: boolean;
  newsTitle?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function AdminNewsDeleteDialog({
  open,
  isDeleting,
  newsTitle,
  onClose,
  onConfirm,
}: AdminNewsDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose} size="sm" position="center">
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold">Delete News?</h2>
          <p className="mt-2 text-sm text-white/70">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {newsTitle || "this news"}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            size="base"
            variant="secondary"
            disabled={isDeleting}
            onClick={onClose}
            className="bg-white/10 text-white hover:bg-white/15"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="base"
            disabled={isDeleting}
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? (
              <>
                Deleting
                <ButtonLoader size="sm" />
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
