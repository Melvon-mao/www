/**
 * draw Chart Calculator
 * @param {type} chart_data
 * @param {type} chart_label
 * @param {type} x_max_value
 * @param {type} y_max_value
 * @param {type} chart_vAxis_ticks
 * @returns {undefined}
 */
function drawChartCalculator(chart_data, chart_label, x_max_value, y_max_value, chart_vAxis_ticks) {
 // Create and populate the data table.    
 var data = google.visualization.arrayToDataTable(chart_data);
 
 //get y_value_array
 var y_values = Array();
 
 var min = chart_data[1][1];
 var max = chart_data[chart_data.length-1][1]; 
 if(chart_data.length-1 < 10 || min == max) {
    for (var i = 0+1; i < chart_data.length; i++) {
       y_values.push(chart_data[i][1]);
    }
 } else {
    //from min to max, 10 values
    for (var i = 1; i <= 10; i++) {
       var this_value = min + (max-min)/10*i;
       y_values.push(this_value);
    }
 }
 //check if the first y value to last y value is too small
 //if(Math.abs(y_values[0] - y_values.slice(y_values.length-1)) < 2) {
 chart_vAxis_ticks = y_values;
 //}
 
 var vAxis_array = {title: chart_label.y_title, maxValue: y_max_value};
 if(chart_vAxis_ticks) {
    vAxis_array = {title: chart_label.y_title, ticks: chart_vAxis_ticks};
 }
 
 // Create and draw the visualization.
 new google.visualization.LineChart(document.getElementById('chart')).
   draw(data, {
     title: chart_label.title,
     curveType: "none",
     width: 500, height: 500,
     hAxis: {title: chart_label.x_title, maxValue: x_max_value},
     vAxis: vAxis_array
   }
  );
}