import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { demoUsers } from '../data'
import { useSession } from '../session'
import { isRole } from '../useRole'

export default function SignIn() {
  const { role } = useParams()
  const { signIn } = useSession()
  const navigate = useNavigate()
  const [username, setUsername] = useState(isRole(role) ? demoUsers[role].username : '')
  const [password, setPassword] = useState('password')

  if (!isRole(role)) return <Navigate to="/" replace />

  const submit = (e: FormEvent) => {
    e.preventDefault()
    signIn(role)
    navigate(`/${role}`)
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-sm col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Pigeon Connect logo" width={72} />
            <h1 className="h4 mt-2 mb-1">Sign in</h1>
            <p className="text-body-secondary mb-0">{demoUsers[role].title} account</p>
          </div>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign in</button>
          </form>
          <p className="small text-body-secondary text-center mt-3 mb-2">Prototype: any username and password will work.</p>
          <div className="text-center">
            <Link to="/" className="small">Choose a different role</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
