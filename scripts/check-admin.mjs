
import { createClient } from '@supabase/supabase-js'

const [, , url, key] = process.argv

if (!url || !key) {
    console.error("Usage: node scripts/check-admin.mjs <url> <key>")
    process.exit(1)
}

const supabase = createClient(url, key)

async function checkProfiles() {
    console.log("Checking profiles table...")
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) {
        console.error("Error:", error.message)
        return
    }
    console.log(`Total profiles found: ${data.length}`)
    data.forEach(p => {
        console.log(`[ID] ${p.id} | [ROLE] ${p.role} | [NAME] ${p.full_name}`)
    })
}

checkProfiles()
