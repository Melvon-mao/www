(function($) {
	
    $.fn.player = function(settings) {
        var config = {
            defaultVolume: 1.0,
        };

        if (settings) {
            $.extend(config, settings);
        }

        var playControl = '<span class="simpleplayer-play-control"></span>';
        var stopControl = '<span class="simpleplayer-stop-control"></span>';

        this.each(function() {

            var simplePlayer = $(this).get(0);
            var button = $('.start-button');

            simplePlayer.volume = config.defaultVolume;

            button.click(function() {
                if (simplePlayer.paused) {
                    simplePlayer.play();
                    $(this).find('.simpleplayer-play-control').addClass('simpleplayer-stop-control').removeClass('simpleplayer-play-control');
                } else {
                    simplePlayer.pause();
                    $(this).find('.simpleplayer-stop-control').addClass('simpleplayer-play-control').removeClass('simpleplayer-stop-control');
                }
            });

            

            $(simplePlayer).bind('ended', function(evt) {
                simplePlayer.pause();
                button.find('.simpleplayer-stop-control').addClass('simpleplayer-play-control').removeClass('simpleplayer-stop-control');
            });
			
        });

        return this;
    };
})(jQuery);
