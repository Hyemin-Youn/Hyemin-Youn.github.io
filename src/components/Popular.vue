<template>
  <div class="popular">
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
    <div class="view-container">
      <component :is="currentView" />
      <div
        class="pagination"
        v-if="currentView === 'PopularTable' && totalPages > 1"
      >
        <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
      </div>
    </div>
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
      currentPage: 1,
      totalPages: 5, // 예시: 총 5페이지로 설정
    };
  },
  watch: {
    currentView(newView) {
      if (newView === "PopularTable") {
        document.body.style.overflow = "hidden"; // 스크롤 비활성화
      } else {
        document.body.style.overflow = ""; // 스크롤 활성화 (기본값으로 복구)
      }
    },
  },
  methods: {
    switchView(view) {
      this.currentView = view;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    // 페이지 로드 시 기본 스크롤 설정
    if (this.currentView === "PopularTable") {
      document.body.style.overflow = "hidden";
    }
  },
  beforeDestroy() {
    // 컴포넌트 파괴 시 스크롤 복구
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.popular {
  background-color: #121212;
  color: white;
  min-height: 100vh;
}

/* View Toggle Buttons */
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

.view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 150px); /* View Toggle와 Navbar 포함 높이를 제외 */
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #333;
  border-radius: 10px;
}

.pagination button {
  background-color: #444;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s ease;
}

.pagination button:hover {
  background-color: #e50914;
}

.pagination button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

.pagination span {
  color: white;
  font-size: 16px;
}
</style>
