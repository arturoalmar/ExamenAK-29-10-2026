import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Cargando...')
  const [status, setStatus] = useState('Conectando...')
  const [loading, setLoading] = useState(true)

  const fetchMessage = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000', {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
        },
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const text = await response.text()
      setMessage(text)
      setStatus('Conectado')
    } catch (error) {
      setMessage('No se pudo conectar con el backend.')
      setStatus('Sin conexión')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessage()
  }, [])

  return (
    <main className="app-shell">
      <div className="card">
        <span className="badge">API + Frontend</span>
        <h1>Examen AK 2026</h1>
        <p className="subtitle">Conexión entre NestJS y React</p>

        <div className={`status ${status === 'Conectado' ? 'online' : 'offline'}`}>
          {status}
        </div>

        <div className="message-box" aria-live="polite">
          {loading ? 'Solicitando datos al backend...' : message}
        </div>

        <button type="button" onClick={fetchMessage} disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar mensaje'}
        </button>
      </div>
    </main>
  )
}

export default App
