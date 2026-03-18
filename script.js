// script.js - enhanced romantic birthday UI
document.addEventListener('DOMContentLoaded', function() {
  var slides = Array.from(document.querySelectorAll('.slide'));
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var revealBtn = document.getElementById('revealBtn');
  var audio = document.getElementById('audio');
  var musicBtn = document.getElementById('musicBtn');
  var dotContainer = document.getElementById('dotContainer');
  var slideshow = document.getElementById('slideshow');

  // Floating particles canvas
  var canvas = document.getElementById('particles');
  var ctx = canvas.getContext('2d');
  var W, H;
  var particles = [];

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  var EMOJIS = ['\u2764\uFE0F', '\u2728', '\uD83C\uDF38', '\uD83D\uDCAB', '\uD83C\uDF39', '\uD83D\uDC95'];

  function spawnParticle() {
    return {
      x: Math.random() * W,
      y: H + 20,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: 10 + Math.random() * 14,
      speed: 0.4 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 0.5,
      alpha: 0.15 + Math.random() * 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02
    };
  }

  for (var i = 0; i < 18; i++) {
    var p = spawnParticle();
    p.y = Math.random() * H;
    particles.push(p);
  }

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y -= p.speed;
      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * 0.6 + p.drift;
      ctx.globalAlpha = p.alpha;
      ctx.font = p.size + 'px serif';
      ctx.fillText(p.emoji, p.x, p.y);
      if (p.y < -30) particles[i] = spawnParticle();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Slideshow dots
  var idx = 0;
  slides.forEach(function(_, i) {
    var d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', function() { idx = i; show(idx); });
    dotContainer.appendChild(d);
  });

  function getDots() { return Array.from(dotContainer.querySelectorAll('.dot')); }

  function show(i) {
    var n = (i + slides.length) % slides.length;
    slides.forEach(function(s) { s.classList.remove('active'); });
    slides[n].classList.add('active');
    getDots().forEach(function(d, di) { d.classList.toggle('active', di === n); });
  }
  show(idx);

  prev.addEventListener('click', function() { idx = (idx - 1 + slides.length) % slides.length; show(idx); });
  next.addEventListener('click', function() { idx = (idx + 1) % slides.length; show(idx); });

  var auto = setInterval(function() { idx = (idx + 1) % slides.length; show(idx); }, 4500);
  slideshow.addEventListener('mouseenter', function() { clearInterval(auto); });
  slideshow.addEventListener('mouseleave', function() {
    clearInterval(auto);
    auto = setInterval(function() { idx = (idx + 1) % slides.length; show(idx); }, 4500);
  });

  // Music toggle
  var musicLabel = musicBtn.querySelector('.label');
  var musicIcon  = musicBtn.querySelector('.icon');

  musicBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      musicLabel.textContent = 'Pause Music';
      musicIcon.textContent = '\u23F8';
    } else {
      audio.pause();
      musicLabel.textContent = 'Play Music';
      musicIcon.textContent = '\uD83C\uDFB5';
    }
  });

  // Reveal button
  revealBtn.addEventListener('click', function() {
    showOverlay();
    burstHearts(32);
    createConfetti(50);
    try { audio.play(); musicLabel.textContent = 'Pause Music'; musicIcon.textContent = '\u23F8'; } catch(e) {}
  });

  function burstHearts(n) {
    var hearts = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC96', '\uD83D\uDC97', '\uD83D\uDC93', '\uD83C\uDF39', '\u2728'];
    for (var i = 0; i < n; i++) {
      (function() {
        var h = document.createElement('div');
        h.className = 'mini-heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = (5 + Math.random() * 90) + '%';
        h.style.top  = (60 + Math.random() * 30) + '%';
        document.body.appendChild(h);
        var delay = Math.random() * 400;
        var rise = 120 + Math.random() * 200;
        var rot  = Math.random() * 60 - 30;
        var sc   = 0.8 + Math.random() * 0.8;
        setTimeout(function() {
          h.style.opacity = '0.9';
          h.style.transform = 'translateY(-' + rise + 'px) rotate(' + rot + 'deg) scale(' + sc + ')';
        }, delay);
        setTimeout(function() { h.style.opacity = '0'; }, delay + 1200);
        setTimeout(function() { h.remove(); }, delay + 2200);
      })();
    }
  }

  function createConfetti(n) {
    var colors = ['#ff4d8b', '#ffd166', '#c94bff', '#8ecae6', '#a0c4ff', '#ff85b3'];
    for (var i = 0; i < n; i++) {
      (function() {
        var c = document.createElement('div');
        var size = 5 + Math.random() * 9;
        c.style.position = 'fixed';
        c.style.width = size + 'px';
        c.style.height = (size * 1.6) + 'px';
        c.style.left = (5 + Math.random() * 90) + '%';
        c.style.top  = (5 + Math.random() * 50) + '%';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.borderRadius = '2px';
        c.style.opacity = '1';
        c.style.transform = 'translateY(0) rotate(0deg)';
        c.style.zIndex = '9998';
        c.style.pointerEvents = 'none';
        document.body.appendChild(c);
        var delay = Math.random() * 300;
        var dur   = 1800 + Math.random() * 800;
        var ty    = 180 + Math.random() * 120;
        var rot   = Math.random() * 720 - 360;
        setTimeout(function() {
          c.style.transition = 'transform ' + dur + 'ms cubic-bezier(.2,.9,.3,1), opacity 1000ms';
          c.style.transform = 'translateY(' + ty + 'px) rotate(' + rot + 'deg)';
          c.style.opacity = '0';
        }, delay);
        setTimeout(function() { c.remove(); }, delay + 2800);
      })();
    }
  }

  function showOverlay() {
    var o = document.createElement('div');
    o.className = 'overlay';
    var popup = document.createElement('div');
    popup.className = 'popup';

    var emoji = document.createElement('span');
    emoji.className = 'popup-emoji';
    emoji.textContent = '\uD83C\uDF82';

    var h2 = document.createElement('h2');
    h2.textContent = 'Happy Birthday, My Love \u2764\uFE0F';

    var p = document.createElement('p');
    p.innerHTML = 'You are my sunshine, my laughter, my home.<br>Wishing you endless smiles today and always.';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'close';
    closeBtn.textContent = 'Close \u2715';

    popup.appendChild(emoji);
    popup.appendChild(h2);
    popup.appendChild(p);
    popup.appendChild(closeBtn);
    o.appendChild(popup);
    document.body.appendChild(o);

    closeBtn.addEventListener('click', function() {
      o.style.opacity = '0';
      o.style.transition = 'opacity 0.3s ease';
      setTimeout(function() { o.remove(); }, 300);
    });
    o.addEventListener('click', function(e) {
      if (e.target === o) closeBtn.click();
    });
  }
});
