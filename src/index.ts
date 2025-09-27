import { connect } from "./app/database";
import { app } from "./app";

const port = process.env.PORT || 4000;

app.listen(port, async (error) => {
  if (error) {
    console.error(error.message);
    return;
  }

  await connect().finally(() => {
    console.log("Database connected");
  });

  console.log(`Service is listening on port ${port}`);
});
