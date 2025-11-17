# Quick Start Guide for 9th Island OCC Website

## For Non-Technical Users

This is the absolute easiest way to get started with your website.

### Step 1: Install Node.js

1. Go to [nodejs.org](https://nodejs.org)
2. Download the "LTS" version (recommended for most users)
3. Run the installer
4. Accept all defaults by clicking "Next"

### Step 2: Get the Code

1. Download this entire folder to your computer
2. Or if using GitHub, click "Code" > "Download ZIP" and extract it

### Step 3: Open Terminal/Command Prompt

**On Windows:**
- Press the Windows key
- Type "cmd" or "PowerShell"
- Press Enter

**On Mac:**
- Press Cmd+Space
- Type "Terminal"
- Press Enter

### Step 4: Navigate to Your Project

In the terminal, type:
```bash
cd path/to/your/project
```

For example, if you extracted to your Desktop:
```bash
cd Desktop/9thislandocc
```

### Step 5: Install Everything

Type this command and press Enter:
```bash
npm install
```

Wait for it to finish (this might take a few minutes).

### Step 6: Start Your Website

Type this command:
```bash
npm run dev
```

### Step 7: View Your Website

Open your web browser and go to:
```
http://localhost:4321
```

You should see your website!

## How to Edit Content

### The EASY Way - Using TinaCMS

1. Make sure your website is running (`npm run dev`)
2. Go to: `http://localhost:4321/admin`
3. Click on what you want to edit
4. Make your changes
5. Click Save

That's it! Your changes are saved to files automatically.

### The Manual Way - Editing Files

You can also edit content files directly using any text editor (Notepad, VS Code, etc.):

**Site Settings:**
- Open: `src/content/settings/site.json`
- Edit the text between the quotes
- Save the file

**Blog Posts:**
- Go to: `src/content/posts/`
- Copy `welcome-to-9thisland.mdx` as a template
- Change the title, date, and content
- Save with a new filename

**About Page:**
- Open: `src/content/pages/about.mdx`
- Edit the text
- Save

## Publishing Your Website

### Recommended: Use Netlify (Free & Easy)

1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop your entire project folder to Netlify
3. OR connect your GitHub repository
4. Your site goes live automatically!

**To update your live site:**
- If you dragged and dropped: Just drag the folder again
- If using GitHub: Just push your changes to GitHub

### Need Help?

- Check the full README.md for detailed instructions
- Common issues are covered in the Troubleshooting section
- Remember: `npm run dev` starts your local site
- Press Ctrl+C in the terminal to stop the server

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tips

1. Always keep the terminal window open while working
2. If something breaks, stop the server (Ctrl+C) and start it again
3. Save your work often
4. Test changes locally before publishing
5. Keep a backup of your content files

That's all you need to know to get started! For more advanced features, check the main README.md file.
