// ------------------ Screens ------------------
const loadingScreen=document.getElementById('loading-screen');
const passwordScreen=document.getElementById('password-screen');
const screens=[
  document.getElementById('screen1'),
  document.getElementById('screen2'),
  document.getElementById('screen3'),
  document.getElementById('screen4'),
  document.getElementById('screen5'),
  document.getElementById('screen6')
];
const finalScreen=document.getElementById('final-screen');

const passwordInput=document.getElementById('password-input');
const passwordBtn=document.getElementById('password-btn');
const passwordError=document.getElementById('password-error');

const yesBtn=document.getElementById('yes-btn');
const noBtn=document.getElementById('no-btn');
const finalMessage=document.querySelector('.final-message');

const canvas=document.getElementById('heart-canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let hearts=[], flowers=[];

// ------------------ Messages ------------------
const messages=[
"Mera Bacha, every heartbeat reminds me of you. 💖 You make my world brighter every day.",
"Mera Buggah, your smile heals all my worries, and your laughter is my favorite melody. 🌸",
"Mera Shona, I cherish every moment with you, even the silence feels magical. ✨",
"Mera Bacha, with you, love feels endless. You’re my forever, my always. ❤️",
"Mera Buggah, you are my heart, my soul, and everything in between. 🌹",
"Mera Shona, being with you is a dream I never want to wake from. You are my world. 💕"
];

const gradients=[
'linear-gradient(135deg,#ff9a9e,#fad0c4)',
'linear-gradient(135deg,#ff4d6d,#ff80aa,#a64ca6)',
'linear-gradient(135deg,#ff80aa,#a64ca6,#ff4d6d)',
'linear-gradient(135deg,#a64ca6,#ff4d6d,#ff80aa)',
'linear-gradient(135deg,#ff9a9e,#ff4d6d,#a64ca6)',
'linear-gradient(135deg,#fad0c4,#ff80aa,#ff4d6d)',
];

// ------------------ Loading → Password ------------------
setTimeout(()=>{
loadingScreen.classList.add('hidden');
passwordScreen.classList.remove('hidden');
},3000);

// Password check
passwordBtn.addEventListener('click',()=>{
if(passwordInput.value==='Bacha'){
passwordScreen.classList.add('hidden');
showMessageScreen(0);
}else passwordError.textContent="Incorrect Password!";
});

// ------------------ Message Screens ------------------
function showMessageScreen(index){
document.body.style.background=gradients[index];
const screen=screens[index];
screen.innerHTML=`<div class="message-box">
<div class="lock-icon">🔒</div>
<div class="message-content"></div>
<button class="show-btn">Show</button></div>`;
screen.classList.remove('hidden');

const lock=screen.querySelector('.lock-icon');
const content=screen.querySelector('.message-content');
const btn=screen.querySelector('.show-btn');

const showHandler=()=>{
lock.style.display='none';
triggerHeartsFromButton(btn);
typeText(content,messages[index]);
btn.textContent='Next';
btn.removeEventListener('click',showHandler);

const nextHandler=()=>{
screen.classList.add('hidden');
if(index<5) showMessageScreen(index+1);
else showFinalScreen();
btn.removeEventListener('click',nextHandler);
};
btn.addEventListener('click',nextHandler);
};

btn.addEventListener('click',showHandler);
}

// Typing effect
function typeText(el,text){
let i=0;
function type(){
if(i<text.length){
el.textContent+=text[i];
let delay='.,!✨'.includes(text[i])?200:50;
i++;
setTimeout(type,delay);
}}
type();
}

// ------------------ Hearts ------------------
class Heart{
constructor(x,y){
this.x=x||Math.random()*canvas.width;
this.y=y||canvas.height+Math.random()*200;
this.size=Math.random()*20+10;
this.speed=Math.random()*1+0.5;
this.opacity=Math.random()*0.5+0.3;
}
draw(){ctx.fillStyle=`rgba(255,0,128,${this.opacity})`;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}
update(){this.y-=this.speed;if(this.y+this.size<0){this.y=canvas.height+this.size; this.x=Math.random()*canvas.width;}}
}

function showHearts(){for(let i=0;i<30;i++)hearts.push(new Heart());}
function triggerHeartsFromButton(btn){for(let i=0;i<10;i++){const rect=btn.getBoundingClientRect();hearts.push(new Heart(rect.left+btn.offsetWidth/2,rect.top+btn.offsetHeight/2));}}

// ------------------ Final Screen ------------------
function showFinalScreen(){
finalScreen.classList.remove('hidden');
showHearts();
}
noBtn.addEventListener('mouseover',()=>{
noBtn.style.left=Math.random()*(window.innerWidth-100)+'px';
noBtn.style.top=Math.random()*(window.innerHeight-50)+'px';
});
yesBtn.addEventListener('click',()=>{
yesBtn.style.transform='scale(1.5)';
finalMessage.textContent="Mera Bacha, Mera Buggah, Mera Shona — you are my everything! 💖 Every moment with you is magical and my heart beats only for you. Happy Valentine’s Day!";
showHearts();
triggerFlowers();
});

// ------------------ Flower Falling ------------------
function triggerFlowers(){setInterval(()=>{flowers.push({x:Math.random()*canvas.width,y:0,size:Math.random()*15+10,speed:Math.random()*2+1});},200);}
function animateFlowers(){flowers.forEach(f=>{ctx.fillStyle='pink';ctx.beginPath();ctx.arc(f.x,f.y,f.size,0,Math.PI*2);ctx.fill(); f.y+=f.speed;if(f.y>canvas.height) f.y=0;});requestAnimationFrame(animateFlowers);}
animateFlowers();

// ------------------ Animate Hearts ------------------
function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);
hearts.forEach(h=>{h.update();h.draw();});
flowers.forEach(f=>{ctx.fillStyle='pink';ctx.beginPath();ctx.arc(f.x,f.y,f.size,0,Math.PI*2);ctx.fill(); f.y+=f.speed;if(f.y>canvas.height) f.y=0;});
requestAnimationFrame(animate);
}
animate();
