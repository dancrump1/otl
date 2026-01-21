##### Last reviewed 4/23/25

# Drive Brand Studio NextJS Pages router template
## Requirements
1. Computer with MINIMUM 8gb RAM, modern OS (so Windows, Linux or Mac) 
1. NodeJS v18+
2. Ubuntu v22.04


## Run Locally

1. Install dependencies

```bash
  npm install
```

2. Add .env file and contents from .env.example
3. Add CMS api secret and revalidation secret
4. add next.config.mjs and update remotePatterns hostname

Start the server

```bash
  npm run dev
```

## Runcloud

1. NGINX Config
   1. Type:
      ```location.main```
      1. Config Name:
         ```preview```
      3. Config content:
         ```add_header Content-Security-Policy "frame-ancestors 'self' [YOUR_DOMAIN]";```
   3. Type: ```location.root```
      1. Config Name
          ```nginx-proxy```
      3. Config content:
         ```proxy_pass http://127.0.0.1:3004;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Host $host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            ```
      
