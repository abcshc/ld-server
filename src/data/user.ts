import { Sequelize, DataTypes, Model } from "sequelize";
import { names } from "../utils/enumUtils";
import LoginTypes from "../enums/loginType";

class User extends Model {
  id: number;
  authId: string;
  nickname: string;
  loginType: LoginTypes;
  imageUrl: string;
  token: string;
  createdIp: string;
}

(sequelize: Sequelize) =>
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authId: {
        field: "auth_id",
        type: DataTypes.STRING(50),
        unique: "uq_user_login_auth",
      },
      nickname: {
        field: "nickname",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      loginType: {
        field: "login_type",
        type: DataTypes.ENUM(...names(LoginTypes)),
        unique: "uq_user_login_auth",
      },
      imageUrl: {
        field: "image_url",
        type: DataTypes.STRING(100),
      },
      token: {
        field: "token",
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      createdIp: {
        field: "created_ip",
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      freezeTableName: true,
      tableName: "users",
    }
  );

export default User;
