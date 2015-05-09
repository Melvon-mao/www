'use strict';

/* Controllers */

angular.module('vcpmodule').controller('pageListController', function($scope, $location, $http, $q, Site, Page, SystemPreset, SystemLayout, Block, SystemBlockLayouts, AuthenticationService) {

    $scope.current =  {
        page : {},
        layout : {},
        rowpanel : {},
        column : {},
        block : {}
    };

    $('#tagsinput').tagsInput();

    $scope.newpage ={
        name : '',
        type : 50,
        order : 100,
        system_layout_id : 1,
        site_id : 0
    };

    $scope.newblock = {
        blockid : 100,
        blocktype : 'auto',
        blockstatictype : '',
        blocktitle : "title1",
        blockname : "",
        blocklayout : 10,
        blockquantity : 6,
        blocktag : [],
        blockcategory : 'All',
        blocksortby : 'bydate',
        apiurl : "",
        adsname : "",
        adscode : ""
    };

    $scope.newarticle = undefined;


    $scope.css = {
        header : {
            menuhavadata : false,
            menubutton : false,
            headersetting : false,
            headerthemeindex : -1,
            addform : false,
            editform : -1,//修改edit按钮
            addbutton : false,  //添加header parent menu的按钮
            addchildbutton : -1, //添加header child menu的按钮
            addchildform : -1, //显示添加header child form
            childeditform : -1,
            headernamevalid : false, //add header name 非空验证
            headerotherurlvalid : false, //add header other url非空验证
            headereditnamevalid : false, //edit header name 非空验证
            headereditotherurlvalid : false, //edit header other url非空验证
            childnamevalid : false, //add child name 非空验证
            childotherurlvalid : false, //add header other url非空验证
            childeditnamevalid : false,  //edit child name 非空验证
            childeditotherurlvalid : false,  //edit child other url非空验证
            deletewarn : false  //header nav 删除提示
        },
        footer : {
            menuhavadata : false,
            footerthemeindex : -1,
            menubutton : false,  //显示footer 面板右上角按钮
            navsetting : false,    //显示footer 增加修改面板
            editform : -1,  //添加footermenu的表单
            addform : false,  //添加footermenu的表单
            addbutton : false,  //添加footermenu的按钮
            footernamevalid : false,   //add child name 非空验证
            footerotherurlvalid : false, //add child url 非空验证
            footereditnamevalid : false,  //edit child name 非空验证
            footereditotherurlvalid : false  //edit child name 非空验证
        },
        page : {
            addinputbox : false       //添加page的输入框默认不显示
        }
    };

    $scope.data = {
        header : {
            list : [],
            newmenu : {},
            editmenu : {},
            editchildmenu : {}
        },
        footer : {
            list : {},
            newmenu : {},
            editmenu : {}
        }
    };




    //初始化
    SystemBlockLayouts.query(function(blocklayoutdata){
        $scope.blocklayouts = blocklayoutdata;

    });

    SystemLayout.query(function(layoutdata){
        $scope.layouts = layoutdata;
    });

    Site.get({Id:AuthenticationService.getSiteId() }, function(sitedata){
        $scope.sitedata = sitedata;

        var temppages = angular.copy(sitedata.pages);
        _.each(temppages, function(page){
            // 过滤掉header footer 模板. Template类型:  100 header  200 footer  300 panel  400 column  500 block

            var panels = _.filter(page.layout.systemPanels, function(panel){
                return panel.systemPanelTemplate.type == 300;
            });
            page.rowpanels = panels;
        });
        $scope.pages = temppages;
        console.log(temppages);


        $scope.current.page =  $scope.pages[0];   //默认读取首页

        //获取选中的header theme
        $scope.css.header.headerthemeindex = $scope.sitedata.config.headerthemeindex; //显示选中的 header theme
        if ($scope.css.header.headerthemeindex == -1){
            $scope.css.header.menuhavadata = false;
        }else{
            $scope.css.header.menuhavadata = true;
        }

        $scope.css.footer.footerthemeindex = $scope.sitedata.config.footerthemeindex; //显示选中的 footer theme
        if ($scope.css.footer.footerthemeindex == -1){
            //$scope.css.header.footerthemeindex = -1;
            $scope.css.footer.menuhavadata = false;
        }else{
            //$scope.css.header.footerthemeindex = $scope.get_footertheme;
            $scope.css.footer.menuhavadata = true;
        }



        $scope.pagearticletype = SystemPreset.defaultsettings.PageArticleTypeId;    // left menu default selected page
        $scope.pagefilterarticle = SystemPreset.defaultsettings.pagefilterArticleType;  //Article Type Page
        $scope.pagefilterlist = SystemPreset.defaultsettings.pagefilterListType;         //List Type Page
        $scope.layoutfilterlisttype = SystemPreset.defaultsettings.layoutfilterType;
        $scope.defaultselectedpageindex = SystemPreset.defaultsettings.SelectedPageIndex;    // left menu default selected page


        $("#layoutcss").attr("href",$scope.sitedata.theme.css_file_path);

    });

    function fireBaseGetArticlesByTags (taglistdata, blockcategory, quantity) {
        var articlesresultunion = [];
        var articlesresultfinal = [];

        var articlesresulttag = [];
        var articlesresultcategory = [];

        var articlelist = $scope.articlesFirebase;

        if(blockcategory !== 'All'){
            articlesresultcategory = _.filter(articlelist, function(aritcle){
                if (aritcle.category == blockcategory){
                    return true
                }
            });
        }else{
            articlesresultcategory = articlelist;
        }

        articlesresulttag = _.filter(articlesresultcategory, function(aritcle){
            var singlearticletags = _.filter(aritcle.tags, function(singletag){
                var tagresult = _.where(taglistdata, {tagname: singletag.tagname});
                return tagresult.length;
            });
            return  singlearticletags.length;
        });



//        articlesresultunion = _.union(articlesresulttag, articlesresultcategory);
        articlesresultfinal = _.where(articlesresulttag, {status: "Published"});

        if(articlesresultfinal.length > quantity){
            articlesresultfinal.splice(0, articlesresultfinal.length - quantity);    //判断文章数量
        }


        articlesresultfinal = _.sortBy(articlesresultfinal, function(article){ return -article.updated });

        return articlesresultfinal;
    }



    //载入所有block的文章
    /*        for (var i= $scope.pages.length-1; i>=0; i--)
     {
     for (var j = $scope.pages[i].pagelayoutdata.length-1; j>=0; j--)
     {
     if(typeof($scope.pages[i].pagelayoutdata[j].blocks) == "undefined"  ){
     }
     else{
     for (var k = $scope.pages[i].pagelayoutdata[j].blocks.length-1; k>=0; k--)
     {
     if($scope.pages[i].pagelayoutdata[j].blocks[k].blocktype == 'auto'){
     var articlesdata = fireBaseGetArticlesByTags($scope.pages[i].pagelayoutdata[j].blocks[k].blocktag,  $scope.pages[i].pagelayoutdata[j].blocks[k].blockcategory, $scope.pages[i].pagelayoutdata[j].blocks[k].blockquantity);
     $scope.pages[i].pagelayoutdata[j].blocks[k].blockarticles = articlesdata;

     //                            console.log(articlesdata, $scope.pages[i].pagelayoutdata[j].blocks[k].blocktag, $scope.pages[i].pagelayoutdata[j].blocks[k].blockquantity );

     }
     }
     }
     }
     }*/

//        $scope.localarticles = $scope.articlesFirebase;    // Use FireBase














    //保存footertheme
    $scope.clickfootertheme = function(index){
        $scope.site.footerthemeindex = index;
        Site.update({Id:1}, $scope.site, function(){
            $scope.css.footer.footerthemeindex = index;
        });
    };

    //保存headertheme
    $scope.clickheadertheme = function(index){
        $scope.site.headerthemeindex = index;
        Site.update({Id:1}, $scope.site, function(){
            $scope.css.header.headerthemeindex = index;
        });
    };

    $scope.csseditfooterform = false;
	// The default page is entered, the display animation
	$scope.cssloading = true; //Block Loading GIF
    $scope.cssloading = false;  //Block Loading GIF







    //$scope.selectedpageattributeindex = -1;    //默认隐藏所有page的属性面板
    $scope.selectedpageblockindex = -1;




    $scope.cssblocktipadd = false;      //点击当前添加block按钮显示对应block类型菜单
    $scope.cssblocktipedit = false;      //点击当前编辑block按钮显示对应block类型菜单

    $scope.cssblockeditmenuinputbox = false;   //点击当前编辑block的 要输入推荐文章的输入框
    $scope.cssblockeditmenubutton = false;     //点击当前编辑block的 设置的按钮












    // show Block MouseOver Menu Button
    $scope.showeditblockmenubutton= function(panelrow, column, block) {
        $scope.current.rowpanel = panelrow ;
        $scope.current.column = column ;
        $scope.current.block = block ;

        console.log($scope.current);
        this.cssblockeditmenubutton = true;
    };
    $scope.hideeditblockmenubutton = function() {
        this.cssblockeditmenubutton = false;
        this.cssblockeditmenuinputbox = false;
    };

    $scope.showarticleinput = function(){
        this.cssblockeditmenuinputbox = true;
    };
    $scope.showblocksetting = function(){
        this.cssblockeditmenubutton = false;
    };
    $scope.moveblock = function(){
        this.cssblockeditmenubutton = false;
    };
    $scope.delblock = function(){
        this.cssblockeditmenubutton = false;
    };

    //show add New Blocks Menu BOX
    $scope.showcontenticon = false;//是否显示centent icon
    $scope.showaddblockmenubutton = function(column, panelrow) {

        this.cssblockaddmenubutton = true;
        if(this.showautoblockstyle || this.showeditorblockstyle || this.showrssblockstyle){
            this.showcontenticon = false;
        }else{
            this.showcontenticon = true;
        }
    };


    $scope.hideaddblockmenubutton = function() {
        if(this.showautoblockstyle || this.showeditorblockstyle || this.showrssblockstyle){
            this.cssblockaddmenubutton = true;
        }else{
            this.cssblockaddmenubutton = false;
        }
        if(this.showstaticblockstyle || this.showadblockstyle){
            this.cssblockaddmenubutton = true;
            this.showcontenticon = true;
        }else{
            this.showcontenticon = false;
        }
        this.cssblocktipadd = ''; //移除block图标选中的样式
    };

    //关闭Auto block弹出框
    $scope.closeautoblock = function() {
        copythis.showautoblockstyle = false;
        $scope.cssblocktipbox = '';
    }
    //关闭editor block
    $scope.closeeditorblock = function(){
        copythis.showeditorblockstyle = false;
        $scope.cssblocktipbox = '';
    }
    //关闭rss block
    $scope.closerssblock = function(){
        copythis.showrssblockstyle = false;
        $scope.cssblocktipbox = '';
    }
    //关闭static block
    $scope.closestaticblock = function(){
        copythis.showstaticblockstyle = false;
        $scope.cssblocktipbox = '';
    }
    //关闭ad block
    $scope.closeadblock = function(){
        copythis.showadblockstyle = false;
        $scope.cssblocktipbox = '';
    }

    $scope.showautoblockstyle = false;
    $scope.showeditorblockstyle = false;
    $scope.showrssblockstyle = false;
    $scope.showstaticblockstyle = false;
    $scope.showadblockstyle = false;
    var copythis = '';
    $scope.showblocksettingmenu = function( blocktype, event1, column, rowpanel ) {
        $scope.selectblockicon = 0;
        $scope.autoblocklayout = 100;
        $scope.selecteditorblockicon = 0;
        $scope.autoeditorblocklayout = 100;
        $scope.selectrssblockicon = 1;
        $scope.rsseditorblocklayout = 101;
        $scope.newblock.blockname = '';
        if(copythis !== ''){
             copythis.showautoblockstyle = false;
             copythis.showeditorblockstyle = false;
             copythis.showrssblockstyle = false;
             copythis.showstaticblockstyle = false;
             copythis.showadblockstyle = false;
             copythis.cssblockaddmenubutton = false;
             copythis.showcontenticon = false;
        }
        this.cssblocktipadd = false;      //点击当前block按钮显示对应block类型菜单
        $scope.cssblocktipbox = false;
        copythis = this;

        $scope.current.rowpanel = rowpanel ;
        $scope.current.column = column ;

        this.showautoblockstyle = false;
        this.showeditorblockstyle = false;
        this.showrssblockstyle = false;
        switch(blocktype)
        {
            case 'auto':
                this.cssblocktipadd = blocktype;      //点击当前block按钮显示对应block类型菜单
                $scope.cssblocktipbox = blocktype;
                this.showautoblockstyle = true;
                this.cssblockaddmenubutton = true;
                this.showcontenticon = false;
                break;
            case 'editor':
                this.cssblocktipadd = blocktype;      //点击当前block按钮显示对应block类型菜单
                $scope.cssblocktipbox = blocktype;
                this.showeditorblockstyle = true;
                this.cssblockaddmenubutton = true;
                this.showcontenticon = false;
                break;
            case 'static':
                this.cssblocktipadd = blocktype;      //点击当前block按钮显示对应block类型菜单
                $scope.cssblocktipbox = blocktype;
                this.cssblockaddmenubutton = true;
                this.showcontenticon = true;
                this.showstaticblockstyle = true;
                break;
            case 'ads':
                this.cssblocktipadd = blocktype;      //点击当前block按钮显示对应block类型菜单
                $scope.cssblocktipbox = blocktype;
                this.cssblockaddmenubutton = true;
                this.showcontenticon = true;
                this.showadblockstyle = true;
                break;
			case 'RSS':
                this.cssblocktipadd = blocktype;      //点击当前block按钮显示对应block类型菜单
                $scope.cssblocktipbox = blocktype;
                this.showrssblockstyle = true;
                this.cssblockaddmenubutton = true;
                this.showcontenticon = false;
                break;
            default:
        }


        var blockcontent = $(event1.target).parent().parent();     //获取id 为 blockcontent DIV .
        blockcontent.append($(".tip_box"));
        var blocktypemenu = $(".tip_"+ blocktype);     //获取样式名称拼接 .
        var left =  ( parseInt(blockcontent.width() ) - parseInt( blocktypemenu.width() ) )/2;
        blocktypemenu.css({"left":left+"px", "top":-(blocktypemenu.height()), "position":"absolute"});
    };

    $scope.clickblocklayouttab = function(event1, divid) {
        var heightdiff;
        switch(divid)
        {
            case 'tab-layout':
                heightdiff = 274;
                break;
            case 'tab-filter':
                heightdiff = 249;
                break;
            case 'tab-Sort':
                heightdiff = 101;
                break;
            default:
        }
        var blockcontent2 = $(event1.target).parent().parent().parent().parent().parent();    //获取id 为 blockcontent DIV .
        var blocktypemenu2 = $(".tip_auto");     //获取样式名称拼接
//        var heightdiff = 81 + $("#"+ divid ).height();
        blocktypemenu2.css({"top":-(heightdiff), "position":"absolute"});
//        console.log(blockcontent2.height(), blocktypemenu2.height(), heightdiff);
    };
    //默认选中layout icon
    $scope.selectblockicon = 0;
    $scope.autoblocklayout = 100;
    //选中layout图标事件
    $scope.selectlayout = function(index,blocklayout){
        $scope.selectblockicon = index;
        $scope.autoblocklayout = blocklayout;
    };


    $scope.selecteditorblockicon = 0;  //设定editor选中图标
    $scope.autoeditorblocklayout = 100;    //设定editor layout id

    //选中Editor layout图标事件
    $scope.selecteditorlayout = function(index,blocklayout){
        $scope.selecteditorblockicon = index;
        $scope.autoeditorblocklayout = blocklayout;
    };

    $scope.selectrssblockicon = 1;    //设定rss选中图标
    $scope.rsseditorblocklayout = 101; //设定rss layout id

    //选中RSS layout 图标事件
    $scope.selectrsslayout = function(index,blocklayout){
        $scope.selectrssblockicon = index;
        $scope.rsseditorblocklayout = blocklayout;
    };

    // add a block to page
    $scope.addblocktopage = function(blocktype, current, indexid, blocklayoutid ) {
        var newblock = {
            blocktype : 'auto',
            blockstatictype : '',
            blockname : "",
            blocklayout : blocklayoutid,
            blockquantity : 0,
            blocktag : [],
            blockcategory : 'All',
            blocksortby : 'date',
            blockarticles : [],
            apiurl : "",
            adsname : "",
            adscode : "" ,
            position : current.column.column,
            system_layout_panel_rel_id : current.rowpanel.id,
            page_layout_relation_id : $scope.current.page.pagelayoutrelation.id
        };


        switch(blocktype)
        {
            case 'auto':
                newblock.blocktype = 'auto';
                newblock.blockname = $scope.newblock.blockname;
                newblock.blockquantity = Number($scope.newblock.blockquantity);
                newblock.blockcategory = $scope.newblock.blockcategory;

                //检查Tags
                var temptagslistname = $(".tagsinput").exportTags();
                newblock.blocktag = temptagslistname;
  /*              for(var i=0;i<temptagslistname.length;i++){
                    //在tag 数据库查询是否是已经存在的tag
                    var newtag;

                }*/

                //通过Tags 获取文章

                this.showautoblockstyle = false;
                $scope.cssblocktipbox = '';
/*                if (temptagslistname.length == 0 || newblock.blockquantity == ''){
                    newblock.blockarticles = modelArticle.getArticles(newblock.blockquantity);
                }*/

                break;

            case 'editor':
                newblock.blocktype = 'editor';
                newblock.blockname = $scope.newblock.blockname;
                newblock.blockquantity = Number($scope.newblock.blockquantity);
                this.showeditorblockstyle = false;
                $scope.cssblocktipbox = '';
                break;

            case 'statictext':
                newblock.blocktype = 'static';
                newblock.blockstatictype = 'text';
                break;

            case 'staticpic':
                newblock.blocktype = 'static';
                newblock.blockstatictype = 'pic';
                break;

            case 'staticvideo':
                newblock.blocktype = 'static';
                newblock.blockstatictype = 'video';
                break;

            case 'staticslideshow':
                newblock.blocktype = 'static';
                newblock.blockstatictype = 'slideshow';
                break;


            case 'ads':
                newblock.blocktype = 'ads';
                newblock.adsname = $scope.newblock.adsname;
                newblock.adscode = $scope.newblock.adscode;
                break;

            case 'RSS':
                newblock.blocktype = 'RSS';
                newblock.blockname = $scope.newblock.blockname;
                newblock.urlapi = $scope.newblock.urlapi;
                this.showrssblockstyle = false;
                $scope.cssblocktipbox = '';
                break;

            default:
        }
        $(".container").prepend($(".tip_box")); //移动 Tip Box DOM , 防止因为刷新页面而丢失DOM

        Block.save(newblock, function(blockdata){

        });

            _.each($scope.pages, function(page){
                if(page.pageid == $scope.current.page.pageid){


                    _.each(page.pagelayoutdata, function(layout){
                        if(layout.layoutcontainerid == column.layoutcontainerid){

                            if(typeof(layout.blocks) == "undefined"  ){
                                layout.blocks = [];
                                layout.blocks.push(newblock);
                            }else{
                                layout.blocks.push(newblock);
                            }
//                            console.log(layout.blocks.length);
                        }
                    });
                    $scope.current.page = page;
                }
            });




//        addSingleBlockToPage(newblock, layoutcontainer, $scope.current.page );
        this.cssblocktipadd = false;          //点击当前block按钮显示对应block类型菜单
        $scope.cssblocktipbox = false;
    };

    $scope.addAritcleToEditorBlock = function(editorblock, column ){
        if(typeof(editorblock.blockarticles) == "undefined"  ){
            editorblock.blockarticles = [];
        }

        if(editorblock.blockarticles.length < editorblock.blockquantity){
            var newaritcle = this.newarticle;
//            Site.addArticleToBlock(newaritcle, block, layoutcontainer, $scope.current.page);
            _.each($scope.pages, function(page){
                if(page.pageid == $scope.current.page.pageid){

                    _.each(page.pagelayoutdata, function(layout){

                        if(layout.layoutcontainerid == layoutcontainer.layoutcontainerid){
                            _.each(layout.blocks, function(block){
                                if(block.blockid == editorblock.blockid){

                                    if(typeof(block.blockarticles) == "undefined"  ){
                                        block.blockarticles = [];

                                    }
                                    var alreadyhavethisarticle = [];
                                    alreadyhavethisarticle = _.where(block.blockarticles, {id: newaritcle.id});
                                    if(alreadyhavethisarticle.length == 0){
                                        block.blockarticles.push(angular.copy(newaritcle));
                                    }


                                }
                            });
                        }
                    });
                    $scope.current.page = page;

                }
            })
        }
    };

    // del a block to page
    $scope.delblock = function(current ) {
/*        _.each($scope.pages, function(page){
            if(page.pageid == $scope.current.page.pageid){
                _.each(page.pagelayoutdata, function(layout){
                    if(layout.layoutcontainerid == column.layoutcontainerid){
                        var newblock = _.findWhere(layout.blocks, {blockid : delblock.blockid});
                        var blockindex = layout.blocks.indexOf(newblock);
                        layout.blocks.splice(blockindex, 1);
//                        console.log(layout.blocks.length);
                    }
                });
                $scope.current.page = page;
            }
        });*/
        console.log(current);
        Block.delete({Id:current.block.id},function(){})

    };

    // update a block setting
    $scope.updateshowblcoksetting = function(block, event1 ) {
        $scope.newblock.blockname = block.blockname;
        var blocktype =  block.blocktype;
        switch(blocktype)
        {
            case 'auto':
                $scope.cssblocktipbox = blocktype;
                break;
            case 'editor':
                $scope.cssblocktipbox = blocktype;
                break;
            case 'static':
                $scope.cssblocktipbox = blocktype;
                break;
            case 'ads':
                $scope.cssblocktipbox = blocktype;
                break;
            default:
        }

        var blockcontent = $(event1.target).parent().parent();     //获取id 为 blockcontent DIV .
        blockcontent.append($(".tip_box"));
        console.log($(".tip_box"));
        var blocktypemenu = $(".tip_"+ blocktype);     //获取样式名称拼接 .
        var left =  ( parseInt(blockcontent.width() ) - parseInt( blocktypemenu.width() ) )/2;
        blocktypemenu.css({"left":left+"px", "top":-(blocktypemenu.height()), "position":"absolute"});
    };















    //显示header 编辑按钮
    $scope.showheadermenusetting = function(){
        $scope.css.header.menubutton = true;
    };

    //鼠标移走时隐藏 header nav 编辑框
    $scope.hideheadermenusetting = function(){
        $scope.css.header.menubutton = false;      //Header右上角mouseover按钮
        $scope.css.header.headersetting = false;          //Header设置面板是否显示
    };

    //选中header 主题
    $scope.clickheadertheme = function(indexid, themedata){
        $scope.css.header.headerthemeindex = indexid;      //Header选中的theme

        $scope.sitedataFirebase.defaultsettings.headerthemeindex = indexid;
    };

    //显示header nav 编辑框
    $scope.slideshowheadersetting = function(){
        $scope.css.header.headersetting = true;
    };

    //查找page id
    $scope.checkpargeid=function(url){
        for(var i=0;i<$scope.pages.length;i++){
            if($scope.pages[i].pagename== url){
                return $scope.pages[i].pageid;
            }
        }
    };

    //显示footer 编辑按钮
    $scope.showfootmenusetting=function(){
        $scope.css.footer.menubutton = true;
    };

    //鼠标移走时隐藏 footer nav 编辑框
    $scope.hidefootmenusetting = function(){

        $scope.css.footer.menubutton = false;
        $scope.css.footer.navsetting = false;

    };

    //点击右上角设置按钮 显示footer nav 编辑框
    $scope.slideshowfootersetting = function(){
        $scope.css.footer.navsetting = true;
    };


/*    //选中footer 主题
    $scope.clickfootertheme = function(indexid, themedata){
        $scope.css.header.footerthemeindex = indexid;
        $scope.cssfootermenuhavadata = true;

        $scope.sitedataFirebase.defaultsettings.footerthemeindex = indexid;
    };*/














    /*************          Left Page List Menu       ***************/
    //显示编辑提示框
    $scope.selectedpageattributeindex = -1;
    $scope.showEditPage = function(index){
        $scope.selectedpageattributeindex = index;
    };

    //隐藏编辑提示框
    $scope.hideEditPage = function(){
        $scope.selectedpageattributeindex = -1;
    };

    //显示选中页面的布局
    $scope.showPageBlock = function(index, pagedata){
        $(".container").prepend($(".tip_box")); //移动 Tip Box DOM , 防止因为刷新页面而丢失DOM
        $scope.defaultselectedpageindex = index;
        $scope.current.page = pagedata;
    };



    //显示添加页面的输入框
    $scope.showAddPageInput = function() {
        $scope.newpage.name = '';
        $scope.css.page.addinputbox = true;       //显示添加page的输入框
    };

    $scope.addPage = function() {
        $(".container").prepend($(".tip_box")); //移动 Tip Box DOM , 防止因为刷新页面而丢失DOM
        $scope.cssblocktipbox = false;
        $scope.css.page.addinputbox = false; // 隐藏添加page的输入框

        $scope.newpage.site_id = $scope.current.page.site_id ;

        Page.save($scope.newpage, function(pagedata){

            var panels = _.filter(pagedata.layout.systemPanels, function(panel){
                return panel.systemPanelTemplate.type == 300;
            });

            pagedata.rowpanels = panels;
            $scope.pages.push(pagedata);
        });
    };


    //保存edit form信息
    $scope.updatePage = function(page){
        Page.update({Id:page.id}, page, function(){});
        $scope.selectedpageattributeindex = -1;    //关闭当前的page 属性面板
    };

    //删除Page页面
    $scope.delPage = function(page, index) {
        if(page.type >= 20){
            Page.delete({Id:page.id}, function(){
                $scope.pages.splice(index, 1);
                $scope.selectedpageattributeindex = -1;    //关闭当前的page 属性面板
                $scope.defaultselectedpageindex = 0;
            });
        }
    };








    /****************      Right side bar Layout List Menu          ***************/
    $scope.cssmodalslide = {
        backdropFade: true,
        dialogFade:true
    };

    $scope.clickLayout = function( layout){
        $(".container").prepend($(".tip_box")); //移动 Tip Box DOM , 防止因为刷新页面而丢失DOM
        $scope.cssshowdelmodal = true;
        $scope.current.layout = layout;
    };

    //清空并重置 layout
    $scope.saveLayout = function(){

        var newpage = {
            name : $scope.current.page.name,
            url : $scope.current.page.url,
            title : $scope.current.page.title,
            system_layout_id : $scope.current.layout.id,
            site_id : $scope.current.page.site_id
        };

        Page.update({Id:$scope.current.page.id}, newpage, function(pagedata){
            var panels = _.filter(pagedata.layout.systemPanels, function(panel){
                return panel.systemPanelTemplate.type == 300;
            });
            pagedata.rowpanels = panels;
            $scope.current.page = pagedata;

            _.each($scope.pages, function(page){
                // 替换当前修改过的page的rowpanels数据
                if (page.id == pagedata.id) {
                    page.rowpanels = pagedata.rowpanels;
                }
            });
            $scope.cssshowdelmodal = false;
        });


    };

    //关闭 form
    $scope.closeLayoutForm = function(){
        $scope.cssshowdelmodal = false;
    };

});