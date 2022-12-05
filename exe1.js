/*Exercise
Write a server that:
- given 2 numbers
- then it returns 1 array containing all the integers between
- logs all requests done by user into a log.json file
Example:  IF INPUT = “2,8”  THEN OUTPUT = [3,4,5,6,7]*/


import fsp from 'fs/promises';
import express from 'express';
const app = express();
app.use(express.json());


app.get('/all-between', async (req, res) => {
    const {a , b} = req.query;
    await fsp.appendFile('log.json', JSON.stringify(req.query));
    const arr = [];
    if (a<b) {
      for ( let i=a; i<=b; i++){
        arr.push(i);
      }
    } 
    else {
        for ( let i=b; i<=a; i++){
            arr.push(i);
        }
    }
    res.status(200);
    res.json(arr);
});

app.all('/*', async (req, res) => {
    res.status(404);
    res.json({ error: 'This route does not exist' });
});

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`)
});

