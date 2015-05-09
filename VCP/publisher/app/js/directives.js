/**
 * Created with JetBrains WebStorm.
 * User: ywang
 * Date: 7/8/13
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

/* Directives */
angular.module('vcpmodule.directive', ['vcpmodule.service']);

angular.module('vcpmodule.directive').directive('enterKeypress', function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.bind("keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.enterKeypress);
                    });
                    event.preventDefault();
                }
            });
        }
    };
});


angular.module('vcpmodule.directive').directive('ckEditor', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;

            ck.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            });
      /*      ck.on('change', function(e) {
                $("#contentpreview").html(e.editor.getData());
            });*/

            ngModel.$render = function() {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});


angular.module('vcpmodule.directive').directive( 'pageHeader', function (SiteTemp, Headermenu, AuthenticationService) {
    return {
        scope: false,
        restrict:'EA',
        templateUrl:'publisheradmin/tpldirective/page_header.html',
        link: function ( scope, element, attrs ) {
            var maxmenu = Number(attrs.maxmenus);

            //判断超过菜单列表数量后不显示添加菜单按钮
            scope.checkShowHeaderAddButton = function(){
                if (scope.data.header.list.length >= maxmenu){
                    scope.css.header.addbutton = false;
                }else{
                    scope.css.header.addbutton = true;
                }
            };

            scope.getSiteData = function(){
                SiteTemp.getSite(AuthenticationService.getSiteId()).then(function(data) {
                    scope.data.header.list.length = 0;
                    var j = 0;
                    //获取父菜单
                    for(var i = 0; i < data.headermenus.length; i++){
                        if(data.headermenus[i].parent_headermenu_id == 0){
                            scope.data.header.list[j] = data.headermenus[i];
                            j++;
                        }
                    }

                    //根据父级ID查询子菜单
                    for(var k = 0; k < scope.data.header.list.length; k++){
                        var m = 0;
                        scope.data.header.list[k].child =[];
                        for(var l = 0; l < data.headermenus.length; l++){
                            if(data.headermenus[l].parent_headermenu_id == scope.data.header.list[k].id){
                                scope.data.header.list[k].child[m] = data.headermenus[l];
                                m++;
                            }
                        }
                    }
                    scope.checkShowHeaderAddButton();
                });
            };

            scope.getSiteData();

            //显示一级菜单
            scope.showAddHeaderForm = function(){
                //初始化默认值
                scope.data.header.newmenu = {
                    name : "",
                    link_page_id : 101,
                    type : 10,             // 两种类型  10 表示站内链接到页面 ， 20 表示链接到站外连接
                    order : 10,
                    site_id : 1,
                    parent_headermenu_id : 0,
                    linkurl : ""
                };
                scope.css.header.addbutton = false;
                scope.css.header.addform = true;
                scope.css.header.addchildform = -1;
                scope.css.header.addchildbutton = -1;
                scope.css.header.editform = -1;
                scope.css.header.childeditform = -1;
                scope.css.header.headernamevalid = false;
                scope.css.header.headerotherurlvalid = false;
            }

            //显示二级菜单
            scope.showAddHeaderChildForm = function(parentid,indexid){
                //初始化默认值
                scope.data.header.newchildmenu = {
                    name : "",
                    link_page_id : 101,
                    type : 10,             // 两种类型  10 表示站内链接到页面 ， 20 表示链接到站外连接
                    order : 10,
                    site_id : 1,
                    parent_headermenu_id : parentid,
                    linkurl : ""
                };
                scope.css.header.addchildbutton = indexid;
                scope.css.header.addchildform = indexid;
                scope.css.header.addbutton = true;
                scope.css.header.addform = false;
                scope.css.header.editform = -1;
                scope.css.header.childeditform = -1;
                scope.css.header.childnamevalid = false;
                scope.css.header.childotherurlvalid = false;
            }

            //隐藏二级菜单form
            scope.hideAddHeaderChildForm = function(){
                scope.css.header.addchildform = -1;
                scope.css.header.addchildbutton = -1;
            }

            //隐藏添加header form
            scope.hideAddHeaderForm = function(){
                scope.css.header.addbutton = true;
                scope.css.header.addform  = false;
            };

            //新增header nav
            scope.saveAddHeaderForm = function(){
                if(scope.data.header.newmenu.name == undefined || scope.data.header.newmenu.name == ''){
                    scope.css.header.headernamevalid = true;
                    scope.css.header.headerotherurlvalid =false;
                }else{
                    if(scope.data.header.newmenu.type == 20){
                        scope.css.header.headernamevalid = false;
                        if(scope.data.header.newmenu.linkurl == undefined || scope.data.header.newmenu.linkurl == ''){
                            scope.css.header.headerotherurlvalid = true;
                            return;
                        }
                    }
                    //判断headermenu 类型
                    if(scope.data.header.newmenu.type == 20){
                        scope.data.header.newmenu.link_page_id = 0;
                    }else{
                        scope.data.header.newmenu.linkedurl = '';
                    }
                    Headermenu.save(scope.data.header.newmenu ,function(){
                        SiteTemp.getSite(AuthenticationService.getSiteId()).then(function(data) {
                            scope.getSiteData();
                        });
                    });
                    scope.css.header.headernamevalid = false;
                    scope.css.header.headerotherurlvalid =false;
                    scope.hideAddHeaderForm();
                }
            };

            //新增header child nav
            scope.saveAddHeaderChildForm = function(){
                if(scope.data.header.newchildmenu.name == undefined || scope.data.header.newchildmenu.name == ''){
                    scope.css.header.childnamevalid = true;
                    scope.css.header.childotherurlvalid =false;
                }else{
                    if(scope.data.header.newchildmenu.type == 20){
                        scope.css.header.childnamevalid = false;
                        if(scope.data.header.newchildmenu.linkurl == undefined || scope.data.header.newchildmenu.linkurl == ''){
                            scope.css.header.childotherurlvalid = true;
                            return;
                        }
                    }
                    //判断headermenu 类型
                    if(scope.data.header.newchildmenu.type == 20){
                        scope.data.header.newchildmenu.link_page_id = 0;
                    }else{
                        scope.data.header.newchildmenu.linkedurl = '';
                    }
                    Headermenu.save(scope.data.header.newchildmenu ,function(){
                        SiteTemp.getSite(AuthenticationService.getSiteId()).then(function(data) {
                            scope.getSiteData();
                        });
                    });
                    scope.hideAddHeaderChildForm();
                    scope.css.header.childnamevalid = false;
                    scope.css.header.childotherurlvalid =false;
                }
            }

            //显示修改header edit
            scope.showEditHeaderForm = function(indexid){
                scope.css.header.editform = indexid;
                scope.css.header.childeditform = -1;
                scope.hideAddHeaderForm();
                scope.css.header.addchildform = -1;
                scope.css.header.addchildbutton = -1;
                scope.css.header.headereditnamevalid = false;
                scope.css.header.headereditotherurlvalid = false;
                scope.css.header.deletewarn = false;
            };

            //显示修改header child edit
            scope.showEditChildForm = function(indexid){
                 scope.css.header.editform = -1;
                 scope.css.header.childeditform = indexid;
                 scope.css.header.addchildbutton = -1;
                 scope.css.header.addchildform = -1;
                 scope.hideAddHeaderForm();
                scope.css.header.childeditnamevalid = false;
                scope.css.header.childeditotherurlvalid = false;
            }

            //隐藏修改header edit
            scope.hideEditChildForm = function(){
                scope.css.header.childeditform = -1;
            }

            //隐藏修改header edit
            scope.hideEditHeaderForm = function(){
                scope.css.header.editform = -1;
            };

            //修改保存header edit
            scope.updateHeaderForm = function(currentmenu){
                if(currentmenu.name == undefined || currentmenu.name == ''){
                    scope.css.header.headereditnamevalid = true;
                    scope.css.header.headereditotherurlvalid =false;
                }else{
                    if(currentmenu.type == 20){
                        scope.css.header.headereditnamevalid = false;
                        if(currentmenu.linkurl == undefined || currentmenu.linkurl == ''){
                            scope.css.header.headereditotherurlvalid = true;
                            return;
                        }
                    }
                    //初始化默认值
                    scope.data.header.editmenu = {
                        name : currentmenu.name,
                        link_page_id : currentmenu.link_page_id,
                        type : currentmenu.type,             // 两种类型  10 表示站内链接到页面 ， 20 表示链接到站外连接
                        order : currentmenu.order,
                        parent_headermenu_id : currentmenu.parent_headermenu_id,
                        site_id : 1,
                        linkurl : currentmenu.linkurl
                    };
                    //判断footermenu 类型
                    if(currentmenu.type == 20){
                        scope.data.header.editmenu.link_page_id = 101;
                    }else{
                        scope.data.header.editmenu.linkurl = '';
                    }
                    Headermenu.update({Id:currentmenu.id}, scope.data.header.editmenu, function(){
                        scope.css.header.headereditnamevalid = false;
                        scope.css.header.headereditotherurlvalid = false;
                        scope.hideEditHeaderForm();
                    });
                }
            };

            //修改保存header child edit
            scope.updateChildForm = function(currentmenu){
                if(currentmenu.name == undefined || currentmenu.name == ''){
                    scope.css.header.childeditnamevalid = true;
                    scope.css.header.childeditotherurlvalid =false;
                }else{
                    if(currentmenu.type == 20){
                        scope.css.header.childeditnamevalid = false;
                        if(currentmenu.linkurl == undefined || currentmenu.linkurl == ''){
                            scope.css.header.childeditotherurlvalid = true;
                            return;
                        }
                    }
                     //初始化默认值
                     scope.data.header.editchildmenu = {
                         name : currentmenu.name,
                         link_page_id : currentmenu.link_page_id,
                         type : currentmenu.type,             // 两种类型  10 表示站内链接到页面 ， 20 表示链接到站外连接
                         order : currentmenu.order,
                         parent_headermenu_id : currentmenu.parent_headermenu_id,
                         site_id : 1,
                         linkurl : currentmenu.linkurl
                     };
                     //判断footermenu 类型
                     if(currentmenu.type == 20){
                        scope.data.header.editchildmenu.link_page_id = 101;
                     }else{
                        scope.data.header.editchildmenu.linkurl = '';
                     }
                    Headermenu.update({Id:currentmenu.id}, scope.data.header.editchildmenu, function(){
                        scope.hideEditChildForm();
                     });
                }
            };

            //删除header nav
            scope.deleteHeadermenu = function(head, indexid){
                if(head.child.length > 0){
                     scope.css.header.deletewarn = true;
                }else{
                    Headermenu.delete({Id:head.id}, function(){
                         scope.data.header.list.splice(indexid ,1);
                         scope.hideEditHeaderForm();
                     });
                }
            };

            //删除header child nav
            scope.deleteChildmenu = function(child, indexid){
                Headermenu.delete({Id:child.id}, function(){
                    scope.getSiteData();
                    scope.hideEditChildForm();
                });
            }
        }
    }
});

angular.module('vcpmodule.directive').directive('pageNav', function(AuthenticationService){
    return {
        scope: {},
        restrict:'EA',
        templateUrl:'publisheradmin/tpldirective/page_nav.html',
        link: function ( scope, element, attrs ) {
            scope.currentmenu = attrs.current;
            scope.logout = function(){
                AuthenticationService.logout().success(function(data, status, headers, config){
                }).error(function(data, status, headers, config) { });
            };
        }
    }
})

angular.module('vcpmodule.directive').directive( 'pageFooter', function (SiteTemp, Footermenu, AuthenticationService) {
    return {
        scope: false,
        restrict:'EA',
        templateUrl:'publisheradmin/tpldirective/page_footer.html',
        link: function ( scope, element, attrs ) {
            var maxmenu = Number(attrs.maxmenus);

            //判断超过菜单列表数量后不显示添加菜单按钮
            scope.checkShowAddButton = function(){
                if (scope.data.footer.list.length >= maxmenu){
                    scope.css.footer.addbutton = false;
                }else{
                    scope.css.footer.addbutton = true;
                }
            };

            SiteTemp.getSite(AuthenticationService.getSiteId()).then(function(data) {
                scope.data.footer.list = data.footermenus;
                scope.checkShowAddButton();
            });

            //显示添加footer form
            scope.showAddFooterForm = function(){
                //初始化默认值
                scope.data.footer.newmenu = {
                    name : "",
                    link_page_id : 101,
                    type : 10,             // 两种类型  10 表示站内链接到页面 ， 20 表示链接到站外连接
                    order : 10,
                    site_id : 1,
                    linkurl : ""
                };
                scope.css.footer.footernamevalid = false;
                scope.css.footer.footerotherurlvalid =false;
                scope.css.footer.addbutton = false;
                scope.css.footer.addform = true;
                scope.hideEditFooterForm();
            };

            //隐藏添加footer form
            scope.hideAddFooterForm = function(){
                scope.css.footer.addbutton = true;
                scope.css.footer.addform  = false;
            };

            //新增footer nav
            scope.saveAddFooterForm = function(){
                if(scope.data.footer.newmenu.name == undefined || scope.data.footer.newmenu.name == ''){
                    scope.css.footer.footernamevalid = true;
                    scope.css.footer.footerotherurlvalid =false;
                }else{
                    if(scope.data.footer.newmenu.type == 20){
                        scope.css.footer.footernamevalid = false;
                        if(scope.data.footer.newmenu.linkurl == undefined || scope.data.footer.newmenu.linkurl == ''){
                            scope.css.footer.footerotherurlvalid = true;
                            return;
                        }
                    }
                    //判断footermenu 类型
                    if(scope.data.footer.newmenu.type == 20){
                        scope.data.footer.newmenu.link_page_id = 101;
                    }else{
                        scope.data.footer.newmenu.linkedurl = '';
                    }

                    Footermenu.save(scope.data.footer.newmenu, function(){
                        SiteTemp.getSite(AuthenticationService.getSiteId()).then(function(data) {
                            scope.data.footer.list = data.footermenus;
                            scope.checkShowAddButton();
                        });
                    });
                    scope.hideAddFooterForm();
                }
            };

            //显示修改footer edit
            scope.showEditFooterForm = function(indexid){
                scope.css.footer.editform = indexid;
                scope.css.footer.footereditnamevalid = false;
                scope.css.footer.footereditotherurlvalid = false;
                scope.hideAddFooterForm();
            };

            //隐藏修改footer edit
            scope.hideEditFooterForm = function(){
                scope.css.footer.editform = -1;
            };

            //修改保存footer edit
            scope.updateFooterForm = function(currentmenu){
                if(currentmenu.name == undefined || currentmenu.name == ''){
                    scope.css.footer.footereditnamevalid = true;
                    scope.css.footer.footereditotherurlvalid = false;
                }else{
                    if(currentmenu.type == 20){
                        scope.css.footer.footereditnamevalid = false;
                        if(currentmenu.linkurl == undefined || currentmenu.linkurl == ''){
                            scope.css.footer.footereditotherurlvalid = true;
                            return;
                        }
                    }


                    //初始化默认值
                    scope.data.footer.editmenu = {
                        name : currentmenu.name,
                        link_page_id : currentmenu.link_page_id,
                        type : currentmenu.type,             // 两种类型  10 表示站内链接到页面 ， 20 表示链接到站外连接
                        order : currentmenu.order,
                        site_id : 1,
                        linkurl : currentmenu.linkurl
                    };
                    //判断footermenu 类型
                    if(currentmenu.type == 20){
                        scope.data.footer.editmenu.link_page_id = 101;
                    }else{
                        scope.data.footer.editmenu.linkurl = '';
                    }
                    Footermenu.update({Id:currentmenu.id}, scope.data.footer.editmenu, function(){
                        scope.hideEditFooterForm();
                    });
                }
            };


            //删除footer navmenu
            scope.deleteFootermenu = function(footermenu, indexid){
                Footermenu.delete({Id:footermenu.id}, function(){
                    scope.data.footer.list.splice(indexid ,1);
                    scope.hideEditFooterForm();
                });
            }
        }
    };
});

