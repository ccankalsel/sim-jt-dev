const pool = require('../config/db.js');

module.exports = {
  async getMitraOrderList(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM orders o RIGHT JOIN order_vendor_history ov
      ON ov.order_id = o.order_id INNER JOIN users u ON u.user_id = ov.vendor_id`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong',
      });
    }
  }
}