"use strict";(self.webpackChunktaier_website=self.webpackChunktaier_website||[]).push([[659],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,k=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return n?a.createElement(k,l(l({ref:t},c),{},{components:n})):a.createElement(k,l({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2609:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return c},default:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],o={title:"\u540e\u7aef\u90e8\u7f72",sidebar_label:"\u540e\u7aef\u90e8\u7f72"},p=void 0,s={unversionedId:"quickstart/deploy/backend",id:"quickstart/deploy/backend",title:"\u540e\u7aef\u90e8\u7f72",description:"\u6570\u636e\u5e93\u64cd\u4f5c",source:"@site/docs/quickstart/deploy/backend.md",sourceDirName:"quickstart/deploy",slug:"/quickstart/deploy/backend",permalink:"/Taier/docs/quickstart/deploy/backend",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/quickstart/deploy/backend.md",tags:[],version:"current",frontMatter:{title:"\u540e\u7aef\u90e8\u7f72",sidebar_label:"\u540e\u7aef\u90e8\u7f72"},sidebar:"docs",previous:{title:"\u90e8\u7f72\u4f9d\u8d56",permalink:"/Taier/docs/quickstart/deploy/pre-operation"},next:{title:"\u524d\u7aef\u90e8\u7f72",permalink:"/Taier/docs/quickstart/deploy/web"}},c=[{value:"\u6570\u636e\u5e93\u64cd\u4f5c",id:"\u6570\u636e\u5e93\u64cd\u4f5c",children:[{value:"\u5e93",id:"\u5e93",children:[],level:3},{value:"\u8868\u6570\u636e",id:"\u8868\u6570\u636e",children:[{value:"\u7248\u672c\u5347\u7ea7",id:"\u7248\u672c\u5347\u7ea7",children:[],level:4},{value:"\u521d\u6b21\u90e8\u7f72",id:"\u521d\u6b21\u90e8\u7f72",children:[],level:4}],level:3}],level:2},{value:"\u9879\u76ee\u7f16\u8bd1",id:"\u9879\u76ee\u7f16\u8bd1",children:[{value:"\u7f16\u8bd1\u811a\u672c",id:"\u7f16\u8bd1\u811a\u672c",children:[],level:3}],level:2},{value:"\u914d\u7f6e\u6587\u4ef6",id:"\u914d\u7f6e\u6587\u4ef6",children:[{value:"\u914d\u7f6e\u6587\u4ef6\u76ee\u5f55",id:"\u914d\u7f6e\u6587\u4ef6\u76ee\u5f55",children:[],level:3},{value:"conf/application.properties\u914d\u7f6e",id:"confapplicationproperties\u914d\u7f6e",children:[],level:3}],level:2},{value:"\u542f\u52a8/\u505c\u6b62",id:"\u542f\u52a8\u505c\u6b62",children:[{value:"\u9879\u76ee\u7ed3\u6784",id:"\u9879\u76ee\u7ed3\u6784",children:[],level:3}],level:2}],d={toc:c};function u(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u6570\u636e\u5e93\u64cd\u4f5c"},"\u6570\u636e\u5e93\u64cd\u4f5c"),(0,i.kt)("h3",{id:"\u5e93"},"\u5e93"),(0,i.kt)("p",null,"\u8bf7\u767b\u5f55 ",(0,i.kt)("strong",{parentName:"p"},"MySQL")," \u6570\u636e\u5e93\uff0c\u521b\u5efa\u540d\u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"taier")," \u6570\u636e\u5e93"),(0,i.kt)("h3",{id:"\u8868\u6570\u636e"},"\u8868\u6570\u636e"),(0,i.kt)("h4",{id:"\u7248\u672c\u5347\u7ea7"},"\u7248\u672c\u5347\u7ea7"),(0,i.kt)("p",null,"\u4f4e\u7248\u672c\u5347\u7ea7\u5230\u9ad8\u7248\u672c \u6267\u884c\u9ad8\u7248\u672c\u76ee\u5f55\u4e0b\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"increment.sql")),(0,i.kt)("p",null,"\u5982: 1.0\u5347\u7ea7\u52301.1 \u6267\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"sql/1.1/1.1_increment.sql")),(0,i.kt)("h4",{id:"\u521d\u6b21\u90e8\u7f72"},"\u521d\u6b21\u90e8\u7f72"),(0,i.kt)("p",null,"\u76f4\u63a5\u6267\u884csql\u4e0b\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"init.sql"),"\u521b\u5efa\u65b0\u5e93"),(0,i.kt)("h2",{id:"\u9879\u76ee\u7f16\u8bd1"},"\u9879\u76ee\u7f16\u8bd1"),(0,i.kt)("h3",{id:"\u7f16\u8bd1\u811a\u672c"},"\u7f16\u8bd1\u811a\u672c"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"bin: \u542f\u52a8\u811a\u672c\u5747\u653e\u5728\u8be5\u76ee\u5f55\u4e0b\uff0c\u8be5\u76ee\u5f55\u4e0b\u6709\u4e24\u4e2a\u6587\u4ef6sh")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"|-- bin \n|---- base.sh     //jvm\u76f8\u5173\u53c2\u6570\u8bbe\u7f6e\u811a\u672c\n|---- taier.sh    //\u542f\u52a8\u811a\u672c\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u542f\u52a8\u811a\u672c\u91cc\u9762java_home\u3001heap_size\u53ef\u4ee5\u901a\u8fc7\u5b9e\u9645\u73af\u5883\u6765\u52a8\u6001\u8c03\u6574"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"build: \u9879\u76ee\u7f16\u8bd1\u811a\u672c,\u6839\u636e\u4e0d\u540c\u573a\u666f\u6765\u7f16\u8bd1\u9879\u76ee")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"|-- build\n|---- mvn-build.sh           //\u7f16\u8bd1\u9879\u76ee\u53ca\u4efb\u52a1\u63d0\u4ea4\u811a\u672c\n|---- mvn-build-datadevelop  //\u7f16\u8bd1\u9879\u76ee\u811a\u672c : Taier\u540e\u7aefdata-develop\u542f\u52a8jar\n|---- mvn-build-plugins.sh   //\u7f16\u8bd1\u63d2\u4ef6\u811a\u672c : Taier\u4efb\u52a1\u63d0\u4ea4pluginLibs\u63d2\u4ef6jar\n")),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Taier \u9875\u9762\u529f\u80fd\u4f9d\u8d56data-develop.jar \u4efb\u52a1\u63d0\u4ea4\u4f9d\u8d56pluginsLibs\u76f8\u5173jar",(0,i.kt)("br",{parentName:"p"}),"\n","\u901a\u8fc7\u811a\u672c\u7f16\u8bd1\u9879\u76ee\u540e\u4f1a\u751f\u6210\u5bf9\u5e94\u7684taier-data-develop-with-dependencies.jar\u548cpluginLibs\u6e90\u7801\u6587\u4ef6\uff0c\u5728\u9879\u76ee\u76ee\u5f55\u4e0b\u6211\u4eec\u53ef\u4ee5\u68c0\u67e5\u7f16\u8bd1\u7684\u7ed3\u679c"))),(0,i.kt)("h2",{id:"\u914d\u7f6e\u6587\u4ef6"},"\u914d\u7f6e\u6587\u4ef6"),(0,i.kt)("h3",{id:"\u914d\u7f6e\u6587\u4ef6\u76ee\u5f55"},"\u914d\u7f6e\u6587\u4ef6\u76ee\u5f55"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"|-- conf \n|---- application.properties  //\u914d\u7f6e\u6587\u4ef6\n|---- logback.xml             //\u65e5\u5fd7\u914d\u7f6e\n")),(0,i.kt)("h3",{id:"confapplicationproperties\u914d\u7f6e"},"conf/application.properties\u914d\u7f6e"),(0,i.kt)("p",null,"\u5b8c\u6574\u7684application.properties\u5e94\u8be5\u5982\u4e0b"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-properties"},"nodeZkAddress=127.0.0.1:2181/taier\njdbc.driverClassName=com.mysql.jdbc.Driver\njdbc.url=jdbc:mysql://127.0.0.1:3306/taier?charset=utf8&autoReconnect=true&tinyInt1isBit=false&serverTimezone=Asia/Shanghai\njdbc.username=\njdbc.password=\n\nserver.tomcat.uri-encoding = UTF-8\nserver.port = 8090\nserver.tomcat.basedir = ./tmpSave\ndatasource.plugin.path=/opt/dtstack/DTCommon/InsightPlugin/dataSourcePlugin\n")),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u9700\u8981\u4f9d\u8d56",(0,i.kt)("a",{parentName:"p",href:"https://github.com/DTStack/DatasourceX/releases/tag"},"DatasourceX")," \u53bb\u83b7\u53d6\u6570\u636e\u6e90\u8868\u3001\u5b57\u6bb5\u4fe1\u606f",(0,i.kt)("br",{parentName:"p"}),"\n","\u53ef\u4ee5\u76f4\u63a5\u4e0b\u8f7ddatasourceX\u6e90\u7801 \u89e3\u538b\u4e4b\u540e\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u914d\u7f6e",(0,i.kt)("inlineCode",{parentName:"p"},"datasource.plugin.path"),"\u5373\u53ef",(0,i.kt)("br",{parentName:"p"}),"\n","jdbc\u9700\u8981\u6307\u5b9a",(0,i.kt)("inlineCode",{parentName:"p"},"charset=utf8")," \u5426\u5219\u5728\u5bf9\u63a5\u5b8c\u96c6\u7fa4\u4e4b\u540e\uff0c\u83b7\u53d6\u5f00\u53d1\u76ee\u5f55\u53ef\u80fd\u4f1a\u4e71\u7801  "))),(0,i.kt)("h2",{id:"\u542f\u52a8\u505c\u6b62"},"\u542f\u52a8/\u505c\u6b62"),(0,i.kt)("h3",{id:"\u9879\u76ee\u7ed3\u6784"},"\u9879\u76ee\u7ed3\u6784"),(0,i.kt)("p",null,"\u5b8c\u6574\u7684\u9879\u76ee\u7ed3\u6784\u5982\u4e0b"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"\u251c\u2500\u2500 bin\n\u2502\xa0\xa0 \u251c\u2500\u2500 base.sh\n\u2502\xa0\xa0 \u251c\u2500\u2500 taier.sh\n\u251c\u2500\u2500 conf\n\u2502\xa0\xa0 \u251c\u2500\u2500 application.properties\n\u2502\xa0\xa0 \u251c\u2500\u2500 java.policy\n\u2502\xa0\xa0 \u2514\u2500\u2500 logback.xml\n\u251c\u2500\u2500 flinkconf\n\u2502\xa0\xa0 \u251c\u2500\u2500 debug\n\u2502\xa0\xa0 \u251c\u2500\u2500 error\n\u2502\xa0\xa0 \u251c\u2500\u2500 fatal\n\u2502\xa0\xa0 \u251c\u2500\u2500 info\n\u2502\xa0\xa0 \u251c\u2500\u2500 info-tmp\n\u2502\xa0\xa0 \u251c\u2500\u2500 log4j2\n\u2502\xa0\xa0 \u2514\u2500\u2500 warn\n\u251c\u2500\u2500 lib\n\u2502\xa0\xa0 \u2514\u2500\u2500 taier-data-develop-with-dependencies.jar\n\u251c\u2500\u2500 logs\n\u2502\xa0\xa0 \u251c\u2500\u2500 taier_flink_monitor.log\n\u2502\xa0\xa0 \u251c\u2500\u2500 taier.log\n\u2502\xa0\xa0 \u251c\u2500\u2500 taier_request.log\n\u2502\xa0\xa0 \u251c\u2500\u2500 taier_schedule.log\n\u2502\xa0\xa0 \u2514\u2500\u2500 taier_zk.log\n\u251c\u2500\u2500 pluginLibs\n\u2502\xa0\xa0 \u251c\u2500\u2500 dummy\n\u2502\xa0\xa0 \u251c\u2500\u2500 flinkcommon\n\u2502\xa0\xa0 \u251c\u2500\u2500 hdfs2\n\u2502\xa0\xa0 \u251c\u2500\u2500 hdfs3\n\u2502\xa0\xa0 \u251c\u2500\u2500 hive\n\u2502\xa0\xa0 \u251c\u2500\u2500 hive2\n\u2502\xa0\xa0 \u251c\u2500\u2500 hive3\n\u2502\xa0\xa0 \u251c\u2500\u2500 yarn2\n\u2502\xa0\xa0 \u251c\u2500\u2500 yarn2-hdfs2-flink112\n\u2502\xa0\xa0 \u251c\u2500\u2500 yarn2-hdfs2-hadoop2\n\u2502\xa0\xa0 \u251c\u2500\u2500 yarn2-hdfs2-spark210\n\u2502\xa0\xa0 \u251c\u2500\u2500 yarn3\n\u2502\xa0\xa0 \u251c\u2500\u2500 yarn3-hdfs3-flink112\n\u2502\xa0\xa0 \u251c\u2500\u2500 yarn3-hdfs3-hadoop3\n\u2502\xa0\xa0 \u2514\u2500\u2500 yarn3-hdfs3-spark210\n\u251c\u2500\u2500 run\n\u2502\xa0\xa0 \u2514\u2500\u2500 rdos.pid\n")),(0,i.kt)("p",null,"\u4f9d\u8d56\u7ec4\u4ef6\u6b63\u5e38"),(0,i.kt)("ul",{className:"contains-task-list"},(0,i.kt)("li",{parentName:"ul",className:"task-list-item"},(0,i.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","zookeeper"),(0,i.kt)("li",{parentName:"ul",className:"task-list-item"},(0,i.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","mysql"),(0,i.kt)("li",{parentName:"ul",className:"task-list-item"},(0,i.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","datasourcex")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u542f\u52a8:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ ./bin/taier.sh start\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u505c\u6b62:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ ./bin/taier.sh stop\n")))}u.isMDXComponent=!0}}]);