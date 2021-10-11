const g=t=>t.replace(/(<([^>]+)>)/gi,""),o=(t,e)=>t.reduce((s,r,n)=>{const i=", ";return n!==0&&n===t.length-1?`${s}${e||i}${r}`:n>0?`${s}${i}${r}`:r},"");export{o as arrayToListString,g as stripTags};
//# sourceMappingURL=formatters.js.map
