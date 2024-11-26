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
/* View Toggle Buttons */
.view-toggle {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 10px;
  background: #222; /* 검정 배경 */
  border-radius: 10px; /* 둥근 모서리 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
}

.view-toggle button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 8px; /* 둥근 버튼 */
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px; /* 아이콘과 텍스트 간격 */
}

.view-toggle button.active {
  background-color: #e50914; /* 활성화된 버튼 색상 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); /* 활성화된 버튼 그림자 */
  border: 2px solid #fff; /* 강조된 테두리 */
}

.view-toggle button:first-child {
  background-color: #1e90ff; /* Table View 버튼 기본 색상 */
}

.view-toggle button:first-child.active {
  background-color: #104e8b; /* Table View 활성화 상태 색상 */
}

.view-toggle button:hover {
  transform: scale(1.05); /* 호버 시 확대 */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4); /* 호버 시 그림자 강화 */
}

@media (max-width: 768px) {
  .view-toggle button {
    font-size: 14px;
    padding: 8px 16px;
  }
}

</style>
