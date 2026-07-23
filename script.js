const menuItems = [
  ["Menthe Dose","breakfast","Soft fenugreek dosa and a Latha Hotel signature.","Popular"],
  ["Idli & Vada","breakfast","Steamed idli and crisp vada with chutney and sambar.",""],
  ["Set Dosa","breakfast","Soft dosa served with traditional accompaniments.",""],
  ["Shavige","breakfast","Rice noodles served in the traditional style.","Popular"],
  ["Goli Baje","snacks","Crisp coastal-style fritters.",""],
  ["Gobi Manchurian","snacks","Indo-Chinese cauliflower favourite.",""],
  ["Vegetarian Meals","lunch","Rice, curries and seasonal vegetarian sides.","Popular"],
  ["Chole Bhature","lunch","A rich North Indian vegetarian favourite.",""],
  ["Masala Dosa","breakfast","Crisp dosa with seasoned potato filling.",""],
  ["Sheera","snacks","Traditional warm semolina sweet.",""]
];

const grid = document.querySelector("#menuGrid");
function renderMenu(filter="all"){
  const data=filter==="all"?menuItems:menuItems.filter(i=>i[1]===filter);
  grid.innerHTML=data.map(i=>`<article class="menu-item"><div><h3>${i[0]}</h3><p>${i[2]}</p>${i[3]?`<span class="badge">${i[3]}</span>`:""}</div><span>Price at hotel</span></article>`).join("");
}
document.querySelectorAll(".filters button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");renderMenu(btn.dataset.filter);
}));
renderMenu();

const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
function closeMenu(){
  nav.classList.remove("open");toggle.classList.remove("active");
  toggle.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");
}
toggle.addEventListener("click",()=>{
  const open=!nav.classList.contains("open");
  nav.classList.toggle("open",open);toggle.classList.toggle("active",open);
  toggle.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open);
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
window.addEventListener("resize",()=>{if(innerWidth>980)closeMenu()});

const carousel=document.querySelector("#foodCarousel");
document.querySelector(".carousel-button.prev").addEventListener("click",()=>carousel.scrollBy({left:-330,behavior:"smooth"}));
document.querySelector(".carousel-button.next").addEventListener("click",()=>carousel.scrollBy({left:330,behavior:"smooth"}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.querySelector("#year").textContent=new Date().getFullYear();


// Refined motion and automatic carousel movement.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  let carouselTimer = window.setInterval(() => {
    if (!document.hidden && carousel) {
      const nearEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 24;
      carousel.scrollTo({ left: nearEnd ? 0 : carousel.scrollLeft + 310, behavior: 'smooth' });
    }
  }, 4200);
  ['pointerenter','touchstart'].forEach(eventName => carousel.addEventListener(eventName, () => clearInterval(carouselTimer), { once: true }));

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const hero = document.querySelector('.hero-copy');
    if (hero && y < window.innerHeight) hero.style.transform = `translate3d(0,${y * .055}px,0)`;
  }, { passive: true });
}

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.nav-links');
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('menu-open', open);
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
  }));
}


// Final guarded mobile-navigation behavior.
(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!button || !nav || button.dataset.finalMenuBound === 'true') return;
  button.dataset.finalMenuBound = 'true';
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('menu-open', open);
  };
  button.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    setOpen(!nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) setOpen(false); });
})();


// Carousel dots and active-slide indicator.
(() => {
  const track = document.querySelector('#foodCarousel');
  const dots = document.querySelector('#carouselDots');
  if (!track || !dots) return;
  const cards = [...track.querySelectorAll('.food-card')];
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to dish ${index + 1}`);
    dot.addEventListener('click', () => cards[index].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'}));
    dots.appendChild(dot);
  });
  const buttons = [...dots.children];
  const updateDots = () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let active = 0, min = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < min) { min = distance; active = index; }
    });
    buttons.forEach((button, index) => button.classList.toggle('active', index === active));
  };
  track.addEventListener('scroll', updateDots, {passive:true});
  window.addEventListener('resize', updateDots);
  updateDots();
})();
