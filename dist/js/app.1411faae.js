(function(){"use strict";var e={7974:function(e,t,o){var s=o(3751),i=o(641);const r={id:"app"};function a(e,t,o,s,a,n){const l=(0,i.g2)("Navbar"),c=(0,i.g2)("router-view");return(0,i.uX)(),(0,i.CE)("div",r,[(0,i.bF)(l),(0,i.bF)(c)])}var n=o(33);const l={class:"banner-content"},c={class:"banner-title"},v={class:"banner-description"},d={class:"banner-buttons"};function u(e,t,o,s,r,a){return(0,i.uX)(),(0,i.CE)("div",{class:"banner",style:(0,n.Tr)({backgroundImage:`url(${a.bannerImage})`})},[(0,i.Lk)("div",l,[(0,i.Lk)("h1",c,(0,n.v_)(o.heroMovie.title),1),(0,i.Lk)("p",v,(0,n.v_)(o.heroMovie.overview||"영화에 대한 설명이 없습니다."),1),(0,i.Lk)("div",d,[(0,i.Lk)("button",{class:"banner-button play",onClick:t[0]||(t[0]=(...e)=>a.playMovie&&a.playMovie(...e))}," 재생 "),(0,i.Lk)("button",{class:"banner-button info",onClick:t[1]||(t[1]=(...e)=>a.showDetails&&a.showDetails(...e))}," 상세 정보 ")])]),t[2]||(t[2]=(0,i.Lk)("div",{class:"banner-fade"},null,-1))],4)}o(4114);var h={name:"Banner",props:{heroMovie:{type:Object,required:!0}},computed:{bannerImage(){return this.heroMovie.backdrop_path?`https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`:""}},methods:{playMovie(){console.log("Play movie:",this.heroMovie.title)},showDetails(){this.heroMovie.id?this.$router.push(`/movie/${this.heroMovie.id}`):console.error("Movie ID is not available")}}},g=o(6262);const m=(0,g.A)(h,[["render",u],["__scopeId","data-v-79bd4bdb"]]);var p=m;const A={class:"home"},k={key:0,class:"loading-overlay"},D={key:1};function N(e,t,o,s,r,a){const l=(0,i.g2)("Navbar"),c=(0,i.g2)("Banner"),v=(0,i.g2)("SliderContent");return(0,i.uX)(),(0,i.CE)("div",null,[(0,i.bF)(l),(0,i.Lk)("div",A,[r.isLoading?((0,i.uX)(),(0,i.CE)("div",k,t[0]||(t[0]=[(0,i.Lk)("p",null,"로딩중...",-1)]))):((0,i.uX)(),(0,i.CE)("div",D,[(0,i.bF)(c,{heroMovie:r.heroMovie},null,8,["heroMovie"]),((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(r.movieCategories,(e=>((0,i.uX)(),(0,i.CE)("div",{key:e.name,class:"movie-category"},[(0,i.Lk)("h3",null,(0,n.v_)(e.title),1),(0,i.bF)(v,{movies:e.movies},null,8,["movies"])])))),128))]))])])}o(1454);var R=o(4335),w="data:image/png;base64,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",y="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJQSURBVFiFxdfJjw1RFAbwXzdaaEQT87ATU4wxLMTGuhNtRf8BSMTG9C+IhcSGJQs7IYi9xDyFBdJIRAgRM4khHTE8i3vKe6T1q1dVHV9yclO3zne+U/dWnXuK1rEah3Afn8Pu4SBWFYiXG104jlqDvQnLrn/iGMZXLT4ND0LkMTZjYsP9iTH3JHweYGpV4iNwLQKfROcgvp04Fb5Xg1sa2yPgBXTk8O/ApeBsKyveJi3rDyxsgbcoOI/LJrBUepLzBbgXg7t4MKf2JkHmxXilQAKXY5xfJoGuGD8USOB9jBPKJPA2xskFEpgS4+sC3N+YK+3jzQLcW8GdUyYB6ItAa1rgrA3O3bLi0BvB+jAuh/846WyoYWMVCbThjHp1mz6I7wz1qnk6uJVgrFQJa/iIvViBMWErY+5T+JwLTqXowD70+/NEbLT+SCT3GVBkiWZKe7sOs2PuKc5KR/HzAjH/H1pdgXapKE3BpL/uvcGrsFr51OpoQzeO4p1/739m78K3W44HbOawFvvVe71+3MZL9VYsi5OtzBKMivnr2C31By1jF76HyBWsx+gcvNHokWpGLWLsbFX8gPo3v6lVcgN6I0YtYubC1iC80OQsz4kF0pbVsCWP81epoi2rQDzDcun/4at6kzMgso52R4XiGfZE7BP/clgo/Vg8xPAhSGAEHoXGgmyysSPaIH1Oh6U3t2p8w5HQ6BnI4bK0RHOHQDzD/NC4ONDN19KL0qxPLINh+CJ9FahXwuHSG/oDz4YwAZgViYzUsNXtuKN5na/KboSmX8iAsy1IrQKsAAAAAElFTkSuQmCC";const E={class:"navbar-left"},b={class:"nav-links"},f={class:"navbar-right"};function L(e,t,o,s,r,a){const l=(0,i.g2)("router-link");return(0,i.uX)(),(0,i.CE)("nav",{class:(0,n.C4)(["navbar",{"navbar-scrolled":r.isScrolled}])},[(0,i.Lk)("div",E,[(0,i.bF)(l,{to:"/home"},{default:(0,i.k6)((()=>t[1]||(t[1]=[(0,i.Lk)("img",{src:w,alt:"Logo",class:"logo"},null,-1)]))),_:1}),(0,i.Lk)("ul",b,[(0,i.Lk)("li",null,[(0,i.bF)(l,{to:"/home"},{default:(0,i.k6)((()=>t[2]||(t[2]=[(0,i.eW)(" 홈 ")]))),_:1})]),(0,i.Lk)("li",null,[(0,i.bF)(l,{to:"/popular"},{default:(0,i.k6)((()=>t[3]||(t[3]=[(0,i.eW)(" 대세 콘텐츠 ")]))),_:1})]),(0,i.Lk)("li",null,[(0,i.bF)(l,{to:"/search"},{default:(0,i.k6)((()=>t[4]||(t[4]=[(0,i.eW)(" 찾아보기 ")]))),_:1})]),(0,i.Lk)("li",null,[(0,i.bF)(l,{to:"/wishlist"},{default:(0,i.k6)((()=>t[5]||(t[5]=[(0,i.eW)(" 내가 찜한 리스트 ")]))),_:1})])])]),(0,i.Lk)("div",f,[(0,i.Lk)("img",{src:y,alt:"Profile",class:"profile-icon",onClick:t[0]||(t[0]=(...e)=>a.logout&&a.logout(...e))})])],2)}var S={name:"Navbar",data(){return{isScrolled:!1}},mounted(){window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll(){this.isScrolled=window.scrollY>50},logout(){localStorage.removeItem("user"),this.$store&&this.$store.dispatch("logout"),this.$router.push("/signin")}}};const M=(0,g.A)(S,[["render",L],["__scopeId","data-v-bf0166f8"]]);var C=M;const I={class:"slider-container"},P={ref:"slider",class:"slider-content"};function B(e,t,o,s,r,a){const n=(0,i.g2)("MovieCard");return(0,i.uX)(),(0,i.CE)("div",I,[(0,i.Lk)("button",{class:"arrow-btn left",onClick:t[0]||(t[0]=(...e)=>s.scrollLeft&&s.scrollLeft(...e))},t[2]||(t[2]=[(0,i.Lk)("i",{class:"fas fa-chevron-left"},null,-1)])),(0,i.Lk)("div",P,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(o.movies,(e=>((0,i.uX)(),(0,i.Wv)(n,{key:e.id,movie:e},null,8,["movie"])))),128))],512),(0,i.Lk)("button",{class:"arrow-btn right",onClick:t[1]||(t[1]=(...e)=>s.scrollRight&&s.scrollRight(...e))},t[3]||(t[3]=[(0,i.Lk)("i",{class:"fas fa-chevron-right"},null,-1)]))])}var T=o(953);const Q={class:"movie-card"},H=["src","alt"],O={class:"movie-info"},_={class:"movie-title"},V={class:"release-date"},W={key:0,class:"movie-rating"};function X(e,t,o,r,a,l){return(0,i.uX)(),(0,i.CE)("div",Q,[(0,i.Lk)("img",{src:l.posterUrl,alt:o.movie.title,class:"poster"},null,8,H),(0,i.Lk)("div",O,[(0,i.Lk)("p",_,(0,n.v_)(o.movie.title),1),(0,i.Lk)("p",V," 개봉일: "+(0,n.v_)(l.formattedReleaseDate),1),o.movie.vote_average?((0,i.uX)(),(0,i.CE)("div",W," ⭐ "+(0,n.v_)(o.movie.vote_average)+" / 10 ",1)):(0,i.Q3)("",!0)]),(0,i.Lk)("span",{class:"wishlist-icon",onClick:t[0]||(t[0]=(0,s.D$)(((...e)=>l.handleWishlist&&l.handleWishlist(...e)),["stop"]))},[(0,i.Lk)("i",{class:(0,n.C4)(e.isInWishlist(o.movie.id)?"fas fa-heart liked":"far fa-heart")},null,2)])])}var J=o(6278),U={props:{movie:{type:Object,required:!0}},computed:{...(0,J.L8)(["isInWishlist"]),posterUrl(){return`https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`},formattedReleaseDate(){if(!this.movie.release_date)return"알 수 없음";const e={year:"numeric",month:"long",day:"numeric"};return new Date(this.movie.release_date).toLocaleDateString("ko-KR",e)}},methods:{...(0,J.i0)(["toggleWishlist"]),handleWishlist(){this.toggleWishlist(this.movie)}}};const Y=(0,g.A)(U,[["render",X],["__scopeId","data-v-7d36438e"]]);var F=Y,G={components:{MovieCard:F},props:{movies:{type:Array,required:!0}},setup(){const e=(0,T.KR)(null),t=()=>{e.value&&e.value.scrollBy({left:-300,behavior:"smooth"})},o=()=>{e.value&&e.value.scrollBy({left:300,behavior:"smooth"})};return{slider:e,scrollLeft:t,scrollRight:o}}};const K=(0,g.A)(G,[["render",B],["__scopeId","data-v-7a43e855"]]);var x=K,z={name:"Home",components:{Banner:p,Navbar:C,SliderContent:x},data(){return{isLoading:!0,heroMovie:{},movieCategories:[{name:"popular",title:"인기 영화",movies:[]},{name:"now_playing",title:"최신 영화",movies:[]},{name:"top_rated",title:"높은 평점 영화",movies:[]},{name:"upcoming",title:"개봉 예정 영화",movies:[]}]}},created(){this.loadData()},methods:{async loadData(){try{await Promise.all([this.fetchHeroMovie(),this.fetchMovies()])}catch(e){console.error("Error loading data:",e)}finally{this.isLoading=!1}},async fetchHeroMovie(){const e="75b7c972001662bd9d37622e0e222947";try{const t=await R.A.get(`https://api.themoviedb.org/3/movie/popular?api_key=${e}&language=ko-KR`);this.heroMovie=t.data.results[0]}catch(t){console.error("Hero Movie 로드 실패:",t)}},async fetchMovies(){const e="75b7c972001662bd9d37622e0e222947";try{const t=this.movieCategories.map((async t=>{const o=await R.A.get(`https://api.themoviedb.org/3/movie/${t.name}?api_key=${e}&language=ko-KR`);t.movies=o.data.results}));await Promise.all(t)}catch(t){console.error("Movie Categories 로드 실패:",t)}}}};const j=(0,g.A)(z,[["render",N],["__scopeId","data-v-f8e502b6"]]);var Z=j,q={components:{Banner:p,Home:Z}};const $=(0,g.A)(q,[["render",a]]);var ee=$,te=o(5220);const oe={class:"wrapper"},se={class:"content"},ie={key:0,class:"error"},re={class:"remember-me"},ae={class:"content"},ne={key:0,class:"error"},le={class:"terms"},ce=["disabled"];function ve(e,t,o,r,a,l){return(0,i.uX)(),(0,i.CE)("div",null,[t[23]||(t[23]=(0,i.Lk)("div",{class:"bg-image"},null,-1)),(0,i.Lk)("div",oe,[(0,i.Lk)("div",{class:(0,n.C4)(["card",{active:"login"===a.activeCard,backward:"signup"===a.activeCard}])},[(0,i.Lk)("div",se,[t[16]||(t[16]=(0,i.Lk)("h2",null,"Login",-1)),(0,i.Lk)("form",{onSubmit:t[3]||(t[3]=(0,s.D$)(((...e)=>l.handleLogin&&l.handleLogin(...e)),["prevent"]))},[t[12]||(t[12]=(0,i.Lk)("label",{for:"email"},"Email",-1)),(0,i.bo)((0,i.Lk)("input",{id:"email","onUpdate:modelValue":t[0]||(t[0]=e=>a.email=e),type:"email",required:""},null,512),[[s.Jo,a.email]]),t[13]||(t[13]=(0,i.Lk)("label",{for:"password"},"Password",-1)),(0,i.bo)((0,i.Lk)("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),type:"password",required:""},null,512),[[s.Jo,a.password]]),a.loginError?((0,i.uX)(),(0,i.CE)("p",ie,(0,n.v_)(a.loginError),1)):(0,i.Q3)("",!0),(0,i.Lk)("div",re,[(0,i.bo)((0,i.Lk)("input",{id:"rememberMe","onUpdate:modelValue":t[2]||(t[2]=e=>a.rememberMe=e),type:"checkbox"},null,512),[[s.lH,a.rememberMe]]),t[11]||(t[11]=(0,i.Lk)("label",{for:"rememberMe"},"Remember Me",-1))]),t[14]||(t[14]=(0,i.Lk)("button",{type:"submit"}," Sign In ",-1))],32),(0,i.Lk)("p",{class:"switch",onClick:t[4]||(t[4]=(...e)=>l.switchToSignup&&l.switchToSignup(...e))},t[15]||(t[15]=[(0,i.eW)(" Don't have an account? "),(0,i.Lk)("b",null,"Sign up",-1)]))])],2),(0,i.Lk)("div",{class:(0,n.C4)(["card",{active:"signup"===a.activeCard,backward:"login"===a.activeCard}])},[(0,i.Lk)("div",ae,[t[22]||(t[22]=(0,i.Lk)("h2",null,"Sign Up",-1)),(0,i.Lk)("form",{onSubmit:t[9]||(t[9]=(0,s.D$)(((...e)=>l.handleRegister&&l.handleRegister(...e)),["prevent"]))},[t[18]||(t[18]=(0,i.Lk)("label",{for:"newEmail"},"Email",-1)),(0,i.bo)((0,i.Lk)("input",{id:"newEmail","onUpdate:modelValue":t[5]||(t[5]=e=>a.newEmail=e),type:"email",required:""},null,512),[[s.Jo,a.newEmail]]),t[19]||(t[19]=(0,i.Lk)("label",{for:"newPassword"},"Password",-1)),(0,i.bo)((0,i.Lk)("input",{id:"newPassword","onUpdate:modelValue":t[6]||(t[6]=e=>a.newPassword=e),type:"password",required:""},null,512),[[s.Jo,a.newPassword]]),t[20]||(t[20]=(0,i.Lk)("label",{for:"confirmPassword"},"Confirm Password",-1)),(0,i.bo)((0,i.Lk)("input",{id:"confirmPassword","onUpdate:modelValue":t[7]||(t[7]=e=>a.confirmPassword=e),type:"password",required:""},null,512),[[s.Jo,a.confirmPassword]]),a.signupError?((0,i.uX)(),(0,i.CE)("p",ne,(0,n.v_)(a.signupError),1)):(0,i.Q3)("",!0),(0,i.Lk)("div",le,[(0,i.bo)((0,i.Lk)("input",{id:"terms","onUpdate:modelValue":t[8]||(t[8]=e=>a.termsAccepted=e),type:"checkbox"},null,512),[[s.lH,a.termsAccepted]]),t[17]||(t[17]=(0,i.Lk)("label",{for:"terms"},[(0,i.eW)("I have read the "),(0,i.Lk)("b",null,"Terms and Conditions")],-1))]),(0,i.Lk)("button",{type:"submit",disabled:!a.termsAccepted}," Register ",8,ce)],32),(0,i.Lk)("p",{class:"switch",onClick:t[10]||(t[10]=(...e)=>l.switchToLogin&&l.switchToLogin(...e))},t[21]||(t[21]=[(0,i.eW)(" Already have an account? "),(0,i.Lk)("b",null,"Sign in",-1)]))])],2)])])}o(8992),o(3949);var de={data(){return{activeCard:"login",email:"",password:"",rememberMe:!1,loginError:"",newEmail:"",newPassword:"",confirmPassword:"",termsAccepted:!1,signupError:""}},methods:{switchToSignup(){this.activeCard="signup",this.triggerCardAnimation()},switchToLogin(){this.activeCard="login",this.triggerCardAnimation()},triggerCardAnimation(){const e=document.querySelectorAll(".card");e.forEach((e=>{e.classList.contains("active")?(e.classList.remove("active"),e.classList.add("backward")):(e.classList.remove("backward"),e.classList.add("enter"),setTimeout((()=>{e.classList.remove("enter"),e.classList.add("active")}),1e3))}))},handleLogin(){this.password.length<6?this.loginError="Password must be at least 6 characters long.":(alert("Login successful!"),this.$store.dispatch("login",{email:this.email}),"/home"!==this.$route.path&&this.$router.push("/home"))},handleRegister(){this.newPassword.length<6?this.signupError="Password must be at least 6 characters long.":this.newPassword===this.confirmPassword?(alert("Registration successful!"),this.switchToLogin()):this.signupError="Passwords do not match."}}};const ue=(0,g.A)(de,[["render",ve],["__scopeId","data-v-4ecefb14"]]);var he=ue;const ge={class:"wishlist"},me={key:0,class:"empty-wishlist"},pe={key:1,class:"wishlist-movies"},Ae={class:"movie-info"},ke=["onClick"];function De(e,t,o,s,r,a){const l=(0,i.g2)("Navbar");return(0,i.uX)(),(0,i.CE)("div",ge,[(0,i.bF)(l),t[1]||(t[1]=(0,i.Lk)("h2",null,"내가 찜한 콘텐츠",-1)),0===s.wishlist.length?((0,i.uX)(),(0,i.CE)("div",me,t[0]||(t[0]=[(0,i.Lk)("p",null,"찜한 영화가 없습니다.",-1)]))):((0,i.uX)(),(0,i.CE)("div",pe,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.wishlist,(e=>((0,i.uX)(),(0,i.CE)("div",{key:e.id,class:"wishlist-movie",style:(0,n.Tr)({backgroundImage:`url(https://image.tmdb.org/t/p/w500/${e.poster_path})`})},[(0,i.Lk)("div",Ae,[(0,i.Lk)("h4",null,(0,n.v_)(e.title),1),(0,i.Lk)("button",{class:"remove-btn",onClick:t=>s.toggleWishlist(e)}," 삭제 ",8,ke)])],4)))),128))]))])}var Ne={name:"WishList",components:{Navbar:C},setup(){const e=(0,J.Pj)(),t=(0,i.EW)((()=>e.getters.wishlist)),o=t=>{e.dispatch("toggleWishlist",t)};return{wishlist:t,toggleWishlist:o}}};const Re=(0,g.A)(Ne,[["render",De],["__scopeId","data-v-1c034802"]]);var we=Re;o(7550);const ye=(0,J.y$)({state:{user:JSON.parse(localStorage.getItem("user"))||null,isAuthenticated:!!localStorage.getItem("user"),wishlist:JSON.parse(localStorage.getItem("wishlist"))||[],searchHistory:JSON.parse(localStorage.getItem("searchHistory"))||[],viewHistory:JSON.parse(localStorage.getItem("viewHistory"))||[],selectedOptions:{originalLanguage:"장르 (전체)",translationLanguage:"평점 (전체)",sorting:"언어 (전체)"},movies:[],currentPage:1,totalPages:1,loading:!1,searchQuery:"",errorMessage:""},mutations:{setUser(e,t){e.user=t,e.isAuthenticated=!!t,t?localStorage.setItem("user",JSON.stringify(t)):localStorage.removeItem("user")},logout(e){e.user=null,e.isAuthenticated=!1,localStorage.removeItem("user")},TOGGLE_WISHLIST(e,t){const o=e.wishlist.findIndex((e=>e.id===t.id));-1===o?e.wishlist.push(t):e.wishlist.splice(o,1),localStorage.setItem("wishlist",JSON.stringify(e.wishlist))},ADD_SEARCH_HISTORY(e,t){e.searchHistory.includes(t)||(e.searchHistory.push(t),localStorage.setItem("searchHistory",JSON.stringify(e.searchHistory)))},ADD_VIEW_HISTORY(e,t){e.viewHistory.some((e=>e.id===t.id))||(e.viewHistory.push(t),localStorage.setItem("viewHistory",JSON.stringify(e.viewHistory)))},SET_SELECTED_OPTIONS(e,{key:t,value:o}){e.selectedOptions[t]=o},SET_MOVIES(e,t){e.movies=t},APPEND_MOVIES(e,t){e.movies=[...e.movies,...t]},SET_PAGINATION(e,{currentPage:t,totalPages:o}){e.currentPage=t,e.totalPages=o},SET_LOADING(e,t){e.loading=t},SET_SEARCH_QUERY(e,t){e.searchQuery=t},SET_ERROR(e,t){e.errorMessage=t}},actions:{toggleWishlist({commit:e},t){e("TOGGLE_WISHLIST",t)},addSearchHistory({commit:e},t){e("ADD_SEARCH_HISTORY",t)},addViewHistory({commit:e},t){e("ADD_VIEW_HISTORY",t)},setSelectedOptions({commit:e},{key:t,value:o}){e("SET_SELECTED_OPTIONS",{key:t,value:o})},async fetchMovies({state:e,commit:t},{page:o=1,append:s=!1}){if(!e.loading){t("SET_LOADING",!0),t("SET_ERROR","");try{const i={query:encodeURIComponent(e.searchQuery),page:o},r="your_tmdb_api_key",a=`https://api.themoviedb.org/3/search/movie?query=${i.query}&page=${i.page}&api_key=${r}`;console.log("API 요청 URL:",a);const n=await fetch(a);if(!n.ok)throw new Error("API 호출 실패");const l=await n.json();t(s?"APPEND_MOVIES":"SET_MOVIES",l.results),t("SET_PAGINATION",{currentPage:o,totalPages:l.total_pages})}catch(i){console.error("API 호출 실패:",i),t("SET_ERROR","영화 데이터를 불러오는 중 오류가 발생했습니다.")}finally{t("SET_LOADING",!1)}}}},getters:{wishlist:e=>e.wishlist,isInWishlist:e=>t=>e.wishlist.some((e=>e.id===t)),searchHistory:e=>e.searchHistory,viewHistory:e=>e.viewHistory,selectedOptions:e=>e.selectedOptions,movies:e=>e.movies,currentPage:e=>e.currentPage,totalPages:e=>e.totalPages,loading:e=>e.loading,searchQuery:e=>e.searchQuery,errorMessage:e=>e.errorMessage}});var Ee=ye;const be={key:0,class:"movie-detail"},fe=["src"],Le={class:"content"};function Se(e,t,o,s,r,a){return r.movie?((0,i.uX)(),(0,i.CE)("div",be,[(0,i.Lk)("img",{src:a.makeImagePath(r.movie.backdrop_path,"w1280"),alt:"Movie Background"},null,8,fe),(0,i.Lk)("div",Le,[(0,i.Lk)("h2",null,(0,n.v_)(r.movie.title),1),(0,i.Lk)("p",null,(0,n.v_)(r.movie.overview),1),(0,i.Lk)("p",null,"개봉일: "+(0,n.v_)(r.movie.release_date),1),(0,i.Lk)("p",null,"평점: ⭐ "+(0,n.v_)(r.movie.vote_average),1)])])):(0,i.Q3)("",!0)}var Me={data(){return{movie:null}},created(){this.fetchMovieDetail()},methods:{async fetchMovieDetail(){const e="75b7c972001662bd9d37622e0e222947",t=this.$route.params.id;try{const o=await R.A.get(`https://api.themoviedb.org/3/movie/${t}?api_key=${e}&language=ko-KR`);this.movie=o.data}catch(o){console.error("Error fetching movie details:",o)}},makeImagePath(e,t){return`https://image.tmdb.org/t/p/${t}${e}`}}};const Ce=(0,g.A)(Me,[["render",Se],["__scopeId","data-v-06c832ca"]]);var Ie=Ce;const Pe={class:"search-page"},Be={class:"search-bar"},Te={key:0,class:"recent-searches"},Qe=["onClick"],He={class:"movie-grid"},Oe={key:1,class:"loading"},_e={key:2,class:"no-results"},Ve={key:3,class:"error-message"};function We(e,t,o,r,a,l){const c=(0,i.g2)("Navbar"),v=(0,i.g2)("MovieCard");return(0,i.uX)(),(0,i.CE)("div",Pe,[(0,i.bF)(c),(0,i.Lk)("div",Be,[(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>l.searchQuery=e),type:"text",placeholder:"영화 제목을 검색하세요",onKeydown:t[1]||(t[1]=(0,s.jR)(((...e)=>l.handleSearch&&l.handleSearch(...e)),["enter"]))},null,544),[[s.Jo,l.searchQuery]]),(0,i.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>l.handleSearch&&l.handleSearch(...e))},"검색")]),l.recentSearches.length?((0,i.uX)(),(0,i.CE)("div",Te,[t[3]||(t[3]=(0,i.Lk)("h2",null,"최근 검색어",-1)),(0,i.Lk)("ul",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(l.recentSearches,((e,t)=>((0,i.uX)(),(0,i.CE)("li",{key:t,onClick:t=>l.searchFromHistory(e)},(0,n.v_)(e),9,Qe)))),128))])])):(0,i.Q3)("",!0),(0,i.Lk)("div",He,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.movies,(t=>((0,i.uX)(),(0,i.Wv)(v,{key:t.id,movie:t,onToggleWishlist:o=>e.toggleWishlist(t),onAddViewHistory:o=>e.addViewHistory(t)},null,8,["movie","onToggleWishlist","onAddViewHistory"])))),128))]),e.loading?((0,i.uX)(),(0,i.CE)("div",Oe,"로딩 중...")):(0,i.Q3)("",!0),e.loading||0!==e.movies.length||e.errorMessage?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.CE)("div",_e," 검색 결과가 없습니다. ")),e.errorMessage?((0,i.uX)(),(0,i.CE)("div",Ve,(0,n.v_)(e.errorMessage),1)):(0,i.Q3)("",!0)])}var Xe={name:"Search",components:{Navbar:C,MovieCard:F},computed:{...(0,J.L8)(["movies","loading","searchHistory","wishlist","errorMessage"]),searchQuery:{get(){return this.$store.getters.searchQuery},set(e){this.$store.commit("SET_SEARCH_QUERY",e)}},recentSearches(){return this.searchHistory.slice().reverse()}},methods:{...(0,J.i0)(["fetchMovies","addSearchHistory","toggleWishlist","addViewHistory"]),async handleSearch(){this.searchQuery.trim()&&(this.addSearchHistory(this.searchQuery),await this.fetchMovies({page:1}))},searchFromHistory(e){this.searchQuery=e,this.handleSearch()}},created(){this.fetchMovies({page:1})}};const Je=(0,g.A)(Xe,[["render",We],["__scopeId","data-v-76c671a0"]]);var Ue=Je;const Ye={class:"popular"},Fe={class:"movie-grid"},Ge={key:0,class:"loading"};function Ke(e,t,o,s,r,a){const n=(0,i.g2)("MovieCard");return(0,i.uX)(),(0,i.CE)("div",Ye,[(0,i.Lk)("div",Fe,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(r.movies,(e=>((0,i.uX)(),(0,i.Wv)(n,{key:e.id,movie:e},null,8,["movie"])))),128))]),r.loading?((0,i.uX)(),(0,i.CE)("div",Ge," 로딩 중... ")):(0,i.Q3)("",!0),r.showScrollTopButton?((0,i.uX)(),(0,i.CE)("button",{key:1,class:"scroll-top",onClick:t[0]||(t[0]=(...e)=>a.scrollToTop&&a.scrollToTop(...e))}," TOP(위로) ")):(0,i.Q3)("",!0)])}const xe="75b7c972001662bd9d37622e0e222947",ze="https://api.themoviedb.org/3",je=async(e=1)=>{try{const t=await R.A.get(`${ze}/movie/popular`,{params:{api_key:xe,language:"ko-KR",page:e}});return t.data}catch(t){return console.error("Error fetching popular movies:",t),{results:[]}}};var Ze={name:"PopularInfinite",components:{MovieCard:F},data(){return{movies:[],currentPage:1,totalPages:1,loading:!1,showScrollTopButton:!1}},created(){this.fetchMovies(),window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll)},methods:{async fetchMovies(e=1){if(this.loading||e>this.totalPages)return;this.loading=!0;const t=await je(e);this.movies=[...this.movies,...t.results],this.currentPage=e,this.totalPages=t.total_pages,this.loading=!1},handleScroll(){const e=window.innerHeight+window.scrollY>=document.body.offsetHeight-100;e&&this.currentPage<this.totalPages&&this.fetchMovies(this.currentPage+1),this.showScrollTopButton=window.scrollY>300},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}}};const qe=(0,g.A)(Ze,[["render",Ke],["__scopeId","data-v-bf02447a"]]);var $e=qe;const et={class:"popular"},tt={class:"movie-grid"},ot={class:"pagination"},st=["disabled"],it=["disabled"];function rt(e,t,o,s,r,a){const l=(0,i.g2)("MovieCard");return(0,i.uX)(),(0,i.CE)("div",et,[(0,i.Lk)("div",tt,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(a.paginatedMovies,(e=>((0,i.uX)(),(0,i.Wv)(l,{key:e.id,movie:e},null,8,["movie"])))),128))]),(0,i.Lk)("div",ot,[(0,i.Lk)("button",{disabled:1===r.currentPage,onClick:t[0]||(t[0]=e=>a.changePage(r.currentPage-1))}," < 이전 ",8,st),(0,i.Lk)("span",null,(0,n.v_)(r.currentPage)+" / "+(0,n.v_)(r.totalPages),1),(0,i.Lk)("button",{disabled:r.currentPage===r.totalPages,onClick:t[1]||(t[1]=e=>a.changePage(r.currentPage+1))}," 다음 > ",8,it)])])}var at={name:"PopularTable",components:{MovieCard:F},data(){return{movies:[],currentPage:1,totalPages:1,moviesPerPage:this.calculateMoviesPerPage()}},computed:{paginatedMovies(){const e=(this.currentPage-1)*this.moviesPerPage,t=e+this.moviesPerPage;return this.movies.slice(e,t)}},created(){this.fetchMovies(),window.addEventListener("resize",this.handleResize)},beforeDestroy(){window.removeEventListener("resize",this.handleResize)},methods:{async fetchMovies(){try{const e=3;let t=[];for(let o=1;o<=e;o++){const e=await je(o);t=[...t,...e.results]}this.movies=t,this.totalPages=Math.ceil(this.movies.length/this.moviesPerPage)}catch(e){console.error("Error fetching movies:",e)}},changePage(e){e>0&&e<=this.totalPages&&(this.currentPage=e)},calculateMoviesPerPage(){return window.innerWidth<=480?9:window.innerWidth<=768?6:10},handleResize(){this.moviesPerPage=this.calculateMoviesPerPage(),this.totalPages=Math.ceil(this.movies.length/this.moviesPerPage)}}};const nt=(0,g.A)(at,[["render",rt],["__scopeId","data-v-5eddb2cc"]]);var lt=nt;const ct={class:"view-toggle"};function vt(e,t,o,s,r,a){const l=(0,i.g2)("Navbar");return(0,i.uX)(),(0,i.CE)("div",null,[(0,i.bF)(l),(0,i.Lk)("div",ct,[(0,i.Lk)("button",{class:(0,n.C4)({active:"PopularTable"===r.currentView}),onClick:t[0]||(t[0]=e=>a.switchView("PopularTable"))}," 📋 Table View ",2),(0,i.Lk)("button",{class:(0,n.C4)({active:"PopularInfinite"===r.currentView}),onClick:t[1]||(t[1]=e=>a.switchView("PopularInfinite"))}," 📜 무한 스크롤 View ",2)]),((0,i.uX)(),(0,i.Wv)((0,i.$y)(r.currentView)))])}var dt={name:"Popular",components:{Navbar:C,PopularTable:lt,PopularInfinite:$e},data(){return{currentView:"PopularTable"}},watch:{currentView(e){document.body.style.overflow="PopularTable"===e?"hidden":""}},created(){"PopularTable"===this.currentView&&(document.body.style.overflow="hidden")},beforeDestroy(){document.body.style.overflow=""},methods:{switchView(e){this.currentView=e}}};const ut=(0,g.A)(dt,[["render",vt],["__scopeId","data-v-773d82cf"]]);var ht=ut;const gt=[{path:"/signin",name:"SignIn",component:he,meta:{hideNavbar:!0}},{path:"/home",name:"Home",component:Z,meta:{requiresAuth:!0}},{path:"/",redirect:"/signin"},{path:"/movies/:id",component:Ie},{path:"/wishlist",name:"Wishlist",component:we},{path:"/slider",name:"SliderContent",component:x},{path:"/popular",component:ht,redirect:"/popular/table",children:[{path:"table",component:lt},{path:"infinite",component:$e}]},{path:"/search",name:"Search",component:Ue}],mt=(0,te.aE)({history:(0,te.Bt)(),routes:gt});mt.beforeEach(((e,t,o)=>{const s=Ee.getters.isAuthenticated;"SignIn"===e.name&&s?o("/home"):o()}));var pt=mt,At=o(7107),kt=o(1273),Dt=o(6188);At.Yv.add(Dt.Uec,Dt.vmR,Dt.qcK,Dt.ekB);const Nt=(0,s.Ef)(ee);Nt.use(pt),Nt.use(Ee),Nt.component("FontAwesomeIcon",kt.gc),Nt.mount("#app")}},t={};function o(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,s,i,r){if(!s){var a=1/0;for(v=0;v<e.length;v++){s=e[v][0],i=e[v][1],r=e[v][2];for(var n=!0,l=0;l<s.length;l++)(!1&r||a>=r)&&Object.keys(o.O).every((function(e){return o.O[e](s[l])}))?s.splice(l--,1):(n=!1,r<a&&(a=r));if(n){e.splice(v--,1);var c=i();void 0!==c&&(t=c)}}return t}r=r||0;for(var v=e.length;v>0&&e[v-1][2]>r;v--)e[v]=e[v-1];e[v]=[s,i,r]}}(),function(){o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,r,a=s[0],n=s[1],l=s[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(i in n)o.o(n,i)&&(o.m[i]=n[i]);if(l)var v=l(o)}for(t&&t(s);c<a.length;c++)r=a[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(v)},s=self["webpackChunknetflix_clone"]=self["webpackChunknetflix_clone"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=o.O(void 0,[504],(function(){return o(7974)}));s=o.O(s)})();
//# sourceMappingURL=app.1411faae.js.map