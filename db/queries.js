import dotenv from 'dotenv'
import pool from './pool.js'

dotenv.config()

class Queries {
  static async listAllInsights(req, res) {
    const client = await pool.connect()

    try {

      const result = await client.query('SELECT * FROM insights')
      res.json(result.rows)

    } catch (error) {
      console.log(error)
    } finally {
      client.release()
    }
    res.status(404)
  }
}

export default Queries
