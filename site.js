(async function(){
var D=window.D=await loadData();applyTheme(D.theme);
if(!Array.isArray(D.featured))D.featured=JSON.parse(JSON.stringify(DEFAULTS.featured));
if(Array.isArray(D.projects))D.projects.forEach(function(p){p.v=p.v||p.u||'';});
if(Array.isArray(D.featured))D.featured.forEach(function(f){f.v=f.v||f.u||'';});
var H=D.home,A=D.about,S=D.services,C=D.contact,I=D.images||{},P=D.projects||[];
var nl=function(s){return esc(s).replace(/\n/g,'<br>')};
document.title=H.brand+' | Video Editor';document.getElementById('logo').innerHTML=esc(H.brand)+'<b>.</b>';

function playerHtml(vidUrl,posterUrl,isAuto,isMuted,label,extraClass,eager){
 var vid=esc(vidUrl||''),post=esc(posterUrl||''),auto=isAuto?'1':'0',mu=isMuted!==false?'1':'0';
 if(!vid){
  return '<div class="vp-wrap '+(extraClass||'')+'">'+(post?'<img src="'+post+'" alt="'+esc(label||'')+'" loading="lazy">':'<span class="ph"></span>')+'</div>';
 }
 return '<div class="vp-wrap '+(extraClass||'')+'" data-ap="'+auto+'" data-mu="'+mu+'">'+
  (post?'<img class="vp-poster" src="'+post+'" alt="'+esc(label||'')+'" loading="lazy">':'')+
  '<video class="vp-vid" '+(eager?'src="'+vid+'" preload="metadata"':'data-src="'+vid+'" preload="none"')+' playsinline webkit-playsinline loop'+(isMuted!==false?' muted':'')+'></video>'+
  '<div class="vp-spinner" aria-hidden="true"></div>'+
  '<button class="vp-center-play" aria-label="Play '+esc(label||'')+'"><svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="29" stroke="rgba(255,255,255,.25)" stroke-width="2"/><path d="M24 20l20 10-20 10V20z" fill="#fff"/></svg></button>'+
  '<div class="vp-bar">'+
   '<button class="vp-btn vp-play" aria-label="Play or Pause"><svg class="ico-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg><svg class="ico-pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg></button>'+
   '<button class="vp-btn vp-mute" aria-label="Mute or Unmute"><svg class="ico-unmuted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg><svg class="ico-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg></button>'+
  '</div>'+
 '</div>';
}

function card(p,i){
 var v=p.vert||false,d=(i%3)+1;
 return '<div class="card reveal delay-'+d+(v?' v':'')+'" data-c="'+esc(p.c)+'">'+
  playerHtml(p.v||p.u,p.img,p.ap,p.mu,p.t,'th',false)+
  '<div class="meta"><h3>'+esc(p.t)+'</h3><em>'+esc(p.c)+'</em></div>'+
 '</div>';
}

var cats=P.map(function(p){return p.c}).filter(function(c,i,a){return a.indexOf(c)==i});
var wa=String(C.whatsapp||'').replace(/\D/g,''),ini=H.brand.split(' ').map(function(w){return w[0]||''}).join('').slice(0,2).toUpperCase();
var photo=function(u,ext){return '<div class="photo reveal-scale '+(ext||'')+'">'+(u?'<img src="'+esc(u)+'" alt="">':'<span>'+esc(ini)+'</span>')+'</div>'};
var cvUrl=H.cv||'cv.pdf';
var h='<div class="hero wrap" id="home"><div><span class="badge reveal delay-1"><i></i>'+esc(H.badge)+'</span><div class="hi reveal delay-2">'+esc(H.hi)+'</div><h1 class="reveal delay-3">'+esc(H.name)+'</h1><div class="role reveal delay-4">'+esc(H.title)+'</div><p class="reveal delay-5">'+nl(H.tagline)+'</p><div class="cta reveal delay-6"><a class="btn btn-white" href="#work">'+esc(H.cta1)+'</a><a class="btn btn-orange" href="#contact">Hire me</a><a class="btn btn-white" href="'+esc(cvUrl)+'" download="Salman-Ahmed-CV.pdf">Download CV</a></div></div>'+photo(I.profile)+'</div>';
var FV=Array.isArray(D.featured)&&D.featured.length?D.featured:[];
(function buildCarousel(){
 if(!FV.length){h+='<section class="wrap" id="featured"><h2>'+esc(H.featured_title)+'</h2><p style="color:var(--mute)">No featured videos yet. Add them in the admin panel.</p></section>';return;}
 var centerIdx=Math.floor(FV.length/2)||0;
 var slides=FV.map(function(p,i){
  return '<div class="fc-slide" data-fi="'+i+'">'+
   '<div class="fc-thumb">'+playerHtml(p.v||p.u,p.img,p.ap!==false,p.mu!==false,p.t,'fc-player',i===centerIdx)+'</div>'+
   '<div class="fc-info"><h3>'+esc(p.t)+'</h3></div>'+
  '</div>';
 }).join('');
 h+='<section id="featured"><div class="wrap"><h2 class="reveal">'+esc(H.featured_title)+'</h2></div>'+
  '<div class="fc-root reveal-scale delay-1"><button class="fc-arr fc-prev" aria-label="Previous">&#8249;</button><div class="fc-track" id="fc-track">'+slides+'</div><button class="fc-arr fc-next" aria-label="Next">&#8250;</button></div>'+
  '<div class="fc-dots reveal delay-2" id="fc-dots">'+FV.map(function(_,i){return'<button class="fc-dot'+(i===centerIdx?' on':'')+'" data-fj="'+i+'" aria-label="Slide '+(i+1)+'"></button>'}).join('')+'</div>'+
 '</section>';
})();
h+='<section class="wrap" id="work"><h2 class="reveal">'+esc(D.portfolio.title)+'</h2><p class="lead reveal delay-1">'+nl(D.portfolio.intro)+'</p><div class="filters reveal delay-2"><button class="on" data-f="">All</button>'+cats.map(function(c){return'<button data-f="'+esc(c)+'">'+esc(c)+'</button>'}).join('')+'</div><div class="grid" id="pg">'+P.map(card).join('')+'</div></section>';
h+='<section class="wrap" id="about"><h2 class="reveal">'+esc(A.title)+'</h2><div class="two"><div><p class="reveal delay-1">'+nl(A.p1)+'</p><p class="reveal delay-2">'+nl(A.p2)+'</p><div class="stats">'+A.stats.map(function(s,i){return'<div class="stat reveal-scale delay-'+(i+1)+'"><b>'+esc(s.n)+'</b><span>'+esc(s.l)+'</span></div>'}).join('')+'</div></div>'+photo(I.about||I.profile,'delay-2')+'</div></section>';
h+='<section class="wrap" id="skills"><h2 class="reveal">'+esc(A.skills_title)+'</h2><div class="skills">'+A.skills.map(function(s,i){var p=Math.max(0,Math.min(100,parseInt(s.p)||0));var d=(i%2)+1;return'<div class="sk reveal delay-'+d+'"><div class="top"><span>'+esc(s.n)+'</span><span class="pct">'+p+'%</span></div><div class="bar"><i style="width:'+p+'%"></i></div></div>'}).join('')+'</div></section>';
h+='<section class="wrap" id="services"><h2 class="reveal">'+esc(S.title)+'</h2><p class="lead reveal delay-1">'+nl(S.intro)+'</p><div class="grid">'+S.items.map(function(s,i){var d=(i%2)+1;return'<div class="card sv reveal delay-'+d+'"><h3>'+esc(s.t)+'</h3><p>'+nl(s.d)+'</p>'+(s.p?'<strong>'+esc(s.p)+'</strong>':'')+'</div>'}).join('')+'</div></section>';
h+='<section class="wrap contact" id="contact"><h2 class="reveal">'+esc(C.title)+'</h2><p class="lead reveal delay-1">'+nl(C.intro)+'</p><a class="mail reveal delay-2" href="mailto:'+esc(C.email)+'">'+esc(C.email)+'</a><div class="cta reveal delay-3"><a class="btn" href="mailto:'+esc(C.email)+'">Send an email</a>'+(wa?'<a class="btn btn-wa" href="https://wa.me/'+wa+'" target="_blank" rel="noopener">Chat on WhatsApp</a>':'')+'</div></section>';
document.getElementById('app').innerHTML=h;

// ── Global Video & Audio Manager ─────────────────────────────────────
var activeAudioVid=null;

function prepareVideo(v,prioritize){
 if(!v)return;
 if(!v.src && v.dataset.src){
  v.src=v.dataset.src;
 }
 if(prioritize){
  v.preload='auto';
 }else if(v.preload==='none'){
  v.preload='metadata';
 }
}

function stopAllOtherVideos(activeVid){
 document.querySelectorAll('.vp-wrap video').forEach(function(other){
  if(other!==activeVid){
   other.pause();
   other.muted=true;
   other._mutedByScroll=false;
   other._wasPlaying=false;
   if(other.preload==='auto'){
    other.preload='metadata';
   }
   var ow=other.closest('.vp-wrap');
   if(ow){
    ow.classList.add('is-muted');
    ow.classList.remove('is-playing','is-buffering');
   }
  }
 });
}

function playAndUnmuteVideo(v,wrap){
 if(!v)return;
 stopAllOtherVideos(v);
 prepareVideo(v,true);
 v.muted=false;
 activeAudioVid=v;
 v._mutedByScroll=false;
 v._wasPlaying=true;
 if(wrap){
  wrap.classList.remove('is-muted');
  wrap.classList.add('is-playing');
 }
 v.play().catch(function(){});
}

function muteAllOtherVideos(currentVid){
 stopAllOtherVideos(currentVid);
}

// ── Simple Video Players Init ────────────────────────────────────────
function initVideoPlayers(){
 document.querySelectorAll('.vp-wrap').forEach(function(wrap){
  var v=wrap.querySelector('video');
  if(!v)return;
  function updateState(){
   wrap.classList.toggle('is-playing',!v.paused);
   wrap.classList.toggle('is-muted',!!v.muted);
   if(!v.paused && !v.muted){
    if(activeAudioVid!==v){
     activeAudioVid=v;
     v._mutedByScroll=false;
     stopAllOtherVideos(v);
    }
   }
  }
  v.addEventListener('play',updateState);
  v.addEventListener('pause',updateState);
  v.addEventListener('volumechange',updateState);
  v.addEventListener('waiting',function(){wrap.classList.add('is-buffering');});
  v.addEventListener('playing',function(){wrap.classList.remove('is-buffering');});
  v.addEventListener('canplay',function(){wrap.classList.remove('is-buffering');});
  v.addEventListener('seeking',function(){wrap.classList.add('is-buffering');});
  v.addEventListener('seeked',function(){wrap.classList.remove('is-buffering');});
  v.addEventListener('error',function(){wrap.classList.remove('is-buffering');});
  updateState();

  wrap.addEventListener('click',function(e){
   var muteBtn=e.target.closest('.vp-mute');
   if(muteBtn){
    e.stopPropagation();
    if(v.muted){
     playAndUnmuteVideo(v,wrap);
    }else{
     v.muted=true;
     v._mutedByScroll=false;
     if(activeAudioVid===v){activeAudioVid=null;}
     wrap.classList.add('is-muted');
    }
    return;
   }

   var slide=wrap.closest('.fc-slide');
   if(slide && !slide.classList.contains('fc-active')){
    // Side carousel slides handled by track click listener to rotate to center
    return;
   }

   e.stopPropagation();
   if(v.paused || v.muted){
    // Click anywhere on video (center, sides, play button) -> start playing and unmute!
    playAndUnmuteVideo(v,wrap);
   }else{
    // If playing unmuted, clicking pauses
    v.pause();
    wrap.classList.remove('is-playing','is-buffering');
   }
  });
 });
}
initVideoPlayers();

// Click anywhere on portfolio card to play and unmute
document.addEventListener('click',function(e){
 var c=e.target.closest('#pg .card');
 if(c && !e.target.closest('.vp-wrap') && !e.target.closest('a,button')){
  var wrap=c.querySelector('.vp-wrap');
  var v=wrap?wrap.querySelector('video'):null;
  if(v && wrap){
   if(v.paused || v.muted){
    playAndUnmuteVideo(v,wrap);
   }else{
    v.pause();
    wrap.classList.remove('is-playing','is-buffering');
   }
  }
 }
});

// ── Featured Carousel Init ──────────────────────────────────────────
(function initCarousel(){
 var track=document.getElementById('fc-track');
 var dotsEl=document.getElementById('fc-dots');
 if(!track)return;
 var slides=Array.from(track.querySelectorAll('.fc-slide'));
 var n=slides.length;
 if(!n)return;
 var cur=Math.floor(n/2)||0;

 function stopAll(){
  slides.forEach(function(s){
   var v=s.querySelector('video');
   if(v){
    v.pause();
    if(v.preload==='auto')v.preload='metadata';
    if(activeAudioVid===v){
     v.muted=true;
     v._mutedByScroll=false;
     activeAudioVid=null;
     var w=v.closest('.vp-wrap');
     if(w){
      w.classList.add('is-muted');
      w.classList.remove('is-playing','is-buffering');
     }
    }
   }
  });
 }

 function playSlide(slide){
  var v=slide.querySelector('video');
  if(!v)return;
  prepareVideo(v);
  v.play().catch(function(){});
 }

 function goTo(idx,autoPlay,shouldUnmute){
  var prevActive=slides[cur];
  var wasAudible=prevActive?(prevActive.querySelector('video')&&!prevActive.querySelector('video').muted):false;
  stopAll();
  cur=((idx%n)+n)%n;
  var leftIdx=((cur-1)+n)%n;
  var rightIdx=(cur+1)%n;

  slides.forEach(function(s,i){
   s.classList.remove('fc-active','fc-left','fc-right','fc-far');
   if(i===cur){s.classList.add('fc-active');}
   else if(i===leftIdx){s.classList.add('fc-left');}
   else if(i===rightIdx){s.classList.add('fc-right');}
   else{s.classList.add('fc-far');}
  });

  if(dotsEl){
   dotsEl.querySelectorAll('.fc-dot').forEach(function(d,i){
    d.classList.toggle('on',i===cur);
   });
  }

  [cur,leftIdx,rightIdx].forEach(function(ci){
   if(slides[ci]){
    var sv=slides[ci].querySelector('video');
    if(sv)prepareVideo(sv);
   }
  });

  var newActive=slides[cur];
  if(newActive){
   var newWrap=newActive.querySelector('.vp-wrap');
   var newVid=newActive.querySelector('video');
   if(newVid&&newWrap){
    if(shouldUnmute || wasAudible){
     playAndUnmuteVideo(newVid,newWrap);
    }else if(autoPlay){
     prepareVideo(newVid);
     newVid.play().catch(function(){});
    }
   }
  }
 }

 goTo(cur);

 var prev=document.querySelector('.fc-prev'),next=document.querySelector('.fc-next');
 if(prev)prev.addEventListener('click',function(e){e.stopPropagation();goTo(cur+1,true);});
 if(next)next.addEventListener('click',function(e){e.stopPropagation();goTo(cur-1,true);});

 if(dotsEl){
  dotsEl.addEventListener('click',function(e){
   var d=e.target.closest('[data-fj]');
   if(d)goTo(+d.dataset.fj,true,true);
  });
 }

 // Touch/swipe interaction for mobile
 var tx=0,ty=0,tTime=0;
 track.addEventListener('touchstart',function(e){
  if(e.touches.length===1){
   tx=e.touches[0].clientX;
   ty=e.touches[0].clientY;
   tTime=Date.now();
  }
 },{passive:true});

 track.addEventListener('touchend',function(e){
  if(!e.changedTouches.length)return;
  var dx=e.changedTouches[0].clientX-tx;
  var dy=e.changedTouches[0].clientY-ty;
  var dt=Date.now()-tTime;
  if(Math.abs(dx)>35 && Math.abs(dx)>Math.abs(dy) && dt<650){
   if(dx<0){
    goTo(cur-1,true);
   }else{
    goTo(cur+1,true);
   }
  }
 },{passive:true});

 // Click on slide (click side slide -> move to center and play unmuted)
 track.addEventListener('click',function(e){
  var slide=e.target.closest('.fc-slide');
  if(!slide)return;
  var idx=+slide.dataset.fi;
  if(idx!==cur){
   goTo(idx,true,true);
  }
 });
})();

document.getElementById('foot').innerHTML='<div class="wrap reveal">'+Object.keys(C.social||{}).filter(function(k){return C.social[k]}).map(function(k){return'<a href="'+esc(C.social[k])+'" target="_blank" rel="noopener">'+esc(k.charAt(0).toUpperCase()+k.slice(1))+'</a>'}).join(' ')+'<p>&copy; '+new Date().getFullYear()+' '+esc(H.brand)+'</p></div>'+(wa?'<a class="wa" href="https://wa.me/'+wa+'" target="_blank" rel="noopener">WhatsApp</a>':'');
var mb=document.getElementById('menu-btn'),sn=document.getElementById('site-nav');
if(mb&&sn){
 mb.addEventListener('click',function(e){
  e.stopPropagation();var o=sn.classList.toggle('open');
  mb.setAttribute('aria-expanded',o);var t=mb.querySelector('span');if(t)t.textContent=o?'Close':'More';
 });
 sn.addEventListener('click',function(e){
  if(e.target.tagName==='A'){
   sn.classList.remove('open');mb.setAttribute('aria-expanded','false');
   var t=mb.querySelector('span');if(t)t.textContent='More';
  }
 });
 document.addEventListener('click',function(e){
  if(!sn.contains(e.target)&&!mb.contains(e.target)&&sn.classList.contains('open')){
   sn.classList.remove('open');mb.setAttribute('aria-expanded','false');
   var t=mb.querySelector('span');if(t)t.textContent='More';
  }
 });
}

// Portfolio filter & autoplay
document.addEventListener('click',function(e){
 var f=e.target.closest('.filters button');
 if(f){
  document.querySelectorAll('.filters button').forEach(function(x){x.classList.remove('on')});
  f.classList.add('on');
  document.querySelectorAll('#pg .card').forEach(function(c){
   var show=(!f.dataset.f||c.dataset.c===f.dataset.f);
   c.style.display=show?'':'none';
   if(!show){
    var v=c.querySelector('video');
    if(v){
     v.pause();
     if(activeAudioVid===v){
      v.muted=true;
      v._mutedByScroll=false;
      activeAudioVid=null;
      var w=v.closest('.vp-wrap');
      if(w)w.classList.add('is-muted');
     }
    }
   }
  });
 }
});

// ── Progressive Video Lazy Loader ────────────────────────────────────
if('IntersectionObserver' in window){
 var lazyVideoObserver=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
   if(entry.isIntersecting){
    var wrap=entry.target;
    var v=wrap.querySelector('video');
    if(v){
     prepareVideo(v);
     lazyVideoObserver.unobserve(wrap);
    }
   }
  });
 },{rootMargin:'250px 0px'});

 document.querySelectorAll('.vp-wrap').forEach(function(wrap){
  var v=wrap.querySelector('video');
  if(v && !v.src){
   lazyVideoObserver.observe(wrap);
  }
 });
}else{
 document.querySelectorAll('.vp-wrap video').forEach(function(v){
  prepareVideo(v);
 });
}

// ── Video Viewport & Audio Observer ─────────────────────────────────
if('IntersectionObserver' in window){
 var vio=new IntersectionObserver(function(es){
  es.forEach(function(e){
   var wrap=e.target;
   var v=wrap.querySelector('video');
   if(!v)return;

   if(e.isIntersecting){
    // Video has entered the viewport
    prepareVideo(v);

    // 1. Restore previous audio state if this video was playing with sound when scrolled away
    if(activeAudioVid===v && v._mutedByScroll){
     v.muted=false;
     v._mutedByScroll=false;
     wrap.classList.remove('is-muted');
     if(v._wasPlaying){
      prepareVideo(v,true);
      v.play().catch(function(){});
      v._wasPlaying=false;
     }
    }else{
     // 2. Play if active carousel slide or autoplay portfolio card
     var slide=wrap.closest('.fc-slide');
     if(slide){
      if(slide.classList.contains('fc-active')){
       v.play().catch(function(){});
      }
     }else if(wrap.dataset.ap==='1'){
      v.play().catch(function(){});
     }
    }
   }else{
    // Video has scrolled out of the viewport
    // 1. If playing with sound, automatically mute it and remember to restore when back in view
    if(!v.muted && !v.paused){
     v._mutedByScroll=true;
     v.muted=true;
     v._wasPlaying=true;
     wrap.classList.add('is-muted');
    }
    // 2. Pause video while out of view to preserve resources (playback position is preserved)
    v.pause();
    wrap.classList.remove('is-playing','is-buffering');
    if(v.preload==='auto'){
     v.preload='metadata';
    }
   }
  });
 },{threshold:0.15});
 document.querySelectorAll('.vp-wrap').forEach(function(t){vio.observe(t)});
}

// ── Scroll Reveal Observer ──────────────────────────────────────────
if('IntersectionObserver' in window){
 var ro=new IntersectionObserver(function(es){
  es.forEach(function(e){
   if(e.isIntersecting){
    e.target.classList.add('in-view');
    ro.unobserve(e.target);
   }
  });
 },{threshold:.1,rootMargin:'0px 0px -36px 0px'});
 document.querySelectorAll('.reveal,.reveal-scale').forEach(function(el){ro.observe(el)});
}else{
 document.querySelectorAll('.reveal,.reveal-scale').forEach(function(el){el.classList.add('in-view')});
}
})();
