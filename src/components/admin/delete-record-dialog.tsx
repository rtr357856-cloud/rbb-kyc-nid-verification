"use client";

import type { KycSubmission } from "@/types";

interface DeleteRecordDialogProps {
  record: KycSubmission | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteRecordDialog({ record, onClose, onDeleted }: DeleteRecordDialogProps) {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Delete Record</h2>
        <p className="text-sm text-gray-500">Are you sure you want to delete this record?</p>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
          <button onClick={onDeleted} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
}