import Router from "koa-router";
import RequestException from "../exceptions/RequestException";
import bodyparser from "koa-bodyparser";
import { findOrCreateByAccessToken } from "../services/user-service";
import LoginTypes from "../enums/loginType";

const router = new Router();

router.use(bodyparser());

router.get("/", async (ctx) => {
  ctx.body = "Hello";
});

router.post("/login/kakao", async (ctx) => {
  const accessToken = ctx.request.body["access_token"];
  if (accessToken) {
    try {
      const userInformation = await findOrCreateByAccessToken(
        accessToken,
        LoginTypes.KAKAO,
        ctx.request.ip
      );
      ctx.body = userInformation;
    } catch (e) {
      if (e instanceof RequestException) {
        return ctx.throw(401, "Failed to get user information from Kakao.");
      } else {
        return ctx.throw(500, "Failed to get user information.");
      }
    }
  } else {
    return ctx.throw(400, "Bad Request!");
  }
});

export default router.routes();
