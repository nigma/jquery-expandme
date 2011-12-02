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
            expandToggleClass: 'expand-toggle', // Class for anchor element that triggers expand action
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
                $('.' + settings.expandToggleClass, $main).toggle(
                        function (event) {
                            $main.addClass(settings.activeClass);
                            var $content = $main.children(settings.contentSelector);
                            var $toggle = $main.children('.' + settings.expandToggleClass);
                            var toggleHeight = $toggle.height() || 0;
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
