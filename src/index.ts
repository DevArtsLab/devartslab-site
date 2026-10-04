// devartslab-site: DevArts Lab landing page.
//   devartslab.com / www.devartslab.com -> landing page
//   docs.devartslab.com is served by the devartslab-notion Worker (separate repo)
//   data.devartslab.com is served by the tool-github-export Worker (separate repo)

export interface Env {
  MAIL_DOMAIN: string;
  DOCS_HOSTNAME: string;
  DATA_HOSTNAME: string;
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
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root { --bg:#0b0c10; --panel:#131419; --border:rgba(255,255,255,.08); --border-strong:rgba(255,255,255,.14);
          --text:#eceef4; --muted:#8b91a3; --accent:#88708e; --accent-soft:rgba(136,112,142,.2); }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--bg); color:var(--text); font:15px/1.6 "Inter",-apple-system,"Segoe UI",system-ui,sans-serif;
         min-height:100vh; display:flex; flex-direction:column; }
  header { padding:20px 32px; display:flex; align-items:center; gap:10px; border-bottom:1px solid var(--border); }
  .logo { width:28px; height:28px; border-radius:8px; display:block; }
  main { flex:1; display:grid; place-items:center; padding:48px 24px; }
  .hero { display:flex; flex-direction:column; align-items:center; gap:40px;
          max-width:1060px; width:100%; text-align:center; }
  .hero-logo { width:min(400px,100%); border-radius:20px; border:1px solid var(--border);
               display:block; margin:0 auto 24px; box-shadow:0 12px 40px rgba(0,0,0,.45); }
  h1 { font-size:44px; font-weight:700; letter-spacing:-0.02em; }
  h1 em { color:var(--accent); font-style:normal; }
  p.sub { color:var(--muted); margin:12px 0 0; font-size:17px; }
  .cards { width:100%; display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; }
  @media (min-width:800px) {
    .hero { flex-direction:row; align-items:center; gap:56px; }
    .brand { flex:1; }
    .cards { order:-1; flex:0 0 280px; grid-template-columns:1fr; }
    .hero-logo { width:min(500px,100%); }
    h1 { font-size:56px; }
    p.sub { font-size:18px; }
  }
  .products { max-width:1060px; width:100%; margin-top:64px; }
  .products h2 { font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:.12em;
                 color:var(--muted); margin-bottom:16px; margin-left:20px; }
  .product-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px; }
  .card.primary { border-color:rgba(136,112,142,.55); }
  .card { background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:20px;
          text-decoration:none; color:var(--text); transition:border-color .15s, transform .15s; }
  .card:hover { border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-soft); transform:translateY(-2px); }
  .card b { display:block; margin-bottom:4px; }
  .card span { color:var(--muted); font-size:13px; }
  footer { padding:18px 32px; border-top:1px solid var(--border); color:var(--muted); font-size:12px;
           display:flex; justify-content:space-between; }
  footer a { color:var(--muted); }
</style>
</head>
<body>
<header><img class="logo" src="/favicon.png" alt=""><b>DevArts Lab</b></header>
<main>
  <div class="hero">
    <div class="brand">
      <img class="hero-logo" src="/logo.jpg" alt="DevArts Lab">
      <h1>Dev<em>Arts</em> Lab</h1>
      <p class="sub">Independent engineering studio.</p>
    </div>
    <div class="cards">
      <a class="card" href="https://${env.DOCS_HOSTNAME}"><b>Docs</b><span>${env.DOCS_HOSTNAME}</span></a>
      <a class="card" href="https://github.com/DevArtsLab"><b>GitHub</b><span>github.com/DevArtsLab</span></a>
      <a class="card" href="https://${env.DATA_HOSTNAME}"><b>Data</b><span>${env.DATA_HOSTNAME}</span></a>
      <a class="card" href="https://mail.${env.MAIL_DOMAIN}"><b>Mail</b><span>mail.${env.MAIL_DOMAIN}</span></a>
    </div>
  </div>
  <section class="products">
    <h2>Products</h2>
    <div class="product-cards">
      <a class="card primary" href="https://american-community-network.${env.MAIL_DOMAIN}"><b>American Community Network</b><span>american-community-network.${env.MAIL_DOMAIN}</span></a>
      <a class="card" href="https://voice-quote.${env.MAIL_DOMAIN}"><b>Voice Quote</b><span>voice-quote.${env.MAIL_DOMAIN}</span></a>
    </div>
  </section>
</main>
<footer><span>&copy; ${new Date().getUTCFullYear()} DevArts Lab</span><a href="mailto:contact@${env.MAIL_DOMAIN}">contact@${env.MAIL_DOMAIN}</a></footer>
</body>
</html>`;
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
