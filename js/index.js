window.onload=function(){
	
		
//audio 对象的属性方法和事件
audio=document.querySelector('audio');

//暂停播放 
/*var playpause = function(){
    var src  = audio.getAttribute('src');
    if(!src){yinyueku(0); lis[0].classList.add("play_current"); return;}
    if(audio.paused){audio.play();}else{audio.pause();}
  };
  btnplay.onclick = playpause;*/     

 btnplay.onclick=function(){
  
  if(audio.paused){
  
  audio.play();
  
}else{
  audio.pause();
  
};
};
audio.onplay=function(){
  btnplay.className='pause_bt';
  /*btnplay.classList.remove=('pause_bt');*/
};
audio.onpause=function(){
  btnplay.className='play_bt';
};


//调节音量
spanvolume.onclick=function(ev){
  var v=ev.offsetX/this.offsetWidth;
  audio.volume=v;
};
audio.onvolumechange=function(){
 if(audio.volume===0){
  spanmute.classList.add('volume_mute');
}else{
  spanmute.classList.remove('volume_mute');
};
/*var l=vol.offsetWidth*audio.volume-spanvolumeop.offsetWidth/2;*/

spanvolumeop.style.left=audio.volume*100+'%';
spanvolumebar.style.width=audio.volume*100+'%';
};

//静音调节      
spanmute.onclick=(function(){
  var oldvolume;
  return function(){
   if(audio.volume!=0){
    oldvolume=audio.volume;
    audio.volume=0;
  }else{
    audio.volume=oldvolume;
  }
}

})();
spanvolumeop.onclick=function(ev){
 ev.stopPropagation();
};

//音乐列表   
 var yinyueku=[
 {name:'because of you',src:'1234.mp3',geshou:'kelly',duration:'03:42'},
 {name:'我很快乐',src:'kuaile.mp3',geshou:'刘惜君',duration:'03:33'},
 {name:'终于等到你',src:'dengdaoni.mp3',geshou:'张靓颖',duration:'04:55'}
 ]
 var currentsongindex;//记录当前几首歌
 var LIEBIAO=1,SHUNXU=2,DANQU=4,SUIJI=3;
 var currentbofangway=LIEBIAO;     
 var deawlist=function(){
  var el='';
  for (var i = 0; i < yinyueku.length; i++) {
    el += '<li mid="j0"class=""><strong class="music_name"title="'+yinyueku[i].name+'">'+yinyueku[i].name+'</strong><strong class="singer_name"title="'+yinyueku[i].geshou+'">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
    
  };
  divsonglist.firstElementChild.innerHTML=el;
  spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>';
};
deawlist();
var lis=divsonglist.firstElementChild.children;
for (var i = 0; i < lis.length; i++) {
  lis[i].index=i;
  lis[i].onclick=function(){
    audio.src=yinyueku[this.index].src ;
    currentsongindex=this.index;
    audio.play();
    onsongchang();
  };

  lis[i].onmouseover=function(){
    this.classList.add('play_hover')
  };
  lis[i].onmouseout=function(){
    this.classList.remove('play_hover')
  };
};


//列表换歌
var onsongchang=function(){
  for (var i = 0; i < lis.length; i++) {
    lis[i].classList.remove('play_current');
  };
  lis[currentsongindex].classList.add("play_current");
  var cu=yinyueku[currentsongindex];
  document.querySelector('.music_name').innerHTML=cu.name;
  document.querySelector('.singer_name').innerHTML=cu.geshou;
  document.querySelector('.music_op').style.display="block";
  document.querySelector('#ptime').innerHTML=cu.duration;

};
btnPlayway.onclick=function(){
 divselect.style.display='block';
};
//进度条时间显示
    var timeShow= document.querySelector('.time_show');
    var zhuanhuan=function(time){
        var minutes=parseInt(time/60);
        var s=parseInt(time-minutes*60);
        minutes=(minutes<10)?('0'+minutes):minutes;
        s=(s<10)?('0'+s):s;
        return minutes+':'+s;
    }

//进度条
    downloadbar.onmouseover=spanplaybar.onmouseover=function(ev){
        timeShow.style.display='block';
        timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+"px";
        var time=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
        timeShow.firstElementChild.innerHTML=zhuanhuan(time);
        downloadbar.onmousemove=function(ev){
            timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+'px';
            var time=time=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
            timeShow.firstElementChild.innerHTML=zhuanhuan(time);
        }
    }
    downloadbar.onmouseout = spanplaybar.onmouseout = function (ev){
            timeShow.style.display = "none"
        }
    downloadbar.onclick=function(ev){
        audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
    }
    spanplaybar.onclick=function(ev){
        audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
    }
    audio.ontimeupdate=function(){
        spanprogress_op.style.left=this.currentTime/this.duration*100+'%';
        spanplaybar.style.width=this.currentTime/this.duration*100+'%';
        

        if(audio.ended){
            if(currentbofangway==DANQU){
                audio.play();
            }else if(currentbofangway==LIEBIAO){
                nextSong();
            }else if(currentbofangway==SUIJI){
                randomSong();
            }else if(currentbofangway==SHUNXU){
                if(currentsongindex!=yinyueku.length-1){
                    nextSong();
                }
            }
        } 
     }

     var randomSong=function(){
        currentsongindex=Math.floor(Math.random()*yinyueku.length);
        audio.src=yinyueku[currentsongindex].src;
        audio.play();
        onsongchange();
    };


 //切歌  
 document.querySelector('.next_bt').onclick=nextSong;
 document.querySelector('.prev_bt').onclick=nextSong;


//上一曲，下一曲

var nextSong=function(){
  if(currentsongindex=="undefined") return;
  currentsongindex+=1;
  currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
  audio.src=yinyueku[currentsongindex].src ;
  audio.play();
  onsongchang();
}
var prevSong=function(){
  currentsongindex-=1;
  currentsongindex=(currentsongindex==-1)?yinyueku.length-1:currentsongindex;
  audio.src=yinyueku[currentsongindex].src ;
  audio.play();
  onsongchang();
}

document.querySelector('.next_bt').onclick=nextSong;
document.querySelector('.prev_bt').onclick=prevSong;

//播放模式      
setbofangmoshi=function(num){
  currentbofangway=num;
  divselect.style.display="none";
  var data={

        4:"cycle_single_bt",  //单曲循环
        2:"ordered_bt",       //顺序播放
        1:"cycle_bt",     //列表循环
        3:"unordered_bt"    //随机播放
      };
      btnPlayway.className=data[num];
    };/**/
  /*var playbt = 'cycle_bt';   
    for(var i = 0; i<divselect.children.length; i++){
    divselect.children[i].onclick = function(){
      this.parentElement.style.display  = 'none';
      btnPlayway.className = this.className;
      playbt = this.className;
    };
  }*/

//清除列表  
clear_list.onclick=function(){
  yinyueku=[];
  deawlist();
  uirest();
}

var uirest=function(){
  document.querySelector('.music_name').innerHTML="<span>听我想听的歌</span>";
  document.querySelector('.singer_name').innerHTML="<span>QQ音乐</span>";
  document.querySelector('.music_op').style.display="none";
  document.querySelector('.play_date').innerHTML="";
  audio.src='';
  spanvolumeop.style.left='0%';
  spanvolumebar.style.width='0%';
  btnplay.className="play_bt";

}

spansongnum1.onclick  = function(){
    if(divplayframe.style.display == 'block'){
     $('#divplayframe').animate({opacity:0},200,function(){
        divplayframe.style.display = 'none';
      });
    }else{
      divplayframe.style.display = 'block';
     $('#divplayframe').animate({opacity:1},200);
    }
  };
btnclose.onclick = function(){
    $('#divplayframe').animate({opacity:0},200,function(){
      divplayframe.style.display = 'none';
    });
  };

var flag = true;
  btnfold.onclick = function(){
    divplayframe.style.display = 'none';
    if(flag){
      $('#divplayer').animate({left:'-540px'},200); flag = false;
      divplayer.className = 'm_player m_player_folded';
    }else{
      $('#divplayer').animate({left:'0px'},200); flag = true;
      divplayer.className = 'm_player';
    }
  };


}