class WishlistManager {
    constructor() {
      this.wishlist = this.loadWishlist();
    }
  
    // 위시리스트 토글 (추가/제거)
    toggleWishlist(movie) {
      const index = this.wishlist.findIndex((item) => item.id === movie.id);
      if (index === -1) {
        this.wishlist.push(movie); // 영화 추가
      } else {
        this.wishlist.splice(index, 1); // 영화 제거
      }
      this.saveWishlist(); // 로컬 스토리지 동기화
    }
  
    // 로컬 스토리지에서 위시리스트 불러오기
    loadWishlist() {
      const storedWishlist = localStorage.getItem('movieWishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
  
    // 로컬 스토리지에 위시리스트 저장
    saveWishlist() {
      localStorage.setItem('movieWishlist', JSON.stringify(this.wishlist));
    }
  
    // 위시리스트 확인
    isInWishlist(movieId) {
      return this.wishlist.some((item) => item.id === movieId);
    }
  
    // 위시리스트 전체 가져오기
    getWishlist() {
      return this.wishlist;
    }
  }
  
  // 사용 예시
  const wishlistManager = new WishlistManager();
  const movie = { id: 1, title: "Example Movie", poster_path: "/example.jpg" };
  
  // 위시리스트에 영화 추가 또는 제거
  wishlistManager.toggleWishlist(movie);
  
  // 위시리스트에 해당 영화가 있는지 확인
  console.log(wishlistManager.isInWishlist(movie.id));
  
  // 위시리스트 전체 목록 출력
  console.log(wishlistManager.getWishlist());
  