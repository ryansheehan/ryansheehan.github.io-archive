(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{154:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return p});var A=a(7),n=a.n(A),r=a(0),i=a.n(r),o=a(156),c=a(163),s=a(160),l=a(161),u=a(157),d=function(e){function t(){return e.apply(this,arguments)||this}return n()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.site.siteMetadata.title,a=e.allMarkdownRemark.edges;return i.a.createElement(s.a,{location:this.props.location,title:t},i.a.createElement(l.a,{title:"All posts",keywords:["blog","gatsby","javascript","react"]}),i.a.createElement(c.a,null),a.map(function(e){var t=e.node,a=t.frontmatter.title||t.fields.slug;return i.a.createElement("div",{key:t.fields.slug},i.a.createElement("h3",{style:{marginBottom:Object(u.a)(.25)}},i.a.createElement(o.a,{style:{boxShadow:"none"},to:t.fields.slug},a)),i.a.createElement("small",null,t.frontmatter.date),i.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}}))}))},t}(i.a.Component);t.default=d;var p="2946824653"},156:function(e,t,a){"use strict";a.d(t,"b",function(){return l});var A=a(0),n=a.n(A),r=a(4),i=a.n(r),o=a(33),c=a.n(o);a.d(t,"a",function(){return c.a});a(158);var s=n.a.createContext({}),l=function(e){return n.a.createElement(s.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):n.a.createElement("div",null,"Loading (StaticQuery)")})};l.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},157:function(e,t,a){"use strict";a.d(t,"a",function(){return c}),a.d(t,"b",function(){return s});var A=a(165),n=a.n(A),r=a(166),i=a.n(r);i.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete i.a.googleFonts;var o=new n.a(i.a);var c=o.rhythm,s=o.scale},158:function(e,t,a){var A;e.exports=(A=a(159))&&A.default||A},159:function(e,t,a){"use strict";a.r(t);a(34);var A=a(0),n=a.n(A),r=a(4),i=a.n(r),o=a(55),c=a(2),s=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return a?n.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json)):null};s.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=s},160:function(e,t,a){"use strict";a(34);var A=a(7),n=a.n(A),r=a(0),i=a.n(r),o=a(156),c=a(157),s=function(e){function t(){return e.apply(this,arguments)||this}return n()(t,e),t.prototype.render=function(){var e,t=this.props,a=t.location,A=t.title,n=t.children;return e="/"===a.pathname?i.a.createElement("h1",{style:Object.assign({},Object(c.b)(1.5),{marginBottom:Object(c.a)(1.5),marginTop:0})},i.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},A)):i.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},i.a.createElement(o.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},A)),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(c.a)(24),padding:Object(c.a)(1.5)+" "+Object(c.a)(.75)}},i.a.createElement("header",null,e),i.a.createElement("main",null,n),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},t}(i.a.Component);t.a=s},161:function(e,t,a){"use strict";var A=a(162),n=a(0),r=a.n(n),i=a(167),o=a.n(i);t.a=function(e){var t=e.description,a=void 0===t?"":t,n=e.lang,i=void 0===n?"en":n,c=e.meta,s=void 0===c?[]:c,l=e.keywords,u=void 0===l?[]:l,d=e.title,p=A.data.site,E=a||p.siteMetadata.description;return r.a.createElement(o.a,{htmlAttributes:{lang:i},title:d,titleTemplate:"%s | "+p.siteMetadata.title,meta:[{name:"description",content:E},{property:"og:title",content:d},{property:"og:description",content:E},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:p.siteMetadata.author},{name:"twitter:title",content:d},{name:"twitter:description",content:E}].concat(u.length>0?{name:"keywords",content:u.join(", ")}:[]).concat(s)})}},162:function(e){e.exports={data:{site:{siteMetadata:{title:"Ryan Sheehan",description:"A place for my musings",author:"Ryan Sheehan"}}}}},163:function(e,t,a){"use strict";var A=a(164),n=a(0),r=a.n(n),i=a(156),o=a(157);var c="2452627939";t.a=function(){return r.a.createElement(i.b,{query:c,render:function(e){var t=e.site.siteMetadata,a=t.author,A=t.social;return r.a.createElement("div",{style:{display:"flex",marginBottom:Object(o.a)(2.5)}},r.a.createElement("p",null,"Written by ",r.a.createElement("strong",null,a)," who lives and works in DFW building useful things."," ",r.a.createElement("a",{href:"https://github.com/"+A.github},"You should follow him on Github")))},data:A})}},164:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAUBAgME/8QAFwEBAAMAAAAAAAAAAAAAAAAAAgABA//aAAwDAQACEAMQAAABtTuWpVlGVPBk0HAFf//EABsQAAICAwEAAAAAAAAAAAAAAAECAxMAESMk/9oACAEBAAEFAnOlgZ7cvIZnEYuxj6ZjxjOh/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAEQEiH/2gAIAQMBAT8BwqOP/8QAGREAAQUAAAAAAAAAAAAAAAAAAAEQEiEx/9oACAECAQE/AbJCY3//xAAgEAABAgUFAAAAAAAAAAAAAAABABECAxASITFBYYGR/9oACAEBAAY/Ai2qYx3A0tPifYlsLBBT8qX3T//EABoQAQADAQEBAAAAAAAAAAAAAAEAESExQVH/2gAIAQEAAT8hRVcZF9KXnJkRaRWsbCd3oQNMD6x1eoRshVw76T//2gAMAwEAAgADAAAAENvoAP/EABkRAAIDAQAAAAAAAAAAAAAAAAABESExUf/aAAgBAwEBPxCEpsj00xYf/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAEQESExUf/aAAgBAgEBPxBNs0X5A9n/xAAeEAEBAQACAQUAAAAAAAAAAAABEQAhMUFRYXGBkf/aAAgBAQABPxClwdnV0whQo4lO/wAzyyrjkGw+cZbkILxecbfXBH7zSeBntAmta2n5uEBbXZ4N/9k=",width:50,height:50,src:"/static/4f27694bd7811d13157e5e488ad64f43/c15d6/profile-pic.jpg",srcSet:"/static/4f27694bd7811d13157e5e488ad64f43/c15d6/profile-pic.jpg 1x,\n/static/4f27694bd7811d13157e5e488ad64f43/43c20/profile-pic.jpg 1.5x,\n/static/4f27694bd7811d13157e5e488ad64f43/da97e/profile-pic.jpg 2x,\n/static/4f27694bd7811d13157e5e488ad64f43/3e75a/profile-pic.jpg 3x"}}},site:{siteMetadata:{author:"Ryan Sheehan",social:{github:"ryansheehan"}}}}}}}]);
//# sourceMappingURL=component---src-pages-old-index-tsx-12665c9cdc81037c845e.js.map