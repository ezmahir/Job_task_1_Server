const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/taskManager");
mongoose.connect(
  "mongodb+srv://tmp:X0esMUF4oD2ozlg8@cluster0.j2k0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const taskRoutes = require("./routes/taskRoutes");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 8000;

// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Routes
// app.use("/tasks", taskRoutes);

// // Export Express app for Vercel
// module.exports = app;
