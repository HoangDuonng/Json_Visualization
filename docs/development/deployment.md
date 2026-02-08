# Deployment Guide

Guide to deploying JSON Visualization to production.

## Deployment Options

### Vercel (Recommended)

Easiest deployment for Next.js applications.

**Steps:**

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure**
   - Framework: Next.js (auto-detected)
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Environment Variables**
   ```
   NEXT_PUBLIC_NODE_LIMIT=1000
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build
   - Get deployment URL

**Automatic Deployments:**
- Push to `main` → Production
- Push to other branches → Preview

### Netlify

Alternative static hosting.

**Steps:**

1. **Build Settings**
   - Build Command: `pnpm build && pnpm export`
   - Publish Directory: `out`

2. **netlify.toml**
   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Deploy**
   - Connect GitHub repo
   - Configure settings
   - Deploy

### Docker

Self-hosted deployment.

**Dockerfile:**
```dockerfile
FROM node:24-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_NODE_LIMIT=1000
    restart: unless-stopped
```

**Deploy:**
```bash
docker compose up -d
```

### Static Export

Export as static HTML.

**next.config.js:**
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

**Build:**
```bash
pnpm build
```

**Output:** `out/` directory

**Deploy to:**
- GitHub Pages
- AWS S3
- Any static host

### VPS/Server

Deploy to your own server.

**Requirements:**
- Node.js 24+
- pnpm
- PM2 (process manager)

**Steps:**

1. **Clone Repository**
   ```bash
   git clone https://github.com/HoangDuonng/Json_Visualization.git
   cd Json_Visualization
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Build**
   ```bash
   pnpm build
   ```

4. **Start with PM2**
   ```bash
   pm2 start pnpm --name "json-viz" -- start
   pm2 save
   pm2 startup
   ```

5. **Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Build Configuration

### Production Build

```bash
# Build for production
pnpm build

# Test production build
pnpm start
```

### Environment Variables

**Required:**
```env
NEXT_PUBLIC_NODE_LIMIT=1000
```

**Optional:**
```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Custom API
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Build Optimization

**next.config.js:**
```javascript
module.exports = {
  // Compression
  compress: true,
  
  // Image optimization
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }
    return config;
  },
};
```

## Performance

### Caching

**Headers:**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### CDN

Use CDN for static assets:
- Vercel Edge Network (automatic)
- Cloudflare
- AWS CloudFront

### Compression

Enable gzip/brotli:
- Vercel: Automatic
- Nginx: Enable in config
- Apache: Enable mod_deflate

## Monitoring

### Error Tracking

**Sentry:**
```bash
pnpm add @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Analytics

**Google Analytics:**
```typescript
// pages/_app.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
```

### Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

## Security

### HTTPS

Always use HTTPS in production:
- Vercel: Automatic
- Let's Encrypt: Free SSL
- Cloudflare: Free SSL

### Headers

**Security headers:**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### Environment Variables

Never commit secrets:
- Use `.env.local` (gitignored)
- Use platform secrets (Vercel, Netlify)
- Rotate keys regularly

## CI/CD

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
      
      - uses: actions/setup-node@v3
        with:
          node-version: '24'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Lint
        run: pnpm lint
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Rollback

### Vercel

1. Go to Deployments
2. Find previous deployment
3. Click "Promote to Production"

### Docker

```bash
# List images
docker images

# Run previous version
docker run -p 3000:3000 json-viz:previous-tag
```

### Git

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

## Troubleshooting

### Build Fails

**Check:**
- Node.js version (>= 24.x)
- Dependencies installed
- Environment variables set
- No TypeScript errors

**Fix:**
```bash
rm -rf node_modules .next
pnpm install
pnpm build
```

### Deployment Fails

**Check:**
- Build command correct
- Output directory correct
- Environment variables set
- Logs for errors

### Performance Issues

**Check:**
- Bundle size (use analyzer)
- Image optimization
- Caching headers
- CDN configuration

## Checklist

Before deploying:

- [ ] All tests pass (if tests exist)
- [ ] No linting errors
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Monitoring set up
- [ ] Backup plan ready

## Related Documentation

- [Setup Guide](setup.md) - Development setup
- [Architecture](architecture.md) - System design
- [Contributing](../../CONTRIBUTING.md) - Contribution guide
