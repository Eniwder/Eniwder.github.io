// ==UserScript==
// @name     YoutubeCommentStylusFix
// @version  1
// @author https://twitter.com/Eniel120
// @grant    none
// @match    https://www.youtube.com/watch*
// ==/UserScript==

setTimeout(function () {

  window.eval(
    `_yt_player.Ud = function(a,b){  
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
  `);

}, 200);