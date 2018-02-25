//雪碧图图片循环
for(var i = 0 ; i < $(".liebiao span").length ; i++){
	$(".liebiao span")[i].style.backgroundPosition = i*-16 + "px" + " 0px";
}
	var n=0;   //当前图片
    var minionclick = false;  //模拟点击事件(事件锁)
    var isAnimation= false;   //解决多次点击按钮，动画飞出去(事件锁)
//生成小圆点函数：//传入参数为:轮播的整个div,是个JQuery对象;dian(span)的父级div,JQuery对象
function createDian(div,dianParent){ 
    for(var i=0;i<div.length;i++){
        var newDian=document.createElement("span");
        $(newDian).attr("dianxiabiao",i);//attr是设置/返回对象的属性值;将非法属性的下标设置为i的值
        dianParent[0].appendChild(newDian);//将新生成的dian插入到父级div里
    }
}
//点击小圆点函数:传两个参数,都是JQuery对象:轮播的整个div,通过父级获取span,例$(".dian span")
function clickDian(span,div){
    span.click(function(){
        div.hide();
        span.removeClass('focus');
        n = Number(this.getAttribute("dianxiabiao"));
        span.eq(n).addClass('focus')
        div.eq(n).fadeIn();
    })
}
//点击型轮播图函数:传三个参数,都是JQuery对象:方向,轮播的整个div,通过父级获取span,例$(".dian span")
//向右点击函数    
function lunbotuR(next,div,span){
    next.click(function(){
        div.hide()
        span.removeClass('focus')
        if(n < div.length-1){
            n++;
        }
        else{
            n=0;
        }
        div.eq(n).fadeIn();
        span.eq(n).addClass('focus');
    })
}
//向左点击函数
function lunbotuL(prev,div,span){
    prev.click(function(){
        div.hide();
        span.removeClass('focus');
        if(n > 0){
            n--;
        }
        else{
            n=div.length-1;
        }
        div.eq(n).fadeIn();
        span.eq(n).addClass('focus');
    })
}    
/*----------------------------第一个轮播图------------------------------*/
    createDian($(".banner1"),$(".firstlbt .dian"))               //生成小圆点
    $(".firstlbt .dian span").eq(0).addClass("focus")            //第一个小圆点显示
    clickDian($(".firstlbt .dian span"),$(".banner1"))           //点击小圆点
    lunbotuR($(".firstlbt .next"),$(".banner1"),$(".firstlbt .dian span")) //向右点击
    lunbotuL($(".firstlbt .prev"),$(".banner1"),$(".firstlbt .dian span")) //向左点击
// 自动播放
    // var autoPlay = setInterval(function(){
    //     $("#next").click();
    // },3000)
//轮播图里面的小div事件;鼠标移上右边div时更换当前图片
$(".banner1").mouseenter(function(){
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
/*----------------------------第二个轮播图------------------------------*/
    createDian($(".banner2"),$(".secondlbt .dian"))               //生成小圆点
    $(".secondlbt .dian span").eq(0).addClass("focus")            //第一个小圆点显示
    clickDian($(".secondlbt .dian span"),$(".banner2"))           //点击小圆点
    lunbotuR($(" .secondlbt .next"),$(".banner2"),$(".secondlbt .dian span")) //向右点击
    lunbotuL($(".secondlbt .prev"),$(".banner2"),$(".secondlbt .dian span")) //向左点击
/*----------------------------第三个轮播图------------------------------*/
    createDian($(".banner3"),$(".thirdlbt .dian"))               //生成小圆点
    $(".thirdlbt .dian span").eq(0).addClass("focus")            //第一个小圆点显示
    clickDian($(".thirdlbt .dian span"),$(".banner3"))           //点击小圆点
    lunbotuR($(" .thirdlbt .next"),$(".banner3"),$(".thirdlbt .dian span")) //向右点击
    lunbotuL($(".thirdlbt .prev"),$(".banner3"),$(".thirdlbt .dian span")) //向左点击
/*-------------------------------选项卡-----------------------------------*/
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
/*----------------------------------第四个轮播图---------------------------*/
 createDian($(".fourthlbt .secondlbt-right"),$(".fourthlbt .dian"))    //生成小圆点
$(".fourthlbt .dian span").eq(0).addClass("focus")            //第一个小圆点显示
clickDian($(".fourthlbt .dian span"),$(".fourthlbt .secondlbt-right"))    //点击小圆点
lunbotuR($(" .fourthlbt .next"),$(".fourthlbt .secondlbt-right"),$(".fourthlbt .dian span")) //向右点击
lunbotuL($(".fourthlbt .prev"),$(".fourthlbt .secondlbt-right"),$(".fourthlbt .dian span")) //向左点击