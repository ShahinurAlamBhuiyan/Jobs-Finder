const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());

// 💡 Increase JSON body size limit to 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/users', userRoutes);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
