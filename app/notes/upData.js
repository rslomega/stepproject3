module.exports = function(app, db) {
    app.post('/upData', (req, res) => {
      // Здесь будем создавать заметку.
      res.send('upData')
    });
  };