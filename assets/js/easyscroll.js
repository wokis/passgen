
$(document).ready(function() {
            jQuery.extend(jQuery.easing,{easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a}});
            $('a.scroll').bind('click',function(event){
                event.preventDefault();
                var scrollTo;
                var $anchor = $(this);
                
                // fix for bootstrap collapse, don't scroll to hidden element
                if ( $anchor.attr('href') == $anchor.data("target")) {
                    if (! $($anchor.attr('href')).height() <= 0) return;
                }

                // let us scroll to the top if the anchor is invalid or empty
                if ($($anchor.attr('href')).offset() && $($anchor.attr('href')).offset().top) scrollTo = $($anchor.attr('href')).offset().top;
                else scrollTo = 0;
         
                $('html, body').stop().animate({
                    scrollTop: scrollTo
                }, 1500,'easeInOutExpo');
                /*
                if you don't want to use the easing effects:
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1000);
                */
            });
        });