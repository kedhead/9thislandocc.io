# 9th Island OCC Website - Project Summary

## Overview
A modern, fully CMS-managed website for the 9th Island Outrigger Canoe Club built with Astro and Decap CMS (formerly Netlify CMS). The site features a Polynesian volcanic/ocean theme with beautiful gradients and an easy-to-use admin interface for content management.

## Technology Stack
- **Framework**: Astro (Static Site Generator)
- **CMS**: Decap CMS with GitHub OAuth backend
- **Hosting**: Netlify (auto-deploys on GitHub commits)
- **Styling**: Tailwind CSS
- **Repository**: https://github.com/kedhead/9thislandocc.io

## Site Structure

### Pages
1. **Homepage** (`/`)
   - Hero section with logo and call-to-action buttons
   - What We Offer section (3 items)
   - Call to Action section
   - Social Media section (Instagram & Facebook links)
   - Sponsors & Partners section
   - Instagram feed integration (Juicer.io)

2. **About** (`/about`)
   - Hero section
   - Introduction
   - Mission statement with bullet points
   - Activities/What We Do section
   - Coaching Staff section (with photos and bios)
   - Join Us section

3. **Events** (`/events`)
   - Regular practice schedule (weekday & weekend)
   - Event/race listings with category filters (race, event, practice, news)
   - Individual event detail pages (`/events/[slug]`)
   - Social media links for live updates

4. **Gallery** (`/gallery`)
   - Juicer.io Instagram feed integration
   - Instructions for viewing more photos

5. **Membership** (`/membership`)
   - Membership benefits section (3 items)
   - Membership tier cards (currently 2 tiers: Individual & Family)
   - Interactive registration form

6. **Contact** (`/contact`)
   - Contact form with validation
   - Contact information
   - Practice schedule summary
   - Google Maps integration showing Horsepower Cove location

7. **Simple Admin Guide** (`/simple-admin`)
   - Instructions for club administrators on using the CMS

## CMS-Editable Content

### Site Settings (`/admin` → Site Settings)

#### General Settings
- Site Name
- Tagline
- Description
- Contact Email
- Facebook URL
- Instagram URL

#### Homepage
- **Hero Section**
  - Main Heading
  - Tagline
  - Description
  - Background Image (optional, 1920x1080px recommended)
  - Primary Button (text & link)
  - Secondary Button (text & link)

- **What We Offer**
  - Section Title
  - Items (list): Title & Description

- **Call to Action**
  - Heading
  - Description
  - Button Text & Link

- **Sponsors & Partners**
  - Section Title
  - Description
  - Sponsors (list): Name, Logo Image, Website URL (optional)

#### About Page
- Hero Section (Heading & Tagline)
- Introduction (Title & Content)
- Mission Section (Title, Description, Items list)
- Activities (Title, Items with Name & Description)
- Coaching Staff (Title, Staff list with Name, Title, Photo, Bio)
- Join Us Section (Title & Content)

#### Practice Schedule
- Weekday Practices (list): Day & Time
- Weekend Practices (list): Day & Time
- Location
- Location Details
- Seasonal Note

#### Membership Pricing
- Membership Tiers (list)
  - Name
  - Price
  - Description
  - Benefits (list)

### Events & News (`/admin` → Events & News)
- Create new posts
- Fields: Title, Date, Category (race/event/practice/news), Featured Image, Body
- Posts are stored as `.md` files in `src/content/posts/`
- File naming: `YYYY-MM-DD-slug.md`

## Key Features

### Instagram Integration
- Juicer.io widget embedded on gallery page and homepage
- Feed ID: `9thislandocc`
- Script: `https://www.juicer.io/embed/9thislandocc/embed-code.js`

### Dynamic Event Pages
- Events created in CMS automatically generate detail pages
- Supports both `.md` and `.mdx` files
- Handles Windows (CRLF) and Unix (LF) line endings
- Category-based filtering on events page

### Practice Location
- **Address**: 490 Horsepower Cove, Boulder City, NV 89005
- Google Maps embedded on contact page
- Directions link provided

### Color Scheme
CSS variables defined in `src/layouts/Layout.astro`:
- `--color-ocean-blue`: #0891b2 (cyan-600)
- `--color-ocean-dark`: #0e7490 (cyan-700)
- `--color-lava-orange`: #f97316 (orange-500)
- `--color-sand`: #fef3c7 (amber-100)

### Button Styles
- `.btn-ocean`: Ocean blue button
- `.btn-lava`: Lava orange button

## File Structure

```
9thisland/
├── public/
│   ├── admin/
│   │   ├── config.yml          # Decap CMS configuration
│   │   └── index.html          # CMS admin interface
│   ├── data/
│   │   ├── homepage.json       # Homepage content
│   │   ├── about.json          # About page content
│   │   ├── practice.json       # Practice schedule
│   │   └── membership.json     # Membership tiers
│   ├── logo.jpg                # Site logo (9th Island OCC)
│   └── 9thislandbackground.jpg # Optional hero background
├── src/
│   ├── content/
│   │   ├── posts/              # Event/news markdown files
│   │   ├── pages/
│   │   │   └── about.mdx
│   │   └── settings/
│   │       └── site.json       # Site settings
│   ├── layouts/
│   │   └── Layout.astro        # Main layout with CSS variables
│   └── pages/
│       ├── index.astro         # Homepage
│       ├── about.astro         # About page
│       ├── events.astro        # Events listing
│       ├── events/[slug].astro # Individual event pages
│       ├── gallery.astro       # Gallery page
│       ├── membership.astro    # Membership page
│       ├── contact.astro       # Contact page
│       └── simple-admin.astro  # Admin guide
└── astro.config.mjs            # Astro configuration
```

## Content Management Workflow

### For Administrators

1. **Access the CMS**
   - Go to `https://yoursite.netlify.app/admin`
   - Log in with GitHub OAuth

2. **Add an Event/Race**
   - Click "Events & News"
   - Click "New Events & News"
   - Fill in: Title, Date, Category, Optional Image, Body text
   - Click "Save" then "Publish"
   - The event will appear on `/events` automatically

3. **Edit Homepage Content**
   - Click "Site Settings"
   - Click "Homepage"
   - Edit any section
   - Click "Save" then "Publish"

4. **Add a Sponsor**
   - Click "Site Settings" → "Homepage"
   - Scroll to "Sponsors & Partners"
   - Click "Add Sponsors"
   - Upload logo, add name and optional URL
   - Click "Save" then "Publish"

5. **Update About Page**
   - Click "Site Settings" → "About Page"
   - Edit coaches, mission items, or any section
   - Click "Save" then "Publish"

6. **Modify Practice Schedule**
   - Click "Site Settings" → "Practice Schedule"
   - Edit times, days, or location
   - Click "Save" then "Publish"

### Automatic Deployment
- All CMS changes are committed to GitHub
- Netlify automatically rebuilds and deploys the site
- Changes typically go live within 2-3 minutes

## Design Highlights

### Hero Section
- Ocean blue to dark gradient background
- Optional custom background image support (with gradient overlay)
- Centered logo with shadow and ring effect
- Two call-to-action buttons

### Event Cards
- Color-coded category badges:
  - Race: Red
  - Event: Green
  - Practice: Blue
  - News: Gray
- Hover effects with shadow transitions
- "Read More" indicator on hover

### Membership Cards
- Flexbox layout for equal height cards
- Aligned "Select" buttons at bottom
- "Popular" badge on featured tier
- Responsive: 1 column mobile, 2 columns desktop

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid layouts adapt for mobile/tablet/desktop

## Important Notes

### Line Endings
- The codebase handles both Windows (CRLF) and Unix (LF) line endings
- Regex patterns in event parsing support both formats

### Logo
- Current logo: `/public/logo.jpg`
- Displayed at 128px (md: 160px) height
- Used in hero section on homepage

### Practice Location
- **Current**: 490 Horsepower Cove, Boulder City, NV 89005
- **Previous**: Boulder Beach (updated throughout site)

### Hidden/Removed Features
- Background image on hero (implemented but currently not used)
- Admin CTA on events page (removed for production)
- Grey placeholder boxes (all removed)

## Future Enhancement Ideas

### Easy Additions
- Add more membership tiers through CMS
- Upload sponsor logos as you get them
- Add coach photos and bios
- Create more event posts

### Potential Features
- Photo gallery upload through CMS (currently uses Instagram feed)
- Newsletter signup integration
- Member portal/login
- Online membership payment
- Race results archive
- Training calendar with Google Calendar integration

## Troubleshooting

### CMS Not Saving
- Check GitHub OAuth connection
- Verify you're logged in with correct GitHub account
- Check browser console for errors

### Events Not Showing
- Ensure frontmatter format is correct (see existing events)
- Check that file extension is `.md` in CMS config
- Verify date format: `YYYY-MM-DDTHH:mm:ss.000-08:00`

### Images Not Displaying
- Images uploaded via CMS go to `/public/uploads/`
- Check image path starts with `/uploads/`
- Verify image was successfully uploaded to GitHub

### Build Failures
- Check Netlify deploy logs
- Common issues:
  - Malformed JSON in data files
  - Invalid frontmatter in markdown files
  - Missing required fields

## Contact & Support

### Repository
- GitHub: https://github.com/kedhead/9thislandocc.io

### Admin Access
- CMS: `/admin`
- Requires GitHub OAuth authentication

### Deployment
- Hosted on Netlify
- Auto-deploys from `main` branch
- Build command: `npm run build`
- Publish directory: `dist`

## Change Log

### Latest Updates (November 2025)
- ✅ Integrated Juicer.io Instagram feed
- ✅ Removed placeholder gallery items
- ✅ Made events clickable with detail pages
- ✅ Fixed Windows line ending compatibility
- ✅ Removed homepage Instagram widget, added social CTA
- ✅ Made About page fully CMS-editable
- ✅ Added sponsors section to CMS
- ✅ Updated logo to new 9th Island OCC logo
- ✅ Restored hero gradient background
- ✅ Centered membership cards for 2-tier layout
- ✅ Fixed Select button alignment on membership page
- ✅ Updated practice location to Horsepower Cove
- ✅ Updated contact page map to correct location
- ✅ Removed admin CTA from events page
- ✅ Cleaned up sponsors section (no placeholder message)

---

**Last Updated**: November 18, 2025
**Status**: Production Ready ✨
