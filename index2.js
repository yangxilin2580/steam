//雪碧图图片循环
for(var i = 0 ; i < $(".liebiao span").length ; i++){
	$(".liebiao span")[i].style.backgroundPosition = i*-16 + "px" + " 0px";
}
/*---------------------------------------轮播图---------------------------------*/
/*------------------------初始化索引值----------------------*/
for(var i=0;i<$(".lbt").length;i++){
	var $liList=$(".lbt").eq(i).find(".banner");
	var $spanList=$(".lbt").eq(i).find(".dian").find("span");
	for(var j=0;j<$liList.length;j++){
		$liList.eq(j).attr("index",j);
	}
	for(var j=0;j<$spanList.length;j++){
		$spanList.eq(j).attr("index",j);
	}
}
/*-------------------------变换轮播的图片-------------------*/
function changeImg(index,obj){
	var $dianList = $(obj).closest(".lbt").find('.dian').find("span");
	$liList.hide();
	$liList.removeClass("show");
	$dianList.removeClass("focus");
	$liList.eq(index).addClass("show")
	$liList.eq(index).fadeIn();
	$dianList.eq(index).addClass("focus")
}
/*------------------------轮播图向右点击----------------------*/
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
/*------------------------轮播图向左点击-----------------------*/
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
/*-------------------------自动生成小圆点------------------*/
for(var i=0;i<$(".lbt").length;i++){
	var liLength=$(".lbt").eq(i).find(".banner").length;
	for(var j=0;j<liLength;j++){
		var $spList=$("<span></span>")
		$spList.appendTo($(".dian").eq(i))
		$spList.attr("index",j)
		if(j==0){
			$spList.addClass("focus")
		}
	}
}
/*-------------------------小圆点点击事件-------------------*/
$(".dian span").click(function(){
	$liList = $(this).closest(".lbt").find(".banner");
	var n = this.getAttribute("index");
	for(var i = 0; i < $liList.length; i++){
		if($liList.eq(i).hasClass("show")){
			changeImg(n,this)
			break;
		}
	}
})
/*--------------------第一个轮播图里面的事件-------------------*/
// 自动播放
    var autoPlay = setInterval(function(){
        $(".firstlbt .next").click();
    },3000)
    $(".firstlbt").mouseenter(function(){
    	clearInterval(autoPlay)
    })
     $(".firstlbt").mouseleave(function(){
    	autoPlay = setInterval(function(){
        	$(".firstlbt .next").click();
    	},3000)
    })
//轮播图里面的小div事件;鼠标移上右边div时更换当前图片
$(".firstlbt .banner").mouseenter(function(){
	clearInterval(autoPlay)
    var minDiv = $(this).find(".gameMin div")
    var maxDiv1 = $(this).find(".firstlbt-left .show")
    var maxDiv2 = $(this).find(".firstlbt-left .hide")
    minDiv.mouseenter(function(){
        maxDiv1.hide()
        maxDiv2.hide()
        var m=Number(this.getAttribute("xiabiao")) //获取下标
        maxDiv2.eq(m).fadeIn(100)
    })
})
//鼠标离开右边div时恢复原来的图片
$(".gameMin div").mouseleave(function(){
    $(".firstlbt-left .hide").hide()
    $(".firstlbt-left .show").show()
})
//弹出层
$(".lbt .banner").mouseenter(function(){
	$(this).find(".tanChuCeng").fadeIn();
	var $imgList=$(this).find(".tanChuCeng img")
	var n=0;
	imgAuto=setInterval(function(){
		if(n<$imgList.length-1){
			n++;
		}
		else{
			n=0;
		}
		$imgList.hide();
		$imgList.eq(n).fadeIn();
	},3000)
}).mouseleave(function(){     //链式调用
	$(this).find(".tanChuCeng").fadeOut();
	clearInterval(imgAuto);
})
/*-----------------------------------选项卡---------------------------------------*/
for(var j = 0 ; j < $(".xuanxiangka li").length ; j++){      //为每个分类的li设置非法属性即下标
    $(".xuanxiangka li").eq(j).attr("tabxiabiao",j);
}
$(".xuanxiangka li").click(function(){                  //点击每个分类的li切换里面的内容
    $(".xuanxiangka li").removeClass("dangqian")        //去掉所有li的样式
    $(this).addClass("dangqian");                       //给当前的li添加样式
    tb = $(this).attr("tabxiabiao");
    $(".tab").removeClass("show");
    $(".tab").eq(tb).addClass("show");                               
});
$(".tab").mouseenter(function(){
    listTab = $(this);                       //所在的（this）选项卡列表设置非法属性即下标
    for(var i = 0 ; i < listTab.find(".xuanxiang").length; i++){
        listTab.find(".xuanxiang").eq(i).attr("xiabiao",i);
    }
    listTab.find(".xuanxiang").mouseenter(function(){
        if(!$(this).hasClass('focus')){
            listTab.find(".xuanxiang").removeClass("focus")
            $(this).addClass("focus");
            b = $(this).attr("xiabiao");
            listTab.find(".neirong").hide();
            listTab.find(".neirong").eq(b).fadeIn();
        }
    });
});