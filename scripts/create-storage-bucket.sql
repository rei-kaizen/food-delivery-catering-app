-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true);

-- Create policy to allow public uploads
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'payment-proofs');

-- Create policy to allow public access to files
CREATE POLICY "Allow public access" ON storage.objects
  FOR SELECT USING (bucket_id = 'payment-proofs');
