<template>
  <div class="container my-5">
    <div class="card shadow p-4">
      <h2 class="text-center mb-4">Quản lý Người Dùng</h2>

      <!-- Form thêm/sửa người dùng -->
      <form @submit.prevent="handleSubmit" class="mb-4">
        <div class="mb-3">
          <label for="name" class="form-label fw-bold">Tên người dùng</label>
          <input
            type="text"
            v-model="formData.name"
            class="form-control"
            id="name"
            placeholder="Nhập tên người dùng"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label fw-bold">Email</label>
          <input
            type="email"
            v-model="formData.email"
            class="form-control"
            id="email"
            placeholder="Nhập email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label fw-bold">Số điện thoại</label>
          <input
            type="text"
            v-model="formData.phone"
            class="form-control"
            id="phone"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label fw-bold">Giới tính</label>
          <select v-model="formData.gender" class="form-select" id="gender" required>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Mật khẩu</label>
          <input
            type="password"
            v-model="formData.password"
            class="form-control"
            id="password"
            placeholder="Nhập mật khẩu"
            :required="!isEditing"
          />
        </div>
        <div class="d-flex flex-column gap-2">
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Cập nhật' : 'Thêm người dùng' }}
          </button>
          <button
            v-if="isEditing"
            @click="cancelEdit"
            type="button"
            class="btn btn-secondary"
          >
            Hủy
          </button>
        </div>
      </form>

      <!-- Tìm kiếm người dùng -->
      <div class="mb-3">
        <label for="search" class="form-label fw-bold">Tìm kiếm</label>
        <input
          type="text"
          v-model="searchQuery"
          class="form-control"
          id="search"
          placeholder="Nhập tên hoặc email để tìm"
        />
      </div>

      <!-- Danh sách người dùng -->
      <h3 class="text-center">Danh sách Người Dùng</h3>
      <table class="table table-bordered table-striped mt-3">
        <thead class="table-light">
          <tr>
            <th class="text-center">Tên</th>
            <th class="text-center">Email</th>
            <th class="text-center">Số điện thoại</th>
            <!-- <th class="text-center">Giới tính</th> -->
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.gender }}</td>
            <td class="text-center">
              <button @click="editUser(index)" class="btn btn-warning btn-sm">Sửa</button>
              <button @click="deleteUser(index)" class="btn btn-danger btn-sm">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Phân trang -->
      <nav v-if="totalPages > 1" aria-label="Pagination">
        <ul class="pagination justify-content-center mt-3">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">Trước</button>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Sau</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        gender: 'Nam', // Mặc định là Nam
        password: '', // Mật khẩu
      },
      users: [], // Danh sách người dùng
      searchQuery: '', // Tìm kiếm
      isEditing: false,
      editIndex: null,
      currentPage: 1,
      itemsPerPage: 5, // Số người dùng mỗi trang
    }
  },
  created() {
    const savedUsers = JSON.parse(localStorage.getItem('users'))
    if (savedUsers) {
      this.users = savedUsers
    }
  },
  methods: {
    handleSubmit() {
      if (this.isEditing) {
        // Cập nhật người dùng
        this.users.splice(this.editIndex, 1, { ...this.formData })
        this.isEditing = false
        this.editIndex = null
      } else {
        // Thêm người dùng mới
        this.users.push({ ...this.formData })
      }
      this.saveToLocalStorage()
      this.resetForm()
    },
    editUser(index) {
      this.formData = { ...this.users[index] }
      this.isEditing = true
      this.editIndex = index
    },
    deleteUser(index) {
      if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
        this.users.splice(index, 1)
        this.saveToLocalStorage()
      }
    },
    cancelEdit() {
      this.isEditing = false
      this.editIndex = null
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        gender: 'Nam',
        password: '',
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users
      return this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },
  },
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>
