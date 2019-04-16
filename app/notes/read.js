module.exports = function(app, db) {
    app.post('/read', (req, res) => {
      // Здесь будем создавать заметку.
      res.send('read')
    });
  };