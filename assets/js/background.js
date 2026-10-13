// Lightweight seasonal animated background
(function(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof document === 'undefined') return;

  let theme = 'regular';

  const canvas = document.createElement('canvas');
  canvas.id = 'seasonal-bg';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '5';
  canvas.style.pointerEvents = 'none';
  canvas.style.mixBlendMode = 'screen';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const particles = [];
  let last = 0;

  const isSmall = () => innerWidth < 700 || innerHeight < 500;
  const lowHardware = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || (navigator.deviceMemory && navigator.deviceMemory <= 1.5);
  const lowPerf = isSmall() || lowHardware;
  if (isSmall()) { canvas.style.display = 'none'; }

  // Decoration nodes references
  let _decNodes = {elBL:null, elTR:null, greenery:null, gift:null, choc:null};

  function createDecorations(){
    if(isSmall()) return;
    if(_decNodes.elBL) return;
    try{
      const elBL = document.createElement('div'); elBL.className = 'diya-corner diya-bl diya-svg'; document.body.appendChild(elBL);
      const elTR = document.createElement('div'); elTR.className = 'diya-corner diya-tr diya-svg'; document.body.appendChild(elTR);
      const greenery = document.createElement('div'); greenery.className = 'greenery'; document.body.appendChild(greenery);
      const gift = document.createElement('div'); gift.className = 'gift-acc'; document.body.appendChild(gift);
      const choc = document.createElement('div'); choc.className = 'choc-acc'; document.body.appendChild(choc);
      _decNodes = {elBL, elTR, greenery, gift, choc};
    }catch(e){/* fail silently */}
  }

  function removeDecorations(){
    Object.values(_decNodes).forEach(n=>{ if(n && n.parentNode) n.parentNode.removeChild(n); });
    _decNodes = {elBL:null, elTR:null, greenery:null, gift:null, choc:null};
  }

  const shouldShowDiwali = theme === 'diwali';
  if (shouldShowDiwali){
    document.body.classList.add('diwali-theme');
    createDecorations();
  }

  function createPreviewToggle(){
    const id = 'diwali-preview-toggle';
    if(document.getElementById(id)) return;
    const btn = document.createElement('button');
    btn.id = id;
    btn.type = 'button';
    btn.title = 'Toggle fireworks and diyas';
    btn.setAttribute('aria-label', 'Toggle fireworks and diyas');
    btn.setAttribute('aria-pressed', 'false');
    btn.innerText = '🪔';
    Object.assign(btn.style,{position:'fixed',right:'18px',bottom:'76px',zIndex:'9999',width:'40px',height:'40px',borderRadius:'999px',border:'1px solid rgba(34,28,24,0.4)',background:'#fff4d6',color:'#3a2d1d',fontSize:'18px',cursor:'pointer',boxShadow:'0 10px 24px rgba(0,0,0,0.12)',padding:'0'});
    btn.onclick = ()=>{
      const enabled = document.body.classList.toggle('diwali-theme');
      btn.classList.toggle('is-on', enabled);
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      btn.title = enabled ? 'Hide fireworks and diyas' : 'Show fireworks and diyas';

      if(enabled){
        theme = 'diwali';
        createDecorations();
        if(!lowPerf) scheduleBursts();
      } else {
        theme = 'regular';
        removeDecorations();
      }
    };
    document.body.appendChild(btn);
  }

  createPreviewToggle();

  // spawn throttle and caps
  const spawnMultiplier = lowPerf ? 0.28 : 1;
  const maxParticles = lowPerf ? 90 : 600;

  function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; if (isSmall()) canvas.style.display = 'none'; else canvas.style.display = 'block'; }
  addEventListener('resize', resize);

  function rand(min, max){ return Math.random()*(max-min)+min; }

  class P{
    constructor(x,y,vx,vy,r,color,ttl,shape,glow){ Object.assign(this,{x,y,vx,vy,r,color,ttl,age:0,shape,glow:glow||0}); }
    update(dt){ this.x += this.vx*dt; this.y += this.vy*dt; this.vy += 0.0008*dt; this.age += dt; }
    draw(ctx){ ctx.save(); ctx.fillStyle = this.color; if(this.glow){ ctx.shadowBlur = this.glow; ctx.shadowColor = this.color; }
      ctx.beginPath();
      if(this.shape==='heart'){
        const s = this.r/10; ctx.translate(this.x,this.y); ctx.scale(s,s); ctx.moveTo(0,0); ctx.bezierCurveTo(-8,-8,-20,2,0,20); ctx.bezierCurveTo(20,2,8,-8,0,0);
        ctx.fill();
      } else if(this.shape==='rect'){
        ctx.translate(this.x, this.y); ctx.rotate(this.age*0.01); ctx.fillRect(-this.r/2,-this.r/2,this.r,this.r);
      } else if(this.shape==='ring'){
        const alpha = 1 - (this.age / this.ttl);
        ctx.strokeStyle = this.color.replace(/rgba?\(([^,]+),([^,]+),([^,]+)(?:,([\d\.]+))?\)/, (m,r,g,b,a)=> `rgba(${r},${g},${b},${alpha})`);
        ctx.lineWidth = Math.max(1, this.r/6);
        if(this.glow){ ctx.shadowBlur = this.glow; ctx.shadowColor = this.color; }
        ctx.beginPath(); ctx.arc(this.x,this.y, this.r, 0, Math.PI*2); ctx.stroke();
      } else { ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); }
      ctx.restore(); }
  }

  function spawn(type){
    if(particles.length > maxParticles) return;
    if(type==='diwali'){
      if(Math.random() < 0.5 * spawnMultiplier) particles.push(new P(rand(0,W), rand(0,H*0.6), rand(-0.02,0.02), rand(-0.02,0.02), rand(1,3), 'rgba(255,220,140,0.95)', 3000, null, 6));
      if(Math.random() < 0.006 * spawnMultiplier) createFirework(rand(W*0.15,W*0.85), rand(H*0.05,H*0.45), '#ffd47a');
    } else if(type==='christmas'){
      if(Math.random() < 0.35 * spawnMultiplier) particles.push(new P(rand(0,W), -10, rand(-0.01,0.01), rand(0.02,0.08), rand(2,5), 'rgba(255,255,255,0.95)', 8000, null, 0));
      if(Math.random() < 0.02 * spawnMultiplier) particles.push(new P(rand(0,W), rand(0,H), 0, rand(-0.02,0.02), rand(8,18), 'rgba(255,230,190,0.06)', 6000));
    } else if(type==='newyear'){
      if(Math.random() < 0.32 * spawnMultiplier) particles.push(new P(rand(0,W), -10, rand(-0.05,0.05), rand(0.05,0.18), rand(6,10), `hsl(${rand(40,55)},90%,60%)`, 6000,'rect',3));
      if(Math.random() < 0.012 * spawnMultiplier) createFirework(rand(W*0.2,W*0.8), rand(H*0.05,H*0.5), '#ffd47a');
    } else if(type==='valentine'){
      if(Math.random() < 0.45 * spawnMultiplier) particles.push(new P(rand(0,W), rand(0,H), rand(-0.02,0.02), rand(-0.02,-0.001), rand(6,12), 'rgba(255,150,170,0.95)', 7000,'heart',4));
      if(Math.random() < 0.02 * spawnMultiplier) particles.push(new P(rand(0,W), rand(0,H), rand(-0.01,0.01), rand(-0.02,0.02), rand(10,18), 'rgba(255,200,220,0.06)', 5000));
    } else {
      if(Math.random() < 0.14 * spawnMultiplier) particles.push(new P(rand(0,W), rand(0,H), rand(-0.01,0.01), rand(-0.01,0.01), rand(1.5,3), 'rgba(255,215,140,0.95)', 4000));
    }
  }

  function createFirework(x,y,color){
    const count = lowPerf ? 18 : 64;
    const glow = lowPerf ? 6 : 18;
    const mainCount = lowPerf ? Math.max(12, Math.floor(count*0.5)) : count;
    for(let i=0;i<mainCount;i++){
      const a = Math.random()*Math.PI*2; const s = Math.random()*2.6+0.8;
      const r = rand(lowPerf?1.6:2.4, lowPerf?3.2:5.2);
      const ttl = lowPerf ? 1800 : rand(3000,5200);
      particles.push(new P(x,y, Math.cos(a)*s, Math.sin(a)*s, r, color, ttl, null, glow));
      if(!lowPerf && Math.random()<0.6) particles.push(new P(x+Math.cos(a)*6, y+Math.sin(a)*6, Math.cos(a)*(s*0.25), Math.sin(a)*(s*0.25), rand(0.7,1.6),'rgba(255,240,200,0.95)',900,null,8));
    }
    if(!lowPerf){ particles.push(new P(x,y,0,0, rand(18,36), 'rgba(255,230,150,0.95)', 900, 'ring', 22)); }
  }

  function scheduleBursts(){
    if(lowPerf) return;
    const active = (theme === 'diwali' || theme === 'newyear' || theme === 'valentine');
    if(!active) return;
    const min = theme === 'newyear' ? 3500 : 4200;
    const max = theme === 'newyear' ? 9000 : 12000;
    const next = Math.random()*(max-min)+min;
    setTimeout(()=>{
      const x = rand(W*0.12,W*0.88), y = rand(H*0.05,H*0.55);
      const col = theme==='valentine' ? 'rgba(255,140,170,0.95)' : '#ffd47a';
      createFirework(x,y, col);
      if(theme==='diwali') setTimeout(()=>{ createFirework(x+rand(-40,40), y+rand(-30,30), 'rgba(255,240,200,0.95)'); }, 220);
      scheduleBursts();
    }, next);
  }

  function step(ts){
    const dt = Math.min(40, ts - last); last = ts;
    ctx.clearRect(0,0,W,H);
    const baseRate = {diwali:1.1, christmas:1.0, newyear:1.0, valentine:0.9, regular:0.35}[theme] || 0.45;
    const rate = baseRate * spawnMultiplier;
    for(let i=0;i<Math.ceil(rate);i++) spawn(theme);

    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.update(dt);
      const lifeRatio = p.age / p.ttl;
      if(lifeRatio > 0.85 && p.color.includes('rgba')){
        p.color = p.color.replace(/([\d\.]+)\)$/, (m)=>{ return (parseFloat(m)-0.35>0? (parseFloat(m)-0.35):0)+')'; });
      }
      p.draw(ctx);
      if(p.age>p.ttl){ particles.splice(i,1); }
    }
    requestAnimationFrame(step);
  }

  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden) last = performance.now();
  });

  if(!lowPerf) scheduleBursts();
  requestAnimationFrame((t)=>{ last = t; requestAnimationFrame(step); });
})();
