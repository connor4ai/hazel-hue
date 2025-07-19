# GitHub Migration Guide for Hazel & Hue

## 🚀 Quick Migration Steps

### Step 1: Prepare Your Local Environment

1. **Install Git** (if not already installed):
   - Windows: Download from [git-scm.com](https://git-scm.com)
   - Mac: `brew install git` or use Xcode Command Line Tools
   - Linux: `sudo apt install git` or equivalent

2. **Configure Git**:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 2: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Click "New Repository"**
3. **Repository Details**:
   - Repository name: `hazel-hue` (or your preferred name)
   - Description: "AI-Powered Personal Color Analysis Platform"
   - Set to **Public** or **Private** (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we'll use existing files)

### Step 3: Initialize Git in Your Project

From your Replit terminal or local project directory:

```bash
# Initialize git repository
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Hazel & Hue AI Color Analysis Platform"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/hazel-hue.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🔧 Alternative: Using GitHub CLI

If you prefer using GitHub CLI:

1. **Install GitHub CLI**:
   - Windows: `winget install GitHub.cli`
   - Mac: `brew install gh`
   - Linux: Follow [GitHub CLI installation guide](https://cli.github.com/)

2. **Authenticate**:
```bash
gh auth login
```

3. **Create and push repository**:
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Hazel & Hue AI Color Analysis Platform"

# Create GitHub repository and push
gh repo create hazel-hue --public --source=. --remote=origin --push
```

## 📁 What Gets Uploaded

### ✅ Files that WILL be uploaded:
- All source code (`client/`, `server/`, `shared/`, `mobile/`)
- Configuration files (`package.json`, `tsconfig.json`, `tailwind.config.ts`, etc.)
- Documentation (`README.md`, this guide)
- Database schema (`shared/schema.ts`)

### ❌ Files that will NOT be uploaded (due to .gitignore):
- `node_modules/` directory
- `.env` files (environment variables)
- `uploads/` directory (user-uploaded images)
- `dist/` and `build/` directories
- IDE-specific files (`.vscode/`, `.idea/`)
- Replit-specific files (`.replit`, `replit.nix`)

## 🔐 Handling Sensitive Information

**Important**: Environment variables and API keys are automatically excluded by `.gitignore`.

### Secure Environment Variables:
1. **Never commit** `.env` files to GitHub
2. **Use** `.env.example` as a template (already created)
3. **For deployment**, set environment variables in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Railway: Dashboard → Variables
   - Heroku: `heroku config:set KEY=value`

## 🏗️ Repository Structure After Migration

```
hazel-hue/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── index.html
├── server/                 # Express backend
│   ├── services/
│   ├── middleware/
│   └── index.ts
├── shared/                 # Shared types and schemas
│   └── schema.ts
├── mobile/                 # React Native app
├── .gitignore             # Git ignore rules
├── .env.example           # Environment template
├── README.md              # Project documentation
├── DEPLOYMENT.md          # Deployment instructions
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🔄 Working with the Repository

### Basic Git Workflow:

1. **Make changes** to your code
2. **Stage changes**:
```bash
git add .
# or for specific files:
git add client/src/components/NewComponent.tsx
```

3. **Commit changes**:
```bash
git commit -m "Add new color analysis feature"
```

4. **Push to GitHub**:
```bash
git push origin main
```

### Creating Feature Branches:

```bash
# Create and switch to new branch
git checkout -b feature/new-payment-system

# Make your changes, then commit
git add .
git commit -m "Implement new payment system"

# Push the branch
git push origin feature/new-payment-system

# Create Pull Request on GitHub
```

## 🚀 Next Steps After Migration

### 1. Set Up GitHub Actions (CI/CD)
Create automated deployments when you push code.

### 2. Configure Branch Protection
Protect your main branch from direct pushes.

### 3. Set Up Issues and Projects
Use GitHub's project management features.

### 4. Add Contributors
If working with a team, add collaborators to the repository.

### 5. Deploy from GitHub
Connect your repository to Vercel, Railway, or other hosting platforms.

## 🆘 Troubleshooting

### Large File Issues:
If you get errors about large files:
```bash
# Check file sizes
find . -size +50M -not -path "./node_modules/*"

# Add large files to .gitignore
echo "large-file.zip" >> .gitignore
git rm --cached large-file.zip
```

### Authentication Issues:
```bash
# For HTTPS (will prompt for username/password or token)
git remote set-url origin https://github.com/yourusername/hazel-hue.git

# For SSH (requires SSH key setup)
git remote set-url origin git@github.com:yourusername/hazel-hue.git
```

### Pushing Issues:
```bash
# If remote branch doesn't exist
git push -u origin main

# If you need to force push (be careful!)
git push --force-with-lease origin main
```

## ✅ Migration Checklist

- [ ] Created GitHub account
- [ ] Installed and configured Git
- [ ] Created GitHub repository
- [ ] Added .gitignore file
- [ ] Created README.md
- [ ] Initialized local git repository
- [ ] Added all files to git
- [ ] Made initial commit
- [ ] Added GitHub remote
- [ ] Pushed to GitHub
- [ ] Verified all files uploaded correctly
- [ ] Set up deployment (optional)
- [ ] Configured branch protection (optional)

## 🎉 You're Done!

Your Hazel & Hue application is now on GitHub and ready for:
- Version control
- Collaboration
- Automated deployments
- Open source contributions
- Portfolio showcase

Visit your repository at: `https://github.com/yourusername/hazel-hue`