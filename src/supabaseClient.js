import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://tqyzskuoxdhrqhpxlnhz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeXpza3VveGRocnFocHhsbmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2ODE3NDcsImV4cCI6MjA3MzI1Nzc0N30.NDqNO5TNxBiP7QvwrbijU9wOj0pPt7I1z8meeiWHBXs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;












