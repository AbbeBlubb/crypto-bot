import * as dotenv from "dotenv";

export function loadDotenv(): void {
    const result = dotenv.config({ path: "../../.env" });
    if (result.error) {
        throw result.error;
    }
    //console.log(result.parsed);
}
