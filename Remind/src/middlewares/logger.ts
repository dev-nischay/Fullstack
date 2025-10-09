import type { NextFunction, Request, Response } from "express";
import chalk from "chalk";
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const method = chalk.blue.bold(req.method);
  const url = chalk.green(req.originalUrl);
  const status = chalk.yellow(res.statusCode);
  const time = chalk.magenta(new Date().toLocaleTimeString());
  console.log(`${chalk.cyan("[REQ]")} ${method} ${url} → ${status} @ ${time}`);

  next();
};
