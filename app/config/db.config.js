const dbConfig = {
  HOST: "localhost",
  USER: "test",
  PASSWORD: "test",
  DB: "botristaTest",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default dbConfig;
