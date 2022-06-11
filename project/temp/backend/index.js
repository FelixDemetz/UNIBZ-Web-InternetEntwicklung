const express = require('express');
const cors = require('cors');

const UserController = require('./app/controllers/UserController');

const app = express();
const port = 3333;

// eslint-disable-next-line
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/api', UserController.index);
app.post('/api', UserController.create);
app.put('/api/:id', UserController.update);
app.delete('/api/:id', UserController.destroy);

app.listen(port, () => {
    console.log(`Server started at: http://localhost:${port}`);
});
