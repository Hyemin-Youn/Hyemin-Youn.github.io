<template>
  <nav class="navbar">
    <div
      class="logo"
      @click="goHome"
    >
      <img
        src="@/assets/logo.png"
        alt="Logo"
        class="logo-image"
      >
      <span>홈</span>
    </div>
    <ul class="nav-links">
      <li
        v-for="item in menuItems"
        :key="item.text"
        @click="navigate(item.route)"
      >
        <span>{{ item.text }}</span>
      </li>
    </ul>
    <div
      class="user-icon"
      @click="goProfile"
    >
      <i class="fas fa-user" />
    </div>
  </nav>
</template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        menuItems: [
          { text: '대세 콘텐츠', route: '/trending' },
          { text: '찾아보기', route: '/search' },
          { text: '내가 찜한 리스트', route: '/mylist' }
        ]
      };
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      navigate(route) {
        this.$router.push(route);
      },
      goProfile() {
        this.$router.push('/profile');
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #141414;
    color: #ffffff;
  }
  
  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .logo-image {
    height: 24px;
    margin-right: 8px;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .nav-links li {
    list-style: none;
    cursor: pointer;
    font-size: 1em;
  }
  
  .user-icon {
    font-size: 1.5em;
    cursor: pointer;
  }
  </style>
  