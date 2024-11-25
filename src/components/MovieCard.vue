<template>
  <div class="movie-card">
    <img :src="posterUrl" :alt="movie.title" class="poster" @click="toggleWishlist" />
    <p class="title">{{ movie.title }}</p>
    <span class="like-icon" @click.stop="toggleWishlist">
      <i :class="isInWishlist ? 'fas fa-heart liked' : 'far fa-heart'" />
    </span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    // 찜 리스트에 영화가 포함되어 있는지 확인
    const isInWishlist = computed(() =>
      store.getters.isInWishlist(props.movie.id)
    );

    // 찜 상태를 토글
    const toggleWishlist = () => {
      store.dispatch("toggleWishlist", props.movie);
    };

    return { isInWishlist, toggleWishlist };
  },
  computed: {
    posterUrl() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
    },
  },
};
</script>

<style scoped>
.movie-card {
  text-align: center;
  margin: 10px;
  position: relative;
}

.poster {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.poster:hover {
  transform: scale(1.05);
}

.title {
  font-size: 14px;
  margin-top: 8px;
  font-weight: bold;
}

.like-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #e50914;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.3s ease;
}

.like-icon.liked {
  color: #e50914;
}

.like-icon:hover {
  transform: scale(1.2);
}
</style>
