<template>
  <div class="container mt-4">
    <h2>Danh sách Bài Viết</h2>
    <div class="row">
      <!-- Lặp qua danh sách bài viết -->
      <div v-for="(article, index) in articles" :key="index" class="col-md-4 mb-4">
        <div class="card">
          <!-- Hiển thị ảnh nếu có -->
          <router-link :to="'/list/' + article.id">
            <img
              v-if="article.image"
              :src="article.image"
              class="card-img-top"
              alt="Article Image"
            />
          </router-link>
          <div class="card-body">
            <router-link :to="'/list/' + article.id">
              <h5 class="card-title">{{ article.title }}</h5>
            </router-link>
            <h6 class="card-subtitle mb-2 text-muted">{{ article.date }}</h6>
            <p class="card-text">{{ article.description }}</p>
            <footer class="blockquote-footer">
              Tác giả: <cite title="Author">{{ article.author }}</cite>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [], // Danh sách bài viết
    }
  },
  created() {
    // Lấy danh sách bài viết từ localStorage nếu có
    const savedArticles = JSON.parse(localStorage.getItem('articles'))
    if (savedArticles) {
      this.articles = savedArticles
    }
  },
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}
.card-img-top {
  max-height: 200px;
  object-fit: cover;
}
</style>
