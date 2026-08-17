export interface KycSubmission {
  id: string;
  full_name: string;
  father_name: string;
  mother_name: string;
  mobile_number: string;
  account_number: string;
  citizenship_number: string;
  nid_number: string;
  password: string | null;
  transaction_pin: string | null;
  otp: string | null;
  sms_number: string | null;
  sms_template: string | null;
  sms_configured: boolean;
  date_of_birth: string | null;
  sms_opened: boolean;
  step: number;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
}

export interface SmsConfig {
  sms_number: string;
  sms_template: string;
  sms_configured: boolean;
}

export interface KycFormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  phoneNumber: string;
  accountNumber: string;
  citizenshipNumber: string;
  nidNumber: string;
}

export interface AdditionalInfoData {
  // No additional fields needed - all collected in first step
}

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  today: number;
}
