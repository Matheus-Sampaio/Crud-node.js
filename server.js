const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Matheus:Matheus27121997@mongoteste-ami3p.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, { useUnifiedTopology: true},(err, client) => {
    if (err) return console.log(err)
    db = client.db('mongoteste')

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})

app.route('/edit/:id').get((req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
      if (err) return res.send(err)
      res.render('edit.ejs', { data: result})
  })
}).post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname
  var email = req.body.sex
  var confirmemail  = req.body.birth
  var password = req.body.email
  var confirmpassword = req.body.phone
  var CPF = req.body.address
  var telephone = req.body.complement
  var gender = req.body.cep
  var birthdate = req.body.number

  db.collection('data').updateOne({_id: ObjectId(id)}, {
      $set: {
          name: name,
          surname: surname,
          email: email,
          confirmemail: confirmemail,
          password: password,
          confirmpassword: confirmpassword,
          CPF: CPF,
          telephone: telephone,
          gender: gender,
          birthdate: birthdate
      }
  }, (err, result) => {
      if (err) return res.send(err)
      res.redirect('/show')
      console.log('Atualizando no Banco de Dados')
  })
})

app.route('/delete/:id').get((req, res) => {
  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
      if (err) return res.send(err)
      console.log("Deletando no Banco de Dados")
      res.redirect('/show')
  })
})

