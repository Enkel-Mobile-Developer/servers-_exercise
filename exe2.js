/*Exercise
Write a server that:
- given 1 string
- return a string with a dash (-) between each two even numbers
- logs all requests done by user into a log.json file
Example:  IF INPUT = "025468"  THEN OUTPUT = "0-254-6-8"*/
import fsp from 'fs/promises';
import express from 'express';
const app = express();
app.use(express.json());


app.get('/dash', async (req, res) => {
    const {num} = req.query;
    const str = JSON.stringify(num);

    await fsp.appendFile('exe2log.json', str);

    const result = [str[0]];
    for (let x = 1; x < str.length; x++) {
      if((str[x-1]%2 === 0)&&(str[x]%2 === 0)) {
         result.push('-', str[x]);
      } else {
        result.push(str[x]);
        }
    }
  
    console.log(result.join(''));
    res.status(200);
    res.json(result.join(''));
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