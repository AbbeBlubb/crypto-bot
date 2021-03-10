import * as express from "express";
import { mainRoute } from "./routes/main.route";
import { pingRoute } from "./routes/ping.route";
import { balanceRoute } from "./routes/balance.route";
import * as path from "path";

process.on("unhandledRejection", (err) => {
    console.error(`\nUnhandled Promise rejection, taken care of in listener in ${path.basename(__filename)}\n\n`, err);
    process.exit(1);
});
// Test the listener with: new Promise((res, reject) => reject("Wops!"));

export const PORT = process.env.PORT || 8080;
const app = express();

app.set("views", "src/views");
app.set("view engine", "pug");

app.use(mainRoute);
app.use(pingRoute);
app.use(balanceRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} \nhttp://localhost:${PORT}/`);
});
