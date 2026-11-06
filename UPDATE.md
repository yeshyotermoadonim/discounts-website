# Updating the site

Two repos. They update differently.

| What changed | Where | What to run |
|---|---|---|
| Saved club pages (new brands, online flags) | `discounts-data` | `./scripts/update.sh`, then commit and push that repo |
| Layout, pages, filters | `discounts-website` | `./scripts/deploy.sh` |

## Data only

From `discounts-data`:

```bash
./scripts/update.sh ~/Downloads/Moadonim/2026-11-6
git add clubs.json brands.json categories.json listings.json scripts schema README.md
git commit -m "Refresh club listings."
git push origin main
```

The site fetches `https://raw.githubusercontent.com/yeshyotermoadonim/discounts-data/main/*.json` and caches it for one hour (`revalidate = 3600`). Pushing the data repo does not start a Vercel build. The new JSON shows up on the next refresh, within about an hour. Redeploy the website if it has to show immediately.

The same script copies the JSON into `discounts-website/src/data/seed/`. That copy is only the fallback, used when GitHub cannot be reached. Commit it with the website when you want the fallback to match.

## Design or code

From `discounts-website`:

```bash
./scripts/deploy.sh
```

This uploads the folder with the Vercel CLI. A push to GitHub does not deploy: the Vercel project has no GitHub login connection (`vercel git connect` fails until that connection exists in the Vercel account).

Local preview of the seed, without waiting on GitHub:

```bash
DATA_REPO_BASE_URL=http://127.0.0.1:9 npm run dev
```

## Live URL

https://discounts-website.vercel.app

The project is `yeah-bfcd/discounts-website`. Deployment Protection may ask a visitor to log in to Vercel before the page loads.
