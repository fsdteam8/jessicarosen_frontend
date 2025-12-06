# Lawbie - The Legal Marketplace for Lawyers

## 📋 Project Overview

**Lawbie** is a robust, enterprise-grade e-commerce and resource management platform built with modern web technologies. This application serves as a comprehensive solution for managing digital products, resources, and customer interactions. It features a sophisticated dashboard for analytics, a seamless shopping experience, and a powerful content management system.

**🌐 Live Website:** [https://lawbie.com/](https://lawbie.com/)

The application is designed with a mobile-first approach, ensuring a consistent and engaging user experience across all devices. It leverages server-side rendering (SSR) for optimal performance and SEO.

## 🚀 Tech Stack

This project utilizes a cutting-edge technology stack to ensure scalability, performance, and maintainability.

### Core Framework

- **[Next.js 14](https://nextjs.org/)**: The React framework for the web, utilizing the App Router for efficient routing and layouts.
- **[TypeScript](https://www.typescriptlang.org/)**: Adds static typing to JavaScript for better developer experience and code quality.

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible components for building high-quality design systems.
- **[Framer Motion](https://www.framer.com/motion/)**: A production-ready motion library for React.
- **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icons.
- **[Shadcn UI](https://ui.shadcn.com/)**: Re-usable components built using Radix UI and Tailwind CSS.

### State Management

- **[Redux Toolkit](https://redux-toolkit.js.org/)**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **[Zustand](https://github.com/pmndrs/zustand)**: A small, fast and scalable bearbones state-management solution.

### Data Fetching & Forms

- **[TanStack Query (React Query)](https://tanstack.com/query/latest)**: Powerful asynchronous state management for TS/JS.
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible and extensible forms with easy validation.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.

### Additional Tools

- **Recharts**: Redefined chart library built with React and D3.
- **React Quill**: A Quill component for React (Rich Text Editor).
- **Socket.io-client**: Real-time bidirectional event-based communication.

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Lawbie
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory. Use the following template (replace with your actual values):

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Authentication (if applicable)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Other Service Keys (Example)
# NEXT_PUBLIC_STRIPE_KEY=pk_test_...
```

> **Note:** Never commit your `.env.local` file to version control.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Architecture & Folder Structure

The project follows the Next.js App Router structure:

```
Lawbie/
├── app/                    # App Router directories
│   ├── (auth)/             # Authentication routes (login, signup)
│   ├── (dashboard)/        # Protected dashboard routes
│   ├── (website)/          # Public website routes
│   ├── api/                # API routes (if any)
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn UI components
│   ├── shared/             # Shared components (Header, Footer)
│   └── ...                 # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and libraries
├── public/                 # Static assets (images, fonts)
├── redux/                  # Redux store and slices
├── types/                  # TypeScript type definitions
└── ...config files
```

## ✨ Key Features

### 🛒 E-commerce Platform

- **Product Browsing & Filtering**

  - **Detail**: Advanced filtering options allow users to search by category, price range, and popularity. Includes a responsive grid layout with lazy loading for optimal performance.
  - **Impact**: Enhances user experience by reducing search time and increasing conversion rates through easy product discovery.

- **Persistent Shopping Cart**

  - **Detail**: Real-time cart management powered by Redux Toolkit, persisting state across sessions. Supports instant quantity updates and item removal without page reloads.
  - **Impact**: Reduces cart abandonment by providing a seamless and reliable shopping experience that remembers user choices.

- **Secure Checkout Flow**
  - **Detail**: A multi-step, secure checkout process integrated with robust form validation. Ensures data integrity and provides clear feedback at every stage.
  - **Impact**: Builds user trust and ensures secure transaction processing, critical for enterprise-grade applications.

### 📊 Admin Dashboard

- **Real-time Analytics Overview**

  - **Detail**: Interactive charts and graphs powered by Recharts to visualize sales trends, revenue, and active user data in real-time.
  - **Impact**: Empowers stakeholders with actionable insights to make data-driven business decisions instantly.

- **Comprehensive Product Management**

  - **Detail**: Full CRUD capabilities for products, including image uploads, inventory tracking, and categorization.
  - **Impact**: Streamlines inventory operations, reducing administrative overhead and ensuring accurate product availability.

- **Resource & Content Management**

  - **Detail**: A centralized hub to manage downloadable resources (PDFs, guides) and blog content. Features a rich text editor for formatting.
  - **Impact**: Facilitates efficient content marketing and resource distribution, keeping the platform dynamic and valuable to users.

- **User & Customer Management**
  - **Detail**: Administrative view of all registered users, purchase history, and account statuses.
  - **Impact**: Improves customer support and relationship management by providing a 360-degree view of user activities.

### 📝 Content Management System (CMS)

- **Rich Text Editing (React Quill)**

  - **Detail**: Integrated WYSIWYG editor allowing admins to create beautifully formatted content with headers, lists, and links.
  - **Impact**: Removes the need for technical knowledge to publish content, accelerating marketing campaigns and updates.

- **Media Handling & Optimization**
  - **Detail**: Efficient upload handling for images and documents, ensuring assets are optimized for fast loading.
  - **Impact**: Maintains high site performance and SEO scores while delivering high-quality visual content.

### 🔐 Authentication & Security

- **Role-Based Access Control (RBAC)**

  - **Detail**: Secure authentication flows distinguishing between regular users and administrators. Protected routes ensure sensitive areas are inaccessible to unauthorized users.
  - **Impact**: Protects sensitive business data and ensures compliance with security best practices.

- **Robust Form Validation**
  - **Detail**: Implements Zod schemas with React Hook Form to validate all user inputs on the client side before submission.
  - **Impact**: Prevents data corruption and enhances security by blocking malicious or malformed inputs at the source.

## 🚀 Deployment

The application is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Import the project into Vercel.
3. Configure the **Environment Variables** in the Vercel dashboard settings.
4. Click **Deploy**.

For other hosting providers, build the application using:

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

**© 2025 Lawbie. All rights reserved.**
