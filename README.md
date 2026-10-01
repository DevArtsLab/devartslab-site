<div align="center">

# devartslab-site

DevArts Lab landing page on `devartslab.com`.

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F6821F?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](LICENSE)

</div>

## Routes

| Hostname                 | Serves                   |
| ------------------------ | ------------------------ |
| `devartslab.com` / `www` | DevArts Lab landing page |

The docs proxy lives in a separate repo: [DevArtsLab/devartslab-notion](https://github.com/DevArtsLab/devartslab-notion).
The mail app lives in a separate repo: [DevArtsLab/devarts-mail](https://github.com/DevArtsLab/devarts-mail).

## Deploy

```bash
npm install
npx wrangler deploy
```

`apex`/`www` use Worker routes on the existing proxied records. Zone Redirect
Rules still evaluate before the Worker, so none may match these hostnames.
