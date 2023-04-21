import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
	"postgres://postgres:123456@localhost:5432/db_chat",
	{
		logging: false,
	}
);

sequelize
	.authenticate()
	.then(() => {
		// console.log("DB connection successful");
	})
	.catch((err) => {
		console.error("Unable to connect to db", err);
	});
