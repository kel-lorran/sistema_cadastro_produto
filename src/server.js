import express from 'express';

import ProdutoController from './controller/ProdutoController';

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/produto', new ProdutoController());

app.listen(3001);