import{useEffect as l,useState as c}from"react";import u from"clipboard";function S(p,a,e){const[s,o]=c("copyable"),[r,i]=c(),d={copied:(e==null?void 0:e.copied)||"Copied Successfully!",copyable:(e==null?void 0:e.copyable)||"Copy to clipboard",error:(e==null?void 0:e.error)||"Error copying, click to try again."};return l(()=>{r&&r.destroy();const t=document.querySelectorAll(a);if(t.length){t.forEach(b=>b.setAttribute("data-clipboard-text",p));const y=new u(t);i(y)}return()=>{r&&r.destroy()}},[p,a]),l(()=>{r&&(r.on("success",t=>{o("copied"),setTimeout(()=>o("copyable"),1e3),t.clearSelection()}),r.on("error",t=>o("error")))},[r]),[d[s],s]}export{S as useCopyToClipboard};
//# sourceMappingURL=useCopyToClipboard.js.map
