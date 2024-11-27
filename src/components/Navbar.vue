<template>
  <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-left">
      <router-link to="/home">
<<<<<<< HEAD
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </router-link>

      <ul class="nav-links">
        <li><router-link to="/home">홈</router-link></li>
        <li><router-link to="/popular">대세 콘텐츠</router-link></li>
        <li><router-link to="/search">찾아보기</router-link></li>
        <li><router-link to="/wishlist">내가 찜한 리스트</router-link></li>
=======
        <img
src="@/assets/logo.png"
alt="Logo"
class="logo"
>
      </router-link>

      <ul class="nav-links">
        <li>
<router-link to="/home">
홈
</router-link>
</li>
        <li>
<router-link to="/popular">
대세 콘텐츠
</router-link>
</li>
        <li>
<router-link to="/search">
찾아보기
</router-link>
</li>
        <li>
<router-link to="/wishlist">
내가 찜한 리스트
</router-link>
</li>
>>>>>>> main
      </ul>
    </div>

    <div class="navbar-right">
      <img
        src="@/assets/profile-icon.png"
        alt="Profile"
        class="profile-icon"
        @click="logout"
<<<<<<< HEAD
      />
=======
      >
>>>>>>> main
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false, // 스크롤 상태 관리
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // 스크롤 위치가 50px 이상이면 'isScrolled' 상태를 true로 설정
      this.isScrolled = window.scrollY > 50;
    },
    logout() {
      localStorage.removeItem("user");
      if (this.$store) {
        this.$store.dispatch("logout");
      }
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
/* 기본 설정 */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 가로 스크롤 제거 */
  box-sizing: border-box; /* 모든 엘리먼트의 패딩과 보더 포함 */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 100;
  background-color: gray; /* 초기 배경색 설정 */
  box-sizing: border-box; /* 패딩과 폭 조정 */
}

.navbar-scrolled {
  background-color: rgba(125, 16, 16, 0.9); /* 스크롤 후 배경색 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* 스크롤 후 그림자 추가 */
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  margin-right: 20px;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links li {
  list-style: none;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #e50914;
}

.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}

.profile-icon {
  width: 30px;
  cursor: pointer;
}

/* 배너 영역 수정 */
.banner {
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background-size: cover;
  background-position: center;
  color: white;
  box-sizing: border-box; /* 배너 패딩 포함 */
}

.banner-content {
  max-width: 50%;
}

.banner-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.banner-description {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.banner-buttons {
  display: flex;
  gap: 10px;
}

/* 가로 스크롤 제거 */
.slider-content {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  scroll-behavior: smooth;
  padding: 10px 0;
  scrollbar-width: none; /* Firefox 스크롤바 숨기기 */
}

.slider-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge 스크롤바 숨기기 */
}
</style>


