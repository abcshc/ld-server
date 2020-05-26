import user from "./user-route";
import Router from "koa-router";

const router = new Router({ prefix: "/api" });
router.use("/users", user);

export default router.routes();
