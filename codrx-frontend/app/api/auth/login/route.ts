// app/api/auth/login/route.ts (Next.js)
export async function POST(req: Request) {
  const body = await req.text(); // raw JSON from browser
  const upstream = await fetch('http://127.0.0.1:8000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    redirect: 'manual',
  });

  const text = await upstream.text();
  const res = new Response(text, { status: upstream.status });

  const ct = upstream.headers.get('content-type'); if (ct) res.headers.set('content-type', ct);
  const sc = upstream.headers.get('set-cookie');   if (sc) res.headers.set('set-cookie', sc);

  return res;
}
