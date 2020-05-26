import request from "request";
import RequestException from "../exceptions/RequestException";

class UserInformationResponse {
  id: number;
  kakaoAccount: string;
  properties: any;
  synchedAt: Date;
  connectedAt: Date;
  constructor(
    id: number,
    kakaoAccount: string,
    properties: object,
    synchedAt: Date,
    connectedAt: Date
  ) {
    this.id = id;
    this.kakaoAccount = kakaoAccount;
    this.properties = properties;
    this.synchedAt = synchedAt;
    this.connectedAt = connectedAt;
  }
}

function getUserInformation(accessToken: string): UserInformationResponse {
  const option = {
    url: "https://kapi.kakao.com/v2/user/me",
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  };
  let response;
  request(option, (error, resp, body) => {
    if (!error && resp.statusCode == 200) {
      const info = JSON.parse(body);
      response = new UserInformationResponse(
        info["id"],
        info["kakao_account"],
        info["properties"],
        info["synched_at"],
        info["connected_at"]
      );
    } else {
      throw new RequestException(resp.statusCode, "kakao getUserInformation");
    }
  });
  return response;
}

function saveUserInformation() {
  return "save user information";
}
export { getUserInformation, saveUserInformation };
