"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const kycFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  fatherName: z.string().min(2, "Father name is required"),
  motherName: z.string().min(2, "Mother name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z
    .string()
    .regex(/^\+977\d{10}$/, "Must be +977 followed by 10 digits"),
  accountNumber: z.string().min(1, "Account number is required"),
  citizenshipNumber: z.string().min(1, "Citizenship number is required"),
  nidNumber: z.string().min(1, "NID number is required"),
});

export type KycFormValues = z.infer<typeof kycFormSchema>;

interface KycFormProps {
  onContinue: (data: KycFormValues) => void;
}

export function KycForm({ onContinue }: KycFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KycFormValues>({
    resolver: zodResolver(kycFormSchema),
    defaultValues: {
      phoneNumber: "+977",
    },
  });

  function onSubmit(data: KycFormValues) {
    onContinue(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...register("fullName")}
          className={errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fatherName">Father Name</Label>
        <Input
          id="fatherName"
          placeholder="Enter your father's name"
          {...register("fatherName")}
          className={errors.fatherName ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.fatherName && (
          <p className="text-xs text-red-500 mt-1">{errors.fatherName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="motherName">Mother Name</Label>
        <Input
          id="motherName"
          placeholder="Enter your mother's name"
          {...register("motherName")}
          className={errors.motherName ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.motherName && (
          <p className="text-xs text-red-500 mt-1">{errors.motherName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          {...register("dateOfBirth")}
          className={errors.dateOfBirth ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.dateOfBirth && (
          <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder="+977XXXXXXXXXX"
          {...register("phoneNumber")}
          className={errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          placeholder="Enter your account number"
          {...register("accountNumber")}
          className={errors.accountNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.accountNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.accountNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="citizenshipNumber">Citizenship Number</Label>
        <Input
          id="citizenshipNumber"
          placeholder="Enter citizenship number"
          {...register("citizenshipNumber")}
          className={errors.citizenshipNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.citizenshipNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.citizenshipNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nidNumber">NID Number</Label>
        <Input
          id="nidNumber"
          placeholder="Enter NID number"
          {...register("nidNumber")}
          className={errors.nidNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.nidNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.nidNumber.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full h-12 text-base">
        Continue
      </Button>
    </form>
  );
}