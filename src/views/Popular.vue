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
          Table View
        </button>
        <button
          :class="{ active: currentView === 'PopularInfinite' }"
          @click="switchView('PopularInfinite')"
        >
          무한 스크롤 View
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
  .view-toggle {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .view-toggle button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .view-toggle button.active {
    background-color: #e50914;
  }
  </style>
  