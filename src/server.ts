import "reflect-metadata";

import { GoogleAPI } from "@/apis";
import { CreateUserController, RefreshTokenController } from "@/controllers";
import { UsersRepository } from "@/db/pg-user-repository";
import { db } from "@/pg-connection";
import { CreateUserService } from "@/services";

import express, { Request, Response, json } from "express";

const app = express();
const google = new GoogleAPI();
const userRepository = new UsersRepository();
const userService = new CreateUserService(userRepository);
const userController = new CreateUserController(userService);
const refreshTokenController = new RefreshTokenController();

app.use(json());

app.post("/users", async (req: Request, res: Response) =>
  userController.handle(req, res),
);

// app.get("/auth/google", async (req, res) => {
//   const url = await google.generateAuthUrl();
//   return res.json({ url });
// });

// app.get("/auth/google/callback", async (req, res) => {
//   const { code } = req.query;
//   if (code) {
//     const { id_token, access_token } = await google.getToken(String(code));
//     return res.json({ id_token, access_token });
//   }
// });

// app.post("/auth/google/user-data", async (req, res) => {
//   const userData = await google.decodeToken(req.body.token);
//   return res.json(userData);
// });

// app.get("/refresh-token", async (req, res) =>
//   refreshTokenController.handle(req, res),
// );

db.initialize()
  .then(() =>
    app.listen(3000, () => console.log(`Server running at port 3000!`)),
  )
  .catch(console.error);
