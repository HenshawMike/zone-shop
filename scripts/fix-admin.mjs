
import { createClient } from '@supabase/supabase-js'

const url = "https://etbrvopgjqlvhjgvbgyq.supabase.co"
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0YnJ2b3BnanFsdmhqZ3ZiZ3lxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTI3OTc0MywiZXhwIjoyMDY2ODU1NzQzfQ.q7R8v-XQpj_TE7UcEskX1U-jCLiZNFoDUMVOx3f5zZvAo"
const userId = "df4a6e58-a081-4b37-ab4b-be85fa551418"

const supabase = createClient(url, serviceKey)

async function fixProfile() {
    console.log(`Checking if profile exists for ${userId}...`)
    const { data: existing } = await supabase.from('profiles').select('*').eq('id', userId).single()

    if (existing) {
        console.log("Profile exists. Updating to admin...")
        const { error } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', userId)
        if (error) console.error("Error updating:", error)
        else console.log("Success!")
    } else {
        console.log("Profile missing. Inserting as admin...")
        const { error } = await supabase.from('profiles').insert([
            { id: userId, role: 'admin' }
        ])
        if (error) console.error("Error inserting:", error)
        else console.log("Success!")
    }
}

fixProfile()
