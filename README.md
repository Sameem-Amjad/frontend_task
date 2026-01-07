
```markdown
# Secure Content Management Workspace - Frontend

This is the client-side application for the **Content Management Workspace**. It is a responsive Single Page Application (SPA) built with React and Vite, featuring a robust Redux state management system and dynamic UI adaptation based on user roles.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [Setup & Run Instructions](#-setup--run-instructions)
- [State Management](#-state-management)

## 🛠️ Tech Stack

* **Framework:** React (Vite)
* **State Management:** Redux Toolkit (Slices & Async Thunks)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios (with Interceptors)
* **Routing:** React Router DOM (Lazy Loading)
* **Rich Text Editor:** React Quill
* **Icons:** Lucide React

## 🏗️ Architecture

The frontend uses a **Feature-Based Folder Structure** combined with centralized logic for API communication.

```text
src/
├── redux/
│   └── feature/       # Redux Slices & Async Thunks (Auth, Articles)
├── utils/             # Utilities (Axios Instance, Formatters)
├── components/        
│   ├── PrivateRoute/  # Route Protection Wrapper (RBAC)
│   └── ui/            # Reusable UI components
├── Pages/             # Page views (Lazy Loaded)
└── layouts/           # Layout wrappers

```

### 🧠 The Core Engine: Axios Interceptors

Located in `src/utils/axiosInstance.js`, this is the heart of the application's security flow:

1. **Request Interceptor:** Automatically attaches the `Authorization: Bearer <token>` header to every outgoing request.
2. **Response Interceptor:** Listens for `401 Unauthorized` errors. If detected, it automatically:
* Pauses the failed request.
* Calls the refresh token endpoint.
* Updates the local access token.
* Retries the original request transparently.



## 🛡️ Key Features

### 1. Role-Based UI (RBAC)

The interface adapts dynamically based on the logged-in user's role (**ADMIN**, **EDITOR**, **VIEWER**).

* **Route Protection:** The `PrivateRoute` component blocks unauthorized access to `/create` or `/edit` pages.
* **Conditional Rendering:**
* **Edit Button:** Visible only to Admins or the Author of the article.
* **Delete Button:** Visible only to Admins.
* **Create Button:** Hidden for Viewers.



### 2. Rich Text Editing

Integrated **React Quill** for a full WYSIWYG editing experience, allowing users to format article content easily.

## 🚀 Setup & Run Instructions

### 1. Prerequisites

* **Node.js** (v18+)
* **Backend API** running (Default: `http://localhost:3000`)

### 2. Installation

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install

```

### 3. Configuration

The API URL is configured in `src/utils/axiosInstance.js`.

```javascript
const BASE_URL = 'http://localhost:3000/api/v1';

```

If your backend runs on a different port/host, update this variable.

### 4. Start Development Server

```bash
npm run dev

```

Open your browser at `http://localhost:5173`.

## 📦 State Management

We use **Redux Toolkit** to manage global application state:

* **Auth Slice:**
* Manages the `user` object (ID, Role, Email).
* Tracks `isAuthenticated` status.
* Handles Login/Register loading states and error messages.


* **Article Slice:**
* Manages the list of `articles`.
* Handles CRUD operations (Create, Update, Delete) and synchronizes with the backend.


*Developed for the Bxtrack Interview Assessment.*

```

```
