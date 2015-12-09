## wordCounter
計算單則訊息限制字數、目前字數、目前則數

## 計算規則
*	單一則訊息純英文數字為 160 字，中英文及數字混合為 70 字，字數計算包含空格、標點符號、特殊字元及換行字元（enter）等。
*	長簡訊每一則訊息純英文數字為 153 字，中英文及數字混合為 67 字。字數計算包含空格、標點符號、特殊字元及換行字元（enter）等。
*	在純英文數字格式下輸入[\\]^{|}~八個字元，將以兩個字數列入簡訊長度計算。
*	請於輸入門號及文字前先按下鍵盤的Ctrl+F5執行瀏覽器暫存更新確保字數計算程式為最新版本，並於發訊前再次確認網頁上呈現之發訊則數是否正確。

## 用法
`
$("element").wordCount({options});
`

options 物件有以下屬性可以設定：

*	limit - 限制字數
*	callback - 指定單則限制字數、目前字數、目前則數的顯示位置，以下用物件包起來：
	*	displayLimitElement - 指定單則限制字數位置
	*	displayCountElement - 指定目前字數位置
	*	displayPostsElement - 指定目前則數位置

範例:
`
$(".cal").wordCount({
    "limit": 160,
    "callback":{
        "displayLimitElement": ".limit",
			"displayCountElement": ".count",
        "displayPostsElement": ".posts"
    }
});
`
