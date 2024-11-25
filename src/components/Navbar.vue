<template>
  <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-left">
      <router-link to="/home">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </router-link>

      <ul class="nav-links">
        <li><router-link to="/home">홈</router-link></li>
        <li><router-link to="/popular">대세 콘텐츠</router-link></li>
        <li><router-link to="/search">찾아보기</router-link></li>
        <li><router-link to="/wishlist">내가 찜한 리스트</router-link></li>
      </ul>
    </div>

    <div class="navbar-right">
      <img
        src="@/assets/profile-icon.png"
        alt="Profile"
        class="profile-icon"
        @click="logout"
      />
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 100;
  background-color: transparent; /* 초기 배경 투명 */
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

.profile-icon {
  width: 30px;
  cursor: pointer;
}
</style>
