import{Chart as W}from"react-chartjs-2";W.elements.Rectangle.prototype.draw=function(){const t=this._chart.ctx,a=this._view;let f=0,u=0,l=0,c=0,v=0,g=0,T,d=a.borderWidth,m=this._chart.config.options.borderRadius;if(m<0&&(m=0),typeof m=="undefined"&&(m=0),a.horizontal||(f=a.x-a.width/2,u=a.x+a.width/2,l=a.y,c=a.base,v=1,g=c>l?1:-1,T=a.borderSkipped||"bottom"),d){const s=Math.min(Math.abs(f-u),Math.abs(l-c));d=d>s?s:d;const h=d/2,n=f+(T!=="left"?h*v:0),i=u+(T!=="right"?-h*v:0),o=l+(T!=="top"?h*g:0),r=c+(T!=="bottom"?-h*g:0);n!==i&&(l=o,c=r),o!==r&&(f=n,u=i)}t.beginPath(),t.fillStyle=a.backgroundColor,t.strokeStyle=a.borderColor,t.lineWidth=d;const b=[[f,c],[f,l],[u,l],[u,c]];let x=["bottom","left","top","right"].indexOf(T,0);x===-1&&(x=0);function R(s){return b[(x+s)%4]}let _=R(0);t.moveTo(_[0],_[1]);for(let s=1;s<4;s++){_=R(s);let h=s+1;h===4&&(h=0);const n=b[2][0]-b[1][0],i=b[0][1]-b[1][1],o=b[1][0],r=b[1][1];let e=m;if(e>Math.abs(i)/1.5&&(e=Math.floor(Math.abs(i)/1.5)),e>Math.abs(n)/1.5&&(e=Math.floor(Math.abs(n)/1.5)),i<0){const y=o,M=o+n,q=r+i,S=r+i,C=o,k=o+n,p=r,w=r;t.moveTo(C+e,p),t.lineTo(k-e,w),t.quadraticCurveTo(k,w,k,w-e),t.lineTo(M,S+e),t.quadraticCurveTo(M,S,M-e,S),t.lineTo(y+e,q),t.quadraticCurveTo(y,q,y,q+e),t.lineTo(C,p-e),t.quadraticCurveTo(C,p,C+e,p)}else t.moveTo(o+e,r),t.lineTo(o+n-e,r),t.quadraticCurveTo(o+n,r,o+n,r+e),t.lineTo(o+n,r+i-e),t.quadraticCurveTo(o+n,r+i,o+n,r+i),t.lineTo(o+e,r+i),t.quadraticCurveTo(o,r+i,o,r+i),t.lineTo(o,r+e),t.quadraticCurveTo(o,r,o+e,r)}t.fill(),d&&t.stroke()};
//# sourceMappingURL=roundedBarCharts.js.map
