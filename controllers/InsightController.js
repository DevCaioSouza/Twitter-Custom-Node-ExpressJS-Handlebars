const Insight = require('../models/insight');
const User = require('../models/User');

module.exports = class InsightController {
  static async showInsights(req, res) {
    res.render('insights/home'); // 'insights' comes from dir views/insights
  }

  static async dashboard(req, res) {
    res.render('insights/dashboard');
  }

  static async createInsight(req, res) {
    res.render('insights/create');
  }

  static async insightPost(req, res) {
    // const { title } = req.body;

    const insight = {
      title: req.body.title,
      UserId: req.session.userid
    };

    try {
      await Insight.create(insight);

      req.flash('message', 'Insight created successfully');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }
};
