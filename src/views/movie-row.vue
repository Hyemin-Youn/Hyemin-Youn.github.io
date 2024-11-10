<template>
    <div class="movie-row">
      <h2>{{ title }}</h2>
      <div 
        class="slider-container" 
        @wheel="handleWheel"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <button 
          class="slider-button left" 
          @click="slide('left')" 
          :style="{ opacity: showButtons && !atLeftEdge ? 1 : 0 }" 
          :disabled="atLeftEdge"
        >&lt;</button>
        
        <div class="slider-window" ref="sliderWindow">
          <div 
            class="movie-slider" 
            ref="slider" 
            :style="{ transform: 'translateX(' + (-scrollAmount) + 'px)' }"
          >
            <div 
              v-for="movie in movies" 
              :key="movie.id" 
              class="movie-card" 
              @click="toggleWishlist(movie)"
            >
              <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
              <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">👍</div>
            </div>
          </div>
        </div>
        
        <button 
          class="slider-button right" 
          @click="slide('right')" 
          :style="{ opacity: showButtons && !atRightEdge ? 1 : 0 }" 
          :disabled="atRightEdge"
        >&gt;</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted, onUnmounted } from 'vue';
  import WishlistService from '../../util/movie/wishlist';
  
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      fetchUrl: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const slider = ref(null);
      const sliderWindow = ref(null);
      const movies = ref([]);
      const scrollAmount = ref(0);
      const showButtons = ref(false);
      const isScrolling = ref(false);
      const touchStartX = ref(0);
      const touchEndX = ref(0);
      const maxScroll = ref(0);
  
      const wishlistService = new WishlistService();
  
      const fetchMovies = async () => {
        try {
          const response = await axios.get(props.fetchUrl);
          movies.value = response.data.results;
          calculateMaxScroll();
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
  
      const calculateMaxScroll = () => {
        if (slider.value && sliderWindow.value) {
          maxScroll.value = Math.max(0, slider.value.scrollWidth - sliderWindow.value.clientWidth);
        }
      };
  
      const slide = (direction, amount = null) => {
        const slideAmount = amount || sliderWindow.value.clientWidth * 0.8;
        if (direction === 'left') {
          scrollAmount.value = Math.max(0, scrollAmount.value - slideAmount);
        } else {
          scrollAmount.value = Math.min(maxScroll.value, scrollAmount.value + slideAmount);
        }
      };
  
      const handleMouseMove = () => {
        showButtons.value = true;
      };
  
      const handleMouseLeave = () => {
        showButtons.value = false;
      };
  
      const handleWheel = (event) => {
        event.preventDefault();
        if (isScrolling.value) return;
  
        isScrolling.value = true;
        const direction = event.deltaY > 0 ? 'right' : 'left';
        slide(direction);
  
        setTimeout(() => {
          isScrolling.value = false;
        }, 500);
      };
  
      const handleTouchStart = (event) => {
        touchStartX.value = event.touches[0].clientX;
        touchEndX.value = event.touches[0].clientX;
      };
  
      const handleTouchMove = (event) => {
        touchEndX.value = event.touches[0].clientX;
      };
  
      const handleTouchEnd = () => {
        const touchDiff = touchStartX.value - touchEndX.value;
        const minSwipeDistance = 50;
  
        if (Math.abs(touchDiff) > minSwipeDistance) {
          const direction = touchDiff > 0 ? 'right' : 'left';
          slide(direction, Math.abs(touchDiff));
        }
      };
  
      const toggleWishlist = (movie) => {
        wishlistService.toggleWishlist(movie);
      };
  
      const isInWishlist = (movieId) => {
        return wishlistService.isInWishlist(movieId);
      };
  
      const getImageUrl = (path) => {
        return `https://image.tmdb.org/t/p/w300${path}`;
      };
  
      onMounted(() => {
        fetchMovies();
        window.addEventListener('resize', calculateMaxScroll);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', calculateMaxScroll);
      });
  
      return {
        slider,
        sliderWindow,
        movies,
        scrollAmount,
        showButtons,
        handleMouseMove,
        handleMouseLeave,
        handleWheel,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        slide,
        getImageUrl,
        toggleWishlist,
        isInWishlist,
        atLeftEdge: () => scrollAmount.value <= 0,
        atRightEdge: () => scrollAmount.value >= maxScroll.value
      };
    }
  };
  </script>
  
  <style>
  .wishlist-indicator {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 50%;
    font-size: 12px;
  }
  
  .movie-row {
    margin-bottom: 40px;
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .movie-row h2 {
    text-align: left;
    margin-left: 30px;
  }
  
  .slider-container {
    position: relative;
    touch-action: pan-y;
  }
  
  .slider-window {
    overflow: hidden;
    margin: 0 40px;
  }
  
  .movie-slider {
    display: flex;
    transition: transform 0.3s ease;
    padding: 20px 0;
  }
  
  .movie-card {
    flex: 0 0 auto;
    width: 200px;
    margin-right: 10px;
    transition: transform 0.3s;
    position: relative;
    cursor: pointer;
  }
  
  .movie-card:hover {
    transform: scale(1.05);
  }
  
  .movie-card img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  .slider-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 20px 10px;
    cursor: pointer;
    z-index: 10;
    transition: opacity 0.3s, background-color 0.3s;
  }
  
  .slider-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .slider-button.left {
    left: 0;
  }
  
  .slider-button.right {
    right: 0;
  }
  
  .slider-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    .movie-row {
      margin-bottom: 20px;
    }
  
    .movie-card {
      width: 120px;
      margin-right: 5px;
    }
  
    .movie-slider {
      padding: 0;
    }
  
    .slider-window {
      margin: 0 10px;
    }
  }
  </style>
  