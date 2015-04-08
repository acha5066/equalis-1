(function ( $, window, document, undefined ) {

    var pluginName = "equalis",
        defaults = {
            items: '> div',
            breakpoint: 768,
            className: pluginName
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.elems = [];
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var plugin = this;
            $(plugin.element).addClass(plugin.settings.className);
            $.each(plugin.settings.items, function(key, value){
                plugin.elems.push($(plugin.element).find(value));
            });
            plugin.responsive();
            $(window).resize(function(){
                plugin.responsive();
            });
        },
        responsive: function() {
            var plugin = this,
                breakpoint = plugin.settings.breakpoint,
                windowWidth = $(window).width(),
                scrollbar = window.innerWidth - windowWidth;
            if( breakpoint && windowWidth + scrollbar >= breakpoint ) {
                plugin.create();
            } else {
                plugin.destroy();
            }
        },
        create: function() {
            var plugin = this,
                elems = plugin.elems,
                heights = [],
                max;
            $.each(elems, function(key, value){
                plugin.destroy();
                $(value).each(function(){
                    heights.push( $(this).outerHeight() );
                });
            });
            max = Math.max.apply( Math, heights );
            $.each(elems, function(key, value){
                $(value).css({
                    minHeight: max
                });
                if( ! $(value).hasClass('equalise-item') ) {
                    $(this).addClass('equalise-item');
                }
            });
        },
        destroy: function() {
            var plugin = this;
            $.each(this.elems, function(key, value){
                $(value).each(function(){
                    $(this).removeClass('equalise-item');
                    $(this).removeAttr('style');
                });
            });
        }
    });

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };

})( jQuery, window, document );