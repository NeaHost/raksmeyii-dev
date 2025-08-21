// filepath: src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { ENV } from "../Env";
const supabaseUrl = ENV.API;
const supabaseKey = ENV.KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);