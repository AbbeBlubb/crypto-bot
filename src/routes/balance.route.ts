import { Router, Request, Response, NextFunction } from "express";
import { startWatchingBalance, stopWatchingBalance } from "../account/checkBalance";

enum BalanceFeed {
    Open = "OPEN",
    Closed = "CLOSED",
}

let balanceFeedStatus = BalanceFeed.Closed;

const router = Router();

router.get("/balance", (req: Request, res: Response, next: NextFunction) => {
    switch (balanceFeedStatus) {
        case BalanceFeed.Closed:
            startWatchingBalance();
            balanceFeedStatus = BalanceFeed.Open;
            res.send("Feeding balance to STDOUT");
            break;
        case BalanceFeed.Open:
            stopWatchingBalance();
            balanceFeedStatus = BalanceFeed.Closed;
            res.send("Balance feed closed");
            break;
        default:
            console.error("Switch statement in balance.route.ts resolved in default case");
    }
});

export const balanceRoute = router;
