const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// app.use -> middleware
app.use(express.static(path.join(__dirname, '/public'))) // serve static css
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

const comments = [{
  id: '1',
  username: 'User A',
  comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}, {
  id: '2',
  username: 'User B',
  comment: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
}, {
  id: '3',
  username: 'User C',
  comment: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.'
}, {
  id: '4',
  username: 'User D',
  comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
}, {
  id: '5',
  username: 'User F',
  comment: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
}]

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    comments: comments
  })
})
app.get('/comments/:id', (req, res) => {
  const num = Math.floor(Math.random() * 500) + 1
  const {
    id
  } = req.params
  const comment = comments.find(comment =>
    comment.id === id
  )
  res.render('comment', {
    title: 'Comment',
    comment: comment,
    imgId: num
  })
})
app.post('/comments', (req, res) => {
  const {
    username,
    comment
  } = req.body
  comments.push({
    id: Date.now(),
    username: username,
    comment: comment
  })
  res.redirect('/')
})
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  })
})
app.post('/login', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})
// app.get('/cats', (req, res) => {
//   res.render('cats', {
//     cats: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', ],
//     title: 'Cats'
//   })
// })
// app.get('/random', (req, res) => {
//   const num = Math.floor(Math.random() * 10) + 1
//   res.render('random', {
//     num: num,
//     title: 'Random Number'
//   })
// })

app.use('*', (req, res) => {
  res.render('notfound', {
    title: 'Not Found'
  })
})

app.listen('8080', () => {
  console.log('Listening on 8080')
})