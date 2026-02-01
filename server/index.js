const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('SpaceScope 360 Server is Active 🚀');
});

// TODO: Add NASA API Proxies here

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
