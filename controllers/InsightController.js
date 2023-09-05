const Insight = require('../models/insight')
const User = require('../models/user')

module.exports = class InsightController {
  static async showInsights(req, res){
    res.render('insights/home')
  }
}