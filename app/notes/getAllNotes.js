module.exports = function(app, db) {
    app.get('/', async (req, res) => {
        let result = {}
        try {
            result = await db.colections('post').find({}).toArray();
            result.map(post =>{
                console.log(post)
            });
        }catch{
            if(err){
                console.log(err);
                //res.send(Error);
            }
        }
        res.send("ok");
    })
  }


 /* const ObjectId = require('mongodb').ObjectId

module.exports = function(app, db) {
    app.get('/read-all', async (req, res) => {
      let query = {published: true}
      
      let result = {};
      try{
        result = await db.collection('post').find({}).toArray();
        result.map( post => {
            console.log(post)
        });
      } catch (err) {
          console.log(err);
      }
      
      res.send('ok');
    })
}*/
  