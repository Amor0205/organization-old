
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/register/register","pages/card/card","pages/retrieve/retrieve","pages/set/set","pages/set/site","pages/set/manageAccount","pages/set/feedback","pages/set/commonSet","pages/set/about","pages/functionPage/toBeDeveloped","pages/functionPage/disposeWebView","pages/map","pages/three/search","pages/one/search"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"孝敬邦_服务端","compilerVersion":"2.8.3","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","titleNView":false,"bounce":"none"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","titleNView":true}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","titleNView":true}},{"path":"/pages/card/card","meta":{},"window":{"navigationBarTitleText":"身份证注册","titleNView":true}},{"path":"/pages/retrieve/retrieve","meta":{},"window":{"navigationBarTitleText":"找回密码","titleNView":true}},{"path":"/pages/set/set","meta":{},"window":{"navigationBarTitleText":"设置","titleNView":true}},{"path":"/pages/set/site","meta":{},"window":{"navigationBarTitleText":"常用地址","titleNView":true}},{"path":"/pages/set/manageAccount","meta":{},"window":{"navigationBarTitleText":"账号管理","titleNView":true}},{"path":"/pages/set/feedback","meta":{},"window":{"navigationBarTitleText":"问题反馈","titleNView":true}},{"path":"/pages/set/commonSet","meta":{},"window":{"navigationBarTitleText":"常用设置","titleNView":true}},{"path":"/pages/set/about","meta":{},"window":{"navigationBarTitleText":"关于","titleNView":true}},{"path":"/pages/functionPage/toBeDeveloped","meta":{},"window":{"navigationBarTitleText":"待开发","titleNView":true}},{"path":"/pages/functionPage/disposeWebView","meta":{},"window":{"navigationBarTitleText":"","titleNView":true}},{"path":"/pages/map","meta":{},"window":{"navigationBarTitleText":"","titleNView":true}},{"path":"/pages/three/search","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/one/search","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
