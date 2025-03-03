# Event Booking Microservices

This project implements an **Event Booking Platform** using a **microservices architecture**. The system consists of three core services:

1. **Event Service** (Manages events and ticket availability)
2. **Booking Service** (Handles event bookings and payments)
3. **Notification Service** (Sends booking confirmations via email)

## 🏗 Architecture Overview

- **Synchronous Communication**: REST API (Booking Service <-> Event Service)
- **Asynchronous Communication**: RabbitMQ (Booking Service -> Notification Service)
- **Databases**: PostgreSQL for bookings, MongoDB for events
- **Containerization**: Docker (future implementation)

---

## 🚀 Services

### 1️⃣ Event Service

Manages events and available tickets.

#### Endpoints:

- `GET /events` → Retrieve all events
- `GET /events/{event_id}/availability` → Check ticket availability
- `POST /events` → Create a new event
- `PATCH /events/{event_id}` → Update available tickets

#### Tech Stack:

- Node.js + Express.js
- MongoDB + Mongoose

---

### 2️⃣ Booking Service

Handles event bookings and ticket reservations.

#### Endpoints:

- `POST /bookings` → Create a booking (checks event availability)
- `GET /bookings/{booking_id}` → Retrieve a booking
- `GET /bookings` → List all bookings

#### Functionality:

- Checks event availability before booking (via Event Service API)
- Publishes booking confirmations to RabbitMQ

#### Tech Stack:

- Node.js + Express.js
- PostgreSQL (pg library)
- RabbitMQ (amqplib for message queue)

---

### 3️⃣ Notification Service

Consumes messages from RabbitMQ and sends email notifications.

#### Functionality:

- Listens for booking confirmation messages from RabbitMQ
- Sends an email to the user

#### Tech Stack:

- Node.js + Express.js
- Nodemailer (for email notifications)
- RabbitMQ

---

## 🔧 Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- PostgreSQL (with a `bookings` database)
- RabbitMQ (for async messaging)

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-repo/event-booking-microservices.git
   cd event-booking-microservices
   ```

2. **Install dependencies**

   ```sh
   npm install  # Run this in each service directory
   ```

3. **Configure environment variables** Create a `.env` file in each service with necessary credentials:

   ```sh
   # Booking Service
   PORT=5003
   POSTGRES_URI=your_postgres_connection_string
   RABBITMQ_URL=amqp://localhost
   ```

   ```sh
   # Event Service
   PORT=5002
   MONGO_URI=your_mongodb_connection_string
   ```

   ```sh
   # Notification Service
   PORT=5004
   RABBITMQ_URL=amqp://localhost
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Run services** Start each service in separate terminals:

   ```sh
   # Start Event Service
   cd event-service && npm start

   # Start Booking Service
   cd booking-service && npm start

   # Start Notification Service
   cd notification-service && npm start
   ```

5. **Test APIs using Postman**

   - Use **Postman** or **cURL** to test endpoints.
   - Example request:
     ```sh
     curl -X GET http://localhost:5002/events
     ```

---

## 📬 Message Queue Flow (RabbitMQ)

1. **Booking Service** publishes a message to `booking_notifications` queue after successful booking.
2. **Notification Service** consumes the message and sends an email.

Example message format:

```json
{
  "booking_id": "12345",
  "user_email": "user@example.com",
  "status": "CONFIRMED"
}
```

---

## 📌 Future Enhancements

- Dockerization for deployment
- Payment gateway integration
- Kubernetes orchestration

---




