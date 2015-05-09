/**
 * Created with JetBrains WebStorm.
 * User: ywang
 * Date: 7/8/13
 * Time: 4:16 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'

/*  Factory  */
angular.module('vcpmodule.service', ['ngResource']);




angular.module('vcpmodule.service').factory('SessionService', function(){
    return {
        get: function(key){
            return sessionStorage.getItem(key);
        },
        set: function(key, val){
            return sessionStorage.setItem(key, val);
        },
        unset: function(key){
            return sessionStorage.removeItem(key);
        }
    };
});


angular.module('vcpmodule.service').factory('AuthenticationService', function($rootScope, $http, $location, SessionService){
    var user  ={};

    return {
        login: function(credentials){
            var loginpromise =  $http.post('api/publisher/auth/login', credentials);
            loginpromise.success(function(data, status, headers, config){
                _.extend(user, data);
                SessionService.set('authenticated', true);
                SessionService.set('userid', data.id);
                SessionService.set('siteid', data.site.id);
                console.log(data);
            });
            return loginpromise
        },

        logout: function(){
            var logoutpromise = $http.get('api/publisher/auth/logout');
            logoutpromise.success(function(data, status, headers, config){
                SessionService.unset('authenticated');
                SessionService.unset('userid');
                SessionService.unset('siteid');
                user  ={};
                $location.path('/');
            });
            return logoutpromise
        },

        isLoggedIn: function(){
            //记录用户ID
            return SessionService.get('authenticated');
        },

        getUserId: function(){
            //记录用户ID
            return SessionService.get('userid');
        },

        getSiteId: function(){
            //记录用户ID
            return SessionService.get('siteid');
        },

        currentUser: function(){
            //记录用户ID
            return user;
        }

    }
});


angular.module('vcpmodule.service').factory('User',  function($resource){
    return $resource('/api/publisher/users/:Id', {});
});

angular.module('vcpmodule.service').factory('UserCheck',  function($http, $resource){
    var promise;
    var factory = {
        checkUsername : function (username) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = $http.post( 'api/publisher/user/usernameexist', username );
            // Return the promise to the controller
            return promise;
        },
        checkUseremail : function (email) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = $http.post( 'api/publisher/user/emailexist', email );
            // Return the promise to the controller
            return promise;
        }
    };
    return factory;
});



angular.module('vcpmodule.service').factory('Article', function($resource){
    return $resource('/api/publisher/articles/:articleId', {});
});

angular.module('vcpmodule.service').factory('Category', function($resource){
    return $resource('/api/publisher/channels/:Id', {});
});


angular.module('vcpmodule.service').factory('Footermenu',  function($resource){
    return $resource('/api/publisher/footermenus/:Id', {});
});

angular.module('vcpmodule.service').factory('Headermenu',  function($resource){
    return $resource('/api/publisher/headermenus/:Id', {});
});

angular.module('vcpmodule.service').factory('Site', function($resource){
    return $resource('/api/publisher/sites/:Id', {});
});

angular.module('vcpmodule.service').factory('Page', function($resource){
    return $resource('/api/publisher/pages/:Id', {});
});

angular.module('vcpmodule.service').factory('Block', function($resource){
    return $resource('/api/publisher/blocks/:Id', {});
});

angular.module('vcpmodule.service').factory('SystemLayout', function($resource){
    return $resource('/api/publisher/systemlayouts/:Id', {});
});

angular.module('vcpmodule.service').factory('SystemTheme', function($resource){
    return $resource('/api/publisher/themes/:Id', {});
});

angular.module('vcpmodule.service').factory('SystemBlockLayouts', function($resource){
    return $resource('/api/publisher/blocklayouts/:Id', {});
});


angular.module('vcpmodule.service').factory('SystemPreset',  function(){
    var factory = {
        layout : [
            {id: 10, name: '布局1两行', type : 1, order:1, fitforpagetypeid:10, cssname:'ico_layout_00', cssimage:'/publisheradmin/app/img/layout_templete.png', rowpaneldata:
                [
                    {id: 10, name: '一行两列', type : 1, order:1, cssname:'xxx', columndata:[
                        {id:101, order:1, cssname:"span9", blockdata:[]},
                        {id:102, order:1, cssname:"span3", blockdata:[]}
                    ]},
                    {id: 11, name: '一行两列', type : 1, order:1, cssname:'xxx', columndata:[
                        {id:101, order:1, cssname:"span9", blockdata:[]},
                        {id:102, order:1, cssname:"span3", blockdata:[]}
                    ]}
                ]
            },
            {id: 11, name: '布局2一行', type : 1, order:1, fitforpagetypeid:10, cssname:'ico_layout_01', cssimage:'publisheradmin/app/img/layout_templete_01.png', rowpaneldata:
                [
                    {id: 10, name: '一行两列', type : 1, order:1, cssname:'xxx', columndata:[
                        {id:102, order:1, cssname:"span3", blockdata:[]},
                        {id:101, order:1, cssname:"span9", blockdata:[]}
                    ]}
                ]
            },
            {id: 12, name: '布局3一行', type : 1, order:1, fitforpagetypeid:10, cssname:'ico_layout_02', cssimage:'publisheradmin/app/img/layout_templete_02.png', rowpaneldata:
                [
                    {id: 10, name: '一行三列', type : 1, order:1, cssname:'xxx', columndata:[
                        {id:104, order:1, cssname:"span4", blockdata:[]},
                        {id:104, order:1, cssname:"span4", blockdata:[]},
                        {id:104, order:1, cssname:"span4", blockdata:[]}
                    ]}
                ]
            }
        ],
        blockthemes : [
            {id: 100, layoutname: '一列纯文字', fitforblocktype : 0, order:1, layoutimage:'publisheradmin/app/img/ico_layout_03.png'},
            {id: 101, layoutname: '两列纯文字', fitforblocktype : 0, order:2, layoutimage:'publisheradmin/app/img/ico_layout_04.png'},
            {id: 102, layoutname: '两列图文字', fitforblocktype : 0, order:3, layoutimage:'publisheradmin/app/img/ico_layout_01.png'},
            {id: 103, layoutname: '两列图文字', fitforblocktype : 0, order:3, layoutimage:'publisheradmin/app/img/ico_layout_02.png'}
        ],
        headerthemes : [
            {headerthemeid:1,name:'black',css:'theme_01', image:'publisheradmin/app/img/header_theme_01.jpg'},
            {headerthemeid:2,name:'red',css:'theme_02', image:'publisheradmin/app/img/header_theme_02.jpg'},
            {headerthemeid:3,name:'blue',css:'theme_03', image:'publisheradmin/app/img/header_theme_03.jpg' },
            {headerthemeid:3,name:'blue',css:'theme_04', image:'publisheradmin/app/img/header_theme_04.jpg'}
        ],
        footerthemes : [
            {footerthemeid:1,name:'black',css:'theme_01', image:'publisheradmin/app/img/footer_theme_01.jpg'},
            {footerthemeid:2,name:'red',css:'theme_02', image:'publisheradmin/app/img/footer_theme_02.jpg'},
            {footerthemeid:3,name:'blue',css:'theme_03', image:'publisheradmin/app/img/footer_theme_03.jpg' },
            {footerthemeid:4,name:'green',css:'theme_04', image:'publisheradmin/app/img/footer_theme_04.jpg'}
        ],
        defaultsettings : {
            SelectedPageIndex : 0,
            PageArticleTypeId : 10,
            PageTagTypeId : 20,

            pagefilterArticleType : {pagetype:10},
            pagefilterTagType : {pagetype:20},
            pagefilterListType : {pagetype:50},
            layoutfilterType :{layouttype:0},

            headerthemeindex : -1,
            footerthemeindex : -1
        }
    };
    return factory;
});


angular.module('vcpmodule.service').factory('SiteTemp',  function($http, $resource){

    var sitedata = {
        pagelist : [
            { siteid:1, pagename:'Homepage', pageid:101, pagetype:10, pagetitle:"Homepage", pageurl:"homepage",  pageorder:1, pagelayoutid:10, pagelayoutdata:
                {id: 10, name: '布局1两行', type : 1, order:1, fitforpagetypeid:10, cssname:'ico_layout_00', cssimage:'app/img/layout_templete.png', rowpaneldata:
                    [
                        {id: 10, name: '一行两列', type : 1, order:1, cssname:'xxx', columndata:[
                            {id:101, order:1, cssname:"span9", blockdata:
                                [
                                    {blockid:100, blocktype:'auto', blockstatictype:'', blockname:"Today hot",blocklayout:10, blockquantity:4, blocktag:[], blockcategory:[], blocksortby:'date' , blockarticles:[] },
                                    {blockid:100, blocktype:'auto', blockstatictype:'', blockname:"Today hot",blocklayout:10, blockquantity:4, blocktag:[], blockcategory:[], blocksortby:'date' , blockarticles:[] }
                                ]
                            },
                            {id:102, order:1, cssname:"span3", blockdata:
                                [
                                    {blockid:100, blocktype:'auto', blockstatictype:'', blockname:"Today hot",blocklayout:10, blockquantity:4, blocktag:[], blockcategory:[], blocksortby:'date' , blockarticles:[] },
                                    {blockid:100, blocktype:'auto', blockstatictype:'', blockname:"Today hot",blocklayout:10, blockquantity:4, blocktag:[], blockcategory:[], blocksortby:'date' , blockarticles:[] }
                                ]
                            }
                        ]},
                        {id: 11, name: '一行两列', type : 1, order:1, cssname:'xxx', columndata:[
                            {id:101, order:1, cssname:"span9", blockdata:[]},
                            {id:102, order:1, cssname:"span3", blockdata:[]}
                        ]}
                    ]
                }
            },

            { siteid:1, pagename:'Article', pageid:103, pagetype:11, pagetitle:"article", pageurl:"article", pageorder:0, pagelayoutid:10, pagelayoutdata:{} }
        ]
    };

    var baseapiurl = "/api/publisher/";
    var promise;

    var factory = {
        getSite : function (siteid) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = $http.get( baseapiurl + 'sites/' + siteid  ).then(function (response) {
                // The then function here is an opportunity to modify the response
                // The return value gets picked up by the then in the controller.
                if(typeof(response.data) == "undefined"){
                    response.data = [];
                }
                return response.data;
            }, function(reason) {
//                alert('Failed: ' + reason);
            });
            // Return the promise to the controller
            return promise;
        },
        getBlocksByPageid : function (page_layout_relation_id, panel_id) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = $http.get( baseapiurl + 'pages/' + page_layout_relation_id + '/panels/' + panel_id  ).then(function (response) {
                // The then function here is an opportunity to modify the response
                // The return value gets picked up by the then in the controller.
                if(typeof(response.data) == "undefined"){
                    response.data = [];
                }
                return response.data;
            }, function(reason) {
//                alert('Failed: ' + reason);
            });
            // Return the promise to the controller
            return promise;
        }

    };
    return factory;
});

angular.module('vcpmodule.service').factory('ArticleList', function($http, $resource){
    var baseapiurl = "/api/publisher/articles/site/";
    var promise;

    var factory = {
        getArticle : function (siteid) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = $http.get( baseapiurl + siteid  ).then(function (response) {
                // The then function here is an opportunity to modify the response
                // The return value gets picked up by the then in the controller.
                if(typeof(response.data) == "undefined"){
                    response.data = [];
                }
                return response.data;
            }, function(reason) {
//                alert('Failed: ' + reason);
            });
            // Return the promise to the controller
            return promise;
        }

    };
    return factory;
});

angular.module('vcpmodule.service').factory('ArticleStatus', function($http, $resource){
    var baseapiurl = "/api/publisher/articles/status/";
    var promise;

    var factory = {
        getArticleStatus : function (articleid) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = $http.get( baseapiurl + articleid  ).then(function (response) {
                // The then function here is an opportunity to modify the response
                // The return value gets picked up by the then in the controller.
                if(typeof(response.data) == "undefined"){
                    response.data = [];
                }
                return response.data;
            }, function(reason) {
//                alert('Failed: ' + reason);
            });
            // Return the promise to the controller
            return promise;
        }

    };
    return factory;
});




angular.module('vcpmodule.service').factory('modelArticle', function(){
    var articlelist = [];



    var factory = {
        getArticlesByTags : function(){},
        getArticleById : function(){}
    };

    return factory;

    factory.getArticlesByTags = function (taglistdata, quantity, blockcategory) {
        var articlesresultfinal = [];
        var articlesresult = [];
        var articlesresult2 = [];

        articlesresult = _.filter(articlelist, function(aritcle){

            var singlearticletags = _.filter(aritcle.tags, function(singletag){
                var tagresult = _.where(taglistdata, {tagname: singletag.tagname});

                return tagresult.length;
            });

            return  singlearticletags.length;
        });

        articlesresult2 = _.filter(articlelist, function(element1){

            if (element1.category.toString() == blockcategory){
//                console.log(blockcategory, element1.category);
                return true
            }
        });

        articlesresultfinal = _.union(articlesresult, articlesresult2);

        if(articlesresultfinal.length > quantity){
            articlesresultfinal.splice(0, articlesresultfinal.length - quantity);    //判断文章数量
        }
        return articlesresultfinal;
    };


    factory.getArticleList = function (quantity) {
        var articlesresult2 = _.clone(articlelist);

        if(articlesresult2.length > quantity){
            articlesresult2.splice(0, articlesresult2.length - quantity);    //判断文章数量
        }

        return articlesresult2;
    };

    factory.getArticleById = function (articleid) {
        for(var i = 0;i < articlelist.length; i++){
            if (articlelist[i].id == articleid) {
                return articlelist[i];
            }
        }
    };

    factory.getMaxArticleID = function () {
        var articlemaxid;
        if(articlelist.length==0){
            articlemaxid=1001;
        }else{
            articlemaxid = articlelist[0].id + 1;
        }
        return articlemaxid;
    };

    factory.saveArticle = function (articledata) {
        for(var i = articlelist.length; i--;){
            if (articlelist[i].id == articledata.id) {
                articlelist[i] = articledata;
                localStorage.setItem("articlesData",JSON.stringify(articlelist));
                return ;
            }
        }
    };

    factory.delArticleById = function (articleid) {
        for(var i = articlelist.length; i--;){
            if (articlelist[i].id == articleid) {
                articlelist.splice(i, 1);
                localStorage.setItem("articlesData",JSON.stringify(articlelist));
                return;
            }
        }
    };

    factory.createNewArticle = function (articledata) {
        articlelist.push(articledata);
        localStorage.setItem("articlesData",JSON.stringify(articlelist));

    };

    factory.getDateNow = function () {
        var newdate = new Date().getTime();
        return newdate;
    };



    return factory;

});


angular.module('vcpmodule.service').factory('modelTagFireBase', [ 'angularFireCollection', function(angularFireCollection){
    var urltaglist = 'https://vcplatform.firebaseIO.com/tags';


    var factory = {
        getTagList : function () {
            var result = angularFireCollection(urltaglist);
            return result;
        },

        checkTagExist : function (tagname) {
            var taglist = this.getTagList();

            var tagresult = _.findWhere(taglist, {tagname: tagname});
            console.log(tagresult,taglist);
            if (tagresult === undefined) {
                return false;
            }else{
                return tagresult;
            }
        },

        createNewTag : function(newtag) {

            this.getTagList().add(newtag, function() {

            });
        },

        deleteTag : function (deletedtag) {
            this.getTagList().remove(deletedtag);
        }



    };
    return factory;
}]
);


