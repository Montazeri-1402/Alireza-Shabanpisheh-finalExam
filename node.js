
const express = require("express");
const prisma = require("@prisma/client");
const app = express();


const db = new prisma.PrismaClient();


app.use(express.json());


app.post("/calculate", async (req, res) => {

  const { age, gender, height, weight } = req.body;

 
  if (!age || !gender || !height || !weight) {
    return res.status(400).json({ error: "Please provide all inputs" });
  }

  const bmi = weight / (height / 100) ** 2;

  
  const record = await db.bmi.create({
    data: {
      age,
      gender,
      height,
      weight,
      bmi,
    },
  });

  
  res.json({ result: bmi });
});


app.get("/history", async (req, res) => {
 
  const records = await db.bmi.findMany();

  
  res.json({ history: records });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});