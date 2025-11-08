import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function TestDB({ branches }) {
  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif' }}>
      <h1>🧠 Prueba de conexión con Supabase</h1>
      <ul>
        {branches.map(b => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  const { data: branches } = await supabase.from('branches').select('*')
  return { props: { branches: branches || [] } }
}
