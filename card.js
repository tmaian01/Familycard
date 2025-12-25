const pages=[
  {src:'assets/images/page1.png',showControls:false},
  {src:'assets/images/page2.png',showControls:false},
  {src:'assets/images/page3.png',showControls:true},
];

const pageImg=document.getElementById('pageImg');
const stage=document.getElementById('stage');
const tapHint=document.getElementById('tapHint');

const zoomLeftBtn=document.getElementById('zoomLeft');
const zoomRightBtn=document.getElementById('zoomRight');
const audioToggleBtn=document.getElementById('audioToggle');

const modal=document.getElementById('modal');
const closeModal=document.getElementById('closeModal');
const zoomImg=document.getElementById('zoomImg');

const music=document.getElementById('music');

let idx=0;
let musicEnabled=true;

function render(){
  const page=pages[idx];
  pageImg.src=page.src;

  if(page.showControls){
    stage.classList.add('show-page3');
    tapHint.textContent='Tap / click to restart';
    tryStartMusic();
  }else{
    stage.classList.remove('show-page3');
    tapHint.textContent='Tap / click';
    stopMusic();
  }
}

function nextPage(){
  idx=(idx+1)%pages.length;
  render();
}

tapHint.addEventListener('click',nextPage);
pageImg.addEventListener('click',nextPage);

// Swipe support
let startX=null,startY=null;
stage.addEventListener('touchstart',(e)=>{
  const t=e.touches[0];
  startX=t.clientX; startY=t.clientY;
},{passive:true});

stage.addEventListener('touchend',(e)=>{
  if(startX===null||startY===null) return;
  const t=e.changedTouches[0];
  const dx=t.clientX-startX;
  const dy=t.clientY-startY;
  startX=null; startY=null;
  if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){
    nextPage();
  }
},{passive:true});

function openZoom(src){
  zoomImg.src=src;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}
function closeZoom(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  zoomImg.src='';
}

zoomLeftBtn.addEventListener('click',(e)=>{e.stopPropagation();openZoom('assets/images/page3-left.png');});
zoomRightBtn.addEventListener('click',(e)=>{e.stopPropagation();openZoom('assets/images/page3-right.png');});
closeModal.addEventListener('click',closeZoom);
modal.addEventListener('click',(e)=>{if(e.target===modal) closeZoom();});

function tryStartMusic(){
  if(!musicEnabled) return;
  music.volume=0.25;
  const p=music.play();
  if(p && typeof p.catch==='function'){
    p.catch(()=>{/* autoplay/missing-file may fail; user can tap toggle to retry */});
  }
}
function stopMusic(){
  music.pause();
  music.currentTime=0;
}

audioToggleBtn.addEventListener('click',(e)=>{
  e.stopPropagation();
  if(music.paused){
    musicEnabled=true;
    tryStartMusic();
    audioToggleBtn.textContent='♪';
  }else{
    musicEnabled=false;
    music.pause();
    audioToggleBtn.textContent='⏸';
  }
});

render();
