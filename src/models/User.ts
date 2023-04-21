import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

interface UserAttributes {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
	extends Model<UserAttributes, UserCreationAttributes>,
		UserAttributes {
	createdAt?: Date;
	updatedAt?: Date;
}

export const Users = sequelize.define<UserInstance>(
	"User",
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			unique: true,
			autoIncrement: false,
			allowNull: false,
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		tableName: "users",
	}
);
