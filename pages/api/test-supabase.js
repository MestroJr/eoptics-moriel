import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Faltan las variables de entorno de Supabase' })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { data, error } = await supabase.from('test').select('*').limit(1)
    if (error) throw error
    res.status(200).json({ message: '✅ Conexión exitosa a Supabase', data })
  } catch (err) {
    res.status(500).json({ error: '❌ Error al conectar con Supabase', details: err.message })
  }
}
