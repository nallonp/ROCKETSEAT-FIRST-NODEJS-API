const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const helmet = require('helmet');

// Iniciando o app
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Iniciando o db
mongoose.connect(
    'mongodb://localhost:27017/nodeapi',
    { useNewUrlParser: true }
);

requireDir('./src/models');

// Rotas
app.use("/api/v1", require("./src/routes"));

app.listen(8080);