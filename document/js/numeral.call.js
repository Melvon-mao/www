/**
 * return -$1,000.23
 * @returns 
 */
function money_format(val) {
    return numeral(val).format('$0,0.00');
}

function number_format(val) {
    return numeral(val).format('0,0.00');
}

function number_format_no_comma(val) {
    return numeral(val).format('00.00');
}

function number_format_no_point(val) {
    return numeral(val).format('0,0');
}