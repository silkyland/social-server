const app = {
  db: {
    host: "localhost",
    port: 27017,
    name: "social",
    username: "",
    password: ""
  },
  jwt: {
    APP_SECRET: "ILOVEYOU",
    EXPIRE_IN: "7d"
  }
};

export const database = app.db;
export default app;
