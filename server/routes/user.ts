import express, {NextFunction, Request, Response, Router} from "express";
import authorizedMiddleware from "../passport/authorizedMiddleware";
import passport from "../passport/index";

export default function (app: Router): void {
  const router = express.Router();
  app.use("/user", router);

  router.get("/me", authorizedMiddleware, (req, res) => {
    res.json(req.user);
  });

  router.get("/logout", function (req, res) {
    req.logout({ keepSessionInfo: true }, () => {});
    res.redirect("/");
  });

  router.get(
    "/oauth/google",
    (  req: Request,
       res: Response,
       next: NextFunction) => {
      console.log('auth start');
      next();
    },
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })
  );

  router.get(
    "/oauth/google/callback",
    (req: Request,
       res: Response,
       next: NextFunction) => {
      console.log('auth callback');
      next();
    },
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/google-auth-failed",
    })
  );
}
