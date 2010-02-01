/*
 * jQuery UI Lasso 
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Pulled out of jquery-ui-selectable
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function($) {

$.widget("ui.lasso", $.ui.mouse, {
	options: {
		appendTo: 'body'
	},
	_create: function() {
		var self = this;

		this.dragged = false;

		this._mouseInit();

		this.helper = $(document.createElement('div'))
			.css({border:'1px dotted black'})
			.addClass("ui-lasso-helper");
	},

	destroy: function() {
		this.element
			.unbind(".lasso");
		this._mouseDestroy();

		return this;
	},

	_mouseStart: function(event) {
		var self = this;

		this.opos = [event.pageX, event.pageY];

		if (this.options.disabled)
			return;

		var options = this.options;

		this._trigger("start", event);

		$(options.appendTo).append(this.helper);
		
		// position helper (lasso)
		this.helper.css({
			"z-index": 100,
			"position": "absolute",
			"left": event.clientX,
			"top": event.clientY,
			"width": 0,
			"height": 0
		});

	},

	_mouseDrag: function(event) {
		var self = this;
		this.dragged = true;

		if (this.options.disabled)
			return;

		var options = this.options;

		var x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
		if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
		if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
		this.helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});
  
		return false;
	},

	_mouseStop: function(event) {
		var self = this;

		this.dragged = false;
		
		if (this.options.disabled)
			return;
		
		var props = {
		  left: this.helper.css('left'),
		  top: this.helper.css('top'),
		  width: this.helper.css('width'),
		  height: this.helper.css('height')
		}

		this._trigger("stop", event, props);
		
		this.helper.remove();

		return false;
	}

});

$.extend($.ui.lasso, {
	version: "1.8rc1"
});

})(jQuery);
