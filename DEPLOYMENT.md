# Deployment Guide for Hazel & Hue

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Full-Stack)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Configure vercel.json**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/dist/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ]
}
```

3. **Deploy**:
```bash
npm run build
vercel --prod
```

### Option 2: Railway

1. **Connect GitHub Repository**:
   - Go to [Railway](https://railway.app)
   - Click "Start a New Project" → "Deploy from GitHub repo"
   - Select your Hazel & Hue repository

2. **Add Environment Variables** in Railway dashboard:
   - DATABASE_URL (Railway will provide PostgreSQL)
   - OPENAI_API_KEY
   - STRIPE_SECRET_KEY
   - VITE_STRIPE_PUBLIC_KEY
   - SENDGRID_API_KEY

3. **Configure Build Command**:
```bash
npm install && npm run build
```

4. **Configure Start Command**:
```bash
npm start
```

### Option 3: Heroku

1. **Install Heroku CLI** and login:
```bash
npm install -g heroku
heroku login
```

2. **Create Heroku App**:
```bash
heroku create your-app-name
```

3. **Add PostgreSQL**:
```bash
heroku addons:create heroku-postgresql:mini
```

4. **Set Environment Variables**:
```bash
heroku config:set OPENAI_API_KEY=your_key
heroku config:set STRIPE_SECRET_KEY=your_key
heroku config:set VITE_STRIPE_PUBLIC_KEY=your_key
heroku config:set SENDGRID_API_KEY=your_key
```

5. **Deploy**:
```bash
git push heroku main
```

## 🗄️ Database Setup

### PostgreSQL (Production)

1. **Create Database**:
```sql
CREATE DATABASE hazelhue;
```

2. **Run Migrations**:
```bash
npm run db:push
```

3. **Seed Initial Data** (optional):
```bash
npm run db:seed
```

## 🔐 Environment Variables for Production

Ensure these are set in your deployment platform:

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
SENDGRID_API_KEY=your_sendgrid_key
```

## 📊 Monitoring and Analytics

### Google Analytics Setup
1. Add your GA4 Measurement ID to environment variables:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Error Monitoring
Consider adding services like:
- Sentry for error tracking
- LogRocket for session replay
- Datadog for performance monitoring

## 🔒 Security Checklist

- [ ] All API keys stored as environment variables
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] File upload restrictions in place
- [ ] Database connection secured

## 🚀 Performance Optimization

### Build Optimization
```bash
# Build with production optimizations
NODE_ENV=production npm run build
```

### CDN Setup
Consider using a CDN for static assets:
- Cloudflare
- AWS CloudFront
- Vercel Edge Network

### Database Optimization
- Enable connection pooling
- Add database indexes
- Regular backup schedules

## 📈 Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Database read replicas
- File storage (AWS S3, Cloudinary)

### Vertical Scaling
- Monitor CPU and memory usage
- Database performance tuning
- Cache implementation (Redis)

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📞 Support

For deployment issues:
1. Check the logs in your deployment platform
2. Verify all environment variables are set
3. Ensure database migrations have run
4. Test API endpoints individually

Need help? Create an issue in the GitHub repository.