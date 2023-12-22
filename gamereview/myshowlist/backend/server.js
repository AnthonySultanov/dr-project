const Game = require('./games');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://user:oTEChYWfUZsYxf4O@ppitusers.kfdmhbh.mongodb.net/mydatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch(() => {
  console.log('Connection failed');
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      password: hashedPassword
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Unable to sign up' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Invalid email or password' });
  }
});

app.post('/api/profile', async (req, res) => {
  const { name,rating,background_image}=req.body;

  try {
    const games = new Game({
      name: name,
      rating: rating,
      background_image: background_image
    });
    await games.save();
    res.json({ games });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Unable to save profile' });
  }
  
});

    
app.get('/api/profile', async (req, res) => {
  try {
    const games = await Game.find();
    res.json({ games });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Unable to fetch profile' });
  }
});


app.delete('/api/profile/:gameId', async (req, res) => {
  const gameId = req.params.gameId;

  try {
    await Game.findByIdAndDelete(gameId);
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Unable to delete game from profile' });
  }
});

app.put('/api/profile/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  const { rating } = req.body;

  try {
    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { rating },
      { new: true } // Return the updated document
    );
    res.json({ game: updatedGame });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Unable to update score' });
  }
});




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});