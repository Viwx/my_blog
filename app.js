const Koa = require('koa');
const Router = require('koa-router');
const staticServe = require('koa-static');
const bodyParser = require("koa-bodyparser");

const app = new Koa();


app.use(staticServe(__dirname + "/static"));
app.use(staticServe(__dirname + "/views"));

app.use(bodyParser({
    enableTypes: ["json", "form", "text"]
}));

app.use(require("./router/home.js").routes());
app.use(require("./router/article.js").routes());

app.listen(3000);