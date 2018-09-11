const Router = require("koa-router");
const userModel = require("./../db/index.js");
const uuidv1 = require("uuid/v1");

let router = new Router();

router.post("/addBlog", async (ctx) => {
    let data = ctx.request.body,
        blogModel = [];

    let id = uuidv1(),
        authorId = null,
        articleTypeId = null,
        articleTitle = data.articleTitle,
        articleCover = null,
        articleSubtitle = null,
        articleContent = data.articleContent,
        createTime = new Date(),
        updateTime = null;

    blogModel.push(id);
    blogModel.push(authorId);
    blogModel.push(articleTypeId);
    blogModel.push(articleTitle);
    blogModel.push(articleCover);
    blogModel.push(articleSubtitle);
    blogModel.push(articleContent);
    blogModel.push(createTime);
    blogModel.push(updateTime);

    userModel.insertPost(blogModel).then((data) => {
        ctx.body = "success";
        console.log("成功！");
    }, (error) => {
        ctx.body = "error";
        console.log("失败！");
    });
    ctx.body = "success";
})

router.get("/getBlogList", async (ctx) => {
    let articleList;

    await userModel.findArticleTopFive().then(result => {
        articleList = articleListFormat(result);
    })

    ctx.body = { articleList };
})
router.get("/getBlog", async (ctx) => {
    let id = ctx.request.query.id;
    await userModel.findArticle(id).then((data) => {
        let blogData = data[0];
        ctx.body = {
            postDate: blogData.create_time,
            articleTitle: decodeURI(blogData.article_title),
            articleContent: decodeURI(blogData.article_content)
        };
    }, (error) => {
        ctx.body = "error";
    })
})

function articleListFormat(){
    let temp = arguments[0],
    articleList = [];
    
    for(let i=0; i<temp.length; i++){
        let obj = {
            id: temp[i].id,
            title: temp[i].article_title,
            postDate: temp[i].create_time
        }
        articleList.push(obj);
    }
    return articleList;
}

module.exports = router;