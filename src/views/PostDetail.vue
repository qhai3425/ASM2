<template>
  <div class="container mt-4">
    <div v-if="article">
      <h2>{{ article.title }}</h2>
      <h6 class="text-muted">{{ article.date }} | Tác giả: {{ article.author }}</h6>
      <div v-if="article.image">
        <img :src="article.image" class="img-fluid mt-3" alt="Article Image" />
      </div>
      <p class="mt-3">{{ article.description }}</p>
      <p class="mt-3" v-if="article.content">{{ article.content }}</p>

      <!-- Form bình luận -->
      <div class="comment-section mt-5">
        <h4>Bình luận</h4>
        <form @submit.prevent="submitComment">
          <div class="mb-3">
            <textarea
              v-model="newComment"
              class="form-control"
              rows="3"
              placeholder="Nhập bình luận của bạn..."
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Gửi bình luận</button>
        </form>

        <!-- Danh sách bình luận -->
        <div class="comments mt-4">
          <div v-for="comment in comments" :key="comment.id" class="comment-item mb-3">
            <strong>{{ comment.username }}</strong>
            <span class="text-muted">{{ comment.date }}</span>
            <p>{{ comment.content }}</p>
            <hr />
          </div>
        </div>
      </div>

      <router-link to="/" class="btn btn-secondary mt-3">Quay lại</router-link>
    </div>
    <div v-else>
      <p>Bài viết không tồn tại.</p>
      <router-link to="/" class="btn btn-primary mt-3">Quay lại danh sách</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: null, // Bài viết hiện tại
      comments: [], // Danh sách bình luận
      newComment: '', // Nội dung bình luận mới
    }
  },
  created() {
    // Lấy ID bài viết từ URL
    const articleId = this.$route.params.id
    const articles = JSON.parse(localStorage.getItem('articles')) || []
    // Tìm bài viết theo ID
    this.article = articles.find((article) => article.id === articleId)

    // Lấy bình luận từ localStorage
    const allComments = JSON.parse(localStorage.getItem('comments')) || []
    this.comments = allComments.filter((comment) => comment.articleId === articleId)
  },
  methods: {
    submitComment() {
      const user = JSON.parse(localStorage.getItem('loggedInUser')) // Lấy người dùng hiện tại từ localStorage
      if (!user) {
        alert('Bạn cần đăng nhập để bình luận!')
        return
      }

      const newComment = {
        id: Date.now(), // ID duy nhất cho bình luận
        articleId: this.article.id, // Gắn với bài viết hiện tại
        username: user.name, // Lấy tên người dùng từ localStorage
        date: new Date().toLocaleString(), // Ngày/giờ bình luận
        content: this.newComment, // Nội dung bình luận
      }

      // Lưu bình luận vào danh sách và localStorage
      this.comments.push(newComment)
      const allComments = JSON.parse(localStorage.getItem('comments')) || []
      allComments.push(newComment)
      localStorage.setItem('comments', JSON.stringify(allComments))

      // Reset form
      this.newComment = ''
    },
  },
}
</script>

<style scoped>
.comment-item {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}
</style>
