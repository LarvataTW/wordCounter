/**
* @file 計算單則訊息限制字數、目前字數、目前則數
* @author Olga Huang
*/
(function() {
    /**
    * 延遲使用者設定的毫秒數後執行程式
    * @function
    * @name delay
    */
    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();
    /**
     * 計算單則訊息限制字數、目前字數、目前則數
     * @constructor
     * @param {object} element - 作用中的 <textarea>
     * @param {object} options - 以下參數可以自訂覆蓋預設值，初始化單則限制字數，使用者設定 > DOM > 預設值
     * @function counting - 處理運算規則
     * @function showText - 處理顯示則訊息限制字數、目前字數、目前則數的文字位置
     */
    var Count = function(element ,options){
        this.element = element;
        this.options = $.extend($.fn.wordCount.default,$(this.element).attr("data-limit"),options);
        this.limit = this.options.limit;
        //如果原有中文值，但刪除所有中文後，可以改回使用者設定值或預設值
        this.limit_temp = this.options.limit;
        //DOM 不會設定 callback，所以使用者設定 > 預設值
        this.options2 = $.extend($.fn.wordCount.default,options);
        this.callback = this.options2.callback;
        //初始化計算中產生，且要印出的值
        this.count = 0;
        this.posts = 1;
        //計算後顯示
        this.counting();
        this.showText();
    };

    Count.prototype.counting = function(){
        console.log("Count 物件 > Prototype 實作計算方法");
        /*
          ###計算限制字數、字數、則數
          1.將字串拆開變成陣列
          2.用for迴圈讀取每個字，用 charCodeAt 字元的unicode 數字
            2.1包含中文(19968~40908)，限制字數改為70
            2.2[\]^{|}~(91-94,123-126)，算兩個字
          3.超過限制字數，則數增加，則數 ＝（字數/限制字數)
          4.超過5則訊息顯示alert視窗

          ###生命週期
          1. 第一次載入時即進行第一次計算
          2. 在生命週期內，當監測到 keyup change paste 事件結束後半秒後，進行計算直到周期結束
        */
        var _this = this;
        var doCount = function () {
            var hasChinese = false;
            var hasSpecial = false;
            delay(function(){
                //console.log("原始字串："+$(".cal").val());
                var text = $(_this.element).val().split("");
                var sum = 0;
                var isChinese = [false];
                //單字迴圈判斷中文或特殊符號
                for(var i = 0; i < text.length; i++){
                    //還原\特殊符號
                    if(text[i] == "\\"){ text[i] = "\\\\"; }

                    //判斷中文，並寫入isChinese[i] boolean 陣列
                    if(text[i].charCodeAt(0)> 19967 && text[i].charCodeAt(0) < 40909){
                        isChinese[i] = true;
                    }else{
                        isChinese[i] = false;
                    }

                    //判斷特殊符號
                    if((text[i].charCodeAt(0)> 90 && text[i].charCodeAt(0) < 95) || (text[i].charCodeAt(0)> 122 &&  text[i].charCodeAt(0) < 127)){
                        hasSpecial = true;
                        sum++;
                    }
                    sum++;

                }
                //console.log(isChinese);
                //確定 isChinese 至少有一個 true，也就是 hasChinese 等於 true，反之為 false
                $.each(isChinese, function( index, val ) {
                        if(isChinese[index] === true){
                          return ( hasChinese = true );
                        }
                    return ( isChinese[index] = true );
                });
                //根據 hasChinese 修改限制字數
                if( hasChinese === true){
                  _this.limit = 70;
                }else{
                  _this.limit = 160;
                }
                _this.count = sum;
                _this.posts = Math.ceil(_this.count/_this.limit);
                if(_this.posts > 5) {
                    alert("已超過訊息傳送上限5則!");
                }
                console.log("總字數："+_this.count+", 含中文："+hasChinese+", 含符號："+hasSpecial+", 則數："+_this.posts+", 限制字數："+_this.limit);
                _this.showText();
            }, 500);
        };

        doCount();
        $(this.element).on('keyup change paste', function(evt){
            doCount();
        });
    };
    Count.prototype.showText = function(){
        //顯示限制字數、字數、則數
        $(this.callback.displayLimitElement).val(this.limit);
        $(this.callback.displayCountElement).val(this.count);
        $(this.callback.displayPostsElement).val(this.posts);
    };

    /**
     * 進入點
     * @param options - 使用者設定值
     */
    $.fn.wordCount = function(options) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('wordCount');
            if (!data){
                $this.data('wordCount', (data = new Count(this, options)));
                //以刪除 data，讓使用者可以自定生命週期
                $this.removeData('wordCount');
            }
            if(typeof options  == 'string'){
              var argumentArray = args.slice(1);
              data[options].apply(data,argumentArray);
            }
        });

    };
    /*
     *	預設值
     */
    $.fn.wordCount.default = {
	    "limit": 160,
	    "callback":{
		    "displayLimitElement": ".display-limit",
		    "displayCountElement": ".display-count",
            "displayPostsElement": ".display-posts"
	    }
    };
})();
/**
 * 使用者自訂單則訊息限制字數，及顯示單則訊息限制字數、目前字數、目前則數的位置
 * @type {object} - 放自訂選項的物件
 * @property limit - 限制字數
 * @callback callback - 指定單則限制字數、目前字數、目前則數的顯示位置，以下用物件包起來：
 * @property callback.displayLimitElement - 指定單則限制字數位置
 * @property callback.displayCountElement - 指定目前字數位置
 * @property callback.displayPostsElement": - 指定目前則數位置
 */
// $(".cal").wordCount({
//     "limit": 160,
//     "callback":{
//         "displayLimitElement": ".limit",
// 		"displayCountElement": ".count",
//         "displayPostsElement": ".posts"
//     }
// });
