const amqp = require("amqplib");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function consumeQueue() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        const queue = "booking_notifications";

        await channel.assertQueue(queue, { durable: true });

        console.log("📥 Waiting for messages in queue...");

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                console.log("📩 Received message:", data);

                await sendEmail(data.user_email, data.booking_id);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("❌ RabbitMQ Consumer Error:", error);
    }
}

async function sendEmail(to, bookingId) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Booking Confirmation",
        text: `Your booking (ID: ${bookingId}) has been confirmed! 🎟️`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Email Sending Failed:", error);
    }
}

consumeQueue();
