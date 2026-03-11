
import { createClient } from '@supabase/supabase-js'

const url = "https://etbrvopgjqlvhjgvbgyq.supabase.co"
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0YnJ2b3BnanFsdmhqZ3ZiZ3lxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTI3OTc0MywiZXhwIjoyMDY2ODU1NzQzfQ.q7R8v-XQpj_TE7UcEskX1U-jCLiZNFoDUMVOx3f5zZvAo"

const supabase = createClient(url, serviceKey)

async function createBucket() {
    console.log("Checking for 'product-images' bucket...")

    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    if (listError) {
        console.error("Error listing buckets:", listError.message)
        return
    }

    const exists = buckets.find(b => b.name === 'product-images')
    if (exists) {
        console.log("Bucket already exists.")
    } else {
        console.log("Creating 'product-images' bucket...")
        const { error: createError } = await supabase.storage.createBucket('product-images', {
            public: true,
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
            fileSizeLimit: 5242880 // 5MB
        })

        if (createError) {
            console.error("Error creating bucket:", createError.message)
        } else {
            console.log("Bucket created successfully!")
        }
    }
}

createBucket()
