<template>
    <div>
      <!-- Navbar -->
      <Navbar />
  
      <!-- View Toggle Buttons -->
      <div class="view-toggle">
        <button
          :class="{ active: currentView === 'PopularTable' }"
          @click="switchView('PopularTable')"
        >
          📋 Table View
        </button>
        <button
          :class="{ active: currentView === 'PopularInfinite' }"
          @click="switchView('PopularInfinite')"
        >
          📜 무한 스크롤 View
        </button>
      </div>
  
      <!-- Dynamic View Rendering -->
      <component :is="currentView" />
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import PopularTable from "@/views/PopularTable.vue";
  import PopularInfinite from "@/views/PopularInfinite.vue";
  
  export default {
    name: "Popular",
    components: {
      Navbar,
      PopularTable,
      PopularInfinite,
    },
    data() {
      return {
        currentView: "PopularTable", // 기본 Table View
      };
    },
    methods: {
      switchView(view) {
        this.currentView = view;
      },
    },
  };
  </script>
  
  <style scoped>
  /* View Toggle Buttons */
  .view-toggle {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    padding: 10px;
    background: linear-gradient(180deg, #333333, #2c2c2c);
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .view-toggle button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px; /* 아이콘과 텍스트 간격 */
  }
  
  .view-toggle button.active {
    background-color: #e50914; /* 활성화 상태 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border: 2px solid #fff;
  }
  
  .view-toggle button:first-child {
    background-color: #1e90ff; /* Table View 기본 버튼 색 */
  }
  
  .view-toggle button:first-child.active {
    background-color: #104e8b;
  }
  
  .view-toggle button:hover {
    transform: scale(1.05); /* 호버 시 확대 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  }
  </style>
  