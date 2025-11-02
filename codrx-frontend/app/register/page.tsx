import AuthForm from '../../components/AuthForm'

export const metadata = { title: 'Register · CODRX' }

export default function RegisterPage() {
  return (
    <section className="py-10">
      <AuthForm mode="register" />
    </section>
  )
}
