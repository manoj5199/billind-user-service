import express, { json } from "express";
import { router } from "./routers";
import { cors } from "./middleware";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(cors);

// TODO: Implementation of the routes
app.use("/api/v1", router);

export { app };
