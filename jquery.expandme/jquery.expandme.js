/*!
 * jQuery ExpandMe Plugin v1.0
 * http://en.ig.ma/notebook/2011/jquery-expandme-plugin
 *
 * Copyright 2011, Filip Wasilewski <en@ig.ma>
 * Licensed under the MIT license.
 */

(function ($) {
    $.fn.expandme = function (options) {
        var settings = $.extend({
            height: null,                    // Initial height of image wrapper (usually specified in css)
            speed: 500,                      // Expansion/collapsing speed
            expandEasing: 'swing',           // Expand easing for jQuery animate
            collapseEasing: 'swing',         // Collapsing easing for jQuery animate
            activeClass: 'active',           // Class added to expanded element
            expandToggleClass: ['.expand-toggle','.imgr'], // Class for anchor element array that triggers expand action
            onBeforeExpand: null,            // Function to call before expanding
            onAfterExpand: null,             // Function to call after expanding
            onBeforeCollapse: null,          // Function to call before collapsing
            onAfterCollapse: null,           // Function to call after collapsing
            contentSelector: 'img',          // jQuery selector string of full-height content element
            namespace: 'expandme'            // Plugin data namespace
        }, options);

        this.css('height', settings.height);

        return this.each(function () {
            var $main = $(this);
            var data = $main.data(settings.namespace);

            // Initial wrapper height before expansion
            var initialHeight = settings.height || $main.height();

            // If the plugin hasn't been initialized yet
            if(!data) {
                $main.data(settings.namespace, {
                    target:$main,
                    height:settings.height
                });
                //calculate controllers height
                var toggleHeight  = 0 ;
                //looping though list of controllers
                var controllers = '' , total = settings.expandToggleClass.length;
                $.each(settings.expandToggleClass , function(key,val){
                    // this is a silly if statment , made just to avoide more changes in the code
                    if(key === total - 1){
                        controllers += val ;
                    }else{
                        controllers +=val+',';
                    }


                    // if the controller is an image tag it will skip it
                    // to avoide dublicating the height of the container
                    if($(val).is('img')){
                        return true;
                    }else{
                        toggleHeight + $(val).height;
                    }
                });

                $( controllers, $main).toggle(
                        function (event) {
                            $main.addClass(settings.activeClass);
                            var $content = $main.children(settings.contentSelector);
                            var $toggle = $main.children( controllers);

                            var attr = {height:$content.height() + toggleHeight};
                            if(settings.onBeforeExpand) {
                                settings.onBeforeExpand.call($main, settings);
                            }
                            animate(attr, settings.expandEasing, settings.onAfterExpand);
                        },
                        function (event) {
                            $main.removeClass(settings.activeClass);
                            var attr = {height:initialHeight};
                            if(settings.onBeforeCollapse) {
                                settings.onBeforeCollapse.call($main, settings);
                            }
                            animate(attr, settings.collapseEasing, settings.onAfterCollapse);
                        }
                );
                function animate(attr, easing, callback) {
                    $main.animate(attr, settings.speed, easing, callback && function () {
                        callback.call(this, settings);
                    });
                }
            }
        });
    };
})(jQuery);
