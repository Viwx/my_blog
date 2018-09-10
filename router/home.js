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
        homeList = homeListFormat(result);
    })
    
    ctx.body = { homeList };
})

router.get("/hello", async (ctx) => {
    ctx.body = "hello world";
});

function homeListFormat(){
    let temp = arguments[0],
        homeList = [];
    
    for(let i=0; i<temp.length; i++){
        let obj = {
            title: temp[i].article_title,
            subTitle: temp[i].article_subtitle,
            content: temp[i].article_content,
            postDate: temp[i].create_time
        }
        homeList.push(obj);
    }
    return homeList;
}


module.exports = router;