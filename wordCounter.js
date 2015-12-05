(function() {
    /*
      # Count 物件
    */
    var Count = function(element ,options){
        console.log("進入 Count 物件");
        this.element = element;

        //初始化設定值，使用者設定 > DOM > 預設值
        this.options = $.extend($.fn.wordCount.default,this.element.dataset,options);
        this.limit = options.limit;
        console.log("\t 初始的限制字數："+this.limit);
        this.callback = options.callback;
        console.log("\t 指定顯示結果元素位置：\r\t 限制字數："+this.callback.displayLimitElement+"\r\t 字數："+this.callback.displayCountElement+"\r\t 則數："+this.callback.displayPostsElement);

        //初始化要被計算的值
        this.count = 0;
        this.posts = 1;

        //計算後顯示
        this.counting();
        this.showText();
    };


    /*
      ## Prototype
    */
    Count.prototype.counting = function(){
        console.log("Count 物件 > Prototype 實作計算方法");
        //計算限制字數、字數、則數

    };
    Count.prototype.showText = function(){
          console.log("Count 物件 > Prototype 實作顯示結果方法");
          //顯示限制字數、字數、則數
          $(this.callback.displayLimitElement).html(this.options.limit);
          $(this.callback.displayCountElement).html(this.count);
          $(this.callback.displayPostsElement).html(this.posts);
    };

    /*
      ###延遲進行
    */
    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    /*
      # Plugin 本體
    */
    $.fn.wordCount = function(options) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('wordCount');
            if (!data){
                $this.data('wordCount', (data = new Count(this, options)));
            }
            if(typeof options  == 'string'){
              var argumentArray = args.slice(1);
              data[options].apply(data,argumentArray);
            }
        });

    };
    /*
      ## Plugin 本體預設值
    */
    $.fn.wordCount.default = {
	    "limit": 160,
	    "limitOver": true,
	    "callback":{
		    "displayLimitElement": ".display-limit",
		    "displayCountElement": ".display-count",
            "displayPostsElement": ".display-posts"
	    }
    };
})();
/*
  # 使用者可設定值：
  ## limit:限制字數
  ## limitover:是否可以超過限制字數
  ## callback:計算過後，限制字數、字數、則數顯示位置
*/
$(".cal").wordCount({
    "limit": 70,
    "callback":{
        "displayLimitElement": ".limit",
		"displayCountElement": ".count",
        "displayPostsElement": ".posts"
    }
}); 
