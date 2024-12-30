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
  watch: {
    currentView(newView) {
      // 테이블 뷰일 때 스크롤 비활성화
      if (newView === "PopularTable") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = ""; // 스크롤 활성화 (기본값 복구)
      }
    },
  },
  created() {
    if (this.currentView === "PopularTable") {
      document.body.style.overflow = "hidden";
    }
  },
  beforeDestroy() {
    document.body.style.overflow = "";
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
  padding: 10px;
  background: #222;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.view-toggle button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.view-toggle button.active {
  background-color: #e50914;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  border: 2px solid #fff;
}

.view-toggle button:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
}
</style>
