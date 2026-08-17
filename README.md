# Portfolio - Angular 21

This repository contains my personal developer portfolio, built with **Angular 21** using modern architecture practices (Standalone Components, signals, lazy-loading) and **Angular Server-Side Rendering (SSR)**.

## 🚀 Key Features

- **Angular 21 & SSR**: Configured with unified `provideServerRendering` and hybrid prerendering, boosting page loading speeds and SEO performance.
- **Dynamic Theme System**: Toggleable light/dark modes using an Angular `ThemeService` injected directly into the root context.
- **Optimized Scroll-Animations**: Uses dynamic, browser-only client loading of `ScrollReveal` (`import('scrollreveal')`) to prevent server-side rendering crashes and create separate lazy-loaded chunks for performance.
- **Form UX**: Reactive forms in the contact page featuring full validation and simulated network submissions.
- **Security Audited**: Verified using **Snyk** (`Tested 89 dependencies for known issues, no vulnerable paths found`) and hardened by removing external CDN scripts and implementing package-level dependency overrides (`uuid` and `webpack-dev-server`).
- **Unit Tested**: Custom tests verifying component instantiation.

---

## 🛠️ Tech Stack

- **Core**: [Angular 21](https://angular.dev/), TypeScript, RxJS
- **SSR/Server**: Express, `@angular/ssr`
- **Animations**: ScrollReveal (lazy-loaded)
- **Styling**: Vanilla CSS (Tailwind-free custom glassmorphic UI)
- **Security Check**: Snyk Security & `npm audit`
- **Test Runner**: Karma, Jasmine

---

## 🏃 Local Development

### 1. Dev Server
To start the local development server in watch mode:
```bash
npm start
```
Go to `http://localhost:4200/` to preview.

### 2. Production Build & Server (SSR)
To compile the application, prerender static routes, and run the server locally:
```bash
# Build the application
npm run build

# Run the local server (SSR)
npm run serve:ssr:PortfolioAng
```

### 3. Running Unit Tests
To run unit tests in a headless browser session:
```bash
npm test
```

### 4. Running Security Audits
Ensure you are logged in to Snyk (`snyk auth`), and run:
```bash
snyk test
```
Or run the default npm package audit:
```bash
npm audit
```

