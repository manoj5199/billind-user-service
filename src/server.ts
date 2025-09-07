import { connect } from "./app/database";
import { app } from "./app";
import { generateKeyPair } from "./app/utilities/decrypt";

const port = process.env.PORT || 4000;

app.listen(port, async (error) => {
  if (error) {
    console.error(error.message);
    return;
  }

  await connect();
  console.log(`Service is listening on port ${port}`);
});
