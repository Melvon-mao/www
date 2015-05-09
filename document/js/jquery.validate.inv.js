/**
 * greater than
 * @returns 
 */
jQuery.validator.addMethod("greaterThan", function(value, element, param) {
    // bind to the blur event of the target in order to revalidate whenever the target field is updated
    // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
    var target = $(param);
    if (this.settings.onfocusout) {
        target.unbind(".validate-greaterThan").bind("blur.validate-greaterThan", function() {
            $(element).valid();
        });
    }
    return parseFloat(value) > parseFloat(target.val());
}, "please enter a value greater than before.");

/**
 * less than or equal
 * @returns 
 */
jQuery.validator.addMethod("lessThanEqual", function(value, element, param) {
    // bind to the blur event of the target in order to revalidate whenever the target field is updated
    // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
    var target = $(param);
    if (this.settings.onfocusout) {
        target.unbind(".validate-lessThanEqual").bind("blur.validate-lessThanEqual", function() {
            $(element).valid();
        });
    }
    return parseFloat(value) <= parseFloat(target.val());
}, "please enter a value less than or equal before.");


/**
 * date: later than
 * @returns 
 */
jQuery.validator.addMethod("laterThanDate", function(value, element, param) {
    // bind to the blur event of the target in order to revalidate whenever the target field is updated
    // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
    var target = $(param);
    if (this.settings.onfocusout) {
        target.unbind(".validate-laterThanDate").bind("blur.validate-laterThanDate", function() {
            $(element).valid();
        });
    }
    return Date.parse(value) > Date.parse(target.val());
}, "please enter a value later than before.");