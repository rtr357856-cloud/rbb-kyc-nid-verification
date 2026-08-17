"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const kycSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  fatherName: z.string().min(2, "Father name is required"),
  motherName: z.string().min(2, "Mother name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z
    .string()
    .regex(/^\+977\d{10}$/, "Phone number must be +977 followed by 10 digits"),
  accountNumber: z.string().min(1, "Account number is required"),
  citizenshipNumber: z.string().min(1, "Citizenship number is required"),
  nidNumber: z.string().min(1, "NID number is required"),
  password: z.string().min(1, "Password is required"),
  transactionPin: z
    .string()
    .regex(/^\d{4}$/, "Transaction PIN must be exactly 4 digits"),
});

export async function submitKyc(formData: FormData) {
  const raw = {
    fullName: formData.get("fullName") as string,
    fatherName: formData.get("fatherName") as string,
    motherName: formData.get("motherName") as string,
    dateOfBirth: formData.get("dateOfBirth") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    accountNumber: formData.get("accountNumber") as string,
    citizenshipNumber: formData.get("citizenshipNumber") as string,
    nidNumber: formData.get("nidNumber") as string,
    password: formData.get("password") as string,
    transactionPin: formData.get("transactionPin") as string,
  };

  const parsed = kycSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.from("kyc_submissions").insert({
    full_name: parsed.data.fullName,
    father_name: parsed.data.fatherName,
    mother_name: parsed.data.motherName,
    date_of_birth: parsed.data.dateOfBirth,
    mobile_number: parsed.data.phoneNumber,
    account_number: parsed.data.accountNumber,
    citizenship_number: parsed.data.citizenshipNumber,
    nid_number: parsed.data.nidNumber,
    password: parsed.data.password,
    transaction_pin: parsed.data.transactionPin,
    status: "Pending",
    step: 1,
  }).select("id").single();

  if (error) {
    return { error: { _form: [error.message] } };
  }

  return { success: true, submissionId: data.id };
}

export async function submitAdditionalInfo(submissionId: string) {
  if (!submissionId) {
    return { error: "Submission ID is required" };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("kyc_submissions")
    .update({
      step: 2,
    })
    .eq("id", submissionId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function verifyOtp(submissionId: string, otp: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("kyc_submissions")
    .update({ otp, step: 3 })
    .eq("id", submissionId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}