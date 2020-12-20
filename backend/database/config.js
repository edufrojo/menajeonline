const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("[INFO] :: Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
