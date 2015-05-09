/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#f00';
//    config.removeButtons = 'Source,Save,Preview,About,Maximize,list,indent,bidi,mode';
//    config.toolbarGroups = [
//        { name: 'document',	   groups: [  '', 'doctools' ] },
//       { name: 'forms' },
//        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
//        { name: 'links' },
//        '/',
//        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
//        { name: 'paragraph',   groups: [ 'blocks', 'align'] },
//        { name: 'CreatePlaceholder'},
//        '/',
//        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
//        { name: 'insert' },
//        { name: 'others' },
//       { name: 'texttransform', groups: ['TransformTextToUppercase','TransformTextToLowercase','TransformTextCapitalize','TransformTextSwitcher']},
//        '/',
//        { name: 'styles' },
//        { name: 'tools' }
//
//    ];

    config.extraPlugins='tableresize,wysiwygarea,floating-tools,youtube,wordcount,' +
        'backgrounds,onchange,placeholder,autogrow';

    config.toolbar = [
        [ 'RemoveFormat' ],
        [ 'Styles','Format','Font','FontSize' ],
        [ 'Bold', 'Italic', 'Underline', 'Strike' ],
        [ 'TextColor','BGColor' ],
        [ 'Undo', 'Redo' ],
        '/',
        [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
        [ 'Link', 'Unlink' ],
        [ 'Find' ,'Replace', '-', 'SpellChecker', 'Scayt' ],
        [ 'Image', 'Flash' ,'Table', 'HorizontalRule','Smiley','SpecialChar','PageBreak', 'ShowBlocks' ],
        [ 'Templates' ],
	    [ 'youtube' ]
    ];
    //config.removePlugins='resize';

    //控制显示youtube视频
    config.allowedContent = true;

    //字符控制设置
    config.wordcount = {

        // Whether or not you want to show the Word Count
        showWordCount: true,

        // Whether or not you want to show the Char Count
        showCharCount: false,

        // Option to limit the characters in the Editor
        charLimit: 'unlimited',

        // Option to limit the words in the Editor
        wordLimit: '10000'
    };

    //Uploadcare
    UPLOADCARE_PUBLIC_KEY = "demopublickey"; //set publick key for Uploadcare
    UPLOADCARE_LOCALE = 'ru'; //set locale if you wish

    config.autoGrow_onStartup = true;
};


