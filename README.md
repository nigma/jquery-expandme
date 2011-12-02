# jQuery expandme plugin

A jQuery JavaScript plugin for expanding images vertically in articles.

## Description

This is a very simple plugin that can be useful when putting large images
(i.e. website screenshots) inside articles.

An image can occupy full width of an article while only the top part of it is
visible. An expand/collapse bar at the bottom of the image view expands the
image container vertically making the image fully visible.

## Usage

Assume we have an article with embedded image inside .expandme wrapper and
defined stylesheet similar to the one in ``jquery.expandme\css\expandme.css``.

    <article>
        <div class="expandme" style="height: 440px;">
            <img src="image.jpg" />
            <a href="#" class="expand-toggle"></a>
        </div>
    </article>

Then the corresponding JS bit is:

    $('.expandme').expandme();


The plugin can also take callbacks so for example you may want to scroll to
article top when collapsing an image:

    $('.expandme').expandme({
        onBeforeCollapse: function(settings){
            var $elem = $(this); // Expandable
            // requires scrollTo plugin
            $.scrollTo($elem.parents('article'), settings.speed);
        }
    });

## Options

All available plugin settings:

    var settings = $.extend({
        height: null,                    // Initial height of image (usually specified in css)
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


## Resources

See the ``css`` and ``img`` folders for stylesheet and image resources required
by the plugin.

## Demo

See ``index.html`` file in the demo folder or
[http://en.ig.ma/projects](http://en.ig.ma/projects) for examples.

Read more at [http://en.ig.ma/notebook/2011/jquery-expandme-plugin](http://en.ig.ma/notebook/2011/jquery-expandme-plugin).

## Download

The source code is on [GitHub](https://github.com/nigma/jquery-expandme)
and [BitBucket](https://bitbucket.org/nigma/jquery-expandme). Grab it from there
or download latest
[zipped code](https://github.com/nigma/jquery-expandme/zipball/master).
