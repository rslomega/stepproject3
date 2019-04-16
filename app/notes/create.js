module.exports = function(app, db) {
    app.post('/create', (req, res) => {
        console.log(req.body);
        res.send('Hello ');
    });
  };