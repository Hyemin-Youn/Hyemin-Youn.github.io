<template>
    <div class="pagination">
      <button
:disabled="currentPage === 1"
@click="prevPage"
>
이전
</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
:disabled="currentPage === totalPages"
@click="nextPage"
>
다음
</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
    },
    methods: {
      prevPage() {
        this.$emit('change-page', this.currentPage - 1);
      },
      nextPage() {
        this.$emit('change-page', this.currentPage + 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  button {
    padding: 5px 10px;
  }
  </style>
  