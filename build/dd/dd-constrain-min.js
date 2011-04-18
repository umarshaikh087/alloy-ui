/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("dd-constrain",function(b){var l="dragNode",n="offsetHeight",e="offsetWidth",q="host",f="tickXArray",o="tickYArray",p=b.DD.DDM,d="top",j="right",m="bottom",c="left",k="view",h=null,i="drag:tickAlignX",g="drag:tickAlignY",a=function(r){this._lazyAddAttrs=false;a.superclass.constructor.apply(this,arguments);};a.NAME="ddConstrained";a.NS="con";a.ATTRS={host:{},stickX:{value:false},stickY:{value:false},tickX:{value:false},tickY:{value:false},tickXArray:{value:false},tickYArray:{value:false},gutter:{value:"0",setter:function(r){return b.DD.DDM.cssSizestoObject(r);}},constrain:{value:k,setter:function(r){var s=b.one(r);if(s){r=s;}return r;}},constrain2region:{setter:function(s){return this.set("constrain",s);}},constrain2node:{setter:function(r){return this.set("constrain",b.one(r));}},constrain2view:{setter:function(r){return this.set("constrain",k);}},cacheRegion:{value:true}};h={_lastTickXFired:null,_lastTickYFired:null,initializer:function(){this._createEvents();this.get(q).on("drag:start",b.bind(this._handleStart,this));this.get(q).after("drag:align",b.bind(this.align,this));this.get(q).after("drag:drag",b.bind(this.drag,this));},_createEvents:function(){var r=this;var s=[i,g];b.each(s,function(u,t){this.publish(u,{type:u,emitFacade:true,bubbles:true,queuable:false,prefix:"drag"});},this);},_handleStart:function(){this.resetCache();},_regionCache:null,_cacheRegion:function(){this._regionCache=this.get("constrain").get("region");},resetCache:function(){this._regionCache=null;},_getConstraint:function(){var r=this.get("constrain"),s=this.get("gutter"),t;if(r){if(r instanceof b.Node){if(!this._regionCache){b.on("resize",b.bind(this._cacheRegion,this),b.config.win);this._cacheRegion();}t=b.clone(this._regionCache);if(!this.get("cacheRegion")){this.resetCache();}}else{if(b.Lang.isObject(r)){t=b.clone(r);}}}if(!r||!t){r=k;}if(r===k){t=this.get(q).get(l).get("viewportRegion");}b.each(s,function(u,v){if((v==j)||(v==m)){t[v]-=u;}else{t[v]+=u;}});return t;},getRegion:function(w){var u={},v=null,s=null,t=this.get(q);u=this._getConstraint();if(w){v=t.get(l).get(n);s=t.get(l).get(e);u[j]=u[j]-s;u[m]=u[m]-v;}return u;},_checkRegion:function(s){var u=s,w=this.getRegion(),v=this.get(q),x=v.get(l).get(n),t=v.get(l).get(e);if(u[1]>(w[m]-x)){s[1]=(w[m]-x);}if(w[d]>u[1]){s[1]=w[d];}if(u[0]>(w[j]-t)){s[0]=(w[j]-t);}if(w[c]>u[0]){s[0]=w[c];}return s;},inRegion:function(t){t=t||this.get(q).get(l).getXY();var s=this._checkRegion([t[0],t[1]]),r=false;if((t[0]===s[0])&&(t[1]===s[1])){r=true;}return r;},align:function(){var u=this.get(q),s=[u.actXY[0],u.actXY[1]],t=this.getRegion(true);if(this.get("stickX")){s[1]=(u.startXY[1]-u.deltaXY[1]);}if(this.get("stickY")){s[0]=(u.startXY[0]-u.deltaXY[0]);}if(t){s=this._checkRegion(s);}s=this._checkTicks(s,t);u.actXY=s;},drag:function(v){var u=this.get(q),s=this.get("tickX"),t=this.get("tickY"),r=[u.actXY[0],u.actXY[1]];if((b.Lang.isNumber(s)||this.get(f))&&(this._lastTickXFired!==r[0])){this._tickAlignX();this._lastTickXFired=r[0];}if((b.Lang.isNumber(t)||this.get(o))&&(this._lastTickYFired!==r[1])){this._tickAlignY();this._lastTickYFired=r[1];}},_checkTicks:function(y,w){var v=this.get(q),x=(v.startXY[0]-v.deltaXY[0]),u=(v.startXY[1]-v.deltaXY[1]),s=this.get("tickX"),t=this.get("tickY");if(s&&!this.get(f)){y[0]=p._calcTicks(y[0],x,s,w[c],w[j]);}if(t&&!this.get(o)){y[1]=p._calcTicks(y[1],u,t,w[d],w[m]);}if(this.get(f)){y[0]=p._calcTickArray(y[0],this.get(f),w[c],w[j]);}if(this.get(o)){y[1]=p._calcTickArray(y[1],this.get(o),w[d],w[m]);}return y;},_tickAlignX:function(){this.fire(i);},_tickAlignY:function(){this.fire(g);}};b.namespace("Plugin");b.extend(a,b.Base,h);b.Plugin.DDConstrained=a;b.mix(p,{_calcTicks:function(y,x,u,w,v){var s=((y-x)/u),t=Math.floor(s),r=Math.ceil(s);if((t!==0)||(r!==0)){if((s>=t)&&(s<=r)){y=(x+(u*t));if(w&&v){if(y<w){y=(x+(u*(t+1)));}if(y>v){y=(x+(u*(t-1)));}}}}return y;},_calcTickArray:function(z,A,y,v){var s=0,w=A.length,u=0,t,r,x;if(!A||(A.length===0)){return z;}else{if(A[0]>=z){return A[0];}else{for(s=0;s<w;s++){u=(s+1);if(A[u]&&A[u]>=z){t=z-A[s];r=A[u]-z;x=(r>t)?A[s]:A[u];if(y&&v){if(x>v){if(A[s]){x=A[s];}else{x=A[w-1];}}}return x;}}return A[A.length-1];}}}});},"3.2.0",{requires:["dd-drag"],skinnable:false});