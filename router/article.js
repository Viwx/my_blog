const Router = require("koa-router");
const userModel = require("./../db/index.js");
const uuid = require("uuid");

let router = new Router();

router.post("/addBlog", async(ctx)=>{
    let data = ctx.request.body;
    for(var i=0; i<data.articleContent.ops.length; i++){
        data.articleContent.ops[i] = JSON.stringify(data.articleContent.ops[i]); 
    }
    console.log('data',data);
    ctx.body = "data";
})
router.get("/getBlog", async(ctx)=>{
    ctx.body = { articleTitle: 'jjj',
    articleContent:
     { ops:
        [ '{"insert":"kkk\\nkkk\\njjj"}',
          '{"attributes":{"header":1},"insert":"\\n"}' ] } };
})
module.exports = router;