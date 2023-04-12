import dotenv, { type DotenvParseOutput } from "dotenv";
import { WSPaths } from "./paths/ws";

interface IEnv extends DotenvParseOutput {
    SECRET_KEY: string;
}

const configOutput = dotenv.config({
    "path": WSPaths.ROOT_ENV,
});
const { parsed = {} } = configOutput;

export default parsed as IEnv;
