import { supabase } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.from('usuarios').select('*').limit(1)
    if (error) throw error

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
