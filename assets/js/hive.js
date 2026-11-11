/* HIVE site interactions: nav, reveal, counters, 3D tilt, flip, gallery, filters */
(function(){
  const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
  // header shadow + scroll progress + back-to-top
  const hdr=$('.hdr'),prog=$('.progress'),top=$('.totop');
  const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    hdr&&hdr.classList.toggle('scrolled',y>10);prog&&(prog.style.width=(h>0?y/h*100:0)+'%');top&&top.classList.toggle('on',y>700);};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  top&&top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  // mobile nav
  const bg=$('.burger'),nav=$('.nav');bg&&bg.addEventListener('click',()=>nav.classList.toggle('open'));
  $$('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  // reveal + counters + bars
  const count=el=>{const end=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,pre=el.dataset.pre||'',suf=el.dataset.suf||'';
    const t0=performance.now(),D=1800;(function f(n){const p=Math.min((n-t0)/D,1),e=1-Math.pow(1-p,3);
      el.textContent=pre+(end*e).toLocaleString('en-IN',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;if(p<1)requestAnimationFrame(f);})(t0);};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;
    el.classList.add('in');$$('[data-count]',el).concat(el.matches('[data-count]')?[el]:[]).forEach(c=>{if(!c.dataset.done){c.dataset.done=1;count(c);}});
    $$('[data-w]',el).forEach(b=>b.style.width=b.dataset.w);$$('[data-h]',el).forEach(b=>b.style.height=b.dataset.h);
    io.unobserve(el);}),{threshold:.15});
  $$('.rv,[data-count],.trl,.stars-tl').forEach(el=>io.observe(el));
  // 3D tilt
  $$('.tilt,.pj').forEach(t=>{const inn=$('.in',t);if(!inn)return;
    t.addEventListener('pointermove',e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      inn.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg)`;});
    t.addEventListener('pointerleave',()=>inn.style.transform='');});
  // flip cards on tap (touch)
  $$('.flip').forEach(f=>f.addEventListener('click',()=>f.classList.toggle('on')));
  // gallery lightbox
  const lb=$('.lb');if(lb){const im=$('img',lb),cap=$('.cap',lb);
    $$('.gal figure').forEach(f=>f.addEventListener('click',()=>{im.src=$('img',f).src;cap.textContent=$('figcaption',f)?.textContent||'';lb.classList.add('on');}));
    lb.addEventListener('click',e=>{if(e.target!==im)lb.classList.remove('on');});
    addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on');});}
  // publication filters
  $$('.tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
    const k=b.dataset.f;$$('.shelf .book-card').forEach(c=>c.classList.toggle('hide',k!=='all'&&!c.dataset.cat.includes(k)));}));
  // year
  $$('.yr-now').forEach(e=>e.textContent=new Date().getFullYear());
})();
