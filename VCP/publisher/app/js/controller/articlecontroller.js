'use strict';


/* Controllers */

angular.module('vcpmodule').controller('articleListController', function ($scope, $resource, $filter, ArticleList, Article, ArticleStatus, AuthenticationService) {

    $scope.css = {
        artilceindex: -1,
        editicon : -1,
        statuscomment : false
    };

    $scope.articleid = '';
    $scope.articleindex = '';
    $scope.selected = undefined;
    $scope.states = [];

    // 获取article数据
    ArticleList.getArticle(AuthenticationService.getSiteId()).then(function(data) {
        if(data.status == 202){
            $scope.articlesdata = [];
        }else{
            $scope.articlesdata = data;
            for(var i = 0; i < data.length; i++){
                $scope.states[i] = data[i].revisions[0].title;
            }
            $scope.states=_.union($scope.states);
            $scope.css.artilceindex = 0;
            if($scope.articlesdata.length > 0){
                $scope.articlepreviewdata = $scope.articlesdata[0].revisions[0];
            }else{
                $scope.articlepreviewdata = '';
            }
        }
    });


    // 鼠标放上去显示图标
    $scope.showEditIcon = function(index){
        $scope.css.editicon = index;
    };

    //click article list
    $scope.clickArticle = function(article, index) {
        $scope.articlepreviewdata = article.revisions[0];
        $scope.css.artilceindex = index;
    };

    //删除内容
    $scope.deleteArticle = function(){
        Article.delete({articleId:$scope.articleid}, function() {
            $scope.articlesdata.splice($scope.articleindex ,1);
            if($scope.articlesdata.length > 0){
                $scope.articlepreviewdata = $scope.articlesdata[0].revisions[0];
            }else{
                $scope.articlepreviewdata = '';
            }
            $scope.css.artilceindex = 0;
            $scope.closeDeleteWarn();
        });
    }

    $scope.cssmodalslide = {
        backdropFade: true,
        dialogFade:true
    };

    //关闭Delete弹出框
    $scope.closeDeleteWarn = function(){
        $scope.cssshowdelmodal = false;
    }

    //打开Delete弹出框
    $scope.showDeleteWarn = function(id,indexid){
        $scope.cssshowdelmodal = true;
        $scope.articleid = id;
        $scope.articleindex = indexid;
    }

    //修改文章status
    $scope.showArticleStatus = function(value, nowarticle, articleid, statusname){
        $scope.id = articleid;
        $scope.paramtag = [];
        $scope.comment = '';
        $scope.nowstatus = statusname;
        for(var i = 0;i < nowarticle.tags.length; i++){
            $scope.paramtag[i] = nowarticle.tags[i].tag.name;
        }
        $scope.data = {
            article : {
                title: nowarticle.title,
                description : nowarticle.description,
                body: nowarticle.body,
                comment: nowarticle.comment,
                system_channel_id : nowarticle.system_channel_id,
                site_id: AuthenticationService.getSiteId(),
                tags: $filter('json')($scope.paramtag),
                article_status : value,
                statuscomment : ''
            }
        };

        //获取选中article status信息
        ArticleStatus.getArticleStatus($scope.id).then(function(data) {
            if(data.status == 202){
                $scope.articleStatusData = [];
            }else{
                $scope.articleStatusData = data;
                $scope.css.statuscomment = true;
            }
            console.log($scope.articleStatusData);
        });
    }

    $scope.articleStatusData = [];

    //关闭文章status
    $scope.hideArticleStatus = function(){
        $scope.css.statuscomment = false;
    }

    $scope.comment = '';
    $scope.id = '';
    $scope.nowstatus = "";
    //更改Article status
    $scope.editArticleStatus = function(){
        $scope.data.article.statuscomment = $scope.comment;
        Article.update({articleId:$scope.id}, $scope.data.article, function(){
            ArticleList.getArticle(AuthenticationService.getSiteId()).then(function(data) {
                $scope.articlesdata = data;
                $scope.css.artilceindex = 0;
                $scope.hideArticleStatus();
            });
        });
    }

    //搜索提示
    $scope.selectdata = function(){
        console.log($scope.selected);
    }

/*
    var usersessionurl = "https://vcplatform.firebaseIO.com/usernow";
    $scope.usersessionFirebase = angularFire(usersessionurl, $scope, 'usersessionFirebase', {});

    var usersurl = "https://vcplatform.firebaseIO.com/users";
    $scope.usersFirebase = angularFire(usersurl, $scope, 'usersFirebase', []);

    var urlartilcelist = 'https://vcplatform.firebaseIO.com/articles';
    $scope.articlesFirebase = angularFire(urlartilcelist, $scope, 'articlesFirebase', [] );



    var copytotaldata = [];
    var articlesinonepage;
    var pagecount;
    var usersession;

    $scope.cssloading = true;  //Article data Loading GIF animate: Start

    $q.all([$scope.usersessionFirebase, $scope.usersFirebase, $scope.articlesFirebase]).then(function() {
        $scope.articlestotaldata = $scope.articlesFirebase;
        var usersdata = $scope.usersFirebase;
        usersession = _.findWhere(usersdata, {email: $scope.usersessionFirebase.email});

        copytotaldata = $scope.articlestotaldata;

        //排序所有数据
        $scope.loadinit = function(flag,sort){
            for(var i = 0; i < $scope.articlestotaldata.length; i++){
                for(var j = 0;j < $scope.articlestotaldata.length; j++){
                    if(sort == 'desc'){
                        if(flag == 'published'){
                            if($scope.articlestotaldata[i].published > $scope.articlestotaldata[j].published){
                                var param1 = $scope.articlestotaldata[i];
                                $scope.articlestotaldata[i] = $scope.articlestotaldata[j];
                                $scope.articlestotaldata[j] = param1;
                            }
                        }else if(flag == 'updated'){
                            if($scope.articlestotaldata[i].updated > $scope.articlestotaldata[j].updated){
                                var param1 = $scope.articlestotaldata[i];
                                $scope.articlestotaldata[i] = $scope.articlestotaldata[j];
                                $scope.articlestotaldata[j] = param1;
                            }
                        }else if(flag == 'clickcount'){
                            if($scope.articlestotaldata[i].clickcount > $scope.articlestotaldata[j].clickcount){
                                var param1 = $scope.articlestotaldata[i];
                                $scope.articlestotaldata[i] = $scope.articlestotaldata[j];
                                $scope.articlestotaldata[j] = param1;
                            }
                        }
                    }else{
                        if(flag == 'published'){
                            if($scope.articlestotaldata[i].published < $scope.articlestotaldata[j].published){
                                var param1 = $scope.articlestotaldata[i];
                                $scope.articlestotaldata[i] = $scope.articlestotaldata[j];
                                $scope.articlestotaldata[j] = param1;
                            }
                        }else if(flag == 'updated'){
                            if($scope.articlestotaldata[i].updated < $scope.articlestotaldata[j].updated){
                                var param1 = $scope.articlestotaldata[i];
                                $scope.articlestotaldata[i] = $scope.articlestotaldata[j];
                                $scope.articlestotaldata[j] = param1;
                            }
                        }else if(flag == 'clickcount'){
                            if($scope.articlestotaldata[i].clickcount < $scope.articlestotaldata[j].clickcount){
                                var param1 = $scope.articlestotaldata[i];
                                $scope.articlestotaldata[i] = $scope.articlestotaldata[j];
                                $scope.articlestotaldata[j] = param1;
                            }
                        }
                    }
                }
            }
        };

        $scope.loadinit('updated','desc');


        //页面总数
        articlesinonepage = 10;  // 文章每页数量
        pagecount = $scope.articlestotaldata.length / articlesinonepage;

        $scope.noOfPages = parseInt(pagecount)== pagecount ? pagecount : parseInt(pagecount) + 1;  //当前页数
        if($scope.noOfPages==0){
            $scope.noOfPages=1;
        }

        //当前页数
        $scope.currentPage = 1;
        $scope.articlesdata = [];

        //获取选中数据
        $scope.loadcurrentpagedata = function(){
            $scope.articlesdata.length = 0;
            if($scope.noOfPages != 0){
                if($scope.currentPage > $scope.noOfPages){
                    $scope.currentPage = $scope.noOfPages;
                }
            }

            var j = 0;
            for(var i = (($scope.currentPage-1)*articlesinonepage);i < $scope.articlestotaldata.length;i ++){
                $scope.articlesdata[j] = $scope.articlestotaldata[i];
                j++;
                if($scope.articlesdata.length > (articlesinonepage-1)){
                    return;
                }
            }
        }

        $scope.loadcurrentpagedata();
        $scope.articlepreviewdata = $scope.articlesdata[0];



        //检测currentPage值
        $scope.$watch('currentPage', function(newPage){
            $scope.watchPage = newPage;
            $scope.loadcurrentpagedata();
            $scope.articlepreviewdata = $scope.articlesdata[0];
            $scope.cssarticleindex = 0;
            window.scrollTo(0,0);  //滚动条置顶
        });

        $scope.cssloading = false;  //Article data Loading GIF animate: End

    });//firebase then End

    $scope.cssshowupdate = true;
    $scope.cssshowpublish = true;
    $scope.cssshowclick = true;



    //按类型排序
    $scope.orderbytype = function(flag,sort){
        $scope.loadinit(flag,sort);
        $scope.loadcurrentpagedata();
        $scope.articlepreviewdata = $scope.articlesdata[0];
        if(flag == 'updated'){
            $scope.cssshowupdate = !$scope.cssshowupdate;
        }else if(flag == 'published'){
            $scope.cssshowpublish = !$scope.cssshowpublish;
        }else if(flag == 'clickcount'){
            $scope.cssshowclick = !$scope.cssshowclick;
        }
    };





    $scope.cssarticleindex = 0;
    $scope.clickArticle = function(article, index) {
        $scope.articlepreviewdata = article;
        $scope.cssarticleindex = index;
    };

    $scope.openDelModal = function (article) {
        $scope.articlepreviewdata = article;
        $scope.cssshowdelmodal = true;
    };

    $scope.closeDelModal = function () {
        $scope.cssshowdelmodal = false;    //关闭弹出提示框 Modal
    };

    $scope.cssmodalslide = {
        backdropFade: true,
        dialogFade:true
    };


    $scope.delArticle = function(article) {
        var getdeleteindex=$scope.searchdeleteindex(article);

        $scope.cssshowdelmodal = false;      //关闭弹出提示框 Modal
        $scope.articlestotaldata.splice(getdeleteindex, 1);

        copytotaldata = $scope.articlestotaldata;
        var pagecount1 = $scope.articlestotaldata.length/articlesinonepage;
        $scope.noOfPages = parseInt(pagecount1)== pagecount1 ? pagecount1 : parseInt(pagecount1)+1;
        if($scope.noOfPages == 0){
            $scope.noOfPages = 1;
        }
        $scope.loadcurrentpagedata();
        $scope.articlepreviewdata = $scope.articlesdata[0];
    };

    $scope.searchdeleteindex = function(article){
        for(var i = 0; i < $scope.articlestotaldata.length; i++){
            if(article.id == $scope.articlestotaldata[i].id){
                return i;
            }
        }
    }





    $scope.cssshowcomments = false;

    //点击更改文章状态按钮事件
    $scope.clickarticlestatus = function(status1, article){
        $scope.cssshowcomments = true;
        if(status1 == 'Published'){
            article.published = modelArticle.getDateNow();
        }else{
            article.published = 0;
        }
        $scope.currentarticle  = article;
        $scope.currentarticlestatus = status1;
        $scope.currentarticlereviewcomment = "";
    };

    $scope.closecomments = function(){
        $scope.cssshowcomments = false;
    };

    $scope.savearticlestatus = function(){
        var newstatus ={
            date : modelArticle.getDateNow(),
            status : $scope.currentarticlestatus,
            version : $scope.currentarticle.revision.length,
            operator : usersession.firstname,
            reviewcomment : $scope.currentarticlereviewcomment
        };

        if( $scope.currentarticlestatus == "published"){
            $scope.currentarticle.published = modelArticle.getDateNow();
        }
        $scope.currentarticle.updated = modelArticle.getDateNow();
        $scope.currentarticle.status = $scope.currentarticlestatus;
        $scope.currentarticle.lastreviewcomment = $scope.currentarticlereviewcomment;
        $scope.currentarticle.editor =  usersession.firstname;
        $scope.currentarticle.reviewhistory.push(newstatus);

        $scope.cssshowcomments = false;
        //保存到firebase中
        for(var i = $scope.articlestotaldata.length; i--; i>=0){
            if ($scope.articlestotaldata[i].id == $scope.currentarticle.id) {
                $scope.articlestotaldata[i] = $scope.currentarticle;
            }
        }
    };

    //搜索提示
    $scope.selected = undefined;
    $scope.states = [];

    $scope.selectdata=function(){
        var titledata=[],data=[],articledata=[];
        if($scope.selected==""){
            $scope.articlestotaldata=copytotaldata;
        }else{
            for(var i = 0;i < copytotaldata.length; i++){
                titledata[i] = copytotaldata[i].title;
                articledata[i] = copytotaldata[i].author;
            }

            //获取匹配title
            var resultdata = $filter('filter')(titledata, $scope.selected);

            var resultarticle = $filter('filter')(articledata, $scope.selected);
            //去除重复title
            resultdata=_.union(resultdata);
            resultarticle= _.union(resultarticle);
            //根据title获取相应的
            // 数据
            for(var j = 0;j < resultdata.length; j++){
                for(var i = 0;i < copytotaldata.length; i++){
                    if(copytotaldata[i].title == resultdata[j]){
                        data.push(copytotaldata[i]);
                    }
                }
            }
            for(var j = 0;j < resultarticle.length; j++){
                for(var i = 0;i < copytotaldata.length; i++){
                    if(copytotaldata[i].author == resultarticle[j]){
                        data.push(copytotaldata[i]);
                    }
                }
            }
            $scope.articlestotaldata = data;
        }

        var pagecount1 = $scope.articlestotaldata.length/articlesinonepage;
        $scope.noOfPages =parseInt(pagecount1)== pagecount1 ? pagecount1 : parseInt(pagecount1)+1;
        if($scope.noOfPages==0){
            $scope.noOfPages=1;
        }
        $scope.loadcurrentpagedata();
        $scope.articlepreviewdata = $scope.articlesdata[0];
    };





    //标签显示提示框
    $('.vcpbox').tooltip({
        selector: "a[rel=tooltip]"
    });*/
});




angular.module('vcpmodule').controller('articleDetailController', function ($scope, $routeParams, $location, $timeout, $filter, Article, Category, AuthenticationService) {

    $scope.css ={
        deletealert: false,   //删除弹出框
        commitalert : false, //comment 弹出框
        erroralert : false, //title 非空验证
        tagsPanel : false,  //显示tags panel
        versionIndex : 0 //选中第一个版本信息
    }

    //获取category数据
    Category.query().$then(function(data){
        $scope.category = data.data;
    });

    Article.get({articleId:$routeParams.articleId}, function(data) {
        var tagstr = '';
        $scope.articledetails = data;
        $scope.articledata = data.revisions[0];
        for(var j = 0;j<$scope.articledata.tags.length;j++){
            tagstr += $scope.articledata.tags[j].tag.name + ',';
        }
        $('.tagsinput').importTags(tagstr);
    });
    $(".tagsinput").tagsInput();    //初始化 加载tag标签

    //显示delete弹出框
    $scope.showDeleteAlert = function(){
        $scope.css.deletealert = true;
    }

    //隐藏delete弹出框
    $scope.hideDeleteAlert = function(){
        $scope.css.deletealert = false;
    }

    //显示commit弹出框
    $scope.showCommitAlert = function(){
        if($scope.articledata.title == '' || $scope.articledata.title == undefined){
            $scope.css.erroralert = true;
            var timeoutId = $timeout(function() {
                $scope.css.erroralert = false;
            }, 3000);
        }else{
            $scope.css.commitalert = true;
        }
    }

    //隐藏commit弹出框
    $scope.hideCommitAlert = function(){
        $scope.css.commitalert = false;
    }

    $scope.cssmodalslide = {
        backdropFade: true,
        dialogFade:true
    };

    $scope.deleteArticle = function(){
        Article.delete({articleId:$routeParams.articleId}, function() {
            $scope.hideDeleteAlert();
            $location.path('/articlelist');
        });
    }

    //显示版本信息
    $scope.displayVersionInfo = function(revisiondata, versionindex){
        $scope.articledata =  revisiondata;
        $scope.css.versionIndex = versionindex;
        var tagstr = '';
        for(var j = 0;j < $scope.articledata.tags.length; j++){
            tagstr += $scope.articledata.tags[j].tag.name + ',';
        }
        $('.tagsinput').importTags(tagstr);
    };


    $scope.comment = '';
    $scope.saveArticleData = function(){
        $scope.data = {
            article : {
                title: $scope.articledata.title,
                description : $scope.articledata.description,
                body: $scope.articledata.body,
                statuscomment: $scope.comment,
                system_channel_id : $scope.articledata.system_channel_id,
                site_id: AuthenticationService.getSiteId(),
                tags: $filter('json')($(".tagsinput").exportTags())
            }
        };
        if($scope.articledata.title == '' || $scope.articledata.title == undefined){
            $scope.css.erroralert = true;
            var timeoutId = $timeout(function() {
                $scope.css.erroralert = false;
            }, 3000);
        }else{
            $scope.css.commitalert = true;
            Article.update({articleId:$routeParams.articleId}, $scope.data.article, function(){
                Article.get({articleId:$routeParams.articleId}, function(data) {
                    var tagstr = '';
                    $scope.articledetails = data;
                    $scope.articledata = data.revisions[0];
                    for(var j = 0;j<$scope.articledata.tags.length;j++){
                        tagstr += $scope.articledata.tags[j].tag.name + ',';
                    }
                    $('.tagsinput').importTags(tagstr);
                });
                $scope.hideCommitAlert();
            });
        }
    }
});





angular.module('vcpmodule').controller('articleCreateNewController', function ($scope, $timeout, $location, $filter, Article, Category, AuthenticationService) {


    $scope.css = {
         erroralert : false,
         addcomment : false
    }

    $scope.data = {
        newarticle : {
            title: '',
            description : '',
            body: '',
            comment: '',
            system_channel_id : 1,
            site_id: AuthenticationService.getSiteId(),
            tags: ''
        }
    };

    $(".tagsinput").tagsInput();

    $scope.cssmodalslide = {
        backdropFade: true,
        dialogFade:true
    };

    //获取category数据
    Category.query().$then(function(data){
        $scope.category = data.data;
    });

    //添加article
     $scope.addNewArticle = function(){
         $scope.data.newarticle.tags = $filter('json')($(".tagsinput").exportTags());
         Article.save($scope.data.newarticle, function(){
             $scope.hideAddComment();
             $location.path('/articlelist');
         });
     }

    //显示comment
    $scope.showAddComment = function(){
        if($scope.data.newarticle.title == '' || $scope.data.newarticle.title == undefined){
            $scope.css.erroralert = true;
            var timeoutId = $timeout(function() {
                $scope.css.erroralert = false;
            }, 3000);
        }else{
            $scope.css.addcomment = true;
        }
    }

    //隐藏comment
    $scope.hideAddComment = function(){
        $scope.css.addcomment = false;
    }

});

