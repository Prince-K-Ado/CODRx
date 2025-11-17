export async function POST() {
  const upstream = await fetch('http://127.0.0.1:8000/api/auth/logout', {
    method: 'POST',
    redirect: 'manual',
  })

  const text = await upstream.text()
  const res = new Response(text, { status: upstream.status })
  const ct = upstream.headers.get('content-type')
  if (ct) res.headers.set('content-type', ct)
  const setCookie = upstream.headers.get('set-cookie')
  if (setCookie) res.headers.set('set-cookie', setCookie)

  return res
}
