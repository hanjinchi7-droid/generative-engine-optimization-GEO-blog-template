# 🚀 GEO-Ready Blog Template

<div align="center">

**[AI Search Optimized](https://github.com/topics/ai-search)** • **[Schema.org](https://github.com/topics/schema)** • **[Astro](https://astro.build)**

The production-ready **GEO (Generative Engine Optimization)** blog template designed for B2B marketing and AI-driven search engines.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-^7.0.0-orange?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

[Quick Start](#-quick-start) • [Features](#-features) • [Deployment](#-deployment) • [Configuration](#-configuration) • [AI Agent Setup](#-for-ai-agents)

</div>

---

## 🎯 Project Positioning

This is **not just another blog template**. It's a purpose-built **GEO (Generative Engine Optimization)** marketing foundation designed specifically for the AI search era.

Unlike traditional templates focused on SEO (Search Engine Optimization) for Google/Bing, this template is optimized for **AI-driven answer engines** like ChatGPT, Claude, Perplexity, and Gemini.

**Key Philosophy:**
> "In the age of AI search, **'The Best Match' defeats 'The Loudest Voice'**."

---

## ✨ Core Features

### 🤖 AI Search Optimization (GEO)

- **Auto-generated Schema.org Structured Data**
  - FAQ Schema (auto-detected from Markdown)
  - HowTo Schema (auto-detected from numbered lists)
  - Breadcrumb Schema
  - Organization Schema
  - BlogPosting Schema

- **Article Table of Contents (TOC)**
  - Auto-generated from h2/h3 headings
  - Scroll spy with active highlighting
  - Smooth scrolling navigation
  - Responsive: hidden on mobile, sticky sidebar on desktop

- **Dynamic Dual-Column Layout**
  - Content + TOC side-by-side on desktop
  - Single-column on mobile
  - Optimized reading experience

### 🎨 Content Management

- **Decap CMS (formerly Netlify CMS) Integration**
  - Multi-collection support (insights, knowledge, products)
  - Netlify Identity authentication
  - Admin panel at `/admin/`
  - Zero hard-coded business data (fully customizable)

- **Pre-built High-Converting Pages**
  - Contact page with form and support info
  - Services page with hero, features, and testimonials
  - Fully customizable with placeholder content

### ⚡ Performance & Quality

- **Lighthouse Optimized**
  - High scores out of the box
  - Optimized images with multiple formats (WebP, AVIF)
  - CSS/JS compression
  - Lazy loading

- **Modern Tech Stack**
  - **Astro** - Lightning-fast static site generator
  - **Tailwind CSS** - Utility-first styling
  - **TypeScript** - Type-safe development
  - **MDX Support** - Enhanced Markdown

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.14.1
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/hanjinchi7-droid/generative-engine-optimization-GEO-blog-template.git
cd generative-engine-optimization-GEO-blog-template

# Install dependencies
npm install

# Start development server
npm run dev
```

### 📝 Configuration Checklist

To customize this template for your brand, modify the following files:

#### 1. Site Configuration (`src/config.yaml`)

```yaml
site:
  name: 'Your Company Name'          # Your brand name
  site: 'https://your-domain.com'     # Your live site URL
  base: '/your-repo-name'            # See Deployment section below
  trailingSlash: false

metadata:
  title:
    default: 'Your Company Name'
    template: '%s — Your Company Name'
  description: 'Your site description'

  twitter:
    handle: '@your_handle'
    site: '@your_handle'

schema:
  organization:
    name: 'Your Company Name'
    logo: '/favicon.svg'
    email: 'your-email@example.com'
  social:
    github: 'https://github.com/your-username'
    reddit: 'https://reddit.com/r/your_subreddit'
    twitter: 'https://twitter.com/your_handle'
    linkedin: 'https://linkedin.com/in/your-profile'
```

#### 2. Navigation (`src/navigation.ts`)

Update footer links and social links:

```typescript
{
  title: 'Connect',
  links: [
    { text: 'GitHub', href: 'https://github.com/your-username/your-repo' },
    { text: 'Reddit', href: 'https://www.reddit.com/r/your_subreddit' },
    { text: 'Email', href: 'mailto:your-email@example.com' },
  ],
}
```

#### 3. Decap CMS (`public/admin/config.yml`)

Update for your repository:

```yaml
backend:
  name: git-gateway
  branch: main
  repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME  # Change this!

site_url: https://your-domain.com           # Change this!
display_url: https://your-domain.com        # Change this!
cms_url: https://admin.your-domain.com     # Optional
```

---

## 🌐 Deployment

### GitHub Pages

#### Option A: Custom Domain
```yaml
# src/config.yaml
site: 'https://your-domain.com'
base: '/'
```

#### Option B: GitHub Pages Subdirectory (username.github.io/repo-name)

**⚠️ CRITICAL:** You must set `base` to your repository name!

```yaml
# src/config.yaml
site: 'https://username.github.io'
base: '/your-repo-name'    # Matches your GitHub repository name
```

Your site will be available at: `https://username.github.io/repo-name/`

**Common Issue:** If CSS doesn't load, check that `base` in `src/config.yaml` matches your repository name exactly.

### Other Platforms

- **Vercel** - Works out of the box
- **Netlify** - Works out of the box
- **Cloudflare Pages** - Works out of the box

---

## 📂 Project Structure

```
template/
├── public/
│   ├── admin/              # Decap CMS configuration
│   │   ├── config.yml       # CMS collection definitions
│   │   └── index.html       # Admin login redirect
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── blog/            # Blog components (SinglePost, TOC, etc.)
│   │   ├── common/          # Common components (Image, SchemaMarkup, etc.)
│   │   └── widgets/         # Page widgets (Hero, Features, Contact, etc.)
│   │
│   ├── config.yaml          # 🔑 Main configuration file
│   ├── layouts/             # Page layouts
│   ├── pages/               # Pages (contact, services, blog, etc.)
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utilities (Schema generator, etc.)
│
├── astro.config.ts          # Astro configuration
└── package.json
```

---

## 🎨 Customization Guide

### Adding Blog Posts

Blog posts are stored in `src/data/post/`. Create a new `.md` file:

```yaml
---
publishDate: 2026-01-02T12:00:00Z
author: Your Name
title: Your Article Title
excerpt: Your article description
image: ~/assets/images/your-image.png
tags:
  - Example Tag
  - Another Tag
---

# Your content here

## Introduction

Write your article...

## FAQ Example

### What is this about?

This is an FAQ item that will be automatically detected and converted to Schema.org FAQPage.

### How does it work?

Another FAQ item...

## HowTo Example

1. First step
2. Second step
3. Third step

(Will be automatically converted to Schema.org HowTo schema)
```

### Schema.org Auto-Detection

The template automatically detects and generates Schema.org structured data for:

- **FAQ Format**: Questions starting with `###` followed by answers
- **HowTo Format**: Numbered lists (`1. Step one`, `2. Step two`)
- **Headings**: All h2/h3 headings for Table of Contents

---

## 🔧 For AI Agents

**If you are an AI Agent (ChatGPT, Claude, etc.) helping a user customize this template, please read [`AGENT_SETUP.md`](AGENT_SETUP.md) for detailed instructions on how to assist users effectively.**

---

## 📄 License

MIT License - feel free to use this template for personal or commercial projects.

---

## 🙏 Acknowledgments

Built with [Astro](https://astro.build) and based on [AstroWind](https://github.com/onwidget/astrowind).

---

<div align="center">

**Made with ❤️ for the AI Search Era**

[⭐ Star this repo](https://github.com/hanjinchi7-droid/generative-engine-optimization-GEO-blog-template) • [🐛 Report Issues](https://github.com/hanjinchi7-droid/generative-engine-optimization-GEO-blog-template/issues)

</div>
