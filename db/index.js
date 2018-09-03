var mysql = require('mysql');
let config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_blog',
    port: 3306,
    myltipleStatements: true
};
let pool = mysql.createPool(config);
let query = (sql, values)=>{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if(err){
                reject(err);
            }else{
                connection.query(sql, values, (err, rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
};

// 查询近期文章
let findArticleTopFive = function(){
    let _sql = 'select * FROM article'
    return query(_sql)
}

// 发表文章
let insertPost = function(value){
    let _sql = "insert into article set id=?,\
    author_id=?, \
    article_type_id=?, \
    article_title=?, \
    article_cover=?, \
    article_subtitle=?, \
    article_content=?, \
    create_time=?, \
    update_time=?\
    "
    return query(_sql, value)
}
module.exports = {
    query,
    findArticleTopFive,
    insertPost
}