(async function(){
var D=window.D=await loadData();applyTheme(D.theme);
var H=D.home,A=D.about,S=D.services,C=D.contact,I=D.images||{},P=D.projects||[];
var nl=function(s){return esc(s).replace(/\n/g,'<br>')};
document.title=H.brand+' | Video Editor';document.getElementById('logo').innerHTML=esc(H.brand)+'<b>.</b>';
function card(p,i){var id=ytId(p.u),v=p.vert||/youtube\.com\/shorts\//.test(p.u||''),th=p.img||(id?'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg':'');
 return '<div class="card'+(v?' v':'')+'" data-c="'+esc(p.c)+'"><div class="th" data-i="'+i+'" data-id="'+id+'"'+(p.ap&&id?' data-auto="1"':'')+'>'+(th?'<img src="'+esc(th)+'" alt="'+esc(p.t)+'" loading="lazy">':'<span class="ph"></span>')+(id?'<button class="play" aria-label="Play '+esc(p.t)+'"></button>':'')+'</div><div class="meta"><h3>'+esc(p.t)+'</h3><em>'+esc(p.c)+'</em></div></div>'}
var feat=P.map(function(p,i){return[p,i]}).filter(function(x){return x[0].f}).slice(0,Math.max(1,+H.featured_count||3));
var cats=P.map(function(p){return p.c}).filter(function(c,i,a){return a.indexOf(c)==i});
var wa=String(C.whatsapp||'').replace(/\D/g,''),ini=H.brand.split(' ').map(function(w){return w[0]||''}).join('').slice(0,2).toUpperCase();
var photo=function(u){return '<div class="photo">'+(u?'<img src="'+esc(u)+'" alt="">':'<span>'+esc(ini)+'</span>')+'</div>'};
var cvUrl=H.cv||'cv.pdf';
var h='<div class="hero wrap" id="home"><div><span class="badge"><i></i>'+esc(H.badge)+'</span><div class="hi">'+esc(H.hi)+'</div><h1>'+esc(H.name)+'</h1><div class="role">'+esc(H.title)+'</div><p>'+nl(H.tagline)+'</p><div class="cta"><a class="btn btn-white" href="#work">'+esc(H.cta1)+'</a><a class="btn btn-orange" href="#contact">Hire me</a><a class="btn btn-white" href="'+esc(cvUrl)+'" download="Salman-Ahmed-CV.pdf">Download CV</a></div></div>'+photo(I.profile)+'</div>';
h+='<section class="wrap" id="featured"><h2>'+esc(H.featured_title)+'</h2><div class="grid">'+feat.map(function(x){return card(x[0],x[1])}).join('')+'</div></section>';
h+='<section class="wrap" id="work"><h2>'+esc(D.portfolio.title)+'</h2><p class="lead">'+nl(D.portfolio.intro)+'</p><div class="filters"><button class="on" data-f="">All</button>'+cats.map(function(c){return'<button data-f="'+esc(c)+'">'+esc(c)+'</button>'}).join('')+'</div><div class="grid" id="pg">'+P.map(card).join('')+'</div></section>';
h+='<section class="wrap" id="about"><h2>'+esc(A.title)+'</h2><div class="two"><div><p>'+nl(A.p1)+'</p><p>'+nl(A.p2)+'</p><div class="stats">'+A.stats.map(function(s){return'<div class="stat"><b>'+esc(s.n)+'</b><span>'+esc(s.l)+'</span></div>'}).join('')+'</div></div>'+photo(I.about||I.profile)+'</div></section>';
h+='<section class="wrap" id="skills"><h2>'+esc(A.skills_title)+'</h2><div class="skills">'+A.skills.map(function(s){var p=Math.max(0,Math.min(100,parseInt(s.p)||0));return'<div class="sk"><div class="top"><span>'+esc(s.n)+'</span><span class="pct">'+p+'%</span></div><div class="bar"><i style="width:'+p+'%"></i></div></div>'}).join('')+'</div></section>';
h+='<section class="wrap" id="services"><h2>'+esc(S.title)+'</h2><p class="lead">'+nl(S.intro)+'</p><div class="grid">'+S.items.map(function(s){return'<div class="card sv"><h3>'+esc(s.t)+'</h3><p>'+nl(s.d)+'</p>'+(s.p?'<strong>'+esc(s.p)+'</strong>':'')+'</div>'}).join('')+'</div></section>';
h+='<section class="wrap contact" id="contact"><h2>'+esc(C.title)+'</h2><p class="lead">'+nl(C.intro)+'</p><a class="mail" href="mailto:'+esc(C.email)+'">'+esc(C.email)+'</a><div class="cta"><a class="btn" href="mailto:'+esc(C.email)+'">Send an email</a>'+(wa?'<a class="btn btn-wa" href="https://wa.me/'+wa+'" target="_blank" rel="noopener">Chat on WhatsApp</a>':'')+'</div></section>';
document.getElementById('app').innerHTML=h;
document.getElementById('foot').innerHTML='<div class="wrap">'+Object.keys(C.social||{}).filter(function(k){return C.social[k]}).map(function(k){return'<a href="'+esc(C.social[k])+'" target="_blank" rel="noopener">'+esc(k.charAt(0).toUpperCase()+k.slice(1))+'</a>'}).join(' ')+'<p>&copy; '+new Date().getFullYear()+' '+esc(H.brand)+'</p></div>'+(wa?'<a class="wa" href="https://wa.me/'+wa+'" target="_blank" rel="noopener">WhatsApp</a>':'');
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
function load(th,auto){var p=P[th.dataset.i],id=th.dataset.id;if(!id||th.querySelector('iframe'))return;
 var q=new URLSearchParams({autoplay:1,mute:(auto||p.mu)?1:0,controls:p.ct===false?0:1,loop:p.lp?1:0,rel:0,modestbranding:1,playsinline:1});
 if(p.lp)q.set('playlist',id);if(parseInt(p.st))q.set('start',parseInt(p.st));
 th._h=th.innerHTML;th.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?'+q+'" title="'+esc(p.t)+'" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'}
document.addEventListener('click',function(e){var b=e.target.closest('.play');if(b)load(b.parentNode,false);var f=e.target.closest('.filters button');if(f){document.querySelectorAll('.filters button').forEach(function(x){x.classList.remove('on')});f.classList.add('on');document.querySelectorAll('#pg .card').forEach(function(c){c.style.display=(!f.dataset.f||c.dataset.c===f.dataset.f)?'':'none'})}});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){var th=e.target;if(e.isIntersecting)load(th,true);else if(th._h){th.innerHTML=th._h;th._h=0}})},{threshold:.6});document.querySelectorAll('#pg .th[data-auto]').forEach(function(t){io.observe(t)})}
})();
