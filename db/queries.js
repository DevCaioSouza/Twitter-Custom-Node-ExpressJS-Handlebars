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

  static async postInsight(req, res){

    const client = await pool.connect()

    //important: UserId value is req.session.userid in production mode
    const insight = {
      title: req.body.title,
      UserId: req.body.userid,
    }

    try {
      const result = await client.query(
        `INSERT INTO "insights" ("id","title","createdAt","updatedAt","UserId") VALUES (DEFAULT, '${insight.title}', DEFAULT, DEFAULT, '${insight.UserId}') RETURNING "id","title","createdAt","updatedAt","UserId"`
      )

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
