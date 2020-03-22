// ==UserScript==
// @name     YoutubeCommentStylusFix
// @version  1
// @author https://twitter.com/Eniel120
// @grant    none
// @match    https://www.youtube.com/*
// ==/UserScript==
function setPlayerSize() {
  window.eval(`
_yt_player.Ud = function(a,b){  
  this.width = Math.min(a,722);
  this.height = Math.min(b,408); 
}
_yt_player.Ud.prototype.clone = function() {
  return new _yt_player.Ud(this.width,this.height)
}
_yt_player.Ud.prototype.aspectRatio = function() {
  return this.width / this.height
}
_yt_player.Ud.prototype.isEmpty = function() {
  return !(this.width * this.height)
}
_yt_player.Ud.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
}
_yt_player.Ud.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
}
_yt_player.Ud.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
}
window.dispatchEvent(new Event("resize"));
`);
}

let oldUrl = document.URL;
let bodyList = document.querySelector("body");
const observer = new MutationObserver(() => {
  if (oldUrl != document.URL) {
    oldUrl = document.URL;
    exec();
  }
});
observer.observe(bodyList, { childList: true, subtree: true });
exec();

function exec() {
  if (document.URL.includes('watch')) {
    helper("_yt_player.Ud", setPlayerSize);
    helper("document.getElementById('comments')", autoLoadComments);
  }
}

function helper(elem, func) {
  if (window && !window.eval(elem)) {
    return setTimeout(() => helper(elem, func), 100);
  }
  func();
}

// オマケでコメント追加読み込みの自動化
function autoLoadComments() {
  let oldTop = 0;
  document.getElementById('comments').addEventListener('scroll', e => {
    if (e.target.scrollTop > e.target.scrollTopMax - 100) {
      if (oldTop != e.target.scrollTopMax) {
        oldTop = e.target.scrollTopMax;
        window.eval(`
var tmp = document.querySelector('yt-visibility-monitor');        
tmp.dirty_ = true;
tmp.refreshVisibility_.bind(tmp)();
        `);
      }
    }
  });
}