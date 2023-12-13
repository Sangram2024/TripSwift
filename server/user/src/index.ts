import { connect } from "mongoose";
import { DB, PORT, app } from "./server";
import { config } from "dotenv";

config();

connect(DB as string)
  .then((connection) => {
    console.log(
      `User database successfully running on ${connection.connection.host}`
    );
    // consumeEvent();
    app.listen(PORT, () => {
      console.log(`User server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));
