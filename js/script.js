$(function() {

    var retina = false;
    if(Modernizr.mq('only screen and (-webkit-min-device-pixel-ratio: 2)')) {
        retina = true;
    }

    var images = $('#content .building-photos img').get();

    var updateImages = function() {

        var updates = [];
        $(images).each(function() {
            var $image = $(this);
            var src, width, height;
            if (Modernizr.mq('only screen and (min-width: 768px)')) {
                width = $image.attr('width-768');
                height = $image.attr('height-768');
                src = retina ? $image.attr('src-768x2') : $image.attr('src-768');
            } else if (Modernizr.mq('only screen and (min-width: 480px)')) {
                width = $image.attr('width-480');
                height = $image.attr('height-480');
                src = retina ? $image.attr('src-480x2') : $image.attr('src-480');
            } else {
                // lower source images
                width = $image.attr('width-320');
                height = $image.attr('height-320');
                src = retina ? $image.attr('src-320x2') : $image.attr('src-320');
            }
            if ( src != $image.attr('src') ) {
                if ( $image.attr('width') == undefined || width > $image.attr('width') ) {
                    updates.push([$image, src, width, height]);
                }
            }
        });
        if ( updates.length ) {
            for ( var i = 0; i < updates.length; i++ ) {
                var update = updates[i];
                var $image = update[0];
                $image.attr('src', update[1]);
                $image.attr('width', update[2]).width(update[2]);
                $image.attr('height', update[3]).height(update[3]);
            }
        }


    }

    updateImages();

    var timer;

    $(window).resize(function () {
        if ( timer ) { clearTimeout(timer); }
        timer = setTimeout(function() {
            updateImages();
        }, 2000);
    });

});
