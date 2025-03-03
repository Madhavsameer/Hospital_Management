const express = require('express');//server
const mongoose = require('mongoose');//database
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); //authentication
const bcrypt = require('bcrypt');//encryption
const crypto = require('crypto');//decrypt
const cors = require('cors'); // for requesting backend data from difference port
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

const User = require('./models/User');
const Data = require('./models/Data');

//Database connection
mongoose.connect('mongodb+srv://madhav:srpan@madhav.maixxih.mongodb.net/healthcare', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

const secretKey = 'your_secret_key'; // Use a more secure key in production
const encryptionKey = crypto.randomBytes(32); // Generate a 32-byte key for AES-256

// User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Encrypt data
const encryptData = (data) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), data: encrypted };
};

// Decrypt data
const decryptData = (encryptedData) => {
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Store healthcare data
app.post('/data', authenticateJWT, async (req, res) => {
  const { data } = req.body;
  const encryptedData = encryptData(data);
  const healthcareData = new Data({ userId: req.user.userId, data: encryptedData });
  await healthcareData.save();
  res.status(201).send('Data stored');
});

// Retrieve healthcare data
app.get('/data', authenticateJWT, async (req, res) => {
  const data = await Data.find({ userId: req.user.userId });
  const decryptedData = data.map(item => ({
    ...item._doc,
    data: decryptData(item.data)
  }));
  res.json(decryptedData);
});

// Backup database
app.get('/backup', authenticateJWT, async (req, res) => {
  try {
    const users = await User.find({});
    const data = await Data.find({});

    const backup = { users, data };

    fs.writeFileSync('./backup.json', JSON.stringify(backup, null, 2));

    res.send('Backup created successfully!');
  } catch (error) {
    console.error('Backup error:', error);
    res.status(500).send('Error creating backup');
  }
});

// Restore database
app.post('/restore', authenticateJWT, async (req, res) => {
  try {
    const backup = JSON.parse(fs.readFileSync('./backup.json', 'utf8'));

    // Delete old data (optional)
    await User.deleteMany({});
    await Data.deleteMany({});

    // Restore from backup
    await User.insertMany(backup.users);
    await Data.insertMany(backup.data);

    res.send('Backup restored successfully!');
  } catch (error) {
    console.error('Restore error:', error);
    res.status(500).send('Error restoring backup');
  }
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});