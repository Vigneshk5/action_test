const puppeteer = require('puppeteer');

async function pingUrls(urls) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    for (const url of urls) {
      console.log(`Loading: ${url}`);
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(120000);
      try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        console.log(`Loaded: ${url} (status: ${page.status ? page.status() : 'unknown'})`);
      } catch (err) {
        console.error(`Error loading ${url}:`, err.message || err);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

function readUrlsFromEnv() {
  const raw = process.env.URLS || '';
  return raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
}

(async () => {
  const urls = readUrlsFromEnv();
  if (urls.length === 0) {
    console.error('No URLs provided in the URLS environment variable');
    process.exit(1);
  }
  await pingUrls(urls);
})();
