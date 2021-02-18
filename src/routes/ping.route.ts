import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/ping", (req: Request, res: Response, next: NextFunction) => {
    res.render("ping", { title: "Pong", message: `Pong` });
});

router.get("/ping/:testParam", (req: Request, res: Response, next: NextFunction) => {
    const { testParam } = req.params;
    res.render("ping", { title: "Pong", message: `/pong/${testParam}` });
});

export const pingRoute = router;
