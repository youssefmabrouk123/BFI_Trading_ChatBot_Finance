const express = require("express");
require("dotenv").config();
const chatbotRouter = require("./routers/chatbotRoutes");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/chatbot", chatbotRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

