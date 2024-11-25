<template>
  <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-content">
      <img src="/logo.png" alt="Netflix Logo" class="logo" />
      <ul>
        <li>홈</li>
        <li>대세 콘텐츠</li>
        <li>찾아보기</li>
        <li>내가 찜한 리스트</li>
      </ul>
      <i class="fas fa-user-circle user-icon"></i>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isScrolled: false, // 스크롤 상태
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
      // 스크롤 위치가 50px 이상이면 네비게이션 바를 변경
      this.isScrolled = window.scrollY > 50;
    },
  },
};
</script>

<style scoped>
/* 기본 네비게이션 바 스타일 */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: transparent;
  transition: background 0.3s ease;
  padding: 10px 20px;
  z-index: 100;
}

.navbar-scrolled {
  background: rgba(0, 0, 0, 0.8); /* 스크롤 시 배경색 변경 */
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 30px;
}

ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

ul li {
  color: white;
  cursor: pointer;
}

.user-icon {
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>
