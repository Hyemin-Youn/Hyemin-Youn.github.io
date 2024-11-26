(function(){"use strict";var e={5674:function(e,t,o){var i=o(3751),s=o(641);const a={id:"app"};function n(e,t,o,i,n,r){const l=(0,s.g2)("Navbar"),c=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.CE)("div",a,[(0,s.bF)(l),(0,s.bF)(c)])}var r=o(33);const l={class:"banner-content"},c={class:"banner-title"},v={class:"banner-description"},d={class:"banner-buttons"};function u(e,t,o,i,a,n){return(0,s.uX)(),(0,s.CE)("div",{class:"banner",style:(0,r.Tr)({backgroundImage:`url(${n.bannerImage})`})},[(0,s.Lk)("div",l,[(0,s.Lk)("h1",c,(0,r.v_)(o.heroMovie.title),1),(0,s.Lk)("p",v,(0,r.v_)(o.heroMovie.overview||"영화에 대한 설명이 없습니다."),1),(0,s.Lk)("div",d,[(0,s.Lk)("button",{class:"banner-button play",onClick:t[0]||(t[0]=(...e)=>n.playMovie&&n.playMovie(...e))}," 재생 "),(0,s.Lk)("button",{class:"banner-button info",onClick:t[1]||(t[1]=(...e)=>n.showDetails&&n.showDetails(...e))}," 상세 정보 ")])]),t[2]||(t[2]=(0,s.Lk)("div",{class:"banner-fade"},null,-1))],4)}o(4114);var h={name:"Banner",props:{heroMovie:{type:Object,required:!0}},computed:{bannerImage(){return this.heroMovie.backdrop_path?`https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`:""}},methods:{playMovie(){console.log("Play movie:",this.heroMovie.title)},showDetails(){this.heroMovie.id?this.$router.push(`/movie/${this.heroMovie.id}`):console.error("Movie ID is not available")}}},g=o(6262);const p=(0,g.A)(h,[["render",u],["__scopeId","data-v-216c46c0"]]);var m=p;const A={class:"home"},k={key:0,class:"loading-overlay"},w={key:1};function D(e,t,o,i,a,n){const l=(0,s.g2)("Navbar"),c=(0,s.g2)("Banner"),v=(0,s.g2)("SliderContent");return(0,s.uX)(),(0,s.CE)("div",null,[(0,s.bF)(l),(0,s.Lk)("div",A,[a.isLoading?((0,s.uX)(),(0,s.CE)("div",k,t[0]||(t[0]=[(0,s.Lk)("p",null,"로딩중...",-1)]))):((0,s.uX)(),(0,s.CE)("div",w,[(0,s.bF)(c,{heroMovie:a.heroMovie},null,8,["heroMovie"]),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(a.movieCategories,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.name,class:"movie-category"},[(0,s.Lk)("h3",null,(0,r.v_)(e.title),1),(0,s.bF)(v,{movies:e.movies},null,8,["movies"])])))),128))]))])])}o(1454);var N=o(4335),R="data:image/png;base64,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",b="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJQSURBVFiFxdfJjw1RFAbwXzdaaEQT87ATU4wxLMTGuhNtRf8BSMTG9C+IhcSGJQs7IYi9xDyFBdJIRAgRM4khHTE8i3vKe6T1q1dVHV9yclO3zne+U/dWnXuK1rEah3Afn8Pu4SBWFYiXG104jlqDvQnLrn/iGMZXLT4ND0LkMTZjYsP9iTH3JHweYGpV4iNwLQKfROcgvp04Fb5Xg1sa2yPgBXTk8O/ApeBsKyveJi3rDyxsgbcoOI/LJrBUepLzBbgXg7t4MKf2JkHmxXilQAKXY5xfJoGuGD8USOB9jBPKJPA2xskFEpgS4+sC3N+YK+3jzQLcW8GdUyYB6ItAa1rgrA3O3bLi0BvB+jAuh/846WyoYWMVCbThjHp1mz6I7wz1qnk6uJVgrFQJa/iIvViBMWErY+5T+JwLTqXowD70+/NEbLT+SCT3GVBkiWZKe7sOs2PuKc5KR/HzAjH/H1pdgXapKE3BpL/uvcGrsFr51OpoQzeO4p1/739m78K3W44HbOawFvvVe71+3MZL9VYsi5OtzBKMivnr2C31By1jF76HyBWsx+gcvNHokWpGLWLsbFX8gPo3v6lVcgN6I0YtYubC1iC80OQsz4kF0pbVsCWP81epoi2rQDzDcun/4at6kzMgso52R4XiGfZE7BP/clgo/Vg8xPAhSGAEHoXGgmyysSPaIH1Oh6U3t2p8w5HQ6BnI4bK0RHOHQDzD/NC4ONDN19KL0qxPLINh+CJ9FahXwuHSG/oDz4YwAZgViYzUsNXtuKN5na/KboSmX8iAsy1IrQKsAAAAAElFTkSuQmCC";const f={class:"navbar-left"},L={class:"nav-links"},E={class:"navbar-right"};function C(e,t,o,i,a,n){const l=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("nav",{class:(0,r.C4)(["navbar",{"navbar-scrolled":a.isScrolled}])},[(0,s.Lk)("div",f,[(0,s.bF)(l,{to:"/home"},{default:(0,s.k6)((()=>t[1]||(t[1]=[(0,s.Lk)("img",{src:R,alt:"Logo",class:"logo"},null,-1)]))),_:1}),(0,s.Lk)("ul",L,[(0,s.Lk)("li",null,[(0,s.bF)(l,{to:"/home"},{default:(0,s.k6)((()=>t[2]||(t[2]=[(0,s.eW)("홈")]))),_:1})]),(0,s.Lk)("li",null,[(0,s.bF)(l,{to:"/popular"},{default:(0,s.k6)((()=>t[3]||(t[3]=[(0,s.eW)("대세 콘텐츠")]))),_:1})]),(0,s.Lk)("li",null,[(0,s.bF)(l,{to:"/search"},{default:(0,s.k6)((()=>t[4]||(t[4]=[(0,s.eW)("찾아보기")]))),_:1})]),(0,s.Lk)("li",null,[(0,s.bF)(l,{to:"/wishlist"},{default:(0,s.k6)((()=>t[5]||(t[5]=[(0,s.eW)("내가 찜한 리스트")]))),_:1})])])]),(0,s.Lk)("div",E,[(0,s.Lk)("img",{src:b,alt:"Profile",class:"profile-icon",onClick:t[0]||(t[0]=(...e)=>n.logout&&n.logout(...e))})])],2)}var y={name:"Navbar",data(){return{isScrolled:!1}},mounted(){window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll(){this.isScrolled=window.scrollY>50},logout(){localStorage.removeItem("user"),this.$store&&this.$store.dispatch("logout"),this.$router.push("/signin")}}};const M=(0,g.A)(y,[["render",C],["__scopeId","data-v-15be52f4"]]);var I=M;const P={class:"slider-container"},S={class:"slider-content",ref:"slider"};function B(e,t,o,i,a,n){const r=(0,s.g2)("MovieCard");return(0,s.uX)(),(0,s.CE)("div",P,[(0,s.Lk)("button",{class:"arrow-btn left",onClick:t[0]||(t[0]=(...e)=>i.scrollLeft&&i.scrollLeft(...e))},t[2]||(t[2]=[(0,s.Lk)("i",{class:"fas fa-chevron-left"},null,-1)])),(0,s.Lk)("div",S,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(o.movies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,movie:e},null,8,["movie"])))),128))],512),(0,s.Lk)("button",{class:"arrow-btn right",onClick:t[1]||(t[1]=(...e)=>i.scrollRight&&i.scrollRight(...e))},t[3]||(t[3]=[(0,s.Lk)("i",{class:"fas fa-chevron-right"},null,-1)]))])}var T=o(953);const Q={class:"movie-card"},O=["src","alt"],X={class:"movie-info"},F={class:"movie-title"},W={class:"release-date"},J={key:0,class:"movie-rating"};function U(e,t,o,a,n,l){return(0,s.uX)(),(0,s.CE)("div",Q,[(0,s.Lk)("img",{src:l.posterUrl,alt:o.movie.title,class:"poster"},null,8,O),(0,s.Lk)("div",X,[(0,s.Lk)("p",F,(0,r.v_)(o.movie.title),1),(0,s.Lk)("p",W,"개봉일: "+(0,r.v_)(l.formattedReleaseDate),1),o.movie.vote_average?((0,s.uX)(),(0,s.CE)("div",J," ⭐ "+(0,r.v_)(o.movie.vote_average)+" / 10 ",1)):(0,s.Q3)("",!0)]),(0,s.Lk)("span",{class:"wishlist-icon",onClick:t[0]||(t[0]=(0,i.D$)(((...e)=>l.handleWishlist&&l.handleWishlist(...e)),["stop"]))},[(0,s.Lk)("i",{class:(0,r.C4)(e.isInWishlist(o.movie.id)?"fas fa-heart liked":"far fa-heart")},null,2)])])}var V=o(6278),Y={props:{movie:{type:Object,required:!0}},computed:{...(0,V.L8)(["isInWishlist"]),posterUrl(){return`https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`},formattedReleaseDate(){if(!this.movie.release_date)return"알 수 없음";const e={year:"numeric",month:"long",day:"numeric"};return new Date(this.movie.release_date).toLocaleDateString("ko-KR",e)}},methods:{...(0,V.i0)(["toggleWishlist"]),handleWishlist(){this.toggleWishlist(this.movie)}}};const H=(0,g.A)(Y,[["render",U],["__scopeId","data-v-4b0382e3"]]);var _=H,K={props:{movies:{type:Array,required:!0}},components:{MovieCard:_},setup(){const e=(0,T.KR)(null),t=()=>{e.value&&e.value.scrollBy({left:-300,behavior:"smooth"})},o=()=>{e.value&&e.value.scrollBy({left:300,behavior:"smooth"})};return{slider:e,scrollLeft:t,scrollRight:o}}};const G=(0,g.A)(K,[["render",B],["__scopeId","data-v-1b81df0f"]]);var x=G,z={name:"Home",components:{Banner:m,Navbar:I,SliderContent:x},data(){return{isLoading:!0,heroMovie:{},movieCategories:[{name:"popular",title:"인기 영화",movies:[]},{name:"now_playing",title:"최신 영화",movies:[]},{name:"top_rated",title:"높은 평점 영화",movies:[]},{name:"upcoming",title:"개봉 예정 영화",movies:[]}]}},created(){this.loadData()},methods:{async loadData(){try{await Promise.all([this.fetchHeroMovie(),this.fetchMovies()])}catch(e){console.error("Error loading data:",e)}finally{this.isLoading=!1}},async fetchHeroMovie(){const e="75b7c972001662bd9d37622e0e222947";try{const t=await N.A.get(`https://api.themoviedb.org/3/movie/popular?api_key=${e}&language=ko-KR`);this.heroMovie=t.data.results[0]}catch(t){console.error("Hero Movie 로드 실패:",t)}},async fetchMovies(){const e="75b7c972001662bd9d37622e0e222947";try{const t=this.movieCategories.map((async t=>{const o=await N.A.get(`https://api.themoviedb.org/3/movie/${t.name}?api_key=${e}&language=ko-KR`);t.movies=o.data.results}));await Promise.all(t)}catch(t){console.error("Movie Categories 로드 실패:",t)}}}};const Z=(0,g.A)(z,[["render",D],["__scopeId","data-v-1035256b"]]);var j=Z,q={components:{Banner:m,Home:j}};const $=(0,g.A)(q,[["render",n]]);var ee=$,te=o(5220);const oe={class:"wrapper"},ie={class:"content"},se={key:0,class:"error"},ae={class:"remember-me"},ne={class:"content"},re={key:0,class:"error"},le={class:"terms"},ce=["disabled"];function ve(e,t,o,a,n,l){return(0,s.uX)(),(0,s.CE)("div",null,[t[23]||(t[23]=(0,s.Lk)("div",{class:"bg-image"},null,-1)),(0,s.Lk)("div",oe,[(0,s.Lk)("div",{class:(0,r.C4)(["card",{active:"login"===n.activeCard,backward:"signup"===n.activeCard}])},[(0,s.Lk)("div",ie,[t[16]||(t[16]=(0,s.Lk)("h2",null,"Login",-1)),(0,s.Lk)("form",{onSubmit:t[3]||(t[3]=(0,i.D$)(((...e)=>l.handleLogin&&l.handleLogin(...e)),["prevent"]))},[t[12]||(t[12]=(0,s.Lk)("label",{for:"email"},"Email",-1)),(0,s.bo)((0,s.Lk)("input",{id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>n.email=e),type:"email",required:""},null,512),[[i.Jo,n.email]]),t[13]||(t[13]=(0,s.Lk)("label",{for:"password"},"Password",-1)),(0,s.bo)((0,s.Lk)("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>n.password=e),type:"password",required:""},null,512),[[i.Jo,n.password]]),n.loginError?((0,s.uX)(),(0,s.CE)("p",se,(0,r.v_)(n.loginError),1)):(0,s.Q3)("",!0),(0,s.Lk)("div",ae,[(0,s.bo)((0,s.Lk)("input",{id:"rememberMe","onUpdate:modelValue":t[2]||(t[2]=e=>n.rememberMe=e),type:"checkbox"},null,512),[[i.lH,n.rememberMe]]),t[11]||(t[11]=(0,s.Lk)("label",{for:"rememberMe"},"Remember Me",-1))]),t[14]||(t[14]=(0,s.Lk)("button",{type:"submit"},"Sign In",-1))],32),(0,s.Lk)("p",{class:"switch",onClick:t[4]||(t[4]=(...e)=>l.switchToSignup&&l.switchToSignup(...e))},t[15]||(t[15]=[(0,s.eW)(" Don't have an account? "),(0,s.Lk)("b",null,"Sign up",-1)]))])],2),(0,s.Lk)("div",{class:(0,r.C4)(["card",{active:"signup"===n.activeCard,backward:"login"===n.activeCard}])},[(0,s.Lk)("div",ne,[t[22]||(t[22]=(0,s.Lk)("h2",null,"Sign Up",-1)),(0,s.Lk)("form",{onSubmit:t[9]||(t[9]=(0,i.D$)(((...e)=>l.handleRegister&&l.handleRegister(...e)),["prevent"]))},[t[18]||(t[18]=(0,s.Lk)("label",{for:"newEmail"},"Email",-1)),(0,s.bo)((0,s.Lk)("input",{id:"newEmail","onUpdate:modelValue":t[5]||(t[5]=e=>n.newEmail=e),type:"email",required:""},null,512),[[i.Jo,n.newEmail]]),t[19]||(t[19]=(0,s.Lk)("label",{for:"newPassword"},"Password",-1)),(0,s.bo)((0,s.Lk)("input",{id:"newPassword","onUpdate:modelValue":t[6]||(t[6]=e=>n.newPassword=e),type:"password",required:""},null,512),[[i.Jo,n.newPassword]]),t[20]||(t[20]=(0,s.Lk)("label",{for:"confirmPassword"},"Confirm Password",-1)),(0,s.bo)((0,s.Lk)("input",{id:"confirmPassword","onUpdate:modelValue":t[7]||(t[7]=e=>n.confirmPassword=e),type:"password",required:""},null,512),[[i.Jo,n.confirmPassword]]),n.signupError?((0,s.uX)(),(0,s.CE)("p",re,(0,r.v_)(n.signupError),1)):(0,s.Q3)("",!0),(0,s.Lk)("div",le,[(0,s.bo)((0,s.Lk)("input",{id:"terms","onUpdate:modelValue":t[8]||(t[8]=e=>n.termsAccepted=e),type:"checkbox"},null,512),[[i.lH,n.termsAccepted]]),t[17]||(t[17]=(0,s.Lk)("label",{for:"terms"},[(0,s.eW)("I have read the "),(0,s.Lk)("b",null,"Terms and Conditions")],-1))]),(0,s.Lk)("button",{type:"submit",disabled:!n.termsAccepted},"Register",8,ce)],32),(0,s.Lk)("p",{class:"switch",onClick:t[10]||(t[10]=(...e)=>l.switchToLogin&&l.switchToLogin(...e))},t[21]||(t[21]=[(0,s.eW)(" Already have an account? "),(0,s.Lk)("b",null,"Sign in",-1)]))])],2)])])}o(8992),o(3949);var de={data(){return{activeCard:"login",email:"",password:"",rememberMe:!1,loginError:"",newEmail:"",newPassword:"",confirmPassword:"",termsAccepted:!1,signupError:""}},methods:{switchToSignup(){this.activeCard="signup",this.triggerCardAnimation()},switchToLogin(){this.activeCard="login",this.triggerCardAnimation()},triggerCardAnimation(){const e=document.querySelectorAll(".card");e.forEach((e=>{e.classList.contains("active")?(e.classList.remove("active"),e.classList.add("backward")):(e.classList.remove("backward"),e.classList.add("enter"),setTimeout((()=>{e.classList.remove("enter"),e.classList.add("active")}),1e3))}))},handleLogin(){this.password.length<6?this.loginError="Password must be at least 6 characters long.":(alert("Login successful!"),this.$store.dispatch("login",{email:this.email}),"/home"!==this.$route.path&&this.$router.push("/home"))},handleRegister(){this.newPassword.length<6?this.signupError="Password must be at least 6 characters long.":this.newPassword===this.confirmPassword?(alert("Registration successful!"),this.switchToLogin()):this.signupError="Passwords do not match."}}};const ue=(0,g.A)(de,[["render",ve],["__scopeId","data-v-5fe688fa"]]);var he=ue;const ge={class:"wishlist"},pe={key:0,class:"empty-wishlist"},me={key:1,class:"wishlist-movies"},Ae={class:"movie-info"},ke=["onClick"];function we(e,t,o,i,a,n){const l=(0,s.g2)("Navbar");return(0,s.uX)(),(0,s.CE)("div",ge,[(0,s.bF)(l),t[1]||(t[1]=(0,s.Lk)("h2",null,"내가 찜한 콘텐츠",-1)),0===i.wishlist.length?((0,s.uX)(),(0,s.CE)("div",pe,t[0]||(t[0]=[(0,s.Lk)("p",null,"찜한 영화가 없습니다.",-1)]))):((0,s.uX)(),(0,s.CE)("div",me,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(i.wishlist,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"wishlist-movie",style:(0,r.Tr)({backgroundImage:`url(https://image.tmdb.org/t/p/w500/${e.poster_path})`})},[(0,s.Lk)("div",Ae,[(0,s.Lk)("h4",null,(0,r.v_)(e.title),1),(0,s.Lk)("button",{onClick:t=>i.toggleWishlist(e),class:"remove-btn"},"삭제",8,ke)])],4)))),128))]))])}var De={components:{Navbar:I},setup(){const e=(0,V.Pj)(),t=(0,s.EW)((()=>e.getters.wishlist)),o=t=>{e.dispatch("toggleWishlist",t)};return{wishlist:t,toggleWishlist:o}}};const Ne=(0,g.A)(De,[["render",we],["__scopeId","data-v-22934772"]]);var Re=Ne;o(7550);const be=(0,V.y$)({state:{wishlist:JSON.parse(localStorage.getItem("wishlist"))||[]},mutations:{TOGGLE_WISHLIST(e,t){const o=e.wishlist.findIndex((e=>e.id===t.id));-1===o?e.wishlist.push(t):e.wishlist.splice(o,1),localStorage.setItem("wishlist",JSON.stringify(e.wishlist))}},actions:{toggleWishlist({commit:e},t){e("TOGGLE_WISHLIST",t)}},getters:{wishlist:e=>e.wishlist,isInWishlist:e=>t=>e.wishlist.some((e=>e.id===t))}});var fe=be;const Le={key:0,class:"movie-detail"},Ee=["src"],Ce={class:"content"};function ye(e,t,o,i,a,n){return a.movie?((0,s.uX)(),(0,s.CE)("div",Le,[(0,s.Lk)("img",{src:n.makeImagePath(a.movie.backdrop_path,"w1280"),alt:"Movie Background"},null,8,Ee),(0,s.Lk)("div",Ce,[(0,s.Lk)("h2",null,(0,r.v_)(a.movie.title),1),(0,s.Lk)("p",null,(0,r.v_)(a.movie.overview),1),(0,s.Lk)("p",null,"개봉일: "+(0,r.v_)(a.movie.release_date),1),(0,s.Lk)("p",null,"평점: ⭐ "+(0,r.v_)(a.movie.vote_average),1)])])):(0,s.Q3)("",!0)}var Me={data(){return{movie:null}},created(){this.fetchMovieDetail()},methods:{async fetchMovieDetail(){const e="75b7c972001662bd9d37622e0e222947",t=this.$route.params.id;try{const o=await N.A.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${e}&language=ko-KR`);this.movie=o.data}catch(o){console.error("Error fetching movie details:",o)}},makeImagePath(e,t){return`https://image.tmdb.org/t/p/${t}${e}`}}};const Ie=(0,g.A)(Me,[["render",ye],["__scopeId","data-v-515c214e"]]);var Pe=Ie;const Se={class:"search-page"},Be={class:"dropdown-container"},Te=["onClick"],Qe={key:0,class:"select-items"},Oe=["onClick"],Xe={class:"movie-grid"},Fe={key:0,class:"loading"};function We(e,t,o,i,a,n){const l=(0,s.g2)("Navbar"),c=(0,s.g2)("MovieCard");return(0,s.uX)(),(0,s.CE)("div",Se,[(0,s.bF)(l),(0,s.Lk)("div",Be,[t[2]||(t[2]=(0,s.Lk)("label",null,"선호하는 설정을 선택하세요",-1)),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.dropdownEntries,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.key,class:"custom-select"},[(0,s.Lk)("div",{class:"select-selected",onClick:t=>n.toggleDropdown(e.key)},(0,r.v_)(a.selectedOptions[e.key]),9,Te),a.activeDropdown===e.key?((0,s.uX)(),(0,s.CE)("div",Qe,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(e.options,(t=>((0,s.uX)(),(0,s.CE)("div",{key:t,onClick:o=>n.selectOption(e.key,t)},(0,r.v_)(t),9,Oe)))),128))])):(0,s.Q3)("",!0)])))),128)),(0,s.Lk)("button",{class:"clear-options",onClick:t[0]||(t[0]=(...e)=>n.clearOptions&&n.clearOptions(...e))},"초기화")]),(0,s.Lk)("div",Xe,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(a.movies,(e=>((0,s.uX)(),(0,s.Wv)(c,{key:e.id,movie:e},null,8,["movie"])))),128))]),a.loading?((0,s.uX)(),(0,s.CE)("div",Fe,"로딩 중...")):(0,s.Q3)("",!0),a.showScrollTopButton?((0,s.uX)(),(0,s.CE)("button",{key:1,class:"scroll-top",onClick:t[1]||(t[1]=(...e)=>n.scrollToTop&&n.scrollToTop(...e))}," TOP(위로) ")):(0,s.Q3)("",!0)])}const Je="75b7c972001662bd9d37622e0e222947",Ue="https://api.themoviedb.org/3",Ve=async(e=1)=>{try{const t=await N.A.get(`${Ue}/movie/popular`,{params:{api_key:Je,language:"ko-KR",page:e}});return t.data}catch(t){return console.error("Error fetching popular movies:",t),{results:[]}}},Ye=async e=>{const{genre:t,rating:o,language:i,page:s=1}=e;try{const e={api_key:Je,language:"ko-KR",page:s};if(t&&"장르 (전체)"!==t){const o={Action:28,Adventure:12,Comedy:35,Crime:80,Family:10751};e.with_genres=o[t]||null}if(o&&"평점 (전체)"!==o){const[t,i]=o.split("~").map(Number);e["vote_average.gte"]=t||0,e["vote_average.lte"]=i||10}i&&"언어 (전체)"!==i&&(e.with_original_language=i);const a=await N.A.get(`${Ue}/discover/movie`,{params:e});return a.data}catch(a){return console.error("Error fetching movies:",a),{results:[]}}};var He={name:"Search",components:{Navbar:I,MovieCard:_},data(){return{dropdowns:{originalLanguage:["장르 (전체)","Action","Adventure","Comedy","Crime","Family"],translationLanguage:["평점 (전체)","9~10","8~9","7~8","6~7","5~6","4~5","4점 이하"],sorting:["언어 (전체)","en","ko"]},DEFAULT_OPTIONS:{originalLanguage:"장르 (전체)",translationLanguage:"평점 (전체)",sorting:"언어 (전체)"},selectedOptions:{originalLanguage:"장르 (전체)",translationLanguage:"평점 (전체)",sorting:"언어 (전체)"},activeDropdown:null,movies:[],currentPage:1,totalPages:1,loading:!1,showScrollTopButton:!1}},computed:{dropdownEntries(){return Object.entries(this.dropdowns).map((([e,t])=>({key:e,options:t})))}},methods:{async fetchMovies(e=1,t=!1){if(!(this.loading||e>this.totalPages)){this.loading=!0;try{const o={genre:this.selectedOptions.originalLanguage,rating:this.selectedOptions.translationLanguage,language:this.selectedOptions.sorting,page:e},i=await Ye(o);this.movies=t?[...this.movies,...i.results]:i.results,this.currentPage=e,this.totalPages=i.total_pages}catch(o){console.error("데이터 로딩 중 오류 발생:",o)}finally{this.loading=!1}}},toggleDropdown(e){this.activeDropdown=this.activeDropdown===e?null:e},selectOption(e,t){this.selectedOptions={...this.selectedOptions,[e]:t},this.activeDropdown=null,this.movies=[],this.currentPage=1,this.fetchMovies(1)},clearOptions(){this.selectedOptions={...this.DEFAULT_OPTIONS},this.movies=[],this.currentPage=1,this.fetchMovies(1)},handleScroll(){const e=window.innerHeight+window.scrollY,t=document.documentElement.scrollHeight;e>=t-100&&!this.loading&&this.fetchMovies(this.currentPage+1,!0),this.showScrollTopButton=window.scrollY>300},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}},created(){this.fetchMovies(),window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll)}};const _e=(0,g.A)(He,[["render",We],["__scopeId","data-v-baa888e2"]]);var Ke=_e;const Ge={class:"popular"},xe={class:"movie-grid"},ze={key:0,class:"loading"};function Ze(e,t,o,i,a,n){const r=(0,s.g2)("MovieCard");return(0,s.uX)(),(0,s.CE)("div",Ge,[(0,s.Lk)("div",xe,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(a.movies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,movie:e},null,8,["movie"])))),128))]),a.loading?((0,s.uX)(),(0,s.CE)("div",ze," 로딩 중... ")):(0,s.Q3)("",!0),a.showScrollTopButton?((0,s.uX)(),(0,s.CE)("button",{key:1,class:"scroll-top",onClick:t[0]||(t[0]=(...e)=>n.scrollToTop&&n.scrollToTop(...e))}," TOP(위로) ")):(0,s.Q3)("",!0)])}var je={name:"PopularInfinite",components:{MovieCard:_},data(){return{movies:[],currentPage:1,totalPages:1,loading:!1,showScrollTopButton:!1}},methods:{async fetchMovies(e=1){if(this.loading||e>this.totalPages)return;this.loading=!0;const t=await Ve(e);this.movies=[...this.movies,...t.results],this.currentPage=e,this.totalPages=t.total_pages,this.loading=!1},handleScroll(){const e=window.innerHeight+window.scrollY>=document.body.offsetHeight-100;e&&this.currentPage<this.totalPages&&this.fetchMovies(this.currentPage+1),this.showScrollTopButton=window.scrollY>300},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}},created(){this.fetchMovies(),window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll)}};const qe=(0,g.A)(je,[["render",Ze],["__scopeId","data-v-f2f8dd3e"]]);var $e=qe;const et={class:"popular"},tt={class:"movie-grid"},ot={class:"pagination"},it=["disabled"],st=["disabled"];function at(e,t,o,i,a,n){const l=(0,s.g2)("MovieCard");return(0,s.uX)(),(0,s.CE)("div",et,[(0,s.Lk)("div",tt,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.paginatedMovies,(e=>((0,s.uX)(),(0,s.Wv)(l,{key:e.id,movie:e},null,8,["movie"])))),128))]),(0,s.Lk)("div",ot,[(0,s.Lk)("button",{disabled:1===a.currentPage,onClick:t[0]||(t[0]=e=>n.changePage(a.currentPage-1))}," 이전 ",8,it),(0,s.Lk)("span",null,"페이지 "+(0,r.v_)(a.currentPage)+" / "+(0,r.v_)(a.totalPages),1),(0,s.Lk)("button",{disabled:a.currentPage===a.totalPages,onClick:t[1]||(t[1]=e=>n.changePage(a.currentPage+1))}," 다음 ",8,st)])])}var nt={name:"PopularTable",components:{MovieCard:_},data(){return{movies:[],currentPage:1,totalPages:1,moviesPerPage:8}},computed:{paginatedMovies(){const e=(this.currentPage-1)*this.moviesPerPage,t=e+this.moviesPerPage;return this.movies.slice(e,t)}},methods:{async fetchMovies(){const e=await Ve();this.movies=e.results,this.totalPages=Math.ceil(this.movies.length/this.moviesPerPage)},changePage(e){e>0&&e<=this.totalPages&&(this.currentPage=e)}},created(){this.fetchMovies()}};const rt=(0,g.A)(nt,[["render",at],["__scopeId","data-v-89a60be4"]]);var lt=rt;const ct={class:"view-toggle"};function vt(e,t,o,i,a,n){const l=(0,s.g2)("Navbar");return(0,s.uX)(),(0,s.CE)("div",null,[(0,s.bF)(l),(0,s.Lk)("div",ct,[(0,s.Lk)("button",{class:(0,r.C4)({active:"PopularTable"===a.currentView}),onClick:t[0]||(t[0]=e=>n.switchView("PopularTable"))}," 📋 Table View ",2),(0,s.Lk)("button",{class:(0,r.C4)({active:"PopularInfinite"===a.currentView}),onClick:t[1]||(t[1]=e=>n.switchView("PopularInfinite"))}," 📜 무한 스크롤 View ",2)]),((0,s.uX)(),(0,s.Wv)((0,s.$y)(a.currentView)))])}var dt={name:"Popular",components:{Navbar:I,PopularTable:lt,PopularInfinite:$e},data(){return{currentView:"PopularTable"}},methods:{switchView(e){this.currentView=e}}};const ut=(0,g.A)(dt,[["render",vt],["__scopeId","data-v-61fd79a3"]]);var ht=ut;const gt=[{path:"/signin",name:"SignIn",component:he,meta:{hideNavbar:!0}},{path:"/home",name:"Home",component:j,meta:{requiresAuth:!0}},{path:"/",redirect:"/signin"},{path:"/movies/:id",component:Pe},{path:"/wishlist",name:"Wishlist",component:Re},{path:"/slider",name:"SliderContent",component:x},{path:"/popular",component:ht,redirect:"/popular/table",children:[{path:"table",component:lt},{path:"infinite",component:$e}]},{path:"/search",name:"Search",component:Ke}],pt=(0,te.aE)({history:(0,te.Bt)(),routes:gt});pt.beforeEach(((e,t,o)=>{const i=fe.getters.isAuthenticated;"SignIn"===e.name&&i?o("/home"):o()}));var mt=pt,At=o(7107),kt=o(1273),wt=o(6188);At.Yv.add(wt.Uec,wt.vmR,wt.qcK,wt.ekB);const Dt=(0,i.Ef)(ee);Dt.use(mt),Dt.use(fe),Dt.component("font-awesome-icon",kt.gc),Dt.mount("#app")}},t={};function o(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,i,s,a){if(!i){var n=1/0;for(v=0;v<e.length;v++){i=e[v][0],s=e[v][1],a=e[v][2];for(var r=!0,l=0;l<i.length;l++)(!1&a||n>=a)&&Object.keys(o.O).every((function(e){return o.O[e](i[l])}))?i.splice(l--,1):(r=!1,a<n&&(n=a));if(r){e.splice(v--,1);var c=s();void 0!==c&&(t=c)}}return t}a=a||0;for(var v=e.length;v>0&&e[v-1][2]>a;v--)e[v]=e[v-1];e[v]=[i,s,a]}}(),function(){o.d=function(e,t){for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,a,n=i[0],r=i[1],l=i[2],c=0;if(n.some((function(t){return 0!==e[t]}))){for(s in r)o.o(r,s)&&(o.m[s]=r[s]);if(l)var v=l(o)}for(t&&t(i);c<n.length;c++)a=n[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(v)},i=self["webpackChunknetflix_clone"]=self["webpackChunknetflix_clone"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=o.O(void 0,[504],(function(){return o(5674)}));i=o.O(i)})();
//# sourceMappingURL=app.27361552.js.map