# 🍽️ PlateForm

> A platform connecting restaurants with the customers who dine at them — built as a hands-on learning project to go from a Figma design to a working full-stack app.

**PlateForm** gives restaurant owners a dashboard to manage their menu, staff, orders, and table bookings, and gives customers a way to discover restaurants, browse menus, place orders, and book tables. It was built step by step, as a study project, to learn React, Express, and MongoDB from the ground up.

---

## 📖 Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Roles](#2-user-roles)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Data Models](#5-data-models)
6. [API Reference](#6-api-reference)
7. [Frontend Pages](#7-frontend-pages)
8. [Getting Started](#8-getting-started)
9. [Environment Variables](#9-environment-variables)
10. [Authentication](#10-authentication)
11. [Email Verification & Password Reset](#11-email-verification--password-reset)
12. [Design System](#12-design-system)
13. [Coding Conventions](#13-coding-conventions)
14. [Known Limitations](#14-known-limitations)
15. [License](#15-license)

---

## 1. Project Overview

PlateForm is **not** a food-delivery app — it's a platform for restaurant discovery, menu browsing, table booking, and in-house order management. A restaurant owner signs up, sets up their restaurant profile through a 5-step onboarding flow, and gets a dashboard to manage their menu, staff, orders, and table bookings. A customer signs up, browses restaurants, views menus, places orders, and books tables.

**Goals for v1.0:**
- Clean, simple UX over feature overload
- A real, working full-stack connection — not just a UI mockup
- Honest scope: v1 deliberately excludes payments, AI features, a loyalty system, inventory tracking, and advanced analytics

---

## 2. User Roles

| Role | Description |
|------|-------------|
| `restaurant` | A restaurant owner — manages their restaurant profile, menu, staff, orders, and table bookings |
| `customer` | An end user — discovers restaurants, browses menus, places orders, books tables |

Both roles live in a single `User` model distinguished by a `role` field — there is no separate admin or staff login. Staff members shown in the Restaurant dashboard are records the owner manages; they don't have their own accounts.

---

## 3. Tech Stack

### Backend
| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM — schemas and queries |
| `dotenv` | Load environment variables from `.env.development` |
| `bcryptjs` | Hash and compare passwords |
| `jsonwebtoken` | Create and verify JWT tokens for auth |
| `nodemailer` | Send verification and password-reset emails via Gmail |
| `cors` | Cross-origin requests from the frontend |
| `nodemon` | Auto-restart server during development |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` | Component-based UI framework |
| `vite` | Dev server and build tool |
| `react-router-dom` | Client-side routing |
| `tailwindcss` (v4) | Utility-first styling |
| `lucide-react` | Icon library |
| `recharts` | Dashboard revenue/staff charts |

No form library, state management library, or HTTP client is used — forms use plain `useState`, API calls use a small `fetch` wrapper, and shared state (the logged-in user) uses React Context.

---

## 4. Project Structure

```
Plateform2/
│
├── Backend/
│   ├── config/
│   │   └── env.js                 # Loads .env.development, exports named variables
│   ├── database/
│   │   └── mongodb.js             # Mongoose connection
│   ├── controllers/
│   │   ├── auth.controller.js     # signUp, signIn, signOut, verifyEmail,
│   │   │                          # resendVerificationCode, forgotPassword, resetPassword
│   │   ├── user.controller.js     # getUsers, getUser
│   │   ├── restaurant.controller.js
│   │   ├── menuItem.controller.js
│   │   ├── table.controller.js
│   │   ├── booking.controller.js
│   │   ├── order.controller.js
│   │   └── staff.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT verification, attaches req.user
│   │   └── error.middleware.js    # Centralized error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   ├── Table.js
│   │   ├── Booking.js
│   │   ├── Order.js
│   │   └── Staff.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── restaurant.routes.js
│   │   ├── menuItem.routes.js
│   │   ├── table.routes.js
│   │   ├── booking.routes.js
│   │   ├── order.routes.js
│   │   └── staff.routes.js
│   ├── utils/
│   │   ├── sendEmail.js           # Nodemailer wrapper
│   │   └── verifyRestaurantOwnership.js  # Shared ownership-check helper
│   ├── .env.development
│   └── app.js                     # Single combined entry point (app + server)
│
└── Frontend/
    └── src/
        ├── assets/images/         # Dish, people, and mockup photos
        ├── components/
        │   ├── auth/              # AuthLayout, OtpInput
        │   ├── restaurant/        # RestaurantSidebar, RestaurantDashboardLayout, StatCard, etc.
        │   ├── customer/          # CustomerSidebar, CustomerDashboardLayout
        │   ├── onboarding/        # OnboardingLayout
        │   └── ui/                # FormInput, Modal, LogoutConfirmModal
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── Restaurant-side/
        │   │   ├── auth/          # Signup, Login, VerifyEmail, ResetPassword
        │   │   ├── onboarding/    # Step1RestaurantInfo ... Step5FirstMenu
        │   │   ├── Onboarding.jsx # Single-route wizard holding all step state
        │   │   ├── Dashboard.jsx
        │   │   ├── Menu.jsx
        │   │   ├── Staff.jsx
        │   │   ├── Orders.jsx
        │   │   ├── TableBooking.jsx
        │   │   └── Settings.jsx
        │   └── Customer-side/
        │       ├── auth/          # Signup, Login, VerifyEmail, ResetPassword
        │       ├── Restaurants.jsx
        │       ├── Menu.jsx
        │       ├── Orders.jsx
        │       ├── TableBooking.jsx
        │       └── Settings.jsx
        ├── context/
        │   └── AuthContext.jsx    # Global user/token state, persisted to localStorage
        ├── services/
        │   ├── api.js             # fetch wrapper, auto-attaches auth header
        │   └── authService.js     # registerUser, loginUser, verifyEmailCode,
        │                          # resendVerificationCode, forgotPassword, resetPassword
        ├── App.jsx                # All routes
        └── main.jsx                # Wraps <App /> in <AuthProvider>
```

---

## 5. Data Models

#### User
| Field | Type | Notes |
|-------|------|-------|
| `fullName` | String | Required |
| `email` | String | Required, unique, lowercase |
| `password` | String | bcrypt hash, `select: false` |
| `role` | String | `customer` \| `restaurant` |
| `isVerified` | Boolean | Default `false` |
| `verificationCode` / `verificationCodeExpiresAt` | String / Date | `select: false`, 10-minute expiry |
| `resetPasswordCode` / `resetPasswordCodeExpiresAt` | String / Date | `select: false`, separate from verification fields |

#### Restaurant
| Field | Type | Notes |
|-------|------|-------|
| `owner` | ObjectId → User | Required, unique (one restaurant per owner) |
| `name`, `description`, `cuisineType` | String | From Onboarding Step 1 |
| `logoUrl`, `coverImageUrl` | String | |
| `country`, `city`, `address`, `zipCode`, `mapLocation` | String | From Onboarding Step 2 |
| `hours` | Array of `{ day, open, close, isOpen }` | From Onboarding Step 3 |
| `phone`, `email`, `website` | String | |
| `services` | Array of String | e.g. `dine-in`, `delivery` — from Onboarding Step 4 |

#### MenuItem
| Field | Type | Notes |
|-------|------|-------|
| `restaurant` | ObjectId → Restaurant | Required |
| `category`, `name`, `price`, `description`, `imageUrl` | | `price` required, `name` required |
| `available` | Boolean | Default `true` |

A separate collection from `Restaurant` (not embedded), so the Menu page can do real CRUD, category filtering, and pagination.

#### Table
| Field | Type | Notes |
|-------|------|-------|
| `restaurant` | ObjectId → Restaurant | |
| `number`, `area` (`Indoor`\|`Outdoor`), `capacity` | | |
| `status` | String | `available`\|`booked`\|`occupied`\|`maintenance` — **manually set, not derived from bookings** |

#### Booking
| Field | Type | Notes |
|-------|------|-------|
| `restaurant` | ObjectId → Restaurant | |
| `customer` | ObjectId → User | |
| `table` | ObjectId → Table | Optional — unassigned until the restaurant accepts a request |
| `date`, `time` | String | Not combined into a `Date` object |
| `guests` | Number | |
| `status` | String | `Pending`\|`Confirmed`\|`Cancelled`\|`Completed` |
| `specialRequests` | String | |

#### Order
| Field | Type | Notes |
|-------|------|-------|
| `restaurant`, `customer` | ObjectId | |
| `items` | Array of `{ menuItem, name, price, quantity }` | Name/price are a **snapshot** at order time, not a live reference |
| `orderType` | String | `Dine In`\|`Takeaway`\|`Delivery` |
| `tableInfo`, `deliveryAddress`, `specialNote` | String | |
| `subtotal`, `serviceFee`, `deliveryFee`, `total` | Number | **Calculated server-side** from real `MenuItem` prices — never trusts client-sent prices |
| `status` | String | `Pending`\|`In Progress`\|`Ready`\|`Completed`\|`Cancelled` |

#### Staff
| Field | Type | Notes |
|-------|------|-------|
| `restaurant` | ObjectId → Restaurant | |
| `name`, `email`, `phone` | String | |
| `role` | String | `Manager`\|`Waitress`\|`Chef`\|`Bartender` |
| `status` | String | `Active`\|`On Leave` |
| `avatarUrl` | String | |

No link to `User` — staff don't log in; they're records the owner manages.

---

## 6. API Reference

Base URL: `http://localhost:3000/api`

#### Auth — `/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/signup` | Public | Register (customer or restaurant) |
| POST | `/signin` | Public | Login, returns JWT + user |
| POST | `/signout` | Public | Stateless — client discards the token |
| POST | `/verify-email` | Public | Verify a 6-digit email code |
| POST | `/resend-code` | Public | Resend a new verification code |
| POST | `/forgot-password` | Public | Email a 6-digit password-reset code |
| POST | `/reset-password` | Public | Verify the code and set a new password |

#### Users — `/users`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List all users (passwords excluded) |
| GET | `/:id` | Protected | Get one user |

#### Restaurants — `/restaurants`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List/search (`?search=`, `?city=`) |
| GET | `/:id` | Public | Get one restaurant |
| POST | `/` | Protected, role `restaurant` | Create a restaurant + initial menu items (one per owner) |

#### Menu Items — `/menu-items`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/restaurant/:restaurantId` | Public | List/filter by `?category=` |
| POST | `/` | Protected, owner only | Create |
| PUT | `/:id` | Protected, owner only | Update |
| DELETE | `/:id` | Protected, owner only | Delete |

#### Tables — `/tables`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/restaurant/:restaurantId` | Public | List tables |
| POST | `/` | Protected | Create a table |
| PUT | `/:id/status` | Protected | Update a table's status |

#### Bookings — `/bookings`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Protected | Create a booking |
| GET | `/restaurant/:restaurantId` | Protected | List a restaurant's bookings |
| GET | `/my-bookings` | Protected | List the logged-in customer's bookings |
| PUT | `/:id/status` | Protected | Update booking status |

#### Orders — `/orders`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Protected | Create an order (prices computed server-side) |
| GET | `/restaurant/:restaurantId` | Protected | List a restaurant's orders |
| GET | `/my-orders` | Protected | List the logged-in customer's orders |
| PATCH | `/:id/status` | Protected | Update order status |

#### Staff — `/staff`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Protected, owner only | Add a staff member |
| GET | `/restaurant/:restaurantId` | Protected, owner only | List staff |
| PUT | `/:id` | Protected, owner only | Update |
| DELETE | `/:id` | Protected, owner only | Remove |

---

## 7. Frontend Pages

### Shared
- **Landing Page** — marketing page, links to both signup flows

### Restaurant-side
- **Auth** — Signup, Login, Verify Email (6-digit code), Reset Password (request code → enter code + new password, same page)
- **Onboarding** — 5-step wizard (Restaurant Info → Location → Opening Hours → Services → First Menu Item), single route with lifted state
- **Dashboard** — stat cards, revenue chart, recent orders, table bookings, top selling items, staff overview, today's summary
- **Menu** — category tabs, dish grid, Add/Edit Dish modal
- **Staff** — stat cards, searchable table, Edit modal
- **Orders** — stat cards, order table with status tabs, click-to-expand detail panel, status stepper
- **Table Booking** — bookings table, color-coded indoor/outdoor table grid, pending-request accept/reject
- **Settings** — General Information + Business Hours (only implemented tab; the rest are visibly present but disabled, since no design exists for them)

### Customer-side
- **Auth** — same shape as Restaurant-side, different content
- **Restaurants** — search, filter tabs, nearby/top-rated restaurant cards
- **Menu** — a restaurant's dishes with an Add-to-cart stepper
- **Orders** — cart with live-calculated totals, order history
- **Table Booking** — date/time/guest picker, clickable table grid, reservation summary
- **Settings** — profile, account links, notification/2FA toggles, danger zone

---

## 8. Getting Started

### Prerequisites
- Node.js
- A MongoDB Atlas account and cluster
- A Gmail account with an App Password (for sending verification/reset emails)

### Backend
```bash
cd Backend
npm install
# Create .env.development — see Environment Variables below
npm run dev
```
Runs on `http://localhost:3000`

### Frontend
```bash
cd Frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

> **Note:** if MongoDB Atlas fails to connect, disconnect any active VPN first — VPNs have been the cause of connection failures during development of this project more than once.

---

## 9. Environment Variables

`Backend/.env.development`
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_generated_secret
JWT_EXPIRES_IN=1d
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

> Never commit `.env.development`. It's already in `.gitignore`.

---

## 10. Authentication

JWT-based. After login, the frontend stores `{ user, token }` in `localStorage` via `AuthContext`, and `api.js` automatically attaches it to every request:
```
Authorization: Bearer <token>
```

`auth.middleware.js` verifies the token and attaches the user to `req.user` for any protected route. A separate `verifyRestaurantOwnership` helper additionally checks that the logged-in user actually owns the restaurant they're trying to modify, on the Staff and MenuItem routes.

---

## 11. Email Verification & Password Reset

Both flows use the same pattern: a random 6-digit code, stored on the `User` document with a 10-minute expiry, emailed via Gmail/Nodemailer. The frontend's `OtpInput` component (auto-advancing, backspace-aware) is shared between Verify Email and the second step of Reset Password.

---

## 12. Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Forest Green | `#14532D` | Primary — buttons, headings, sidebar |
| Gold accent | `#D9A441` | Highlights, script-font accent words |
| Warm cream | `#FBF3EA` | Page background |

### Typography
- **Playfair Display** — headings
- **Inter** — body text
- A script font for accent words (e.g. "Together", "Beautiful")

### Patterns
- Cards: rounded corners, subtle borders, no heavy shadows
- Status badges: colored pills (green = good/active, amber = pending, red = cancelled)
- Sidebar: dark green (Restaurant) or white (Customer), icon + label nav, active route highlighted automatically via `useLocation()`

---

## 13. Coding Conventions

### Backend
- ES Modules (`import`/`export`) throughout — relative imports always include the `.js` extension
- Lowercase folder names (`controllers/`, `models/`, `middleware/`)
- Every controller function is a named export
- All errors go through `next(error)` to the centralized `error.middleware.js`

### Frontend
- PascalCase component files
- One component per file
- Tailwind utility classes only
- Shared layout components (`AuthLayout`, `RestaurantDashboardLayout`, `CustomerDashboardLayout`) hold structure; pages hold content

---

## 14. Known Limitations

Honest, current gaps — not bugs, deliberate scope decisions made while building:

- **No responsive/mobile support.** Every dashboard-style page uses a fixed desktop layout.
- **Onboarding doesn't submit yet.** The 5-step wizard collects data but "Finish Setup" doesn't call `POST /api/restaurants`.
- **Several dashboard pages still use mock data**, not live API calls: Dashboard, Menu, Staff, Orders, Table Booking, and Settings on both sides.
- **No shared cart.** The Customer Menu page's "Add to cart" and the Orders page's cart are separate, local-only state — adding a dish on Menu doesn't appear in Orders.
- **Restaurant/Customer "Popular" / "Top Rated" / "New" filters are unimplemented** — no rating or order-count data exists yet to sort by.
- **Table availability is manually set, not time-aware.** A table's status doesn't automatically change based on existing bookings for a given date/time.
- **Ownership checks are inconsistent.** `Staff` and `MenuItem` routes verify the logged-in user owns the restaurant being modified; `Table`, `Booking`, and `Order` routes currently only check that the user is logged in, not that they own the specific restaurant — a known gap to close before any real deployment.
- **CORS is wide open** (`cors()` with no restrictions) — fine for local development, needs tightening before deployment.

---

## 15. License

Personal learning project.