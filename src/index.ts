import * as express from "express";
import { mainRoute } from "./routes/main.route";
import { pingRoute } from "./routes/ping.route";
import "./balance/checkBalance";

export const PORT = process.env.PORT || 8080;
const app = express();

app.set("views", "src/views");
app.set("view engine", "pug");

app.use(mainRoute);
app.use(pingRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} \nhttp://localhost:${PORT}/`);
});
