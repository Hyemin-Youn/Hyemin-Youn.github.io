<template>
    <nav class="navbar">
      <div class="navbar-left">
        <!-- 로고 -->
        <img 
        src="@/assets/logo.png" 
        alt="Logo" 
        class="logo" >
        
        <!-- 메뉴 -->
        <ul class="nav-links">
          <li><router-link to="/">홈</router-link></li>
          <li><router-link to="/genres">대세 콘텐츠</router-link></li>
          <li><router-link to="/explore">찾아보기</router-link></li>
          <li><router-link to="/my-list">내가 찜한 리스트</router-link></li>
        </ul>
      </div>
      
      <!-- 프로필 아이콘 -->
      <div class="navbar-right">
        <img src="@/assets/profile-icon.png" 
        alt="Profile" 
        class="profile-icon" >
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar"
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
    color: #e50914; /* 빨간색 강조 효과 */
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
  }
  
  .profile-icon {
    width: 30px;
    cursor: pointer;
  }
  </style>
  