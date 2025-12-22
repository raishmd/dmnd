# Cleanup Instructions

To complete the migration to a pure Next.js app, run these commands:

```bash
cd /workspaces/dmnd

# Remove old static files
rm -f index.html script.js style.css sw.js next.config.js favicon.ico manifest.json
rm -rf fonts libs

# Commit the cleanup
git add -A
git commit -m "Clean up: remove old static files, keep only Next.js app"
git push origin main
```

## What's being removed:
- ❌ `index.html` - replaced by Next.js app
- ❌ `script.js` - converted to React components
- ❌ `style.css` - converted to CSS modules
- ❌ `sw.js` - can use Next.js PWA support
- ❌ `next.config.js` - replaced with next.config.ts
- ❌ `favicon.ico` - handled by icon in public/
- ❌ `fonts/` - should be in public/
- ❌ `libs/` - should be in public/

## What remains (Next.js app only):
✅ `/app` - Next.js app directory
✅ `/components` - React components
✅ `/public` - static assets (manifest, fonts, libs, icon)
✅ `package.json` - dependencies
✅ `tsconfig.json` - TypeScript config
✅ `next.config.ts` - Next.js config
✅ `vercel.json` - Vercel deployment config
✅ `.github/workflows/` - GitHub Actions

After cleanup, the project will be a clean Next.js application.
