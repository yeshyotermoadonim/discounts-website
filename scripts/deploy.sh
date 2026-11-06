#!/usr/bin/env bash
# Publish the current website folder to Vercel production.
# GitHub is not connected to this Vercel project, so a git push does not deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
npx vercel deploy --prod --yes --scope team_Lr37ixNFn5iY4kR0AsJ5sX2B
