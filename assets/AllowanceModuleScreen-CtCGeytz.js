import{c as be,h as re,j as e,C as Se,X as Be,P as ke,D as Z,S as Ie,d as qe}from"./index-BXEFCDgO.js";import{r as i}from"./router-CGDcMtIr.js";import{q as E,k as Pe,o as pe,y as $e,A as He,l as U,s as de,m as Ue,n as ge,t as _e,v as Ke,w as Q,x as Ve}from"./firebase-DJWpnxAx.js";import"./vendor-c5ypKtDW.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]],ae=be("calculator",Ze);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Ae=be("file-text",Qe);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],Ye=be("history",Xe),se="allowance_records",q=Pe(re,se),et=t=>{const{basic7JHS:a,basic8JHS:r,basic9JHS:l}=t;return(a||0)+(r||0)+(l||0)},tt=t=>{const{creche:a,nursery1:r,nursery2:l,kg1:d,kg2:n,basic1:o,basic2:c,basic3:h,basic4:p,basic5:y,basic6:A,basic7General:x,basic8General:F,basic9General:Y}=t;return(a||0)+(r||0)+(l||0)+(d||0)+(n||0)+(o||0)+(c||0)+(h||0)+(p||0)+(y||0)+(A||0)+(x||0)+(F||0)+(Y||0)},Ce=t=>{const a=[];return(!t.weekNumber||t.weekNumber<1||t.weekNumber>52)&&a.push("Week number must be between 1 and 52"),(!t.numberOfTeachers||t.numberOfTeachers<0)&&a.push("Number of teachers must be a positive number"),(!t.numberOfJHSTeachers||t.numberOfJHSTeachers<0)&&a.push("Number of JHS teachers must be a positive number"),(!t.totalSum||t.totalSum<=0)&&a.push("Total sum must be greater than 0"),a},ie=t=>new Intl.NumberFormat("en-GH",{style:"currency",currency:"GHS",minimumFractionDigits:2}).format(t||0),at=t=>{const{welfare:a,office:r,kitchen:l}=t;return(a||0)+(r||0)+(l||0)},Fe=async t=>{try{const a=E(q,Q("weekNumber","==",t));return!(await U(a)).empty}catch(a){throw console.error("Error checking if week exists:",a),a}},rt=async()=>{try{const a=(await U(q)).docs.map(o=>({id:o.id,...o.data()}));if(a.length===0)return{totalRecords:0,avgTotalSum:0,maxTotalSum:0,minTotalSum:0,avgTeacherAllowance:0,avgJHSTeacherAllowance:0};const r=a.length,l=a.map(o=>o.totalSum||0),d=a.map(o=>o.eachTeacher||0),n=a.map(o=>o.eachJHSTeacher||0);return{totalRecords:r,avgTotalSum:l.reduce((o,c)=>o+c,0)/r,maxTotalSum:Math.max(...l),minTotalSum:Math.min(...l),avgTeacherAllowance:d.reduce((o,c)=>o+c,0)/r,avgJHSTeacherAllowance:n.reduce((o,c)=>o+c,0)/r}}catch(t){throw console.error("Error getting allowance summary:",t),t}},st=async(t,a)=>{try{const r=E(q,Q("weekNumber",">=",t),Q("weekNumber","<=",a),pe("weekNumber","asc"));return(await U(r)).docs.map(d=>({id:d.id,...d.data()}))}catch(r){throw console.error("Error getting records by range:",r),r}},ot=async t=>{try{const a=Ce(t);if(a.length>0)throw new Error(`Validation failed: ${a.join(", ")}`);if(await Fe(t.weekNumber))throw new Error(`Record for week ${t.weekNumber} already exists`);const l={...t,createdAt:de(),updatedAt:de()};return(await Ue(q,l)).id}catch(a){throw console.error("Error saving calculation:",a),a}},ue=async(t=null,a=null)=>{try{let r=E(q,pe("weekNumber","desc"));t&&(r=E(r,$e(t))),a&&(r=E(r,He(a)));const l=await U(r);return{records:l.docs.map(n=>({id:n.id,...n.data()})),lastDoc:l.docs[l.docs.length-1]||null,hasMore:l.docs.length===t}}catch(r){throw console.error("Error getting calculations:",r),r}},fe=async t=>{try{const a=E(q,Q("weekNumber","==",t)),r=await U(a);if(r.empty)return null;const l=r.docs[0];return{id:l.id,...l.data()}}catch(a){throw console.error("Error getting allowance record by week:",a),a}},lt=async t=>{try{const a=ge(re,se,t),r=await Ve(a);return r.exists()?{id:r.id,...r.data()}:null}catch(a){throw console.error("Error getting allowance record by ID:",a),a}},nt=async(t,a)=>{try{const r=Ce(a);if(r.length>0)throw new Error(`Validation failed: ${r.join(", ")}`);const l=ge(re,se,t),d={...a,updatedAt:de()};return await _e(l,d),!0}catch(r){throw console.error("Error updating allowance record:",r),r}},ct=async t=>{try{const a=ge(re,se,t);return await Ke(a),!0}catch(a){throw console.error("Error deleting allowance record:",a),a}},De=async(t=null,a=null)=>{try{let r=E(q,Q("welfare",">",0),pe("weekNumber","desc"));t&&(r=E(r,$e(t))),a&&(r=E(r,He(a)));const l=await U(r);return{records:l.docs.map(n=>{const o=n.data();let c="N/A";if(o.createdAt&&o.createdAt.toDate)try{c=o.createdAt.toDate().toLocaleDateString()}catch(h){console.log("Error parsing date:",o.createdAt,h)}return{id:n.id,weekNumber:o.weekNumber,welfare:o.welfare,datePaid:c}}),lastDoc:l.docs[l.docs.length-1]||null,hasMore:l.docs.length===t}}catch(r){throw console.error("Error getting welfare records:",r),r}},it=async t=>{try{const a=await fe(t);if(!a)return null;const r=et(a),l=tt(a),d=at(a);return{...a,totalJHSStudents:r,totalGeneralStudents:l,totalDeductions:d,formattedTotalSum:ie(a.totalSum),formattedEachTeacher:ie(a.eachTeacher),formattedEachJHSTeacher:ie(a.eachJHSTeacher)}}catch(a){throw console.error("Error generating weekly report:",a),a}},dt=()=>{const[t,a]=i.useState(!1),[r,l]=i.useState(null),[d,n]=i.useState([]),[o,c]=i.useState(null),[h,p]=i.useState(null),[y,A]=i.useState(!0),x=i.useCallback(async(m,f=!0)=>{f&&a(!0),l(null);try{return await m()}catch(H){return console.error("Async operation error:",H),l(H.message||"An error occurred"),null}finally{f&&a(!1)}},[]),F=i.useCallback(async(m=20,f=!1)=>{const H=f?null:h,C=await x(()=>ue(m,H));C&&(n(f?C.records:I=>[...I,...C.records]),p(C.lastDoc),A(C.hasMore))},[x,h]),Y=i.useCallback(async(m=20)=>{!y||t||await F(m,!1)},[F,y,t]),ee=i.useCallback(async(m=20)=>{p(null),A(!0),await F(m,!0)},[F]),we=i.useCallback(async m=>{const f=await x(()=>ot(m));return f?(await ee(),f):null},[x,ee]),M=i.useCallback(async(m,f)=>{const H=await x(()=>nt(m,f));return H&&n(C=>C.map(I=>I.id===m?{...I,...f}:I)),H},[x]),le=i.useCallback(async m=>{const f=await x(()=>ct(m));return f&&n(H=>H.filter(C=>C.id!==m)),f},[x]),B=i.useCallback(async m=>await x(()=>fe(m),!1),[x]),ne=i.useCallback(async m=>await x(()=>lt(m),!1),[x]),O=i.useCallback(async()=>{const m=await x(()=>rt(),!1);return m&&c(m),m},[x]),ce=i.useCallback(async(m,f)=>await x(()=>De(m,f),!1),[x]),je=i.useCallback(async(m,f)=>await x(()=>st(m,f),!1),[x]),Ne=i.useCallback(async m=>await x(()=>it(m),!1),[x]),w=i.useCallback(async m=>await x(()=>Fe(m),!1),[x]),J=i.useCallback(()=>{l(null)},[]);return i.useEffect(()=>{(async()=>{await Promise.all([F(20,!0),O()])})()},[]),{loading:t,error:r,allowances:d,summary:o,hasMore:y,addAllowance:we,updateAllowance:M,deleteAllowance:le,getById:ne,getByWeek:B,fetchAllowances:F,refreshAllowances:ee,loadMoreAllowances:Y,getSummary:O,fetchWelfareRecords:ce,getRecordsByRange:je,generateWeeklyReport:Ne,checkWeekExists:w,clearError:J}};let ut={data:""},mt=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||ut,ht=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,xt=/\/\*[^]*?\*\/|  +/g,Te=/\n+/g,W=(t,a)=>{let r="",l="",d="";for(let n in t){let o=t[n];n[0]=="@"?n[1]=="i"?r=n+" "+o+";":l+=n[1]=="f"?W(o,n):n+"{"+W(o,n[1]=="k"?"":a)+"}":typeof o=="object"?l+=W(o,a?a.replace(/([^,])+/g,c=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,h=>/&/.test(h)?h.replace(/&/g,c):c?c+" "+h:h)):n):o!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=W.p?W.p(n,o):n+":"+o+";")}return r+(a&&d?a+"{"+d+"}":d)+l},R={},Re=t=>{if(typeof t=="object"){let a="";for(let r in t)a+=r+Re(t[r]);return a}return t},bt=(t,a,r,l,d)=>{let n=Re(t),o=R[n]||(R[n]=(h=>{let p=0,y=11;for(;p<h.length;)y=101*y+h.charCodeAt(p++)>>>0;return"go"+y})(n));if(!R[o]){let h=n!==t?t:(p=>{let y,A,x=[{}];for(;y=ht.exec(p.replace(xt,""));)y[4]?x.shift():y[3]?(A=y[3].replace(Te," ").trim(),x.unshift(x[0][A]=x[0][A]||{})):x[0][y[1]]=y[2].replace(Te," ").trim();return x[0]})(t);R[o]=W(d?{["@keyframes "+o]:h}:h,r?"":"."+o)}let c=r&&R.g?R.g:null;return r&&(R.g=R[o]),((h,p,y,A)=>{A?p.data=p.data.replace(A,h):p.data.indexOf(h)===-1&&(p.data=y?h+p.data:p.data+h)})(R[o],a,l,c),o},pt=(t,a,r)=>t.reduce((l,d,n)=>{let o=a[n];if(o&&o.call){let c=o(r),h=c&&c.props&&c.props.className||/^go/.test(c)&&c;o=h?"."+h:c&&typeof c=="object"?c.props?"":W(c,""):c===!1?"":c}return l+d+(o??"")},"");function oe(t){let a=this||{},r=t.call?t(a.p):t;return bt(r.unshift?r.raw?pt(r,[].slice.call(arguments,1),a.p):r.reduce((l,d)=>Object.assign(l,d&&d.call?d(a.p):d),{}):r,mt(a.target),a.g,a.o,a.k)}let Ee,me,he;oe.bind({g:1});let G=oe.bind({k:1});function gt(t,a,r,l){W.p=a,Ee=t,me=r,he=l}function z(t,a){let r=this||{};return function(){let l=arguments;function d(n,o){let c=Object.assign({},n),h=c.className||d.className;r.p=Object.assign({theme:me&&me()},c),r.o=/ *go\d+/.test(h),c.className=oe.apply(r,l)+(h?" "+h:"");let p=t;return t[0]&&(p=c.as||t,delete c.as),he&&p[0]&&he(c),Ee(p,c)}return d}}var ft=t=>typeof t=="function",xe=(t,a)=>ft(t)?t(a):t,yt=(()=>{let t=0;return()=>(++t).toString()})(),wt=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let a=matchMedia("(prefers-reduced-motion: reduce)");t=!a||a.matches}return t}})(),jt=20,Ge="default",Oe=(t,a)=>{let{toastLimit:r}=t.settings;switch(a.type){case 0:return{...t,toasts:[a.toast,...t.toasts].slice(0,r)};case 1:return{...t,toasts:t.toasts.map(o=>o.id===a.toast.id?{...o,...a.toast}:o)};case 2:let{toast:l}=a;return Oe(t,{type:t.toasts.find(o=>o.id===l.id)?1:0,toast:l});case 3:let{toastId:d}=a;return{...t,toasts:t.toasts.map(o=>o.id===d||d===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return a.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(o=>o.id!==a.toastId)};case 5:return{...t,pausedAt:a.time};case 6:let n=a.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+n}))}}},Nt=[],vt={toasts:[],pausedAt:void 0,settings:{toastLimit:jt}},P={},Je=(t,a=Ge)=>{P[a]=Oe(P[a]||vt,t),Nt.forEach(([r,l])=>{r===a&&l(P[a])})},Le=t=>Object.keys(P).forEach(a=>Je(t,a)),St=t=>Object.keys(P).find(a=>P[a].toasts.some(r=>r.id===t)),ye=(t=Ge)=>a=>{Je(a,t)},kt=(t,a="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:a,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...r,id:(r==null?void 0:r.id)||yt()}),X=t=>(a,r)=>{let l=kt(a,t,r);return ye(l.toasterId||St(l.id))({type:2,toast:l}),l.id},S=(t,a)=>X("blank")(t,a);S.error=X("error");S.success=X("success");S.loading=X("loading");S.custom=X("custom");S.dismiss=(t,a)=>{let r={type:3,toastId:t};a?ye(a)(r):Le(r)};S.dismissAll=t=>S.dismiss(void 0,t);S.remove=(t,a)=>{let r={type:4,toastId:t};a?ye(a)(r):Le(r)};S.removeAll=t=>S.remove(void 0,t);S.promise=(t,a,r)=>{let l=S.loading(a.loading,{...r,...r==null?void 0:r.loading});return typeof t=="function"&&(t=t()),t.then(d=>{let n=a.success?xe(a.success,d):void 0;return n?S.success(n,{id:l,...r,...r==null?void 0:r.success}):S.dismiss(l),d}).catch(d=>{let n=a.error?xe(a.error,d):void 0;n?S.error(n,{id:l,...r,...r==null?void 0:r.error}):S.dismiss(l)}),t};var At=G`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Tt=G`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$t=G`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ht=z("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${At} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Tt} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${$t} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ct=G`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ft=z("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${Ct} 1s linear infinite;
`,Dt=G`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Rt=G`
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
}`,Et=z("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Dt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Rt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Gt=z("div")`
  position: absolute;
`,Ot=z("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Jt=G`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Lt=z("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Jt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Wt=({toast:t})=>{let{icon:a,type:r,iconTheme:l}=t;return a!==void 0?typeof a=="string"?i.createElement(Lt,null,a):a:r==="blank"?null:i.createElement(Ot,null,i.createElement(Ft,{...l}),r!=="loading"&&i.createElement(Gt,null,r==="error"?i.createElement(Ht,{...l}):i.createElement(Et,{...l})))},zt=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Mt=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Bt="0%{opacity:0;} 100%{opacity:1;}",It="0%{opacity:1;} 100%{opacity:0;}",qt=z("div")`
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
`,Pt=z("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ut=(t,a)=>{let r=t.includes("top")?1:-1,[l,d]=wt()?[Bt,It]:[zt(r),Mt(r)];return{animation:a?`${G(l)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${G(d)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};i.memo(({toast:t,position:a,style:r,children:l})=>{let d=t.height?Ut(t.position||a||"top-center",t.visible):{opacity:0},n=i.createElement(Wt,{toast:t}),o=i.createElement(Pt,{...t.ariaProps},xe(t.message,t));return i.createElement(qt,{className:t.className,style:{...d,...r,...t.style}},typeof l=="function"?l({icon:n,message:o}):i.createElement(i.Fragment,null,n,o))});gt(i.createElement);oe`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var k=S;const Qt=()=>{const{allowances:t,loading:a,summary:r,addAllowance:l,checkWeekExists:d}=dt(),[n,o]=i.useState(!1),[c,h]=i.useState("dashboard"),[p,y]=i.useState(""),[A,x]=i.useState(!1),[F,Y]=i.useState(null),[ee,we]=i.useState("overview"),[M,le]=i.useState(""),[B,ne]=i.useState(""),[O,ce]=i.useState(""),[je,Ne]=i.useState("week"),[w,J]=i.useState({weekNumber:"",numberOfTeachers:"",numberOfJHSTeachers:"",welfareAmount:"",classAmounts:{creche:"",nursery1:"",nursery2:"",kg1:"",kg2:"",basic1:"",basic2:"",basic3:"",basic4:"",basic5:"",basic6:"",basic7General:"",basic7JHS:"",basic8General:"",basic8JHS:"",basic9General:"",basic9JHS:""}}),[m,f]=i.useState(null),H=i.useMemo(()=>{if(!p)return t;const s=p.toLowerCase();return t.filter(u=>u.weekNumber.toString().includes(s)||u.totalSum.toString().includes(s))},[t,p]),C=()=>{const s=Object.fromEntries(Object.entries(w.classAmounts).map(([K,V])=>[K,parseFloat(V)||0])),u=parseInt(w.numberOfTeachers)||0,j=parseInt(w.numberOfJHSTeachers)||0,N=parseFloat(w.welfareAmount)||0;if(!w.weekNumber||u===0){k.error("Week number and number of teachers are required");return}const b=Object.values(s).reduce((K,V)=>K+V,0),$=b-N,v=$*.05,D=$-v,te=D*.05,_=D-te,L=s.basic7JHS+s.basic8JHS+s.basic9JHS,g=u>0?_/u:0,T=j>0?L/j:0;f({weekNumber:parseInt(w.weekNumber),totalSum:b,welfare:N,balanceAfterWelfare:$,office:v,balanceAfterOffice:D,kitchen:te,balanceAfterKitchen:_,eachTeacher:g,jhsClasses:L,eachJHSTeacher:T,amounts:s,numberOfTeachers:u,numberOfJHSTeachers:j})},I=async()=>{if(m)try{if(await d(m.weekNumber)){k.error("Calculation for this week already exists");return}const u={...m,createdAt:new Date};await l(u),k.success("Calculation saved successfully"),J({weekNumber:"",numberOfTeachers:"",numberOfJHSTeachers:"",welfareAmount:"",classAmounts:{creche:"",nursery1:"",nursery2:"",kg1:"",kg2:"",basic1:"",basic2:"",basic3:"",basic4:"",basic5:"",basic6:"",basic7General:"",basic7JHS:"",basic8General:"",basic8JHS:"",basic9General:"",basic9JHS:""}}),f(null),x(!1)}catch{k.error("Failed to save calculation")}},ve=async()=>{o(!0);try{const{records:s}=await ue(),{records:u}=await De();let j=`
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
              <p>Total Calculations: ${s.length}</p>
              <p>Total Amount: GHS ${s.reduce((v,D)=>v+(D.totalSum||0),0).toFixed(2)}</p>
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
                ${s.slice(0,5).map(v=>`
                  <tr>
                    <td>${v.weekNumber}</td>
                    <td>${v.createdAt?new Date(v.createdAt.toDate?v.createdAt.toDate():v.createdAt).toLocaleDateString():"N/A"}</td>
                    <td>GHS ${(v.totalSum||0).toFixed(2)}</td>
                    <td>GHS ${(v.eachTeacher||0).toFixed(2)}</td>
                    <td>GHS ${(v.eachJHSTeacher||0).toFixed(2)}</td>
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
                ${u.slice(0,5).map(v=>`
                  <tr>
                    <td>${v.weekNumber}</td>
                    <td>GHS ${(v.welfare||0).toFixed(2)}</td>
                    <td>${v.datePaid||"N/A"}</td>
                  </tr>
                `).join("")}
                <tr class="total-row">
                  <td colspan="2">Total Welfare Payments</td>
                  <td>GHS ${u.reduce((v,D)=>v+(D.welfare||0),0).toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;const N=new Blob([j],{type:"text/html"}),b=URL.createObjectURL(N),$=document.createElement("a");$.href=b,$.download=`allowance-report-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild($),$.click(),document.body.removeChild($),URL.revokeObjectURL(b),k.success("Report downloaded successfully!")}catch(s){console.error("Error generating report:",s),k.error("Failed to generate report")}finally{o(!1)}},We=async()=>{if(!M){k.error("Please enter a week number");return}o(!0);try{const s=await fe(parseInt(M,10));if(!s){k.error("No data found for the specified week");return}const u=`
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
            </style>
          </head>
          <body>
            <h1>Weekly Allowance Report</h1>
            <h2>Week ${s.weekNumber}</h2>

            <table>
              <tr>
                <th>Description</th>
                <th>Amount (GHS)</th>
              </tr>
              <tr>
                <td>Total Sum</td>
                <td>${(s.totalSum||0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Welfare</td>
                <td>${(s.welfare||0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Office (5%)</td>
                <td>${(s.office||0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Kitchen (5%)</td>
                <td>${(s.kitchen||0).toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Balance After Deductions</td>
                <td>${(s.balanceAfterKitchen||0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Each Teacher (${s.numberOfTeachers||0})</td>
                <td>${(s.eachTeacher||0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Each JHS Teacher (${s.numberOfJHSTeachers||0})</td>
                <td>${(s.eachJHSTeacher||0).toFixed(2)}</td>
              </tr>
            </table>
          </body>
        </html>
      `,j=new Blob([u],{type:"text/html"}),N=URL.createObjectURL(j),b=document.createElement("a");b.href=N,b.download=`weekly-report-week-${M}-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild(b),b.click(),document.body.removeChild(b),URL.revokeObjectURL(N),k.success("Weekly report downloaded successfully!")}catch(s){console.error("Error generating weekly report:",s),k.error("Failed to generate weekly report")}finally{o(!1)}},ze=async()=>{if(!B||!O){k.error("Please select both start and end dates");return}o(!0);try{const u=(await ue()).records.filter(g=>{if(!g.createdAt)return!1;const T=g.createdAt.toDate?g.createdAt.toDate():new Date(g.createdAt),K=new Date(B),V=new Date(O);return T>=K&&T<=V});if(!u||u.length===0){k.error("No data found for the specified date range");return}const j=u.reduce((g,T)=>g+(T.totalSum||0),0),N=u.reduce((g,T)=>g+(T.welfare||0),0),b=u.reduce((g,T)=>g+(T.office||0),0),$=u.reduce((g,T)=>g+(T.kitchen||0),0),v=u.reduce((g,T)=>g+(T.balanceAfterKitchen||0),0),D=`
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
            </style>
          </head>
          <body>
            <h1>Date Range Allowance Report</h1>
            <h2>${new Date(B).toLocaleDateString()} to ${new Date(O).toLocaleDateString()}</h2>

            <table>
              <tr>
                <th>Week</th>
                <th>Date</th>
                <th>Total Sum</th>
                <th>Each Teacher</th>
                <th>Each JHS Teacher</th>
              </tr>
              ${u.map(g=>`
                <tr>
                  <td>${g.weekNumber}</td>
                  <td>${g.createdAt?(g.createdAt.toDate?g.createdAt.toDate():new Date(g.createdAt)).toLocaleDateString():"N/A"}</td>
                  <td>${(g.totalSum||0).toFixed(2)}</td>
                  <td>${(g.eachTeacher||0).toFixed(2)}</td>
                  <td>${(g.eachJHSTeacher||0).toFixed(2)}</td>
                </tr>
              `).join("")}
              <tr class="total-row">
                <td colspan="2">Totals</td>
                <td>${j.toFixed(2)}</td>
                <td colspan="2"></td>
              </tr>
            </table>
          </body>
        </html>
      `,te=new Blob([D],{type:"text/html"}),_=URL.createObjectURL(te),L=document.createElement("a");L.href=_,L.download=`date-range-report-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild(L),L.click(),document.body.removeChild(L),URL.revokeObjectURL(_),k.success("Date range report downloaded successfully!")}catch(s){console.error("Error generating date range report:",s),k.error("Failed to generate date range report")}finally{o(!1)}},Me=async s=>{if(s){o(!0);try{const u=`
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
            <h2>Week ${s.weekNumber} - ${s.createdAt?(s.createdAt.toDate?s.createdAt.toDate():new Date(s.createdAt)).toLocaleDateString():"N/A"}</h2>

            <div class="section">
              <h3>Class Contributions</h3>
              <table>
                <tr>
                  <th>Class</th>
                  <th>Amount (GHS)</th>
                </tr>
                <tr><td>Creche</td><td>${(s.creche||0).toFixed(2)}</td></tr>
                <tr><td>Nursery 1</td><td>${(s.nursery1||0).toFixed(2)}</td></tr>
                <tr><td>Nursery 2</td><td>${(s.nursery2||0).toFixed(2)}</td></tr>
                <tr><td>KG 1</td><td>${(s.kg1||0).toFixed(2)}</td></tr>
                <tr><td>KG 2</td><td>${(s.kg2||0).toFixed(2)}</td></tr>
                <tr><td>Basic 1</td><td>${(s.basic1||0).toFixed(2)}</td></tr>
                <tr><td>Basic 2</td><td>${(s.basic2||0).toFixed(2)}</td></tr>
                <tr><td>Basic 3</td><td>${(s.basic3||0).toFixed(2)}</td></tr>
                <tr><td>Basic 4</td><td>${(s.basic4||0).toFixed(2)}</td></tr>
                <tr><td>Basic 5</td><td>${(s.basic5||0).toFixed(2)}</td></tr>
                <tr><td>Basic 6</td><td>${(s.basic6||0).toFixed(2)}</td></tr>
                <tr><td>Basic 7 (General)</td><td>${(s.basic7General||0).toFixed(2)}</td></tr>
                <tr><td>Basic 7 (JHS)</td><td>${(s.basic7JHS||0).toFixed(2)}</td></tr>
                <tr><td>Basic 8 (General)</td><td>${(s.basic8General||0).toFixed(2)}</td></tr>
                <tr><td>Basic 8 (JHS)</td><td>${(s.basic8JHS||0).toFixed(2)}</td></tr>
                <tr><td>Basic 9 (General)</td><td>${(s.basic9General||0).toFixed(2)}</td></tr>
                <tr><td>Basic 9 (JHS)</td><td>${(s.basic9JHS||0).toFixed(2)}</td></tr>
                <tr class="total-row">
                  <td>Total Sum</td>
                  <td>${(s.totalSum||0).toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h3>Deductions</h3>
              <table>
                <tr>
                  <th>Item</th>
                  <th>Amount (GHS)</th>
                  <th>Balance After</th>
                </tr>
                <tr>
                  <td>Welfare</td>
                  <td>${(s.welfare||0).toFixed(2)}</td>
                  <td>${(s.balanceAfterWelfare||0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Office (5%)</td>
                  <td>${(s.office||0).toFixed(2)}</td>
                  <td>${(s.balanceAfterOffice||0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Kitchen (5%)</td>
                  <td>${(s.kitchen||0).toFixed(2)}</td>
                  <td>${(s.balanceAfterKitchen||0).toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h3>Teacher Payments</h3>
              <table>
                <tr>
                  <th>Description</th>
                  <th>Amount (GHS)</th>
                </tr>
                <tr>
                  <td>Regular Teachers (${s.numberOfTeachers||0})</td>
                  <td>${(s.eachTeacher||0).toFixed(2)} each</td>
                </tr>
                <tr>
                  <td>JHS Teachers (${s.numberOfJHSTeachers||0})</td>
                  <td>${(s.eachJHSTeacher||0).toFixed(2)} each</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,j=new Blob([u],{type:"text/html"}),N=URL.createObjectURL(j),b=document.createElement("a");b.href=N,b.download=`detail-report-week-${s.weekNumber}-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild(b),b.click(),document.body.removeChild(b),URL.revokeObjectURL(N),k.success("Detailed report downloaded successfully!")}catch(u){console.error("Error generating detailed report:",u),k.error("Failed to generate detailed report")}finally{o(!1)}}};return e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx("div",{className:"bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",children:e.jsxs("div",{className:"px-4 py-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-xl font-bold text-gray-900",children:"Allowance Calculator"}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("button",{onClick:()=>h(c==="dashboard"?"calculator":"dashboard"),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:c==="dashboard"?e.jsx(ae,{size:20}):e.jsx(Se,{size:20})})})]}),e.jsxs("div",{className:"flex mt-3 bg-gray-100 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>h("dashboard"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="dashboard"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Dashboard"}),e.jsx("button",{onClick:()=>h("calculator"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="calculator"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Calculator"}),e.jsx("button",{onClick:()=>h("history"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="history"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"History"}),e.jsx("button",{onClick:()=>h("reports"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${c==="reports"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Reports"})]})]})}),e.jsxs("div",{className:"p-4 pb-20",children:[c==="dashboard"&&e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Overview"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded-xl text-center border border-blue-100",children:[e.jsx("div",{className:"text-2xl font-bold text-blue-600",children:(r==null?void 0:r.totalRecords)||0}),e.jsx("div",{className:"text-sm text-blue-600 font-medium",children:"Total Records"})]}),e.jsxs("div",{className:"bg-green-50 p-4 rounded-xl text-center border border-green-100",children:[e.jsxs("div",{className:"text-2xl font-bold text-green-600",children:["GHS ",((r==null?void 0:r.totalAmount)||0).toFixed(2)]}),e.jsx("div",{className:"text-sm text-green-600 font-medium",children:"Total Amount"})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Quick Actions"}),e.jsx("button",{onClick:()=>x(!A),className:`p-2 rounded-lg transition-colors ${A?"bg-red-100 text-red-600 hover:bg-red-200":"bg-blue-100 text-blue-600 hover:bg-blue-200"}`,children:A?e.jsx(Be,{size:20}):e.jsx(ke,{size:20})})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-4",children:[e.jsxs("button",{onClick:()=>x(!0),className:"bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[e.jsx(ae,{size:18}),e.jsx("span",{className:"text-sm font-medium",children:"New Calculation"})]}),e.jsxs("button",{onClick:ve,className:"bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[e.jsx(Z,{size:18}),e.jsx("span",{className:"text-sm font-medium",children:"Export"})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Calculations"}),a?e.jsxs("div",{className:"text-gray-500 text-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-2",children:"Loading..."})]}):e.jsxs("div",{className:"space-y-3",children:[t.slice(0,5).map(s=>{var u,j,N,b;return e.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[e.jsx("div",{className:"flex items-start justify-between mb-2",children:e.jsxs("div",{className:"flex-1",children:[e.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",s.weekNumber]}),e.jsx("p",{className:"text-sm text-gray-600",children:new Date(((j=(u=s.createdAt)==null?void 0:u.toDate)==null?void 0:j.call(u))||s.createdAt).toLocaleDateString()})]})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Total"}),e.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(N=s.totalSum)==null?void 0:N.toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),e.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(b=s.eachTeacher)==null?void 0:b.toFixed(2)]})]})]})]},s.id)}),t.length===0&&e.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[e.jsx(ae,{size:32,className:"mx-auto mb-2 text-gray-400"}),e.jsx("p",{children:"No calculations found"})]})]})]})]}),c==="calculator"&&e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"New Calculation"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[e.jsx("input",{type:"number",placeholder:"Week Number (1-16)",value:w.weekNumber,onChange:s=>J({...w,weekNumber:s.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),e.jsx("input",{type:"number",placeholder:"Number of Teachers",value:w.numberOfTeachers,onChange:s=>J({...w,numberOfTeachers:s.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),e.jsx("input",{type:"number",placeholder:"Number of JHS Teachers",value:w.numberOfJHSTeachers,onChange:s=>J({...w,numberOfJHSTeachers:s.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),e.jsx("input",{type:"number",placeholder:"Welfare Amount",value:w.welfareAmount,onChange:s=>J({...w,welfareAmount:s.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]}),e.jsx("h3",{className:"text-md font-medium text-gray-800",children:"Class Amounts (GHS)"}),e.jsx("div",{className:"grid grid-cols-2 gap-3",children:Object.keys(w.classAmounts).map(s=>e.jsx("input",{type:"number",placeholder:s.replace(/([A-Z])/g," $1").replace(/^./,u=>u.toUpperCase()),value:w.classAmounts[s],onChange:u=>J({...w,classAmounts:{...w.classAmounts,[s]:u.target.value}}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"},s))}),e.jsxs("button",{onClick:C,className:"w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[e.jsx(ae,{size:20}),e.jsx("span",{children:"Calculate"})]})]}),m&&e.jsxs("div",{className:"mt-6 p-4 bg-green-50 rounded-lg border border-green-200",children:[e.jsxs("h3",{className:"text-lg font-semibold text-green-900 mb-4",children:["Week ",m.weekNumber," Results"]}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Total Sum:"}),e.jsxs("span",{className:"font-medium",children:["GHS ",m.totalSum.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Welfare:"}),e.jsxs("span",{className:"font-medium",children:["GHS ",m.welfare.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Office (5%):"}),e.jsxs("span",{className:"font-medium",children:["GHS ",m.office.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Kitchen (5%):"}),e.jsxs("span",{className:"font-medium",children:["GHS ",m.kitchen.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between border-t pt-2",children:[e.jsx("span",{className:"font-medium",children:"Each Teacher:"}),e.jsxs("span",{className:"font-bold text-green-600",children:["GHS ",m.eachTeacher.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Each JHS Teacher:"}),e.jsxs("span",{className:"font-bold text-blue-600",children:["GHS ",m.eachJHSTeacher.toFixed(2)]})]})]}),e.jsxs("button",{onClick:I,className:"w-full mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[e.jsx(ke,{size:20}),e.jsx("span",{children:"Save Calculation"})]})]})]})}),c==="history"&&e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Calculation History"}),e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 ml-4 max-w-xs",children:[e.jsx(Ie,{size:16,className:"text-gray-500 mr-2"}),e.jsx("input",{placeholder:"Search by week...",value:p,onChange:s=>y(s.target.value),className:"bg-transparent border-none outline-none w-full text-sm text-gray-900 placeholder-gray-500"})]})]}),a?e.jsxs("div",{className:"text-gray-500 text-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-2",children:"Loading..."})]}):e.jsxs("div",{className:"space-y-3",children:[H.map(s=>{var u,j,N,b,$;return e.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[e.jsx("div",{className:"flex items-start justify-between mb-2",children:e.jsxs("div",{className:"flex-1",children:[e.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",s.weekNumber]}),e.jsx("p",{className:"text-sm text-gray-600",children:new Date(((j=(u=s.createdAt)==null?void 0:u.toDate)==null?void 0:j.call(u))||s.createdAt).toLocaleDateString()})]})}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Total"}),e.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(N=s.totalSum)==null?void 0:N.toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),e.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(b=s.eachTeacher)==null?void 0:b.toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Each JHS"}),e.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",($=s.eachJHSTeacher)==null?void 0:$.toFixed(2)]})]})]})]},s.id)}),H.length===0&&e.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[e.jsx(Ye,{size:32,className:"mx-auto mb-2 text-gray-400"}),e.jsx("p",{children:"No calculations found"})]})]})]})}),c==="reports"&&e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Reports"}),e.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[e.jsx("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(Ae,{size:24,className:"text-blue-500"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-blue-700 font-medium",children:"Full Report"}),e.jsx("p",{className:"text-blue-600 text-sm",children:"All calculations and welfare payments"})]})]}),e.jsx("button",{onClick:ve,disabled:n,className:"bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors",children:n?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),e.jsx("span",{children:"Generating..."})]}):e.jsxs(e.Fragment,{children:[e.jsx(Z,{size:16}),e.jsx("span",{children:"Generate"})]})})]})}),e.jsxs("div",{className:"bg-white border border-gray-200 p-4 rounded-xl",children:[e.jsx("div",{className:"flex items-center justify-between mb-3",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(Se,{size:24,className:"text-green-500"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-900 font-medium",children:"Weekly Report"}),e.jsx("p",{className:"text-gray-600 text-sm",children:"Generate report for specific week"})]})]})}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("input",{type:"number",placeholder:"Week number (1-52)",value:M,onChange:s=>le(s.target.value),className:"flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"}),e.jsxs("button",{onClick:We,disabled:n||!M,className:"bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors",children:[e.jsx(Z,{size:16}),e.jsx("span",{children:"Generate"})]})]})]}),e.jsxs("div",{className:"bg-white border border-gray-200 p-4 rounded-xl",children:[e.jsx("div",{className:"flex items-center justify-between mb-3",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(qe,{size:24,className:"text-purple-500"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-900 font-medium",children:"Date Range Report"}),e.jsx("p",{className:"text-gray-600 text-sm",children:"Generate report for date range"})]})]})}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 mb-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:"Start Date"}),e.jsx("input",{type:"date",value:B,onChange:s=>ne(s.target.value),className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:"End Date"}),e.jsx("input",{type:"date",value:O,onChange:s=>ce(s.target.value),className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"})]})]}),e.jsxs("button",{onClick:ze,disabled:n||!B||!O,className:"w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[e.jsx(Z,{size:16}),e.jsx("span",{children:"Generate Date Range Report"})]})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Calculations"}),a?e.jsxs("div",{className:"text-gray-500 text-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-2",children:"Loading..."})]}):e.jsxs("div",{className:"space-y-3",children:[t.slice(0,10).map(s=>{var u,j,N,b;return e.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",s.weekNumber]}),e.jsx("p",{className:"text-sm text-gray-600",children:new Date(((j=(u=s.createdAt)==null?void 0:u.toDate)==null?void 0:j.call(u))||s.createdAt).toLocaleDateString()})]}),e.jsxs("button",{onClick:()=>Me(s),disabled:n,className:"bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1 rounded-lg flex items-center gap-1 font-medium transition-colors text-sm",children:[e.jsx(Z,{size:14}),e.jsx("span",{children:"Detail PDF"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Total"}),e.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(N=s.totalSum)==null?void 0:N.toFixed(2)]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),e.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",(b=s.eachTeacher)==null?void 0:b.toFixed(2)]})]})]})]},s.id)}),t.length===0&&e.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[e.jsx(Ae,{size:32,className:"mx-auto mb-2 text-gray-400"}),e.jsx("p",{children:"No calculations found"})]})]})]})]})]})]})};export{Qt as default};
