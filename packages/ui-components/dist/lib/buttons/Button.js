var b=Object.defineProperty,f=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var s=(r,t,o)=>t in r?b(r,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[t]=o,i=(r,t)=>{for(var o in t||(t={}))c.call(t,o)&&s(r,o,t[o]);if(l)for(var o of l(t))g.call(t,o)&&s(r,o,t[o]);return r},m=(r,t)=>f(r,h(t));var n=(r,t)=>{var o={};for(var e in r)c.call(r,e)&&t.indexOf(e)<0&&(o[e]=r[e]);if(r!=null&&l)for(var e of l(r))t.indexOf(e)<0&&g.call(r,e)&&(o[e]=r[e]);return o};import u,{forwardRef as y}from"react";import d from"classnames";import{ButtonStyled as p}from"../buttons";const N=y((e,o)=>{var a=e,{className:r}=a,t=n(a,["className"]);return u.createElement(p,m(i({},t),{ref:o,className:d(["lc-button-default","lc-text-gray-darker","lc-bg-gray-lighter","lc-border-gray-lighter","hover:lc-text-black","hover:lc-bg-gray-light","hover:lc-border-gray-light","focus-visible:lc-ring-gray-lighter"],r)}))});export{N as Button};
//# sourceMappingURL=Button.js.map
