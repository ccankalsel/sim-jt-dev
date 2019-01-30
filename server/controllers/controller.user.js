const pool = require('../config/db.js');
const encryption = require('../utilities/util.encryption.js');
const jwt = require('jsonwebtoken');

module.exports = {

  // create forgot password function
  async addnewUser(req, res) {
    try {
      const result = await pool.query(`INSERT INTO users (username, password, role_id, user_description)
        VALUES ('${req.body.username}', '${encryption.encrypt(req.body.password)}', ${req.body.role_id}, '${req.body.user_description}')`);
      return res.json({
        success: true, 
        results: result,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async deleteUser(req, res) {
    try {
      const result = await pool.query(`DELETE FROM users WHERE user_id = '${req.params.userId}'`);
      return res.json({
        success: true, 
        results: result
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async selectUser(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE 
        user_id = ${req.params.userId} OR username = '${req.body.username}'`);
      if (result.length > 0) {
        return res.json({
          success: true, 
          results: result 
        });
      } else {
        return res.json({
          success: false, 
          results: 'No user found' 
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async authenticateUser(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`);
      if (result.length < 1) {
        res.json({
          success: false, 
          result: 'auth failed'
        });
      } else {
        if (encryption.decrypt(result[0].password) !== req.body.password) {
          res.json({
            success: false, 
            result: 'auth failed'
          });
        } else {
          // save secret-code on environment variable
          const payload = result[0] ;
          const token = jwt.sign({payload}, 'koderahasia', { expiresIn: '1d' });
          res.json({
            success: true, 
            result: token, 
            message: 'auth success', 
            user_role: result[0].role_id
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      })
    }
  }

}