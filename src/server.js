import express from 'express';
import { FMCG, AUTO } from './fetchData.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/fmcg', FMCG);
app.get('/auto', AUTO);

app.listen(8000, () => {
    console.log('Server is listening on 8000');
});
