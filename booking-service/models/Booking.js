const pool = require("../config/db");

class Booking {
  static async create(userId, eventId, status) {
    const query = "INSERT INTO bookings (user_id, event_id, status) VALUES ($1, $2, $3) RETURNING *";
    const values = [userId, eventId, status];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM bookings");
    return result.rows;
  }
}

module.exports = Booking;
