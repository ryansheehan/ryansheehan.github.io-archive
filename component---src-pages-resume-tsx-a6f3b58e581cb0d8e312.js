(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{207:function(e,a,t){"use strict";t.r(a);t(223);var n=t(0),r=t.n(n),l=t(55),i=t(231),c=t(232),s=t(233),m=t(258),o=t(259),d=Object(l.a)(function(e){return{root:{padding:e.spacing(2)+"px",backgroundColor:e.palette.primary.dark,display:"grid",gridTemplateColumns:"1fr auto",gridTemplateRows:"1fr 1fr",gridTemplateAreas:'\n      "title icon"\n      "subtitle icon"\n    ',alignItems:"center"},download:{gridArea:"icon","@media print":{display:"none"}},mainTitle:{gridArea:"title"},subtitle:{gridArea:"subtitle"}}}),u=function(e){var a=e.name,t=e.title,n=d(),l=n.root,i=n.mainTitle,c=n.download,u=n.subtitle;return r.a.createElement("div",{className:l},r.a.createElement(s.a,{className:i,variant:"h2",color:"textSecondary"},a),r.a.createElement(s.a,{className:u,variant:"subtitle1",color:"textSecondary"},t),r.a.createElement(m.a,{className:c,href:"resume.pdf",target:"_blank"},r.a.createElement(o.a,null,"save_alt")))},p=(t(253),t(260)),g=t(261),E=t(262),v=t(263),f=t(264),b=t(265),h=Object(l.a)({iconLabel:{minWidth:"36px"},link:{textDecorationLine:"underline"},"@media print":{link:{textDecoration:"none"}}}),y=function(e){var a=e.personalInfo,t=h(),n=t.iconLabel,l=t.link,i=a.address,c=a.email,m=a.phone,d=a.website,u=a.social,y=i.city,k=i.state,N=i.zip;return r.a.createElement("div",null,r.a.createElement(s.a,{variant:"h5",align:"left",color:"textPrimary"},"Personal Info"),r.a.createElement(p.a,null),r.a.createElement(g.a,{dense:!0,disablePadding:!0},r.a.createElement(E.a,{button:!0,disableGutters:!0,href:"https://www.google.com/maps/place/"+y+",+"+k+"+"+N},r.a.createElement(v.a,{className:n},r.a.createElement(o.a,{fontSize:"small"},"location_on")),r.a.createElement(f.a,{className:l,primary:y+", "+k})),r.a.createElement(E.a,{button:!0,disableGutters:!0,href:"tel:+1"+m},r.a.createElement(v.a,{className:n},r.a.createElement(o.a,{fontSize:"small"},"phone")),r.a.createElement(f.a,{className:l,primary:m.substr(0,3)+"."+m.substr(3,3)+"."+m.substr(6)})),r.a.createElement(E.a,{button:!0,disableGutters:!0,href:"mailto:"+c},r.a.createElement(v.a,{className:n},r.a.createElement(o.a,{fontSize:"small"},"email")),r.a.createElement(f.a,{className:l,primary:c})),r.a.createElement(E.a,{button:!0,disableGutters:!0,href:d},r.a.createElement(v.a,{className:n},r.a.createElement(o.a,{fontSize:"small"},"web")),r.a.createElement(f.a,{className:l,primary:d.substr(8)})),r.a.createElement(E.a,{button:!0,disableGutters:!0,href:u.github},r.a.createElement(v.a,{className:n},r.a.createElement(b.a,null,r.a.createElement("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"}))),r.a.createElement(f.a,{className:l,primary:u.github.substr(19)})),r.a.createElement(E.a,{button:!0,disableGutters:!0,href:u.linkedin},r.a.createElement(v.a,{className:n},r.a.createElement(b.a,null,r.a.createElement("path",{d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"}))),r.a.createElement(f.a,{className:l,primary:u.linkedin.substr(28,8)}))))},k=t(211),N=Object(l.a)(function(e){return{meter:{whiteSpace:"nowrap","&>*":{marginRight:e.spacing(.7)},"&>*:last-child":{marginRight:"0"}},grey:{opacity:.4},dot:{}}}),w=function(e){var a=e.level,t=e.size,l=void 0===t?14:t,i=e.classNames,c=N(),s=c.meter,m=c.dot,d=c.grey,u=Object(n.useState)([]),p=u[0],g=u[1];return Object(n.useEffect)(function(){for(var e=[],t=0,n=m,r=m+" "+d;t<5;t++)e[t]=t<a?n:r;g(e)}),r.a.createElement("div",{className:s+" "+i},p.map(function(e,a){return r.a.createElement(o.a,{key:a,style:{fontSize:l+"px"},className:e},"lens")}))},x=Object(k.a)(function(e){return{skillList:{display:"grid",gridTemplateRows:"auto",gridTemplateColumns:"auto auto",gridRowGap:e.spacing(.5)},skillMeter:{textAlign:"right"},skillGroup:{marginTop:e.spacing(1),display:"grid",gridTemplateColumns:"1fr",gridAutoRows:"auto",gridRowGap:e.spacing(.5)},skillCategory:{},"@media print":{skillCategory:{},skillGroup:{}}}}),T=function(e){var a=e.skills,t=x(),n=t.skillGroup,l=t.skillList,i=t.skillMeter,c=t.skillCategory;return r.a.createElement(r.a.Fragment,null,a.map(function(e){var a=e.category,t=e.skills;return r.a.createElement("div",{key:a,className:c},r.a.createElement(s.a,{variant:"h5",align:"left",color:"textPrimary"},a),r.a.createElement(p.a,null),r.a.createElement(s.a,{component:"div",variant:"body2"},r.a.createElement("div",{className:n},t.map(function(e){var a=e.name,t=e.level;return r.a.createElement("div",{key:a,className:l},r.a.createElement("div",null,a),r.a.createElement("div",null,r.a.createElement(w,{classNames:i,size:10,level:t}),r.a.createElement(s.a,{component:"div",variant:"caption",align:"right"},function(e){var a="none";switch(e){case 1:a="Interested";break;case 2:a="Learning";break;case 3:a="Intermediate";break;case 4:a="Advanced";break;case 5:a="Expert"}return a}(t))))}))))}))},C=Object(l.a)(function(e){return{noWrap:{whiteSpace:"nowrap"},root:{display:"grid",gridTemplateColumns:"64px 1fr",gridTemplateRows:"1fr",gridColumnGap:e.spacing(3)}}}),z=function(e){var a=e.start,t=e.end,n=e.children,l=C(),i=l.noWrap,c=l.root;return r.a.createElement("div",{className:c},r.a.createElement(s.a,{component:"div",variant:"body1"},r.a.createElement("div",{className:i},a,t?" -":""),t?r.a.createElement("div",null,t):""),r.a.createElement("div",null,n))},G=Object(l.a)(function(e){return{root:{},notesContainer:{marginTop:e.spacing(1),display:"grid",gridAutoRows:"auto",gridTemplateColumns:"auto 1fr"},experienceBlock:{marginTop:e.spacing(3)},"@media print":{experienceBlock:{},root:{}}}}),R=function(e){var a=e.experience,t=G(),n=t.root,l=t.notesContainer,i=t.experienceBlock;return r.a.createElement("div",{className:n},r.a.createElement(s.a,{variant:"h5",color:"textPrimary"},"Experience"),r.a.createElement(p.a,null),r.a.createElement("div",null,a.map(function(e){var a=e.start,t=e.end,n=e.company,c=e.title,m=e.notes;return r.a.createElement("div",{key:a+"-"+t,className:i},r.a.createElement(z,{start:a,end:t},r.a.createElement(s.a,{variant:"subtitle2"},c),r.a.createElement(s.a,{component:"div",variant:"caption"},n),r.a.createElement(s.a,{component:"div",variant:"body2"},m.map(function(e){return r.a.createElement("div",{className:l,key:e},r.a.createElement(o.a,{style:{fontSize:".75rem",lineHeight:"1.43"}},"arrow_right"),r.a.createElement("div",null,e))}))))})))},A=Object(l.a)(function(e){return{root:{},educationBlock:{marginTop:e.spacing(3)}}}),S=function(e){var a=e.education,t=A(),n=t.root,l=t.educationBlock;return r.a.createElement("div",{className:n},r.a.createElement(s.a,{variant:"h5",color:"textPrimary"},"Education"),r.a.createElement(p.a,null),r.a.createElement("div",null,a.map(function(e){var a=e.school,t=e.degree,n=e.graduation;return r.a.createElement("div",{className:l,key:a},r.a.createElement(z,{start:n},r.a.createElement(s.a,{variant:"subtitle2"},t),r.a.createElement(s.a,{component:"div",variant:"caption"},a)))})))};t(255);t.d(a,"pageQuery",function(){return O});var j=Object(l.a)(function(e){return{root:{},resume:{minHeight:"800px",display:"grid",gridTemplateColumns:"1fr auto",gridTemplateRows:"auto 1fr",gridTemplateAreas:'\n        "header header"\n        "main side"\n      '},header:{gridArea:"header"},main:{gridArea:"main",display:"grid",gridTemplateColumns:"1fr",gridTemplateRows:"auto auto 1fr",gridRowGap:e.spacing(1),padding:e.spacing(2),alignContent:"flex-start"},side:{padding:e.spacing(2),backgroundColor:e.palette.primary.light,gridArea:"side",display:"grid",gridTemplateColumns:"auto",gridAutoRows:"auto",gridRowGap:e.spacing(1),alignContent:"flex-start"},"@media print":{resume:{},main:{"&>*:nth-child(3)":{breakInside:"avoid"}}}}}),O=(a.default=function(e){var a=e.data,t=j(),n=t.root,l=t.resume,m=t.header,o=t.main,d=t.side,p=a.resumeYaml,g=p.name,E=p.title,v=p.personalInfo,f=p.summary,b=p.education,h=p.experience,k=p.skills;return r.a.createElement(i.a,{className:n},r.a.createElement(c.a,{className:l},r.a.createElement("div",{className:m},r.a.createElement(u,{name:g,title:E})),r.a.createElement("div",{className:o},r.a.createElement(s.a,{variant:"body2"},f),r.a.createElement(R,{experience:h}),r.a.createElement(S,{education:b})),r.a.createElement("div",{className:d},r.a.createElement(y,{personalInfo:v}),r.a.createElement(T,{skills:k}))))},"2807000415")}}]);
//# sourceMappingURL=component---src-pages-resume-tsx-a6f3b58e581cb0d8e312.js.map