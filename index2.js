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
/*-------------------------自动生成小圆点------------------*/
for(var i=0;i<$(".lbt").length;i++){
	var liLength=$(".lbt").eq(i).find(".banner").length;
	for(var j=0;j<liLength;j++){
		var $spList=$("<span></span>")
		$spList.appendTo($(".dian").eq(i))
		if(j==0){
			$spList.addClass("focus")
		}
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
/*-------------------------小圆点点击事件-------------------*/
$(".dian span").click(function(){
			$liList = $(this).closest(".lbt").find(".banner");
			var n = this.getAttribute("index");
			console.log(n)
			for(var i = 0; i < $liList.length; i++){
				if($liList.eq(i).hasClass("show")){
					changeImg(n,this)
					break;
				}
			}
})
/*--------------------第一个轮播图里面的事件-------------------*/
// 自动播放
    // var autoPlay = setInterval(function(){
    //     $("#next").click();
    // },3000)
//轮播图里面的小div事件;鼠标移上右边div时更换当前图片
$(".firstlbt .banner").mouseenter(function(){
    // clearInterval(autoPlay)
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
    // autoPlay = setInterval(function(){
    //     $(".next").click();
    // },3000)
})
var m = 0;
//轮播图中的轮播图
// setInterval(function(){
//     $(".banner1 .tu li").hide()
//     $(".tu li").eq(m).addClass("showMin")
//     if(m < $(".tu li").length-1){
//         console.log($(".tu li").length)
//         m++;
//     }else{
//         m = 0;
//     }
//     $(".tu li").eq(m).fadeIn()
// },1000)
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