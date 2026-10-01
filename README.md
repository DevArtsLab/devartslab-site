<div align="center">

# devartslab-site

Edge router for the public surface of `devartslab.com`.

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F6821F?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](LICENSE)

</div>

## Routes

| Hostname                 | Serves                                                             |
| ------------------------ | ------------------------------------------------------------------ |
| `docs.devartslab.com`    | Public Notion site, reverse-proxied (visitors never see notion.so) |
| `devartslab.com` / `www` | DevArts Lab landing page                                           |

The mail app lives in a separate repo: [DevArtsLab/devarts-mail](https://github.com/DevArtsLab/devarts-mail).

## Deploy

```bash
npm install
npx wrangler deploy
```

`docs.` uses a Worker custom domain (auto-creates its DNS record + cert).
`apex`/`www` use Worker routes on the existing proxied records. Zone Redirect
Rules still evaluate before the Worker, so none may match these hostnames.
