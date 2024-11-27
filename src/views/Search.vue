<script>
import Navbar from "@/components/Navbar.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Search",
  components: {
    Navbar,
  },
  data() {
    return {
      searchQuery: "",
      activeDropdown: null,
      dropdowns: [
        {
          key: "genre",
          label: "장르 (전체)",
          options: [
            { label: "전체", value: "all" },
            { label: "액션", value: "28" },
            { label: "코미디", value: "35" },
            { label: "모험", value: "12" },
          ],
        },
        {
          key: "rating",
          label: "평점 (전체)",
          options: [
            { label: "전체", value: "all" },
            { label: "7점 이상", value: "7" },
            { label: "8점 이상", value: "8" },
          ],
        },
        {
          key: "language",
          label: "언어 (전체)",
          options: [
            { label: "전체", value: "all" },
            { label: "영어", value: "en" },
            { label: "한국어", value: "ko" },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(["filters"]),
    ...mapGetters(["searchHistory", "wishlist", "movies", "loading"]),
  },
  created() {
    // created를 methods 위로 이동
    this.fetchMovies();
  },
  methods: {
    ...mapActions(["addSearchHistory", "toggleWishlist", "fetchMovies"]),
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.addSearchHistory(this.searchQuery);
        this.fetchMovies({ query: this.searchQuery });
      }
    },
    searchFromHistory(query) {
      this.searchQuery = query;
      this.handleSearch();
    },
    setFilter(key, value) {
      this.$store.dispatch("setFilter", { key, value });
      this.activeDropdown = null;
    },
    clearFilters() {
      this.dropdownEntries.forEach(({ key }) => {
        this.setFilter(key, "all");
      });
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    getPosterUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500/${path}` : "default_poster.png";
    },
    isInWishlist(id) {
      return this.wishlist.some((movie) => movie.id === id);
    },
  },
};
</script>


<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
}
.dropdown-container {
  margin: 20px 0;
  display: flex;
  gap: 15px;
}
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
.movie-card {
  text-align: center;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 8px;
}
.movie-poster {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 10px;
  object-fit: cover;
}
.movie-title {
  font-size: 14px;
  color: white;
}
.loading {
  text-align: center;
  margin: 20px 0;
}
</style>