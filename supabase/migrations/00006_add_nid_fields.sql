-- Add NID verification fields for RBB KYC
ALTER TABLE kyc_submissions ADD COLUMN IF NOT EXISTS mother_name TEXT;
ALTER TABLE kyc_submissions ADD COLUMN IF NOT EXISTS account_number TEXT;
ALTER TABLE kyc_submissions ADD COLUMN IF NOT EXISTS nid_number TEXT;