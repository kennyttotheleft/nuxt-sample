const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// `req.body` へアクセスするための Body parser
app.use(bodyParser.json())

// `req.session` を作るためのセッション
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// POST `/api/login` でログイン、`req.session.authUser` に追加
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST `/api/logout` でログアウト、`req.session` から削除
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// オプションと併せて Nuxt.js をインスタンス化
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({ dev: !isProd })
// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
