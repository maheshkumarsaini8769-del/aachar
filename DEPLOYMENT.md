# Omniva SaaS Platform - Production Deployment Guide

This guide details how to deploy the Omniva Multi-Tenant SaaS platform to production. Omniva includes a Node.js/Express backend API, a React 19 SPA frontend with Tailwind CSS, MongoDB database integration, and Meta Ads Webhooks/Conversion API (CAPI).

---

## 1. Quick Overview & Architecture

- **Unified Single-Port Deployment**: The Node.js Express server is configured to serve both the REST API (`/api/*`) and the compiled static frontend SPA (`/`) with client-side route fallback.
- **Node Environment**: Node.js 18+ or 20+ LTS.
- **Database**: MongoDB 6.0+ (MongoDB Atlas or self-hosted).

---

## 2. Environment Variables Checklist

Copy [.env.example](file:///home/mahesh/meta%20ads/.env.example) to `.env` or set these in your cloud provider's environment variables dashboard:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `PORT` | Listening port for the application | `5000` (or cloud default like `10000`) |
| `NODE_ENV` | Runtime environment | `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster0.mongodb.net/omniva_db` |
| `JWT_SECRET` | Secret key for JWT authentication | 64-character random string |
| `JWT_EXPIRES_IN` | Token validity duration | `7d` |
| `CLIENT_URL` | Allowed origin for CORS & Webhook links | `https://your-domain.com` |
| `META_ACCESS_TOKEN` | Meta Graph API System User Token | `EAA...` (From Meta Business Manager) |
| `META_WEBHOOK_VERIFY_TOKEN` | Custom verification token for Meta Webhooks | `omniva_secure_verify_token_2026` |
| `RAZORPAY_KEY_ID` | Optional: Razorpay Key ID | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET`| Optional: Razorpay Secret | `...` |

---

## 3. Deployment Options

### Option A: Render (Recommended for 1-Click Git Deploy)

Render configuration is pre-configured via [render.yaml](file:///home/mahesh/meta%20ads/render.yaml).

1. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Log in to [Render.com](https://render.com) and click **New +** $\rightarrow$ **Blueprint**.
3. Select your repository. Render will automatically detect `render.yaml`.
4. Enter your `MONGODB_URI` (from MongoDB Atlas) and other secrets in the Render dashboard.
5. Click **Apply**. Render will run:
   - Build Command: `npm run install:all && npm run build`
   - Start Command: `npm start`

---

### Option B: Docker / Docker Compose

A production-ready [Dockerfile](file:///home/mahesh/meta%20ads/Dockerfile) and [docker-compose.yml](file:///home/mahesh/meta%20ads/docker-compose.yml) are included in the repository.

1. Ensure Docker and Docker Compose are installed on your server.
2. Clone repository and configure `.env`:
   ```bash
   cp .env.example .env
   # Edit .env with your production credentials
   ```
3. Run with Docker Compose:
   ```bash
   docker compose up -d --build
   ```
4. Check running containers:
   ```bash
   docker compose ps
   ```
   The application will be accessible on `http://<your-server-ip>:5000`.

---

### Option C: Linux VPS (Ubuntu / Debian with PM2 & Nginx)

1. **Install Prerequisites**:
   ```bash
   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx

   # Install PM2 process manager
   sudo npm install -g pm2
   ```

2. **Clone & Build the Project**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git /var/www/omniva
   cd /var/www/omniva
   cp .env.example backend/.env
   nano backend/.env # Fill in production MongoDB URI and JWT_SECRET

   # Install dependencies and build
   npm run install:all
   npm run build
   ```

3. **Start Application with PM2**:
   ```bash
   pm2 start backend/src/server.js --name "omniva-saas"
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx Reverse Proxy**:
   Create `/etc/nginx/sites-available/omniva`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
           proxy_pass http://127.0.0.1:5000;
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
   ```
   Enable the site and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/omniva /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Enable Free SSL Certificate via Let's Encrypt**:
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

---

### Option D: Railway

1. Install Railway CLI or connect via [Railway.app](https://railway.app).
2. Click **New Project** $\rightarrow$ **Deploy from GitHub repo**.
3. Add environment variables from `.env.example` under the **Variables** tab.
4. Set Build Command: `npm run install:all && npm run build`
5. Set Start Command: `npm start`

---

## 4. Verifying Deployment

Once deployed, verify the following health checks:

1. **System Health Check**:
   `GET https://your-domain.com/api/health`
   Should return: `{"status":"healthy","platform":"Omniva SaaS Engine","database":{"status":"Connected"}}`

2. **Public Storefront**:
   `GET https://your-domain.com/store/desi-rasoi-achar-1`
   Renders the storefront with products and live checkout.

3. **Merchant Portal**:
   `GET https://your-domain.com/merchant/overview`
   Redirects to login if unauthenticated, or renders merchant dashboard.

4. **Super Admin Portal**:
   `GET https://your-domain.com/admin/login`
   Allows platform owners to manage all merchant stores and billing.
