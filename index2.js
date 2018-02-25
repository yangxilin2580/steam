//雪碧图图片循环
for(var i = 0 ; i < $(".liebiao span").length ; i++){
	$(".liebiao span")[i].style.backgroundPosition = i*-16 + "px" + " 0px";
}
//轮播图：
// 初始化索引值
for(var i=0;i<$(".lbt").length;i++){
	var $liList=$(".lbt").eq(i).find(".banner");
	console.log($(".banner"))
	var $spanList=$(".lbt").eq(i).find(".dian").find("span");
	for(var j=0;j<$liList.length;j++){
		$liList.eq(j).attr("index",j);
	}
	for(var j=0;j<$spanList.length;j++){
		$spanList.eq(j).attr("index",j);
	}
}
//自动生成小圆点
for(var i=0;i<$(".lbt").length;i++){
	var liLength=$(".lbt").eq(i).find(".banner").length;
	for(var j=0;j<liLength;j++){
		var $spList=$("<span></span>")
		$spList.appendTo($(".dian").eq(i))
		if(j=0){
			$spList.addClass("focus")
		}
	}
}
function changeImg(index,obj){
	var $dianList = $(obj).closest(".lbt").find('.dian').find("span");
	// 隐藏所有的图片
	$liList.hide();
	$liList.removeClass("show");
	$dianList.removeClass("focus");
	$liList.eq(index).addClass("show")
	$liList.eq(index).fadeIn();
	$dianList.eq(index).addClass("focus")
}
$(".next").click(function(){
	$liList = $(this).closest(".lbt").find(".banner");
	for(var i = 0; i < $liList.length; i++){
		if($liList.eq(i).hasClass("show")){
			if(i < $liList.length - 1){
				changeImg(i+1,this)
			}
			else{
				changeImg(0,this)
			}
			break;
		}
	}
})
$(".prev").click(function(){
	$liList = $(this).closest(".lbt").find(".banner");
	for(var i = 0; i < $liList.length; i++){
		if($liList.eq(i).hasClass("show")){
			if(i !== 0){
				changeImg(i-1,this)
			}
			else{
				changeImg($liList.length - 1,this)
			}
			break;
		}
	}
})