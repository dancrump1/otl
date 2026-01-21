# Next.js + CraftCMS NPM Workspaces Template

This repository is a full-stack monorepo template using **Next.js**, **CraftCMS**, and **npm workspaces**, with Docker for local development leveraging WSL2/Ubuntu. It is structured to streamline development across frontend and backend teams with shared code, efficient tooling, and easy-to-use configuration.

Click the > to expand the sections

---

## 6 Minute Setup video

### This was before creating a MONO repo, only clone once and do each step inside the correct package

Sorry for hte poor quality. Max upload is 10MB for video. <br/> <https://github.com/user-attachments/assets/2e057e20-4c94-4751-9050-933409f056fd>

## Requirements

1. Computer with MINIMUM 8gb RAM, modern OS (so Windows, Linux or Mac)
1. NodeJS version 14+
2. Ubuntu
3. PHP 8.1+
4. DDEV
5. Docker

## Go here if

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
          <li>NodeJS version 14+, I recommend using [NVM](https://github.com/nvm-sh/nvm) if using  Windows</li>
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

<details>
  <summary>Initial hosting setup</summary>

  1. Using RunCloud + DigitalOcean API key, create a droplet
    - Ubuntu 24+
    - PHP 8.4+
  2. Create a system user WITH SUDO PRIVILEGES
  3. Create a database user
  4. Create a database
  5. Create 2 webapps (CMS and UI)
    - For CMS, follow cms readme
    - For UI, follow app readme

</details>

## Technical Checklist: Next.js + Craft CMS Web Architecture

### 🧱 Core Technologies<br />

##### We use a decoupled architecture:<br />

Frontend: Built with Next.js (React + TypeScript)<br />
Backend: Content served via Craft CMS (headless)<br />
Deployment: Hosted on DigitalOcean with RunCloud<br />
Local Dev: Managed with DDEV

##### Next.js (React Framework)<br />

✔️ SSR / SSG / ISR – Choose the right rendering method per page<br />
✔️ Image Optimization – Native support for responsive images (via next/image)<br />
✔️ Code Splitting – Automatic per-page bundle optimization<br />
✔️ Tree Shaking – Removes unused code in production builds<br />

##### Craft CMS (Headless CMS)<br />

✔️ Custom Fields / Content Modeling – Total control over structured data<br />
✔️ User Permissions & Roles – Secure admin access for non-technical users<br />
✔️ Asset Management – Manage images, videos, documents from one place<br />
