# FinanceFlow — Personal Finance & Expense Intelligence Dashboard

![React](https://img.shields.io/badge/React-18.3-blue.svg?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6.svg?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_v3-38B2AC.svg?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)

**FinanceFlow** is a modern, responsive personal finance intelligence and expense management dashboard built with **React**, **TypeScript**, and **Tailwind CSS**. It provides comprehensive real-time financial telemetry, cash-flow analytics, budget threshold alerts, multi-currency conversion, and spreadsheet data export.

---

## 🌟 Key Features

### 1. Financial Overview & Real-Time KPIs
- **Net Cash Position**: Real-time liquid capital calculation ($Total Inflows - Total Outflows$).
- **Total Inflow & Outflow**: Automated aggregation of revenue and operating costs with period-over-period trend analysis.
- **Savings Rate Percentage**: Dynamic calculation of income retained for wealth creation.

### 2. Interactive Visual Analytics (No Heavy External Dependencies)
- **Category Inflow/Outflow Breakdown**: Proportional expense breakdown by category with percentage distribution and progress curves.
- **6-Month Cash Flow Velocity**: Interactive pure-SVG trend analysis comparing monthly earnings against expenditures.

### 3. Transaction Management Engine
- **Full CRUD Support**: Add, view, filter, sort, and delete financial entries with modal validation.
- **Deep Search & Multi-Criteria Filtering**: Filter by transaction type (Income vs Expense), category, payment method, or title keywords.
- **Dynamic Sorting**: Sort by date (asc/desc) or monetary amount (highest/lowest).
- **One-Click CSV Export**: Instant generation and download of formatted `.csv` spreadsheets (`financeflow_transactions_YYYY-MM-DD.csv`).

### 4. Smart Budgeting & Alerts
- **Category Limit Allocation**: Set monthly spending limits per category (Housing, Groceries, Utilities, Entertainment, etc.).
- **Threshold Warnings**: Dynamic color-coded alerts (Green `<80%`, Amber `80-100%`, Red `Over Budget`).
- **Inline Limit Editing**: Instant adjustment of budgetary limits.

### 5. Savings Goals & Capital Reserves
- **Milestone Tracking**: Define financial milestones (Emergency Fund, Hardware Upgrades, Investment Funds).
- **Target Progress Rings**: Visual completion percentage and remaining capital required.
- **Direct Capital Deposits**: Deposit simulation modal adding liquidity directly to active goals.

### 6. Multi-Currency Engine
- Instant live currency switching between:
  - **USD ($)** — US Dollar
  - **PKR (₨)** — Pakistani Rupee
  - **GBP (£)** — British Pound
  - **EUR (€)** — Euro
  - **AED (AED)** — UAE Dirham
  - **SAR (SAR)** — Saudi Riyal

### 7. UX & Enterprise Features
- **Theme Switcher**: Instant persistent Dark / Light mode toggle.
- **Local Persistence**: Full state synchronization with browser `localStorage`.
- **Zero-Bloat Design**: High-performance architecture leveraging native SVG and modern React state hooks.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18 with TypeScript
- **Build Tool**: Vite 6.0
- **Styling**: Tailwind CSS v3 with custom modern palette
- **Typography**: Plus Jakarta Sans (Google Fonts)
- **Data Layer**: Typed TypeScript models with local persistence

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hadayatullahkhattak89-boop/financeflow.git

# Navigate into the project directory
cd financeflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be live at `http://localhost:5174`.

### Building for Production

```bash
npm run build
```

---

## 👨‍💻 Author

**Hadayat Ullah**
- **GitHub**: [@hadayatullahkhattak89-boop](https://github.com/hadayatullahkhattak89-boop)
- **Portfolio**: [ApexCraft Studio](https://apexcrafthub.netlify.app)
- **Email**: hadayatullahkhattak89@gmail.com
