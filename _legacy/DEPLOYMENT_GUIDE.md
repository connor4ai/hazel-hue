# Hazel & Hue - Deployment Guide

## Overview
This guide covers deploying the Hazel & Hue color analysis platform to your own domain using various hosting providers.

## Prerequisites
- Node.js 20+ installed locally
- Your domain name configured
- Access to your domain's DNS settings
- Required API keys (OpenAI, Stripe, SendGrid)

## Build Process

### 1. Production Build
```bash
# Install dependencies
npm install

# Build the application
npm run build

# The build creates:
# - dist/public/ (frontend static files)
# - dist/index.js (server bundle)
```

### 2. Environment Variables
Create a `.env` file with:
```env
# Database
DATABASE_URL=your_postgresql_connection_string

# APIs
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
SENDGRID_API_KEY=your_sendgrid_key

# Email
FROM_EMAIL=noreply@yourdomain.com

# App
NODE_ENV=production
PORT=5000
```

## Deployment Options

### Option 1: VPS/Cloud Server (Recommended)

#### A. DigitalOcean Droplet
```bash
# 1. Create Ubuntu droplet ($12/month recommended)
# 2. SSH into server
ssh root@your_server_ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# 4. Install PM2 for process management
npm install -g pm2

# 5. Upload your code
scp -r ./dist/ root@your_server_ip:/var/www/hazelandhue/
scp package.json root@your_server_ip:/var/www/hazelandhue/
scp .env root@your_server_ip:/var/www/hazelandhue/

# 6. Start the application
cd /var/www/hazelandhue
npm install --production
pm2 start dist/index.js --name "hazelandhue"
pm2 startup
pm2 save
```

#### B. Install PostgreSQL
```bash
# Install PostgreSQL
apt update
apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb hazelandhue
sudo -u postgres psql -c "CREATE USER hazelandhue WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE hazelandhue TO hazelandhue;"

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://hazelandhue:your_password@localhost:5432/hazelandhue
```

#### C. Setup Nginx
```bash
# Install Nginx
apt install nginx

# Create site configuration
cat > /etc/nginx/sites-available/hazelandhue << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/hazelandhue /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### D. SSL Certificate
```bash
# Install Certbot
apt install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option 2: Railway (Easy Deployment)

#### A. Setup Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### B. Railway Configuration
Create `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node dist/index.js",
    "healthcheckPath": "/api/health"
  }
}
```

#### C. Add Environment Variables
```bash
# Add variables through Railway dashboard or CLI
railway variables set DATABASE_URL=postgresql://...
railway variables set OPENAI_API_KEY=sk-...
railway variables set STRIPE_SECRET_KEY=sk_live_...
```

### Option 3: Vercel (Frontend) + Railway (Backend)

#### A. Split Architecture
Frontend (Vercel):
```bash
# Deploy frontend only
vercel --prod
```

Backend (Railway):
```bash
# Deploy API only
railway up
```

#### B. Configuration
Update `vite.config.ts` for production:
```javascript
export default defineConfig({
  // ... existing config
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://your-api-domain.com')
  }
});
```

### Option 4: AWS/Google Cloud

#### A. Container Deployment
Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY attached_assets/ ./attached_assets/

EXPOSE 5000
CMD ["node", "dist/index.js"]
```

#### B. Deploy Commands
```bash
# Build and push
docker build -t hazelandhue .
docker tag hazelandhue your-registry/hazelandhue
docker push your-registry/hazelandhue
```

## Domain Configuration

### DNS Settings
Point your domain to your server:
```
Type: A
Name: @
Value: your_server_ip

Type: A  
Name: www
Value: your_server_ip
```

### Update Application URLs
1. Update sharing URLs in the code
2. Configure Stripe webhook endpoints
3. Update email templates with your domain

## Database Migration

### Export from Replit
```bash
# From Replit console
pg_dump $DATABASE_URL > backup.sql
```

### Import to Production
```bash
# To your production database
psql $DATABASE_URL < backup.sql
```

## Monitoring & Maintenance

### PM2 Monitoring
```bash
pm2 status
pm2 logs hazelandhue
pm2 restart hazelandhue
```

### Log Management
```bash
# Setup log rotation
pm2 install pm2-logrotate
```

### Backup Strategy
```bash
# Daily database backup
crontab -e
# Add: 0 2 * * * pg_dump $DATABASE_URL | gzip > /backups/hazelandhue-$(date +\%Y\%m\%d).sql.gz
```

## SSL & Security

### Security Headers
Add to Nginx config:
```nginx
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

### Firewall
```bash
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

## Cost Estimates

### VPS Option
- DigitalOcean Droplet: $12/month
- Domain: $10-15/year
- SSL: Free (Let's Encrypt)
- **Total: ~$12-15/month**

### Railway Option
- Railway: $5-20/month (based on usage)
- Domain: $10-15/year
- **Total: ~$5-25/month**

### AWS Option
- EC2 t3.micro: $8-10/month
- RDS PostgreSQL: $15-20/month
- Domain: $10-15/year
- **Total: ~$25-35/month**

## Support & Troubleshooting

### Common Issues
1. **Port binding**: Ensure app binds to `0.0.0.0:${PORT}`
2. **Database connections**: Check connection strings
3. **File uploads**: Verify upload directory permissions
4. **Email delivery**: Confirm SendGrid configuration

### Health Checks
Your app includes `/api/health` endpoint for monitoring.

## Next Steps
1. Choose your deployment option
2. Set up your server/hosting
3. Configure your domain DNS
4. Deploy and test the application
5. Set up monitoring and backups

The application is designed to run as a single Node.js process serving both the API and static files, making deployment straightforward on any platform that supports Node.js.