import { Selector } from "testcafe";
import { PORT } from "../src/index";

fixture`The main endpoint greets the world`.page`http://localhost:${PORT}/`;

test("My first test", async (t) => {
    const text = Selector("body").innerText;

    await t.expect(text).eql("Hello world!");
});
