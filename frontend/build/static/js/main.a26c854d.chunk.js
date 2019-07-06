(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{178:function(e,t,a){e.exports=a(438)},183:function(e,t,a){},425:function(e,t){},428:function(e,t,a){},430:function(e,t,a){},432:function(e,t,a){},434:function(e,t,a){},438:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(7),l=a.n(s),c=(a(183),a(16)),o=a(17),i=a(19),u=a(18),m=a(20),d=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={language:null,channel:null,users:[],channels:[]},a.toggle=function(e,t){if(t||"LI"!==e.target.tagName){if("clicked"===e.target.className&&t)return;e.target.parentNode.querySelectorAll("li").forEach(function(e){"clicked"===e.className&&e.classList.toggle("clicked")}),"LI"===e.target.tagName&&e.target.classList.toggle("clicked")}else e.target.classList.toggle("clicked")},a.selectLanguage=function(e){a.setState({language:e.target.textContent}),a.props.socket.emit("channelList",e.target.textContent)},a.languageBoxes=function(){var e=["english","french","spanish","japanese"].map(function(e,t){return r.a.createElement("li",{key:t},e)});return r.a.createElement("ul",null,e)},a.channelBoxes=function(){if(a.state.channels){var e=a.state.channels.map(function(e,t){return r.a.createElement("li",{key:t},e)});return r.a.createElement("ul",null,e)}},a.selectChannel=function(e){a.setState({channel:e.target.textContent}),a.props.socket.emit("userList",{channel:e.target.textContent,language:a.state.language})},a.addUser=function(){var e=a.state,t=e.channel,n=e.language,r=a.props.user.name;a.props.socket.emit("addUser",{name:r,channel:t,language:n}),a.props.inChannel(t)},a.renderUserList=function(){var e=null;return a.props.users.length&&a.state.channel?e=a.props.displayUsers(a.props.users):a.state.channel&&(e=r.a.createElement("p",null,"Empty")),e},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.socket.on("channelList",function(t){e.setState({channels:t})})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"special"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col  "},r.a.createElement("div",{onClick:function(t){e.selectLanguage(t),e.toggle(t,e.state.language)},id:"Languages"},this.languageBoxes())),r.a.createElement("div",{className:"col ",onClick:function(t){e.selectChannel(t),e.toggle(t,e.state.channel)}},r.a.createElement("div",{id:"Channels"},this.channelBoxes())),r.a.createElement("div",{className:"col"},r.a.createElement("div",{id:"Users"},this.renderUserList()),r.a.createElement("button",{id:"join",className:"btn btn-primary",onClick:this.addUser},"Join"))))}}]),t}(n.Component),p=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).canvasRef=r.a.createRef(),a.state={paint:!1,click:{x:[],y:[],drag:[],color:[],stroke:[]}},a.addClick=function(e,t,n){var r=a.state.click,s=r.y,l=r.x,c=r.drag,o=r.color,i=r.stroke,u=a.props,m=u.strokeSize,d=u.sendDrawData,p=[e],g=[t],f=[n],v=[a.props.color],h=[m];a.setState({click:{x:l.concat(p),y:s.concat(g),drag:c.concat(f),color:o.concat(v),stroke:i.concat(h)}},function(){return d(a.state.click)})},a.mousedown=function(e){if(a.props.atCanvas){var t=a.canvasRef.current.getBoundingClientRect(),n=e.pageX-t.left,r=e.pageY-t.top;a.setState({paint:!0}),a.addClick(n,r),a.redraw()}},a.mousemove=function(e){var t=a.props,n=t.color,r=t.strokeSize,s=t.atCanvas;if(a.state.paint&&s){var l=a.canvasRef.current.getBoundingClientRect();a.addClick(e.pageX-l.left,e.pageY-l.top,!0,n,r),a.redraw()}},a.mouseleave=function(e){a.setState({paint:!1})},a.clearUpdate=function(){var e=a.props,t=e.clearLift;e.clear&&a.setState({click:{x:[],y:[],drag:[],color:[],stroke:[]}},t())},a.updateDrawingData=function(){var e=a.props.drawData,t=e.x,n=e.y,r=e.color,s=e.stroke;return{x:t,y:n,color:r,drag:e.drag,stroke:s}},a.redraw=function(){var e=a.canvasRef.current.getContext("2d");e.clearRect(0,0,300,300),e.lineJoin="round";for(var t=a.state.click,n=t.x,r=t.y,s=t.color,l=t.stroke,c=t.drag,o=n.length,i=0;i<o;i++)e.beginPath(),c[i]&&i?e.moveTo(n[i-1],r[i-1]):e.moveTo(n[i]-1,r[i]),e.lineTo(n[i],r[i]),e.closePath(),e.strokeStyle=s[i],e.lineWidth=l[i],e.stroke()},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidUpdate",value:function(e){e.drawData!==this.props.drawData&&this.setState({click:this.updateDrawingData()}),this.redraw()}},{key:"render",value:function(){return this.clearUpdate(),r.a.createElement("canvas",{ref:this.canvasRef,height:300,width:300,onMouseDown:this.mousedown,onMouseMove:this.mousemove,onMouseUp:this.mouseleave})}}]),t}(n.Component),g=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).timerSetup=function(e){var t=parseInt(e/6e4),a=t>0?parseInt(e/1e3/t):parseInt(e/1e3);return a>59&&(a-=60),a<10&&(a="0"+a),t+":"+a},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,this.timerSetup(Number(this.props.timer))))}}]),t}(n.Component),f=function(e){return r.a.createElement("div",null,e.user.name?r.a.createElement("h1",null,"Logged as ",e.user.name):r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Select User Name"),r.a.createElement("input",{onKeyPress:e.inputName,type:"text"})))},v=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={inputBox:""},a.liftMsg=function(e){a.props.submitMessage(e)},a.submitText=function(e){"Enter"===e.key&&""!==e.target.value&&(a.setState({inputBox:""}),a.liftMsg(e.target.value))},a.updateInput=function(e){a.setState({inputBox:e.target.value})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"inputBox"},r.a.createElement("input",{disabled:this.props.lock,placeholder:this.props.lock?"Chatting disabled until next turn":"Type your guess or chat",onChange:this.updateInput,onKeyPress:this.submitText,value:this.state.inputBox}))}}]),t}(n.Component),h=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.log.map(function(e,t){return r.a.createElement("p",{key:t},r.a.createElement("span",{key:t,className:"userTags"},e.user,": "),e.text)});return r.a.createElement("div",{ref:this.chatRef,id:"chatBox"},e)}}]),t}(n.Component),k=a(172),E=a(177),w=a(176),y=a.n(w),C=(a(428),a(430),a(432),a(434),a(436),y.a.connect("http://localhost:3000/")),S=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).disconnect=function(){e.setState({channel:null,users:[]}),console.log("her"),C.disconnect()},e.displayWinner=function(){if(e.state.winnerDisplay.val)return r.a.createElement("div",{id:"winner"},r.a.createElement("h1",null,"Winner ",e.state.winnerDisplay.name,"!"))},e.awaitingPlayers=function(){if(e.state.awaiting)return r.a.createElement("div",{id:"awaitingPlayers"},r.a.createElement("h1",null,"Awaiting Players..."))},e.submitMessage=function(t){e.setState({message:t}),C.emit("message",t)},e.clearWin=function(){e.setState({winnerDisplay:{name:"none",val:!1}}),console.log(e.state.interval),clearInterval(e.state.interval)},e.clearLift=function(){e.setState({clear:!1})},e.togglePallette=function(t){e.state.pallette.val?e.setState({pallette:{val:!1}}):e.setState({pallette:{val:!0}})},e.toggleSlider=function(t){!e.state.sliderTog.val&&e.state.atCanvas?e.setState({sliderTog:{val:!0}}):e.setState({sliderTog:{val:!1}})},e.emitClear=function(){C.emit("clear")},e.sendDrawData=function(e){C.emit("drawing",e)},e.inputName=function(t){"Enter"===t.key&&e.setState({user:{name:t.target.value}})},e.setColor=function(t,a){e.state.atCanvas&&e.setState({color:t.hex})},e.strokeSize=function(t){e.setState({strokeSize:t})},e.renderChannel=function(){var t=e.state,a=t.user,n=t.channel;if(a&&n)return r.a.createElement("div",{id:"layout"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col box1"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col set"},r.a.createElement(p,{clearLift:e.clearLift,strokeSize:e.state.strokeSize,clear:e.state.clear,atCanvas:e.state.atCanvas,sendDrawData:e.sendDrawData,drawData:e.state.drawData,color:e.state.color}),r.a.createElement("div",{id:"sideMenu"},e.state.sliderTog.val&&r.a.createElement("div",{id:"slider",onMouseLeave:function(){return e.setState({sliderTog:{val:!1}})}},r.a.createElement(E.a,{vertical:!0,onChange:e.strokeSize,min:1,max:100,value:e.state.strokeSize})),r.a.createElement("div",{id:"color",onClick:e.togglePallette},r.a.createElement("i",{className:"fas fa-palette"}),r.a.createElement("div",{id:"chromePicker",onMouseLeave:function(){return e.setState({pallette:{val:!1}})}},e.state.pallette.val&&r.a.createElement(k.ChromePicker,{onChangeComplete:e.setColor,color:e.state.color}))),r.a.createElement("div",{id:"stroke",onClick:e.toggleSlider},r.a.createElement("i",{className:"fas fa-sort-numeric-up"}),r.a.createElement("i",{className:"fas fa-paint-brush"})),r.a.createElement("div",{id:"clear",onClick:e.emitClear,disabled:!e.state.lock},r.a.createElement("i",{className:"fas fa-trash-alt"})))),r.a.createElement("div",{className:"col"},r.a.createElement("div",{id:"timerBox"},r.a.createElement(g,{timer:e.state.timer}),r.a.createElement("h2",null,"Round ",e.state.round)),e.state.atCanvas&&r.a.createElement("div",{id:"wordInfo"},r.a.createElement("h1",null,e.state.word)))),r.a.createElement(v,{submitMessage:e.submitMessage,lock:e.state.lock})),e.displayWinner(),e.awaitingPlayers(),";",r.a.createElement("div",{className:"col box2"},r.a.createElement("div",{id:"userInfo"},r.a.createElement("h2",null,e.state.user.name),r.a.createElement("h3",null,"Score: ",e.state.points),r.a.createElement("button",{className:"btn",onClick:e.disconnect},"Disconnect")),r.a.createElement("div",{id:"userList"},e.displayUsers(e.state.users)),r.a.createElement(h,{log:e.state.log}))))},e.renderUserInput=function(){if(!e.state.user.name)return r.a.createElement(f,{inputName:e.inputName,user:e.state.user})},e.renderChannelBox=function(){if(!e.state.channel&&e.state.user.name)return C.connect(),r.a.createElement(d,{socket:C,user:e.state.user,inChannel:e.inChannel,users:e.state.users,displayUsers:e.displayUsers})},e.inChannel=function(t){e.setState({channel:t})},e.displayUsers=function(e){if(e){var t=e.map(function(e,t){return r.a.createElement("li",{key:t},e)});return r.a.createElement("ul",null,t)}},e.state={awaiting:!0,message:"",log:[],drawData:{},user:{},channel:null,word:!1,timer:12e4,round:1,atCanvas:!1,points:0,clear:!1,winnerDisplay:{name:"none",val:!1},users:[],color:"black",strokeSize:1,lock:!1,interval:null,pallette:{val:!1},sliderTog:{val:!1}},e}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;C.on("new message",function(t){e.setState({log:e.state.log.concat(t)})}),C.on("new drawing",function(t){e.setState({drawData:t.drawData})}),C.on("wordGuess",function(t){e.setState({word:t,lock:!0})}),C.on("timer",function(t){e.setState({timer:t})}),C.on("noCanvas",function(){e.setState({atCanvas:!1})}),C.on("userAtCanvas",function(){e.setState({atCanvas:!0,lock:!0})}),C.on("round",function(t){e.setState({round:t,lock:!1})}),C.on("guess",function(t){e.setState({points:t,lock:!0})}),C.on("correctGuess",function(t){e.setState({log:e.state.log.concat(t)})}),C.on("restart",function(){e.setState({points:0,log:[],clear:!0,awaiting:!1})}),C.on("winner",function(t){var a=setInterval(e.clearWin,6e3);e.setState({interval:a,winnerDisplay:{name:t,val:!0}})}),C.on("userList",function(t){e.setState({users:t})}),C.on("clear",function(){e.setState({clear:!0})}),C.on("awaiting",function(){e.setState({awaiting:!0})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},this.renderUserInput(),this.renderChannelBox(),this.renderChannel())}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[178,2,1]]]);
//# sourceMappingURL=main.a26c854d.chunk.js.map