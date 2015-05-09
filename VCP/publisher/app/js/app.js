'use strict';

 //App Module

var vcpapp = angular.module('vcpmodule', [ 'vcpmodule.service', 'vcpmodule.directive', 'ui.bootstrap' ]);

vcpapp.config( function($routeProvider) {

    var  accessLevels = {
        'public' : ['public', 'reader', 'writer', 'editor', 'publisher'],
        'anon': ['public', 'reader', 'writer', 'editor', 'publisher'],
        'reader' : ['reader', 'writer', 'editor', 'publisher'],
        'writer' : ['writer', 'editor', 'publisher'],
        'editor' : ['editor', 'publisher'],
        'publisher': ['publisher']
    };


    $routeProvider.when('/',       {templateUrl: 'publisheradmin/index_tpl.html',  controller: 'userLoginController', access: accessLevels.anon    });
    $routeProvider.when('/signup', {templateUrl: 'publisheradmin/register_tpl.html',  controller: 'userRegisterController', access: accessLevels.anon    });
    $routeProvider.when('/user',   {templateUrl: 'publisheradmin/userinfo_tpl.html',  controller: 'userInfoController', access: accessLevels.reader    });

    $routeProvider.when('/site',   {templateUrl: 'publisheradmin/site_tpl.html',  controller: 'siteController', access: accessLevels.publisher    });
    $routeProvider.when('/page',   {templateUrl: 'publisheradmin/page_tpl.html',  controller: 'pageListController', access: accessLevels.publisher    });


    $routeProvider.when('/download', {templateUrl: 'publisheradmin/app_tpl.html', access: accessLevels.anon     });
    $routeProvider.when('/store',    {templateUrl: 'publisheradmin/store_tpl.html', access: accessLevels.anon      });
    $routeProvider.when('/report',   {templateUrl: 'publisheradmin/report_tpl.html', access: accessLevels.anon     });

    $routeProvider.when('/articlelist',         {templateUrl: 'publisheradmin/article_list_tpl.html', controller: 'articleListController', access: accessLevels.anon     });
    $routeProvider.when('/newarticle',          {templateUrl: 'publisheradmin/article_new_tpl.html', controller: 'articleCreateNewController', access: accessLevels.anon     });
    $routeProvider.when('/article/:articleId', {templateUrl: 'publisheradmin/article_detail_tpl.html', controller: 'articleDetailController', access: accessLevels.anon     });

    $routeProvider.otherwise({redirectTo: '/'});
});


vcpapp.config( function($httpProvider) {
    var interceptor =  function($rootScope, $location,  $q, SessionService) {
        var success = function (response) {
            return response;
        };

        var error = function (response) {
            // HTTP Not Authorized
            if (response.status === 401 ) {
                SessionService.unset('authenticated');
                $location.path('/');
                return $q.reject(response);
            }else{
                // otherwise, default behaviour
                return $q.reject(response);
            }
        };

        return function(promise) {
            return promise.then(success, error);
        };

    };
    $httpProvider.responseInterceptors.push(interceptor);


    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8' ;
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8' ;

    $httpProvider.defaults.transformRequest = [function(data,headersGetter){
        var param = function(obj)
        {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj)
            {
                value = obj[name];

                if(value instanceof Array)
                {
                    for(i=0; i<value.length; ++i)
                    {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object)
                {
                    for(subName in value)
                    {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});


vcpapp.run(function($rootScope, $location, AuthenticationService){
    var routesThatRequireAuth = [
//        '/user'
/*        '/site',
        '/download',
        '/store',
        '/report',
        '/articlelist',
        '/newarticle',
        '/article/:articleId'*/
    ];
//    var roles = ['public', 'reader', 'writer',  'editor', 'publisher','admin'];
    var  currentuserrole = 'publisher';

    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        // 限制登录后才能访问的页面
        if( !AuthenticationService.isLoggedIn()){
            if( _.contains(routesThatRequireAuth, $location.path()) ){
                $location.path('/');
            }
        }

        // 根据用户角色， 限制登录后才能访问的相应的页面
        var access = _.contains(next.access, currentuserrole );
        console.log( AuthenticationService.isLoggedIn(), access);
        if (!access) {
            $location.path('/');
        }

    });


    /*    var userRoles = {
     public: 1, // 000001
     reader: 2, // 000010
     writer: 4, // 000100
     editor: 8, // 001000
     publisher: 16 // 010000
     admin: 32 // 100000
     };
     var accessLevels = {
     public: userRoles.public | // 111
     userRoles.reader |
     userRoles.writer |
     userRoles.editor |
     userRoles.publisher,
     reader: userRoles.public, // 001
     publisher: userRoles.user | // 110
     userRoles.admin,
     admin: userRoles.admin // 100
     };*/

});

