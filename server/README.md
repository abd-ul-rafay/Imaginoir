# 🛠 Imaginoir Server

Backend server for Imaginoir, built with **Express**, **MongoDB**, and **Stripe**. Handles authentication, image processing, payments, and more.

## 🔌 API Routes Overview

All endpoints are prefixed with `/api/v1`

---

### 🧾 Auth Routes (`/auth`)

| Method | Path        | Description         |
|--------|-------------|---------------------|
| POST   | `/login`    | Login user          |
| POST   | `/register` | Register user       |
| POST   | `/google`   | Google sign-in      |

---

### 👤 User Routes (`/users`) (Requires Auth)

| Method | Path     | Description          |
|--------|----------|----------------------|
| GET    | `/me`    | Get current user     |

---

### 🖼️ Image Routes (`/images`) (Requires Auth)

| Method | Path       | Description                   |
|--------|------------|-------------------------------|
| GET    | `/`        | Get public shared images      |
| GET    | `/mine`    | Get user's own images         |
| POST   | `/`        | Generate and upload image     |
| PATCH  | `/:id`     | Update image details          |
| DELETE | `/:id`     | Delete user image             |

---

### 💳 Payment Routes (`/payment`) (Requires Auth)

| Method | Path         | Description                      |
|--------|--------------|----------------------------------|
| POST   | `/session`   | Create Stripe Checkout Session   |

---

### 📡 Webhook Routes (`/webhooks`)

| Method | Path          | Description                       |
|--------|---------------|-----------------------------------|
| POST   | `/payment`    | Stripe webhook handler (raw body) |

---

## 🧱 Stack

- Express 5
- MongoDB & Mongoose
- Stripe API & Webhooks
- JWT Authentication
- Google Auth Library
- Cloudinary (image storage)
- ClipDrop API (AI image generation)
