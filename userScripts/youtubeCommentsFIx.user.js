// ==UserScript==
// @name     YoutubeCommentStylusFix
// @version  1
// @author https://twitter.com/Eniel120
// @grant    none
// @match    https://www.youtube.com/watch*
// ==/UserScript==

function setPlayerSize() {
  window.eval(
    `
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

function helper(elem, func) {
  if (!window.eval(elem)) {
    return setTimeout(() => helper(elem, func), 100);
  }
  func();
}

setTimeout(() => {
  helper("_yt_player.Ud", setPlayerSize);
  helper("document.getElementById('comments')", autoLoadComments);
}, 100)

// オマケでコメント追加読み込みの自動化
function autoLoadComments() {
  let bestm = 0;
  document.getElementById('comments').addEventListener('scroll', e => {
    if (e.target.scrollTop > e.target.scrollTopMax - 100) {
      if (bestm != e.target.scrollTopMax) {
        window.eval(`document.querySelector('yt-visibility-monitor').dirty_ = true;`);
        bestm = e.target.scrollTopMax;
        window.eval(`document.querySelector('yt-visibility-monitor').refreshVisibility_.bind(document.querySelector('yt-visibility-monitor'))();`);
      }
    }
  });
}

