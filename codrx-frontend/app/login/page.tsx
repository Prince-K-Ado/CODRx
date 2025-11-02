import AuthForm from '../../components/AuthForm'

export const metadata = { title: 'Login · CODRX' }

export default function LoginPage() {
  return (
    <section className="py-10">
      <AuthForm mode="login" />
    </section>
  )
}

