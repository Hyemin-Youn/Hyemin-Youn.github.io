<template>
    <div
ref="gridContainer"
class="movie-grid"
>
      <div :class="['grid-container', currentView]">
        <div
          v-for="(movieGroup, i) in visibleWishlistMovies"
          :key="i"
          :class="['movie-row', { full: movieGroup.length === rowSize }]"
        >
          <div
            v-for="movie in movieGroup"
            :key="movie.id"
            class="movie-card"
            @click="toggleWishlist(movie)"
          >
            <img
:src="getImageUrl(movie.poster_path)"
:alt="movie.title"
>
            <div class="movie-title">
{{ movie.title }}
</div>
            <div class="wishlist-indicator">
👍
</div>
          </div>
        </div>
      </div>
      <div
v-if="wishlistMovies.length === 0"
class="empty-wishlist"
>
        위시리스트가 비어 있습니다.
      </div>
      <div
v-if="totalPages > 1"
class="pagination"
>
        <button
:disabled="currentPage === 1"
@click="prevPage"
>
&lt; 이전
</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
:disabled="currentPage === totalPages"
@click="nextPage"
>
다음 &gt;
</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
  import WishlistService from "@/util/movie/wishlist";
  
  export default {
    name: "Wishlist",
    setup() {
      const gridContainer = ref(null);
      const wishlistMovies = ref([]);
      const visibleWishlistMovies = ref([]);
      const currentPage = ref(1);
      const rowSize = ref(4);
      const moviesPerPage = ref(20);
      const isMobile = ref(window.innerWidth <= 768);
      const currentView = ref("grid");
  
      const getImageUrl = (path) =>
        path ? `https://image.tmdb.org/t/p/w300${path}` : "/placeholder-image.jpg";
  
      const calculateLayout = () => {
        if (gridContainer.value) {
          const container = gridContainer.value;
          const containerWidth = container.offsetWidth;
          const containerHeight = window.innerHeight - container.offsetTop;
          const movieCardWidth = isMobile.value ? 90 : 220;
          const movieCardHeight = isMobile.value ? 150 : 330;
          const horizontalGap = isMobile.value ? 10 : 15;
          const verticalGap = -10;
  
          rowSize.value = Math.floor(
            containerWidth / (movieCardWidth + horizontalGap)
          );
          const maxRows = Math.floor(
            containerHeight / (movieCardHeight + verticalGap)
          );
          moviesPerPage.value = rowSize.value * maxRows;
  
          updateVisibleMovies();
        }
      };
  
      const updateVisibleMovies = () => {
        const startIndex = (currentPage.value - 1) * moviesPerPage.value;
        const endIndex = startIndex + moviesPerPage.value;
        const paginatedMovies = wishlistMovies.value.slice(startIndex, endIndex);
  
        visibleWishlistMovies.value = paginatedMovies.reduce(
          (resultArray, item, index) => {
            const groupIndex = Math.floor(index / rowSize.value);
            if (!resultArray[groupIndex]) {
              resultArray[groupIndex] = [];
            }
            resultArray[groupIndex].push(item);
            return resultArray;
          },
          []
        );
      };
  
      const loadWishlist = () => {
        WishlistService.getWishlist().then((movies) => {
          wishlistMovies.value = movies;
          updateVisibleMovies();
        });
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
          updateVisibleMovies();
        }
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
          updateVisibleMovies();
        }
      };
  
      const toggleWishlist = (movie) => {
        WishlistService.toggleWishlist(movie);
        loadWishlist(); // 위시리스트 업데이트
      };
  
      const handleResize = () => {
        isMobile.value = window.innerWidth <= 768;
        calculateLayout();
      };
  
      onMounted(() => {
        loadWishlist();
        calculateLayout();
        window.addEventListener("resize", handleResize);
      });
  
      onUnmounted(() => {
        window.removeEventListener("resize", handleResize);
      });
  
      const totalPages = computed(() =>
        Math.ceil(wishlistMovies.value.length / moviesPerPage.value)
      );
  
      return {
        gridContainer,
        wishlistMovies,
        visibleWishlistMovies,
        currentPage,
        rowSize,
        isMobile,
        currentView,
        totalPages,
        getImageUrl,
        nextPage,
        prevPage,
        toggleWishlist,
        calculateLayout,
      };
    },
  };
  </script>
  
  <style scoped>
  /* 제공된 스타일 적용 */
  .movie-grid {
    width: 100%;
    height: calc(100vh - 200px);
    margin-bottom: 40px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .grid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .movie-row {
    display: flex;
    justify-content: center;
    margin: 0 auto 20px;
    width: 100%;
  }
  
  .movie-card {
    width: 160px;
    margin: 0 10px;
    transition: transform 0.3s;
    position: relative;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }
  
  .movie-card img {
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
  }
  
  .movie-title {
    margin-top: 5px;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .empty-wishlist {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    color: #666;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .pagination button {
    background-color: #333;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 0 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    .movie-grid {
      height: calc(90vh - 200px);
    }
  
    .movie-card {
      width: 90px;
      margin: 0 5px;
    }
  
    .movie-title {
      font-size: 12px;
    }
  
    .pagination button {
      padding: 8px 12px;
      font-size: 14px;
    }
  }
  </style>
  