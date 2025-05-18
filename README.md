
# Fullstack Chat App

A MERN-based real-time chat application using Socket.IO.

---

## Features

- Real-time messaging with Socket.IO
- User authentication with JWT
- MongoDB for data storage
- Cloudinary for image uploads
- React frontend with Vite and Tailwind CSS
- Express backend with Node.js and Mongoose

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
- [Cloudinary](https://cloudinary.com/) account (for image hosting)

---

## Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5002
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


* `MONGODB_URI` — MongoDB connection string.
* `PORT` — Backend server port (default: 5002).
* `NODE_ENV` — Environment mode (`development` or `production`).
* `JWT_SECRET` — Secret key for JWT token signing.
* `CLOUDINARY_*` — Credentials for Cloudinary image hosting.


```
---

## Installation & Development

From the root directory, run:

```bash
npm run dev
```

This will:

* Install dependencies in the root, backend, and frontend folders.
* Start the backend and frontend development servers concurrently.

---
