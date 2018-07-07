const app = {
  db: {
    host: "ds229621.mlab.com",
    port: 29621,
    name: "server",
    username: "admin",
    password: "qwerty9999"
  },
  jwt: {
    APP_SECRET: "ILOVEYOU",
    EXPIRE_IN: "7d"
  }
};

export const database = app.db;
export default app;
