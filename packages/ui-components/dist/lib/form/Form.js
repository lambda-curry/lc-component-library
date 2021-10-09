var B=Object.defineProperty,Q=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var g=(e,o,t)=>o in e?B(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,s=(e,o)=>{for(var t in o||(o={}))C.call(o,t)&&g(e,t,o[t]);if(h)for(var t of h(o))y.call(o,t)&&g(e,t,o[t]);return e},F=(e,o)=>Q(e,b(o));var f=(e,o)=>{var t={};for(var a in e)C.call(e,a)&&o.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&h)for(var a of h(e))o.indexOf(a)<0&&y.call(e,a)&&(t[a]=e[a]);return t};import n,{useReducer as A}from"react";import{Formik as N,Form as O,useFormikContext as I}from"formik";import M from"classnames";import{useOnClickOutside as w}from"../hooks";import{Modal as D,ModalHeader as H,ModalActions as R}from"../modal";import{formReducer as L}from"./Form.helpers";import"./form.css";import{Button as j}from"../buttons/Button";import{ButtonPrimary as Y}from"../buttons/ButtonPrimary";const $=S=>{var i=S,{className:e,state:o,dispatch:t,withoutFormElement:a,confirmUnsavedChanges:r,unsavedChangesConfig:m}=i,c=f(i,["className","state","dispatch","withoutFormElement","confirmUnsavedChanges","unsavedChangesConfig"]);const u=I();return w(l=>{!r||!l.target||!o.shouldCheckForUnsavedChanges||!u.dirty||(l.preventDefault(),t({name:"openModal",payload:"unsavedChangesModal"}),t({name:"setCapturedUnsavedChangesEvent",payload:l}))},m.containerQuerySelectorAll?`${m.containerQuerySelectorAll}, #lc-unsaved-changes-modal`:void 0,m.targetQuerySelector,"[data-lc-trigger-unsaved-changes]"),a?n.createElement("div",s({className:M(e,"lc-form")},c)):n.createElement(O,s({className:M(e,"lc-form")},c))};function ue(S){var i=S,{className:e,children:o,withoutFormElement:t,confirmUnsavedChanges:a,unsavedChangesConfig:r={},formConfig:m}=i,c=f(i,["className","children","withoutFormElement","confirmUnsavedChanges","unsavedChangesConfig","formConfig"]);r=s({targetQuerySelector:'a:not([href="#"]), button, .navbar-back'},r);const u=["form",".snackbar","[role=dialog]"];(r==null?void 0:r.containerQuerySelectorAll)&&(u[0]=r.containerQuerySelectorAll),r.containerQuerySelectorAll=u.join(", ");const[d,l]=A(L,{activeModal:"none",shouldCheckForUnsavedChanges:!0}),v=()=>{l({name:"closeModal"}),l({name:"setShouldCheckForUnsavedChanges",payload:!1}),setTimeout(()=>{l({name:"setShouldCheckForUnsavedChanges",payload:!0})},500)},U=p=>{if(l({name:"closeModal"}),l({name:"setShouldCheckForUnsavedChanges",payload:!1}),d.capturedUnsavedChangesEvent&&r.targetQuerySelector){const k=d.capturedUnsavedChangesEvent.target.closest(r.targetQuerySelector);k&&k.click()}p.resetForm(),setTimeout(()=>{l({name:"setShouldCheckForUnsavedChanges",payload:!0})},500)},{modalCloseButtonText:P="Cancel",modalContent:T="Click continue to abandon your changes and proceed.",modalPrimaryButtonText:x="Continue",modalTitle:E="You have unsaved changes!"}=r.modalProps||{};return n.createElement(N,F(s({},c),{initialStatus:F(s({},c.initialStatus),{formConfig:m})}),p=>n.createElement($,{className:e,state:d,dispatch:l,withoutFormElement:t,confirmUnsavedChanges:a,unsavedChangesConfig:r},n.createElement(n.Fragment,null,o(p),n.createElement(D,s({id:"lc-unsaved-changes-modal",isOpen:d.activeModal==="unsavedChangesModal",closeButton:!1},r==null?void 0:r.modalProps),n.createElement(H,{title:E}),n.createElement("p",{className:"text"},T),n.createElement(R,null,n.createElement("div",{className:"flex-spacer"}),n.createElement(j,{onClick:v},P),n.createElement(Y,{onClick:()=>U(p)},x))))))}export{ue as Form};
//# sourceMappingURL=Form.js.map
