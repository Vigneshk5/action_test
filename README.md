# action_test

This repository contains a GitHub Actions workflow that pings two sites weekly.

How it works
- The workflow is defined at .github/workflows/ping.yml and runs twice weekly (Monday and Thursday at 09:00 UTC) and on manual dispatch.
- It runs a Node.js script that uses Puppeteer to open each URL and waits until the page is fully loaded (`networkidle0`).

Run locally
- Install dependencies: 

```bash
npm install
```

- Run the ping script locally (set `URLS` environment variable as newline-separated list):

```bash
URLS="https://www.amde.dev\nhttps://www.aadsmart.in" npm run ping
```
"# action_test" 
