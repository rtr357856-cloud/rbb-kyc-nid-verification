"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteKycSubmission } from "@/lib/actions/admin";
import type { KycSubmission } from "@/types";

interface DeleteRecordDialogProps {
  record: KycSubmission | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteRecordDialog({ record, onClose, onDeleted }: DeleteRecordDialogProps) {
  const [deleting, setDeleting] = useState(false);

  if (!record) return null;

  async function handleDelete() {
    if (!record) return;
    setDeleting(true);
    const result = await deleteKycSubmission(record.id);
    if (result.error) {
      toast.error(result.error);
      setDeleting(false);
      return;
    }
    toast.success("Record deleted");
    setDeleting(false);
    onDeleted();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Delete Record</h2>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete <span className="font-medium text-gray-700">{record.full_name}</span>&apos;s record? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose} disabled={deleting}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}