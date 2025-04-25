import {injectable} from "inversify";
import type {ILoggerService} from "./logger.interfaces";

@injectable()
export class ConsoleLogger implements ILoggerService {
    log(msg: string) { console.log(msg); }
}