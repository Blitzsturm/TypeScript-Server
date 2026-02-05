import * as os from "os";
import server from "./server";

Main().catch(console.error);
async function Main()
{
	var app = server.create();
	
	app.get("/api/status.json", (req, res) =>
	{
		res.json(
		{
			querystring: req.query,
			cpus: os.cpus(),
			freemem: os.freemem(),
			hostname: os.hostname(),
			totalmem: os.totalmem(),
			loadavg: os.loadavg(),
			platform: os.platform(),
			temppath: os.tmpdir(),
			uptime: os.uptime()
		});
	});

	app.post("/api/postexample.json", (req, res) =>
	{
		res.json(req.body);
	});
}
