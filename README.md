# Nu Hippies

A full-stack e-commerce web app — built solo, then revived in 2026 from a dead Heroku deployment and brought back to production.

**Live site:** [nu-hippies.onrender.com](https://nu-hippies.onrender.com)



## Overview

Nu Hippies is a React/Node e-commerce platform with full shopping-cart and checkout functionality, user accounts, and third-party integrations for payments, email, and mapping. Built independently starting in 2021, it was resuscitated in 2026: migrated off hardcoded secrets, updated for modern Node, and redeployed from Heroku to Render.

## Features

- Product browsing and search
- Product detail pages
- Shopping cart and checkout, powered by Stripe
- User registration and login (JWT-based auth)
- Password reset flow
- Contact form
- Store/location lookup via Mapbox
- Responsive layout

## Tech Stack

**Frontend:** React (Create React App), Sass
**Backend:** Node.js, Express
**Database:** MongoDB Atlas (Mongoose)
**Auth:** JWT, environment-based secret management
**Integrations:** Stripe (payments), Mailgun (transactional email), Mapbox (maps)
**Hosting:** Render

## Revival Notes

This project was originally deployed on Heroku and went dormant. Bringing it back to production involved:

- Replacing a hardcoded JWT secret with environment-variable-based configuration
- Rotating and re-scoping a compromised Mapbox token
- Resolving several frontend dependency conflicts (postcss, babel/core, sass) after upgrading Node
- Setting up a fresh MongoDB Atlas cluster and reconnecting the API
- Rebuilding `.gitignore` and cleaning tracked build artifacts out of git history
- Redeploying to Render with all secrets stored as environment variables

## Getting Started

```bash
git clone <repo-url>
cd nu-hippies

# Backend
cd server
yarn install

# Frontend
cd ../client
yarn install
```

Create a `.env` file in the backend with:

```
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
MAILGUN_APIKEY=
RESET_PASSWORD_KEY=
```

And in the frontend:

```
REACT_APP_MAPBOX_TOKEN=
```

Run both the client and server dev servers, then visit `localhost:3000`.

## Author

Jakub Horun — [jakubhorun.com](https://jakubhorun.com)
