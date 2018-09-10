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
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                reject("数据库连接错误", err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        console.log("sql语句执行错误", err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
};

// 查询近期文章
let findArticleTopFive = function () {
    let _sql = 'select * FROM article Order By create_time Desc'
    return query(_sql)
}

// 根据id查询文章
let findArticle = function(id){
    let _sql = `SELECT * FROM article WHERE id=?`;
    return query(_sql, id)
}

// 发表文章
let insertPost = function (value) {

    let _sql = `INSERT INTO article(id,author_id,article_type_id,article_title,article_cover,article_subtitle,article_content,create_time,update_time) VALUES (?,?,?,?,?,?,?,?,?)`;

    return query(_sql, value)
}
module.exports = {
    query,
    findArticleTopFive,
    findArticle,
    insertPost
}