var homeTemplate = "<div class='content-left-column-item'><div class='content-left-column-item-title hover'>{title}</div><div class='content-left-column-item-subtitle'>{subTitle}</div><div class='content-left-column-item-content'>{content}</div><div class='content-left-column-item-footer'>Posted by WuXi On {postDate}</div></div>",
    articlesTemplateStart = `
            <div class="articles-item">
                <div class="articles-item-title"><b>{year}</b></div>
                <ul class="articles-item-content">`,
    articlesTemplateLi = `<li><a href="javascript:void(0)" name="titleLink" data-id={id}>{title}</a><span>({postDate})</span></li>`,
    articlesTemplateEnd = `</ul></div>`;

var homeList = [{
    title: "搭建简单的js模版引擎",
    subTitle: "simple javascript template constructing",
    content: "随着Nodejs的流行，JavaScript在前端和后端都开始流行起来。有许多成熟的JavaScript模板引擎，例如Swig，既可以用在后端，又可以用在前端。 不过很多时候，前端模板仅仅需要简单地创建一个HTML片段，用Swig这种全功能模板有点大材小用。我们来尝试自己编写一个简单的前端模板引擎，实际上并不复杂。",
    postDate: "Aut 15, 2018"
}];

var monthsInEng = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aut', 'Sep', 'Oct', 'Nov', 'Dec'];


var homeNodeList = document.querySelectorAll("[hash='home']"),
    articlesNodeList = document.querySelectorAll("[hash='articles']"),
    portfolioNodeList = document.querySelectorAll("[hash='portfolio']"),
    aboutNodeList = document.querySelectorAll("[hash='aount']"),
    hashNodeList = document.querySelectorAll("[hash]"),
    commonNodeList = document.querySelectorAll("[hash='common']"),
    editNodeList = document.querySelectorAll("[hash='edit']"),
    viewArticlesNodeList = document.querySelectorAll("[hash='viewArticles']");
var fixedBox = document.getElementById("fixedBox"),
    blogImg = document.getElementById("blogImg"),
    articleCover;

// quill编辑器
var quill = new Quill("#editor", {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    },
    placeholder: '请输入文章内容',
    theme: 'snow'
});

window.addEventListener("load", function () {

    getHashElement();

})

window.addEventListener("hashchange", function () {
    
    getHashElement();
})

blogImg.addEventListener("change", function () {
    var img = this.files[0];
    articleCover = img;
    previewFile(img);
})

document.addEventListener("mousewheel", function () {
    var mainNav = document.getElementsByClassName("header-mainnav")[0],
        className = mainNav.getAttribute("class");
    // 滚动条滚动的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        backToTop = document.getElementById("backToTop"),
        backToTopClassName = backToTop.getAttribute("class");

    if (event.wheelDelta > 0 && scrollTop > 0) {
        if (className.indexOf("fixed") == -1) {
            mainNav.setAttribute("class", className + " mainnav-fixed");
        }
    } else {
        mainNav.setAttribute("class", className.split(" mainnav-fixed").join(""));
    }
    // if (scrollTop > document.documentElement.clientHeight) {
    if (scrollTop > 500) {
        if (backToTopClassName.indexOf("hide") != -1) {
            backToTop.setAttribute("class", "show");
        }
    } else {
        if (backToTopClassName.indexOf("show") != -1) {
            backToTop.setAttribute("class", "hide");
        }
    }
}, false);



fixedBox.addEventListener("mouseenter", function () {
    var height = 40,
        lineHeight = height,
        right = -90,
        unit = "px";

    var fixedBoxTimer = setInterval(function () {
        if (right < 0) {
            right += 15;
            height += 5;
            lineHeight = height;

            fixedBox.style.right = right + unit;
            fixedBox.style.height = height + unit;
            fixedBox.style.lineHeight = lineHeight + unit;
            fixedBox.style.marginTop = -(height / 2) + unit;
        }
        else {
            clearInterval(fixedBoxTimer);
        }
    }, 10);
});

fixedBox.addEventListener("mouseleave", function () {
    var height = 70,
        lineHeight = height,
        right = 0,
        unit = "px";

    var fixedBoxTimer = setInterval(function () {
        if (right > -90) {
            right -= 15;
            height -= 5;
            lineHeight = height;

            fixedBox.style.right = right + unit;
            fixedBox.style.height = height + unit;
            fixedBox.style.lineHeight = lineHeight + unit;
            fixedBox.style.marginTop = -(height / 2) + unit;
        }
        else {
            clearInterval(fixedBoxTimer);
        }
    }, 10);
});

document.addEventListener("click", function () {
    var target = event.target,
        tagName = target.nodeName.toLowerCase(),
        className = target.getAttribute("class");

    // 回到顶部
    if (target.getAttribute("id") == "backToTop") {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 0) {
            // if (scrollTop > document.documentElement.clientHeight) {
            var backToTopTimer = setInterval(function () {
                if (document.documentElement.scrollTop > 1000) {
                    document.documentElement.scrollTop -= 300;
                } else if (document.documentElement.scrollTop > 500) {
                    document.documentElement.scrollTop -= 100;
                } else if (document.documentElement.scrollTop > 100) {
                    document.documentElement.scrollTop -= 80;
                } else if (document.documentElement.scrollTop > 0) {
                    document.documentElement.scrollTop -= 50;
                } else {
                    var backToTop = document.getElementById("backToTop");
                    backToTop.setAttribute("class", "hide");
                    clearInterval(backToTopTimer);
                }
            }, 10);
        }
    }
    // 播放器开关 
    else if (tagName === "i") {
        if (className.indexOf("bofangqi") != -1) {
            var classNameSplit = className.split("-");
            var lastWord = classNameSplit[classNameSplit.length - 1];
            if (lastWord === "bofang") {
                classNameSplit[classNameSplit.length - 1] = "zanting"
                target.setAttribute("class", classNameSplit.join("-"));
            } else if (lastWord === "zanting") {
                classNameSplit[classNameSplit.length - 1] = "bofang"
                target.setAttribute("class", classNameSplit.join("-"));
            }
        } else if (className.indexOf("edit") != -1) {
            this.location.hash = "edit";
            articleCover = null;
            // init_edit();
        }
    }
    else if (tagName === "button") {
        if (className && className.indexOf("save") != -1) {
            var title = document.getElementsByClassName("content-top-input")[0],
                editor = quill,
                articleTitle = encodeURI(title.value),
                articleContent = encodeURI(editor.container.firstChild.innerHTML),
                postData;

            var xhr = createXHR();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        alert("文章发布成功");
                        window.location.hash = "articles";
                    } else {
                        console.log("发布失败");
                    }
                }
            }
            xhr.open("post", "/addBlog", true);
            // xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
            var obj = { "articleTitle": articleTitle, "articleContent": articleContent },
                json = JSON.stringify(obj);
            postData = new FormData();
            postData.append("file", articleCover);
            postData.append("json", json);
            xhr.send(postData);
        }
        else if (className === "content-bottom-btn") {
            window.location.hash = "articles";
        }
    }
    else if (tagName === "a") {
        var name = target.getAttribute("name");
        if (!name) return;
        if (name === "titleLink") {
            var id = target.getAttribute("data-id");
            window.location.hash = "viewArticles";
            history.replaceState(null, null, window.location.href+"?id="+id);            
        }
    }
}, false)

// 根据页面hash值显示/隐藏元素
function getHashElement() {
    var currentHash = window.location.hash;

    for (var i = 0; i < hashNodeList.length; i++) {
        hashNodeList[i].style.display = "none";
    }

    for (var j = 0; j < commonNodeList.length; j++) {
        commonNodeList[j].style.display = "flex";
    }

    if (currentHash === "#home" || currentHash === "") {
        for (var i = 0; i < homeNodeList.length; i++) {
            homeNodeList[i].style.display = "block";
        }
        for (var j = 0; j < commonNodeList.length; j++) {
            commonNodeList[j].style.display = "none";
        }
        init_home();
    } else if (currentHash === "#articles") {
        for (var i = 0; i < articlesNodeList.length; i++) {
            articlesNodeList[i].style.display = "block";
        }
        init_article();
    } else if (currentHash === "#portfolio") {
        for (var i = 0; i < portfolioNodeList.length; i++) {
            portfolioNodeList[i].style.display = "block";
        }

    } else if (currentHash === "#about") {
        for (var i = 0; i < aboutNodeList.length; i++) {
            aboutNodeList[i].style.display = "block";
        }
    } else if (currentHash === "#edit") {
        for (var i = 0; i < editNodeList.length; i++) {
            editNodeList[i].style.display = "block";
        }
        init_edit();
    } else if (currentHash.indexOf("#viewArticles")>=-1) {
        var id;
        for (var i = 0; i < viewArticlesNodeList.length; i++) {
            viewArticlesNodeList[i].style.display = "block";
        }
        if(currentHash.indexOf("?id=")>=-1){
            var urlList = currentHash.split("id="),
                id = urlList[urlList.length-1];
        }
        init_edit(id);
    }
}

// 初始化首页
function init_home() {
    var content = document.getElementsByClassName("content-left-column")[0];

    // 匹配全局{xxx}
    var repx = /\{\s*([a-zA-Z\.\_0-9()]+)\s*\}/gm,
        pageString = "";

    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                homeList = JSON.parse(xhr.responseText).homeList;
                if (!homeList || homeList.length == 0) return;

                for (var i = 0; i < homeList.length; i++) {
                    pageString += homeTemplate.replace(repx, function (match, orginalText, pos) {
                        switch (orginalText) {
                            case "title":
                                return decodeURI(homeList[i].title);
                            case "subTitle":
                                return homeList[i].subTitle;
                            case "content":
                                return decodeURI(homeList[i].content);
                            case "postDate":
                                return homeList[i].postDate;
                        }
                    });
                }
                content.innerHTML = pageString;
            } else {
                console.log("failed to load");
            }
        }
    }
    xhr.open("get", "/homeList", false);
    xhr.send(null);
}


// 获取历史文章列表
function init_article() {
    var xhr = createXHR(),
        map = new Map();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var data = JSON.parse(xhr.responseText).articleList;
                var tempDate = new Date(data[0].postDate);

                // 按年月分组
                for (var i = 0; i < data.length; i++) {
                    var tempYear = (new Date(data[i].postDate)).getFullYear(),
                        tempMonth = (new Date(data[i].postDate)).getMonth() + 1;

                    if (map.has(tempYear)) {
                        var monthMap = map.get(tempYear);
                        if (monthMap.has(tempMonth)) {
                            var newMonthList = monthMap.get(tempMonth);
                            newMonthList.push(data[i]);
                            monthMap.set(tempMonth, newMonthList);
                        } else {
                            var initList = [];
                            initList.push(data[i]);
                            tempYearMap.set(tempMonth, initList);
                        }
                        map.set(tempYear, monthMap);
                    } else {
                        var tempYearMap = new Map(),
                            initList = [];
                        initList.push(data[i]);
                        tempYearMap.set(tempMonth, initList);
                        map.set(tempYear, tempYearMap);
                    }
                }


                var repx = /\{\s*([a-zA-Z\.\_0-9()]+)\s*\}/gm;
                var articlesTemplate = "";

                for (var [year, yearMap] of map) {
                    articlesTemplate += articlesTemplateStart.replace(repx, function () {
                        return year + " 年";
                    });
                    for (var [month, monthList] of yearMap) {
                        for (var i = 0; i < monthList.length; i++) {
                            articlesTemplate += articlesTemplateLi.replace(repx, function (match, orginalText, pos) {
                                var title = decodeURI(monthList[i].title),
                                    postDate = new Date(monthList[i].postDate),
                                    id = monthList[i].id;
                                switch (orginalText) {
                                    case "id":
                                        return id;
                                    case "title":
                                        return title;
                                    case "postDate":
                                        return monthsInEng[Number.parseInt(postDate.getMonth())] + " " + postDate.getDate() + " " + year;
                                }
                            });
                        }
                        articlesTemplate += "<br>"
                    }
                    articlesTemplate += articlesTemplateEnd;
                }

                var articles = document.getElementById("articles");
                articles.innerHTML = articlesTemplate;
            }
        }
    }
    xhr.open("get", "/getBlogList", true);
    xhr.send(null);
}

// 初始化编辑博客页面
function init_edit() {
    var id = arguments[0],
        titleEditor = document.getElementsByClassName("content-top-input")[0],
        editor = quill,
        titleViewer = document.getElementsByClassName("content-top-left")[0],
        dateViewer = document.getElementsByClassName("content-top-right")[0],
        viewer = document.getElementById("viewer"),
        articleCover = document.getElementsByClassName("content-top-img-view")[0].firstElementChild,
        preview = document.getElementsByClassName("content-top-img")[0].firstElementChild,
        uploadCover = preview.nextElementSibling;
    preview.style.display = "none";
    uploadCover.style.opacity = "1";

    if (typeof id != "string" || id == "") {
        titleEditor.value = "";
        editor.container.firstChild.innerHTML = "";
        return;
    }

    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {

                var data = JSON.parse(xhr.responseText),
                    postDate = new Date(data.postDate),
                    coverUrl = data.articleCover;

                if (coverUrl) {
                    articleCover.style.display = "inlineBlock";
                    articleCover.src = coverUrl;
                } else {
                    // 默认图片
                    articleCover.src = "image/building.jpeg";
                }
                titleViewer.innerHTML = data.articleTitle;
                dateViewer.innerHTML = monthsInEng[Number.parseInt(postDate.getMonth())] + " " + postDate.getDate() + " " + postDate.getFullYear();
                viewer.innerHTML = data.articleContent;
            }
        }
    }
    xhr.open("get", "/getBlog?id=" + id, true);
    xhr.send(null);
}

// 在线预览图片
function previewFile(file) {
    var read = new FileReader();
    read.readAsDataURL(file);
    read.onload = function () {
        url = read.result;
        var preview = document.getElementsByClassName("content-top-img")[0].firstElementChild,
            uploadCover = preview.nextElementSibling;
        preview.src = url;
        preview.style.display = "block";
        uploadCover.style.opacity = "0";
    }
}

// 创建xhr对象
function createXHR() {
    return new XMLHttpRequest();
}