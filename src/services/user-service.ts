import User from "../data/user";
import * as kakaoClient from "../clients/kakao";
import LoginUserInformation from "../models/UserInformation";
import LoginTypes from "../enums/loginType";

async function findOrCreateByAccessToken(
  accessToken: string,
  loginType: LoginTypes,
  requestIp: string
): Promise<LoginUserInformation> {
  let result: LoginUserInformation;

  result = await User.findOne({
    where: { authId: accessToken, loginType: loginType },
  }).then((user: User) => {
    new LoginUserInformation(user.nickname, user.imageUrl);
  });

  if (!result) {
    const response = kakaoClient.getUserInformation(accessToken);

    result = await User.create({
      authId: response.id,
      nickname: response.properties["nickname"],
      loginType: loginType,
      imageUrl: response.properties["thumbnail_image"],
      token: accessToken,
      createdIp: requestIp,
    }).then((user: User) => {
      new LoginUserInformation(user.nickname, user.imageUrl);
    });
  }
  return result;
}

export { findOrCreateByAccessToken };
