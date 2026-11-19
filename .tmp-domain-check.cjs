const { chromium } = require("playwright");
const routes = [
  "/", "/programs/", "/bootcamps/", "/about/", "/teams/",
  "/bootcamps/spec-driven-ai-development/", "/bootcamps/ai-powered-code-review/",
  "/bootcamps/multi-agent-systems/", "/bootcamps/deep-agents-loop-engineering/",
  "/bootcamps/production-ai-guardrails/"
];

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const results = [];
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const failedLocalRequests = [];
    const errors = [];
    page.on("response", (response) => {
      const url = new URL(response.url());
      if (url.hostname === "127.0.0.1" && response.status() >= 400) failedLocalRequests.push({ url: url.pathname, status: response.status() });
    });
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: "networkidle" });
    results.push({
      route,
      status: response?.status(),
      canonical: await page.locator('link[rel="canonical"]').getAttribute("href"),
      canonicalCorrect: (await page.locator('link[rel="canonical"]').getAttribute("href")) === `https://sanjaynegi.in${route}`,
      ogUrl: await page.locator('meta[property="og:url"]').getAttribute("content"),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      failedLocalRequests,
      errors
    });
    await page.close();
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
