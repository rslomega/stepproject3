module.exports = function(app, db) {
    app.post('/del', (req, res) => {
      // Здесь будем создавать заметку.
      res.send('delete')
    });
  };