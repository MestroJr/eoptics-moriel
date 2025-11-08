import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.from('clientes').select('*')

    if (error) throw error

    res.status(200).json({ success: true, data })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}
