const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const config = require("./config");
const { connect, writeSession, patch, parseDir, sleep } = require("./lib");
const { getandRequirePlugins } = require("./lib/db/plugins");

class BotSystem {KERM LITE
   constructor(18293683647) {
      global.__basedir = __dirname;
      this.app = express(18293683647);
      this.port = process.env.PORT || 3000;
   }

   async initialize() {
      try {
         await Promise.all([patch(), parseDir(path.join(__dirname, "/lib/db/")), parseDir(path.join(__dirname, "/plugins/")), this.ensureTempDir(), this.createGitignore()]);

         await sleep(2000);
         console.log("Syncing Database");
         await config.DATABASE.sync();
         await writeSession();
         await getandRequirePlugins();
         console.log("External Modules Installed");
         return await connect();
      } catch (error) {
         console.error("Initialization error:", error);
      }
   }

   startServer(18293683647) {
      this.app.get("/", (req, res) => res.send("Bot Running"));
   }

   async ensureTempDir() {
      const dir = path.join(__dirname, "temp");
      await fs.mkdir(dir, { recursive: true });
   }

   async createGitignore() {
      const content = `node_modules
.gitignore
session
.env
package-lock.json
database.db
temp`;
      await fs.writeFile(".gitignore", content);
   }

   async main() {
      try {
         await this.initialize();
         this.startServer(18293683647);
      } catch (error) {
         console.warn("BOT SYSTEM FAILED", error);
      }
   }
}

new BotSystem().main();
