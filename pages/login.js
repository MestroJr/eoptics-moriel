// pages/login.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('magic'); // 'magic' or 'password'
  const router = useRouter();

  async function signInMagic(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) return alert(error.message);
    alert('Revisa tu correo para iniciar sesión (magic link).');
  }

  async function signInPassword(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    // on success user session will be set and you can redirect
    router.push('/dashboard/users');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff' }}>
      <div style={{ width: 420, background: '#0b1220', padding: 24, borderRadius: 8 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 12 }}>e-Optics Moriel — Iniciar sesión</h2>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => setMode('magic')} style={{ flex: 1, padding: 8, background: mode === 'magic' ? '#111827' : '#0b1220' }}>Magic link</button>
          <button onClick={() => setMode('password')} style={{ flex: 1, padding: 8, background: mode === 'password' ? '#111827' : '#0b1220' }}>Contraseña</button>
        </div>

        {mode === 'magic' ? (
          <form onSubmit={signInMagic}>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6 }} />
            <button type="submit" style={{ width: '100%', padding: 10, background: '#fff', color: '#000', borderRadius: 6 }}>Enviar enlace</button>
          </form>
        ) : (
          <form onSubmit={signInPassword}>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6 }} />
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6 }} />
            <button type="submit" style={{ width: '100%', padding: 10, background: '#fff', color: '#000', borderRadius: 6 }}>Iniciar</button>
          </form>
        )}

        <div style={{ marginTop: 12, textAlign: 'center', color: '#9ca3af' }}>
          <small>¿No tienes cuenta? Pide a un admin que te cree un usuario desde el panel.</small>
        </div>
      </div>
    </div>
  );
}
