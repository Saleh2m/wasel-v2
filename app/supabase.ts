import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://aufvtaabhgqealykhhid.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1ZnZ0YWFiaGdxZWFseWtoaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDExODgsImV4cCI6MjA5MjQxNzE4OH0.kNg1IkSJ-MbNEc0OuX18yvu6tN31miAzJqzmE5WBiM0'
)
