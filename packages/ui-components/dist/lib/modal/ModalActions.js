var l=Object.defineProperty;var t=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;var e=(o,s,r)=>s in o?l(o,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[s]=r,m=(o,s)=>{for(var r in s||(s={}))c.call(s,r)&&e(o,r,s[r]);if(t)for(var r of t(s))i.call(s,r)&&e(o,r,s[r]);return o};var n=(o,s)=>{var r={};for(var a in o)c.call(o,a)&&s.indexOf(a)<0&&(r[a]=o[a]);if(o!=null&&t)for(var a of t(o))s.indexOf(a)<0&&i.call(o,a)&&(r[a]=o[a]);return r};import p from"react";import d from"classnames";import{CardActions as A}from"@material-ui/core";const N=r=>{var a=r,{className:o}=a,s=n(a,["className"]);return p.createElement(A,m({className:d("lc-modal-actions",o)},s))};export{N as ModalActions};
//# sourceMappingURL=ModalActions.js.map
