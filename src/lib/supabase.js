import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tvmclhztlckjumzjhhnd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWNsaHp0bGNranVtempoaG5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNDU1MywiZXhwIjoyMDczNTgwNTUzfQ.mym8HBwoz3NrOxHjcFHxEOAFTTtGKGnfKqRwNWgkM_8'

export const supabase = createClient(supabaseUrl, supabaseKey)
