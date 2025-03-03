const amqp = require("amqplib");

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    console.log("✅ RabbitMQ Connected");

    // Create a queue for booking notifications
    const queue = "booking_notifications";
    await channel.assertQueue(queue, { durable: true });

    module.exports = { channel };
  } catch (error) {
    console.error("❌ RabbitMQ Connection Failed", error);
  }
}

module.exports = connectRabbitMQ;
