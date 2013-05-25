
$(document).ready(function() {
            jQuery.extend(jQuery.easing,{easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a}});
            $('a.scroll').bind('click',function(event){
                event.preventDefault();
                var $anchor = $(this);
                
                // fix for bootstrap collapse, don't scroll when we hide
                if (! $($anchor.attr('href')).height() <= 0) return;
         
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500,'easeInOutExpo');
                /*
                if you don't want to use the easing effects:
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1000);
                */
            });
        });