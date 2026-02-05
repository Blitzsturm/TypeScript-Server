
import * as bodyParser from "body-parser";         // https://www.npmjs.com/package/body-parser
import * as compression from "compression";        // https://www.npmjs.com/package/compression
import * as cookieParser from "cookie-parser";     // https://www.npmjs.com/package/cookie-parser
import * as express from "express";                // https://www.npmjs.com/package/express
import * as expressSession from "express-session"; // https://www.npmjs.com/package/express-session
import { Server } from "node:http";
export default class server
{
	static create()
	{
		process.env.PORT ??= "3000";
		process.env.SESSION_SECRET ??= "PDq*zVlX6e78T3!U4ToVGuM5d3&t*ZaM";

		// Configure express
		const app = express();
		app.set("x-powered-by", "Some kind of server");
		app.use(bodyParser.urlencoded({limit: "1mb", extended: true}));
		//app.use(bodyParser.json({limit: "1mb"}));
		app.use(cookieParser());
		app.use(expressSession({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));
		app.use(compression());
		app.use(this.ServerSideEvents);
		app.use((req: express.Request, res: express.Response, nxt : express.NextFunction) =>
		{
			res.setHeader("X-Powered-By", "TS Server");
			nxt();
		});
		
		// Configure a static server
		app.use("/", express.static("public",
		{
			extensions: ["htm", "html"],
			index: "index.html"
		}));
		
		var server: Server = app.listen(process.env.PORT, () => console.log(`Worker ${process.pid} listening on port ${process.env.PORT}`));

		this.safeShutdown(10000, async () =>
		{
			await new Promise(r => server.close(r));
			// << Close any database connections or other resources
		});
		
		return app;
	}

	static safeShutdown(intMaxWaitMS: number, fncCloseDown: () => Promise<void>)
	{
		var shutDown : () => void = () =>
		{
			console.log(`SHUT DOWN SIGNAL RECIVED!`);

			// Set maximum time limit to wait for resources to close before hard shutdown
			setTimeout(() =>
			{
				console.error('FAILED TO COMPLETE SHUTDOWN TASKS IN TIME!');
				process.exit(1);
			}, intMaxWaitMS);

			// Begin shut down process
			fncCloseDown()
			.then(()=>
			{
				console.log(`SHUT DOWN SUCCESS!`);
				process.exit(0);
			})
			.catch((e : Error) =>
			{
				console.log(`SHUT DOWN ERROR: ${e.message}`);
				process.exit(1);
			});
		};
		
		// Bind shut down signal events
		process.on("SIGTERM", shutDown);
		process.on("SIGINT", shutDown);
	}

	// Extend response with server side events
	static ServerSideEvents(req: express.Request, res : ExtendedResponse, nxt : express.NextFunction)
	{
		res.sendEvent = (d : any) =>
		{
			if (res.getHeader("Content-Type") != "text/event-stream")
			{
				res.setTimeout(0);
				res.writeHead(200,
				{
					"Content-Type": "text/event-stream",
					"Cache-Control": "no-cache",
					"Connection": "keep-alive"
				});
			}
			if (d != undefined)
			{
				res.write(`data: ${JSON.stringify(d)}\n\n`);
				res.flush();
			}
		};
		nxt();
	}
}

interface ExtendedResponse extends express.Response
{
	flush: () => void,
	sendEvent: (any) => void
}
