<template>
    <footer class="footer">
      <div class="footer-content">
        <!-- 소셜 미디어 링크 -->
        <div class="social-links">
          <a href="https://facebook.com" target="_blank" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://youtube.com" target="_blank" aria-label="YouTube">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
  
        <!-- 푸터 링크 -->
        <ul class="footer-links">
          <li><a href="#">음향 및 자막</a></li>
          <li><a href="#">고객 센터</a></li>
          <li><a href="#">기프트 카드</a></li>
          <li><a href="#">미디어 센터</a></li>
          <li><a href="#">투자 정보</a></li>
          <li><a href="#">입사 정보</a></li>
          <li><a href="#">개인정보</a></li>
          <li><a href="#">법적 고지</a></li>
          <li><a href="#">쿠키 설정</a></li>
          <li><a href="#">회사 정보</a></li>
          <li><a href="#">문의하기</a></li>
        </ul>
  
        <!-- 저작권 정보 -->
        <p class="copyright">
          &copy; 2024 My Netflix Clone. All rights reserved.
        </p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #141414;
    color: #b3b3b3;
    padding: 40px 0;
    text-align: center;
  }
  
  .footer-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .social-links {
    margin-bottom: 20px;
  }
  
  .social-links a {
    color: #b3b3b3;
    font-size: 1.5rem;
    margin: 0 10px;
    transition: color 0.3s ease;
  }
  
  .social-links a:hover {
    color: #e50914;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .footer-links li {
    margin: 10px 15px;
  }
  
  .footer-links a {
    color: #b3b3b3;
    font-size: 0.9rem;
    transition: color 0.3s ease;
    text-decoration: none;
  }
  
  .footer-links a:hover {
    color: #e50914;
  }
  
  .copyright {
    font-size: 0.8rem;
    color: #737373;
    margin-top: 15px;
  }
  </style>
  