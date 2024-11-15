<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img 
        src="@/assets/logo.png" 
        alt="Logo" 
        class="logo"
      />

      <ul class="nav-links">
        <li>
          <router-link to="/">홈</router-link>
        </li>
        <li>
          <router-link to="/genres">대세 콘텐츠</router-link>
        </li>
        <li>
          <router-link to="/explore">찾아보기</router-link>
        </li>
        <li>
          <router-link to="/my-list">내가 찜한 리스트</router-link>
        </li>
      </ul>
    </div>

    <div class="navbar-right">
      <img
        src="@/assets/profile-icon.png" 
        alt="Profile" 
        class="profile-icon"
        @click="logout"  
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      // 사용자 인증 상태 초기화
      localStorage.removeItem('user'); // localStorage에서 사용자 정보 제거
      
      // Vuex 상태가 있는 경우
      if (this.$store) {
        this.$store.dispatch('logout'); // Vuex의 logout 액션 호출
      }
      
      // 로그인 페이지로 리디렉션
      this.$router.push('/signin');
    }
  }
};
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #141414;
  padding: 10px 20px;
  color: #ffffff;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  margin-right: 20px;
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
}

.nav-links a:hover {
  color: #e50914; 
}

.navbar-right {
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 30px;
  cursor: pointer;
}

.navbar[data-v-41458b80] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7d1010;
  padding: 10px 20px;
  color: #ffffff;
}
</style>
