const fs = require("fs");
const Router = require('koa-router');
const userModel = require("../db/index.js");

const router = new Router();

router.get("/", async (ctx) => {
    ctx.response.type = "html";
    ctx.body = fs.createReadStream("views/my-index.html");
})

router.get("/home", async (ctx) => {

    // await ctx.render("views/my-index.html",{
    //     homeList
    // });

    ctx.response.type = "html";
    // ctx.response.responseText = homeList;
    ctx.body = fs.createReadStream("views/my-index.html");
    // ctx.body = {homeList}
})

// 获取首页列表
router.get("/homeList", async (ctx) => {
    let homeList;

    await userModel.findArticleTopFive().then(result => {
        homeList = result;
    })
    ctx.body = { homeList };
})

router.get("/hello", async (ctx) => {
    ctx.body = "hello world";
});


module.exports = router;