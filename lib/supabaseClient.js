// Se obtienen las variables del entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Se crea el cliente de conexión
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
