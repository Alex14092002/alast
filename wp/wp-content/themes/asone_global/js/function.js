//サイドメニューリサイズ判定関数
function side_nav_judgment(){
   const cl = [].slice.call(document.querySelectorAll("ul.category_list"));
   cl.forEach(function(target){
      const list = target.querySelectorAll("li");
      const size = parseInt(target.getBoundingClientRect().top + target.offsetHeight,10);
      const browserSize = window.innerHeight;
      if(size > browserSize || size < browserSize - 10){
         const height = target.offsetHeight - (size - browserSize) - 10;
         var h_sum = 0;
         list.forEach(function(t){
            h_sum += t.offsetHeight;
         });
         if(height > h_sum){
            target.style.height = "";
            target.style.overflowY = "hidden";
         }
         else{
            target.style.height = height + 'px';
            target.style.overflowY = "scroll";
         }
      }
   });
}

function img_resize() {
   let header_height = $(".header").innerHeight();
   let margin_height = header_height + 'px'

   let footer_nav_bottom = $(".sp_footer_nav").innerHeight();
   let btn_menue_wrapper = document.querySelector(".btn_menue_wrapper");

   let body_height = btn_menue_wrapper.getBoundingClientRect().top + btn_menue_wrapper.offsetHeight;


   if (window.matchMedia('(max-width: 767px)').matches) {
      //スマホ処理
      $('#header_margin').css({
         'margin-top': margin_height
      });
      $('.footer_nav_wrapper').css({
         'top': body_height + 'px',
         'bottom': footer_nav_bottom + 'px'
      });
   } else if (window.matchMedia('(min-width:768px)').matches) {
      //PC処理
      $('#header_margin').css({
         'margin-top': margin_height
      });
   }
   side_nav_judgment();
}

$(window).on('load', function () {

   //$(window).on('resize', img_resize);
   //const obs = new MutationObserver(img_resize);
   //const config = {attributes: true, subtree: true};
   //obs.observe(document.body,config);

   side_nav_judgment();
   //nav_move();
});


$(function() {

   $(".post_inner img").each(function(index, el) {
      if($(this).attr("width")){
         $(this).css({width:$(this).attr("width")+"px"});
      }
      if($(this).attr("height")){
         $(this).css({height:$(this).attr("height")+"px"});
      }
   });
	
var headerHeight = $('.header').outerHeight();
var urlHash = location.hash;
if(urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function(){
        var target = $(urlHash);
        var position = target.offset().top - headerHeight;
        $('body,html').stop().animate({scrollTop:position}, 400);
    }, 100);
}
$('a[href^="#"]').click(function() {
    var href= $(this).attr("href");
    var target = $(href);
    var position = target.offset().top - headerHeight;
    $('body,html').stop().animate({scrollTop:position}, 400);
});

	//img_resize();

   $('.slide_img_list').slick({
   autoplay: true,
   autoplaySpeed: 4200,
   lazyLoad: 'progressive',
   speed: 870,
   dots: true,
   arrows: true,
   prevArrow: '<div class="main-slide-arrow slide-arrow prev-arrow"><div class="slide-arrow-inner"></div></div>',
   nextArrow: '<div class="main-slide-arrow slide-arrow next-arrow"><div class="slide-arrow-inner"></div></div>',
   centerMode: false,
  });

   $('.footer_banner_list').slick({
   autoplay: false,
   autoplaySpeed: 4200,
   lazyLoad: 'progressive',
   slidesToShow: 4,
   slidesToScroll: 1,
   speed: 870,
   dots: true,
   arrows: true,
   prevArrow: '<div class="main-slide-arrow slide-arrow prev-arrow"><div class="slide-arrow-inner"></div></div>',
   nextArrow: '<div class="main-slide-arrow slide-arrow next-arrow"><div class="slide-arrow-inner"></div></div>',
   centerMode: false,
  });


  $('.side_nav .btn_item').click(function() {
    let index = $('.side_nav .btn_item').index(this);
    $('.side_nav .btn_item').removeClass('act');
    $(this).addClass('act');
    $('.tab_change_area .tab_change_item').removeClass('show').eq(index).addClass('show');
    side_nav_judgment();
  });


  $('.category_item').each(function(index, element) {
	  $(this).find(".item_inner .icon_plus").on("click",function(){
		$(".side_nav .sub_cat").removeClass("act");
	  	if(!$(this).hasClass("act")){
			  if(!$(".back_box").length){
			  $("#header_margin").before('<div class="back_box"></div>');
			  }
			  $(".back_box").on('click',function(){
			  $(".side_nav .sub_cat").removeClass("act");
			  $(".item_inner .icon_plus").removeClass("act");
			  $(".back_box").remove();
			  });
			  $(".no_"+index).addClass("act");
			  $(".item_inner .icon_plus").removeClass("act");
			  $(this).addClass("act");
	  	}else{
			  $(".no_"+index).removeClass("act");
			  $(this).removeClass("act");
			  $(".back_box").remove();
	  	}
	  })

  });


  $('.view_more_btn').prevAll().hide();
  $('.view_more_btn').click(function () {
    if ($(this).prevAll().is(':hidden')) {
       $(this).prevAll().slideDown();
       $(this).children('.view_more_btn_inner').children('p').text('CLOSE').addClass('close');
    } else {
       $(this).prevAll().slideUp();
       $(this).children('.view_more_btn_inner').children('p').text('VIEW MORE').removeClass('close');
      }
  });


   $('.header .btn_menue_wrapper').on('click', function () {
   $('.footer_nav_wrapper').toggleClass('active');
   $(this).children().toggleClass('active');
   $('.modal_nav').toggleClass('active');
   $('header .nav_list').toggleClass('active');
   $('header .inner').toggleClass('active');
   return false;
  });


   $('.main_content .link').on('click', function() {
   $('.modal_nav').toggleClass('active');
   $('.modal_message').toggleClass('active');
   $('.modal_nav').toggleClass('active');
   $('header .nav_list').toggleClass('active');
   $('header .inner').toggleClass('active');
   $('header .btn_menue_wrapper').toggleClass('none');
   $('header.header').toggleClass('none');
   return false;
   });


   $('.sp_contact_area').on('click', function() {
      $('.sp_modal_area').addClass('active');
   return false;
   });


   $('.close_btn_wrapper').on('click', function() {
      $('.sp_modal_area').removeClass('active');
   return false;
   });


   $('.modal_message .modal_close_btn .btn_menue_wrapper').on('click', function() {
   $('.modal_nav').removeClass('active');
   $('.modal_message').removeClass('active');
   $('.modal_nav').removeClass('active');
   $('header .nav_list').removeClass('active');
   $('header .inner').removeClass('active');
   $('header .btn_menue_wrapper').removeClass('none');
   $('header.header').removeClass('none');
   return false;
  });
});

/*
function nav_move(){
   const nav = document.querySelector("div.side_nav");
   const hd = document.querySelector("header");
   const imp = document.querySelector("div.important_news");
   const ft = document.querySelector("div.footer_banner");
   var flag = 0;
   var mark = 0;
   function set(){
      return (- nav.offsetHeight + ft.getBoundingClientRect().top - 20 + 'px');
   }
   window.addEventListener("scroll",function(){
      if(flag){
         if(nav.getBoundingClientRect().top > hd.offsetHeight){
            nav.style.top = hd.offsetHeight + 'px';
            flag = 0;
         }
         else if((ft.getBoundingClientRect().top - 20) > mark){
            nav.style.top = "";
            flag = 0;
         }
         else{
            nav.style.top = set();
         }
      }
      else if(nav.getBoundingClientRect().top + nav.offsetHeight > (ft.getBoundingClientRect().top - 20)){
         mark = nav.getBoundingClientRect().top + nav.offsetHeight;
         nav.style.top = set();
         flag = 1;
      }
      else{
         if(imp.getBoundingClientRect().top + imp.offsetHeight > hd.offsetHeight){
            nav.style.top = imp.getBoundingClientRect().top + imp.offsetHeight + 'px';
         }
         else{
            nav.style.top = hd.offsetHeight + 'px';
         }
      }
   });
}
*/
