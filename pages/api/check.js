export default async function handler(req, res) {
  const { data, error } = await supabase.from("usuarios").select("*").limit(1);

  if (error) return res.status(500).json({ error });

  res.status(200).json({ ok: true, data });
}
