<template>
  <div class="container mt-4">
    <h2>Quản lý Bài Viết</h2>

    <!-- Form thêm/sửa bài viết -->
    <form @submit.prevent="handleSubmit" class="mb-4">
      <div class="mb-3">
        <label for="title" class="form-label">Tiêu đề</label>
        <input
          type="text"
          v-model="formData.title"
          class="form-control"
          id="title"
          placeholder="Nhập tiêu đề bài viết"
          required
        />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Ngày</label>
        <input type="date" v-model="formData.date" class="form-control" id="date" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          v-model="formData.description"
          class="form-control"
          id="description"
          rows="3"
          placeholder="Nhập mô tả bài viết"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">Tác giả</label>
        <input
          type="text"
          v-model="formData.author"
          class="form-control"
          id="author"
          placeholder="Nhập tên tác giả"
          required
        />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Ảnh bài viết</label>
        <input type="file" @change="handleImageUpload" class="form-control" id="image" />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isEditing ? 'Cập nhật' : 'Thêm bài viết' }}
      </button>
      <button v-if="isEditing" @click="cancelEdit" type="button" class="btn btn-secondary ms-2">
        Hủy
      </button>
    </form>

    <!-- Danh sách bài viết -->
    <h3>Danh sách Bài Viết</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Ngày</th>
          <th>Mô tả</th>
          <th>Tác giả</th>
          <th>Ảnh</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="index">
          <td>{{ article.title }}</td>
          <td>{{ article.date }}</td>
          <td>{{ article.description }}</td>
          <td>{{ article.author }}</td>
          <td>
            <img
              v-if="article.image"
              :src="article.image"
              alt="Article Image"
              class="img-thumbnail"
              style="width: 80px; height: 80px"
            />
          </td>
          <td>
            <button @click="editArticle(index)" class="btn btn-warning btn-sm">Sửa</button>
            <button @click="deleteArticle(index)" class="btn btn-danger btn-sm">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: '',
        date: '',
        description: '',
        author: '',
        image: null,
      },
      articles: [], // Danh sách bài viết
      isEditing: false,
      editIndex: null,
    }
  },
  created() {
    // Khi component được tạo, lấy bài viết từ localStorage nếu có
    const savedArticles = JSON.parse(localStorage.getItem('articles'))
    if (savedArticles) {
      this.articles = savedArticles
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.formData.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    handleSubmit() {
      if (this.isEditing) {
        // Cập nhật bài viết
        this.$set(this.articles, this.editIndex, { ...this.formData })
        this.isEditing = false
        this.editIndex = null
      } else {
        // Thêm bài viết mới với id duy nhất
        this.articles.push({ ...this.formData, id: Date.now().toString() })
      }
      this.saveArticlesToLocalStorage()
      this.resetForm()
    },

    editArticle(index) {
      // Chỉnh sửa bài viết
      this.formData = { ...this.articles[index] }
      this.isEditing = true
      this.editIndex = index
    },
    deleteArticle(index) {
      // Xóa bài viết
      this.articles.splice(index, 1)
      this.saveArticlesToLocalStorage() // Lưu lại danh sách bài viết sau khi xóa
    },
    cancelEdit() {
      this.isEditing = false
      this.editIndex = null
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        title: '',
        date: '',
        description: '',
        author: '',
        image: null,
      }
    },
    saveArticlesToLocalStorage() {
      // Lưu danh sách bài viết vào localStorage
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },
  },
}
</script>

<style scoped>
/* Toàn bộ container */
.container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề chính */
h2, h3 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #333;
}

/* Form */
form {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

form .form-label {
  font-weight: bold;
  color: #555;
}

form input,
form textarea {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px;
}

form input:focus,
form textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button[type="submit"],
button[type="button"] {
  padding: 10px 20px;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button.btn-secondary {
  background-color: #6c757d;
  color: white;
}

button.btn-secondary:hover {
  background-color: #5a6268;
}

/* Bảng */
table {
  background-color: #ffffff;
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

thead {
  background-color: #007bff;
  color: white;
}

thead th {
  padding: 12px 15px;
  text-align: center;
}

tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

tbody td {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

tbody td img {
  border: 2px solid #ddd;
  border-radius: 5px;
}

/* Nút hành động */
button.btn-warning {
  background-color: #ffc107;
  color: black;
  border: none;
}

button.btn-warning:hover {
  background-color: #e0a800;
}

button.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

button.btn-danger:hover {
  background-color: #bd2130;
}
</style>
