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
/*----------------------------详情页js--------------------------*/
$(".div_item").eq(0).find(".item_kuang").addClass("show")
var $length=$(".div_item").length
var point="right"//默认方向
var next=[]
var prev=[]
for(var i=0;i<$length;i++){
	if(i>2 && i%2==0){
		next.push(i)
	}
	if(i<$length-4 && i%2!=0){
		prev.push(i)
	}
}
//点击图片逻辑
var itemWrap=$("#shitu_all");
var kuangList=itemWrap.find(".item_kuang");
//当前所在的张数
var adv={};
adv.m=0;
//可视区域最左侧图片的下标
adv.n=0;
adv.count=kuangList.length;
function changekuang(index){
	kuangList.removeClass('show');
	kuangList.eq(index).addClass("show")
}
function moveView(newIndex){
	var R=adv.count-adv.m;
	var L=adv.n;
	if(R>5){
		itemWrap.animate({
			"marginLeft":-(adv.m)*120
		});
	}
	else{
		if(L!==adv.count-5){
			itemWrap.animate({
				"marginLeft":-(adv.count-R-1)*120
			});
		}
	}
	adv.n=newIndex || adv.m;
}
$(".tuodongR").click(function(){
	++adv.m;
	if(adv.m ==adv.count){
		adv.m=0;
		moveView();
	}
	if(adv.m==adv.n+5){
		moveView()
	}
	if(adv.count-adv.m<5){
		moveView(adv.count-5)
	}
	changekuang(adv.m)
})
// $(".tuodongL").click(function(){
// 	++adv.m;
// 	if(adv.m ==adv.count){
// 		adv.m=0;
// 		moveView();
// 	}
// 	if(adv.m==adv.n+5){
// 		moveView()
// 	}
// 	if(adv.count-adv.m<5){
// 		moveView(adv.count-5)
// 	}
// 	changekuang(adv.m)
// })
//点击图片也可以切换
var itemList=$(".div_item")
for(var i=0;i<itemList.length;i++){
	$(".div_item").eq(i).click(function(){
		$(".div_item").find(".item_kuang").removeClass("show")
		$(this).find(".item_kuang").addClass("show")	
	})
}

// $(".tuo_tiao").mousedown(function(event){
// 	var X=event.clientX;
// 	var ml=parseInt(this.style.left)
// 	var _this=this;
// 	var scrollableWidth = $(this).parent().width() - $(this).width();
// 	body.onselectstart = function(){
// 		return false;
// 	}
// 	window.onmousemove=function(event){
// 		var x=event.clientX;
// 		var nowml=parseInt(_this.style.left);
// 		if(x - X + ml > scrollableWidth){
// 			return
// 		}
// 		if(x - X + ml < 0){
// 			return 
// 		}
// 		else{
// 			_this.style.left = x - X + ml + "px";
// 		}
// 		var progress = Math.round(nowml/scrollableWidth * 100) / 100;
// 		itemWrap.css({
// 			marginLeft:-((itemWrap.width() - 600) * progress)
// 		})
// 	}
// 	window.onmouseup = function(){
// 		window.onmousemove = null;
// 		body.onselectstart = null;
// 	}
// })

