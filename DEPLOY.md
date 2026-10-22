# Publishing the A.C. Projects website — GitHub + Netlify

This guide takes the website from the folder on your computer to a live web address.
No programming and no extra software are needed: everything is done in the browser.

**How it works:** the files live on **GitHub** (online storage for website files).
**Netlify** watches GitHub and publishes the site. Every time a file changes on GitHub, the live site updates by itself in about 30 seconds.

Time needed: about 20–30 minutes the first time.

---

## 0. What you need

| What | Where / note |
|---|---|
| The project folder | `A.C.Project` on the desktop |
| A GitHub account (free) | https://github.com/signup |
| A Netlify account (free) | https://app.netlify.com/signup — sign up **with GitHub**, it saves a step |
| The company e-mail address | Quote requests from the website are sent there |
| A domain name (optional) | e.g. bought at Combell, One.com, Versio… Can be added later |

### What is in the project folder

```
A.C.Project/
├── public/               ← THE WEBSITE (this is what visitors see)
│   ├── index.html        main page
│   ├── 404.html          "page not found" page
│   ├── assets/
│   │   ├── css/style.css     design
│   │   ├── js/main.js        3D town hall, animations, languages, quote form
│   │   └── img/favicon.svg   browser tab icon
│   ├── robots.txt        rules for Google
│   ├── sitemap.xml       page list for Google
│   └── site.webmanifest  name + icon for phones
├── netlify.toml          tells Netlify: publish the "public" folder, nothing to build
├── .gitignore            files GitHub should skip
├── README.md             project notes (Russian)
└── DEPLOY.md             this guide
```

There is also a hidden `.claude` folder, which is only for local testing. **Do not upload it.** Windows hides it by default.

---

## 1. Create the GitHub repository (storage for the files)

1. Go to https://github.com and sign in (or sign up).
2. Click the **+** at the top right → **New repository**.
3. Fill in:
   - **Repository name:** `acprojects-website`
   - **Visibility:** **Private** (only your team sees the files; the website itself is still public)
   - Leave *Add a README*, *.gitignore* and *license* **unticked**: we already have these files.
4. Click **Create repository**.

## 2. Upload the website files to GitHub

1. On the new, empty repository page, click the link **"uploading an existing file"**.
2. Open the `A.C.Project` folder in File Explorer.
3. Select these 5 items (hold **Ctrl** and click each one):
   - the folder **`public`**
   - **`netlify.toml`**
   - **`.gitignore`**
   - **`README.md`**
   - **`DEPLOY.md`**
4. **Drag** them into the GitHub page in the browser.
   - Use drag-and-drop: the "choose your files" button cannot pick folders.
   - Wait until the list shows files like `public/assets/js/main.js`, which means the folder structure was kept.
5. At the bottom, under **Commit changes**, type: `First version of the website`.
6. Click **Commit changes**.
7. ✅ **Check:** the repository now shows `public`, `.gitignore`, `DEPLOY.md`, `README.md`, `netlify.toml`.

## 3. Connect Netlify to GitHub and publish

> Netlify recently renamed "Site" to "Project" in its menus. If a button says *Site* instead of *Project*, it is the same thing.

1. Go to https://app.netlify.com and sign in **with GitHub**.
2. Click **Add new project** (or **Add new site**) → **Import an existing project**.
3. Click **GitHub**. A GitHub window asks for permission:
   - choose **Only select repositories** → pick `acprojects-website` → **Install / Authorize**.
4. Back in Netlify, click the repository `acprojects-website`.
5. Check the settings. Netlify fills them from `netlify.toml`:

   | Field | Value |
   |---|---|
   | Branch to deploy | `main` |
   | Base directory | *(empty)* |
   | Build command | *(empty)* |
   | Publish directory | `public` |

6. **Project name:** type `acprojects` (if taken, try `acprojects-be`). This becomes `https://acprojects.netlify.app`.
7. Click **Deploy**.
8. Wait about 30 seconds until the status shows **Published**, then click the link to open the website.
9. ✅ **Check:** the 3D town hall builds, the language switch works, and the bottom-left button opens the quote form.

## 4. Turn on the quote requests (Netlify Forms)

The website is already set up for Netlify Forms (form name: **`offerte`**). It only needs to be switched on.

1. In your Netlify project, open **Forms** in the left menu.
2. Click **Enable form detection**.
3. Publish once more so Netlify can find the form: **Deploys** → **Trigger deploy** → **Deploy project** (or **Deploy site**).
4. Go back to **Forms**. A form named **`offerte`** should now be listed.
5. Get an e-mail for each request:
   **Project configuration** → **Notifications** → **Emails and webhooks** →
   **Form submission notifications** → **Add notification** → **Email notification** →
   event: *New form submission*, form: **`offerte`**, e-mail: the company address → **Save**.
6. **Test it:** on the live website, click **Offerte aanvragen**, fill in all 4 steps and send.
   - The site shows "Aanvraag ontvangen" with a reference like `AC-2026-1234`.
   - The request appears in Netlify → **Forms** → **offerte**, and an e-mail arrives.

**What a request contains** (values in Dutch):

| Field | Meaning |
|---|---|
| `referentie` | reference number shown to the customer, e.g. AC-2026-1234 |
| `taal` | language the visitor used (nl / fr / en) |
| `work` | type(s) of work |
| `urgency` | when to start |
| `roofType`, `building`, `cover` | roof type, building type, current roof covering |
| `area`, `floors`, `year` | roof area in m², number of storeys, building year |
| `street`, `zip`, `city` | address of the job |
| `start` | preferred start date |
| `photos` | file names only, because the photos themselves are **not** sent (ask the customer to e-mail them) |
| `desc` | free description |
| `first`, `last`, `email`, `phone`, `contactPref` | contact details and preferred way of contact |
| `company` | company / VAT number (optional) |
| `gdpr` | "ja" = the customer agreed to the privacy statement |

Spam: the form has a hidden honeypot field, and Netlify also filters spam (see **Forms → Spam submissions**).
Free plans have a monthly limit on form submissions. See https://www.netlify.com/pricing for the current numbers.

## 5. Connect your own domain (optional, can be done later)

1. Netlify → **Domain management** → **Add a domain** → type the domain, e.g. `acprojects.be` → confirm.
2. Choose **one** of these two ways:

   **A — Let Netlify manage the domain (easiest)**
   Netlify shows 4 *nameservers* (like `dns1.p01.nsone.net`). Log in at the company where you bought the domain,
   find **Nameservers / DNS servers**, and replace the existing ones with these 4.

   **B — Keep DNS at your domain company**
   Add these two records in the domain company's DNS settings:

   | Type | Name / host | Value |
   |---|---|---|
   | `A` | `@` (the bare domain) | `75.2.60.5` |
   | `CNAME` | `www` | `acprojects.netlify.app` (your Netlify address) |

3. Wait. DNS changes take from a few minutes up to 24 hours.
4. HTTPS (the padlock) is switched on automatically. If not after a few hours:
   **Domain management → HTTPS → Verify DNS configuration**.
5. Finally, put the real domain in two files on GitHub (see section 6 for how to edit):
   - `public/robots.txt`: replace `https://www.example.be` with your domain
   - `public/sitemap.xml`: same replacement

## 6. Updating the website later

**Small text change, directly on GitHub:**
1. Open the file on GitHub (e.g. `public/index.html`).
2. Click the **pencil ✏️** icon → change the text → **Commit changes…** → **Commit changes**.
3. Netlify publishes the change automatically in about 30 seconds.

> The visible Dutch, French and English texts of the site are in `public/assets/js/main.js`
> (search for the sentence you want to change; each language has its own block: `nl:`, `fr:`, `en:`).

**Replacing files you changed on your computer:**
1. In the repository click **Add file → Upload files**.
2. Drag the changed files or the whole `public` folder. Files with the same path are overwritten.
3. **Commit changes**.

**For regular work**, install **GitHub Desktop** (https://desktop.github.com): *File → Clone repository*,
edit the files in that folder, then **Commit to main** → **Push origin**.

**Something went wrong after an update?** Netlify → **Deploys** → click an earlier deploy → **Publish deploy**.
The previous version is live again immediately.

## 7. Before announcing the website: checklist

- [ ] Quote form tested on the live site and the e-mail arrived (section 4)
- [ ] **Privacy statement** (privacybeleid / politique de confidentialité) online. This is required in Belgium because the form collects personal data. The text must come from the company.
- [ ] Domain connected and the padlock 🔒 shows (section 5)
- [ ] `robots.txt` and `sitemap.xml` use the real domain
- [ ] Dutch and French texts checked by a native speaker, including the promises "Gratis en vrijblijvend" and "we nemen zo snel mogelijk contact op"
- [ ] Optional: submit the site in Google Search Console (https://search.google.com/search-console) with the sitemap address `https://YOUR-DOMAIN/sitemap.xml`

## 8. Troubleshooting

| Problem | Cause → fix |
|---|---|
| Netlify shows "Page not found" | *Publish directory* is not `public`, or files were uploaded without the `public` folder. Check **Project configuration → Build & deploy → Build settings**, and that GitHub shows `public/index.html`. |
| Site shows text but no design / no 3D | The `assets` folder is missing on GitHub. Upload the whole `public` folder again. |
| The form says "Versturen is niet gelukt" | Form detection is off, or the site was not re-deployed after turning it on (section 4, steps 1–3). |
| No `offerte` form in Netlify → Forms | Same as above: enable form detection, then **Trigger deploy**. |
| Requests arrive in Netlify but no e-mail | Notification not set up, or check the spam folder (section 4, step 5). |
| Domain shows "Not secure" | DNS not finished yet. Wait, then **Domain management → HTTPS → Verify DNS configuration**. |
| A change on GitHub does not appear | Look at **Deploys** in Netlify; if the deploy failed, open it to read why. Refresh the browser with **Ctrl+F5**. |
