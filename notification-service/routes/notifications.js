const express = require("express");
const nodemailer = require("nodemailer");
const amqp = require("amqplib");

const router = express.Router();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// RabbitMQ Connection
async function consumeNotifications() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("notifications");

    console.log("✅ Waiting for messages in queue: notifications");

    channel.consume("notifications", async (msg) => {
      const { email, subject, message } = JSON.parse(msg.content.toString());
      console.log(`📩 Sending email to: ${email}`);

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
      });

      console.log(`✅ Email sent to: ${email}`);
      channel.ack(msg);
    });
  } catch (err) {
    console.error("❌ RabbitMQ Error:", err);
  }
}

consumeNotifications();

module.exports = router;
