"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateKycStatus } from "@/lib/actions/admin";
import type { KycSubmission } from "@/types";

interface EditRecordModalProps {
  record: KycSubmission | null;
  onClose: () => void;
  onSaved: () => void;
}

export function EditRecordModal({ record, onClose, onSaved }: EditRecordModalProps) {
  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [saving, setSaving] = useState(false);

  if (!record) return null;

  async function handleSave() {
    if (!record) return;
    setSaving(true);
    const result = await updateKycStatus(record.id, status);
    if (result.error) {
      toast.error(result.error);
      setSaving(false);
      return;
    }
    toast.success("Status updated");
    setSaving(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Edit Record</h2>
        <p className="text-sm text-gray-500">
          Update status for <span className="font-medium text-gray-700">{record.full_name}</span>
        </p>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
          <select
            defaultValue={record.status}
            onChange={(e) => setStatus(e.target.value as "Pending" | "Approved" | "Rejected")}
            className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}