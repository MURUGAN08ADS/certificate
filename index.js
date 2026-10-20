import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json()); 
var users = [
  {
    id : 1,
    name : "Kalai"
  },
  {
     id : 2,
    name : "Murugan"
  },
  {
     id : 3,
    name : "Alan"
  }
]


app.get("/users" , (req , res) => {
  res.json(users)
} )

app.post("/users" , (req , res) => {
  var user = {
    id : users.length + 1,
    name : req.body.name
  }

  users.push(user);
  res.status(201).json(users)
})

app.delete("/users/:id" , (req , res) => {
  const requiredId = Number(req.params.id);
  console.log(req.params.id);
  console.log(typeof(req.params.id));
  users = users.filter(user => user.id !== requiredId);

  res.status(200).json(users);

})
app.listen(PORT , () => {
  console.log("http://localhost:3000")
})

