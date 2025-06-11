const houseboatService = require('../services/houseboatService');

exports.showHouseboats = async (req, res) => {
  const houseboats = await houseboatService.getAllHouseboats();
  res.render('houseboats', { houseboats });
};

exports.createHouseboat = async (req, res) => {
  await houseboatService.addHouseboat(req.body);
  res.redirect('/houseboats');
};

exports.editHouseboat = async (req, res) => {
  await houseboatService.updateHouseboat(req.params.id, req.body);
  res.redirect('/houseboats');
};

exports.deleteHouseboat = async (req, res) => {
  await houseboatService.deleteHouseboat(req.params.id);
  res.redirect('/houseboats');
};
