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

  static async postInsight(req, res) {
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

  static async deleteInsight(req, res) {
    const client = await pool.connect()
    const insightId = req.body.id
    const userId = req.body.userid //evidente que mudaremos pra session

    // query sugerida: DELETE FROM insights WHERE id = :insightid AND "UserId" = :userid
    try {
      const result = await client.query(`DELETE FROM "insights" WHERE "insights"."id" = '${insightId}' AND "insights"."UserId" = '${userId}'`)

      res.json(result.rows)
    } catch (error) {
      console.log(error)
    } finally {
      client.release()
    }
  }
}

export default Queries
