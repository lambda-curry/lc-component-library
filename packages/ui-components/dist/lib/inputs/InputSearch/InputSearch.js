var L=Object.defineProperty,N=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var w=(t,e,n)=>e in t?L(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,p=(t,e)=>{for(var n in e||(e={}))x.call(e,n)&&w(t,n,e[n]);if(V)for(var n of V(e))A.call(e,n)&&w(t,n,e[n]);return t},g=(t,e)=>N(t,U(e));var E=(t,e)=>{var n={};for(var r in t)x.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&V)for(var r of V(t))e.indexOf(r)<0&&A.call(t,r)&&(n[r]=t[r]);return n};import H,{useEffect as k,useReducer as M}from"react";import _ from"classnames";import{InputSelect as z}from"../InputSelect/InputSelect";import{useAsyncEffect as B,useDebounce as G}from"../../hooks";import{get as R}from"lodash";const F={setStatus:(t,e)=>g(p({},t),{status:e}),setOptions:(t,e)=>g(p({},t),{options:e}),setInputSearchValue:(t,e)=>g(p({},t),{inputSearchValue:e})},J=(t,e)=>{if(!F[e.name])throw new Error(`reducer ${e.name} not defined`);return F[e.name](t,e.payload)},ce=Q=>{var O=Q,{className:t,url:e,searchParam:n,searchOptions:r,optionLabelKey:S="label",getOptions:T=a=>a,placeholder:q="Type to search..."}=O,c=E(O,["className","url","searchParam","searchOptions","optionLabelKey","getOptions","placeholder"]);var P,v;const a=R((P=c.formikProps)==null?void 0:P.values,c.name),m=(l,i)=>{if(!i)return"";if(c.optionValueKey&&i.length){const h=i.find(f=>f[c.optionValueKey]===l);return h?h[S]:""}const s=typeof a=="string"?l:R(l,S);return typeof s=="string"?s:""},[u,d]=M(J,{status:"waiting",options:a?[a]:[],inputSearchValue:m(a,a?[a]:[])}),o=p({ignoreFalseyInputValues:!0},r),C=(v=o.initialSearchValue)!=null?v:m(a,u.options);k(()=>{o.initialSearchValue!==void 0&&d({name:"setInputSearchValue",payload:o.initialSearchValue})},[o.initialSearchValue]),k(()=>{C===""&&d({name:"setInputSearchValue",payload:C})},[C]);const I=G(u.inputSearchValue,o.debounceTime||200);B(async()=>{if(!!I&&I===m(a,u.options)||o.ignoreFalseyInputValues&&(o.initialSearchValue===void 0||o.initialSearchValue===null)&&(u.inputSearchValue===void 0||u.inputSearchValue===null))return;const[l,i]=e.split("?"),s=new URLSearchParams(i);n&&s.set(n,I);const h=`${l}?${s.toString()}`,y=await(await fetch(h)).json(),b=T(y);a&&o.initialSearchValue&&!b.some(D=>R(a,S)===R(D,S))&&b.unshift(a),d({name:"setOptions",payload:b})},void 0,[e,I]);const $=(l,i,s,h)=>{var y;((y=c.formikProps)==null?void 0:y.handleChange)&&c.formikProps.handleChange(l),typeof c.onChange=="function"&&c.onChange(l,i,s,h);const f=m(i,u.options);f&&d({name:"setInputSearchValue",payload:f})},j=(l,i,s)=>{u.inputSearchValue&&i===""&&s==="reset"||!l&&s!=="clear"&&s!=="input"||d({name:"setInputSearchValue",payload:i})};return H.createElement(z,g(p({className:_("lc-input-search",t),placeholder:q,optionLabelKey:S},c),{options:u.options,onChange:$,autocompleteConfig:p({inputValue:u.inputSearchValue,disableClearable:!1,loading:o.loading?o.loading(u.options):u.options.length<1,onInputChange:j},c.autocompleteConfig)}))};export{ce as InputSearch,J as inputSearchReducer};
//# sourceMappingURL=InputSearch.js.map
