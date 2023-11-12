import "reflect-metadata";

import { GoogleAPI } from "@/apis";
import { CreateUserController } from "@/controllers";
import { CreateUserGoogleController } from "@/controllers/create-user-google-controller";
import { UsersRepository } from "@/db/pg-user-repository";
import { db } from "@/pg-connection";
import { CreateUserService } from "@/services";
import { CreateUserGoogleService } from "@/services/create-user-google-service";

import express, { Request, Response, json } from "express";

const app = express();
const google = new GoogleAPI();
const userRepository = new UsersRepository();
const userService = new CreateUserService(userRepository);
const userController = new CreateUserController(userService);

const userGoogleService = new CreateUserGoogleService(google);
const userGoogleController = new CreateUserGoogleController(userGoogleService);

app.use(json());

app.post("/users", async (req: Request, res: Response) =>
  userController.handle(req, res),
);

app.get("/auth/google", async (req, res) => {
  const url = await google.generateAuthUrl();
  return res.json({ url });
});

app.get("/login/google", async (req, res) =>
  userGoogleController.handle(req, res),
);

// app.post("/auth/google/user-data", async (req, res) => {
//   const userData = await google.decodeToken(req.body.token);
//   return res.json(userData);
// });

db.initialize()
  .then(() =>
    app.listen(3000, () => console.log(`Server running at port 3000!`)),
  )
  .catch(console.error);
