<template>
    <div>
      <button @click="switchToTableView">Table View</button>
      <button @click="switchToInfiniteScroll">Infinite Scroll</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      switchToTableView() {
        this.$emit('toggle-view', 'table');
      },
      switchToInfiniteScroll() {
        this.$emit('toggle-view', 'infinite');
      },
    },
  };
  </script>
  