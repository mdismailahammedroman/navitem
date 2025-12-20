import express from "express";
import { userRoute } from "../app/module/user/user.route";
import { chatRoute } from "../app/module/chat/chat.route";

const router = express.Router();

const routerModels = [
  {
    path: "/user",
    router: userRoute,
  },
  {
    path: "/chat",
    router: chatRoute,
  },
];

routerModels.forEach((module) => {
  router.use(module.path, module.router);
});

export default router;
