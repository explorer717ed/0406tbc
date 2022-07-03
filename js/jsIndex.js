$(document).ready(function(){
    
    // $(window).load(function(){
    //     $('.loadingWrap').hide();
    // })
    // 選單展開
        $('.navbtn').click(function(){
            $('header').toggleClass('hideNav');
            $('.navSwitchbar').toggleClass('closeNav');
            // $('.navbtn').toggleClass('navbtnIn');
        })
    //選單點擊
        $('.headerLogo').click(function(){
            $('html,body').animate({scrollTop:$('#banner').offset().top},800)
        })
        $('.menuNews').click(function(){
            $('html,body').animate({scrollTop:$('#news').offset().top},800)
        })
        $('.menuStory').click(function(){
            $('html,body').animate({scrollTop:$('#story').offset().top},800)
        })
        $('.menuChar').click(function(){
            $('html,body').animate({scrollTop:$('#char').offset().top},800)
        })
        $('.menuFea').click(function(){
            $('html,body').animate({scrollTop:$('#gameFea').offset().top},800)
        })
        $('.menuDown').click(function(){
            $('html,body').animate({scrollTop:$('#download').offset().top},800)
        })
        $('.footerLogo').click(function(){
            $('html,body').animate({scrollTop:$('#banner').offset().top},800)
        })
    //選單位置
        // $(window).scroll(function(){
        //     var curPos = $(window).scrollTop();
            
        //     var newsPos = $('#news').offset().top;
        //     var storyFeaPos = $('#story').offset().top;
        //     var charPos = $('#char').offset().top;
        //     var gameFeaPos = $('.gameFea').offset().top;
        //     var downPos = $('#download').offset().top;
            

        //     if(curPos >= newsPos){
        //         $('nav a::before').css('width',100);
        //     }

        // })





    
    //角色的隨機試聽 Evan
        //音檔名稱陣列
        var evanVoiceNum=['5-1','5-2','5-3','5-4'];
        function ranVoiceEvan(){
            //先移除既有音訊
            $('#randomVoice').remove();
            //隨機檔名
            var randVoice = evanVoiceNum[Math.floor(Math.random()*evanVoiceNum.length)];
            var voiceSource = '<audio id="randomVoice" preload="auto" autoplay>';
            voiceSource += `<source src="ado/${randVoice}.mp3" type="audio/mp3"><source src="ado/${randVoice}.ogg" type="audio/ogg"></audio>`;
                
            //寫出html,此處會在所有角色頁面生成，之後要改為id
            $('.randomVoiceWrap').html(voiceSource);

        }

        //click事件
        $('#evanVoice').click(function(){
            ranVoiceEvan();
        })



    //取得視窗寬度
    var wdth;
        wdth = $(window).width();
        $(window).resize(function() {
            wdth=$(window).width();
        });

    if(wdth <= 992){   
    // 人物展開
        $('#charbooklink5').click(function(){
            $('#char5S').slideToggle(500);
            
        })
        $('#char5S .charClose').click(function(){
            $('#char5S').slideUp(500);
        })
    }else if(wdth > 992){

    //banner的hover
        var charsvg=document.getElementsByClassName("st");
        var charimgs=document.getElementsByClassName("bancharimg");

        var sts= $('.st');
        $('.st').mouseover(function(){
            var bansvg = $(this);
            var charNum = sts.index(bansvg);
            $(charimgs[charNum]).css('opacity',0);
        }).mouseleave(function(){
            var bansvg = $(this);
            var charNum = sts.index(bansvg);
            $(charimgs[charNum]).css('opacity',1);
        })
    
    //banner click

        $('.st').click(function(){
            $('html,body').animate({scrollTop:$('#char').offset().top},800)
        })

    //角色書翻頁效果
        //頁數陣列
        var pages = $('.charpage');
        //書頁click事件
        $('.clickarea').click(function(){
            var page = $(this).parent();
            var pageNum = pages.index(page)+1;
            if(pageNum%2==0){ //                左側頁面被click，移除屬性
                page.removeClass('turned');
                page.prev().removeClass('turned');
            }else{//                            右側頁面被click，加入屬性
                page.addClass('turned');
                page.next().addClass('turned');
            }
        })
    
    //角色頁連結hover頭像
        //角色連結陣列(此變數也有使用在後面的連結翻頁)
        var charls = $('.charbooklink');
        //滑鼠移入效果
        $('.charbooklink').mouseover(function(){
            var charl = $(this);
            //取得對應到的圖片索引值
            var charlnum = charls.index(charl);
            //依索引值選取圖片，pointerEvent是為了將來可能作為連結吧
            $(`.charbooklinkimg:eq(${charlnum})`).css({ 
                opacity:1,
                }
            );
            //滑鼠移出
        }).mouseleave(function(){
            $('.charbooklinkimg').css({
                opacity:0,
                })
            })
    
        //角色連結的翻頁
        $('.charbooklink').click(function(){
                var charl = $(this);
                //取得link索引值對應要翻書的頁數
                var charltopage = (charls.index(charl) * 2) + 1;
                //index為負值似乎會作用在[0]上，所以使用if排除第一頁的翻頁
                if(charltopage==1){
                    $('.charpage').removeClass('turned');
                }else{
                    $(`.charpage:eq(${charltopage-2})`).addClass('turned');//翻自己
                    $(`.charpage:eq(${charltopage-2})`).prevUntil('.charpagestart').addClass('turned');//翻自己前面的所有頁
                    $(`.charpage:eq(${charltopage-1})`).nextUntil('charpageend').removeClass('turned');//把自己後面的所有頁移除屬性
                }
                
            })
    
    
        
    
    //遊戲特色動畫
        $(window).scroll(function(){
        //固定手機位置
            // 取得目前卷軸位置、遊戲特色、下載區塊至文件最上方的距離
            var curPos = $(window).scrollTop();
            var gameFeaPos = $('.gameFea').offset().top;
            var downPos = $('.download').offset().top;
            // 固定手機
            if(curPos<gameFeaPos){
                $('.phone').removeClass('phoneFix');
            }else if(curPos<downPos){
                $('.phone').addClass('phoneFix');
            }else if(curPos>downPos){
                $('.phone').removeClass('phoneFix');
            }
    
            var winHei = $(window).height();
        //遊戲說明框跳出
            //目前畫面底部的位置(不取最下方)
            var curPosB = (winHei*0.8)+curPos;
            //每個對話框的動作
            $('.feaDesc').each(function(){
                //對話框上下距文件頂端的距離
                var descPos = $(this).offset().top;
                var descHei = $(this).outerHeight();
                var descPosBot = descPos + descHei;
    
                //每個對話框分開加入class(對話框頂<畫面底、對話框底>畫面頂)
                if(descPos <= curPosB && descPosBot >= curPos){
                    $(this).addClass('slideLeft');
                }
            })
        
        //手機螢幕切換
            //取得對話框減一個視窗高的位置
            var msgDescPos = $('.featureMsg').offset().top - winHei*0.8;
            var vrDescPos = $('.featureVr').offset().top - winHei*0.8;
            var mindDescPos = $('.featureMind').offset().top - winHei*0.8;
            var cafeDescPos = $('.featureCafe').offset().top - winHei*0.8;
            var shopDescPos = $('.featureShop').offset().top - winHei*0.8; 
            // alert(msgDescPos);
    
            //畫面隨卷軸高度切換
            if(curPos <= vrDescPos){
                $('.feaMsgScreen').removeClass('aniMsgScreen');
            }else if(curPos > vrDescPos && curPos <= mindDescPos){
                $('.screenMask img').css('opacity',0);
                $('.feaMsgScreen').addClass('aniMsgScreen')
                $('.feaVrDia,.feaVrScreen,.feaMsgScreen').css('opacity',1);
            }else if(curPos > mindDescPos && curPos <= cafeDescPos){
                $('.screenMask img').css('opacity',0);
                $('.feaMindDia,.feaVrScreen').css('opacity',1);
            }else if(curPos > cafeDescPos && curPos <= shopDescPos){
                $('.screenMask img').css('opacity',0);
                $('.feaCafeScreen').css('opacity',1);
            }else if(curPos > shopDescPos){
                $('.screenMask img').css('opacity',0);
                $('.feaShopScreen').css('opacity',1);
            }
        })
    }
    
})//documentReady
        
        