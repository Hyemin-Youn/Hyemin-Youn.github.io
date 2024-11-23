(function(){"use strict";var e={266:function(e,t,i){var s=i(3751),a=i(641);const o={id:"app"};function r(e,t,i,s,r,n){const l=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.CE)("div",o,[(0,a.bF)(l)])}var n=i(33);const l={class:"banner-content"},v={class:"banner-title"},c={class:"banner-description"},d={class:"banner-buttons"};function u(e,t,i,s,o,r){return(0,a.uX)(),(0,a.CE)("div",{class:"banner",style:(0,n.Tr)({backgroundImage:`url(${r.bannerImage})`})},[(0,a.Lk)("div",l,[(0,a.Lk)("h1",v,(0,n.v_)(i.heroMovie.title),1),(0,a.Lk)("p",c,(0,n.v_)(i.heroMovie.overview||"영화에 대한 설명이 없습니다."),1),(0,a.Lk)("div",d,[(0,a.Lk)("button",{class:"banner-button play",onClick:t[0]||(t[0]=(...e)=>r.playMovie&&r.playMovie(...e))}," 재생 "),(0,a.Lk)("button",{class:"banner-button info",onClick:t[1]||(t[1]=(...e)=>r.showDetails&&r.showDetails(...e))}," 상세 정보 ")])]),t[2]||(t[2]=(0,a.Lk)("div",{class:"banner-fade"},null,-1))],4)}i(4114);var h={name:"Banner",props:{heroMovie:{type:Object,required:!0}},computed:{bannerImage(){return this.heroMovie.backdrop_path?`https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`:""}},methods:{playMovie(){console.log("Play movie:",this.heroMovie.title)},showDetails(){this.heroMovie.id?this.$router.push(`/movie/${this.heroMovie.id}`):console.error("Movie ID is not available")}}},m=i(6262);const g=(0,m.A)(h,[["render",u],["__scopeId","data-v-216c46c0"]]);var A=g;const p={class:"home"},D={key:0,class:"loading-overlay"},N={key:1},R={class:"movie-list"},k=["src","alt"],w={class:"movie-info"};function E(e,t,i,s,o,r){const l=(0,a.g2)("Navbar"),v=(0,a.g2)("MovieSlider"),c=(0,a.g2)("Banner");return(0,a.uX)(),(0,a.CE)("div",null,[(0,a.bF)(l),(0,a.bF)(v),(0,a.Lk)("div",p,[o.isLoading?((0,a.uX)(),(0,a.CE)("div",D,t[0]||(t[0]=[(0,a.Lk)("p",null,"로딩중 ...",-1)]))):((0,a.uX)(),(0,a.CE)("div",N,[(0,a.bF)(c,{heroMovie:o.heroMovie},null,8,["heroMovie"]),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.movieCategories,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.name,class:"movie-category"},[(0,a.Lk)("h3",null,(0,n.v_)(e.title),1),(0,a.Lk)("div",R,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.movies,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"movie-card"},[(0,a.Lk)("img",{src:"https://image.tmdb.org/t/p/w200"+e.poster_path,alt:e.title,class:"movie-poster"},null,8,k),(0,a.Lk)("div",w,[(0,a.Lk)("h4",null,(0,n.v_)(e.title),1),(0,a.Lk)("p",null,"평점: ⭐ "+(0,n.v_)(e.vote_average),1),(0,a.Lk)("p",null,"개봉일: "+(0,n.v_)(e.release_date),1)])])))),128))])])))),128))]))])])}i(1454);var b=i(4335),f="data:image/png;base64,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",L="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJQSURBVFiFxdfJjw1RFAbwXzdaaEQT87ATU4wxLMTGuhNtRf8BSMTG9C+IhcSGJQs7IYi9xDyFBdJIRAgRM4khHTE8i3vKe6T1q1dVHV9yclO3zne+U/dWnXuK1rEah3Afn8Pu4SBWFYiXG104jlqDvQnLrn/iGMZXLT4ND0LkMTZjYsP9iTH3JHweYGpV4iNwLQKfROcgvp04Fb5Xg1sa2yPgBXTk8O/ApeBsKyveJi3rDyxsgbcoOI/LJrBUepLzBbgXg7t4MKf2JkHmxXilQAKXY5xfJoGuGD8USOB9jBPKJPA2xskFEpgS4+sC3N+YK+3jzQLcW8GdUyYB6ItAa1rgrA3O3bLi0BvB+jAuh/846WyoYWMVCbThjHp1mz6I7wz1qnk6uJVgrFQJa/iIvViBMWErY+5T+JwLTqXowD70+/NEbLT+SCT3GVBkiWZKe7sOs2PuKc5KR/HzAjH/H1pdgXapKE3BpL/uvcGrsFr51OpoQzeO4p1/739m78K3W44HbOawFvvVe71+3MZL9VYsi5OtzBKMivnr2C31By1jF76HyBWsx+gcvNHokWpGLWLsbFX8gPo3v6lVcgN6I0YtYubC1iC80OQsz4kF0pbVsCWP81epoi2rQDzDcun/4at6kzMgso52R4XiGfZE7BP/clgo/Vg8xPAhSGAEHoXGgmyysSPaIH1Oh6U3t2p8w5HQ6BnI4bK0RHOHQDzD/NC4ONDN19KL0qxPLINh+CJ9FahXwuHSG/oDz4YwAZgViYzUsNXtuKN5na/KboSmX8iAsy1IrQKsAAAAAElFTkSuQmCC";const I={class:"navbar"},M={class:"navbar-left"},y={class:"nav-links"},S={class:"navbar-right"};function C(e,t,i,s,o,r){const n=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)("nav",I,[(0,a.Lk)("div",M,[t[5]||(t[5]=(0,a.Lk)("img",{src:f,alt:"Logo",class:"logo"},null,-1)),(0,a.Lk)("ul",y,[(0,a.Lk)("li",null,[(0,a.bF)(n,{to:"/home"},{default:(0,a.k6)((()=>t[1]||(t[1]=[(0,a.eW)(" 홈 ")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(n,{to:"/popular"},{default:(0,a.k6)((()=>t[2]||(t[2]=[(0,a.eW)(" 대세 콘텐츠 ")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(n,{to:"/search"},{default:(0,a.k6)((()=>t[3]||(t[3]=[(0,a.eW)(" 찾아보기 ")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(n,{to:"/wishlist"},{default:(0,a.k6)((()=>t[4]||(t[4]=[(0,a.eW)(" 내가 찜한 리스트 ")]))),_:1})])])]),(0,a.Lk)("div",S,[(0,a.Lk)("img",{src:L,alt:"Profile",class:"profile-icon",onClick:t[0]||(t[0]=(...e)=>r.logout&&r.logout(...e))})])])}var B={name:"Navbar",methods:{logout(){localStorage.removeItem("user"),this.$store&&this.$store.dispatch("logout"),this.$router.push("/signin")}}};const P=(0,m.A)(B,[["render",C],["__scopeId","data-v-77a6ae57"]]);var Q=P,O={name:"Home",components:{Banner:A,Navbar:Q},data(){return{isLoading:!0,heroMovie:{},movieCategories:[{name:"popular",title:"인기 영화",movies:[]},{name:"now_playing",title:"최신 영화",movies:[]},{name:"top_rated",title:"높은 평점 영화",movies:[]},{name:"upcoming",title:"개봉 예정 영화",movies:[]}]}},created(){this.loadData()},methods:{async loadData(){try{await Promise.all([this.fetchHeroMovie(),this.fetchMovies()])}catch(e){console.error("Error loading data:",e)}finally{this.isLoading=!1}},async fetchHeroMovie(){const e="75b7c972001662bd9d37622e0e222947";try{const t=await b.A.get(`https://api.themoviedb.org/3/movie/popular?api_key=${e}&language=ko-KR`);this.heroMovie=t.data.results[0]}catch(t){console.error("Error fetching hero movie:",t)}},async fetchMovies(){const e="75b7c972001662bd9d37622e0e222947",t=this.movieCategories.map((async t=>{const i=await b.A.get(`https://api.themoviedb.org/3/movie/${t.name}?api_key=${e}&language=ko-KR`);t.movies=i.data.results}));await Promise.all(t)}}};const J=(0,m.A)(O,[["render",E],["__scopeId","data-v-cb0ca07e"]]);var T=J;const F={class:"slider-wrapper"},U={class:"info"};function H(e,t,i,s,o,r){const l=(0,a.g2)("font-awesome-icon");return(0,a.uX)(),(0,a.CE)("div",F,[(0,a.Lk)("button",{class:"arrow-btn left",onClick:t[0]||(t[0]=(...e)=>r.slideLeft&&r.slideLeft(...e))},[(0,a.bF)(l,{icon:["fas","angle-left"]})]),(0,a.Lk)("div",{class:"slider",style:(0,n.Tr)({transform:`translateX(-${o.currentIndex*(100/o.itemsPerPage)}%)`})},[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(i.movies,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"slide",style:(0,n.Tr)({backgroundImage:`url(${r.makeImagePath(e.poster_path,"w500")})`})},[(0,a.Lk)("div",U,[(0,a.Lk)("h4",null,(0,n.v_)(e.title),1),(0,a.Lk)("p",null,"평점: ⭐ "+(0,n.v_)(e.vote_average),1),(0,a.Lk)("p",null,"개봉일: "+(0,n.v_)(e.release_date),1)])],4)))),128))],4),(0,a.Lk)("button",{class:"arrow-btn right",onClick:t[1]||(t[1]=(...e)=>r.slideRight&&r.slideRight(...e))},[(0,a.bF)(l,{icon:["fas","angle-right"]})])])}var Y={props:{movies:{type:Array,required:!0}},data(){return{currentIndex:0,itemsPerPage:5,autoSlideTimer:null}},computed:{maxIndex(){return Math.ceil(this.movies.length/this.itemsPerPage)-1}},methods:{slideLeft(){this.currentIndex>0?this.currentIndex--:this.currentIndex=this.maxIndex},slideRight(){this.currentIndex<this.maxIndex?this.currentIndex++:this.currentIndex=0},makeImagePath(e,t){return`https://image.tmdb.org/t/p/${t}${e}`},updateItemsPerPage(){window.innerWidth<=480?this.itemsPerPage=2:window.innerWidth<=768?this.itemsPerPage=3:this.itemsPerPage=5}},mounted(){this.updateItemsPerPage(),window.addEventListener("resize",this.updateItemsPerPage),this.autoSlideTimer=setInterval((()=>{this.slideRight()}),3e3)},beforeDestroy(){clearInterval(this.autoSlideTimer),window.removeEventListener("resize",this.updateItemsPerPage)}};const x=(0,m.A)(Y,[["render",H],["__scopeId","data-v-63311f6a"]]);var W=x,V={components:{Banner:A,Home:T,SliderContent:W}};const X=(0,m.A)(V,[["render",r]]);var G=X,K=i(5220);const _={class:"wrapper"},z={class:"content"},Z={key:0,class:"error"},j={class:"remember-me"},q={class:"content"},$={key:0,class:"error"},ee={class:"terms"},te=["disabled"];function ie(e,t,i,o,r,l){return(0,a.uX)(),(0,a.CE)("div",null,[t[23]||(t[23]=(0,a.Lk)("div",{class:"bg-image"},null,-1)),(0,a.Lk)("div",_,[(0,a.Lk)("div",{class:(0,n.C4)(["card",{active:"login"===r.activeCard,backward:"signup"===r.activeCard}])},[(0,a.Lk)("div",z,[t[16]||(t[16]=(0,a.Lk)("h2",null,"Login",-1)),(0,a.Lk)("form",{onSubmit:t[3]||(t[3]=(0,s.D$)(((...e)=>l.handleLogin&&l.handleLogin(...e)),["prevent"]))},[t[12]||(t[12]=(0,a.Lk)("label",{for:"email"},"Email",-1)),(0,a.bo)((0,a.Lk)("input",{id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>r.email=e),type:"email",required:""},null,512),[[s.Jo,r.email]]),t[13]||(t[13]=(0,a.Lk)("label",{for:"password"},"Password",-1)),(0,a.bo)((0,a.Lk)("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>r.password=e),type:"password",required:""},null,512),[[s.Jo,r.password]]),r.loginError?((0,a.uX)(),(0,a.CE)("p",Z,(0,n.v_)(r.loginError),1)):(0,a.Q3)("",!0),(0,a.Lk)("div",j,[(0,a.bo)((0,a.Lk)("input",{id:"rememberMe","onUpdate:modelValue":t[2]||(t[2]=e=>r.rememberMe=e),type:"checkbox"},null,512),[[s.lH,r.rememberMe]]),t[11]||(t[11]=(0,a.Lk)("label",{for:"rememberMe"},"Remember Me",-1))]),t[14]||(t[14]=(0,a.Lk)("button",{type:"submit"},"Sign In",-1))],32),(0,a.Lk)("p",{class:"switch",onClick:t[4]||(t[4]=(...e)=>l.switchToSignup&&l.switchToSignup(...e))},t[15]||(t[15]=[(0,a.eW)(" Don't have an account? "),(0,a.Lk)("b",null,"Sign up",-1)]))])],2),(0,a.Lk)("div",{class:(0,n.C4)(["card",{active:"signup"===r.activeCard,backward:"login"===r.activeCard}])},[(0,a.Lk)("div",q,[t[22]||(t[22]=(0,a.Lk)("h2",null,"Sign Up",-1)),(0,a.Lk)("form",{onSubmit:t[9]||(t[9]=(0,s.D$)(((...e)=>l.handleRegister&&l.handleRegister(...e)),["prevent"]))},[t[18]||(t[18]=(0,a.Lk)("label",{for:"newEmail"},"Email",-1)),(0,a.bo)((0,a.Lk)("input",{id:"newEmail","onUpdate:modelValue":t[5]||(t[5]=e=>r.newEmail=e),type:"email",required:""},null,512),[[s.Jo,r.newEmail]]),t[19]||(t[19]=(0,a.Lk)("label",{for:"newPassword"},"Password",-1)),(0,a.bo)((0,a.Lk)("input",{id:"newPassword","onUpdate:modelValue":t[6]||(t[6]=e=>r.newPassword=e),type:"password",required:""},null,512),[[s.Jo,r.newPassword]]),t[20]||(t[20]=(0,a.Lk)("label",{for:"confirmPassword"},"Confirm Password",-1)),(0,a.bo)((0,a.Lk)("input",{id:"confirmPassword","onUpdate:modelValue":t[7]||(t[7]=e=>r.confirmPassword=e),type:"password",required:""},null,512),[[s.Jo,r.confirmPassword]]),r.signupError?((0,a.uX)(),(0,a.CE)("p",$,(0,n.v_)(r.signupError),1)):(0,a.Q3)("",!0),(0,a.Lk)("div",ee,[(0,a.bo)((0,a.Lk)("input",{id:"terms","onUpdate:modelValue":t[8]||(t[8]=e=>r.termsAccepted=e),type:"checkbox"},null,512),[[s.lH,r.termsAccepted]]),t[17]||(t[17]=(0,a.Lk)("label",{for:"terms"},[(0,a.eW)("I have read the "),(0,a.Lk)("b",null,"Terms and Conditions")],-1))]),(0,a.Lk)("button",{type:"submit",disabled:!r.termsAccepted},"Register",8,te)],32),(0,a.Lk)("p",{class:"switch",onClick:t[10]||(t[10]=(...e)=>l.switchToLogin&&l.switchToLogin(...e))},t[21]||(t[21]=[(0,a.eW)(" Already have an account? "),(0,a.Lk)("b",null,"Sign in",-1)]))])],2)])])}i(8992),i(3949);var se={data(){return{activeCard:"login",email:"",password:"",rememberMe:!1,loginError:"",newEmail:"",newPassword:"",confirmPassword:"",termsAccepted:!1,signupError:""}},methods:{switchToSignup(){this.activeCard="signup",this.triggerCardAnimation()},switchToLogin(){this.activeCard="login",this.triggerCardAnimation()},triggerCardAnimation(){const e=document.querySelectorAll(".card");e.forEach((e=>{e.classList.contains("active")?(e.classList.remove("active"),e.classList.add("backward")):(e.classList.remove("backward"),e.classList.add("enter"),setTimeout((()=>{e.classList.remove("enter"),e.classList.add("active")}),1e3))}))},handleLogin(){this.password.length<6?this.loginError="Password must be at least 6 characters long.":(alert("Login successful!"),this.$store.dispatch("login",{email:this.email}),"/home"!==this.$route.path&&this.$router.push("/home"))},handleRegister(){this.newPassword.length<6?this.signupError="Password must be at least 6 characters long.":this.newPassword===this.confirmPassword?(alert("Registration successful!"),this.switchToLogin()):this.signupError="Passwords do not match."}}};const ae=(0,m.A)(se,[["render",ie],["__scopeId","data-v-5fe688fa"]]);var oe=ae;const re={class:"wishlist"},ne={class:"wishlist-movies"};function le(e,t,i,s,o,r){return(0,a.uX)(),(0,a.CE)("div",re,[t[0]||(t[0]=(0,a.Lk)("h2",null,"내가 찜한 영화",-1)),(0,a.Lk)("div",ne,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(s.wishlist,(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,class:"wishlist-movie",style:(0,n.Tr)({backgroundImage:`url(${s.makeImagePath(e.poster_path,"w500")})`})},[(0,a.Lk)("h4",null,(0,n.v_)(e.title),1)],4)))),128))])])}var ve=i(6278);const ce=(e,t)=>`https://image.tmdb.org/t/p/${t}${e}`;var de={setup(){const e=(0,ve.Pj)(),t=(0,a.EW)((()=>e.getters.wishlist));return{wishlist:t,makeImagePath:ce}}};const ue=(0,m.A)(de,[["render",le],["__scopeId","data-v-1826cc94"]]);var he=ue;i(4520),i(2577);const me=(0,ve.y$)({state:{user:JSON.parse(localStorage.getItem("user"))||null,isAuthenticated:!!localStorage.getItem("user"),wishlist:JSON.parse(localStorage.getItem("wishlist"))||[]},mutations:{setUser(e,t){e.user=t,e.isAuthenticated=!!t,t?localStorage.setItem("user",JSON.stringify(t)):localStorage.removeItem("user")},logout(e){e.user=null,e.isAuthenticated=!1,localStorage.removeItem("user")},ADD_TO_WISHLIST(e,t){e.wishlist.find((e=>e.id===t.id))||(e.wishlist.push(t),localStorage.setItem("wishlist",JSON.stringify(e.wishlist)))},REMOVE_FROM_WISHLIST(e,t){e.wishlist=e.wishlist.filter((e=>e.id!==t)),localStorage.setItem("wishlist",JSON.stringify(e.wishlist))}},actions:{addToWishList({commit:e},t){e("ADD_TO_WISHLIST",t)},removeFromWishList({commit:e},t){e("REMOVE_FROM_WISHLIST",t)}},getters:{wishlist:e=>e.wishlist}});var ge=me;const Ae={key:0,class:"movie-detail"},pe=["src"],De={class:"content"};function Ne(e,t,i,s,o,r){return o.movie?((0,a.uX)(),(0,a.CE)("div",Ae,[(0,a.Lk)("img",{src:r.makeImagePath(o.movie.backdrop_path,"w1280"),alt:"Movie Background"},null,8,pe),(0,a.Lk)("div",De,[(0,a.Lk)("h2",null,(0,n.v_)(o.movie.title),1),(0,a.Lk)("p",null,(0,n.v_)(o.movie.overview),1),(0,a.Lk)("p",null,"개봉일: "+(0,n.v_)(o.movie.release_date),1),(0,a.Lk)("p",null,"평점: ⭐ "+(0,n.v_)(o.movie.vote_average),1)])])):(0,a.Q3)("",!0)}var Re={data(){return{movie:null}},created(){this.fetchMovieDetail()},methods:{async fetchMovieDetail(){const e="75b7c972001662bd9d37622e0e222947",t=this.$route.params.id;try{const i=await b.A.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${e}&language=ko-KR`);this.movie=i.data}catch(i){console.error("Error fetching movie details:",i)}},makeImagePath(e,t){return`https://image.tmdb.org/t/p/${t}${e}`}}};const ke=(0,m.A)(Re,[["render",Ne],["__scopeId","data-v-515c214e"]]);var we=ke;const Ee=[{path:"/signin",name:"SignIn",component:oe,meta:{hideNavbar:!0}},{path:"/home",name:"Home",component:T,meta:{requiresAuth:!0}},{path:"/",redirect:"/signin"},{path:"/movies/:id",component:we},{path:"/wishlist",name:"Wishlist",component:he},{path:"/slider",name:"SliderContent",component:W}],be=(0,K.aE)({history:(0,K.Bt)(),routes:Ee});be.beforeEach(((e,t,i)=>{const s=ge.getters.isAuthenticated;"SignIn"===e.name&&s?i("/home"):i()}));var fe=be,Le=i(7107),Ie=i(1273),Me=i(6188);const ye=(0,s.Ef)(G);ye.use(fe),ye.use(ge),ye.mount("#app"),Le.Yv.add(Me.Uec,Me.vmR,Me.qcK,Me.ekB),ye.component("font-awesome-icon",Ie.gc)}},t={};function i(s){var a=t[s];if(void 0!==a)return a.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,i),o.exports}i.m=e,function(){var e=[];i.O=function(t,s,a,o){if(!s){var r=1/0;for(c=0;c<e.length;c++){s=e[c][0],a=e[c][1],o=e[c][2];for(var n=!0,l=0;l<s.length;l++)(!1&o||r>=o)&&Object.keys(i.O).every((function(e){return i.O[e](s[l])}))?s.splice(l--,1):(n=!1,o<r&&(r=o));if(n){e.splice(c--,1);var v=a();void 0!==v&&(t=v)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[s,a,o]}}(),function(){i.d=function(e,t){for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,s){var a,o,r=s[0],n=s[1],l=s[2],v=0;if(r.some((function(t){return 0!==e[t]}))){for(a in n)i.o(n,a)&&(i.m[a]=n[a]);if(l)var c=l(i)}for(t&&t(s);v<r.length;v++)o=r[v],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(c)},s=self["webpackChunknetflix_clone"]=self["webpackChunknetflix_clone"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=i.O(void 0,[504],(function(){return i(266)}));s=i.O(s)})();
//# sourceMappingURL=app.dd0fbefe.js.map