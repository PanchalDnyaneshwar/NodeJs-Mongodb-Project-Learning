# 🚀 Full Stack API with Node.js, Express.js, MongoDB, and TypeScript

This project is a backend API built with **Node.js**, **Express.js**, **MongoDB**, and **TypeScript**. It includes essential features like RESTful routing, CRUD operations, environment configuration, and proper folder structure for scalable applications.

---

## 📚 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node.js
- **MongoDB** – NoSQL database
- **TypeScript** – Typed superset of JavaScript
- **Mongoose** – ODM for MongoDB
- **Dotenv** – Environment variable management
- **Nodemon** – Auto-reloading during development
- **ESLint + Prettier** – Code quality and formatting

---

## 📂 Folder Structure

project-root/
│
├── src/
│ ├──  # Route logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ ├── config/ # DB and app config
│ ├── middlewares
│ └── index.js # Entry point
│
├── dist/ # Compiled JS (ignored in git)
├── .env # Environment variables (ignored)
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md

---

## 🧠 What I Learned

- How to set up a scalable backend project using TypeScript.
- Using **Express.js** for handling routes and middleware.
- Connecting and working with **MongoDB** via **Mongoose**.
- Structuring a Node.js app with MVC principles.
- CRUD operations with RESTful APIs.
- Using environment variables securely with `.env`.
- Running and debugging a TypeScript-based Node.js project.
- Git and GitHub workflow for version control and collaboration.

---
🌐 API Endpoints 

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/items      | Get all items     |
| POST   | /api/items      | Add a new item    |
| GET    | /api/items/\:id | Get item by ID    |
| PUT    | /api/items/\:id | Update item by ID |
| DELETE | /api/items/\:id | Delete item by ID |

🤝 Contributions
This project is part of my learning journey. Contributions, suggestions, and improvements are welcome!

