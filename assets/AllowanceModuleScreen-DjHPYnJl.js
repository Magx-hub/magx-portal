import{c as se,h as I,j as a,C as Se,X as ke,P as le,D as ie,S as Ae}from"./index-BSBnbjTJ.js";import{r as u}from"./router-CGDcMtIr.js";import{q as C,k as Te,o as re,y as ue,A as me,l as G,s as Y,m as He,n as oe,t as Ce,v as Ee,w as z,x as $e}from"./firebase-DJWpnxAx.js";import"./vendor-c5ypKtDW.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]],P=se("calculator",Fe);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],De=se("file-text",Re);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],Ge=se("history",Je),_="allowance_records",D=Te(I,_),Oe=e=>{const{basic7JHS:t,basic8JHS:s,basic9JHS:r}=e;return(t||0)+(s||0)+(r||0)},ze=e=>{const{creche:t,nursery1:s,nursery2:r,kg1:i,kg2:n,basic1:o,basic2:c,basic3:m,basic4:p,basic5:y,basic6:j,basic7General:h,basic8General:b,basic9General:T}=e;return(t||0)+(s||0)+(r||0)+(i||0)+(n||0)+(o||0)+(c||0)+(m||0)+(p||0)+(y||0)+(j||0)+(h||0)+(b||0)+(T||0)},he=e=>{const t=[];return(!e.weekNumber||e.weekNumber<1||e.weekNumber>52)&&t.push("Week number must be between 1 and 52"),(!e.numberOfTeachers||e.numberOfTeachers<0)&&t.push("Number of teachers must be a positive number"),(!e.numberOfJHSTeachers||e.numberOfJHSTeachers<0)&&t.push("Number of JHS teachers must be a positive number"),(!e.totalSum||e.totalSum<=0)&&t.push("Total sum must be greater than 0"),t},X=e=>new Intl.NumberFormat("en-GH",{style:"currency",currency:"GHS",minimumFractionDigits:2}).format(e||0),Me=e=>{const{welfare:t,office:s,kitchen:r}=e;return(t||0)+(s||0)+(r||0)},xe=async e=>{try{const t=C(D,z("weekNumber","==",e));return!(await G(t)).empty}catch(t){throw console.error("Error checking if week exists:",t),t}},We=async()=>{try{const t=(await G(D)).docs.map(o=>({id:o.id,...o.data()}));if(t.length===0)return{totalRecords:0,avgTotalSum:0,maxTotalSum:0,minTotalSum:0,avgTeacherAllowance:0,avgJHSTeacherAllowance:0};const s=t.length,r=t.map(o=>o.totalSum||0),i=t.map(o=>o.eachTeacher||0),n=t.map(o=>o.eachJHSTeacher||0);return{totalRecords:s,avgTotalSum:r.reduce((o,c)=>o+c,0)/s,maxTotalSum:Math.max(...r),minTotalSum:Math.min(...r),avgTeacherAllowance:i.reduce((o,c)=>o+c,0)/s,avgJHSTeacherAllowance:n.reduce((o,c)=>o+c,0)/s}}catch(e){throw console.error("Error getting allowance summary:",e),e}},qe=async(e,t)=>{try{const s=C(D,z("weekNumber",">=",e),z("weekNumber","<=",t),re("weekNumber","asc"));return(await G(s)).docs.map(i=>({id:i.id,...i.data()}))}catch(s){throw console.error("Error getting records by range:",s),s}},Le=async e=>{try{const t=he(e);if(t.length>0)throw new Error(`Validation failed: ${t.join(", ")}`);if(await xe(e.weekNumber))throw new Error(`Record for week ${e.weekNumber} already exists`);const r={...e,createdAt:Y(),updatedAt:Y()};return(await He(D,r)).id}catch(t){throw console.error("Error saving calculation:",t),t}},Pe=async(e=null,t=null)=>{try{let s=C(D,re("weekNumber","desc"));e&&(s=C(s,ue(e))),t&&(s=C(s,me(t)));const r=await G(s);return{records:r.docs.map(n=>({id:n.id,...n.data()})),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.docs.length===e}}catch(s){throw console.error("Error getting calculations:",s),s}},be=async e=>{try{const t=C(D,z("weekNumber","==",e)),s=await G(t);if(s.empty)return null;const r=s.docs[0];return{id:r.id,...r.data()}}catch(t){throw console.error("Error getting allowance record by week:",t),t}},Ie=async e=>{try{const t=oe(I,_,e),s=await $e(t);return s.exists()?{id:s.id,...s.data()}:null}catch(t){throw console.error("Error getting allowance record by ID:",t),t}},_e=async(e,t)=>{try{const s=he(t);if(s.length>0)throw new Error(`Validation failed: ${s.join(", ")}`);const r=oe(I,_,e),i={...t,updatedAt:Y()};return await Ce(r,i),!0}catch(s){throw console.error("Error updating allowance record:",s),s}},Be=async e=>{try{const t=oe(I,_,e);return await Ee(t),!0}catch(t){throw console.error("Error deleting allowance record:",t),t}},Ze=async(e=null,t=null)=>{try{let s=C(D,z("welfare",">",0),re("weekNumber","desc"));e&&(s=C(s,ue(e))),t&&(s=C(s,me(t)));const r=await G(s);return{records:r.docs.map(n=>{const o=n.data();let c="N/A";if(o.createdAt&&o.createdAt.toDate)try{c=o.createdAt.toDate().toLocaleDateString()}catch(m){console.log("Error parsing date:",o.createdAt,m)}return{id:n.id,weekNumber:o.weekNumber,welfare:o.welfare,datePaid:c}}),lastDoc:r.docs[r.docs.length-1]||null,hasMore:r.docs.length===e}}catch(s){throw console.error("Error getting welfare records:",s),s}},Ue=async e=>{try{const t=await be(e);if(!t)return null;const s=Oe(t),r=ze(t),i=Me(t);return{...t,totalJHSStudents:s,totalGeneralStudents:r,totalDeductions:i,formattedTotalSum:X(t.totalSum),formattedEachTeacher:X(t.eachTeacher),formattedEachJHSTeacher:X(t.eachJHSTeacher)}}catch(t){throw console.error("Error generating weekly report:",t),t}},Ve=()=>{const[e,t]=u.useState(!1),[s,r]=u.useState(null),[i,n]=u.useState([]),[o,c]=u.useState(null),[m,p]=u.useState(null),[y,j]=u.useState(!0),h=u.useCallback(async(d,g=!0)=>{g&&t(!0),r(null);try{return await d()}catch(S){return console.error("Async operation error:",S),r(S.message||"An error occurred"),null}finally{g&&t(!1)}},[]),b=u.useCallback(async(d=20,g=!1)=>{const S=g?null:m,A=await h(()=>Pe(d,S));A&&(n(g?A.records:$=>[...$,...A.records]),p(A.lastDoc),j(A.hasMore))},[h,m]),T=u.useCallback(async(d=20)=>{!y||e||await b(d,!1)},[b,y,e]),v=u.useCallback(async(d=20)=>{p(null),j(!0),await b(d,!0)},[b]),W=u.useCallback(async d=>{const g=await h(()=>Le(d));return g?(await v(),g):null},[h,v]),q=u.useCallback(async(d,g)=>{const S=await h(()=>_e(d,g));return S&&n(A=>A.map($=>$.id===d?{...$,...g}:$)),S},[h]),Z=u.useCallback(async d=>{const g=await h(()=>Be(d));return g&&n(S=>S.filter(A=>A.id!==d)),g},[h]),U=u.useCallback(async d=>await h(()=>be(d),!1),[h]),V=u.useCallback(async d=>await h(()=>Ie(d),!1),[h]),L=u.useCallback(async()=>{const d=await h(()=>We(),!1);return d&&c(d),d},[h]),l=u.useCallback(async(d,g)=>await h(()=>Ze(d,g),!1),[h]),x=u.useCallback(async(d,g)=>await h(()=>qe(d,g),!1),[h]),N=u.useCallback(async d=>await h(()=>Ue(d),!1),[h]),k=u.useCallback(async d=>await h(()=>xe(d),!1),[h]),f=u.useCallback(()=>{r(null)},[]);return u.useEffect(()=>{(async()=>{await Promise.all([b(20,!0),L()])})()},[]),{loading:e,error:s,allowances:i,summary:o,hasMore:y,addAllowance:W,updateAllowance:q,deleteAllowance:Z,getById:V,getByWeek:U,fetchAllowances:b,refreshAllowances:v,loadMoreAllowances:T,getSummary:L,fetchWelfareRecords:l,getRecordsByRange:x,generateWeeklyReport:N,checkWeekExists:k,clearError:f}};let Ke={data:""},Qe=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Ke,Xe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ye=/\/\*[^]*?\*\/|  +/g,de=/\n+/g,F=(e,t)=>{let s="",r="",i="";for(let n in e){let o=e[n];n[0]=="@"?n[1]=="i"?s=n+" "+o+";":r+=n[1]=="f"?F(o,n):n+"{"+F(o,n[1]=="k"?"":t)+"}":typeof o=="object"?r+=F(o,t?t.replace(/([^,])+/g,c=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,m=>/&/.test(m)?m.replace(/&/g,c):c?c+" "+m:m)):n):o!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=F.p?F.p(n,o):n+":"+o+";")}return s+(t&&i?t+"{"+i+"}":i)+r},H={},pe=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+pe(e[s]);return t}return e},et=(e,t,s,r,i)=>{let n=pe(e),o=H[n]||(H[n]=(m=>{let p=0,y=11;for(;p<m.length;)y=101*y+m.charCodeAt(p++)>>>0;return"go"+y})(n));if(!H[o]){let m=n!==e?e:(p=>{let y,j,h=[{}];for(;y=Xe.exec(p.replace(Ye,""));)y[4]?h.shift():y[3]?(j=y[3].replace(de," ").trim(),h.unshift(h[0][j]=h[0][j]||{})):h[0][y[1]]=y[2].replace(de," ").trim();return h[0]})(e);H[o]=F(i?{["@keyframes "+o]:m}:m,s?"":"."+o)}let c=s&&H.g?H.g:null;return s&&(H.g=H[o]),((m,p,y,j)=>{j?p.data=p.data.replace(j,m):p.data.indexOf(m)===-1&&(p.data=y?m+p.data:p.data+m)})(H[o],t,r,c),o},tt=(e,t,s)=>e.reduce((r,i,n)=>{let o=t[n];if(o&&o.call){let c=o(s),m=c&&c.props&&c.props.className||/^go/.test(c)&&c;o=m?"."+m:c&&typeof c=="object"?c.props?"":F(c,""):c===!1?"":c}return r+i+(o??"")},"");function B(e){let t=this||{},s=e.call?e(t.p):e;return et(s.unshift?s.raw?tt(s,[].slice.call(arguments,1),t.p):s.reduce((r,i)=>Object.assign(r,i&&i.call?i(t.p):i),{}):s,Qe(t.target),t.g,t.o,t.k)}let fe,ee,te;B.bind({g:1});let E=B.bind({k:1});function at(e,t,s,r){F.p=t,fe=e,ee=s,te=r}function R(e,t){let s=this||{};return function(){let r=arguments;function i(n,o){let c=Object.assign({},n),m=c.className||i.className;s.p=Object.assign({theme:ee&&ee()},c),s.o=/ *go\d+/.test(m),c.className=B.apply(s,r)+(m?" "+m:"");let p=e;return e[0]&&(p=c.as||e,delete c.as),te&&p[0]&&te(c),fe(p,c)}return i}}var st=e=>typeof e=="function",ae=(e,t)=>st(e)?e(t):e,rt=(()=>{let e=0;return()=>(++e).toString()})(),ot=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),nt=20,ge="default",ye=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:r}=t;return ye(e,{type:e.toasts.find(o=>o.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(o=>o.id===i||i===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+n}))}}},ct=[],lt={toasts:[],pausedAt:void 0,settings:{toastLimit:nt}},J={},we=(e,t=ge)=>{J[t]=ye(J[t]||lt,e),ct.forEach(([s,r])=>{s===t&&r(J[t])})},je=e=>Object.keys(J).forEach(t=>we(e,t)),it=e=>Object.keys(J).find(t=>J[t].toasts.some(s=>s.id===e)),ne=(e=ge)=>t=>{we(t,e)},dt=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||rt()}),M=e=>(t,s)=>{let r=dt(t,e,s);return ne(r.toasterId||it(r.id))({type:2,toast:r}),r.id},w=(e,t)=>M("blank")(e,t);w.error=M("error");w.success=M("success");w.loading=M("loading");w.custom=M("custom");w.dismiss=(e,t)=>{let s={type:3,toastId:e};t?ne(t)(s):je(s)};w.dismissAll=e=>w.dismiss(void 0,e);w.remove=(e,t)=>{let s={type:4,toastId:e};t?ne(t)(s):je(s)};w.removeAll=e=>w.remove(void 0,e);w.promise=(e,t,s)=>{let r=w.loading(t.loading,{...s,...s==null?void 0:s.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let n=t.success?ae(t.success,i):void 0;return n?w.success(n,{id:r,...s,...s==null?void 0:s.success}):w.dismiss(r),i}).catch(i=>{let n=t.error?ae(t.error,i):void 0;n?w.error(n,{id:r,...s,...s==null?void 0:s.error}):w.dismiss(r)}),e};var ut=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,mt=E`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ht=E`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,xt=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ut} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${mt} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ht} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,bt=E`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,pt=R("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${bt} 1s linear infinite;
`,ft=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,gt=E`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,yt=R("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ft} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${gt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,wt=R("div")`
  position: absolute;
`,jt=R("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,vt=E`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Nt=R("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${vt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,St=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return t!==void 0?typeof t=="string"?u.createElement(Nt,null,t):t:s==="blank"?null:u.createElement(jt,null,u.createElement(pt,{...r}),s!=="loading"&&u.createElement(wt,null,s==="error"?u.createElement(xt,{...r}):u.createElement(yt,{...r})))},kt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,At=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Tt="0%{opacity:0;} 100%{opacity:1;}",Ht="0%{opacity:1;} 100%{opacity:0;}",Ct=R("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Et=R("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,$t=(e,t)=>{let s=e.includes("top")?1:-1,[r,i]=ot()?[Tt,Ht]:[kt(s),At(s)];return{animation:t?`${E(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${E(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};u.memo(({toast:e,position:t,style:s,children:r})=>{let i=e.height?$t(e.position||t||"top-center",e.visible):{opacity:0},n=u.createElement(St,{toast:e}),o=u.createElement(Et,{...e.ariaProps},ae(e.message,e));return u.createElement(Ct,{className:e.className,style:{...i,...s,...e.style}},typeof r=="function"?r({icon:n,message:o}):u.createElement(u.Fragment,null,n,o))});at(u.createElement);B`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var O=w;const Gt=()=>{const{allowances:e,loading:t,summary:s,addAllowance:r,checkWeekExists:i}=Ve(),[n,o]=u.useState(!1),[c,m]=u.useState("dashboard"),[p,y]=u.useState(""),[j,h]=u.useState(!1),[b,T]=u.useState({weekNumber:"",numberOfTeachers:"",numberOfJHSTeachers:"",welfareAmount:"",classAmounts:{creche:"",nursery1:"",nursery2:"",kg1:"",kg2:"",basic1:"",basic2:"",basic3:"",basic4:"",basic5:"",basic6:"",basic7General:"",basic7JHS:"",basic8General:"",basic8JHS:"",basic9General:"",basic9JHS:""}}),[v,W]=u.useState(null),q=u.useMemo(()=>{if(!p)return e;const l=p.toLowerCase();return e.filter(x=>x.weekNumber.toString().includes(l)||x.totalSum.toString().includes(l))},[e,p]),Z=()=>{const l=Object.fromEntries(Object.entries(b.classAmounts).map(([K,Q])=>[K,parseFloat(Q)||0])),x=parseInt(b.numberOfTeachers)||0,N=parseInt(b.numberOfJHSTeachers)||0,k=parseFloat(b.welfareAmount)||0;if(!b.weekNumber||x===0){O.error("Week number and number of teachers are required");return}const f=Object.values(l).reduce((K,Q)=>K+Q,0),d=f-k,g=d*.05,S=d-g,A=S*.05,$=S-A,ce=l.basic7JHS+l.basic8JHS+l.basic9JHS,ve=x>0?$/x:0,Ne=N>0?ce/N:0;W({weekNumber:parseInt(b.weekNumber),totalSum:f,welfare:k,balanceAfterWelfare:d,office:g,balanceAfterOffice:S,kitchen:A,balanceAfterKitchen:$,eachTeacher:ve,jhsClasses:ce,eachJHSTeacher:Ne,amounts:l,numberOfTeachers:x,numberOfJHSTeachers:N})},U=async()=>{if(v)try{if(await i(v.weekNumber)){O.error("Calculation for this week already exists");return}const x={...v,createdAt:new Date};await r(x),O.success("Calculation saved successfully"),T({weekNumber:"",numberOfTeachers:"",numberOfJHSTeachers:"",welfareAmount:"",classAmounts:{creche:"",nursery1:"",nursery2:"",kg1:"",kg2:"",basic1:"",basic2:"",basic3:"",basic4:"",basic5:"",basic6:"",basic7General:"",basic7JHS:"",basic8General:"",basic8JHS:"",basic9General:"",basic9JHS:""}}),W(null),h(!1)}catch{O.error("Failed to save calculation")}},V=async()=>{o(!0);try{const l=await getCalculations(),x=await getWelfarePayments();let N=`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #2c3e50; text-align: center; }
              h2 { color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total-row { font-weight: bold; }
              .section { margin-bottom: 30px; }
            </style>
          </head>
          <body>
            <h1>Friday Allowance Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            
            <div class="section">
              <h2>Summary</h2>
              <p>Total Calculations: ${l.length}</p>
              <p>Total Amount: GHS ${l.reduce((f,d)=>f+d.totalSum,0).toFixed(2)}</p>
            </div>
            
            <div class="section">
              <h2>Recent Calculations</h2>
              <table>
                <tr>
                  <th>Week</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Each Teacher</th>
                  <th>Each JHS Teacher</th>
                </tr>
                ${l.slice(0,5).map(f=>`
                  <tr>
                    <td>${f.weekNumber}</td>
                    <td>${new Date(f.createdAt).toLocaleDateString()}</td>
                    <td>GHS ${f.totalSum.toFixed(2)}</td>
                    <td>GHS ${f.eachTeacher.toFixed(2)}</td>
                    <td>GHS ${f.eachJHSTeacher.toFixed(2)}</td>
                  </tr>
                `).join("")}
              </table>
            </div>
            
            <div class="section">
              <h2>Welfare Payments</h2>
              <table>
                <tr>
                  <th>Week</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
                ${x.slice(0,5).map(f=>`
                  <tr>
                    <td>${f.weekNumber}</td>
                    <td>GHS ${f.amount.toFixed(2)}</td>
                    <td>${new Date(f.createdAt).toLocaleDateString()}</td>
                  </tr>
                `).join("")}
                <tr class="total-row">
                  <td colspan="2">Total Welfare Payments</td>
                  <td>GHS ${x.reduce((f,d)=>f+d.amount,0).toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;const{uri:k}=await Print.printToFileAsync({html:N});await shareAsync(k,{UTI:".pdf",mimeType:"application/pdf"})}catch(l){console.error("Error generating PDF:",l),Alert.alert("Error","Failed to generate PDF report")}finally{o(!1)}},L=()=>{O.success("PDF export feature coming soon")};return a.jsxs("div",{className:"min-h-screen bg-gray-50",children:[a.jsx("div",{className:"bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",children:a.jsxs("div",{className:"px-4 py-3",children:[a.jsxs("div",{className:"flex items-center justify-between",children:[a.jsx("h1",{className:"text-xl font-bold text-gray-900",children:"Allowance Calculator"}),a.jsx("div",{className:"flex items-center gap-2",children:a.jsx("button",{onClick:()=>m(c==="dashboard"?"calculator":"dashboard"),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:c==="dashboard"?a.jsx(P,{size:20}):a.jsx(Se,{size:20})})})]}),a.jsxs("div",{className:"flex mt-3 bg-gray-100 rounded-lg p-1",children:[a.jsx("button",{onClick:()=>m("dashboard"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="dashboard"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Dashboard"}),a.jsx("button",{onClick:()=>m("calculator"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="calculator"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Calculator"}),a.jsx("button",{onClick:()=>m("history"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="history"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"History"}),a.jsx("button",{onClick:()=>m("reports"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="reports"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Reports"})]})]})}),a.jsxs("div",{className:"p-4 pb-20",children:[c==="dashboard"&&a.jsxs("div",{className:"space-y-4",children:[a.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Overview"}),a.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[a.jsxs("div",{className:"bg-blue-50 p-4 rounded-xl text-center border border-blue-100",children:[a.jsx("div",{className:"text-2xl font-bold text-blue-600",children:(s==null?void 0:s.totalRecords)||0}),a.jsx("div",{className:"text-sm text-blue-600 font-medium",children:"Total Records"})]}),a.jsxs("div",{className:"bg-green-50 p-4 rounded-xl text-center border border-green-100",children:[a.jsxs("div",{className:"text-2xl font-bold text-green-600",children:["GHS ",((s==null?void 0:s.totalAmount)||0).toFixed(2)]}),a.jsx("div",{className:"text-sm text-green-600 font-medium",children:"Total Amount"})]})]})]}),a.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[a.jsxs("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Quick Actions"}),a.jsx("button",{onClick:()=>h(!j),className:`p-2 rounded-lg transition-colors ${j?"bg-red-100 text-red-600 hover:bg-red-200":"bg-blue-100 text-blue-600 hover:bg-blue-200"}`,children:j?a.jsx(ke,{size:20}):a.jsx(le,{size:20})})]}),a.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-4",children:[a.jsxs("button",{onClick:()=>h(!0),className:"bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[a.jsx(P,{size:18}),a.jsx("span",{className:"text-sm font-medium",children:"New Calculation"})]}),a.jsxs("button",{onClick:V,className:"bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[a.jsx(ie,{size:18}),a.jsx("span",{className:"text-sm font-medium",children:"Export"})]})]})]}),a.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Calculations"}),t?a.jsxs("div",{className:"text-gray-500 text-center py-8",children:[a.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),a.jsx("p",{className:"mt-2",children:"Loading..."})]}):a.jsxs("div",{className:"space-y-3",children:[e.slice(0,5).map(l=>{var x,N,k,f;return a.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[a.jsx("div",{className:"flex items-start justify-between mb-2",children:a.jsxs("div",{className:"flex-1",children:[a.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",l.weekNumber]}),a.jsx("p",{className:"text-sm text-gray-600",children:new Date(((N=(x=l.createdAt)==null?void 0:x.toDate)==null?void 0:N.call(x))||l.createdAt).toLocaleDateString()})]})}),a.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[a.jsxs("div",{children:[a.jsx("p",{className:"text-gray-500",children:"Total"}),a.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(k=l.totalSum)==null?void 0:k.toFixed(2)]})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),a.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(f=l.eachTeacher)==null?void 0:f.toFixed(2)]})]})]})]},l.id)}),e.length===0&&a.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[a.jsx(P,{size:32,className:"mx-auto mb-2 text-gray-400"}),a.jsx("p",{children:"No calculations found"})]})]})]})]}),c==="calculator"&&a.jsx("div",{className:"space-y-4",children:a.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"New Calculation"}),a.jsxs("div",{className:"space-y-4",children:[a.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[a.jsx("input",{type:"number",placeholder:"Week Number (1-16)",value:b.weekNumber,onChange:l=>T({...b,weekNumber:l.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),a.jsx("input",{type:"number",placeholder:"Number of Teachers",value:b.numberOfTeachers,onChange:l=>T({...b,numberOfTeachers:l.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),a.jsx("input",{type:"number",placeholder:"Number of JHS Teachers",value:b.numberOfJHSTeachers,onChange:l=>T({...b,numberOfJHSTeachers:l.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),a.jsx("input",{type:"number",placeholder:"Welfare Amount",value:b.welfareAmount,onChange:l=>T({...b,welfareAmount:l.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]}),a.jsx("h3",{className:"text-md font-medium text-gray-800",children:"Class Amounts (GHS)"}),a.jsx("div",{className:"grid grid-cols-2 gap-3",children:Object.keys(b.classAmounts).map(l=>a.jsx("input",{type:"number",placeholder:l.replace(/([A-Z])/g," $1").replace(/^./,x=>x.toUpperCase()),value:b.classAmounts[l],onChange:x=>T({...b,classAmounts:{...b.classAmounts,[l]:x.target.value}}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"},l))}),a.jsxs("button",{onClick:Z,className:"w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[a.jsx(P,{size:20}),a.jsx("span",{children:"Calculate"})]})]}),v&&a.jsxs("div",{className:"mt-6 p-4 bg-green-50 rounded-lg border border-green-200",children:[a.jsxs("h3",{className:"text-lg font-semibold text-green-900 mb-4",children:["Week ",v.weekNumber," Results"]}),a.jsxs("div",{className:"space-y-2 text-sm",children:[a.jsxs("div",{className:"flex justify-between",children:[a.jsx("span",{children:"Total Sum:"}),a.jsxs("span",{className:"font-medium",children:["GHS ",v.totalSum.toFixed(2)]})]}),a.jsxs("div",{className:"flex justify-between",children:[a.jsx("span",{children:"Welfare:"}),a.jsxs("span",{className:"font-medium",children:["GHS ",v.welfare.toFixed(2)]})]}),a.jsxs("div",{className:"flex justify-between",children:[a.jsx("span",{children:"Office (5%):"}),a.jsxs("span",{className:"font-medium",children:["GHS ",v.office.toFixed(2)]})]}),a.jsxs("div",{className:"flex justify-between",children:[a.jsx("span",{children:"Kitchen (5%):"}),a.jsxs("span",{className:"font-medium",children:["GHS ",v.kitchen.toFixed(2)]})]}),a.jsxs("div",{className:"flex justify-between border-t pt-2",children:[a.jsx("span",{className:"font-medium",children:"Each Teacher:"}),a.jsxs("span",{className:"font-bold text-green-600",children:["GHS ",v.eachTeacher.toFixed(2)]})]}),a.jsxs("div",{className:"flex justify-between",children:[a.jsx("span",{className:"font-medium",children:"Each JHS Teacher:"}),a.jsxs("span",{className:"font-bold text-blue-600",children:["GHS ",v.eachJHSTeacher.toFixed(2)]})]})]}),a.jsxs("button",{onClick:U,className:"w-full mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[a.jsx(le,{size:20}),a.jsx("span",{children:"Save Calculation"})]})]})]})}),c==="history"&&a.jsx("div",{className:"space-y-4",children:a.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[a.jsxs("div",{className:"flex items-center justify-between mb-4",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Calculation History"}),a.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 ml-4 max-w-xs",children:[a.jsx(Ae,{size:16,className:"text-gray-500 mr-2"}),a.jsx("input",{placeholder:"Search by week...",value:p,onChange:l=>y(l.target.value),className:"bg-transparent border-none outline-none w-full text-sm text-gray-900 placeholder-gray-500"})]})]}),t?a.jsxs("div",{className:"text-gray-500 text-center py-8",children:[a.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),a.jsx("p",{className:"mt-2",children:"Loading..."})]}):a.jsxs("div",{className:"space-y-3",children:[q.map(l=>{var x,N,k,f,d;return a.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[a.jsx("div",{className:"flex items-start justify-between mb-2",children:a.jsxs("div",{className:"flex-1",children:[a.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",l.weekNumber]}),a.jsx("p",{className:"text-sm text-gray-600",children:new Date(((N=(x=l.createdAt)==null?void 0:x.toDate)==null?void 0:N.call(x))||l.createdAt).toLocaleDateString()})]})}),a.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[a.jsxs("div",{children:[a.jsx("p",{className:"text-gray-500",children:"Total"}),a.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(k=l.totalSum)==null?void 0:k.toFixed(2)]})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),a.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(f=l.eachTeacher)==null?void 0:f.toFixed(2)]})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-gray-500",children:"Each JHS"}),a.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(d=l.eachJHSTeacher)==null?void 0:d.toFixed(2)]})]})]})]},l.id)}),q.length===0&&a.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[a.jsx(Ge,{size:32,className:"mx-auto mb-2 text-gray-400"}),a.jsx("p",{children:"No calculations found"})]})]})]})}),c==="reports"&&a.jsx("div",{className:"space-y-4",children:a.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Reports"}),a.jsxs("div",{className:"space-y-4",children:[a.jsx("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-100 h-32 rounded-xl flex items-center justify-center border border-blue-200",children:a.jsxs("div",{className:"text-center",children:[a.jsx(De,{size:32,className:"mx-auto mb-2 text-blue-500"}),a.jsx("p",{className:"text-blue-700 font-medium",children:"Generate Full Report"}),a.jsx("p",{className:"text-blue-600 text-sm",children:"PDF export coming soon"})]})}),a.jsxs("button",{onClick:L,className:"w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[a.jsx(ie,{size:20}),a.jsx("span",{children:"Generate PDF Report"})]})]})]})})]})]})};export{Gt as default};
