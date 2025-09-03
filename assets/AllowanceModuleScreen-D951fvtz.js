import{c as X,h as B,j as t,X as Se,P as le,D as J,S as ke,C as ne,d as Ae}from"./index-CJvqPIiD.js";import{r as u}from"./router-pa-sX1nh.js";import{q as k,k as $e,o as Y,y as ce,A as ie,l as E,s as K,m as Te,n as ee,t as He,v as Ce,w as W,x as Fe}from"./firebase-DgZFjSEB.js";import"./vendor-c5ypKtDW.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]],M=X("calculator",De);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],se=X("file-text",Re);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],Ge=X("history",Ee),P="allowance_records",H=$e(B,P),Oe=e=>{const{basic7JHS:a,basic8JHS:r,basic9JHS:o}=e;return(a||0)+(r||0)+(o||0)},Je=e=>{const{creche:a,nursery1:r,nursery2:o,kg1:n,kg2:l,basic1:s,basic2:c,basic3:i,basic4:h,basic5:b,basic6:f,basic7General:m,basic8General:p,basic9General:d}=e;return(a||0)+(r||0)+(o||0)+(n||0)+(l||0)+(s||0)+(c||0)+(i||0)+(h||0)+(b||0)+(f||0)+(m||0)+(p||0)+(d||0)},de=e=>{const a=[];return(!e.weekNumber||e.weekNumber<1||e.weekNumber>52)&&a.push("Week number must be between 1 and 52"),(!e.numberOfTeachers||e.numberOfTeachers<0)&&a.push("Number of teachers must be a positive number"),(!e.numberOfJHSTeachers||e.numberOfJHSTeachers<0)&&a.push("Number of JHS teachers must be a positive number"),(!e.totalSum||e.totalSum<=0)&&a.push("Total sum must be greater than 0"),a},_=e=>new Intl.NumberFormat("en-GH",{style:"currency",currency:"GHS",minimumFractionDigits:2}).format(e||0),We=e=>{const{welfare:a,office:r,kitchen:o}=e;return(a||0)+(r||0)+(o||0)},ue=async e=>{try{const a=k(H,W("weekNumber","==",e));return!(await E(a)).empty}catch(a){throw console.error("Error checking if week exists:",a),a}},Le=async()=>{try{const a=(await E(H)).docs.map(s=>({id:s.id,...s.data()}));if(a.length===0)return{totalRecords:0,avgTotalSum:0,maxTotalSum:0,minTotalSum:0,avgTeacherAllowance:0,avgJHSTeacherAllowance:0};const r=a.length,o=a.map(s=>s.totalSum||0),n=a.map(s=>s.eachTeacher||0),l=a.map(s=>s.eachJHSTeacher||0);return{totalRecords:r,avgTotalSum:o.reduce((s,c)=>s+c,0)/r,maxTotalSum:Math.max(...o),minTotalSum:Math.min(...o),avgTeacherAllowance:n.reduce((s,c)=>s+c,0)/r,avgJHSTeacherAllowance:l.reduce((s,c)=>s+c,0)/r}}catch(e){throw console.error("Error getting allowance summary:",e),e}},ze=async(e,a)=>{try{const r=k(H,W("weekNumber",">=",e),W("weekNumber","<=",a),Y("weekNumber","asc"));return(await E(r)).docs.map(n=>({id:n.id,...n.data()}))}catch(r){throw console.error("Error getting records by range:",r),r}},Me=async e=>{try{const a=de(e);if(a.length>0)throw new Error(`Validation failed: ${a.join(", ")}`);if(await ue(e.weekNumber))throw new Error(`Record for week ${e.weekNumber} already exists`);const o={...e,createdAt:K(),updatedAt:K()};return(await Te(H,o)).id}catch(a){throw console.error("Error saving calculation:",a),a}},te=async(e=null,a=null)=>{try{let r=k(H,Y("weekNumber","desc"));e&&(r=k(r,ce(e))),a&&(r=k(r,ie(a)));const o=await E(r);return{records:o.docs.map(l=>({id:l.id,...l.data()})),lastDoc:o.docs[o.docs.length-1]||null,hasMore:o.docs.length===e}}catch(r){throw console.error("Error getting calculations:",r),r}},ae=async e=>{try{const a=k(H,W("weekNumber","==",e)),r=await E(a);if(r.empty)return null;const o=r.docs[0];return{id:o.id,...o.data()}}catch(a){throw console.error("Error getting allowance record by week:",a),a}},Be=async e=>{try{const a=ee(B,P,e),r=await Fe(a);return r.exists()?{id:r.id,...r.data()}:null}catch(a){throw console.error("Error getting allowance record by ID:",a),a}},Pe=async(e,a)=>{try{const r=de(a);if(r.length>0)throw new Error(`Validation failed: ${r.join(", ")}`);const o=ee(B,P,e),n={...a,updatedAt:K()};return await He(o,n),!0}catch(r){throw console.error("Error updating allowance record:",r),r}},Ie=async e=>{try{const a=ee(B,P,e);return await Ce(a),!0}catch(a){throw console.error("Error deleting allowance record:",a),a}},me=async(e=null,a=null)=>{try{let r=k(H,W("welfare",">",0),Y("weekNumber","desc"));e&&(r=k(r,ce(e))),a&&(r=k(r,ie(a)));const o=await E(r);return{records:o.docs.map(l=>{const s=l.data();let c="N/A";if(s.createdAt&&s.createdAt.toDate)try{c=s.createdAt.toDate().toLocaleDateString()}catch(i){console.log("Error parsing date:",s.createdAt,i)}return{id:l.id,weekNumber:s.weekNumber,welfare:s.welfare,datePaid:c}}),lastDoc:o.docs[o.docs.length-1]||null,hasMore:o.docs.length===e}}catch(r){throw console.error("Error getting welfare records:",r),r}},qe=async e=>{try{const a=await ae(e);if(!a)return null;const r=Oe(a),o=Je(a),n=We(a);return{...a,totalJHSStudents:r,totalGeneralStudents:o,totalDeductions:n,formattedTotalSum:_(a.totalSum),formattedEachTeacher:_(a.eachTeacher),formattedEachJHSTeacher:_(a.eachJHSTeacher)}}catch(a){throw console.error("Error generating weekly report:",a),a}},Ue=()=>{const[e,a]=u.useState(!1),[r,o]=u.useState(null),[n,l]=u.useState([]),[s,c]=u.useState(null),[i,h]=u.useState(null),[b,f]=u.useState(!0),m=u.useCallback(async(x,y=!0)=>{y&&a(!0),o(null);try{return await x()}catch(N){return console.error("Async operation error:",N),o(N.message||"An error occurred"),null}finally{y&&a(!1)}},[]),p=u.useCallback(async(x=20,y=!1)=>{const N=y?null:i,v=await m(()=>te(x,N));v&&(l(y?v.records:O=>[...O,...v.records]),h(v.lastDoc),f(v.hasMore))},[m,i]),d=u.useCallback(async(x=20)=>{!b||e||await p(x,!1)},[p,b,e]),g=u.useCallback(async(x=20)=>{h(null),f(!0),await p(x,!0)},[p]),C=u.useCallback(async x=>{const y=await m(()=>Me(x));return y?(await g(),y):null},[m,g]),F=u.useCallback(async(x,y)=>{const N=await m(()=>Pe(x,y));return N&&l(v=>v.map(O=>O.id===x?{...O,...y}:O)),N},[m]),z=u.useCallback(async x=>{const y=await m(()=>Ie(x));return y&&l(N=>N.filter(v=>v.id!==x)),y},[m]),q=u.useCallback(async x=>await m(()=>ae(x),!1),[m]),U=u.useCallback(async x=>await m(()=>Be(x),!1),[m]),D=u.useCallback(async()=>{const x=await m(()=>Le(),!1);return x&&c(x),x},[m]),G=u.useCallback(async(x,y)=>await m(()=>me(x,y),!1),[m]),we=u.useCallback(async(x,y)=>await m(()=>ze(x,y),!1),[m]),je=u.useCallback(async x=>await m(()=>qe(x),!1),[m]),Ne=u.useCallback(async x=>await m(()=>ue(x),!1),[m]),ve=u.useCallback(()=>{o(null)},[]);return u.useEffect(()=>{(async()=>{await Promise.all([p(20,!0),D()])})()},[]),{loading:e,error:r,allowances:n,summary:s,hasMore:b,addAllowance:C,updateAllowance:F,deleteAllowance:z,getById:U,getByWeek:q,fetchAllowances:p,refreshAllowances:g,loadMoreAllowances:d,getSummary:D,fetchWelfareRecords:G,getRecordsByRange:we,generateWeeklyReport:je,checkWeekExists:Ne,clearError:ve}},_e=({summary:e,allowances:a,loading:r,showCalculator:o,setShowCalculator:n,generatePdfReport:l})=>t.jsxs("div",{className:"space-y-4",children:[t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Overview"}),t.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[t.jsxs("div",{className:"bg-blue-50 p-4 rounded-xl text-center border border-blue-100",children:[t.jsx("div",{className:"text-2xl font-bold text-blue-600",children:e?.totalRecords||0}),t.jsx("div",{className:"text-sm text-blue-600 font-medium",children:"Total Records"})]}),t.jsxs("div",{className:"bg-green-50 p-4 rounded-xl text-center border border-green-100",children:[t.jsxs("div",{className:"text-2xl font-bold text-green-600",children:["GHS ",(e?.totalAmount||0).toFixed(2)]}),t.jsx("div",{className:"text-sm text-green-600 font-medium",children:"Total Amount"})]})]})]}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[t.jsxs("div",{className:"flex items-center justify-between mb-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Quick Actions"}),t.jsx("button",{onClick:()=>n(!o),className:`p-2 rounded-lg transition-colors ${o?"bg-red-100 text-red-600 hover:bg-red-200":"bg-blue-100 text-blue-600 hover:bg-blue-200"}`,children:o?t.jsx(Se,{size:20}):t.jsx(le,{size:20})})]}),t.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-4",children:[t.jsxs("button",{onClick:()=>n(!0),className:"bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[t.jsx(M,{size:18}),t.jsx("span",{className:"text-sm font-medium",children:"New Calculation"})]}),t.jsxs("button",{onClick:l,className:"bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[t.jsx(J,{size:18}),t.jsx("span",{className:"text-sm font-medium",children:"Export"})]})]})]}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Calculations"}),r?t.jsxs("div",{className:"text-gray-500 text-center py-8",children:[t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),t.jsx("p",{className:"mt-2",children:"Loading..."})]}):t.jsxs("div",{className:"space-y-3",children:[a.slice(0,5).map(s=>t.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[t.jsx("div",{className:"flex items-start justify-between mb-2",children:t.jsxs("div",{className:"flex-1",children:[t.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",s.weekNumber]}),t.jsx("p",{className:"text-sm text-gray-600",children:new Date(s.createdAt?.toDate?.()||s.createdAt).toLocaleDateString()})]})}),t.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-500",children:"Total"}),t.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",s.totalSum?.toFixed(2)]})]}),t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),t.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",s.eachTeacher?.toFixed(2)]})]})]})]},s.id)),a.length===0&&t.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[t.jsx(M,{size:32,className:"mx-auto mb-2 text-gray-400"}),t.jsx("p",{children:"No calculations found"})]})]})]})]});let Ke={data:""},Ze=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Ke,Ve=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Qe=/\/\*[^]*?\*\/|  +/g,oe=/\n+/g,$=(e,a)=>{let r="",o="",n="";for(let l in e){let s=e[l];l[0]=="@"?l[1]=="i"?r=l+" "+s+";":o+=l[1]=="f"?$(s,l):l+"{"+$(s,l[1]=="k"?"":a)+"}":typeof s=="object"?o+=$(s,a?a.replace(/([^,])+/g,c=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,i=>/&/.test(i)?i.replace(/&/g,c):c?c+" "+i:i)):l):s!=null&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=$.p?$.p(l,s):l+":"+s+";")}return r+(a&&n?a+"{"+n+"}":n)+o},S={},he=e=>{if(typeof e=="object"){let a="";for(let r in e)a+=r+he(e[r]);return a}return e},Xe=(e,a,r,o,n)=>{let l=he(e),s=S[l]||(S[l]=(i=>{let h=0,b=11;for(;h<i.length;)b=101*b+i.charCodeAt(h++)>>>0;return"go"+b})(l));if(!S[s]){let i=l!==e?e:(h=>{let b,f,m=[{}];for(;b=Ve.exec(h.replace(Qe,""));)b[4]?m.shift():b[3]?(f=b[3].replace(oe," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][b[1]]=b[2].replace(oe," ").trim();return m[0]})(e);S[s]=$(n?{["@keyframes "+s]:i}:i,r?"":"."+s)}let c=r&&S.g?S.g:null;return r&&(S.g=S[s]),((i,h,b,f)=>{f?h.data=h.data.replace(f,i):h.data.indexOf(i)===-1&&(h.data=b?i+h.data:h.data+i)})(S[s],a,o,c),s},Ye=(e,a,r)=>e.reduce((o,n,l)=>{let s=a[l];if(s&&s.call){let c=s(r),i=c&&c.props&&c.props.className||/^go/.test(c)&&c;s=i?"."+i:c&&typeof c=="object"?c.props?"":$(c,""):c===!1?"":c}return o+n+(s??"")},"");function I(e){let a=this||{},r=e.call?e(a.p):e;return Xe(r.unshift?r.raw?Ye(r,[].slice.call(arguments,1),a.p):r.reduce((o,n)=>Object.assign(o,n&&n.call?n(a.p):n),{}):r,Ze(a.target),a.g,a.o,a.k)}let xe,Z,V;I.bind({g:1});let A=I.bind({k:1});function et(e,a,r,o){$.p=a,xe=e,Z=r,V=o}function T(e,a){let r=this||{};return function(){let o=arguments;function n(l,s){let c=Object.assign({},l),i=c.className||n.className;r.p=Object.assign({theme:Z&&Z()},c),r.o=/ *go\d+/.test(i),c.className=I.apply(r,o)+(i?" "+i:"");let h=e;return e[0]&&(h=c.as||e,delete c.as),V&&h[0]&&V(c),xe(h,c)}return n}}var tt=e=>typeof e=="function",Q=(e,a)=>tt(e)?e(a):e,at=(()=>{let e=0;return()=>(++e).toString()})(),rt=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let a=matchMedia("(prefers-reduced-motion: reduce)");e=!a||a.matches}return e}})(),st=20,be="default",pe=(e,a)=>{let{toastLimit:r}=e.settings;switch(a.type){case 0:return{...e,toasts:[a.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===a.toast.id?{...s,...a.toast}:s)};case 2:let{toast:o}=a;return pe(e,{type:e.toasts.find(s=>s.id===o.id)?1:0,toast:o});case 3:let{toastId:n}=a;return{...e,toasts:e.toasts.map(s=>s.id===n||n===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return a.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==a.toastId)};case 5:return{...e,pausedAt:a.time};case 6:let l=a.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+l}))}}},ot=[],lt={toasts:[],pausedAt:void 0,settings:{toastLimit:st}},R={},ge=(e,a=be)=>{R[a]=pe(R[a]||lt,e),ot.forEach(([r,o])=>{r===a&&o(R[a])})},fe=e=>Object.keys(R).forEach(a=>ge(e,a)),nt=e=>Object.keys(R).find(a=>R[a].toasts.some(r=>r.id===e)),re=(e=be)=>a=>{ge(a,e)},ct=(e,a="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:a,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||at()}),L=e=>(a,r)=>{let o=ct(a,e,r);return re(o.toasterId||nt(o.id))({type:2,toast:o}),o.id},w=(e,a)=>L("blank")(e,a);w.error=L("error");w.success=L("success");w.loading=L("loading");w.custom=L("custom");w.dismiss=(e,a)=>{let r={type:3,toastId:e};a?re(a)(r):fe(r)};w.dismissAll=e=>w.dismiss(void 0,e);w.remove=(e,a)=>{let r={type:4,toastId:e};a?re(a)(r):fe(r)};w.removeAll=e=>w.remove(void 0,e);w.promise=(e,a,r)=>{let o=w.loading(a.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let l=a.success?Q(a.success,n):void 0;return l?w.success(l,{id:o,...r,...r?.success}):w.dismiss(o),n}).catch(n=>{let l=a.error?Q(a.error,n):void 0;l?w.error(l,{id:o,...r,...r?.error}):w.dismiss(o)}),e};var it=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,dt=A`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ut=A`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,mt=T("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${it} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${dt} 0.15s ease-out forwards;
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
    animation: ${ut} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ht=A`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,xt=T("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ht} 1s linear infinite;
`,bt=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,pt=A`
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
}`,gt=T("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${bt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${pt} 0.2s ease-out forwards;
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
`,ft=T("div")`
  position: absolute;
`,yt=T("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,wt=A`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,jt=T("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${wt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Nt=({toast:e})=>{let{icon:a,type:r,iconTheme:o}=e;return a!==void 0?typeof a=="string"?u.createElement(jt,null,a):a:r==="blank"?null:u.createElement(yt,null,u.createElement(xt,{...o}),r!=="loading"&&u.createElement(ft,null,r==="error"?u.createElement(mt,{...o}):u.createElement(gt,{...o})))},vt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,St=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,kt="0%{opacity:0;} 100%{opacity:1;}",At="0%{opacity:1;} 100%{opacity:0;}",$t=T("div")`
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
`,Tt=T("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ht=(e,a)=>{let r=e.includes("top")?1:-1,[o,n]=rt()?[kt,At]:[vt(r),St(r)];return{animation:a?`${A(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${A(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};u.memo(({toast:e,position:a,style:r,children:o})=>{let n=e.height?Ht(e.position||a||"top-center",e.visible):{opacity:0},l=u.createElement(Nt,{toast:e}),s=u.createElement(Tt,{...e.ariaProps},Q(e.message,e));return u.createElement($t,{className:e.className,style:{...n,...r,...e.style}},typeof o=="function"?o({icon:l,message:s}):u.createElement(u.Fragment,null,l,s))});et(u.createElement);I`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var j=w;const Ct=({addAllowance:e,checkWeekExists:a})=>{const[r,o]=u.useState({weekNumber:"",numberOfTeachers:"",numberOfJHSTeachers:"",welfareAmount:"",classAmounts:{creche:"",nursery1:"",nursery2:"",kg1:"",kg2:"",basic1:"",basic2:"",basic3:"",basic4:"",basic5:"",basic6:"",basic7General:"",basic7JHS:"",basic8General:"",basic8JHS:"",basic9General:"",basic9JHS:""}}),[n,l]=u.useState(null),s=()=>{const i=Object.fromEntries(Object.entries(r.classAmounts).map(([D,G])=>[D,parseFloat(G)||0])),h=parseInt(r.numberOfTeachers)||0,b=parseInt(r.numberOfJHSTeachers)||0,f=parseFloat(r.welfareAmount)||0;if(!r.weekNumber||h===0){j.error("Week number and number of teachers are required");return}const m=Object.values(i).reduce((D,G)=>D+G,0),p=m-f,d=p*.05,g=p-d,C=g*.05,F=g-C,z=i.basic7JHS+i.basic8JHS+i.basic9JHS,q=h>0?F/h:0,U=b>0?z/b:0;l({weekNumber:parseInt(r.weekNumber),totalSum:m,welfare:f,balanceAfterWelfare:p,office:d,balanceAfterOffice:g,kitchen:C,balanceAfterKitchen:F,eachTeacher:q,jhsClasses:z,eachJHSTeacher:U,amounts:i,numberOfTeachers:h,numberOfJHSTeachers:b})},c=async()=>{if(n)try{if(await a(n.weekNumber)){j.error("Calculation for this week already exists");return}const h={...n,createdAt:new Date};await e(h),j.success("Calculation saved successfully"),o({weekNumber:"",numberOfTeachers:"",numberOfJHSTeachers:"",welfareAmount:"",classAmounts:{creche:"",nursery1:"",nursery2:"",kg1:"",kg2:"",basic1:"",basic2:"",basic3:"",basic4:"",basic5:"",basic6:"",basic7General:"",basic7JHS:"",basic8General:"",basic8JHS:"",basic9General:"",basic9JHS:""}}),l(null)}catch{j.error("Failed to save calculation")}};return t.jsx("div",{className:"space-y-4",children:t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"New Calculation"}),t.jsxs("div",{className:"space-y-4",children:[t.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[t.jsx("input",{type:"number",placeholder:"Week Number (1-16)",value:r.weekNumber,onChange:i=>o({...r,weekNumber:i.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),t.jsx("input",{type:"number",placeholder:"Number of Teachers",value:r.numberOfTeachers,onChange:i=>o({...r,numberOfTeachers:i.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),t.jsx("input",{type:"number",placeholder:"Number of JHS Teachers",value:r.numberOfJHSTeachers,onChange:i=>o({...r,numberOfJHSTeachers:i.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}),t.jsx("input",{type:"number",placeholder:"Welfare Amount",value:r.welfareAmount,onChange:i=>o({...r,welfareAmount:i.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]}),t.jsx("h3",{className:"text-md font-medium text-gray-800",children:"Class Amounts (GHS)"}),t.jsx("div",{className:"grid grid-cols-2 gap-3",children:Object.keys(r.classAmounts).map(i=>t.jsx("input",{type:"number",placeholder:i.replace(/([A-Z])/g," $1").replace(/^./,h=>h.toUpperCase()),value:r.classAmounts[i],onChange:h=>o({...r,classAmounts:{...r.classAmounts,[i]:h.target.value}}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"},i))}),t.jsxs("button",{onClick:s,className:"w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[t.jsx(M,{size:20}),t.jsx("span",{children:"Calculate"})]})]}),n&&t.jsxs("div",{className:"mt-6 p-4 bg-green-50 rounded-lg border border-green-200",children:[t.jsxs("h3",{className:"text-lg font-semibold text-green-900 mb-4",children:["Week ",n.weekNumber," Results"]}),t.jsxs("div",{className:"space-y-2 text-sm",children:[t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Total Sum:"}),t.jsxs("span",{className:"font-medium",children:["GHS ",n.totalSum.toFixed(2)]})]}),t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Welfare:"}),t.jsxs("span",{className:"font-medium",children:["GHS ",n.welfare.toFixed(2)]})]}),t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Office (5%):"}),t.jsxs("span",{className:"font-medium",children:["GHS ",n.office.toFixed(2)]})]}),t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Kitchen (5%):"}),t.jsxs("span",{className:"font-medium",children:["GHS ",n.kitchen.toFixed(2)]})]}),t.jsxs("div",{className:"flex justify-between border-t pt-2",children:[t.jsx("span",{className:"font-medium",children:"Each Teacher:"}),t.jsxs("span",{className:"font-bold text-green-600",children:["GHS ",n.eachTeacher.toFixed(2)]})]}),t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{className:"font-medium",children:"Each JHS Teacher:"}),t.jsxs("span",{className:"font-bold text-blue-600",children:["GHS ",n.eachJHSTeacher.toFixed(2)]})]})]}),t.jsxs("button",{onClick:c,className:"w-full mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[t.jsx(le,{size:20}),t.jsx("span",{children:"Save Calculation"})]})]})]})})},Ft=({allowances:e,loading:a})=>{const[r,o]=u.useState(""),n=u.useMemo(()=>{if(!r)return e;const l=r.toLowerCase();return e.filter(s=>s.weekNumber.toString().includes(l)||s.totalSum.toString().includes(l))},[e,r]);return t.jsx("div",{className:"space-y-4",children:t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[t.jsxs("div",{className:"flex items-center justify-between mb-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Calculation History"}),t.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 ml-4 max-w-xs",children:[t.jsx(ke,{size:16,className:"text-gray-500 mr-2"}),t.jsx("input",{placeholder:"Search by week...",value:r,onChange:l=>o(l.target.value),className:"bg-transparent border-none outline-none w-full text-sm text-gray-900 placeholder-gray-500"})]})]}),a?t.jsxs("div",{className:"text-gray-500 text-center py-8",children:[t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),t.jsx("p",{className:"mt-2",children:"Loading..."})]}):t.jsxs("div",{className:"space-y-3",children:[n.map(l=>t.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[t.jsx("div",{className:"flex items-start justify-between mb-2",children:t.jsxs("div",{className:"flex-1",children:[t.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",l.weekNumber]}),t.jsx("p",{className:"text-sm text-gray-600",children:new Date(l.createdAt?.toDate?.()||l.createdAt).toLocaleDateString()})]})}),t.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-500",children:"Total"}),t.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",l.totalSum?.toFixed(2)]})]}),t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),t.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",l.eachTeacher?.toFixed(2)]})]}),t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-500",children:"Each JHS"}),t.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",l.eachJHSTeacher?.toFixed(2)]})]})]})]},l.id)),n.length===0&&t.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[t.jsx(Ge,{size:32,className:"mx-auto mb-2 text-gray-400"}),t.jsx("p",{children:"No calculations found"})]})]})]})})},ye=async e=>{e(!0);try{const{records:a}=await te(),{records:r}=await me();let o=`
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
            <p>Total Calculations: ${a.length}</p>
            <p>Total Amount: GHS ${a.reduce((c,i)=>c+(i.totalSum||0),0).toFixed(2)}</p>
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
              ${a.slice(0,5).map(c=>`
                <tr>
                  <td>${c.weekNumber}</td>
                  <td>${c.createdAt?new Date(c.createdAt.toDate?c.createdAt.toDate():c.createdAt).toLocaleDateString():"N/A"}</td>
                  <td>GHS ${(c.totalSum||0).toFixed(2)}</td>
                  <td>GHS ${(c.eachTeacher||0).toFixed(2)}</td>
                  <td>GHS ${(c.eachJHSTeacher||0).toFixed(2)}</td>
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
              ${r.slice(0,5).map(c=>`
                <tr>
                  <td>${c.weekNumber}</td>
                  <td>GHS ${(c.welfare||0).toFixed(2)}</td>
                  <td>${c.datePaid||"N/A"}</td>
                </tr>
              `).join("")}
              <tr class="total-row">
                <td colspan="2">Total Welfare Payments</td>
                <td>GHS ${r.reduce((c,i)=>c+(i.welfare||0),0).toFixed(2)}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;const n=new Blob([o],{type:"text/html"}),l=URL.createObjectURL(n),s=document.createElement("a");s.href=l,s.download=`allowance-report-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(l),j.success("Report downloaded successfully!")}catch(a){console.error("Error generating report:",a),j.error("Failed to generate report")}finally{e(!1)}},Dt=async(e,a)=>{if(!e){j.error("Please enter a week number");return}a(!0);try{const r=await ae(parseInt(e,10));if(!r){j.error("No data found for the specified week");return}const o=`
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
          <h2>Week ${r.weekNumber}</h2>

          <table>
            <tr>
              <th>Description</th>
              <th>Amount (GHS)</th>
            </tr>
            <tr>
              <td>Total Sum</td>
              <td>${(r.totalSum||0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Welfare</td>
              <td>${(r.welfare||0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Office (5%)</td>
              <td>${(r.office||0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Kitchen (5%)</td>
              <td>${(r.kitchen||0).toFixed(2)}</td>
            </tr>
            <tr class="total-row">
              <td>Balance After Deductions</td>
              <td>${(r.balanceAfterKitchen||0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Each Teacher (${r.numberOfTeachers||0})</td>
              <td>${(r.eachTeacher||0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Each JHS Teacher (${r.numberOfJHSTeachers||0})</td>
              <td>${(r.eachJHSTeacher||0).toFixed(2)}</td>
            </tr>
          </table>
        </body>
      </html>
    `,n=new Blob([o],{type:"text/html"}),l=URL.createObjectURL(n),s=document.createElement("a");s.href=l,s.download=`weekly-report-week-${e}-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(l),j.success("Weekly report downloaded successfully!")}catch(r){console.error("Error generating weekly report:",r),j.error("Failed to generate weekly report")}finally{a(!1)}},Rt=async(e,a,r)=>{if(!e||!a){j.error("Please select both start and end dates");return}r(!0);try{const n=(await te()).records.filter(d=>{if(!d.createdAt)return!1;const g=d.createdAt.toDate?d.createdAt.toDate():new Date(d.createdAt),C=new Date(e),F=new Date(a);return g>=C&&g<=F});if(!n||n.length===0){j.error("No data found for the specified date range");return}const l=n.reduce((d,g)=>d+(g.totalSum||0),0),s=n.reduce((d,g)=>d+(g.welfare||0),0),c=n.reduce((d,g)=>d+(g.office||0),0),i=n.reduce((d,g)=>d+(g.kitchen||0),0),h=n.reduce((d,g)=>d+(g.balanceAfterKitchen||0),0),b=`
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
          <h2>${new Date(e).toLocaleDateString()} to ${new Date(a).toLocaleDateString()}</h2>

          <table>
            <tr>
              <th>Week</th>
              <th>Date</th>
              <th>Total Sum</th>
              <th>Each Teacher</th>
              <th>Each JHS Teacher</th>
            </tr>
            ${n.map(d=>`
              <tr>
                <td>${d.weekNumber}</td>
                <td>${d.createdAt?(d.createdAt.toDate?d.createdAt.toDate():new Date(d.createdAt)).toLocaleDateString():"N/A"}</td>
                <td>${(d.totalSum||0).toFixed(2)}</td>
                <td>${(d.eachTeacher||0).toFixed(2)}</td>
                <td>${(d.eachJHSTeacher||0).toFixed(2)}</td>
              </tr>
            `).join("")}
            <tr class="total-row">
              <td colspan="2">Totals</td>
              <td>${l.toFixed(2)}</td>
              <td colspan="2"></td>
            </tr>
          </table>
        </body>
      </html>
    `,f=new Blob([b],{type:"text/html"}),m=URL.createObjectURL(f),p=document.createElement("a");p.href=m,p.download=`date-range-report-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(m),j.success("Date range report downloaded successfully!")}catch(o){console.error("Error generating date range report:",o),j.error("Failed to generate date range report")}finally{r(!1)}},Et=async(e,a)=>{if(e){a(!0);try{const r=`
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
          <h2>Week ${e.weekNumber} - ${e.createdAt?(e.createdAt.toDate?e.createdAt.toDate():new Date(e.createdAt)).toLocaleDateString():"N/A"}</h2>

          <div class="section">
            <h3>Class Contributions</h3>
            <table>
              <tr>
                <th>Class</th>
                <th>Amount (GHS)</th>
              </tr>
              <tr><td>Creche</td><td>${(e.creche||0).toFixed(2)}</td></tr>
              <tr><td>Nursery 1</td><td>${(e.nursery1||0).toFixed(2)}</td></tr>
              <tr><td>Nursery 2</td><td>${(e.nursery2||0).toFixed(2)}</td></tr>
              <tr><td>KG 1</td><td>${(e.kg1||0).toFixed(2)}</td></tr>
              <tr><td>KG 2</td><td>${(e.kg2||0).toFixed(2)}</td></tr>
              <tr><td>Basic 1</td><td>${(e.basic1||0).toFixed(2)}</td></tr>
              <tr><td>Basic 2</td><td>${(e.basic2||0).toFixed(2)}</td></tr>
              <tr><td>Basic 3</td><td>${(e.basic3||0).toFixed(2)}</td></tr>
              <tr><td>Basic 4</td><td>${(e.basic4||0).toFixed(2)}</td></tr>
              <tr><td>Basic 5</td><td>${(e.basic5||0).toFixed(2)}</td></tr>
              <tr><td>Basic 6</td><td>${(e.basic6||0).toFixed(2)}</td></tr>
              <tr><td>Basic 7 (General)</td><td>${(e.basic7General||0).toFixed(2)}</td></tr>
              <tr><td>Basic 7 (JHS)</td><td>${(e.basic7JHS||0).toFixed(2)}</td></tr>
              <tr><td>Basic 8 (General)</td><td>${(e.basic8General||0).toFixed(2)}</td></tr>
              <tr><td>Basic 8 (JHS)</td><td>${(e.basic8JHS||0).toFixed(2)}</td></tr>
              <tr><td>Basic 9 (General)</td><td>${(e.basic9General||0).toFixed(2)}</td></tr>
              <tr><td>Basic 9 (JHS)</td><td>${(e.basic9JHS||0).toFixed(2)}</td></tr>
              <tr class="total-row">
                <td>Total Sum</td>
                <td>${(e.totalSum||0).toFixed(2)}</td>
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
                <td>${(e.welfare||0).toFixed(2)}</td>
                <td>${(e.balanceAfterWelfare||0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Office (5%)</td>
                <td>${(e.office||0).toFixed(2)}</td>
                <td>${(e.balanceAfterOffice||0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Kitchen (5%)</td>
                <td>${(e.kitchen||0).toFixed(2)}</td>
                <td>${(e.balanceAfterKitchen||0).toFixed(2)}</td>
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
                <td>Regular Teachers (${e.numberOfTeachers||0})</td>
                <td>${(e.eachTeacher||0).toFixed(2)} each</td>
              </tr>
              <tr>
                <td>JHS Teachers (${e.numberOfJHSTeachers||0})</td>
                <td>${(e.eachJHSTeacher||0).toFixed(2)} each</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `,o=new Blob([r],{type:"text/html"}),n=URL.createObjectURL(o),l=document.createElement("a");l.href=n,l.download=`detail-report-week-${e.weekNumber}-${new Date().toISOString().split("T")[0]}.html`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(n),j.success("Detailed report downloaded successfully!")}catch(r){console.error("Error generating detailed report:",r),j.error("Failed to generate detailed report")}finally{a(!1)}}},Gt=({allowances:e,loading:a})=>{const[r,o]=u.useState(!1),[n,l]=u.useState(""),[s,c]=u.useState(""),[i,h]=u.useState(""),b=()=>{ye(o)},f=()=>{Dt(n,o)},m=()=>{Rt(s,i,o)},p=d=>{Et(d,o)};return t.jsxs("div",{className:"space-y-4",children:[t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Reports"}),t.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[t.jsx("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200",children:t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx(se,{size:24,className:"text-blue-500"}),t.jsxs("div",{children:[t.jsx("p",{className:"text-blue-700 font-medium",children:"Full Report"}),t.jsx("p",{className:"text-blue-600 text-sm",children:"All calculations and welfare payments"})]})]}),t.jsx("button",{onClick:b,disabled:r,className:"bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors",children:r?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),t.jsx("span",{children:"Generating..."})]}):t.jsxs(t.Fragment,{children:[t.jsx(J,{size:16}),t.jsx("span",{children:"Generate"})]})})]})}),t.jsxs("div",{className:"bg-white border border-gray-200 p-4 rounded-xl",children:[t.jsx("div",{className:"flex items-center justify-between mb-3",children:t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx(ne,{size:24,className:"text-green-500"}),t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-900 font-medium",children:"Weekly Report"}),t.jsx("p",{className:"text-gray-600 text-sm",children:"Generate report for specific week"})]})]})}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("input",{type:"number",placeholder:"Week number (1-52)",value:n,onChange:d=>l(d.target.value),className:"flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"}),t.jsxs("button",{onClick:f,disabled:r||!n,className:"bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors",children:[t.jsx(J,{size:16}),t.jsx("span",{children:"Generate"})]})]})]}),t.jsxs("div",{className:"bg-white border border-gray-200 p-4 rounded-xl",children:[t.jsx("div",{className:"flex items-center justify-between mb-3",children:t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx(Ae,{size:24,className:"text-purple-500"}),t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-900 font-medium",children:"Date Range Report"}),t.jsx("p",{className:"text-gray-600 text-sm",children:"Generate report for date range"})]})]})}),t.jsxs("div",{className:"grid grid-cols-2 gap-2 mb-3",children:[t.jsxs("div",{children:[t.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:"Start Date"}),t.jsx("input",{type:"date",value:s,onChange:d=>c(d.target.value),className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"})]}),t.jsxs("div",{children:[t.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:"End Date"}),t.jsx("input",{type:"date",value:i,onChange:d=>h(d.target.value),className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"})]})]}),t.jsxs("button",{onClick:m,disabled:r||!s||!i,className:"w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[t.jsx(J,{size:16}),t.jsx("span",{children:"Generate Date Range Report"})]})]})]})]}),t.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[t.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Recent Calculations"}),a?t.jsxs("div",{className:"text-gray-500 text-center py-8",children:[t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),t.jsx("p",{className:"mt-2",children:"Loading..."})]}):t.jsxs("div",{className:"space-y-3",children:[e.slice(0,10).map(d=>t.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[t.jsxs("div",{className:"flex items-start justify-between mb-2",children:[t.jsxs("div",{className:"flex-1",children:[t.jsxs("h3",{className:"font-semibold text-gray-900",children:["Week ",d.weekNumber]}),t.jsx("p",{className:"text-sm text-gray-600",children:new Date(d.createdAt?.toDate?.()||d.createdAt).toLocaleDateString()})]}),t.jsxs("button",{onClick:()=>p(d),disabled:r,className:"bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1 rounded-lg flex items-center gap-1 font-medium transition-colors text-sm",children:[t.jsx(J,{size:14}),t.jsx("span",{children:"Detail PDF"})]})]}),t.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-500",children:"Total"}),t.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",d.totalSum?.toFixed(2)]})]}),t.jsxs("div",{children:[t.jsx("p",{className:"text-gray-500",children:"Each Teacher"}),t.jsxs("p",{className:"font-medium text-gray-900",children:["GHS ",d.eachTeacher?.toFixed(2)]})]})]})]},d.id)),e.length===0&&t.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[t.jsx(se,{size:32,className:"mx-auto mb-2 text-gray-400"}),t.jsx("p",{children:"No calculations found"})]})]})]})]})},zt=()=>{const{allowances:e,loading:a,summary:r,addAllowance:o,checkWeekExists:n}=Ue(),[l,s]=u.useState("dashboard"),[c,i]=u.useState(!1);return t.jsxs("div",{className:"min-h-screen bg-gray-50",children:[t.jsx("div",{className:"bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",children:t.jsxs("div",{className:"px-4 py-3",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h1",{className:"text-xl font-bold text-gray-900",children:"Allowance Calculator"}),t.jsx("div",{className:"flex items-center gap-2",children:t.jsx("button",{onClick:()=>s(l==="dashboard"?"calculator":"dashboard"),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:l==="dashboard"?t.jsx(M,{size:20}):t.jsx(ne,{size:20})})})]}),t.jsxs("div",{className:"flex mt-3 bg-gray-100 rounded-lg p-1",children:[t.jsx("button",{onClick:()=>s("dashboard"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${l==="dashboard"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Dashboard"}),t.jsx("button",{onClick:()=>s("calculator"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${l==="calculator"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Calculator"}),t.jsx("button",{onClick:()=>s("history"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${l==="history"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"History"}),t.jsx("button",{onClick:()=>s("reports"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${l==="reports"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Reports"})]})]})}),t.jsxs("div",{className:"p-4 pb-20",children:[l==="dashboard"&&t.jsx(_e,{summary:r,allowances:e,loading:a,showCalculator:c,setShowCalculator:i,generatePdfReport:()=>ye(()=>{})}),l==="calculator"&&t.jsx(Ct,{addAllowance:o,checkWeekExists:n}),l==="history"&&t.jsx(Ft,{allowances:e,loading:a}),l==="reports"&&t.jsx(Gt,{allowances:e,loading:a})]})]})};export{zt as default};
