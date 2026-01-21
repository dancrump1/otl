##### Last reviewed 6/3/25

# NextJS Pages router template

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

- Purchase a Digital Ocean droplet
- Connect the droplet to RunCloud.io
- Create a system user and generate a password. `----Store passwords for SSH connection to server later----`
- Create a webapp for the NextJS project
  - Utilize a GH repo
  - Generate and put the deploy key in the cooresponding Github Repo
  - Web Application Stack: Native NGINX + Custom config (For power user. Manual Nginx implementation)
- Add to DNS records
  - if domain
    - `A_record @ server_ip 600s`
    - `CName www url_name.com. 1hour`
  - if subdomain
    - `A_record url_name server_ip 1hour`
    - `CName *.url_name url_name.com. 1hour`
- Add SSL record
- NGINX Config
   1. Type:
      ```location.main```
      1. Config Name:
         ```preview```
      3. Config content:
         ```add_header Content-Security-Policy "frame-ancestors 'self' https://yourbackendwebsite.com";```
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

- Fill in the .env file with CMS gql URL and token
- On the server, run:
  - `pm2 start npm --name "<give_reasonable_name>" -- start`
  - `pm2 save`
  - `pm2 startup`
  - COPY THE `sudo .....` LAST LINE AFTER RUNNING pm2 startup.

RunCloud sets up webhooks into our github repos, so the deployment of changes should be done through that webhook. When you `git push` to main or merge a PR to main, the production site will auto-magically update.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
# TODO STARTUP: Replace this
NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT="https://craft.ddev.site/"
# TODO STARTUP: Replace this
NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN="replace_this" 
# TODO STARTUP: Replace this
MY_SECRET_TOKEN=replace_this

# dev / staging / production
NEXT_PUBLIC_ENVIRONMENT=dev 

# TODO PRODUCTION: Comment these 2 lines out
# For local development
NODE_TLS_REJECT_UNAUTHORIZED=0 
NEXT_PRIVATE_DEBUG_CACHE=1

PORT_RUNNER=3006
```

## Features

- Light/dark mode toggle
- ShadCN / Aceternity / MagicUI / More starter components
- Preview endpoint
- Revalidate endpoint
- sitemap xml generator

## Authors

[@dancrump1](https://www.github.com/dancrump1)

## Acknowledgments

- [ShadCN](https://ui.shadcn.com/)
- [Aceternity](https://ui.aceternity.com/)
- [Magic UI](https://magicui.design/)
- [Wind UI](https://wind-ui.com/components/)
- [Wicked Blocks](https://wickedblocks.dev/)
- [Hover.dev](https://www.hover.dev/components)
- [Hyper UI](https://www.hyperui.dev/)
- [Ever UI](https://www.ever-ui.com/)
- If you see your library please put an issue in to be added here, was moving too fast to remember them all :)

## Tech Stack

*Client:* React v18+, TailwindCSS, Framer Motion
*UI Server:* Node v18+, NextJS, NginX

## Support

For support, email <support@drivebrandstudio.com>

## Roadmap

- Add SEO (Using SEO pluging from CraftCMS)
- Figure out how to demonstrate an application example w/o having api opinionation (meaning, I want to have a few layouts for people to use as examples to follow for code syntax, but I don't want my CMS field/variable names getting in the way)
- Clean up tailwind base styles
- Clean up Next config
- Rename `/src/server` directory to `/helpers` or something

## 6 Minute Setup video

Sorry for hte poor quality. Max upload is 10MB for video.
<https://github.com/user-attachments/assets/2e057e20-4c94-4751-9050-933409f056fd>

## UI_examples (🚧WIP🚧)
>
> [!CAUTION]
> FLASH WARNING when I demonstrate the dark/light mode in each video
<https://github.com/user-attachments/assets/f2805740-c5f0-435b-9631-d7ad30f0a8cf>
<https://github.com/user-attachments/assets/859457e9-3a93-4929-a7ff-e2a5510fbd72>
<https://github.com/user-attachments/assets/5214eb78-a1ff-451f-89ca-d7069f1b7c9c>
<https://github.com/user-attachments/assets/30656964-2cac-489b-8ebc-cc7ead9004f3>
