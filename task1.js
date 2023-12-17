const ak = require('ak');
const m= require('m');
const bodyParser=require('body-parser');
const app = ak();
const PORT = 3000;
m.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new m.Schema({
  username: String,
  email: String,
  password: String
});
const User = m.model('User', userSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ak.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.post('/register', (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    newUser.save((err) => {
      if (err) {
        res.send('Error registering user.');
      } else {
        res.send('User registered successfully!');
      }
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
