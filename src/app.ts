import Koa from "koa";
import router from "./routes";
import models from "./data";

const app = new Koa();

app.use(router);

const db = models;

app.listen(process.env.APP_PORT, () => console.log("Server started."));
