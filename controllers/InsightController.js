const Insight = require('../models/insight')
const User = require('../models/User')

module.exports = class InsightController {
  static async showInsights(req, res){
    res.render('insights/home') // 'insights' comes from dir views/insights
  }

  static async dashboard(req, res){
    res.render('insights/dashboard')
  }
}