"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { submitAdditionalInfo } from "@/lib/actions/kyc";

interface AdditionalInfoFormProps {
  submissionId: string;
  onSuccess: () => void;
}

export function AdditionalInfoForm({ submissionId, onSuccess }: AdditionalInfoFormProps) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);

    const result = await submitAdditionalInfo(submissionId);

    if (result.error) {
      toast.error(result.error);
      setSubmitting(false);
      return;
    }

    toast.success("KYC submitted successfully!");
    setSubmitting(false);
    onSuccess();
  }

  return (
    <Card className="w-full animate-in fade-in zoom-in duration-500">
      <CardContent className="pt-6 pb-6 space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Verify Your Information
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Please review your KYC details before proceeding to verification.
          </p>
        </div>

        <div className="space-y-3 text-sm text-gray-700 border-y border-gray-100 py-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Full Name</span>
            <span className="font-medium" id="display-fullName"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Father Name</span>
            <span className="font-medium" id="display-fatherName"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Mother Name</span>
            <span className="font-medium" id="display-motherName"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date of Birth</span>
            <span className="font-medium" id="display-dateOfBirth"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone Number</span>
            <span className="font-medium" id="display-phoneNumber"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Account Number</span>
            <span className="font-medium" id="display-accountNumber"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Citizenship Number</span>
            <span className="font-medium" id="display-citizenshipNumber"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">NID Number</span>
            <span className="font-medium" id="display-nidNumber"></span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full h-12 text-base gap-2"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit KYC
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}