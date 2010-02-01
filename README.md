# jQuery-ui-lasso
> A quick hack of jQuery-ui-selectable to pull out the lasso functionality.

##Example
  $(document).lasso({
    delay: 100,
    stop: function (event, props) {
    
      // props is an object containing "top" and "left" which
      // correspond to the css props of the lasso when the
      // lasso stopped.
    
      var 
        $link = $("<div/>", {
          css: props,
          className: "link"
        })
        .appendTo('body')
      ;

    }
  });