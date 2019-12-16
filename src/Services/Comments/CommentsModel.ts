import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/db";
import { BaseDto } from "../../dto/BaseDto.g";
import { Posts } from "../Posts/PostsModel";
import { Users } from "../Users/UsersModel";

export interface Comment {
  comment: string;
}

export interface CommentDto extends BaseDto, Comment {
}

export class Comments extends Model {
  id: string;
  comment: string;
  UserId: string;
  PostId: string;

  // timestamps!
  private readonly createdAt: Date | string;
  private readonly updatedAt: Date | string;
}

Comments.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Comments",
});

Users.hasMany(Comments);
Posts.hasMany(Comments);
Comments.sync({force: false}).then(() => {
});
