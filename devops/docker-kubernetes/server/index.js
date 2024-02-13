const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cron = require('node-cron');
const axios = require('axios'); // Add this line
const db = require('./db')
const movieRouter = require('./routes/movie-router')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.use('/api', movieRouter)

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    return currentTime;
  };
  
  const generateUniqueObject = () => {
    const currentTime = getCurrentTime();
    const name = new Date().toISOString();
    const rating = (((Date.now() % 500) / 100).toFixed(1)).toString();
  
    return {
      time: [currentTime],
      name,
      rating: rating,
    };
  };


// Schedule the cron job
cron.schedule('*/30 * * * * *', async () => {
    try {
      const uniqueMovie = generateUniqueObject();
      console.log(uniqueMovie);
      const response = await axios.post("http://localhost:5000/api/movie", uniqueMovie);
      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))


