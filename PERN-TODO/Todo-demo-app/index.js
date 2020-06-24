const Express = require('express');
const Cors = require('cors');
const pool = require('./db');
// require("tls").DEFAULT_ECDH_CURVE = "auto"
const app = Express();


//middleware
app.use(Cors());
app.use(Express.json());   //req.body

//routes//

//create todo
app.post("/todos", async (req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
          console.log(req.body);
    } catch (err) {
          console.error(err.message);
    }
});

//GET ALL TODOS
app.get("/todos",async (req,res)=>{
    try {
      const allTodod = await pool.query(
       "select * from todo"
      );
res.json(allTodod.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get todos by id
app.get("/todos/:id", async (req,res)=>{
    try {
        const { id }= req.params;
      const todoById = await pool.query(
          "select * from todo where TodoId = ($1)",[id]
      );
      res.json(todoById.rows[0]);
    } catch (err) {
       console.error(err.message);
    }
});

//put todos by id
app.put("/todos/:id",async (req,res)=>{
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todoid = $2",
            [description,id]
        );
        res.json("todo is update");
    } catch (err) {
      console.error(err.message);
    }
});

//todo delete
app.delete("/todos/:id",async(req,res)=>{
    try {
       const { id } = req.params;
       const deleteTodo = await pool.query(
           "Delete from todo where todoid = $1",[id]
       );
       res.json("Todod Deleted");
    } catch (err) {
        console.error(err.message)
    }
});

app.listen(5000,()=>{
    console.log('server is running on 5000');
});