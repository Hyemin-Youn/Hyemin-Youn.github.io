<template>
    <div>
      <h1>Popular Movies</h1>
      <ToggleViewButton @toggle-view="changeView" />
      <PopularTableView v-if="viewType === 'table'" />
      <PopularInfiniteScroll v-if="viewType === 'infinite'" />
    </div>
  </template>
  
  <script>
  import PopularTableView from '@/components/PopularTableView.vue';
  import PopularInfiniteScroll from '@/components/PopularInfiniteScroll.vue';
  import ToggleViewButton from '@/components/ToggleViewButton.vue';
  
  export default {
    components: {
      PopularTableView,
      PopularInfiniteScroll,
      ToggleViewButton,
    },
    data() {
      return {
        viewType: 'table',
      };
    },
    methods: {
      changeView(type) {
        this.viewType = type;
      },
    },
  };
  </script>
  