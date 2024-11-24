<template>
    <div class="search-container">
      <h1>영화 검색</h1>
      <div class="dropdown-container">
        <label>선호하는 설정을 선택하세요:</label>
        <div
          v-for="dropdown in dropdownEntries"
          :key="dropdown.key"
          class="custom-select"
        >
          <div
            class="select-selected"
            @click="toggleDropdown(dropdown.key)"
          >
            {{ selectedOptions[dropdown.key] }}
          </div>
          <div
            v-if="activeDropdown === dropdown.key"
            class="select-items"
          >
            <div
              v-for="option in dropdown.options"
              :key="option"
              @click="selectOption(dropdown.key, option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </div>
      <button class="clear-options" @click="clearOptions">초기화</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Search",
    data() {
      return {
        dropdowns: {
          originalLanguage: ["장르 (전체)", "Action", "Adventure", "Comedy", "Crime", "Family"],
          translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4~5", "4점 이하"],
          sorting: ["언어 (전체)", "영어", "한국어"],
        },
        DEFAULT_OPTIONS: {
          originalLanguage: "장르 (전체)",
          translationLanguage: "평점 (전체)",
          sorting: "언어 (전체)",
        },
        selectedOptions: {
          originalLanguage: "장르 (전체)",
          translationLanguage: "평점 (전체)",
          sorting: "언어 (전체)",
        },
        activeDropdown: null,
      };
    },
    computed: {
      dropdownEntries() {
        return Object.entries(this.dropdowns).map(([key, options]) => ({
          key,
          options,
        }));
      },
    },
    methods: {
      toggleDropdown(key) {
        this.activeDropdown = this.activeDropdown === key ? null : key;
      },
      selectOption(key, option) {
        this.selectedOptions = {
          ...this.selectedOptions,
          [key]: option,
        };
        this.activeDropdown = null;
        this.$emit("change-options", this.selectedOptions);
      },
      clearOptions() {
        this.selectedOptions = { ...this.DEFAULT_OPTIONS };
        this.$emit("change-options", this.selectedOptions);
      },
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    padding: 20px;
  }
  
  .dropdown-container {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .custom-select {
    min-width: 200px;
    position: relative;
    display: inline-block;
  }
  
  .select-selected {
    background-color: black;
    color: white;
    padding: 10px;
    border: 1px solid #fff;
    font-size: 16px;
    cursor: pointer;
  }
  
  .select-items {
    display: block;
    position: absolute;
    background-color: #333;
    border: 1px solid #fff;
    z-index: 99;
    top: 100%;
    left: 0;
    right: 0;
  }
  
  .select-items div {
    color: white;
    padding: 10px;
    cursor: pointer;
  }
  
  .select-items div:hover {
    background-color: #575757;
  }
  
  .select-arrow-active:after {
    content: "\25B2";
    position: absolute;
    right: 10px;
    top: 14px;
  }
  
  .select-selected:after {
    content: "\25BC";
    position: absolute;
    right: 10px;
    top: 14px;
  }
  
  .select-selected.select-arrow-active:after {
    content: "\25B2";
  }
  
  .clear-options {
    min-width: 120px;
    background-color: black;
    color: white;
    padding: 10px;
    border: 1px solid #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    border-radius: 0 !important;
  }
  
  .clear-options:hover {
    background-color: #333;
  }
  </style>
  