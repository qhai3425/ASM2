<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';

// Trạng thái lưu thông tin người dùng đã đăng nhập
const loggedInUser = ref(null);

onMounted(() => {
  // Kiểm tra thông tin người dùng đăng nhập trong Local Storage
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (user) {
    loggedInUser.value = user;
  }
});

// Hàm đăng xuất
function logout() {
  localStorage.removeItem('loggedInUser');
  loggedInUser.value = null;
  alert('Đã đăng xuất thành công!');
}
</script>

<template>
  <div class="bg-light">
    <nav class="navbar navbar-expand-lg navblight bg-light">
      <div class="container">
        <RouterLink to="/" class="navbar-brand text-info">FPT Polytechnic</RouterLink>
        <RouterLink to="/" class="nav-link mx-2">Home</RouterLink>
        <RouterLink to="/list" class="nav-link mx-2">Blog</RouterLink>
        <RouterLink v-if="loggedInUser" to="/port" class="nav-link mx-2">Tạo bài viết</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li v-if="loggedInUser?.email === 'admin@gmail.com'" class="nav-item">
              <RouterLink to="/user" class="nav-link">Quản lý người dùng</RouterLink>
            </li>
            <li v-if="!loggedInUser" class="nav-item">
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
            </li>
            <li v-if="!loggedInUser" class="nav-item">
              <RouterLink to="/dk" class="nav-link">Đăng ký</RouterLink>
            </li>
            <li v-if="loggedInUser" class="nav-item">
              <RouterLink to="/pro" class="nav-link">Profile</RouterLink>
            </li>
            <li v-if="loggedInUser" class="nav-item">
              <button @click="logout" class="btn btn-link nav-link">Đăng xuất</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />

    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container text-center">
        <p class="mb-0">©Copyright by FPT Polytechnic</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Navbar - Màu xanh nhạt */
.navblight {
  background-color: #e7f4fb; /* Màu xanh nhạt */
  border-bottom: 1px solid #d1e7f0; /* Viền dưới */
}

.navbar-brand {
  color: #000000; /* Chữ màu đen */
  font-weight: bold;
  font-size: 1.25rem;
}

.nav-link {
  color: #000000; /* Chữ màu đen */
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #444444; /* Đậm hơn khi hover */
}

.navbar-toggler {
  border-color: #d1e7f0; /* Viền nút màu xanh nhạt */
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000000' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

/* Footer */
footer {
  background-color: #014c8c; /* Xanh đậm */
  color: #ffffff;
}

footer p {
  margin: 0;
  font-size: 0.875rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 0 10px;
  }
}
</style>
