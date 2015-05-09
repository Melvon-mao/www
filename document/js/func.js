/********** auto play carousel ************/
function autoPlaySlideshow(lists, pannel, carouselview, carouselimage){
    //添加节点
    var forex_length = $( "#"+lists).find('li').length;
    $($("#"+carouselimage)[0]).removeClass('none').addClass('show');
    for(var i =0; i< $("#"+carouselimage).length; i++){
        $($("#"+carouselimage)[i]).attr('id', pannel+i);
    }

    $("#"+carouselview).append($("#"+carouselimage));


    setInterval(function(){
        if(carouselobject.hoverFlag){
            while(carouselobject.step >= forex_length){
                carouselobject.step = 0;        
            }
            for(var i =0; i < forex_length;i++){
                $("#"+pannel+i).removeClass('show').addClass('none');
                $($( "#"+lists ).find('li')[i]).removeClass('selected');
            }
            $("#"+pannel+carouselobject.step).removeClass('none').addClass('show');
            $($( "#"+lists ).find('li')[carouselobject.step]).addClass('selected');
            carouselobject.step++;          
        }
    }, carouselobject.delay);
}


/********** Common function ************/
function showCurrentPannel(e, tabs, tabpannel, pannelId, currenttabid){
    var forex_length = $( "#"+tabs ).find('li').length;
    for(var i =0; i < forex_length;i++){
        $("#"+tabpannel+i).removeClass('show').addClass('none');
        $($( "#"+tabs ).find('li')[i]).removeClass('selected');
    }
    $(pannelId).addClass('show');
    $($( "#"+tabs ).find('li')[currenttabid]).addClass('selected');
 }


/********** carousel timer ************/
function carouselTimer(list, timer){
    var tmr = '';
    setInterval(function() {
        if(carouselobject.timer_hoverFlag){
            while(carouselobject.timer_step > 36){
                nextCarousel(list);
                clearInterval(carouselobject.timer_time);
                carouselobject.timer_step = 1;
            }
            
            if(carouselobject.timer_step < 10){
                tmr = 'tmr0'+carouselobject.timer_step;
            }else{
                tmr = 'tmr'+carouselobject.timer_step;          
            }
            $("#"+timer).attr('class', 'carousel_timer timer ' + tmr);
            carouselobject.timer_step++;
        }
    }, carouselobject.timer_time);
}

/********** onload carousel image ************/
function autoCarousel(list,timer){
    $($("#"+list).children()[0]).css('left',carouselobject.nowleft);
    for(var k = 1; k < $("#"+list).children().length; k++){
        $($("#"+list).children()[k]).css('left', $("#"+list).width() );
    };
    carouselTimer(list,timer);
}

/********** next carousel image ************/
function nextCarousel(list){
    for(var i = 0; i < $("#"+list).children().length; i++){
        if($("#"+list).children()[i].style.left != carouselobject.nowleft){
            $($("#"+list).children()[i]).css({'left': $("#"+list).width(),'visibility':'hidden'});
        }
    }
    for(var i = 0; i < $("#"+list).children().length; i++){
        var j1 = '';
        if($("#"+list).children()[i].style.left == carouselobject.nowleft){
            var j = (i+1) == $("#"+list).children().length ? 0: (i+1);
            $($("#"+list).children()[j]).css({'visibility':'visible'});
            $($("#"+list).children()[i]).animate({ left:'-'+$("#"+list).width() }, carouselobject.animate_time, function() {});
            $($("#"+list).children()[j]).animate({ left:carouselobject.nowleft }, carouselobject.animate_time, function() {});
            return;
        }           
    }
}

/********** prev carousel image ************/
function prevCarousel(list){
    for(var i = 0; i < $("#"+list).children().length; i++){
        if($("#"+list).children()[i].style.left != carouselobject.nowleft){
            var width1 = '-'+$("#"+list).width()+'px';
            $($("#"+list).children()[i]).css({'left': width1,'visibility':'hidden'});
        }
    }
    for(var i = 0; i < $("#"+list).children().length; i++){
        var j1 ='';
        if($("#"+list).children()[i].style.left == carouselobject.nowleft){
            var j = (i-1) < 0 ? $("#"+list).children().length-1 : (i-1);
            $($("#"+list).children()[j]).css({'visibility':'visible'});
            $($("#"+list).children()[i]).animate({ left: $("#"+list).width() }, carouselobject.animate_time, function() {         });
            $($("#"+list).children()[j]).animate({ left: 0 }, carouselobject.animate_time, function() {});
        }
    }
}


/** market_home forex_home used */
/**
 * used at /markets/ Top Insider Transactions
 * @param {type} type
 * @returns {undefined}
 */
function insiders_lab_data(type,containerId) {
    if (type == 'AboutThisTable') return;
    var elem = $('#'+containerId);
    //have access to data before
//        if (elem.html() != '') return;
    $.ajax({
        type : "POST",
        url : "/vcb_api/insiders/" + type.toLowerCase() + "/",
        dataType : "text",
        success : function(data) {
            data = eval(data);
            i = 0;
            $table = '<table class="table1 bdr1 zebra"><tbody>';
            switch (type) {
                case 'ALL_TOP10_BUY_AMOUNT':
                case 'ALL_TOP10_SELL_AMOUNT':
                    $table += '<tr class="odd">\
						<th class="even txt">Date</th>\
						<th class="odd txt">Symbol</th>\
						<th class="even num">Trades</th>\
						<th class="odd num">Amount($)</th>\
				</tr>';
                    while (i < data.length) {
                        if (typeof (data[i]) != 'undefined') {
                            $table += '<tr class="'
                                + (i % 2 == 0 ? 'even' : 'odd') + '">';
                            $table += '<td class="even txt"><span class="">'
                                + data[i].TradeDate + '</span></td>';
                            $table += '<td class="odd txt"><span class=""><a href="/markets/stocks/'
                                + data[i].symbol.toLowerCase()
                                + '/">'
                                + data[i].symbol + '</a></span></td>';
                            $table += '<td class="even num"><span class="">'
                                + data[i].trades + '</span></td>';
                            $table += '<td class="odd num"><span class="'
                                + (parseInt(data[i].Amount.replace(
                                /,/g, '')) > 0 ? "up" : "down")
                                + '">' + data[i].Amount
                                + '</span></td>';
                            $table += '</tr>';
                        }

                        i++;
                    }
                    break;
                case 'ALL_TOP10_SELL_VOLUME':
                case 'ALL_TOP10_BUY_VOLUME':
                    $table += '<tr class="odd">\
						<th class="even txt">Date</th>\
						<th class="odd txt">Symbol</th>\
						<th class="even num">Trades</th>\
						<th class="odd num">Volume</th>\
				</tr>';
                    while (i < data.length) {
                        if (typeof (data[i]) != 'undefined') {
                            $table += '<tr class="'
                                + (i % 2 == 0 ? 'even' : 'odd') + '">';
                            $table += '<td class="even txt"><span class="">'
                                + data[i].TradeDate + '</span></td>';
                            $table += '<td class="odd txt"><span class=""><a href="/markets/stocks/'
                                + data[i].symbol.toLowerCase()
                                + '/">'
                                + data[i].symbol + '</a></span></td>';
                            $table += '<td class="even num"><span class="">'
                                + data[i].trades + '</span></td>';
                            $table += '<td class="odd num"><span class="'
                                + (parseInt(data[i].volume.replace(
                                /,/g, '')) > 0 ? "up" : "down")
                                + '">' + data[i].volume
                                + '</span></td>';
                            $table += '</tr>';
                        }

                        i++;
                    }
                    break;
                default:
                    break;
            }
            $table += '</tbody></table>';
            var elem = $('#'+containerId);
            elem.html($table);
        }
    });
}

function PivotPoints_common_WithAjax(intervals,containerId) {
    var url = "/vcb_api/forex/getpivotpoints/" + intervals + '/';
    var element = $('#'+containerId);
    $.ajax({
        type: "POST",
        url: url.toLowerCase(),
        dataType: "json",
        success: function(data) {
            //element.removeClass('loading');
            if(data == '[]' || data.length == 0) {
                element.html('<p>Could not load the content. An error occurred.</p>');
                return;
            }
            var table_html = pivot_points_get_table_html(data, 'table1');
            element.html(table_html);
        },
        error: function() {
            element.html('<p>Could not load the content. An error occurred.</p>');
        }
    });
}

function pivot_points_get_table_html(data, cssClass) {
    var table_html = "<table class='"+cssClass+"'>";
    table_html += " ";
    table_html += "   <tr> ";
    table_html += " 		<th class='txt'>Pair</th> ";
    table_html += " 		<th class='num'>S3</th> ";
    table_html += " 		<th class='num'>S2</th> ";
    table_html += " 		<th class='num'>S1</th> ";
    table_html += " 		<th class='num'>P</th> ";
    table_html += " 		<th class='num'>R1</th> ";
    table_html += " 		<th class='num'>R2</th> ";
    table_html += " 		<th class='num'>R3</th> ";
    table_html += " 	</tr> ";

    if(data == null || data.PivotPoints == null) {
        table_html += " </table><!-- .panel --> ";
        return table_html;
    }

    //for (var i in data.PivotPoints) { ie8 bug
    for (var i = 0; i < data.PivotPoints.length; i++) {
        var row = data.PivotPoints[i];
        var pair = row.Pair.replace(/\//, "").toLowerCase();
        var rowCssClass = (i % 2) === 0 ? "even" : "odd";

        table_html += "  <tr> ";
        table_html += " <td><a href='/forex/pairs/"+pair+"/'>"+row.Pair+"</a></td> ";
        table_html += " <td class='num'>"+row.S3+"</td> ";
        table_html += " <td class='num'>"+row.S2+"</td> ";
        table_html += " <td class='num'>"+row.S1+"</td> ";
        table_html += " <td class='num'>"+row.P+"</td> ";
        table_html += " <td class='num'>"+row.R1+"</td> ";
        table_html += " <td class='num'>"+row.R2+"</td> ";
        table_html += " <td class='num'>"+row.R3+"</td> ";
        table_html += " </tr> ";
    }
    table_html += " </table><!-- .panel --> ";
    table_html += "<div class='separator'></div>";
    table_html += " <div class='disclaimer'>Chart Last Updated: "+data.LastTradeTime+"</div> ";
    return table_html;
}

function LiveRates_common_WithAjax(intervals, containerId) {
    var url = "/vcb_api/forex/getliverates/" + intervals + '/';
    var element = $('#'+containerId);
    $.ajax({
        type: "POST",
        url: url.toLowerCase(),
        dataType: "json",
        success: function(data) {
            //element.removeClass('loading');
            if(data=='[]' || data.length == 0) {
                element.html('<p>Could not load the content. An error occurred.</p>');
                return;
            }
            var table_html = live_rates_get_table_html(data, 'table1');
            element.html(table_html);
        },
        error: function() {
            element.html('<p>Could not load the content. An error occurred.</p>');
        }
    });
}

function live_rates_get_table_html(data, cssClass) {
    var table_html = "<table class='"+cssClass+"'>";
    table_html += " ";
    table_html += "  <tr> ";
    table_html += "    <th class='txt'>Pair</th> ";
    table_html += "    <th class='num'>Last</th> ";
    table_html += "    <th class='num'>High</th> ";
    table_html += "    <th class='num'>Diff</th> ";
    table_html += "  </tr> ";

    if(data == null || data.LiveRate == null) {
        table_html += " </table><!-- .panel --> ";
        return table_html;
    }

    //for (var i in data.LiveRate) ie8 bug
    for (var i = 0; i < data.LiveRate.length; i++) {
        var row = data.LiveRate[i];
        var pair = row.Pair.replace(/\//, "").toLowerCase();
        var changeCssClass = "";
        if (row.Diff > 0){
            changeCssClass = "up";
        }
        else if (row.Diff < 0){
            changeCssClass = "dn";
        }
        table_html += "  <tr> ";
        table_html += " <td><a href='/forex/pairs/"+pair+"/'>"+row.Pair+"</a></td> ";
        table_html += " <td class='num'>"+row.Last+"</td> ";
        table_html += " <td class='num'>"+row.High+"</td> ";
        table_html += " <td class='num'> ";
        table_html += " <span class=\""+changeCssClass+"\"> ";
        if (row.Diff > 0) {
            table_html += "+";
        }
        table_html += row.Diff;
        table_html += " </span> ";
        table_html += " </td> ";
        table_html += " </tr> ";
    }

    table_html += " </table><!-- .panel --> ";
    table_html += "<div class='separator'></div>";
    table_html += " <div class='disclaimer'>Chart Last Updated: "+data.LastTradeTime+"</div> ";
    return table_html;
}

/** end */


function drawChart_BBCPH_MCPH_MCPH_SectorQuoteChart(industry_group, industry) {
    var url = "/vcb_api/markets/sector_chart/" + industry_group + '/';
    if (industry) {
        url = url + industry + '/';
    }
    $.ajax({
        type : "POST",
        url : url.toLowerCase(),
        dataType : "text",
        success : function(data) {
            if (data == '[]') {
                $('#QuoteChartContainer').hide();
            }
            $('#chart_div_BBCPH_MCPH_MCPH_SectorQuoteChart').parents(
                    '.richmenu').show().css({
                    opacity : 0
                });
            var dt = new google.visualization.DataTable({
                cols : [ {
                    id : 'date',
                    label : 'Date',
                    type : 'datetime'
                }, {
                    id : 'last',
                    label : '',
                    type : 'number'
                }, {
                    id : 'dummy',
                    label : 'dummy',
                    type : 'number'
                } ],
                rows : eval(data)
            });

            var id = document
                .getElementById('chart_div_BBCPH_MCPH_MCPH_SectorQuoteChart');
            var chart = new google.visualization.AnnotatedTimeLine(id);
            chart.draw(dt, {
                scaleType : 'allmaximized',
                wmode : 'opaque',
                displayLegendDots : true,
                displayAnnotations : true,
                displayDateBarSeparator : true,
                displayRangeSelector : false,
                colors : [ '#0033FF', '#FFFFFF' ],
                displayZoomButtons : false,
                fill : 15,
                dateFormat : 'MM/dd HH:mm \'EST\'',
                displayExactValues : true
            });

        }
    });
}

function market_trade_info(symbol) {
    var updated = false;
    if(!updated) {
        $.ajax({
            type : "POST",
            url : "/vcb_api/markets/stock/"+symbol.toLowerCase()+"/",
            dataType : "json",
            success : function(data) {
                if(data.symbol) {
                    $('span.last-price').html('$'+data.last);
                    $('span.trade-date').html(data.date);
                    $('span.trade-time').html(data.time);
                    var change = '+' + data.change;
                    $('.rate-change').removeClass('up').removeClass('down');
                    if(data.change < 0 || data.change == '-0.00') {
                        change = '-' + data.change;
                        $('.rate-change').addClass('down');
                    }
                    else {
                        $('.rate-change').addClass('up');
                    }
                    change += ' (' + data.percentChange + '%)';
                    $('.rate-change').html(change);

//                    sectors = data.sectors_path_name;
//                    names = data.sectors_name;
//                    url = '/markets/sectors/';
//                    industries = '';
//                    for (var i=0; i < sectors.length;i++) {
//                        sector = sectors[i].trim();
//                        if(sector == '') continue;
//                        url += sector + "/";
//                        separator = (i==0?'':'/');
//                        industries += separator + ' <a href="'+url+'">'+names[i]+'</a> ';
//                    }
//
//                    $('span.industries').html(industries);
                    updated = true;
                }
            }
        });
    }
}


function drawChart_BBCPH_MCPH_MCPH_QCPH_QuoteChart1(symbol) {
    $
        .ajax({
            type : "POST",
            url : "/vcb_api/markets/" + symbol.toLowerCase() + "/",
            dataType : "text",
            success : function(data) {
                $('#chart_div_BBCPH_MCPH_MCPH_QCPH_QuoteChart1').parents(
                        '.richmenu').show().css({
                        opacity : 0
                    });
                var dt = new google.visualization.DataTable({
                    cols : [ {
                        id : 'date',
                        label : 'Date',
                        type : 'datetime'
                    }, {
                        id : 'last',
                        label : symbol,
                        type : 'number'
                    }, {
                        id : 'dummy',
                        label : 'dummy',
                        type : 'number'
                    } ],
                    rows : eval(data)
                });

                var id = document
                    .getElementById('chart_div_BBCPH_MCPH_MCPH_QCPH_QuoteChart1');
                var chart = new google.visualization.AnnotatedTimeLine(id);
                chart.draw(dt, {
                    scaleType : 'allmaximized',
                    wmode : 'opaque',
                    displayLegendDots : true,
                    displayAnnotations : true,
                    displayDateBarSeparator : true,
                    displayRangeSelector : false,
                    colors : [ '#0033FF', '#FFFFFF' ],
                    displayZoomButtons : false,
                    fill : 15,
                    dateFormat : 'MM/dd HH:mm \'EST\'',
                    displayExactValues : true
                });

            }
        });
}


function forex_api_get_pairs_last_trade(pair) {
    var url = "/vcb_api/forex/getdetailtradeinfo/"+pair+"/";
    $.ajax({
        type: "POST",
        url: url.toLowerCase(),
        dataType: "json",
        success: function(data) {
            if(data=='[]') {
                return;
            }
            forex_api_pairs_last_trade_set_html(data);
        },
        error: function() {
        }
    });
}
function forex_api_pairs_last_trade_set_html(data) {
    $('#pairs_last_trade_LastTrade').html(data.pairs_last_trade.LastTrade);
    $('#pairs_last_trade_AveChange').html(data.pairs_last_trade.AveChange+" ("+data.pairs_last_trade.AveChangePer+"%)");
    $('#pairs_last_trade_High').html(data.pairs_last_trade.High);
    $('#pairs_last_trade_Low').html(data.pairs_last_trade.Low);
    $('#pairs_last_trade_Bid').html(data.pairs_last_trade.Bid);
    $('#pairs_last_trade_Ask').html(data.pairs_last_trade.Ask);
}

function drawChart_QuoteChart2_forex(symbol) {
    $.ajax({
        type: "POST",
        url: "/vcb_api/forex/getquotechart/" + symbol + "/",
        dataType: "text",
        success: function(data) {
            $('#chart_div_QuoteChart2_forex').parents('.richmenu').show().css({opacity: 0});
            var dt = new google.visualization.DataTable({
                cols: [{id: 'date', label: 'Date', type: 'datetime'}, {id: 'last', label: symbol, type: 'number'}, {id: 'dummy', label: 'dummy', type: 'number'}],
                rows: eval(data)
            });

            var id = document.getElementById('chart_div_QuoteChart2_forex');
            var chart = new google.visualization.AnnotatedTimeLine(id);
            chart.draw(dt, {scaleType: 'allmaximized', wmode: 'opaque', displayLegendDots: true, displayAnnotations: true, displayDateBarSeparator: true, displayRangeSelector: false, colors: ['#0033FF', '#FFFFFF'], displayZoomButtons: false, fill: 15, dateFormat: 'MM/dd HH:mm \'EST\'', displayExactValues: true});

        }
    });
}

function forex_api_get_related_pairs(pair) {
    var element = $('#related_pairs_table');
    var url = "/vcb_api/forex/getrelatedpairsinfo/"+pair+"/";
    $.ajax({
        type: "POST",
        url: url.toLowerCase(),
        dataType: "json",
        success: function(data) {
            if(data=='[]') {
                element.html('');
                return;
            }
            element.html(related_pairs_get_table_html(data));
        },
        error: function() {
            element.html('');
        }
    });
}

function related_pairs_get_table_html(data) {
    var table_html = "<tbody>";
    table_html += "  <tr class='odd'> ";
    table_html += "    <th class='even'>Pair</th> ";
    table_html += "    <th class='odd'>Price</th> ";
    table_html += "    <th class='even'>% Change</th> ";
    table_html += "  </tr> ";
    //for (var i in data.pairs_related_pairs) ie8 bug
    for (var i = 0; i < data.pairs_related_pairs.length; i++) {
        var row = data.pairs_related_pairs[i];
        var pair = row.Pair.replace(/\//, "").toLowerCase();
        var rowCssClass = (i % 2) === 0 ? "even" : "odd";
        var changeCssClass = "";
        if (row.PerChange > 0){
            changeCssClass = "up";
        }
        else if (row.PerChange < 0){
            changeCssClass = "down";
        }
        table_html += "  <tr class='"+rowCssClass+"'> ";
        table_html += " <td class='even'><span class=''><a href='/forex/pairs/"+pair+"/'>"+row.Pair+"</a></span></td> ";
        table_html += " <td class='odd'><span class=''>"+row.Price+"</span></td> ";
        table_html += " <td class='even'> ";
        table_html += " <span class=\""+changeCssClass+"\"> ";
        if (row.PerChange > 0) {
            table_html += "+";
        }
        table_html += row.PerChange + '%';
        table_html += " </span> ";
        table_html += " </td> ";
        table_html += " </tr> ";
    }
    table_html += "</tbody>";
    return table_html;
}
