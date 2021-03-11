import * as express from "express";
import { mainRoute } from "./routes/main.route";
import { pingRoute } from "./routes/ping.route";
import { balanceRoute } from "./routes/balance.route";
import * as path from "path";
import { attachUnhandledRejectionListener } from ".//utils/attachUnhandledRejectionListener";

attachUnhandledRejectionListener(path.basename(__filename));

// dotenv is preloaded/required when running nodemon
// To pre-load when not using nodemon, see the nodemon.json for command
// import * as dotenv from "dotenv";
// dotenv.config();
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
