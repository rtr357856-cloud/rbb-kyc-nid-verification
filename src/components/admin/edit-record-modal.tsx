"use client";

import type { KycSubmission } from "@/types";

interface EditRecordModalProps {
  record: KycSubmission | null;
  onClose: () => void;
  onSaved: () => void;
}

export function EditRecordModal({ record, onClose, onSaved }: EditRecordModalProps) {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Record</h2>
        <p className="text-sm text-gray-500">Edit functionality coming soon.</p>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
        </div>
      </div>
    </div>
  );
}