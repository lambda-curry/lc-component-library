import i from"react";import{CharacterLimit as a,useCharacterLimit as c}from"../character-limit";import{Icon as m}from"../icon";import"./multiline-input.css";const d=({value:e,characterLimit:r=0,resize:l=!0,children:n})=>{const t=c({value:e,limit:r});return i.createElement("div",{className:"lc-multiline-input"},n(t),r>0&&i.createElement(a,{className:"lc-multiline-input-character-limit",limit:r,characterCount:t.characterCount||0}),l&&i.createElement("div",{className:"lc-multiline-input-resize"},i.createElement(m,{name:"resize"})))};export{d as MultilineInput};
//# sourceMappingURL=MultilineInput.js.map
