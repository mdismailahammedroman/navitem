import express from 'express';
import { userRoute } from '../app/module/user/user.route';
// import { authRouter } from '../app/module/auth/auth.route';  // Uncomment when ready

const router = express.Router();

const routerModels = [
  {
    path: '/user',
    router: userRoute,
  },
  // {
  //   path: '/auth',
  //   router: authRouter,
  // },
];

routerModels.forEach((module) => {
  router.use(module.path, module.router);
});

export default router;