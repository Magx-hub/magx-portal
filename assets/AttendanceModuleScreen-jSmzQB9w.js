import{c as M,j as e,C as I,X as K,U as X,b as ee}from"./index-BGbKneYG.js";import{r as x}from"./router-DwwGQyGz.js";import{g as te,a as se,u as ae}from"./useTeachers-DoqW8Eo8.js";import{q as C,o as z,w as k,c as ne,g as A,a as re,s as R,d as oe,u as le}from"./firebase-Bm0Jh8Cr.js";import{d as Y}from"./config-CjFVmyQa.js";import{S as de,P as W}from"./search-DRrMH3o1.js";import{D as ce}from"./download-BMVhNgju.js";import{T as P}from"./trending-up-D44hWSYW.js";import"./vendor-c5ypKtDW.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],ue=M("chart-pie",ie);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],xe=M("chevron-down",me);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],ge=M("clock",he),G=(t,s)=>{if(!t||!s)return 0;try{const[a,r]=t.split(":").map(Number),[n,l]=s.split(":").map(Number),m=a*60+r,d=n*60+l,c=d>=m?d-m:1440-m+d;return Math.round(c/60*100)/100}catch{return 0}},Q=(t,s="08:00")=>{if(!t)return"Absent";try{const[a,r]=t.split(":").map(Number),[n,l]=s.split(":").map(Number),m=a*60+r,d=n*60+l;return m<=d?"Present":m<=d+30?"Late":"Very Late"}catch{return"Unknown"}},Z=(t,s="2024-09-01")=>{try{const a=new Date(t),r=new Date(s),n=a.getTime()-r.getTime(),l=Math.ceil(n/(1e3*60*60*24)),m=Math.ceil(l/7);return Math.max(1,Math.min(16,m))}catch{return 1}},T=(t,s="text")=>{if(typeof t!="string")return"";let a=t.trim();switch(s){case"name":a=a.replace(/[^a-zA-Z\s'-]/g,"");break;case"time":if(!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a))return"";break;case"date":if(!/^\d{4}-\d{2}-\d{2}$/.test(a))return"";break;default:a=a.replace(/[<>"']/g,"")}return a},J="attendance",S=ne(Y,J),O=async({teacherId:t,date:s,checkInTime:a,checkOutTime:r,status:n,remarks:l,weekNum:m})=>{const d=T(String(t||""),"text"),c=T(s||"","date"),o=T(a||"","time"),g=T(r||"","time"),v=n||Q(o),b=m||Z(c),f=G(o,g),y=await te(d),j={teacherId:d,fullname:y.fullname,department:y.department,date:c,weekNum:b,checkInTime:o||null,checkOutTime:g||null,workHours:Number.isFinite(f)?f:0,status:v,remarks:(l||"").trim(),createdAt:R(),updatedAt:R()};return(await re(S,j)).id},q=async(t,s)=>{const a={...s.checkInTime!==void 0?{checkInTime:T(s.checkInTime||"","time")||null}:{},...s.checkOutTime!==void 0?{checkOutTime:T(s.checkOutTime||"","time")||null}:{},...s.status!==void 0?{status:s.status}:{},...s.remarks!==void 0?{remarks:(s.remarks||"").trim()}:{},...s.weekNum!==void 0?{weekNum:s.weekNum}:{}};if(a.checkInTime!==void 0||a.checkOutTime!==void 0){const n=G(a.checkInTime,a.checkOutTime);a.workHours=Number.isFinite(n)?n:0,!a.status&&a.checkInTime&&(a.status=Q(a.checkInTime))}a.updatedAt=R();const r=oe(Y,J,t);return await le(r,a),!0},U=async t=>{const s=T(t||"","date"),a=C(S,k("date","==",s),z("fullname","asc"));return(await A(a)).docs.map(n=>L({id:n.id,...n.data()}))},E=async(t,s,a)=>{const r=C(S,k("teacherId","==",t),k("date",">=",s),k("date","<=",a),z("date","desc"));return(await A(r)).docs.map(l=>L({id:l.id,...l.data()}))},B=async(t,s,a={})=>{let r=C(S,k("date",">=",t),k("date","<=",s),z("date","desc"));return a.teacherId&&(r=C(r,k("teacherId","==",a.teacherId))),(await A(r)).docs.map(l=>L({id:l.id,...l.data()}))},_=t=>{const s={totalRecords:t.length,presentCount:0,absentCount:0,lateCount:0,halfDayCount:0,avgWorkHours:0};let a=0;return t.forEach(r=>{r.status==="Present"&&(s.presentCount+=1),r.status==="Absent"&&(s.absentCount+=1),(r.status==="Late"||r.status==="Very Late")&&(s.lateCount+=1),r.status==="Half Day"&&(s.halfDayCount+=1),a+=r.workHours||0}),s.avgWorkHours=t.length>0?Number((a/t.length).toFixed(2)):0,s},V=t=>{const s=new Map;for(const a of t){const r=a.teacherId||"unknown";s.has(r)||s.set(r,{fullname:a.fullname||"Unknown",department:a.department||"Unknown",daysTracked:0,presentDays:0,totalWorkHours:0,avgWorkHours:0});const n=s.get(r);n.daysTracked+=1,a.status==="Present"&&(n.presentDays+=1),n.totalWorkHours+=a.workHours||0}return s.forEach(a=>{a.avgWorkHours=a.daysTracked>0?Number((a.totalWorkHours/a.daysTracked).toFixed(2)):0}),Array.from(s.values()).sort((a,r)=>a.fullname.localeCompare(r.fullname))},pe=async(t,s,a)=>{const r=new Date(a,s-1,1),n=new Date(a,s,0),l=C(S,k("teacherId","==",t),k("date",">=",r.toISOString().slice(0,10)),k("date","<=",n.toISOString().slice(0,10))),d=(await A(l)).docs.map(i=>i.data()),c=d.length,o=d.filter(i=>i.status==="Present").length,g=d.filter(i=>i.status==="Absent").length,v=d.filter(i=>i.status==="Late"||i.status==="Very Late").length,b=d.filter(i=>i.status==="Half Day").length,f=d.reduce((i,u)=>i+(u.workHours||0),0),y=c>0?f/c:0,j=c>0?Math.round(o/c*100):0;return{totalDays:c,presentDays:o,absentDays:g,lateDays:v,halfDays:b,avgWorkHours:y,totalWorkHours:f,attendanceRating:j,lateCount:v,absentCount:g,halfDayCount:b}},be=async(t=null,s=null)=>{try{const a=new Date,r=t||a.getMonth()+1,n=s||a.getFullYear(),l=await se();return!l||l.length===0?[]:(await Promise.all(l.map(async d=>{const c=await pe(d.id,r,n);return{id:d.id,fullname:d.fullname||d.name||"Unknown",department:d.department||"Unknown",...c}}))).filter(d=>d.totalDays>0)}catch(a){return console.error("Error getting all teachers attendance summary:",a),[]}},L=t=>({id:t.id,teacherId:t.teacherId,fullname:t.fullname,department:t.department,date:t.date,weekNum:t.weekNum,checkInTime:t.checkInTime||null,checkOutTime:t.checkOutTime||null,workHours:t.workHours||0,status:t.status,remarks:t.remarks||""}),fe=()=>{const[t,s]=x.useState([]),[a,r]=x.useState(!1),[n,l]=x.useState(null),[m,d]=x.useState({date:null,teacherId:null,startDate:null,endDate:null}),c=x.useCallback(async i=>{r(!0),l(null);try{const u=await U(i);s(u)}catch(u){l(u.message||"Failed to load attendance")}finally{r(!1)}},[]),o=x.useCallback(async(i,u,h)=>{r(!0),l(null);try{const N=await E(i,u,h);s(N)}catch(N){l(N.message||"Failed to load attendance")}finally{r(!1)}},[]),g=x.useCallback(async(i,u)=>{r(!0),l(null);try{const h=await B(i,u);s(h)}catch(h){l(h.message||"Failed to load attendance")}finally{r(!1)}},[]),v=x.useCallback(async i=>{r(!0),l(null);try{const u=await O(i);return i.date&&await c(i.date),u}catch(u){throw l(u.message||"Failed to save attendance"),u}finally{r(!1)}},[c]),b=x.useCallback(async(i,u)=>{r(!0),l(null);try{await q(i,u),m.date&&await c(m.date)}catch(h){throw l(h.message||"Failed to update attendance"),h}finally{r(!1)}},[m,c]),f=x.useMemo(()=>({daily:_(t),weekly:V(t)}),[t]),y=x.useCallback(i=>d(u=>({...u,...i})),[]),j=x.useCallback(i=>Z(i),[]);return{records:t,loading:a,error:n,filters:m,loadByDate:c,loadByTeacherRange:o,loadByDateRange:g,saveRecord:v,updateRecord:b,updateFilters:y,stats:f,getWeekNumber:j,submitAttendanceRecord:O,updateAttendanceRecordById:q,fetchAttendanceByDate:U,fetchAttendanceByTeacherRange:E,computeDailyStats:_,computeWeeklyStats:V,getAttendanceByDateRange:B}},ye=({activeView:t,setActiveView:s})=>e.jsxs("div",{className:"flex mt-3 bg-gray-100 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>s("records"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${t==="records"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Records"}),e.jsx("button",{onClick:()=>s("analytics"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${t==="analytics"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Analytics"})]}),ve=({date:t,setDate:s,search:a,setSearch:r,showFilters:n,setShowFilters:l})=>e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Filters"}),e.jsx("button",{onClick:()=>l(!n),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:e.jsx(xe,{size:20,className:`transform transition-transform ${n?"rotate-180":""}`})})]}),e.jsxs("div",{className:`space-y-3 ${n?"":"hidden"}`,children:[e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2",children:[e.jsx(I,{size:18,className:"text-gray-500 mr-2"}),e.jsx("input",{type:"date",value:t,onChange:m=>s(m.target.value),className:"bg-transparent border-none outline-none w-full text-gray-900"})]}),e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2",children:[e.jsx(de,{size:18,className:"text-gray-500 mr-2"}),e.jsx("input",{placeholder:"Search by name or department",value:a,onChange:m=>r(m.target.value),className:"bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-500"})]})]}),e.jsx("div",{className:`space-y-3 ${n?"hidden":""}`,children:e.jsx("div",{className:"grid grid-cols-1 gap-3",children:e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2",children:[e.jsx(I,{size:18,className:"text-gray-500 mr-2"}),e.jsx("input",{type:"date",value:t,onChange:m=>s(m.target.value),className:"bg-transparent border-none outline-none w-full text-gray-900"})]})})})]}),je=({showAddForm:t,setShowAddForm:s,handleExport:a})=>e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Quick Actions"}),e.jsx("button",{onClick:()=>s(!t),className:`p-2 rounded-lg transition-colors ${t?"bg-red-100 text-red-600 hover:bg-red-200":"bg-blue-100 text-blue-600 hover:bg-blue-200"}`,children:t?e.jsx(K,{size:20}):e.jsx(W,{size:20})})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-4",children:[e.jsxs("button",{onClick:()=>s(!0),className:"bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[e.jsx(W,{size:18}),e.jsx("span",{className:"text-sm font-medium",children:"Mark Attendance"})]}),e.jsxs("button",{onClick:a,className:"bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[e.jsx(ce,{size:18}),e.jsx("span",{className:"text-sm font-medium",children:"Export"})]})]})]}),ke=({form:t,setForm:s,teachers:a,handleAdd:r})=>e.jsxs("div",{className:"border-t border-gray-200 pt-4 mt-4 animate-in slide-in-from-top-2",children:[e.jsx("h3",{className:"text-md font-medium text-gray-800 mb-3",children:"Mark Attendance"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("input",{type:"number",value:t.weekNum||"",onChange:n=>s({...t,weekNum:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Week Number",min:1,max:53}),e.jsxs("select",{value:t.teacherId,onChange:n=>s({...t,teacherId:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",children:[e.jsx("option",{value:"",children:"Select teacher"}),a.map(n=>e.jsx("option",{value:n.id,children:n.fullname},n.id))]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsx("input",{type:"time",value:t.checkInTime,onChange:n=>s({...t,checkInTime:n.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Check-in"}),e.jsx("input",{type:"time",value:t.checkOutTime,onChange:n=>s({...t,checkOutTime:n.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Check-out"})]}),e.jsxs("select",{value:t.status,onChange:n=>s({...t,status:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",children:[e.jsx("option",{value:"present",children:"Present"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"late",children:"Late"}),e.jsx("option",{value:"half-day",children:"Half Day"})]}),e.jsx("input",{type:"text",value:t.remarks,onChange:n=>s({...t,remarks:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Remarks (optional)"}),e.jsxs("button",{onClick:r,className:"w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[e.jsx(W,{size:20}),e.jsx("span",{children:"Save Attendance"})]})]})]}),Ne=({filtered:t,loading:s,error:a,getStatusColor:r})=>e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("div",{className:"flex items-center justify-between mb-4",children:e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Today's Records"})}),s?e.jsxs("div",{className:"text-gray-500 text-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-2",children:"Loading..."})]}):a?e.jsx("div",{className:"text-red-500 text-center py-8 bg-red-50 rounded-lg",children:e.jsxs("p",{children:["Error: ",a]})}):e.jsxs("div",{className:"space-y-3",children:[t.map(n=>e.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-gray-900",children:n.fullname}),e.jsx("p",{className:"text-sm text-gray-600",children:n.department})]}),e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${r(n.status)}`,children:n.status||"Unknown"})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Check-in"}),e.jsx("p",{className:"font-medium text-gray-900",children:n.checkInTime||"-"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Check-out"}),e.jsx("p",{className:"font-medium text-gray-900",children:n.checkOutTime||"-"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Hours"}),e.jsxs("p",{className:"font-medium text-gray-900",children:[(n.workHours||0).toFixed(1),"h"]})]})]})]},n.id)),t.length===0&&e.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[e.jsx(X,{size:32,className:"mx-auto mb-2 text-gray-400"}),e.jsx("p",{children:"No records found"})]})]})]}),we=({summary:t})=>{const s=t.totalDays>0?(t.presentDays/t.totalDays*100).toFixed(1):"0.0",a=t.totalDays>0?(t.totalWorkHours/t.presentDays).toFixed(1):"0.0";return e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Teacher Summary"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded-xl text-center border border-blue-100",children:[e.jsxs("div",{className:"text-2xl font-bold text-blue-600",children:[s,"%"]}),e.jsx("div",{className:"text-sm text-blue-600 font-medium",children:"Attendance"})]}),e.jsxs("div",{className:"bg-green-50 p-4 rounded-xl text-center border border-green-100",children:[e.jsxs("div",{className:"text-2xl font-bold text-green-600",children:[a,"h"]}),e.jsx("div",{className:"text-sm text-green-600 font-medium",children:"Avg. Hours"})]}),e.jsxs("div",{className:"bg-red-50 p-4 rounded-xl text-center border border-red-100",children:[e.jsx("div",{className:"text-2xl font-bold text-red-600",children:t.absentCount}),e.jsx("div",{className:"text-sm text-red-600 font-medium",children:"Absent"})]}),e.jsxs("div",{className:"bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100",children:[e.jsx("div",{className:"text-2xl font-bold text-yellow-600",children:t.lateCount}),e.jsx("div",{className:"text-sm text-yellow-600 font-medium",children:"Late"})]})]})]})},Te=({summary:t})=>{const s=t.totalDays>0?(t.presentDays/t.totalDays*100).toFixed(1):"0.0";return t.totalDays>0&&(t.totalWorkHours/t.presentDays).toFixed(1),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-gray-900",children:t.fullname}),e.jsx("p",{className:"text-sm text-gray-600",children:t.department})]}),e.jsxs("span",{className:"px-2 py-1 rounded-full text-xs font-medium",children:[s,"%"]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Present"}),e.jsx("p",{className:"font-medium text-gray-900",children:t.presentDays})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Absent"}),e.jsx("p",{className:"font-medium text-gray-900",children:t.absentCount})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Late"}),e.jsx("p",{className:"font-medium text-gray-900",children:t.lateCount})]})]})]})},De=({stats:t,getWeekNumber:s,date:a})=>{const[r,n]=x.useState([]),[l,m]=x.useState(!1);return x.useEffect(()=>{(async()=>{m(!0);const c=await be();n(c),m(!1)})()},[]),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Today's Overview"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded-xl text-center border border-blue-100",children:[e.jsx("div",{className:"text-2xl font-bold text-blue-600",children:t.daily.totalRecords}),e.jsx("div",{className:"text-sm text-blue-600 font-medium",children:"Total"})]}),e.jsxs("div",{className:"bg-green-50 p-4 rounded-xl text-center border border-green-100",children:[e.jsx("div",{className:"text-2xl font-bold text-green-600",children:t.daily.presentCount}),e.jsx("div",{className:"text-sm text-green-600 font-medium",children:"Present"})]}),e.jsxs("div",{className:"bg-red-50 p-4 rounded-xl text-center border border-red-100",children:[e.jsx("div",{className:"text-2xl font-bold text-red-600",children:t.daily.absentCount}),e.jsx("div",{className:"text-sm text-red-600 font-medium",children:"Absent"})]}),e.jsxs("div",{className:"bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100",children:[e.jsx("div",{className:"text-2xl font-bold text-yellow-600",children:t.daily.lateCount}),e.jsx("div",{className:"text-sm text-yellow-600 font-medium",children:"Late"})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Performance Metrics"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(ge,{size:20,className:"text-purple-600"}),e.jsx("span",{className:"font-medium text-purple-900",children:"Average Hours"})]}),e.jsxs("span",{className:"text-xl font-bold text-purple-600",children:[t.daily.avgWorkHours.toFixed(1),"h"]})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(P,{size:20,className:"text-cyan-600"}),e.jsx("span",{className:"font-medium text-cyan-900",children:"Half Days"})]}),e.jsx("span",{className:"text-xl font-bold text-cyan-600",children:t.daily.halfDayCount})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(I,{size:20,className:"text-indigo-600"}),e.jsx("span",{className:"font-medium text-indigo-900",children:"Week Number"})]}),e.jsx("span",{className:"text-xl font-bold text-indigo-600",children:s(a)})]})]})]}),r.map(d=>e.jsx(we,{summary:d},d.id)),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"All Teachers Summary"}),l?e.jsxs("div",{className:"text-gray-500 text-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-2",children:"Loading..."})]}):e.jsx("div",{className:"space-y-3",children:r.map(d=>e.jsx(Te,{summary:d},d.id))})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Attendance Trends"}),e.jsx("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-100 h-48 rounded-xl flex items-center justify-center border border-blue-200",children:e.jsxs("div",{className:"text-center",children:[e.jsx(P,{size:32,className:"mx-auto mb-2 text-blue-500"}),e.jsx("p",{className:"text-blue-700 font-medium",children:"Line Chart Visualization"}),e.jsx("p",{className:"text-blue-600 text-sm",children:"Coming Soon"})]})})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Status Distribution"}),e.jsx("div",{className:"bg-gradient-to-br from-green-50 to-emerald-100 h-48 rounded-xl flex items-center justify-center border border-green-200",children:e.jsxs("div",{className:"text-center",children:[e.jsx(ue,{size:32,className:"mx-auto mb-2 text-green-500"}),e.jsx("p",{className:"text-green-700 font-medium",children:"Pie Chart Visualization"}),e.jsx("p",{className:"text-green-600 text-sm",children:"Coming Soon"})]})})]})]})},Ce=async(t,s={})=>{try{if(!t||t.length===0)return alert("No records to export"),!1;const a=()=>{switch(s.reportType){case"all":return"All Teachers Attendance Report";case"teacher":return"Individual Teacher Attendance Report";case"week":return"Weekly Attendance Report";default:return"Teacher Attendance Report"}},r=()=>{let o="";return s.startDate&&s.endDate&&s.startDate!=="N/A"?o+=`<p><strong>Date Range:</strong> ${s.startDate} to ${s.endDate}</p>`:s.date&&(o+=`<p><strong>Date:</strong> ${s.date}</p>`),s.teacherId&&t[0]?.fullname&&(o+=`<p><strong>Teacher:</strong> ${t[0].fullname}</p>`),s.weekNum&&(o+=`<p><strong>Week:</strong> ${s.weekNum}</p>`),o},n=()=>s.reportType==="week"?`
          <tr>
            <th>Teacher</th>
            <th>Department</th>
            <th>Days Tracked</th>
            <th>Present Days</th>
            <th>Total Work Hours</th>
            <th>Average Hours</th>
          </tr>
        `:`
        <tr>
          <th>Teacher</th>
          <th>Department</th>
          <th>Date</th>
          <th>Week</th>
          <th>Check-In</th>
          <th>Check-Out</th>
          <th>Work Hours</th>
          <th>Status</th>
        </tr>
      `,l=()=>s.reportType==="week"?t.map(o=>`
          <tr>
            <td>${o.fullname||"Unknown"}</td>
            <td>${o.department||"Unknown"}</td>
            <td>${o.daysTracked||0}</td>
            <td>${o.presentDays||0}</td>
            <td>${o.totalWorkHours?`${o.totalWorkHours.toFixed(1)} hrs`:"-"}</td>
            <td>${o.avgWorkHours?`${o.avgWorkHours.toFixed(1)} hrs`:"-"}</td>
          </tr>
        `).join(""):t.map(o=>`
        <tr>
          <td>${o.fullname||"Unknown"}</td>
          <td>${o.department||"Unknown"}</td>
          <td>${o.date||"-"}</td>
          <td>Week ${o.weekNum||"-"}</td>
          <td>${o.checkInTime||"-"}</td>
          <td>${o.checkOutTime||"-"}</td>
          <td>${o.workHours>0?`${o.workHours.toFixed(2)} hrs`:"-"}</td>
          <td><span class="status-${(o.status||"unknown").toLowerCase().replace(" ","-")}">${o.status||"Unknown"}</span></td>
        </tr>
      `).join(""),m=()=>{if(s.reportType==="week"){const u=t.length,h=t.reduce((w,p)=>w+(p.daysTracked||0),0),N=t.reduce((w,p)=>w+(p.presentDays||0),0),D=t.reduce((w,p)=>w+(p.totalWorkHours||0),0),$=h>0?D/h:0,H=h>0?Math.round(N/h*100):0;return`
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Weekly Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
              <div><strong>Total Teachers:</strong> ${u}</div>
              <div><strong>Total Days Tracked:</strong> ${h}</div>
              <div><strong>Total Present Days:</strong> ${N}</div>
              <div><strong>Total Work Hours:</strong> ${D.toFixed(1)} hrs</div>
              <div><strong>Average Work Hours:</strong> ${$.toFixed(1)} hrs</div>
              <div><strong>Attendance Rate:</strong> ${H}%</div>
            </div>
          </div>
        `}const o=t.length,g=t.filter(u=>(u.status||"").toLowerCase()==="present").length,v=t.filter(u=>(u.status||"").toLowerCase()==="absent").length,b=t.filter(u=>(u.status||"").toLowerCase().includes("late")).length,f=t.filter(u=>(u.status||"").toLowerCase().includes("half")).length,y=t.reduce((u,h)=>u+(h.workHours||0),0),j=o>0?y/o:0,i=o>0?Math.round(g/o*100):0;return`
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">Report Summary</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div><strong>Total Records:</strong> ${o}</div>
            <div><strong>Present:</strong> ${g}</div>
            <div><strong>Absent:</strong> ${v}</div>
            <div><strong>Late:</strong> ${b}</div>
            <div><strong>Half Day:</strong> ${f}</div>
            <div><strong>Total Work Hours:</strong> ${y.toFixed(1)} hrs</div>
            <div><strong>Average Work Hours:</strong> ${j.toFixed(1)} hrs</div>
            <div><strong>Attendance Rate:</strong> ${i}%</div>
          </div>
        </div>
      `},d=`
      <html>
        <head>
          <title>${a()}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              background-color: #f8f9fa; 
              margin: 0;
            }
            .container { 
              max-width: 1200px; 
              margin: 0 auto; 
              background-color: white; 
              padding: 30px; 
              border-radius: 12px; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
            }
            h1 { 
              color: #333; 
              text-align: center; 
              margin-bottom: 30px; 
              font-size: 28px; 
              border-bottom: 3px solid #007bff;
              padding-bottom: 10px;
            }
            h3 { color: #333; margin-bottom: 15px; }
            .header { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e9ecef; }
            .filter-info { margin-bottom: 20px; font-size: 14px; color: #555; }
            .filter-info p { margin: 8px 0; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px; 
              border-radius: 8px; 
              overflow: hidden; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
            }
            th, td { 
              border: 1px solid #dee2e6; 
              padding: 12px 8px; 
              text-align: left; 
              font-size: 12px;
            }
            th { 
              background-color: #007bff; 
              font-weight: 600; 
              color: white;
              text-align: center;
            }
            tr:nth-child(even) { background-color: #f8f9fa; }
            tr:hover { background-color: #e9ecef; }
            .summary-section { margin-top: 30px; }
            .footer { 
              margin-top: 40px; 
              text-align: right; 
              font-size: 12px; 
              color: #6c757d; 
              border-top: 1px solid #e9ecef; 
              padding-top: 20px; 
            }
            .status-present { color: #28a745; font-weight: bold; }
            .status-absent { color: #dc3545; font-weight: bold; }
            .status-late { color: #ffc107; font-weight: bold; }
            .status-half-day { color: #6f42c1; font-weight: bold; }
            .status-unknown { color: #6c757d; }
            @media print {
              body { background-color: white; }
              .container { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${a()}</h1>
              <div class="filter-info">
                ${r()}
              </div>
            </div>
            
            <table>
              <thead>
                ${n()}
              </thead>
              <tbody>
                ${l()}
              </tbody>
            </table>
            
            <div class="summary-section">
              ${m()}
            </div>
            
            <div class="footer">
              <p><strong>MagX Portal - Attendance Management System</strong></p>
              <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
              <p>Total Records: ${t.length}</p>
            </div>
          </div>
        </body>
      </html>
    `,c=window.open("","_blank","width=1200,height=800,scrollbars=yes,resizable=yes");return c?(c.document.open(),c.document.write(d),c.document.close(),c.onload=()=>{setTimeout(()=>{c.focus(),c.print()},500)},!0):(alert("Please allow popups to export PDF. Check your browser settings."),!1)}catch(a){return console.error("PDF generation error:",a),alert("Failed to generate PDF. Please try again."),!1}},Le=()=>{const{records:t,loading:s,error:a,loadByDate:r,saveRecord:n,stats:l,getWeekNumber:m}=fe(),{teachers:d}=ae(),[c,o]=x.useState(()=>new Date().toISOString().slice(0,10)),[g,v]=x.useState(""),[b,f]=x.useState({weekNum:"",teacherId:"",checkInTime:"",checkOutTime:"",status:"present",remarks:""}),[y,j]=x.useState(!1),[i,u]=x.useState(!1),[h,N]=x.useState("records");x.useEffect(()=>{r(c)},[c,r]);const D=x.useMemo(()=>{if(!g)return t;const p=g.toLowerCase();return t.filter(F=>(F.fullname||"").toLowerCase().includes(p)||(F.department||"").toLowerCase().includes(p))},[t,g]),$=async p=>{p.preventDefault(),b.teacherId&&(await n({...b,date:c}),f({teacherId:"",checkInTime:"",checkOutTime:"",status:"present",remarks:""}),j(!1))},H=async()=>{await Ce(D,{reportType:"all",startDate:c,endDate:c})},w=p=>{switch(p){case"present":return"text-green-600 bg-green-50";case"absent":return"text-red-600 bg-red-50";case"late":return"text-yellow-600 bg-yellow-50";case"half-day":return"text-purple-600 bg-purple-50";default:return"text-gray-600 bg-gray-50"}};return e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx("div",{className:"bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",children:e.jsxs("div",{className:"px-4 py-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-xl font-bold text-gray-900",children:"Attendance"}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("button",{onClick:()=>N(h==="records"?"analytics":"records"),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:h==="records"?e.jsx(ee,{size:20}):e.jsx(X,{size:20})})})]}),e.jsx(ye,{activeView:h,setActiveView:N})]})}),e.jsxs("div",{className:"p-4 pb-20",children:[h==="records"&&e.jsxs("div",{className:"space-y-4",children:[e.jsx(je,{showAddForm:y,setShowAddForm:j,handleExport:H}),y&&e.jsx(ke,{form:b,setForm:f,teachers:d,handleAdd:$}),e.jsx(ve,{date:c,setDate:o,search:g,setSearch:v,showFilters:i,setShowFilters:u}),e.jsx(Ne,{filtered:D,loading:s,error:a,getStatusColor:w})]}),h==="analytics"&&e.jsx(De,{stats:l,getWeekNumber:m,date:c})]})]})};export{Le as default};
