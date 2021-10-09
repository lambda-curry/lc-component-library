var h=Object.defineProperty;var n=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var p=(o,s,e)=>s in o?h(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e,a=(o,s)=>{for(var e in s||(s={}))c.call(s,e)&&p(o,e,s[e]);if(n)for(var e of n(s))m.call(s,e)&&p(o,e,s[e]);return o};var f=(o,s)=>{var e={};for(var t in o)c.call(o,t)&&s.indexOf(t)<0&&(e[t]=o[t]);if(o!=null&&n)for(var t of n(o))s.indexOf(t)<0&&m.call(o,t)&&(e[t]=o[t]);return e};import l,{useContext as d}from"react";import g from"classnames";import{RegisteredIconContext as u}from"./IconRegistry";import"./icon.css";import{ReactComponent as x}from"../../assets/icons/addUser.js";import{ReactComponent as w}from"../../assets/icons/analytics.js";import{ReactComponent as I}from"../../assets/icons/android.js";import{ReactComponent as v}from"../../assets/icons/apple.js";import{ReactComponent as y}from"../../assets/icons/apps.js";import{ReactComponent as b}from"../../assets/icons/archive.js";import{ReactComponent as k}from"../../assets/icons/arrowDown.js";import{ReactComponent as D}from"../../assets/icons/arrowLeft.js";import{ReactComponent as F}from"../../assets/icons/arrowRight.js";import{ReactComponent as N}from"../../assets/icons/arrowUp.js";import{ReactComponent as M}from"../../assets/icons/bell.js";import{ReactComponent as E}from"../../assets/icons/bellRing.js";import{ReactComponent as P}from"../../assets/icons/block.js";import{ReactComponent as U}from"../../assets/icons/chat.js";import{ReactComponent as S}from"../../assets/icons/check.js";import{ReactComponent as V}from"../../assets/icons/checkbox.js";import{ReactComponent as G}from"../../assets/icons/checkboxFilled.js";import{ReactComponent as L}from"../../assets/icons/chevronDown.js";import{ReactComponent as B}from"../../assets/icons/chevronLeft.js";import{ReactComponent as z}from"../../assets/icons/chevronRight.js";import{ReactComponent as A}from"../../assets/icons/chevronUp.js";import{ReactComponent as O}from"../../assets/icons/clock.js";import{ReactComponent as $}from"../../assets/icons/clockFilled.js";import{ReactComponent as q}from"../../assets/icons/close.js";import{ReactComponent as Y}from"../../assets/icons/company.js";import{ReactComponent as H}from"../../assets/icons/concessionManager.js";import{ReactComponent as J}from"../../assets/icons/copy.js";import{ReactComponent as K}from"../../assets/icons/creditCard.js";import{ReactComponent as Q}from"../../assets/icons/deal.js";import{ReactComponent as T}from"../../assets/icons/download.js";import{ReactComponent as W}from"../../assets/icons/drag.js";import{ReactComponent as X}from"../../assets/icons/error.js";import{ReactComponent as Z}from"../../assets/icons/expand.js";import{ReactComponent as _}from"../../assets/icons/eye.js";import{ReactComponent as ss}from"../../assets/icons/facebook.js";import{ReactComponent as os}from"../../assets/icons/filePDF.js";import{ReactComponent as es}from"../../assets/icons/fileExcel.js";import{ReactComponent as ts}from"../../assets/icons/filter.js";import{ReactComponent as ns}from"../../assets/icons/flame.js";import{ReactComponent as as}from"../../assets/icons/hamburger.js";import{ReactComponent as rs}from"../../assets/icons/help.js";import{ReactComponent as is}from"../../assets/icons/home.js";import{ReactComponent as cs}from"../../assets/icons/inbox.js";import{ReactComponent as ms}from"../../assets/icons/income.js";import{ReactComponent as ps}from"../../assets/icons/laptop.js";import{ReactComponent as fs}from"../../assets/icons/lifeRing.js";import{ReactComponent as ls}from"../../assets/icons/location.js";import{ReactComponent as Rs}from"../../assets/icons/mailOutline.js";import{ReactComponent as Cs}from"../../assets/icons/menu.js";import{ReactComponent as js}from"../../assets/icons/navigation.js";import{ReactComponent as hs}from"../../assets/icons/paintBrush.js";import{ReactComponent as ds}from"../../assets/icons/partner.js";import{ReactComponent as gs}from"../../assets/icons/pencil.js";import{ReactComponent as us}from"../../assets/icons/phone.js";import{ReactComponent as xs}from"../../assets/icons/phoneCheck.js";import{ReactComponent as ws}from"../../assets/icons/phoneRing.js";import{ReactComponent as Is}from"../../assets/icons/plus.js";import{ReactComponent as vs}from"../../assets/icons/profile.js";import{ReactComponent as ys}from"../../assets/icons/radio.js";import{ReactComponent as bs}from"../../assets/icons/radioFilled.js";import{ReactComponent as ks}from"../../assets/icons/resize.js";import{ReactComponent as Ds}from"../../assets/icons/schedule.js";import{ReactComponent as Fs}from"../../assets/icons/search.js";import{ReactComponent as Ns}from"../../assets/icons/settings.js";import{ReactComponent as Ms}from"../../assets/icons/sms.js";import{ReactComponent as Es}from"../../assets/icons/successMessage.js";import{ReactComponent as Ps}from"../../assets/icons/threeDots.js";import{ReactComponent as Us}from"../../assets/icons/touch.js";import{ReactComponent as Ss}from"../../assets/icons/trash.js";import{ReactComponent as Vs}from"../../assets/icons/twitter.js";import{ReactComponent as Gs}from"../../assets/icons/unfold.js";import{ReactComponent as Ls}from"../../assets/icons/user.js";import{ReactComponent as Bs}from"../../assets/icons/users.js";import{ReactComponent as zs}from"../../assets/icons/video.js";import{ReactComponent as As}from"../../assets/icons/warning.js";const Os={addUser:x,analytics:w,android:I,apps:y,apple:v,archive:b,arrowDown:k,arrowLeft:D,arrowRight:F,arrowUp:N,bell:M,bellRing:E,block:P,chat:U,check:S,checkbox:V,checkboxFilled:G,chevronDown:L,chevronLeft:B,chevronRight:z,chevronUp:A,clock:O,clockFilled:$,close:q,company:Y,concessionManager:H,copy:J,creditCard:K,deal:Q,download:T,drag:W,error:X,expand:Z,eye:_,facebook:ss,fileExcel:es,filePDF:os,filter:ts,flame:ns,hamburger:as,help:rs,home:is,inbox:cs,income:ms,laptop:ps,lifeRing:fs,location:ls,mailOutline:Rs,menu:Cs,navigation:js,paintBrush:hs,partner:ds,pencil:gs,phone:us,phoneCheck:xs,phoneRing:ws,plus:Is,profile:vs,radio:ys,radioFilled:bs,resize:ks,schedule:Ds,search:Fs,settings:Ns,sms:Ms,successMessage:Es,threeDots:Ps,touch:Us,trash:Ss,twitter:Vs,unfold:Gs,user:Ls,users:Bs,video:zs,warning:As},R={confirmationEmail:"successMessage",excel:"fileExcel",support:"lifeRing",notifications:"bellRing",pdf:"filePDF",ringVolume:"phoneRing",visibility:"eye",question:"help"},ge=$s=>{var r=$s,{className:o,name:s,viewBox:e="0 0 24 24"}=r,t=f(r,["className","name","viewBox"]);const C=d(u),i=a(a({},Os),C);if(!s)throw new Error('You must provide a valid "name" prop to the "Icon" component.');if(!i[s])if(R[s])s=R[s];else throw new Error(`Icon with name "${s}" does not exist.`);const j=i[s];return l.createElement("span",a({className:g("lc-icon",`lc-icon-${s}`,o)},t),l.createElement(j,{viewBox:e||void 0}))};export{ge as Icon,Os as defaultIcons};
//# sourceMappingURL=Icon.js.map
