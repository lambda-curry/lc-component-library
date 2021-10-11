import{useEffect as t,useState as r}from"react";const w=()=>{const[i,n]=r({});return t(()=>{function e(){n({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),i};export{w as useWindowSize};
//# sourceMappingURL=useWindowSize.js.map
