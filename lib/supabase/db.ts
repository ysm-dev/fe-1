import { createStorage } from "unstorage"

import supabaseStorageDriver, {
  type SupabaseOptions,
} from "lib/supabase/driver"

const opt: SupabaseOptions = {
  url: "https://bgsouxddbkftvxnrdgqx.supabase.co",
  key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnc291eGRkYmtmdHZ4bnJkZ3F4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODU1MDc4OSwiZXhwIjoyMDM0MTI2Nzg5fQ.NeRTeaQ10iKigMTnliiw2ggAJlVwvQkfmGZENDzxrzA`,
  bucket: "kv",
}

export const db = createStorage({ driver: supabaseStorageDriver(opt) })
