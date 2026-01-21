
## Contributor & Developer Resources & Guides
   - Docker to containerize shizz 🐳 — [Docker Installation](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/)
   - DDEV to build our Docker servers for us 🤓 — [DDEV Installation](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#wsl2-docker-desktop-install-script)
   - Composer to manage php packages 🎼 — [Composer](https://getcomposer.org/doc/)
   - MakeFile for easily running bulk scripts 🚚 — [MakeFile](https://www.gnu.org/software/make/manual/make.html)
   - CraftCMS for managing content 📝 — [CraftCMS](https://craftcms.com/docs/)
   - .env 🦺 — [.env](https://www.dotenv.org/docs)
   - Prettier... But be warned 🧹 — [prettier](https://prettier.io/)
   - Prettier Plugin by Melody  — [prettier-plugin-twig-melody](https://github.com/trivago/prettier-plugin-twig-melody?tab=readme-ov-file#install)
   - Node V14+, I recommend using NVM to install and manage — [NVM]([https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating))

## Requirements
1. Computer with MINIMUM 8gb RAM, modern OS (so Windows, Linux or Mac) 
1. NodeJS version 14+
2. Ubuntu
3. PHP 8.1+
4. DDEV
5. Docker

## Steps 
1. Add empty .env file to the root of the project (next to .env.example)
2. Change web > .htaccess_dev into .htaccess (or prod if you are putting this on your production server)
3. Update package.json, make this project truly your own
    - Project name — must adhere to the [rules of npm](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name)
    - author
    - description
4. Configure the project with DDEV
     ```shell
     make setup
     ```
5. Run the project with these 2 commands
     ```shell
      ddev start
     ```
     ```shell
      ddev launch
     ```

6. Navigate to /admin in the new web browser. If you land on a page with server errors or an if(!hasCraftInstalled) then you are on the right track. Now check your .htaccess file and .env (make sure you have your database hooked into ddev correctly)

7. In the GraphQL tab:
    - Select Schemas and in the Private Schema, make sure all checkboxes are checked.
    - Then, select the Tokens tab and create a new token. Name it something like 'Private' and copy only the token value after `Bearer`.
8.  Create a FileSystem for asset uploads and Assets, but make sure to name the path ANYTHING OTHER THAN ASSETS

 `(For example, if you have an assets/ folder, that would conflict with the /assets page in the control panel.)`
          ![image](https://github.com/user-attachments/assets/6f1f6579-442e-4213-8a35-cb1dc88b1707)
          ![image](https://github.com/user-attachments/assets/509fcf48-d478-4733-90ce-eddabd093cd1)


## Cloud Hosting (Staging / Production)

1. Purchase a Digital Ocean droplet
1. Connect the droplet to RunCloud.io
1. Create a system user and generate a password. `-----Store passwords for SSH connection to server later-------`
1. Create a DB user, then a DB in runcloud.
1. Create a webapp or your CMS
  - From a GH repo
  - Generate and put the deploy key in your GH repo
  - Add `:/home/app_user_name` to the end of open_basedir
6. Using the Digital Ocean console or SSH (vscode or other) into the DB server
  - run `gunzip db.sql.gz`
  - run `mysql -u <db_user_name> -p <db_name> < db.sql`
7. Add to DNS records
  - if domain 
    - `A_record @ server_ip 600s`
    - `CName www url_name.com. 1hour`
  - if subdomain 
    - `A_record url_name server_ip 1hour`
    - `CName *.url_name url_name.com. 1hour`
8. Add SSL record
1. Add .htaccess file to the web directory
1. Create the graphql schema and token
1. In CraftCMS, check Utilities > System Report > scroll to Requirements and make sure these are all removed from the list in RunCloud.io Webapp settings.


RunCloud sets up webhooks into our github repos, so the deployment of changes should be done through that webhook. When you `git push` to main or merge a PR to main, the production site will auto-magically update.
### Acknowledgments
- [CreateSean](https://github.com/CreateSean/craft-starter)
### Features
- Live preview
- Revalidate Front End data on save of Entries / Categories / Globals
- SEO optimization
### Contributor & Developer Resources & Guides
   - Docker 🐳 — [Docker Installation](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/)
   - DDEV 🤓 — [DDEV Installation](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#wsl2-docker-desktop-install-script)
   - Composer 🎼 — [Composer](https://getcomposer.org/doc/)
   - CraftCMS 📝 — [CraftCMS](https://craftcms.com/docs/)
   - .env 🦺 — [.env](https://www.dotenv.org/docs)
   - Node V18+, I recommend using NVM to install and manage — [NVM](https://github.com/nvm-sh/nvm)


## FAQ/Tips
### Errors during install
1. Follow the DDEV instructions slowly and carefully. Read each line all the way through, it's faster than skimming and hitting an error and having to debug...
2. Uninstall Ubuntu (all programs related to Ubuntu: Ubuntu, 'install REALEASE (Ubuntu)', .... )
### Prettier
1. You will need to restart the vscode window from the Command Palette (ctrl+shift+p) 
```shell 
Developer: reload window
```
After the reload, let vscode finish loading and indexing, then attempt to use Prettier
