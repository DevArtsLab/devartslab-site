// devartslab-site: DevArts Lab landing page.
//   devartslab.com / www.devartslab.com -> landing page
//   docs.devartslab.com is served by the devartslab-notion Worker (separate repo)

export interface Env {
  MAIL_DOMAIN: string;
  DOCS_HOSTNAME: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const host = new URL(request.url).hostname.toLowerCase();
    if (host === env.MAIL_DOMAIN || host === `www.${env.MAIL_DOMAIN}`)
      return landingPage(env);
    return new Response("devartslab-site", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

function landingPage(env: Env): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DevArts Lab</title>
<meta name="description" content="DevArts Lab - independent engineering studio">
<style>
  :root { --bg:#0b0d10; --panel:#12151a; --border:#23272e; --text:#e6e8eb; --muted:#8b9199; --accent:#f6821f; }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--bg); color:var(--text); font:15px/1.6 -apple-system,"Inter","Segoe UI",system-ui,sans-serif;
         min-height:100vh; display:flex; flex-direction:column; }
  header { padding:20px 32px; display:flex; align-items:center; gap:10px; border-bottom:1px solid var(--border); }
  .logo { width:28px; height:28px; border-radius:8px; background:var(--accent); color:#fff; display:grid;
          place-items:center; font-weight:700; }
  main { flex:1; display:grid; place-items:center; padding:48px 24px; }
  .hero { text-align:center; max-width:560px; }
  h1 { font-size:40px; font-weight:700; letter-spacing:-0.02em; }
  h1 em { color:var(--accent); font-style:normal; }
  p.sub { color:var(--muted); margin:12px 0 36px; font-size:16px; }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; }
  .card { background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:20px;
          text-decoration:none; color:var(--text); transition:border-color .15s, transform .15s; }
  .card:hover { border-color:var(--accent); transform:translateY(-2px); }
  .card b { display:block; margin-bottom:4px; }
  .card span { color:var(--muted); font-size:13px; }
  footer { padding:18px 32px; border-top:1px solid var(--border); color:var(--muted); font-size:12px;
           display:flex; justify-content:space-between; }
  footer a { color:var(--muted); }
</style>
</head>
<body>
<header><div class="logo">D</div><b>DevArts Lab</b></header>
<main>
  <div class="hero">
    <h1>Dev<em>Arts</em> Lab</h1>
    <p class="sub">Independent engineering studio. Self-hosted mail, calendar, and docs on Cloudflare.</p>
    <div class="cards">
      <a class="card" href="https://mail.${env.MAIL_DOMAIN}"><b>Mail</b><span>mail.${env.MAIL_DOMAIN}</span></a>
      <a class="card" href="https://${env.DOCS_HOSTNAME}"><b>Docs</b><span>${env.DOCS_HOSTNAME}</span></a>
      <a class="card" href="https://github.com/DevArtsLab"><b>GitHub</b><span>github.com/DevArtsLab</span></a>
    </div>
  </div>
</main>
<footer><span>&copy; ${new Date().getUTCFullYear()} DevArts Lab</span><a href="mailto:contact@${env.MAIL_DOMAIN}">contact@${env.MAIL_DOMAIN}</a></footer>
</body>
</html>`;
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
