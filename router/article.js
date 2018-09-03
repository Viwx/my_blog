const Router = require("koa-router");
const userModel = require("./../db/index.js");
const uuid = require("uuid");

let router = new Router();

router.post("/addBlog", async(ctx)=>{
    let data = ctx.request;
    console.log(data);
    ctx.body = "发布文章成功";
})

module.exports = router;