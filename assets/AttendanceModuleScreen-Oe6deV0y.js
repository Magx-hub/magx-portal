import{c as se,j as e,C as H,X as ae,u as ne,U as W,P as h,b as re}from"./index-DAJb82m-.js";import{r as x}from"./router-LlB4DS0p.js";import{g as oe,a as le,u as de}from"./useTeachers-C90sPOJu.js";import{q as S,o as L,w as k,c as ce,g as R,a as ie,s as q,d as ue,u as me}from"./firebase-DfpE75xJ.js";import{d as Y}from"./config-ULlCmQ0m.js";import{S as xe,P as z}from"./search-D5sIhCjv.js";import{D as he}from"./download-qrF6Fg_9.js";import{C as ge}from"./clock-P-n6Duyt.js";import{T as P}from"./trending-up-BZlzOUnJ.js";import{C as pe}from"./chart-pie-Jxwfu4hE.js";import"./vendor-c5ypKtDW.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],fe=se("chevron-down",be),G=(t,s)=>{if(!t||!s)return 0;try{const[a,r]=t.split(":").map(Number),[o,d]=s.split(":").map(Number),i=a*60+r,n=o*60+d,c=n>=i?n-i:1440-i+n;return Math.round(c/60*100)/100}catch{return 0}},Q=(t,s="08:00")=>{if(!t)return"Absent";try{const[a,r]=t.split(":").map(Number),[o,d]=s.split(":").map(Number),i=a*60+r,n=o*60+d;return i<=n?"Present":i<=n+30?"Late":"Very Late"}catch{return"Unknown"}},Z=(t,s="2024-09-01")=>{try{const a=new Date(t),r=new Date(s),o=a.getTime()-r.getTime(),d=Math.ceil(o/(1e3*60*60*24)),i=Math.ceil(d/7);return Math.max(1,Math.min(16,i))}catch{return 1}},C=(t,s="text")=>{if(typeof t!="string")return"";let a=t.trim();switch(s){case"name":a=a.replace(/[^a-zA-Z\s'-]/g,"");break;case"time":if(!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(a))return"";break;case"date":if(!/^\d{4}-\d{2}-\d{2}$/.test(a))return"";break;default:a=a.replace(/[<>"']/g,"")}return a},J="attendance",A=ce(Y,J),F=async({teacherId:t,date:s,checkInTime:a,checkOutTime:r,status:o,remarks:d,weekNum:i})=>{const n=C(String(t||""),"text"),c=C(s||"","date"),l=C(a||"","time"),p=C(r||"","time"),v=o||Q(l),b=i||Z(c),y=G(l,p),j=await oe(n),N={teacherId:n,fullname:j.fullname,department:j.department,date:c,weekNum:b,checkInTime:l||null,checkOutTime:p||null,workHours:Number.isFinite(y)?y:0,status:v,remarks:(d||"").trim(),createdAt:q(),updatedAt:q()};return(await ie(A,N)).id},E=async(t,s)=>{const a={...s.checkInTime!==void 0?{checkInTime:C(s.checkInTime||"","time")||null}:{},...s.checkOutTime!==void 0?{checkOutTime:C(s.checkOutTime||"","time")||null}:{},...s.status!==void 0?{status:s.status}:{},...s.remarks!==void 0?{remarks:(s.remarks||"").trim()}:{},...s.weekNum!==void 0?{weekNum:s.weekNum}:{}};if(a.checkInTime!==void 0||a.checkOutTime!==void 0){const o=G(a.checkInTime,a.checkOutTime);a.workHours=Number.isFinite(o)?o:0,!a.status&&a.checkInTime&&(a.status=Q(a.checkInTime))}a.updatedAt=q();const r=ue(Y,J,t);return await me(r,a),!0},U=async t=>{const s=C(t||"","date"),a=S(A,k("date","==",s),L("fullname","asc"));return(await R(a)).docs.map(o=>M({id:o.id,...o.data()}))},B=async(t,s,a)=>{const r=S(A,k("teacherId","==",t),k("date",">=",s),k("date","<=",a),L("date","desc"));return(await R(r)).docs.map(d=>M({id:d.id,...d.data()}))},V=async(t,s,a={})=>{let r=S(A,k("date",">=",t),k("date","<=",s),L("date","desc"));return a.teacherId&&(r=S(r,k("teacherId","==",a.teacherId))),(await R(r)).docs.map(d=>M({id:d.id,...d.data()}))},_=t=>{const s={totalRecords:t.length,presentCount:0,absentCount:0,lateCount:0,halfDayCount:0,avgWorkHours:0};let a=0;return t.forEach(r=>{r.status==="Present"&&(s.presentCount+=1),r.status==="Absent"&&(s.absentCount+=1),(r.status==="Late"||r.status==="Very Late")&&(s.lateCount+=1),r.status==="Half Day"&&(s.halfDayCount+=1),a+=r.workHours||0}),s.avgWorkHours=t.length>0?Number((a/t.length).toFixed(2)):0,s},X=t=>{const s=new Map;for(const a of t){const r=a.teacherId||"unknown";s.has(r)||s.set(r,{fullname:a.fullname||"Unknown",department:a.department||"Unknown",daysTracked:0,presentDays:0,totalWorkHours:0,avgWorkHours:0});const o=s.get(r);o.daysTracked+=1,a.status==="Present"&&(o.presentDays+=1),o.totalWorkHours+=a.workHours||0}return s.forEach(a=>{a.avgWorkHours=a.daysTracked>0?Number((a.totalWorkHours/a.daysTracked).toFixed(2)):0}),Array.from(s.values()).sort((a,r)=>a.fullname.localeCompare(r.fullname))},ye=async(t,s,a)=>{const r=new Date(a,s-1,1),o=new Date(a,s,0),d=S(A,k("teacherId","==",t),k("date",">=",r.toISOString().slice(0,10)),k("date","<=",o.toISOString().slice(0,10))),n=(await R(d)).docs.map(u=>u.data()),c=n.length,l=n.filter(u=>u.status==="Present").length,p=n.filter(u=>u.status==="Absent").length,v=n.filter(u=>u.status==="Late"||u.status==="Very Late").length,b=n.filter(u=>u.status==="Half Day").length,y=n.reduce((u,m)=>u+(m.workHours||0),0),j=c>0?y/c:0,N=c>0?Math.round(l/c*100):0;return{totalDays:c,presentDays:l,absentDays:p,lateDays:v,halfDays:b,avgWorkHours:j,totalWorkHours:y,attendanceRating:N,lateCount:v,absentCount:p,halfDayCount:b}},je=async(t=null,s=null)=>{try{const a=new Date,r=t||a.getMonth()+1,o=s||a.getFullYear(),d=await le();return!d||d.length===0?[]:(await Promise.all(d.map(async n=>{const c=await ye(n.id,r,o);return{id:n.id,fullname:n.fullname||n.name||"Unknown",department:n.department||"Unknown",...c}}))).filter(n=>n.totalDays>0)}catch(a){return console.error("Error getting all teachers attendance summary:",a),[]}},M=t=>({id:t.id,teacherId:t.teacherId,fullname:t.fullname,department:t.department,date:t.date,weekNum:t.weekNum,checkInTime:t.checkInTime||null,checkOutTime:t.checkOutTime||null,workHours:t.workHours||0,status:t.status,remarks:t.remarks||""}),ve=()=>{const[t,s]=x.useState([]),[a,r]=x.useState(!1),[o,d]=x.useState(null),[i,n]=x.useState({date:null,teacherId:null,startDate:null,endDate:null}),c=x.useCallback(async u=>{r(!0),d(null);try{const m=await U(u);s(m)}catch(m){d(m.message||"Failed to load attendance")}finally{r(!1)}},[]),l=x.useCallback(async(u,m,g)=>{r(!0),d(null);try{const w=await B(u,m,g);s(w)}catch(w){d(w.message||"Failed to load attendance")}finally{r(!1)}},[]),p=x.useCallback(async(u,m)=>{r(!0),d(null);try{const g=await V(u,m);s(g)}catch(g){d(g.message||"Failed to load attendance")}finally{r(!1)}},[]),v=x.useCallback(async u=>{r(!0),d(null);try{const m=await F(u);return u.date&&await c(u.date),m}catch(m){throw d(m.message||"Failed to save attendance"),m}finally{r(!1)}},[c]),b=x.useCallback(async(u,m)=>{r(!0),d(null);try{await E(u,m),i.date&&await c(i.date)}catch(g){throw d(g.message||"Failed to update attendance"),g}finally{r(!1)}},[i,c]),y=x.useMemo(()=>({daily:_(t),weekly:X(t)}),[t]),j=x.useCallback(u=>n(m=>({...m,...u})),[]),N=x.useCallback(u=>Z(u),[]);return{records:t,loading:a,filters:i,stats:y,loadByDate:c,loadByTeacherRange:l,loadByDateRange:p,saveRecord:v,updateRecord:b,updateFilters:j,getWeekNumber:N,submitAttendanceRecord:F,updateAttendanceRecordById:E,fetchAttendanceByDate:U,fetchAttendanceByTeacherRange:B,computeDailyStats:_,computeWeeklyStats:X,getAttendanceByDateRange:V}},Ne=({activeView:t,setActiveView:s})=>e.jsxs("div",{className:"flex mt-3 bg-gray-100 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>s("records"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${t==="records"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Records"}),e.jsx("button",{onClick:()=>s("analytics"),className:`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${t==="analytics"?"bg-white text-blue-600 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:"Analytics"})]}),ke=({date:t,setDate:s,search:a,setSearch:r,showFilters:o,setShowFilters:d})=>e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Filters"}),e.jsx("button",{onClick:()=>d(!o),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:e.jsx(fe,{size:20,className:`transform transition-transform ${o?"rotate-180":""}`})})]}),e.jsxs("div",{className:`space-y-3 ${o?"":"hidden"}`,children:[e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2",children:[e.jsx(H,{size:18,className:"text-gray-500 mr-2"}),e.jsx("input",{type:"date",value:t,onChange:i=>s(i.target.value),className:"bg-transparent border-none outline-none w-full text-gray-900"})]}),e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2",children:[e.jsx(xe,{size:18,className:"text-gray-500 mr-2"}),e.jsx("input",{placeholder:"Search by name or department",value:a,onChange:i=>r(i.target.value),className:"bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-500"})]})]}),e.jsx("div",{className:`space-y-3 ${o?"hidden":""}`,children:e.jsx("div",{className:"grid grid-cols-1 gap-3",children:e.jsxs("div",{className:"flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2",children:[e.jsx(H,{size:18,className:"text-gray-500 mr-2"}),e.jsx("input",{type:"date",value:t,onChange:i=>s(i.target.value),className:"bg-transparent border-none outline-none w-full text-gray-900"})]})})})]}),we=({showAddForm:t,setShowAddForm:s,handleExport:a})=>e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Quick Actions"}),e.jsx("button",{onClick:()=>s(!t),className:`p-2 rounded-lg transition-colors ${t?"bg-red-100 text-red-600 hover:bg-red-200":"bg-blue-100 text-blue-600 hover:bg-blue-200"}`,children:t?e.jsx(ae,{size:20}):e.jsx(z,{size:20})})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-4",children:[e.jsxs("button",{onClick:()=>s(!0),className:"bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[e.jsx(z,{size:18}),e.jsx("span",{className:"text-sm font-medium",children:"Mark Attendance"})]}),e.jsxs("button",{onClick:a,className:"bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors",children:[e.jsx(he,{size:18}),e.jsx("span",{className:"text-sm font-medium",children:"Export"})]})]})]}),De=({form:t,setForm:s,teachers:a,handleAdd:r,getWeekNumber:o})=>{const{userRole:d}=ne();x.useEffect(()=>{const n=new Date().toISOString().slice(0,10),c=o?o(n):"";t.attendanceDate||s(l=>({...l,attendanceDate:n,weekNum:c||l.weekNum}))},[t.attendanceDate,s,o]);const i=n=>{const c=o?o(n):"";s(l=>({...l,attendanceDate:n,weekNum:c||l.weekNum}))};return e.jsxs("div",{className:"border-t border-gray-200 pt-4 mt-4 animate-in slide-in-from-top-2",children:[e.jsx("h3",{className:"text-md font-medium text-gray-800 mb-3",children:"Mark Attendance"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"block text-sm font-medium text-gray-700",children:[e.jsx(H,{size:16,className:"inline mr-1"}),"Attendance Date"]}),e.jsx("input",{type:"date",value:t.attendanceDate||"",onChange:n=>i(n.target.value),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"block text-sm font-medium text-gray-700",children:["Week Number",t.weekNum&&e.jsx("span",{className:"text-xs text-gray-500 ml-1",children:"(Auto-calculated)"})]}),e.jsx("input",{type:"number",value:t.weekNum||"",onChange:n=>s({...t,weekNum:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Week Number (auto-calculated)",min:1,max:53,title:"Week number is automatically calculated based on the selected date, but can be manually adjusted if needed"})]}),e.jsxs("select",{value:t.teacherId,onChange:n=>s({...t,teacherId:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",children:[e.jsx("option",{value:"",children:"Select teacher"}),a.map(n=>e.jsx("option",{value:n.id,children:n.fullname},n.id))]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsx("input",{type:"time",value:t.checkInTime,onChange:n=>s({...t,checkInTime:n.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Check-in"}),e.jsx("input",{type:"time",value:t.checkOutTime,onChange:n=>s({...t,checkOutTime:n.target.value}),className:"p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Check-out"})]}),e.jsxs("select",{value:t.status,onChange:n=>s({...t,status:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",children:[e.jsx("option",{value:"present",children:"Present"}),e.jsx("option",{value:"absent",children:"Absent"}),e.jsx("option",{value:"late",children:"Late"}),e.jsx("option",{value:"half-day",children:"Half Day"})]}),e.jsx("input",{type:"text",value:t.remarks,onChange:n=>s({...t,remarks:n.target.value}),className:"w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"Remarks (optional)"}),e.jsxs("button",{onClick:r,className:"w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors",children:[e.jsx(z,{size:20}),e.jsx("span",{children:"Save Attendance"})]})]})]})},K=({filtered:t,loading:s,error:a,getStatusColor:r})=>e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("div",{className:"flex items-center justify-between mb-4",children:e.jsxs("h3",{className:"text-lg font-semibold text-gray-900 flex items-center gap-2",children:[e.jsx(W,{size:20}),"Today's Attendance"]})}),s?e.jsxs("div",{className:"text-gray-500 text-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-2",children:"Loading..."})]}):a?e.jsx("div",{className:"text-red-500 text-center py-8 bg-red-50 rounded-lg",children:e.jsxs("p",{children:["Error: ",a]})}):e.jsxs("div",{className:"space-y-3",children:[t.map(o=>e.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-gray-900",children:o.fullname}),e.jsx("p",{className:"text-sm text-gray-600",children:o.department})]}),e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${r(o.status)}`,children:o.status||"Unknown"})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Check-in"}),e.jsx("p",{className:"font-medium text-gray-900",children:o.checkInTime||"-"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Check-out"}),e.jsx("p",{className:"font-medium text-gray-900",children:o.checkOutTime||"-"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Hours"}),e.jsxs("p",{className:"font-medium text-gray-900",children:[(o.workHours||0).toFixed(1),"h"]})]})]})]},o.id)),t.length===0&&e.jsxs("div",{className:"text-gray-500 text-center py-8 bg-gray-50 rounded-lg",children:[e.jsx(W,{size:32,className:"mx-auto mb-2 text-gray-400"}),e.jsx("p",{children:"No records found"})]})]})]});K.propTypes={filtered:h.arrayOf(h.object).isRequired,loading:h.bool.isRequired,error:h.string,getStatusColor:h.func.isRequired};const Ce=({summary:t})=>{const s=t.totalDays>0?(t.presentDays/t.totalDays*100).toFixed(1):"0.0",a=t.totalDays>0?(t.totalWorkHours/t.presentDays).toFixed(1):"0.0";return e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Teacher Summary"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded-xl text-center border border-blue-100",children:[e.jsxs("div",{className:"text-2xl font-bold text-blue-600",children:[s,"%"]}),e.jsx("div",{className:"text-sm text-blue-600 font-medium",children:"Attendance"})]}),e.jsxs("div",{className:"bg-green-50 p-4 rounded-xl text-center border border-green-100",children:[e.jsxs("div",{className:"text-2xl font-bold text-green-600",children:[a,"h"]}),e.jsx("div",{className:"text-sm text-green-600 font-medium",children:"Avg. Hours"})]}),e.jsxs("div",{className:"bg-red-50 p-4 rounded-xl text-center border border-red-100",children:[e.jsx("div",{className:"text-2xl font-bold text-red-600",children:t.absentCount}),e.jsx("div",{className:"text-sm text-red-600 font-medium",children:"Absent"})]}),e.jsxs("div",{className:"bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100",children:[e.jsx("div",{className:"text-2xl font-bold text-yellow-600",children:t.lateCount}),e.jsx("div",{className:"text-sm text-yellow-600 font-medium",children:"Late"})]})]})]})},ee=({summary:t})=>{const s=t.totalDays>0?(t.presentDays/t.totalDays*100).toFixed(1):0;return e.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-gray-900",children:t.fullname}),e.jsx("p",{className:"text-sm text-gray-600",children:t.department})]}),e.jsxs("span",{className:"px-2 py-1 rounded-full text-xs font-medium",children:[s,"%"]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Present"}),e.jsx("p",{className:"font-medium text-gray-900",children:t.presentDays})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Absent"}),e.jsx("p",{className:"font-medium text-gray-900",children:t.absentCount})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500",children:"Late"}),e.jsx("p",{className:"font-medium text-gray-900",children:t.lateCount})]})]})]})};ee.propTypes={summary:h.shape({fullname:h.string.isRequired,department:h.string.isRequired,totalDays:h.number.isRequired,presentDays:h.number.isRequired,absentCount:h.number.isRequired,lateCount:h.number.isRequired,totalWorkHours:h.number.isRequired}).isRequired};const te=({stats:t,getWeekNumber:s,date:a})=>{const[r,o]=x.useState([]),[d,i]=x.useState(!1);return x.useEffect(()=>{(async()=>{i(!0);const c=await je();o(c),i(!1)})()},[]),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Today's Overview"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded-xl text-center border border-blue-100",children:[e.jsx("div",{className:"text-2xl font-bold text-blue-600",children:t.daily.totalRecords}),e.jsx("div",{className:"text-sm text-blue-600 font-medium",children:"Total"})]}),e.jsxs("div",{className:"bg-green-50 p-4 rounded-xl text-center border border-green-100",children:[e.jsx("div",{className:"text-2xl font-bold text-green-600",children:t.daily.presentCount}),e.jsx("div",{className:"text-sm text-green-600 font-medium",children:"Present"})]}),e.jsxs("div",{className:"bg-red-50 p-4 rounded-xl text-center border border-red-100",children:[e.jsx("div",{className:"text-2xl font-bold text-red-600",children:t.daily.absentCount}),e.jsx("div",{className:"text-sm text-red-600 font-medium",children:"Absent"})]}),e.jsxs("div",{className:"bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100",children:[e.jsx("div",{className:"text-2xl font-bold text-yellow-600",children:t.daily.lateCount}),e.jsx("div",{className:"text-sm text-yellow-600 font-medium",children:"Late"})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Performance Metrics"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(ge,{size:20,className:"text-purple-600"}),e.jsx("span",{className:"font-medium text-purple-900",children:"Average Hours"})]}),e.jsxs("span",{className:"text-xl font-bold text-purple-600",children:[t.daily.avgWorkHours.toFixed(1),"h"]})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(P,{size:20,className:"text-cyan-600"}),e.jsx("span",{className:"font-medium text-cyan-900",children:"Half Days"})]}),e.jsx("span",{className:"text-xl font-bold text-cyan-600",children:t.daily.halfDayCount})]}),e.jsxs("div",{className:"flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(H,{size:20,className:"text-indigo-600"}),e.jsx("span",{className:"font-medium text-indigo-900",children:"Week Number"})]}),e.jsx("span",{className:"text-xl font-bold text-indigo-600",children:s(a)})]})]})]}),r.map(n=>e.jsx(Ce,{summary:n},n.id)),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"All Teachers Summary"}),d?e.jsxs("div",{className:"text-gray-500 text-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"mt-2",children:"Loading..."})]}):e.jsx("div",{className:"space-y-3",children:r.map(n=>e.jsx(ee,{summary:n},n.id))})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Attendance Trends"}),e.jsx("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-100 h-48 rounded-xl flex items-center justify-center border border-blue-200",children:e.jsxs("div",{className:"text-center",children:[e.jsx(P,{size:32,className:"mx-auto mb-2 text-blue-500"}),e.jsx("p",{className:"text-blue-700 font-medium",children:"Line Chart Visualization"}),e.jsx("p",{className:"text-blue-600 text-sm",children:"Coming Soon"})]})})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Status Distribution"}),e.jsx("div",{className:"bg-gradient-to-br from-green-50 to-emerald-100 h-48 rounded-xl flex items-center justify-center border border-green-200",children:e.jsxs("div",{className:"text-center",children:[e.jsx(pe,{size:32,className:"mx-auto mb-2 text-green-500"}),e.jsx("p",{className:"text-green-700 font-medium",children:"Pie Chart Visualization"}),e.jsx("p",{className:"text-green-600 text-sm",children:"Coming Soon"})]})})]})]})};te.propTypes={stats:h.shape({daily:h.shape({totalRecords:h.number,presentCount:h.number,absentCount:h.number,lateCount:h.number,halfDayCount:h.number,avgWorkHours:h.number})}).isRequired,getWeekNumber:h.func.isRequired,date:h.string.isRequired};const Te=async(t,s={})=>{try{if(!t||t.length===0)return alert("No records to export"),!1;const a=()=>{switch(s.reportType){case"all":return"All Teachers Attendance Report";case"teacher":return"Individual Teacher Attendance Report";case"week":return"Weekly Attendance Report";default:return"Teacher Attendance Report"}},r=()=>{let l="";return s.startDate&&s.endDate&&s.startDate!=="N/A"?l+=`<p><strong>Date Range:</strong> ${s.startDate} to ${s.endDate}</p>`:s.date&&(l+=`<p><strong>Date:</strong> ${s.date}</p>`),s.teacherId&&t[0]?.fullname&&(l+=`<p><strong>Teacher:</strong> ${t[0].fullname}</p>`),s.weekNum&&(l+=`<p><strong>Week:</strong> ${s.weekNum}</p>`),l},o=()=>s.reportType==="week"?`
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
      `,d=()=>s.reportType==="week"?t.map(l=>`
          <tr>
            <td>${l.fullname||"Unknown"}</td>
            <td>${l.department||"Unknown"}</td>
            <td>${l.daysTracked||0}</td>
            <td>${l.presentDays||0}</td>
            <td>${l.totalWorkHours?`${l.totalWorkHours.toFixed(1)} hrs`:"-"}</td>
            <td>${l.avgWorkHours?`${l.avgWorkHours.toFixed(1)} hrs`:"-"}</td>
          </tr>
        `).join(""):t.map(l=>`
        <tr>
          <td>${l.fullname||"Unknown"}</td>
          <td>${l.department||"Unknown"}</td>
          <td>${l.date||"-"}</td>
          <td>Week ${l.weekNum||"-"}</td>
          <td>${l.checkInTime||"-"}</td>
          <td>${l.checkOutTime||"-"}</td>
          <td>${l.workHours>0?`${l.workHours.toFixed(2)} hrs`:"-"}</td>
          <td><span class="status-${(l.status||"unknown").toLowerCase().replace(" ","-")}">${l.status||"Unknown"}</span></td>
        </tr>
      `).join(""),i=()=>{if(s.reportType==="week"){const m=t.length,g=t.reduce((D,f)=>D+(f.daysTracked||0),0),w=t.reduce((D,f)=>D+(f.presentDays||0),0),T=t.reduce((D,f)=>D+(f.totalWorkHours||0),0),$=g>0?T/g:0,I=g>0?Math.round(w/g*100):0;return`
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Weekly Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
              <div><strong>Total Teachers:</strong> ${m}</div>
              <div><strong>Total Days Tracked:</strong> ${g}</div>
              <div><strong>Total Present Days:</strong> ${w}</div>
              <div><strong>Total Work Hours:</strong> ${T.toFixed(1)} hrs</div>
              <div><strong>Average Work Hours:</strong> ${$.toFixed(1)} hrs</div>
              <div><strong>Attendance Rate:</strong> ${I}%</div>
            </div>
          </div>
        `}const l=t.length,p=t.filter(m=>(m.status||"").toLowerCase()==="present").length,v=t.filter(m=>(m.status||"").toLowerCase()==="absent").length,b=t.filter(m=>(m.status||"").toLowerCase().includes("late")).length,y=t.filter(m=>(m.status||"").toLowerCase().includes("half")).length,j=t.reduce((m,g)=>m+(g.workHours||0),0),N=l>0?j/l:0,u=l>0?Math.round(p/l*100):0;return`
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">Report Summary</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div><strong>Total Records:</strong> ${l}</div>
            <div><strong>Present:</strong> ${p}</div>
            <div><strong>Absent:</strong> ${v}</div>
            <div><strong>Late:</strong> ${b}</div>
            <div><strong>Half Day:</strong> ${y}</div>
            <div><strong>Total Work Hours:</strong> ${j.toFixed(1)} hrs</div>
            <div><strong>Average Work Hours:</strong> ${N.toFixed(1)} hrs</div>
            <div><strong>Attendance Rate:</strong> ${u}%</div>
          </div>
        </div>
      `},n=`
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
                ${o()}
              </thead>
              <tbody>
                ${d()}
              </tbody>
            </table>
            
            <div class="summary-section">
              ${i()}
            </div>
            
            <div class="footer">
              <p><strong>MagX Portal - Attendance Management System</strong></p>
              <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
              <p>Total Records: ${t.length}</p>
            </div>
          </div>
        </body>
      </html>
    `,c=window.open("","_blank","width=1200,height=800,scrollbars=yes,resizable=yes");return c?(c.document.open(),c.document.write(n),c.document.close(),c.onload=()=>{setTimeout(()=>{c.focus(),c.print()},500)},!0):(alert("Please allow popups to export PDF. Check your browser settings."),!1)}catch(a){return console.error("PDF generation error:",a),alert("Failed to generate PDF. Please try again."),!1}},Oe=()=>{const{records:t,loading:s,error:a,loadByDate:r,saveRecord:o,stats:d,getWeekNumber:i}=ve(),{teachers:n}=de(),[c,l]=x.useState(()=>new Date().toISOString().slice(0,10)),[p,v]=x.useState(""),[b,y]=x.useState({attendanceDate:new Date().toISOString().slice(0,10),weekNum:"",teacherId:"",checkInTime:"",checkOutTime:"",status:"present",remarks:""}),[j,N]=x.useState(!1),[u,m]=x.useState(!1),[g,w]=x.useState("records");x.useEffect(()=>{r(c)},[c,r]);const T=x.useMemo(()=>{if(!p)return t;const f=p.toLowerCase();return t.filter(O=>(O.fullname||"").toLowerCase().includes(f)||(O.department||"").toLowerCase().includes(f))},[t,p]),$=async f=>{f.preventDefault(),!(!b.teacherId||!b.attendanceDate)&&(await o({...b,date:b.attendanceDate}),y({attendanceDate:new Date().toISOString().slice(0,10),weekNum:"",teacherId:"",checkInTime:"",checkOutTime:"",status:"present",remarks:""}),N(!1))},I=async()=>{await Te(T,{reportType:"all",startDate:c,endDate:c})},D=f=>{switch(f){case"present":return"text-green-600 bg-green-50";case"absent":return"text-red-600 bg-red-50";case"late":return"text-yellow-600 bg-yellow-50";case"half-day":return"text-purple-600 bg-purple-50";default:return"text-gray-600 bg-gray-50"}};return e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx("div",{className:"bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",children:e.jsxs("div",{className:"px-4 py-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-xl font-bold text-gray-900",children:"Attendance"}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("button",{onClick:()=>w(g==="records"?"analytics":"records"),className:"p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",children:g==="records"?e.jsx(re,{size:20}):e.jsx(W,{size:20})})})]}),e.jsx(Ne,{activeView:g,setActiveView:w})]})}),e.jsxs("div",{className:"p-4 pb-20",children:[g==="records"&&e.jsxs("div",{className:"space-y-4",children:[e.jsx(we,{showAddForm:j,setShowAddForm:N,handleExport:I}),j&&e.jsx(De,{form:b,setForm:y,teachers:n,handleAdd:$,getWeekNumber:i}),e.jsx(ke,{date:c,setDate:l,search:p,setSearch:v,showFilters:u,setShowFilters:m}),e.jsx(K,{filtered:T,loading:s,error:a,getStatusColor:D})]}),g==="analytics"&&e.jsx(te,{stats:d,getWeekNumber:i,date:c})]})]})};export{Oe as default};
