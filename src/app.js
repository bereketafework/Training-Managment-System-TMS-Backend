const express = require("express");

const app = express();
const users = require("../routers/usersRouter");
const course = require("../routers/courseRouter");
const training = require("../routers/trainingRouter");
const Participant = require("../routers/participantRouter");
const session = require("../routers/sessionRouter");
const guest = require("../routers/guestRouter");
const category = require("../routers/categoryRouter");
const resource = require("../routers/resourceRouter");
const team = require("../routers/teamRouter");
const userassignment = require("../routers/userAssignmentRouter");
const resourceallocation = require("../routers/resourceAllocationRouter");
const attendance = require("../routers/attendanceRouter");
const enrollment = require("../routers/enrollmentRouter");
const sponsor = require("../routers/sponsorRouter");
const paymentmethod = require("../routers/paymentMethodRouter");
const payment = require("../routers/paymentRouter");
const sponsorship = require("../routers/sponsorshipRouter");
const userrole = require("../routers/userRoleRouter");
const certificate = require("../routers/certificateRouter");
const allwoance = require("../routers/allwoanceRouter");
const teamrole = require("../routers/teamRoleRouter");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/user", users);
app.use("/api/course", course);
app.use("/api/training", training);
app.use("/api/Participant", Participant);
app.use("/api/session", session);
app.use("/api/guest", guest);
app.use("/api/category", category);
app.use("/api/resource", resource);
app.use("/api/team", team);
app.use("/api/userassignment", userassignment);
app.use("/api/resourceallocation", resourceallocation);
app.use("/api/attendance", attendance);
app.use("/api/enrollment", enrollment);
app.use("/api/sponsor", sponsor);
app.use("/api/sponsorship", sponsorship);
app.use("/api/paymentmethod", paymentmethod);
app.use("/api/payment", payment);
app.use("/api/userrole", userrole);
app.use("/api/certificate", certificate);
app.use("/api/allwoance", allwoance);
app.use("/api/teamrole", teamrole);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
