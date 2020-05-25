import User from "../data/user";
import * as kakaoClient from "../clients/kakao";
import LoginUserInformation from "../models/UserInformation";
import LoginTypes from "../enums/loginType";

function findOrCreateByAccessToken(
  accessToken: string,
  loginType: LoginTypes,
  requestIp: string
): LoginUserInformation {
  let result: LoginUserInformation;

  User.findOne({
    where: { authId: accessToken, loginType: loginType },
  }).then((user: User) => {
    result = new LoginUserInformation("user nickname", "user imageUrl");
  });

  if (!result) {
    try {
      let response = kakaoClient.getUserInformation(accessToken);

      User.create({
        authId: response.id,
        nickname: response.properties["nickname"],
        loginType: loginType,
        imageUrl: response.properties["thumbnail_image"],
        token: accessToken,
        createdIp: requestIp,
      }).then((user: User) => {
        result = new LoginUserInformation(user.nickname, user.imageUrl);
      });
    } catch (e) {
      throw e;
    }
  }
  return result;
}

export { findOrCreateByAccessToken };
