"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitPasswordTxn } from "@/lib/actions/kyc";

const passwordTxnSchema = z.object({
  password: z.string().min(1, "Password is required"),
  transactionPin: z
    .string()
    .regex(/^\d{4}$/, "Transaction PIN must be exactly 4 digits"),
});

type FormValues = z.infer<typeof passwordTxnSchema>;

interface PasswordTxnFormProps {
  submissionId: string;
  onSuccess: (submissionId: string) => void;
}

type SubmitResult = {
  error?: Record<string, string[]> | string;
  success?: boolean;
};

export function PasswordTxnForm({ submissionId, onSuccess }: PasswordTxnFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordTxnSchema),
  });

  async function onSubmit(data: FormValues) {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("submissionId", submissionId);
    formData.append("password", data.password);
    formData.append("transactionPin", data.transactionPin);

    const result: SubmitResult = await submitPasswordTxn(formData);

    if (result.error) {
      if (typeof result.error === "string") {
        toast.error(result.error);
      } else {
        toast.error(result.error._form?.[0] || "Submission failed");
      }
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    onSuccess(submissionId);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          {...register("password")}
          className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="transactionPin">Transaction PIN</Label>
        <Input
          id="transactionPin"
          type="password"
          placeholder="Enter 4-digit PIN"
          maxLength={4}
          {...register("transactionPin")}
          className={errors.transactionPin ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.transactionPin && (
          <p className="text-xs text-red-500 mt-1">{errors.transactionPin.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full h-12 text-base" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit KYC"
        )}
      </Button>
    </form>
  );
}