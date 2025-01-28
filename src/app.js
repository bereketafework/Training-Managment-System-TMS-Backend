const express = require("express");

const app = express();
const users = require("../routers/usersRouter");
const course = require("../routers/courseRouter");
const training = require("../routers/trainingRouter");
const Participant = require("../routers/participantRouter");
const session = require("../routers/sessionRouter");
const guest = require("../routers/guestRouter");
app.use(express.json());

app.use("/api/user", users);
app.use("/api/course", course);
app.use("/api/training", training);
app.use("/api/Participant", Participant);
app.use("/api/session", session);
app.use("/api/guest", guest);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
