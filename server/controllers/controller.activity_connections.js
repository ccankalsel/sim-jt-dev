const pool = require('../config/db.js');

module.exports = {

  async createConnection(req, res) {
    try {
      const result = await pool.query(`INSERT INTO activity_connections (activity_id, activity_next_id, activity_alternate_id, activity_back_id)
        VALUES (${req.body.activity_id}, ${req.body.activity_next_id}, ${req.body.activity_alt_id}, ${req.body.activity_back_id})`);
      res.json({success: true, results: result});
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async deleteConnection(req, res) {
    try {
      const result = await pool.query(`DELETE FROM activity_connections WHERE activity_connections_id = ${req.params.activityConnId}`);
      res.json({
        success: true,
        results: result
      })
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong'
      });
    }
  }, 

  async getNextStep(req, res) {
    try {
      const option_value = req.params.optionValue;
      const query = ``;
      if (option_value === 1) {
        query += `SELECT activity_next_id FROM activity_connections WHERE activity_id = ${req.params.activityId}`;
      } else if (option_value === 2) {
        query += `SELECT activity_alternate_id FROM activity_connections WHERE activity_id = ${req.params.activityId}`;
      } else if (option_value === 3) {
        query += `SELECT activity_back_id FROM activity_connections WHERE activity_id = ${req.params.activityId}`;
      }
      const result = await pool.query(query);
      res.json({ result });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }

}