import database from "./knex.js"; 
import express from "express";

const app = express();
app.use(express.json());


app.post("/sign-up", async (request, response) => {
    const name = request.body.user_name;
    const password = request.body.password;
    const usersInDatabase = await database.raw(`select * from users`);
    let validPsw = false;
    const validatePassword = /^(?=.*[0-9])(?=.*[!:?.])[a-zA-Z0-9!!:?.]{5,12}$/;
    if (password.match(validatePassword)) {
        validPsw = true;
    }
   
    console.log(validPsw);
    let existingUser = false;

    for (let i in usersInDatabase) { 
      if (usersInDatabase[i].user_name === name) { 
        existingUser = true; 
        break; 
      }
    }

    if ((name.length>=5 && name.length <= 12)&&(!existingUser)&&(validPsw)) {
    const Insert = await database.raw(`insert into users (user_name, password) values ('${name}','${password}')`);
    
    } else {
      response.status(404);
      response.json(`The user_name or the password is not valid`);
    } 
    
    
    const result = await database.raw(`select * from users where user_name='${name}'`);
    response.status(200);
    response.json(result);
    });

    
  app.post("/sign-in", async (request, response) => {
    const user = request.body;
    const result = await database.raw(`select user_name from users where user_name='${user.user_name}' and password = '${user.password}'`)
    response.status(200);
    response.json(result);
  });



  app.get("/users", async (request, response) => {
    const result = await database.raw(`select * from users`);
    response.status(200);
    response.json(result);
  });



app.post("/trip", async (request, response) => {
  const trip = request.body;
  const insert = await database.raw(`insert into trips (date, vacation) values ('${trip.date}','${trip.vacation}')`);
  const id = insert.lastInsertRowid;
  const result =  await database.raw(`select * from trips where id= ${id}`);
  response.status(200);
  response.json(result);
});

app.get("/trip/:id", async (request, response) => {
  const id = Number(request.params.id);
  const result = await database.raw(`select * from trips where id=${id}`)
    response.status(200);
    response.json(result);
  
});

app.get("/trip", async (request, response) => {
  const result = await database.raw(`select * from trips`);

  response.status(200);
  response.json(result);
});

app.put("/trip/:id", async (request, response) => {
  const id = Number(request.params.id);
  const {date, vacation} = request.body;
  await database.raw(`update trips set date = '${date}', vacation = '${vacation}' where id =${id} `);
  response.status(200)
  response.json(`User modified with ID: ${id}`)
});

app.delete("/trip/:id", async (request, response) => {
  const id = Number(request.params.id);
  await database.raw(`delete from trips where id=${id}`);
  const result =  await database.raw(`select * from trips`);

  response.status(200);
  response.json(result);
});


app.all("/*", async (request, response) => {
  response.status(404);
  response.json({ error: "This route does not exist" });
});

const hostname = "localhost";
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});
