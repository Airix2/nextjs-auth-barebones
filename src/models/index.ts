import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URI || "", {
	logging: false,
});

sequelize
	.authenticate()
	.then(() => {
		// console.log("DB connection successful");
	})
	.catch((err) => {
		console.error("Unable to connect to db", err);
	});
