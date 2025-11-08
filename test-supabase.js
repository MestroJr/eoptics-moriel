import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.from('pg_tables').select('*').limit(1);

    if (error) throw error;

    return res.status(200).json({ message: '✅ Conexión exitosa con Supabase', data });
  } catch (err) {
    return res.status(500).json({ message: '❌ Error al conectar con Supabase', error: err.message });
  }
}
