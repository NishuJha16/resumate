import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://fliebgbkfepwvyuxruvi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaWViZ2JrZmVwd3Z5dXhydXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzMyMjgsImV4cCI6MjA2ODM0OTIyOH0.oda6-za0jHJmjhm7uTHu9WACzkYoVntzBg5h5-AtWis"
);
