import ILogger from './Interfaces/ILogger.js';

export default class ConsoleLogger implements ILogger {
    log(message: string) {
        console.log(message);
    }
}