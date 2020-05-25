import user from "./user";
import Koa from "koa";
import request from "supertest";
import { findOrCreateByAccessToken } from "../services/user";
import { mocked } from "ts-jest/utils";
import LoginUserInformation from "../models/UserInformation";
import RequestException from "../exceptions/RequestException";

jest.mock("../services/user");
const mockedFindOrCreateByAccessToken = mocked(findOrCreateByAccessToken, true);

const app = new Koa();

beforeAll(async () => {
  app.use(user);
  console.log("routes user test...");
});

test("should expected hello text for test", async () => {
  const response = await request(app.callback()).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello");
});

test("should thrown bad request status when not contains access_token", async () => {
  const response = await request(app.callback()).post("/login/kakao");
  expect(response.status).toBe(400);
  expect(response.text).toBe("Bad Request!");
});

test("should expected user information when normal login request", async () => {
  mockedFindOrCreateByAccessToken.mockReturnValue(
    new LoginUserInformation("nickname1", "imageUrl2")
  );
  const response = await request(app.callback())
    .post("/login/kakao")
    .send({ access_token: "test-token" });
  expect(response.status).toBe(200);
  const responseText = JSON.parse(response.text);
  expect(responseText.nickname).toBe("nickname1");
  expect(responseText.imageUrl).toBe("imageUrl2");
});

test("should thrown bad request status when invalid access_token", async () => {
  mockedFindOrCreateByAccessToken.mockImplementation(() => {
    throw new RequestException(0);
  });
  const response = await request(app.callback())
    .post("/login/kakao")
    .send({ access_token: "test-token" });
  expect(response.status).toBe(401);
  expect(response.text).toBe("Failed to get user information from Kakao.");
});
