# Deployment Checklist for 9th Island OCC Website

## Pre-Deployment

- [ ] Test the site locally with `npm run dev`
- [ ] Update site settings in `src/content/settings/site.json`
  - [ ] Contact email
  - [ ] Social media URLs
  - [ ] Site description
- [ ] Add your club logo to `public/favicon.svg`
- [ ] Create at least one blog post in `src/content/posts/`
- [ ] Update the About page in `src/content/pages/about.mdx`
- [ ] Add photos to `public/uploads/` folder
- [ ] Test the build: `npm run build`
- [ ] Preview production build: `npm run preview`

## Deployment to Netlify (Recommended)

### Option A: Drag and Drop (Easiest)

1. [ ] Run `npm run build`
2. [ ] Go to [netlify.com](https://netlify.com) and sign up
3. [ ] Drag the `dist` folder to Netlify's deployment zone
4. [ ] Your site is live!

### Option B: GitHub Integration (Best for Updates)

1. [ ] Push your code to GitHub
2. [ ] Go to Netlify and click "New site from Git"
3. [ ] Connect your GitHub repository
4. [ ] Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. [ ] Click "Deploy site"
6. [ ] Your site will auto-deploy on every GitHub push!

## Setting Up TinaCMS (Optional but Recommended)

This allows you to edit content through a visual admin panel:

1. [ ] Go to [tina.io](https://tina.io) and create account
2. [ ] Create a new project
3. [ ] Connect to your GitHub repository
4. [ ] Get your Client ID and Token from Tina dashboard
5. [ ] In Netlify:
   - Go to Site Settings > Environment Variables
   - Add `TINA_CLIENT_ID` with your client ID
   - Add `TINA_TOKEN` with your token
6. [ ] Update build command in Netlify to: `npm run build:cms`
7. [ ] Redeploy your site
8. [ ] Access admin at: `yoursite.netlify.app/admin`

## Contact Form Setup

Choose one option:

### Option 1: Netlify Forms (Easiest if using Netlify)

1. [ ] Open `src/pages/contact.astro`
2. [ ] Add `netlify` attribute to form tag:
   ```html
   <form id="contact-form" netlify>
   ```
3. [ ] Redeploy
4. [ ] Check Netlify dashboard for form submissions

### Option 2: Formspree

1. [ ] Sign up at [formspree.io](https://formspree.io)
2. [ ] Create a new form
3. [ ] Update form action in `src/pages/contact.astro`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. [ ] Redeploy

## Post-Deployment

- [ ] Test all pages on the live site
- [ ] Test contact form
- [ ] Test on mobile devices
- [ ] Test social media links
- [ ] Share the URL with team members
- [ ] Update GitHub repository URL in README if changed
- [ ] Set up custom domain (optional)

## Custom Domain Setup (Optional)

If you have a custom domain like `9thislandocc.com`:

1. [ ] In Netlify, go to Domain Settings
2. [ ] Click "Add custom domain"
3. [ ] Follow DNS configuration instructions
4. [ ] Enable HTTPS (automatic with Netlify)

## Ongoing Maintenance

### Adding Content

**Easy Way (with TinaCMS):**
- [ ] Go to `yoursite.com/admin`
- [ ] Log in with GitHub
- [ ] Create/edit content
- [ ] Changes push to GitHub and auto-deploy

**Manual Way:**
- [ ] Edit files locally
- [ ] Test with `npm run dev`
- [ ] Push to GitHub (auto-deploys)
- [ ] OR run `npm run build` and drag `dist` folder to Netlify

### Regular Updates
- [ ] Update Node.js dependencies monthly: `npm update`
- [ ] Test after updates: `npm run build`
- [ ] Back up your content regularly

## Troubleshooting

### Build Fails
- [ ] Check Node.js version (need 18+)
- [ ] Delete `node_modules` and run `npm install`
- [ ] Check for typos in content files

### Changes Not Showing
- [ ] Clear browser cache
- [ ] Check that changes were pushed to GitHub
- [ ] Check Netlify deploy log

### Admin Panel Not Working
- [ ] Verify TinaCMS credentials are set in Netlify
- [ ] Check browser console for errors
- [ ] Make sure you're using `npm run build:cms` as build command

## Need Help?

- Check README.md for detailed documentation
- Check QUICK_START.md for beginner instructions
- Netlify support: [docs.netlify.com](https://docs.netlify.com)
- TinaCMS support: [tina.io/docs](https://tina.io/docs)
- Astro support: [docs.astro.build](https://docs.astro.build)

## Success!

Once everything is checked off, your website is live and ready to use!

Remember to update content regularly and engage with potential new members through the contact form.

Imua! (Move forward!)
