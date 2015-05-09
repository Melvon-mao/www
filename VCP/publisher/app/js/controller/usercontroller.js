'use strict';


/* Controllers */
angular.module('vcpmodule').controller('userLoginController', function($scope, $location, $timeout, Site, AuthenticationService) {

    $scope.userdata = {
        username : '',
        password : '',
        rememberusername : false
    };
    $scope.css = {loginprompt: false};

    //登录
    $scope.userlogin = function(callback){
        if (callback.$valid) {
            AuthenticationService.login($scope.userdata).success(function(data, status, headers, config){
                $scope.css.loginprompt = false;
                $location.path('/user');
            }).error(function(data, status, headers, config) {
                $scope.css.loginprompt = true;
            });
        }
    }
});






angular.module('vcpmodule').controller('userRegisterController', function($scope, $location, $timeout, User, UserCheck) {
    $scope.userdata = {
        username : '',
        email : '',
        password1 : '',
        password2 : ''
    };

    $scope.css = {
        errorwarn : -1 // 错误提示框
    };

    //用户注册
    $scope.createNewUser = function(callback){
        $scope.css.errorwarn = -1;
       if($scope.userdata.username == undefined || $scope.userdata.username == ""){
           $scope.css.errorwarn = 1;
       }else if($scope.userdata.username.length < 3){
           $scope.css.errorwarn = 5;
       }else if($scope.userdata.username.length > 18){
           $scope.css.errorwarn = 6;
       }else if($scope.userdata.email == undefined || $scope.userdata.email == ""){
           $scope.css.errorwarn = 2;
       }else if($scope.userdata.password1 == undefined || $scope.userdata.password1 ==""){
           $scope.css.errorwarn = 3;
       }else if($scope.userdata.password1.length < 6){
           $scope.css.errorwarn = 7;
       }else if($scope.userdata.password1.length > 18){
           $scope.css.errorwarn = 8;
       }else if($scope.userdata.password1 !== $scope.userdata.password2){
           $scope.css.errorwarn = 4;
       }else{
           UserCheck.checkUsername({username : $scope.userdata.username}).success(function(data, status, headers, config) {
               $scope.css.errorwarn = -1;

               UserCheck.checkUseremail({email: $scope.userdata.email}).success(function(data, status, headers, config) {
                   $scope.css.errorwarn = -1;
                   var newuser = {
                       username : $scope.userdata.username,
                       email : $scope.userdata.email,
                       password : $scope.userdata.password1
                   };
                   User.save(newuser, function(data){
                   });

                   $timeout(function() {
                       $location.path("/");
                   }, 500);

               }).error(function(data, status, headers, config) {
                   $scope.css.errorwarn = 10;
               });
           }).error(function(data, status, headers, config) {
               $scope.css.errorwarn = 9;
           });

       }
    }
});



angular.module('vcpmodule').controller('userInfoController', function($scope, $location,  User, AuthenticationService) {

    $scope.css = {
        user : {
            firstnamewarn : -1, //firstname非空提示
            lastnamewarn : -1,  //lastname非空提示
            pwdwarn : -1,  //密码出错提示
            showuserinfobox : 1  //显示user info 页面
        },
        haveavatar : false

    };
    $scope.userdata ={
        id : -1,
        firstname : '',
        lastname : '',
        mobilenumber : '',
        email : '',
        oldpassword : '',
        newpassword1 : '',
        newpassword2 : '',
        gender : -1
    };
    //console.log(AuthenticationService.currentUser());
    User.get({Id: AuthenticationService.getUserId() }, function(data){
        $scope.userdata = {
            id : data.id,
            firstname : data.firstname,
            lastname : data.lastname,
            mobilephone : data.mobilephone,
            email : data.email,
            gender : data.gender
        };
//        console.log($scope.userdata, data);
    });






    //show user选中的页面
    $scope.showInfo = function(index){
        $scope.css.user.showuserinfobox = index.toString();
    };


    //保存用户基本信息
    $scope.saveuserinfo = function(callback){
        $scope.css.user.firstnamewarn = -1;
        $scope.css.user.lastnamewarn = -1;
        if($scope.userdata.firstname == undefined || $scope.userdata.firstname == ''){
            $scope.css.user.firstnamewarn = 1;
        }else if($scope.userdata.lastname == undefined || $scope.userdata.lastname == ''){
            $scope.css.user.lastnamewarn = 1;
        }else{
            User.update($scope.userdata, function(pagedata){
                $scope.userdata = pagedata;
            });
        }
    };



    $scope.modifypassword = function(){
        $scope.css.user.pwdwarn = -1;
        if($scope.userdata.oldpassword == '' || $scope.userdata.oldpassword == undefined){
            $scope.css.user.pwdwarn = 1;
        }else if($scope.userdata.newpassword1 == '' || $scope.userdata.newpassword1 == undefined){
            $scope.css.user.pwdwarn = 2;
        }else if($scope.userdata.newpassword1.length < 6){
            $scope.css.user.pwdwarn = 4;
        }else if($scope.userdata.newpassword1 !== $scope.userdata.newpassword2){
            $scope.css.user.pwdwarn = 3;
        }else{
            $scope.userInfo ={
                oldpassword : $scope.userdata.oldpassword,
                password :  $scope.userdata.newpassword2
            };
            User.update($scope.userInfo, function(pagedata){
                if(pagedata.status == 409){
                    $scope.css.user.pwdwarn = 1;
                }
            });
        }
    };


/*    $scope.logout = function(){
        AuthenticationService.logout().success(function(data, status, headers, config){

        }).error(function(data, status, headers, config) {

        });
    };*/
});