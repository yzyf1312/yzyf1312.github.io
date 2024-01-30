import"./modulepreload-polyfill.b7f2da20.js";import{dV as q,ay as p,W as d,X as v,a4 as Q,k as l,dU as Z,dD as g,cl as ee,aY as T,a2 as x,A as V,x as k,I as le,aE as ae,D as te,C as Y,b3 as $,bm as B,V as se,b9 as ne}from"./index.e69ae269.js";import{I as oe}from"./ico_pin.f7d7c54a.js";import{i as ue}from"./isUdf.1a76b9f4.js";function ie(w,t){for(var s=[],h=0,c=-1;++c<w;)ue(t)?s.push(h++):q(t)?s.push(t(c)):s.push(t);return s}const ce={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},re=v("path",{d:"M379.094 197.91c72.324 119.976 68.833 116.128 132.41 116.128h371.26v500.688H137.2V199.854h257.146m2.467-75.782H134.734c-40.483 0-73.315 32.832-73.315 73.315v619.809c0 40.482 32.832 73.316 73.315 73.316h750.499c40.487 0 73.316-32.834 73.316-73.316V311.508c0-40.487-32.828-73.32-73.316-73.32H511.504c-72.309-96.944-62.006-114.116-114.69-114.116zm0 0",fill:"currentColor"},null,-1),ve=[re];function pe(w,t){return p(),d("svg",ce,ve)}var de={render:pe};const fe={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200"},he=v("path",{d:"M480 512v-.224a47.84 47.84 0 0 0-14.688-34.544l.016-.016-288-288-.128.128a48 48 0 1 0-64.464 71.056l251.488 251.488L109.44 766.672l.016.016a48 48 0 0 0 67.856 67.856l.016.016 288-288-.016-.016A47.84 47.84 0 0 0 480 512zm408 240H520a40 40 0 0 0-40 40v16a40 40 0 0 0 40 40h368a40 40 0 0 0 40-40v-16a40 40 0 0 0-40-40z",fill:"currentColor"},null,-1),me=[he];function _e(w,t){return p(),d("svg",fe,me)}var ge={render:_e};const we={class:"fixed-btns p_fixed z_index_999 t_md flex_col"},ye={class:"log-content"},Te=Q({__name:"AppLog",setup(w){const t=l(null),s=l([]),h=l(!1),c=l(!1),H=l(null),m=l(""),S=l(null),o=l(""),r=l(!1),_=l(!1),U=l(Z("system/getPath","logs"));g("system/getAppLogs").then(({data:e})=>{s.value=e||[]}),ee("system/appLogChange",({data:e})=>{s.value.push(e),s.value.length>5e3&&s.value.shift()});const i=l(null),n=l([]),C="APPLOG_STORE_KEY";try{n.value=JSON.parse(localStorage.getItem(C))||[]}catch{}T(n,()=>localStorage.setItem(C,JSON.stringify(n.value)),{deep:!0});let E=null;const L=()=>{clearTimeout(E),E=setTimeout(()=>{t.value.scrollTop=t.value.scrollHeight})},I=()=>{if(t.value){const{scrollHeight:e,scrollTop:u,offsetHeight:a}=t.value;e-(a+u)<100&&L()}};T(s,()=>I(),{flush:"pre",deep:!0});const W=()=>{h.value?g("window/unpin","appLogWindow"):g("window/pin","appLogWindow"),h.value=!h.value},M=()=>{g("system/showItemInPath",[U.value,"main.log"])},D=()=>{I(),c.value=!c.value},P=()=>{r.value?H.value.focus():S.value.focus()};T([r,c],()=>{c.value&&setTimeout(()=>P())});const R=()=>{r.value?m.value=m.value.replace(/\s*/g,""):_.value=!0},b=e=>{e.key==="ArrowUp"&&!r.value&&(!o.value||!_.value)&&(i.value===null&&(i.value=n.value.length),i.value>0&&(i.value--,o.value=n.value[i.value]||"",setTimeout(()=>_.value=!1))),e.key==="ArrowDown"&&!r.value&&(!o.value||!_.value)&&(i.value===null&&(i.value=n.value.length),i.value<n.value.length&&(i.value++,o.value=n.value[i.value]||"",setTimeout(()=>_.value=!1))),e.key==="Enter"&&!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!e.metaKey&&(L(),i.value=null,r.value||(o.value&&o.value!==n.value[n.value.length-1]&&(n.value.push(o.value),n.value.length>20&&n.value.shift()),o.value==="clear"&&setTimeout(()=>{const u=Math.ceil(t.value.offsetHeight/17.4);s.value=[...s.value,...ie(u,"")]},200)),g("app/interactive",r.value?m.value:o.value).then(({data:u})=>{r.value=u}).catch(()=>{r.value=!1}),setTimeout(()=>{_.value=!1,m.value=o.value=""}))},z="INPUT_HEIGHT_KEY",f=l(+localStorage.getItem(z)||120);T(f,()=>{localStorage.setItem(z,String(f.value))});let K=0,O=f.value;const A=26,N=180,y=l(!1),F=l(null),G=e=>{if(y.value){I();const u=e.clientY-K;let a=O-u;a>N?a=N:a<A&&(a=A),f.value=a}},J=()=>{y.value=!1},j=e=>{y.value=!0,K=e.clientY,O=f.value};return document.addEventListener("mousemove",G),document.addEventListener("mouseup",J),(e,u)=>(p(),d("div",{class:V(["app_log",{"show-input":c.value,resizing:y.value}])},[v("div",we,[v("div",{class:"btn cs_pointer mb_sm",onClick:W},[x(k(oe),{class:V(["pin ts_all_fast",{rotate_n45:h.value}])},null,8,["class"])]),v("div",{class:"btn cs_pointer mb_sm",onClick:M},[x(k(de),{class:"folder"})]),v("div",{class:"btn cs_pointer mb_sm",onClick:D},[x(k(ge),{class:"terminal"})])]),v("div",{class:"log-wrapper",ref_key:"logWrapper",ref:t,style:Y({height:c.value?`calc(100vh - ${f.value}px)`:"100vh"})},[v("div",ye,[v("code",null,[(p(!0),d(le,null,ae(s.value,(a,X)=>(p(),d("span",{key:a||X},te(a||`
`),1))),128))])])],4),c.value?(p(),d("div",{key:0,class:"app-input",ref_key:"inputWpRef",ref:F,style:Y({height:`${f.value}px`}),onClick:P},[v("div",{class:"drag-line p_absolute w_100",onMousedown:j},null,32),r.value?$((p(),d("input",{key:0,ref_key:"pwdRef",ref:H,"onUpdate:modelValue":u[0]||(u[0]=a=>m.value=a),type:"password",onInput:R,onKeydown:b},null,544)),[[B,m.value]]):$((p(),d("textarea",{key:1,ref_key:"cmdRef",ref:S,"onUpdate:modelValue":u[1]||(u[1]=a=>o.value=a),onInput:R,onKeydown:b},null,544)),[[B,o.value]])],4)):se("",!0)],2))}});ne(Te).mount("#app");
