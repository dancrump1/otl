# Next.js + CraftCMS NPM Workspaces Template

This repository is a full-stack monorepo template using **Next.js**, **CraftCMS**, and **npm workspaces**, with Docker for local development leveraging WSL2/Ubuntu. It is structured to streamline development across frontend and backend teams with shared code, efficient tooling, and easy-to-use configuration.

Click the > to expand the sections

---

## 6 Minute Setup video
### This was before creating a MONO repo, only clone once and do each step inside the correct package
Sorry for hte poor quality. Max upload is 10MB for video. <br/> https://github.com/user-attachments/assets/2e057e20-4c94-4751-9050-933409f056fd

## Requirements
1. Computer with MINIMUM 8gb RAM, modern OS (so Windows, Linux or Mac) 
1. NodeJS version 14+
2. Ubuntu
3. PHP 8.1+
4. DDEV
5. Docker

## Go here if:

  <details>
  <summary>Initial PC setup</summary>
    <ul>
  <li>Ubuntu: install through the windows store.</li>
      <ul>
          <li>After downloading from the Windows store and restarting your compouter, from an ADMIN V5 powershell terminal, set Ubuntu to run wsl2 with:
              ```powershell
              wsl --set-version Ubuntu 2
              ```
          </li>
      </ul>

<li>
  [Docker](https://www.docker.com)
</li>
<li>
  [DDEV](https://ddev.com)
</li>
<li>
  
NodeJS version 14+, I recommend using [NVM](https://github.com/nvm-sh/nvm) if using  Windows
</li>
    </ul>
 </details>

  <details>
  <summary>Initial Repository setup</summary>
      
      

1. Create folder on local machine.  `mkdir [folder_name]``
2. Change Directory (cd) into folder `cd [folder_name]`
3. Clone monoCMS project `git clone git@github.com:drivebrandstudio/mono-cms.git ./`
  - Notice the `./` at the end of the clone command
4. CD into cms project `cd packages/cms`
- For CMS project instructions, check `packages > cms > README.md`
1. After setup of CMS, CD into application project  `cd packages/app`
- For Website UI project instructions, check `packages > app > README.md`
 </details>

 ##  Technical Checklist: Next.js + Craft CMS Web Architecture
 ### 🧱 Core Technologies<br />

##### We use a decoupled architecture:<br />
Frontend: Built with Next.js (React + TypeScript)<br />
Backend: Content served via Craft CMS (headless)<br />
Deployment: Hosted on DigitalOcean with RunCloud<br />
Local Dev: Managed with DDEV
##### Next.js (React Framework)<br />
✔️ SSR / SSG / ISR – Choose the right rendering method per page<br />
✔️ Routing – File-based routing with dynamic and nested routes<br />
✔️ API Routes – Serverless functions for lightweight back-end endpoints<br />
✔️ Pages Router – Fast, modular routing with caching and streaming<br />
✔️ Image Optimization – Native support for responsive images (via next/image)<br />
✔️ Code Splitting – Automatic per-page bundle optimization<br />
✔️ Tree Shaking – Removes unused code in production builds<br />
✔️ File-based Metadata API – Manage <head>, open graph, and SEO meta

##### Craft CMS (Headless CMS)<br />
✔️ Custom Fields / Content Modeling – Total control over structured data<br />
✔️ Matrix / Repeater Fields – Flexible content blocks for rich layouts<br />
✔️ User Permissions & Roles – Secure admin access for non-technical users<br />
✔️ Asset Management – Manage images, videos, documents from one place<br />
✔️ GraphQL & REST API – Fetch structured content via APIs for frontend use<br />
✔️ Multi-language & Multi-site – Native support for multilingual content

### 🧩 Integration & Flexibility<br />
### ⚙️ From Craft to Next.js<br />
✅ Images – Pulled from Craft CMS and optimized via next/image<br />
✅ Videos / Embeds – Delivered via Craft fields or embedded URLs (YouTube, Vimeo, etc.)<br />
✅ SVGs – Stored in CMS or bundled locally; rendered inline or as <img><br />
✅ Rich Text & Blocks – Parsed with serializers (e.g., @portabletext/react, @builder.io/react)<br />
✅ Live Previews / Draft Sync – Via Craft Drafts API and Preview tokens (optional)

### 🔌 Extend with Libraries (Community Ecosystem)<br />
##### 🔐 Authentication:<br />
next-auth for OAuth<br /> credentials<br /> JWTs<br /> social login (Google, GitHub, etc.)

Custom auth flows using Next.js API routes

##### 🌍 i18n / l10n:<br />

##### 🔎 Search:<br />

##### 🛒 E-Commerce:<br />

##### 📊 Analytics / Telemetry:<br />

###### ✉️ Forms:<br />

##### 💬 Comments / Chat:<br />

### 🛠️ Developer Experience
✅ TypeScript Support – Fully typed environment<br />
✅ ESLint + Prettier – Consistent code style and static analysis<br />
✅ Module Aliases – Simplify imports using tsconfig paths<br />
✅ CI/CD Ready<br />
✅ Custom Dev Scripts – Local development via dev mode and hot reloading<br />
✅ Turbopack (Experimental) – Faster builds and dev refreshes with Webpack alternative<br />
✅ Custom Linters & Formatters – Integrate with editor tooling

### 📦 Performance & Optimization
### 🚀 Bundle Analysis:
Use @next/bundle-analyzer to inspect and reduce bundle size

### 📤 Code Splitting:<br />
Automatic via dynamic imports (next/dynamic)

### ♻️ Revalidation Strategies:<br />
On-demand ISR via API trigger (e.g., webhook from Craft)<br />
Time-based revalidation (e.g., revalidate: 60)

### 🗂️ Caching:<br />
Static content cached via CDN<br />
Dynamic pages use cache headers or SWR (stale-while-revalidate)

### 🛡️ Security:<br />
HTTPS (enforced via hosting layer)<br />
HTTP headers (Content Security Policy, XSS Protection, etc.)<br />
Auth/session/token management  

---

<details>
  <summary>
   
  ## Prerequisites
  
  </summary>

<blockquote>
  
<details>
  <summary>
    
  ### 🛠 Local Setup
  <br />
  This section covers how to get your development environment up and running locally, including workspace structure, environment configurations, and tools.
  </summary>

  <blockquote>
  <details>
  <summary>
    
  ### 🧑‍💻 Developer Work Environment
  Covers supported OS environments, configuration tools, and technologies used.
  
  </summary>

<ul>
  <li>Ubuntu: install through the windows store.</li>
      <ul>
          <li>
            After downloading from the Windows store and restarting your compouter, from an ADMIN V5 powershell terminal, set Ubuntu to run wsl2 with: 
            <br />
            
   ```powershell
   wsl --set-version Ubuntu 2
  ```

  > [!IMPORTANT]
  > Key information users need to know to achieve their goal.


  </li>
</ul>
  <li>
    [Docker](https://www.docker.com)
  </li>
  <li>
    [DDEV](https://ddev.com)
  </li>
  <li>
    
  NodeJS version 18+, I recommend using [NVM](https://github.com/nvm-sh/nvm) if using  Windows
  </li>
</ul>
  
  </details> 
  </blockquote>


<blockquote>
  
  <details>
  <summary>

  ## 🖥️ OS Support: Windows + WSL2 Ubuntu
      
  </summary>

  > _Instructions and gotchas for running the project on Windows with WSL2 Ubuntu._
  </details>
</blockquote>

<blockquote>
  <details>
    <summary>
      
  ## ⚙️ DDEV and CraftCMS Configuration
  
  </summary>
  > _Local development containerization via DDEV, CraftCMS setup, database and volume configuration._
  </details>
</blockquote>

<blockquote>
  <details>
    <summary>
      
  ## ⚛️ Next.js / React Setup
      
  </summary>

  > _Frontend configuration with Node.js, TypeScript, ESLint, and dev tooling._
  </details>
</blockquote>
    
</details>

</blockquote>
<blockquote>
  
<details>
  <summary>
    
  #### CraftCMS
  Covers custom headless CMS implementation
  
  </summary>
  
</details>
</blockquote>

<blockquote>
  
<details>
  <summary>
    
  #### NextJS
  Covers custom React-Server-Side (RSS) implementation. Currently utilizes Pages router.
  
  </summary>
  
</details>
</blockquote>

<blockquote>
  
<details>
  <summary>
    
  #### React / JS / TS
  Covers the way we chose to implement our UI code.
  
  </summary>
  
</details>
</blockquote>

<blockquote>
  
<details>
  <summary>
    
  #### AI tooling
  Covers the benefits and limitations DBS has with integrating with AI code tools, such as Vercel's V0, GitHub's CoPilot, and others (Cursor, Figma, etc)
  
  </summary>
  
</details>
</blockquote>
</details>

---

<details>
  <summary>
    
  ### 🌐 Hosting The DBS way <br />
  This section outlines how to configure and deploy the application in a hosted environment.
  </summary>

  <blockquote>
  <details>
    <summary>
  
  ### 🖥️ Deployment Targets and Environments
      
  </summary>

  > _Cloud/VPS/managed hosting overview, staging vs. production environments._
  </details>
</blockquote>

<blockquote>
  <details>
    <summary>
  
  ### 📤 CI/CD Workflow
      
  </summary>

  > _Build and deployment pipelines using GitHub Actions, Vercel, or custom CI._
  </details>
</blockquote>


<blockquote>
  <details>
    <summary>
  
  ### 🔐 Environment Variables and Secrets Management
      
  </summary>

  > _How to manage sensitive data and environment-specific configs securely._
  </details>
</blockquote>

<blockquote>
  <details>
    <summary>
      
  ### 📊 Monitoring and Logging
  
  </summary>

  > _Recommended tools for performance tracking, error logging, and observability._
  </details>
</blockquote>

</details>


---

<details>
  <summary>

  ## Project Notes
  </summary>

  <ul>
    <li>.gitignore</li>
    <li>prettier</li>
    <li>typescript</li>
    <li>monorepo</li>
    <li></li>
  </ul>

  <blockquote>
  <details>
    <summary>
      
  ### 📦 NPM Workspaces and Sharing Code Between Packages
  
  </summary>

  > _How the monorepo is structured, how code is shared between the Next.js frontend and CraftCMS backend, and how to manage dependencies efficiently._
  </details>
</blockquote>

<blockquote>
  <details>
    <summary>
      
  ### 📁 .gitignore and Why We Need to Ignore Certain Files
  
  </summary>
  
  > _Explanation of `.gitignore` strategy, including why we ignore `vendor/`, `node_modules/`, environment files, DDEV config files, and other artifacts._
  </details>
</blockquote>
  
</details>

---

## 📚 License

MIT

---

## 👥 Contributing

Coming soon.

