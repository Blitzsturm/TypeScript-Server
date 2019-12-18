cd "%~dp0"
IF NOT EXIST "node_modules" cmd /c "npm install" && del package-lock.json
SET SESSION_SECRET=PDq*zVlX6e78T3!U4ToVGuM5d3&t*ZaM
cls
SET PORT=80
npm start
pause