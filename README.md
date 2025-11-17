# 9th Island Outrigger Canoe Club Website

A modern, easy-to-maintain website for 9th Island OCC built with Astro and TinaCMS.

## Features

- **Modern, Clean Design** - Beautiful ocean-themed design with Tailwind CSS
- **Easy Content Management** - TinaCMS provides a visual editor for updating content without coding
- **Blog/Events System** - Post updates about practices, races, and club events
- **Contact Form** - Allow potential members to inquire about joining
- **Social Media Integration** - Links to Facebook and Instagram
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Fast Performance** - Built with Astro for blazing-fast page loads

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/kedhead/9thislandocc.io.git
cd 9thislandocc.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:4321`

You should see your website running locally!

## How to Edit Content (The Easy Way!)

### Using TinaCMS Visual Editor

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:4321/admin`
3. You'll see the TinaCMS admin interface
4. Click on any content to edit it visually
5. Changes are saved directly to your content files

### What You Can Edit

#### Site Settings
- Site name and tagline
- Social media URLs
- Contact email
- General site description

#### Pages
- About page content
- Add new pages as needed

#### Blog Posts & Events
- Create new event announcements
- Post practice schedules
- Share race results
- Add news updates

Each post can include:
- Title
- Date
- Category (event, practice, news, race)
- Featured image
- Full content with rich text formatting

## Editing Content Manually (Alternative)

If you prefer to edit files directly:

### Site Settings
Edit `src/content/settings/site.json`

### Blog Posts/Events
Create new files in `src/content/posts/` with this format:

```markdown
---
title: Your Event Title
date: 2024-01-15T00:00:00.000Z
category: event
image: /uploads/event-photo.jpg
---

Your event description here...
```

### Pages
Edit files in `src/content/pages/` using Markdown format.

## Adding Images

1. Upload images to the `public/uploads/` folder
2. Reference them in your posts as `/uploads/filename.jpg`
3. Through TinaCMS, you can upload images directly through the admin interface

## Building for Production

When you're ready to deploy your site:

```bash
npm run build
```

This creates a `dist/` folder with your production-ready website.

## Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Your site will be live in minutes! Netlify will automatically redeploy whenever you push changes to GitHub.

#### Setting up TinaCMS with Netlify

1. Go to [tina.io](https://tina.io) and create a free account
2. Create a new project and connect it to your GitHub repo
3. Get your Client ID and Token from the TinaCMS dashboard
4. In Netlify, go to Site Settings > Environment Variables
5. Add:
   - `TINA_CLIENT_ID` = your client ID
   - `TINA_TOKEN` = your token
6. Redeploy your site

Now you can edit your live site at `yoursite.netlify.app/admin`!

### Option 2: Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Vercel will automatically detect Astro settings
5. Click "Deploy"

### Option 3: GitHub Pages

1. Update `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://kedhead.github.io',
  base: '/9thislandocc.io',
  // ... rest of config
});
```

2. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. Push to GitHub - your site will deploy automatically!

## Contact Form Setup

The contact form is currently set up with a placeholder. To make it functional:

### Option 1: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update the form in `src/pages/contact.astro`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms

If using Netlify, just add `netlify` attribute to the form:
```html
<form name="contact" netlify>
```

### Option 3: Web3Forms

1. Get a free API key from [web3forms.com](https://web3forms.com)
2. Add it to your form as a hidden field

## Instagram Integration

The site includes placeholder sections for Instagram feeds. To display actual Instagram photos:

### Option 1: Instagram Embed Widget
Use Instagram's official embed widget code in your pages.

### Option 2: EmbedSocial or Similar Services
Services like EmbedSocial provide easy-to-use Instagram feed widgets that update automatically.

### Option 3: Manual Updates
Simply add photos to the `public/uploads/` folder and reference them in your blog posts.

## Customization

### Colors
Edit the color theme in `src/styles/global.css`:
```css
@theme {
  --color-ocean-blue: #0077be;
  --color-ocean-dark: #005a8c;
  --color-sand: #f4e8d0;
  --color-sunset: #ff6b35;
}
```

### Logo
Replace `/public/favicon.svg` with your club logo

### Fonts
Update the font in `src/styles/global.css`:
```css
body {
  font-family: 'Your Font', system-ui, sans-serif;
}
```

## Project Structure

```
/
├── public/              # Static assets (images, favicon)
│   └── uploads/        # User-uploaded images
├── src/
│   ├── content/        # Content files (editable through TinaCMS)
│   │   ├── pages/      # Static pages (About, etc.)
│   │   ├── posts/      # Blog posts and events
│   │   └── settings/   # Site configuration
│   ├── layouts/        # Page layouts
│   │   └── Layout.astro
│   ├── pages/          # Route pages
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── events.astro     # Events listing
│   │   └── contact.astro    # Contact form
│   └── styles/         # Global styles
├── tina/               # TinaCMS configuration
│   └── config.ts
└── package.json
```

## Troubleshooting

### Development server won't start
- Make sure you have Node.js 18+ installed
- Delete `node_modules` folder and run `npm install` again
- Check if port 4321 is already in use

### Images not showing
- Make sure images are in the `public/` folder
- Reference images without 'public' in the path (e.g., `/uploads/photo.jpg` not `/public/uploads/photo.jpg`)

### TinaCMS admin not loading
- Make sure you've run `npm run dev` (not just `astro dev`)
- Clear your browser cache
- Check the browser console for errors

## Support

- Astro Documentation: [docs.astro.build](https://docs.astro.build)
- TinaCMS Documentation: [tina.io/docs](https://tina.io/docs)
- Tailwind CSS Documentation: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## License

This project is open source and available under the MIT License.

---

Built with ❤️ for 9th Island Outrigger Canoe Club
