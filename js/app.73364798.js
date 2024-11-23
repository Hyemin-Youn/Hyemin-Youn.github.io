(function(){"use strict";var e={6684:function(e,t,i){var s=i(3751),o=i(641);const r={id:"app"};function a(e,t,i,s,a,n){const l=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.CE)("div",r,[(0,o.bF)(l)])}var n=i(33);const l={class:"banner-content"},c={class:"banner-title"},v={class:"banner-description"},d={class:"banner-buttons"};function u(e,t,i,s,r,a){return(0,o.uX)(),(0,o.CE)("div",{class:"banner",style:(0,n.Tr)({backgroundImage:`url(${a.bannerImage})`})},[(0,o.Lk)("div",l,[(0,o.Lk)("h1",c,(0,n.v_)(i.heroMovie.title),1),(0,o.Lk)("p",v,(0,n.v_)(i.heroMovie.overview||"영화에 대한 설명이 없습니다."),1),(0,o.Lk)("div",d,[(0,o.Lk)("button",{class:"banner-button play",onClick:t[0]||(t[0]=(...e)=>a.playMovie&&a.playMovie(...e))}," 재생 "),(0,o.Lk)("button",{class:"banner-button info",onClick:t[1]||(t[1]=(...e)=>a.showDetails&&a.showDetails(...e))}," 상세 정보 ")])]),t[2]||(t[2]=(0,o.Lk)("div",{class:"banner-fade"},null,-1))],4)}i(4114);var h={name:"Banner",props:{heroMovie:{type:Object,required:!0}},computed:{bannerImage(){return this.heroMovie.backdrop_path?`https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`:""}},methods:{playMovie(){console.log("Play movie:",this.heroMovie.title)},showDetails(){this.heroMovie.id?this.$router.push(`/movie/${this.heroMovie.id}`):console.error("Movie ID is not available")}}},m=i(6262);const g=(0,m.A)(h,[["render",u],["__scopeId","data-v-216c46c0"]]);var A=g;const p={class:"home"},D={key:0,class:"loading-overlay"},N={key:1},k={class:"movie-slider"},R=["onClick"],w={class:"movie-list"},f=["src","alt"],b={class:"movie-info"},L=["onClick"];function E(e,t,i,s,r,a){const l=(0,o.g2)("Navbar"),c=(0,o.g2)("Banner"),v=(0,o.g2)("font-awesome-icon");return(0,o.uX)(),(0,o.CE)("div",null,[(0,o.bF)(l),(0,o.Lk)("div",p,[r.isLoading?((0,o.uX)(),(0,o.CE)("div",D,t[0]||(t[0]=[(0,o.Lk)("p",null,"로딩중 ...",-1)]))):((0,o.uX)(),(0,o.CE)("div",N,[(0,o.bF)(c,{heroMovie:r.heroMovie},null,8,["heroMovie"]),((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(r.movieCategories,(e=>((0,o.uX)(),(0,o.CE)("div",{key:e.name,class:"movie-category"},[(0,o.Lk)("h3",null,(0,n.v_)(e.title),1),(0,o.Lk)("div",k,[(0,o.Lk)("button",{class:"arrow-btn left",onClick:t=>a.slideLeft(e.name)},[(0,o.bF)(v,{icon:["fas","angle-left"]})],8,R),(0,o.Lk)("div",w,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(a.getDisplayedMovies(e.name),(e=>((0,o.uX)(),(0,o.CE)("div",{key:e.id,class:"movie-card"},[(0,o.Lk)("img",{src:"https://image.tmdb.org/t/p/w200"+e.poster_path,alt:e.title,class:"movie-poster"},null,8,f),(0,o.Lk)("div",b,[(0,o.Lk)("h4",null,(0,n.v_)(e.title),1),(0,o.Lk)("p",null,"평점: ⭐ "+(0,n.v_)(e.vote_average),1),(0,o.Lk)("p",null,"개봉일: "+(0,n.v_)(e.release_date),1)])])))),128))]),(0,o.Lk)("button",{class:"arrow-btn right",onClick:t=>a.slideRight(e.name)},[(0,o.bF)(v,{icon:["fas","angle-right"]})],8,L)])])))),128))]))])])}i(8992),i(2577),i(1454);var I=i(4335),M="data:image/png;base64,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",C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJQSURBVFiFxdfJjw1RFAbwXzdaaEQT87ATU4wxLMTGuhNtRf8BSMTG9C+IhcSGJQs7IYi9xDyFBdJIRAgRM4khHTE8i3vKe6T1q1dVHV9yclO3zne+U/dWnXuK1rEah3Afn8Pu4SBWFYiXG104jlqDvQnLrn/iGMZXLT4ND0LkMTZjYsP9iTH3JHweYGpV4iNwLQKfROcgvp04Fb5Xg1sa2yPgBXTk8O/ApeBsKyveJi3rDyxsgbcoOI/LJrBUepLzBbgXg7t4MKf2JkHmxXilQAKXY5xfJoGuGD8USOB9jBPKJPA2xskFEpgS4+sC3N+YK+3jzQLcW8GdUyYB6ItAa1rgrA3O3bLi0BvB+jAuh/846WyoYWMVCbThjHp1mz6I7wz1qnk6uJVgrFQJa/iIvViBMWErY+5T+JwLTqXowD70+/NEbLT+SCT3GVBkiWZKe7sOs2PuKc5KR/HzAjH/H1pdgXapKE3BpL/uvcGrsFr51OpoQzeO4p1/739m78K3W44HbOawFvvVe71+3MZL9VYsi5OtzBKMivnr2C31By1jF76HyBWsx+gcvNHokWpGLWLsbFX8gPo3v6lVcgN6I0YtYubC1iC80OQsz4kF0pbVsCWP81epoi2rQDzDcun/4at6kzMgso52R4XiGfZE7BP/clgo/Vg8xPAhSGAEHoXGgmyysSPaIH1Oh6U3t2p8w5HQ6BnI4bK0RHOHQDzD/NC4ONDN19KL0qxPLINh+CJ9FahXwuHSG/oDz4YwAZgViYzUsNXtuKN5na/KboSmX8iAsy1IrQKsAAAAAElFTkSuQmCC";const y={class:"navbar"},S={class:"navbar-left"},B={class:"nav-links"},P={class:"navbar-right"};function Q(e,t,i,s,r,a){const n=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)("nav",y,[(0,o.Lk)("div",S,[t[5]||(t[5]=(0,o.Lk)("img",{src:M,alt:"Logo",class:"logo"},null,-1)),(0,o.Lk)("ul",B,[(0,o.Lk)("li",null,[(0,o.bF)(n,{to:"/home"},{default:(0,o.k6)((()=>t[1]||(t[1]=[(0,o.eW)(" 홈 ")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(n,{to:"/popular"},{default:(0,o.k6)((()=>t[2]||(t[2]=[(0,o.eW)(" 대세 콘텐츠 ")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(n,{to:"/search"},{default:(0,o.k6)((()=>t[3]||(t[3]=[(0,o.eW)(" 찾아보기 ")]))),_:1})]),(0,o.Lk)("li",null,[(0,o.bF)(n,{to:"/wishlist"},{default:(0,o.k6)((()=>t[4]||(t[4]=[(0,o.eW)(" 내가 찜한 리스트 ")]))),_:1})])])]),(0,o.Lk)("div",P,[(0,o.Lk)("img",{src:C,alt:"Profile",class:"profile-icon",onClick:t[0]||(t[0]=(...e)=>a.logout&&a.logout(...e))})])])}var O={name:"Navbar",methods:{logout(){localStorage.removeItem("user"),this.$store&&this.$store.dispatch("logout"),this.$router.push("/signin")}}};const J=(0,m.A)(O,[["render",Q],["__scopeId","data-v-77a6ae57"]]);var T=J,F={name:"Home",components:{Banner:A,Navbar:T},data(){return{isLoading:!0,heroMovie:{},movieCategories:[{name:"popular",title:"인기 영화",movies:[],currentIndex:0},{name:"now_playing",title:"최신 영화",movies:[],currentIndex:0},{name:"top_rated",title:"높은 평점 영화",movies:[],currentIndex:0},{name:"upcoming",title:"개봉 예정 영화",movies:[],currentIndex:0}],itemsPerPage:6}},created(){this.loadData()},methods:{async loadData(){try{await Promise.all([this.fetchHeroMovie(),this.fetchMovies()])}catch(e){console.error("Error loading data:",e)}finally{this.isLoading=!1}},async fetchHeroMovie(){const e="75b7c972001662bd9d37622e0e222947";try{const t=await I.A.get(`https://api.themoviedb.org/3/movie/popular?api_key=${e}&language=ko-KR`);this.heroMovie=t.data.results[0]}catch(t){console.error("Error fetching hero movie:",t)}},async fetchMovies(){const e="75b7c972001662bd9d37622e0e222947",t=this.movieCategories.map((async t=>{const i=await I.A.get(`https://api.themoviedb.org/3/movie/${t.name}?api_key=${e}&language=ko-KR`);t.movies=i.data.results}));await Promise.all(t)},slideLeft(e){const t=this.movieCategories.find((t=>t.name===e));t.currentIndex>0&&t.currentIndex--},slideRight(e){const t=this.movieCategories.find((t=>t.name===e));t.currentIndex+this.itemsPerPage<t.movies.length&&t.currentIndex++},getDisplayedMovies(e){const t=this.movieCategories.find((t=>t.name===e));return t.movies.slice(t.currentIndex,t.currentIndex+this.itemsPerPage)}}};const x=(0,m.A)(F,[["render",E]]);var U=x;const H={class:"slider-wrapper"},Y={class:"poster-list"},V={class:"info"};function W(e,t,i,s,r,a){const l=(0,o.g2)("font-awesome-icon");return(0,o.uX)(),(0,o.CE)("div",H,[(0,o.Lk)("button",{class:"arrow-btn left",onClick:t[0]||(t[0]=(...e)=>a.slideLeft&&a.slideLeft(...e))},[(0,o.bF)(l,{icon:["fas","angle-left"]})]),(0,o.Lk)("div",Y,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(a.displayedMovies,(e=>((0,o.uX)(),(0,o.CE)("div",{key:e.id,class:"poster",style:(0,n.Tr)({backgroundImage:`url(${a.makeImagePath(e.poster_path,"w500")})`})},[(0,o.Lk)("div",V,[(0,o.Lk)("h4",null,(0,n.v_)(e.title),1),(0,o.Lk)("p",null,"평점: ⭐ "+(0,n.v_)(e.vote_average),1),(0,o.Lk)("p",null,"개봉일: "+(0,n.v_)(e.release_date),1)])],4)))),128))]),(0,o.Lk)("button",{class:"arrow-btn right",onClick:t[1]||(t[1]=(...e)=>a.slideRight&&a.slideRight(...e))},[(0,o.bF)(l,{icon:["fas","angle-right"]})])])}var X={props:{movies:{type:Array,required:!0}},data(){return{currentIndex:0,itemsPerPage:6}},computed:{displayedMovies(){return this.movies.slice(this.currentIndex,this.currentIndex+this.itemsPerPage)}},methods:{slideLeft(){this.currentIndex>0&&this.currentIndex--},slideRight(){this.currentIndex+this.itemsPerPage<this.movies.length&&this.currentIndex++},makeImagePath(e,t){return`https://image.tmdb.org/t/p/${t}${e}`}}};const G=(0,m.A)(X,[["render",W],["__scopeId","data-v-5337333c"]]);var K=G,_={components:{Banner:A,Home:U,SliderContent:K}};const z=(0,m.A)(_,[["render",a]]);var Z=z,j=i(5220);const q={class:"wrapper"},$={class:"content"},ee={key:0,class:"error"},te={class:"remember-me"},ie={class:"content"},se={key:0,class:"error"},oe={class:"terms"},re=["disabled"];function ae(e,t,i,r,a,l){return(0,o.uX)(),(0,o.CE)("div",null,[t[23]||(t[23]=(0,o.Lk)("div",{class:"bg-image"},null,-1)),(0,o.Lk)("div",q,[(0,o.Lk)("div",{class:(0,n.C4)(["card",{active:"login"===a.activeCard,backward:"signup"===a.activeCard}])},[(0,o.Lk)("div",$,[t[16]||(t[16]=(0,o.Lk)("h2",null,"Login",-1)),(0,o.Lk)("form",{onSubmit:t[3]||(t[3]=(0,s.D$)(((...e)=>l.handleLogin&&l.handleLogin(...e)),["prevent"]))},[t[12]||(t[12]=(0,o.Lk)("label",{for:"email"},"Email",-1)),(0,o.bo)((0,o.Lk)("input",{id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>a.email=e),type:"email",required:""},null,512),[[s.Jo,a.email]]),t[13]||(t[13]=(0,o.Lk)("label",{for:"password"},"Password",-1)),(0,o.bo)((0,o.Lk)("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),type:"password",required:""},null,512),[[s.Jo,a.password]]),a.loginError?((0,o.uX)(),(0,o.CE)("p",ee,(0,n.v_)(a.loginError),1)):(0,o.Q3)("",!0),(0,o.Lk)("div",te,[(0,o.bo)((0,o.Lk)("input",{id:"rememberMe","onUpdate:modelValue":t[2]||(t[2]=e=>a.rememberMe=e),type:"checkbox"},null,512),[[s.lH,a.rememberMe]]),t[11]||(t[11]=(0,o.Lk)("label",{for:"rememberMe"},"Remember Me",-1))]),t[14]||(t[14]=(0,o.Lk)("button",{type:"submit"},"Sign In",-1))],32),(0,o.Lk)("p",{class:"switch",onClick:t[4]||(t[4]=(...e)=>l.switchToSignup&&l.switchToSignup(...e))},t[15]||(t[15]=[(0,o.eW)(" Don't have an account? "),(0,o.Lk)("b",null,"Sign up",-1)]))])],2),(0,o.Lk)("div",{class:(0,n.C4)(["card",{active:"signup"===a.activeCard,backward:"login"===a.activeCard}])},[(0,o.Lk)("div",ie,[t[22]||(t[22]=(0,o.Lk)("h2",null,"Sign Up",-1)),(0,o.Lk)("form",{onSubmit:t[9]||(t[9]=(0,s.D$)(((...e)=>l.handleRegister&&l.handleRegister(...e)),["prevent"]))},[t[18]||(t[18]=(0,o.Lk)("label",{for:"newEmail"},"Email",-1)),(0,o.bo)((0,o.Lk)("input",{id:"newEmail","onUpdate:modelValue":t[5]||(t[5]=e=>a.newEmail=e),type:"email",required:""},null,512),[[s.Jo,a.newEmail]]),t[19]||(t[19]=(0,o.Lk)("label",{for:"newPassword"},"Password",-1)),(0,o.bo)((0,o.Lk)("input",{id:"newPassword","onUpdate:modelValue":t[6]||(t[6]=e=>a.newPassword=e),type:"password",required:""},null,512),[[s.Jo,a.newPassword]]),t[20]||(t[20]=(0,o.Lk)("label",{for:"confirmPassword"},"Confirm Password",-1)),(0,o.bo)((0,o.Lk)("input",{id:"confirmPassword","onUpdate:modelValue":t[7]||(t[7]=e=>a.confirmPassword=e),type:"password",required:""},null,512),[[s.Jo,a.confirmPassword]]),a.signupError?((0,o.uX)(),(0,o.CE)("p",se,(0,n.v_)(a.signupError),1)):(0,o.Q3)("",!0),(0,o.Lk)("div",oe,[(0,o.bo)((0,o.Lk)("input",{id:"terms","onUpdate:modelValue":t[8]||(t[8]=e=>a.termsAccepted=e),type:"checkbox"},null,512),[[s.lH,a.termsAccepted]]),t[17]||(t[17]=(0,o.Lk)("label",{for:"terms"},[(0,o.eW)("I have read the "),(0,o.Lk)("b",null,"Terms and Conditions")],-1))]),(0,o.Lk)("button",{type:"submit",disabled:!a.termsAccepted},"Register",8,re)],32),(0,o.Lk)("p",{class:"switch",onClick:t[10]||(t[10]=(...e)=>l.switchToLogin&&l.switchToLogin(...e))},t[21]||(t[21]=[(0,o.eW)(" Already have an account? "),(0,o.Lk)("b",null,"Sign in",-1)]))])],2)])])}i(3949);var ne={data(){return{activeCard:"login",email:"",password:"",rememberMe:!1,loginError:"",newEmail:"",newPassword:"",confirmPassword:"",termsAccepted:!1,signupError:""}},methods:{switchToSignup(){this.activeCard="signup",this.triggerCardAnimation()},switchToLogin(){this.activeCard="login",this.triggerCardAnimation()},triggerCardAnimation(){const e=document.querySelectorAll(".card");e.forEach((e=>{e.classList.contains("active")?(e.classList.remove("active"),e.classList.add("backward")):(e.classList.remove("backward"),e.classList.add("enter"),setTimeout((()=>{e.classList.remove("enter"),e.classList.add("active")}),1e3))}))},handleLogin(){this.password.length<6?this.loginError="Password must be at least 6 characters long.":(alert("Login successful!"),this.$store.dispatch("login",{email:this.email}),"/home"!==this.$route.path&&this.$router.push("/home"))},handleRegister(){this.newPassword.length<6?this.signupError="Password must be at least 6 characters long.":this.newPassword===this.confirmPassword?(alert("Registration successful!"),this.switchToLogin()):this.signupError="Passwords do not match."}}};const le=(0,m.A)(ne,[["render",ae],["__scopeId","data-v-5fe688fa"]]);var ce=le;const ve={class:"wishlist"},de={class:"wishlist-movies"};function ue(e,t,i,s,r,a){return(0,o.uX)(),(0,o.CE)("div",ve,[t[0]||(t[0]=(0,o.Lk)("h2",null,"내가 찜한 영화",-1)),(0,o.Lk)("div",de,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.wishlist,(e=>((0,o.uX)(),(0,o.CE)("div",{key:e.id,class:"wishlist-movie",style:(0,n.Tr)({backgroundImage:`url(${s.makeImagePath(e.poster_path,"w500")})`})},[(0,o.Lk)("h4",null,(0,n.v_)(e.title),1)],4)))),128))])])}var he=i(6278);const me=(e,t)=>`https://image.tmdb.org/t/p/${t}${e}`;var ge={setup(){const e=(0,he.Pj)(),t=(0,o.EW)((()=>e.getters.wishlist));return{wishlist:t,makeImagePath:me}}};const Ae=(0,m.A)(ge,[["render",ue],["__scopeId","data-v-1826cc94"]]);var pe=Ae;i(4520);const De=(0,he.y$)({state:{user:JSON.parse(localStorage.getItem("user"))||null,isAuthenticated:!!localStorage.getItem("user"),wishlist:JSON.parse(localStorage.getItem("wishlist"))||[]},mutations:{setUser(e,t){e.user=t,e.isAuthenticated=!!t,t?localStorage.setItem("user",JSON.stringify(t)):localStorage.removeItem("user")},logout(e){e.user=null,e.isAuthenticated=!1,localStorage.removeItem("user")},ADD_TO_WISHLIST(e,t){e.wishlist.find((e=>e.id===t.id))||(e.wishlist.push(t),localStorage.setItem("wishlist",JSON.stringify(e.wishlist)))},REMOVE_FROM_WISHLIST(e,t){e.wishlist=e.wishlist.filter((e=>e.id!==t)),localStorage.setItem("wishlist",JSON.stringify(e.wishlist))}},actions:{addToWishList({commit:e},t){e("ADD_TO_WISHLIST",t)},removeFromWishList({commit:e},t){e("REMOVE_FROM_WISHLIST",t)}},getters:{wishlist:e=>e.wishlist}});var Ne=De;const ke={key:0,class:"movie-detail"},Re=["src"],we={class:"content"};function fe(e,t,i,s,r,a){return r.movie?((0,o.uX)(),(0,o.CE)("div",ke,[(0,o.Lk)("img",{src:a.makeImagePath(r.movie.backdrop_path,"w1280"),alt:"Movie Background"},null,8,Re),(0,o.Lk)("div",we,[(0,o.Lk)("h2",null,(0,n.v_)(r.movie.title),1),(0,o.Lk)("p",null,(0,n.v_)(r.movie.overview),1),(0,o.Lk)("p",null,"개봉일: "+(0,n.v_)(r.movie.release_date),1),(0,o.Lk)("p",null,"평점: ⭐ "+(0,n.v_)(r.movie.vote_average),1)])])):(0,o.Q3)("",!0)}var be={data(){return{movie:null}},created(){this.fetchMovieDetail()},methods:{async fetchMovieDetail(){const e="75b7c972001662bd9d37622e0e222947",t=this.$route.params.id;try{const i=await I.A.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${e}&language=ko-KR`);this.movie=i.data}catch(i){console.error("Error fetching movie details:",i)}},makeImagePath(e,t){return`https://image.tmdb.org/t/p/${t}${e}`}}};const Le=(0,m.A)(be,[["render",fe],["__scopeId","data-v-515c214e"]]);var Ee=Le;const Ie=[{path:"/signin",name:"SignIn",component:ce,meta:{hideNavbar:!0}},{path:"/home",name:"Home",component:U,meta:{requiresAuth:!0}},{path:"/",redirect:"/signin"},{path:"/movies/:id",component:Ee},{path:"/wishlist",name:"Wishlist",component:pe},{path:"/slider",name:"SliderContent",component:K}],Me=(0,j.aE)({history:(0,j.Bt)(),routes:Ie});Me.beforeEach(((e,t,i)=>{const s=Ne.getters.isAuthenticated;"SignIn"===e.name&&s?i("/home"):i()}));var Ce=Me,ye=i(7107),Se=i(1273),Be=i(6188);const Pe=(0,s.Ef)(Z);Pe.use(Ce),Pe.use(Ne),Pe.mount("#app"),ye.Yv.add(Be.Uec,Be.vmR,Be.qcK,Be.ekB),Pe.component("font-awesome-icon",Se.gc)}},t={};function i(s){var o=t[s];if(void 0!==o)return o.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,i),r.exports}i.m=e,function(){var e=[];i.O=function(t,s,o,r){if(!s){var a=1/0;for(v=0;v<e.length;v++){s=e[v][0],o=e[v][1],r=e[v][2];for(var n=!0,l=0;l<s.length;l++)(!1&r||a>=r)&&Object.keys(i.O).every((function(e){return i.O[e](s[l])}))?s.splice(l--,1):(n=!1,r<a&&(a=r));if(n){e.splice(v--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var v=e.length;v>0&&e[v-1][2]>r;v--)e[v]=e[v-1];e[v]=[s,o,r]}}(),function(){i.d=function(e,t){for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,s){var o,r,a=s[0],n=s[1],l=s[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in n)i.o(n,o)&&(i.m[o]=n[o]);if(l)var v=l(i)}for(t&&t(s);c<a.length;c++)r=a[c],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(v)},s=self["webpackChunknetflix_clone"]=self["webpackChunknetflix_clone"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=i.O(void 0,[504],(function(){return i(6684)}));s=i.O(s)})();
//# sourceMappingURL=app.73364798.js.map