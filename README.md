## Super Basic TypeScript Web server starter!

Intended as quick jump-point to create TypeScript based web apps, but configured to accept JS as well without breaking

- Requires
  - Node.js
  - NPM
  - Typescript (npm install typescript -g)
  - An open port (defaults to 3000)
- Includes all the standard web server stuff you can add to or remove
- Should be friendly for extreme beginners to node or TypeScript
  - See [tsconfig documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for compiler settings
  - See [package.json documentation](https://docs.npmjs.com/files/package.json) for run-time settings
  - Just run the start.bat for easy start-up, defaults to port http://localhost:3000, configure as desired
- Check the content of the src folder to get started on server side code
  - app is the server pre-configuration
  - index is the main code file you'll add to
  - If you require server-side rendering install [EJS](https://www.npmjs.com/package/ejs)
  - If you require authentication install [Passport](https://www.npmjs.com/package/passport)
  - If you require a database install [MySQL](https://www.npmjs.com/package/mysql), [PostgreSQL](https://www.npmjs.com/package/pg), [sqlite3](https://www.npmjs.com/package/sqlite3), [MongoDB](https://www.npmjs.com/package/mongodb), etc...
- Check the content of the public folder for interface
  - Existing UI is powered by CDNed Vue to demo server api interface
- See [Express.js documentation](https://expressjs.com/en/4x/api.html) for more details on server operation