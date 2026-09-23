/* ── AUTOMORA TECH SOLUTIONS — Global Script ── */

/* ── THEME TOGGLE ── */
function toggleTheme(){
  const html=document.documentElement;
  const current=html.getAttribute('data-theme');
  const next=current==='light'?'dark':'light';
  if(next==='dark'){html.removeAttribute('data-theme');}
  else{html.setAttribute('data-theme','light');}
  localStorage.setItem('automora-theme',next);
}
(function(){
  const saved=localStorage.getItem('automora-theme');
  if(saved==='light')document.documentElement.setAttribute('data-theme','light');
})();

/* ── CURSOR ── */
const dot=document.getElementById('c-dot'),ring=document.getElementById('c-ring');
let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
if(dot&&ring){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function raf(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(raf);})();
  document.querySelectorAll('a,button,.bc,.team-card,.pkg-card,.num-cell,.svc-card,.phi-card,.testi-card,.pstep,.svc-card,.faq-q,.svc-row').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('hover-active'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hover-active'));
  });
}

/* ── REVEAL ── */
function doReveal(){
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target);}});
  },{threshold:.06});
  document.querySelectorAll('.rv:not(.show)').forEach(el=>obs.observe(el));
}
document.addEventListener('DOMContentLoaded',doReveal);

/* ── ANIMATED COUNTER ── */
function animateCounter(el){
  const target=parseInt(el.dataset.target);
  const duration=1800;
  const start=performance.now();
  function update(now){
    const p=Math.min((now-start)/duration,1);
    const ease=1-Math.pow(1-p,4);
    const val=Math.round(ease*target);
    el.textContent=val;
    if(p<1)requestAnimationFrame(update);
    else el.textContent=target;
  }
  requestAnimationFrame(update);
}
function initCounters(){
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.count').forEach(c=>{if(!c.dataset.done){c.dataset.done=1;animateCounter(c);}});
        obs.unobserve(e.target);
      }
    });
  },{threshold:.2});
  document.querySelectorAll('.num-cell,.hero-stat-panel,.stats-grid').forEach(el=>obs.observe(el));
}
document.addEventListener('DOMContentLoaded',initCounters);

/* ── FAQ ACCORDION ── */
function toggleFaq(id){
  const el=document.getElementById(id);
  if(!el) return;
  const wasOpen=el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!wasOpen)el.classList.add('open');
}
/* FAQ click handling consolidated here — inline duplicates removed to prevent double-fire.
   Uses event delegation so dynamically added FAQs also work without extra bindings. */
document.addEventListener('click', function(e){
  const q = e.target.closest('.faq-q');
  if(!q) return;
  const item = q.closest('.faq-item');
  if(item && item.id) toggleFaq(item.id);
});
/* ── SERVICE ACCORDION (Thane/Mumbai) ── */
function toggleSvc(id){
  const el=document.getElementById(id);
  if(!el) return;
  const wasOpen=el.classList.contains('open');
  document.querySelectorAll('.svc-item').forEach(i=>i.classList.remove('open'));
  if(!wasOpen) el.classList.add('open');
}
document.addEventListener('click', function(e){
  const q = e.target.closest('.svc-q');
  if(!q) return;
  const item = q.closest('.svc-item');
  if(item && item.id) toggleSvc(item.id);
});

/* ── MOBILE MENU ── */
function toggleMob(){
  const hamBtn=document.getElementById('hamBtn')||document.getElementById('ham');
  const mobMenu=document.getElementById('mobMenu');
  if(hamBtn) hamBtn.classList.toggle('open');
  if(mobMenu) mobMenu.classList.toggle('open');
}
function closeMob(){
  const hamBtn=document.getElementById('hamBtn')||document.getElementById('ham');
  const mobMenu=document.getElementById('mobMenu');
  if(hamBtn) hamBtn.classList.remove('open');
  if(mobMenu) mobMenu.classList.remove('open');
}

/* ── SMOOTH SCROLL ── */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const id=this.getAttribute('href');
      if(id==='#')return;
      const el=document.querySelector(id);
      if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
    });
  });
});
