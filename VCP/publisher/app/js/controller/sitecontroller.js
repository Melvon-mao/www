'use strict';


/* Controllers */

angular.module('vcpmodule').controller('siteController', function($scope, $location, AuthenticationService, Site, SystemTheme) {
     $scope.css ={
          app: true, //显示site form
          theme : false, //显示theme form
          logo: false, //显示logo form
          workflow : false, //显示workflow form
          namevalid : false, //name非空验证
          domainvalid : false, //domian非空验证
          metavalid : false, //meta非空验证
          themeindex : 0 //选中theme index
     };

    $scope.hidevalid = function(){
        $scope.css.namevalid = false;
        $scope.css.domainvalid = false;
        $scope.css.metavalid = false;
    };

    SystemTheme.query().$then(function(data){
        if(data.data.status == 202){
            $scope.themeData = [];
        }else{
            $scope.themeData = data.data;
        }
    });

    var siteid = AuthenticationService.getSiteId();
    Site.get({Id:siteid}, function(data){
        $scope.siteinfodata = data;
       // $("#layoutcss").attr("href",$scope.themeData.cssfilepath);
    });

    //选中theme
    $scope.selectThemeIndex = function(themeindex){
        $scope.css.themeindex = themeindex;
        $scope.siteinfodata.system_theme_id = themeindex;
        Site.update({Id:siteid}, $scope.siteinfodata, function(){
            //console.log($scope.siteinfodata);
        });
    };

    //保存site信息
    $scope.saveSiteInfo = function(){
        if($scope.siteinfodata.name == "" || $scope.siteinfodata.name == undefined){
            $scope.hidevalid();
            $scope.css.namevalid = true;
        }else if($scope.siteinfodata.domain == "" || $scope.siteinfodata.domain == undefined){
            $scope.hidevalid();
            $scope.css.domainvalid = true;
        }else if($scope.siteinfodata.meta == "" || $scope.siteinfodata.meta == undefined){
            $scope.hidevalid();
            $scope.css.metavalid = true;
        }else{
            Site.update({Id:siteid}, $scope.siteinfodata, function(){
                $scope.hidevalid();
                $scope.css.app = false;
                $scope.css.theme = true;
                $scope.css.logo = false;
                $scope.css.workflow = false;
            });
        }
    };


    //保存theme信息
    $scope.saveTheme = function(){
        $scope.css.app = false;
        $scope.css.theme = false;
        $scope.css.logo = true;
        $scope.css.workflow = false;
    };

    //保存logo信息
    $scope.saveLogo = function(){
        $scope.css.app = false;
        $scope.css.theme = false;
        $scope.css.logo = false;
        $scope.css.workflow = true;
    };

    //保存workflow
    $scope.saveWorkFlow = function(){
        Site.update({Id:siteid}, $scope.siteinfodata, function(){
            $scope.css.app = false;
            $scope.css.theme = false;
            $scope.css.logo = false;
            $scope.css.workflow = false;
            $location.path('/page');
        });
    };

    //显示Site Data
    $scope.showSiteForm = function(){
        $scope.css.app = true;
        $scope.css.theme = false;
        $scope.css.logo = false;
        $scope.css.workflow = false;
    };

    //显示Theme form
    $scope.showThemeForm = function(){
        $scope.css.app = false;
        $scope.css.theme = true;
        $scope.css.logo = false;
        $scope.css.workflow = false;
    };

    //显示Logo form
    $scope.showLogoForm = function(){
        $scope.css.app = false;
        $scope.css.theme = false;
        $scope.css.logo = true;
        $scope.css.workflow = false;
    };

    //显示Workflow form
    $scope.showWorkflow = function(){
        $scope.css.app = false;
        $scope.css.theme = false;
        $scope.css.logo = false;
        $scope.css.workflow = true;
    };

    $scope.changeWorkFlow = function(num){
        $scope.siteinfodata.workflow = num;
    };

   /* var url = "https://vcplatform.firebaseIO.com/siteinfo";
    var promise = angularFire(url, $scope, 'siteinfoFirebase', {});

//    $scope.site = modelSite.getSite();    // use firebase for database
    $scope.selectpublish = false;
    $scope.selectone = false;
    $scope.selectcomplex = false;
    $scope.selectlogo = false;
    $scope.selectwebicon = false;


    $scope.clickpublish = function(){
        $scope.selectpublish = true;
        $scope.selectone = false;
        $scope.selectcomplex = false;
    };

    $scope.clickone = function(){
        $scope.selectpublish = false;
        $scope.selectone = true;
        $scope.selectcomplex = false;
    };

    $scope.clickcomplex = function(){
        $scope.selectpublish = false;
        $scope.selectone = false;
        $scope.selectcomplex = true;
    };

    promise.then(function() {
        $scope.siteinfodata = {
            name : $scope.siteinfoFirebase.name,
            domain : $scope.siteinfoFirebase.domain,
            meta : $scope.siteinfoFirebase.meta,
            type : $scope.siteinfoFirebase.type,
            rssapi : $scope.siteinfoFirebase.rssapi
        };

        $scope.savesiteinfo = function(callback){
            if (callback.$valid) {
                $scope.siteinfoFirebase = {
                    name : $scope.siteinfodata.name,
                    domain : $scope.siteinfodata.domain,
                    meta : $scope.siteinfodata.meta,
                    type : $scope.siteinfodata.type,
                    rssapi : $scope.siteinfodata.rssapi
                };
//            modelSite.saveSiteInfo($scope.siteinfodata);   // use firebase for database
            }
        }
    })*/
});