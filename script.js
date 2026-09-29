const menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('nav');
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* theme toggle */
const themeBtn=document.getElementById('themeBtn'),html=document.documentElement;
function setTheme(t){ html.setAttribute('data-theme',t); themeBtn.textContent = t==='blueprint' ? 'MODE: BLUEPRINT' : 'MODE: CETAK'; try{localStorage.setItem('rpl-theme',t);}catch(e){} }
let saved='blueprint'; try{ saved=localStorage.getItem('rpl-theme')||'blueprint'; }catch(e){}
setTheme(saved);
themeBtn.addEventListener('click',()=> setTheme(html.getAttribute('data-theme')==='blueprint' ? 'cetak' : 'blueprint'));

/* reveal on scroll */
const revealEls=document.querySelectorAll('.reveal');
if(reduce){ revealEls.forEach(el=>el.classList.add('in')); }
else{
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:.15});
  revealEls.forEach(el=>io.observe(el));
}

/* scrollspy */
const sections=document.querySelectorAll('section[id]'), navLinks=document.querySelectorAll('nav a');
const spy=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)); } }),{rootMargin:'-45% 0px -50% 0px'});
sections.forEach(s=>spy.observe(s));

/* typing tag */
const typeTag=document.getElementById('typeTag');
const phrases=['// PORTOFOLIO — SISWA RPL','// WEB DEVELOPER','// MOBILE DEVELOPER','// PROBLEM SOLVER'];
if(typeTag && !reduce){
  let p=0,i=0,del=false;
  (function tick(){ const f=phrases[p]; i+=del?-1:1; typeTag.textContent=f.slice(0,i);
    let d=del?30:55;
    if(!del && i===f.length){d=1400;del=true;} else if(del && i===0){del=false;p=(p+1)%phrases.length;d=300;}
    setTimeout(tick,d);
  })();
}

/* counters */
const counters=document.querySelectorAll('[data-count]');
const cIO=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return; const el=e.target,t=+el.dataset.count;
  if(reduce){ el.textContent=t+'+'; cIO.unobserve(el); return; }
  let cur=0; const step=Math.max(1,Math.round(t/30));
  const iv=setInterval(()=>{ cur+=step; if(cur>=t){cur=t;clearInterval(iv);el.textContent=cur+'+';} else el.textContent=cur; },40);
  cIO.unobserve(el);
}),{threshold:.5});
counters.forEach(el=>cIO.observe(el));

/* project switcher */
document.querySelectorAll('.tabbtn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tabbtn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.panel).classList.add('active');
  });
});

/* skills ticker */
const skills=['HTML','CSS','JavaScript','PHP','MySQL','Laravel','Bootstrap','Git','GitHub','REST API','UI/UX','Figma'];
const track=document.getElementById('tickerTrack');
const list=[...skills,...skills].map(s=>`<span><b>#</b> ${s}</span>`).join('');
track.innerHTML=list+list;