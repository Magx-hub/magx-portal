import{j as s}from"./index-B7-XLgqW.js";import{r as w}from"./router-DwwGQyGz.js";const k=({variant:l="default",padding:i="md",shadow:c="md",rounded:e="lg",border:u=!0,hover:a=!1,children:t,className:d="",...n})=>{const r="bg-white transition-all duration-200",o={default:"",elevated:"transform hover:scale-[1.02]",interactive:"cursor-pointer hover:shadow-lg",outlined:"border-2"},m={none:"p-0",sm:"p-3",md:"p-4",lg:"p-6",xl:"p-8"},x={none:"",sm:"shadow-sm",md:"shadow-md",lg:"shadow-lg",xl:"shadow-xl"},p={none:"",sm:"rounded-sm",md:"rounded-md",lg:"rounded-lg",xl:"rounded-xl","2xl":"rounded-2xl"},b=u?"border border-gray-200":"",f=a?"hover:shadow-lg hover:border-gray-300":"",g=`
    ${r}
    ${o[l]}
    ${m[i]}
    ${x[c]}
    ${p[e]}
    ${b}
    ${f}
    ${d}
  `.trim();return s.jsx("div",{className:g,...n,children:t})},j=w.forwardRef(({type:l="text",size:i="md",variant:c="default",error:e=!1,disabled:u=!1,fullWidth:a=!1,label:t,helperText:d,errorText:n,leftIcon:r,rightIcon:o,placeholder:m,className:x="",...p},b)=>{const f="block border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",g={default:"border-gray-300 focus:border-blue-500 focus:ring-blue-500",filled:"bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500",flushed:"border-0 border-b-2 rounded-none border-gray-300 focus:border-blue-500 focus:ring-0 px-0"},h={sm:"px-3 py-2 text-sm min-h-[36px]",md:"px-4 py-2.5 text-base min-h-[44px]",lg:"px-4 py-3 text-lg min-h-[52px]"},v=e?"border-red-500 focus:border-red-500 focus:ring-red-500":g[c],y=a?"w-full":"",$=`
    ${f}
    ${v}
    ${h[i]}
    ${y}
    ${r?"pl-10":""}
    ${o?"pr-10":""}
    ${x}
  `.trim();return s.jsxs("div",{className:a?"w-full":"",children:[t&&s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:t}),s.jsxs("div",{className:"relative",children:[r&&s.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:s.jsx("span",{className:"text-gray-400",children:r})}),s.jsx("input",{ref:b,type:l,className:$,disabled:u,placeholder:m,...p}),o&&s.jsx("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",children:s.jsx("span",{className:"text-gray-400",children:o})})]}),(d||n)&&s.jsx("p",{className:`mt-2 text-sm ${e?"text-red-600":"text-gray-500"}`,children:e?n:d})]})});j.displayName="Input";export{k as C,j as I};
