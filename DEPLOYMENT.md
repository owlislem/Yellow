# Deployment Guide

This guide covers deploying the Yellow Family platform to production environments.

## 📋 Pre-Deployment Checklist

Before deploying to production, ensure you have completed these critical steps:

### Security
- [ ] Changed all default secrets and passwords
- [ ] Generated strong JWT secret (minimum 32 characters)
- [ ] Updated MongoDB connection string with production credentials
- [ ] Configured Firebase with production settings
- [ ] Set `NODE_ENV=production`
- [ ] Enabled HTTPS/SSL certificates
- [ ] Updated CORS to allow only production domain
- [ ] Removed all `console.log` statements (or use proper logging)
- [ ] Set secure cookie options (`secure: true`, `httpOnly: true`)

### Environment Variables
- [ ] Created production `.env` files
- [ ] Verified no secrets are committed to git
- [ ] Set up environment variables in hosting platform
- [ ] Configured email service (replace Mailtrap)

### Code Quality
- [ ] Ran linter and fixed warnings
- [ ] Tested all features manually
- [ ] Fixed all TypeScript/ESLint errors
- [ ] Optimized images and assets
- [ ] Minified frontend build

### Performance
- [ ] Implemented rate limiting
- [ ] Added request compression
- [ ] Optimized database queries
- [ ] Set up CDN for static assets (optional)
- [ ] Configured caching strategies

### Monitoring
- [ ] Set up error logging (e.g., Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up analytics (optional)

---

## 🚀 Deployment Options

### Option 1: Heroku (Easiest)

**Backend Deployment:**

1. Install Heroku CLI:
   ```bash
   npm install -g heroku
   ```

2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create a new app:
   ```bash
   cd backend
   heroku create yellow-family-api
   ```

4. Set environment variables:
   ```bash
   heroku config:set MONGO_URL="your_mongodb_url"
   heroku config:set JWT_SECR="your_jwt_secret"
   heroku config:set NODE_ENV="production"
   heroku config:set FRONTEND_URL="https://your-frontend-domain.com"
   # Add other variables...
   ```

5. Deploy:
   ```bash
   git push heroku main
   ```

**Frontend Deployment (Vercel/Netlify):**

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard

---

### Option 2: AWS (EC2 + RDS + S3)

**Prerequisites:**
- AWS Account
- Domain name
- SSL certificate (AWS Certificate Manager)

**Steps:**

1. **Launch EC2 Instance:**
   - Choose Ubuntu Server 22.04 LTS
   - Select t2.small or larger
   - Configure security groups (ports 80, 443, 22)
   - Create/download SSH key pair

2. **Connect to EC2:**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Install PM2
   sudo npm install -g pm2
   ```

4. **Deploy Backend:**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/yellow-family.git
   cd yellow-family/backend
   
   # Install dependencies
   npm install --production
   
   # Create production config
   nano config.env
   # Add production environment variables
   
   # Start with PM2
   pm2 start server.js --name yellow-family-api
   pm2 save
   pm2 startup
   ```

5. **Deploy Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run build
   
   # Copy build to Nginx directory
   sudo cp -r dist/* /var/www/html/
   ```

6. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           root /var/www/html;
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

7. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

### Option 3: DigitalOcean App Platform

1. **Create Account** on DigitalOcean

2. **Create New App:**
   - Connect GitHub repository
   - Select branch to deploy

3. **Configure Backend:**
   - Detect Node.js automatically
   - Set build command: `npm install`
   - Set run command: `npm start`
   - Add environment variables

4. **Configure Frontend:**
   - Detect React/Vite automatically
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variables

5. **Deploy** and get URLs

---

### Option 4: Railway

**Simple Deployment:**

1. Visit [railway.app](https://railway.app)
2. Sign in with GitHub
3. Create new project from GitHub repo
4. Configure environment variables
5. Deploy with one click

**Benefits:**
- Automatic HTTPS
- Easy database provisioning
- Simple rollbacks
- Built-in monitoring

---

## 🔧 Production Configuration

### Backend (`config.env`)

```env
# MongoDB Atlas (Production)
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/yellow-family?retryWrites=true&w=majority

# Server
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yellowfamily.com

# JWT (Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECR=your_very_long_and_secure_jwt_secret_here_minimum_32_characters
JWT_COOKIE_EXPIRES_IN=900000

# Email (SendGrid, AWS SES, or similar)
EMAIL_USERNAME=your_smtp_username
EMAIL_PASSWORD=your_smtp_password
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_FORM=noreply@yellowfamily.com
```

### Frontend (`.env.production`)

```env
# Firebase Production
VITE_FIREBASE_API_KEY=production_api_key
VITE_FIREBASE_AUTH_DOMAIN=yellow-family-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=yellow-family-prod
VITE_FIREBASE_STORAGE_BUCKET=yellow-family-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=production_sender_id
VITE_FIREBASE_APP_ID=production_app_id
VITE_FIREBASE_MEASUREMENT_ID=production_measurement_id

# API URL
VITE_API_URL=https://api.yellowfamily.com/api/v1
```

---

## 🔐 Security Hardening

### Backend Updates

1. **Add Helmet.js:**
   ```bash
   npm install helmet
   ```
   
   In `app.js`:
   ```javascript
   import helmet from 'helmet';
   app.use(helmet());
   ```

2. **Add Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```
   
   In `app.js`:
   ```javascript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     max: 100,
     windowMs: 60 * 60 * 1000,
     message: 'Too many requests from this IP'
   });
   
   app.use('/api', limiter);
   ```

3. **Add Compression:**
   ```bash
   npm install compression
   ```
   
   In `app.js`:
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

4. **Update CORS:**
   ```javascript
   const corsOptions = {
     origin: process.env.FRONTEND_URL,
     credentials: true,
   };
   ```

---

## 📊 Monitoring & Logging

### Error Tracking (Sentry)

1. Sign up at [sentry.io](https://sentry.io)

2. Install SDK:
   ```bash
   npm install @sentry/node
   ```

3. Initialize in `server.js`:
   ```javascript
   import * as Sentry from "@sentry/node";
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

### Uptime Monitoring

Use services like:
- **UptimeRobot** (free)
- **Pingdom**
- **StatusCake**

---

## 🗄️ Database Management

### MongoDB Atlas Setup

1. **Create Production Cluster:**
   - Select region close to your users
   - Choose appropriate tier (M10+ for production)
   - Enable backups

2. **Security:**
   - Whitelist specific IP addresses only
   - Use strong passwords
   - Enable MongoDB authentication
   - Use VPC peering (advanced)

3. **Indexes:**
   Create indexes for frequently queried fields:
   ```javascript
   // In MongoDB shell or Compass
   db.tours.createIndex({ "Destination": 1 })
   db.tours.createIndex({ "DepartureDate": 1 })
   db.users.createIndex({ "email": 1 })
   ```

---

## 🔄 CI/CD Pipeline (Optional)

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
    
    - name: Install Backend Dependencies
      run: cd backend && npm install
    
    - name: Install Frontend Dependencies
      run: cd frontend && npm install
    
    - name: Build Frontend
      run: cd frontend && npm run build
    
    - name: Deploy to Server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd yellow-family
          git pull origin main
          cd backend && npm install --production
          pm2 restart yellow-family-api
```

---

## 🎯 Post-Deployment

1. **Test all features:**
   - User registration and login
   - Tour browsing
   - Booking creation
   - Admin dashboard
   - Email notifications

2. **Monitor logs:**
   ```bash
   pm2 logs yellow-family-api
   ```

3. **Check performance:**
   - Use Google PageSpeed Insights
   - Test on mobile devices
   - Monitor API response times

4. **Set up backups:**
   - Database backups (MongoDB Atlas automatic)
   - Code backups (GitHub)
   - Environment variables documentation

---

## 🆘 Troubleshooting

### Common Issues

**CORS errors:**
- Verify FRONTEND_URL matches exactly (no trailing slash)
- Check CORS configuration in backend

**Database connection failed:**
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure MongoDB user has proper permissions

**JWT errors:**
- Ensure JWT_SECR is set correctly
- Check token expiration time
- Verify cookie settings (secure flag)

**502 Bad Gateway:**
- Check if backend server is running
- Verify Nginx proxy configuration
- Check firewall rules

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Heroku Node.js Deployment](https://devcenter.heroku.com/articles/deploying-nodejs)
- [AWS EC2 Setup Guide](https://aws.amazon.com/ec2/getting-started/)
- [Nginx Configuration Best Practices](https://www.nginx.com/blog/performance-tuning-tips-tricks/)
- [Let's Encrypt SSL Setup](https://letsencrypt.org/getting-started/)

---

**Good luck with your deployment! 🚀**
