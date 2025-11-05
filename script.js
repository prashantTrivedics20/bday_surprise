// script.js - slideshow, reveal, hearts and confetti
document.addEventListener('DOMContentLoaded', ()=>{
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const revealBtn = document.getElementById('revealBtn');
  const heartArea = document.getElementById('heartArea');
  const audio = document.getElementById('audio');
  const musicBtn = document.getElementById('musicBtn');

  let idx = 0;
  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[(i+slides.length)%slides.length].classList.add('active');
  }
  show(idx);

  prev.addEventListener('click', ()=>{ idx=(idx-1+slides.length)%slides.length; show(idx); });
  next.addEventListener('click', ()=>{ idx=(idx+1)%slides.length; show(idx); });

  let auto = setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); },4500);
  const slideshow = document.getElementById('slideshow');
  slideshow.addEventListener('mouseenter', ()=> clearInterval(auto));
  slideshow.addEventListener('mouseleave', ()=> { clearInterval(auto); auto=setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); },4500); });

  musicBtn.addEventListener('click', ()=>{
    if (audio.paused){ audio.play(); musicBtn.textContent='Pause Music'; }
    else { audio.pause(); musicBtn.textContent='Play Music'; }
  });

  revealBtn.addEventListener('click', ()=>{
    // show overlay with animated message
    showOverlay();
    burstHearts(28);
    createConfetti(40);
    // auto play music
    try{ audio.play(); musicBtn.textContent='Pause Music'; }catch(e){}
  });

  function burstHearts(n){
    for(let i=0;i<n;i++){
      const h = document.createElement('div');
      h.className='mini-heart';
      h.style.left = (10 + Math.random()*80) + '%';
      h.style.top = (20 + Math.random()*70) + '%';
      h.style.transform = 'translateY(0) scale(' + (0.7 + Math.random()*0.9) + ') rotate(' + (Math.random()*80-40) + 'deg)';
      document.body.appendChild(h);
      setTimeout(()=> { h.style.opacity=1; h.style.transform = 'translateY(-160px) scale(1) rotate(' + (Math.random()*720-360) + 'deg)'; }, 20);
      setTimeout(()=> h.remove(), 2600);
    }
  }

  function createConfetti(n){
    const colors = ['#ff5c8a','#ffd166','#8ecae6','#a0c4ff','#cdb4db'];
    for(let i=0;i<n;i++){
      const c = document.createElement('div');
      c.className='confetti';
      c.style.position='fixed';
      c.style.width = (6 + Math.random()*8) + 'px';
      c.style.height = (8 + Math.random()*12) + 'px';
      c.style.left = (10 + Math.random()*80) + '%';
      c.style.top = (10 + Math.random()*60) + '%';
      c.style.background = colors[Math.floor(Math.random()*colors.length)];
      c.style.opacity = 1;
      c.style.transform = 'translateY(0) rotate(0deg)';
      c.style.zIndex = 9998;
      document.body.appendChild(c);
      setTimeout(()=> { c.style.transition='transform 2200ms cubic-bezier(.2,.9,.3,1), opacity 1200ms'; c.style.transform = 'translateY(220px) rotate(' + (Math.random()*720-360) + 'deg)'; c.style.opacity=0; }, 20);
      setTimeout(()=> c.remove(), 2400);
    }
  }

  // Overlay with birthday message
  function showOverlay(){
    const o = document.createElement('div');
    o.className='overlay';
    o.innerHTML = `<div class="popup"><h2>Happy Birthday, My Love ❤️</h2><p>You are my sunshine, my laughter, my home. Wishing you endless smiles today and always.</p><button class="close">Close</button></div>`;
    document.body.appendChild(o);
    o.querySelector('.close').addEventListener('click', ()=> o.remove());
  }
});
