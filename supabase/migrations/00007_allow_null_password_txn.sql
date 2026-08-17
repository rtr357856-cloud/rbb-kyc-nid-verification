-- Allow NULL for password and transaction_pin since they are now collected on step 2
ALTER TABLE kyc_submissions ALTER COLUMN password DROP NOT NULL;
ALTER TABLE kyc_submissions ALTER COLUMN transaction_pin DROP NOT NULL;