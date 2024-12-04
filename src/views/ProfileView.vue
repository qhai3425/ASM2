<template>
  <div class="container mt-4">
    <div v-if="user">
      <h3 class="text-primary mb-3">Thông tin người dùng</h3>
      <form class="mb-4">
        <div class="mb-3">
          <label for="name" class="form-label">Tên:</label>
          <input
            type="text"
            id="name"
            v-model="user.name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            class="form-control"
            disabled
          />
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Giới tính:</label>
          <input
            type="text"
            id="gender"
            v-model="user.gender"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value="******"
            class="form-control"
            disabled
          />
        </div>
        <button
          type="button"
          class="btn btn-primary me-2"
          @click="saveChanges"
        >
          Lưu thay đổi
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="showChangePasswordModal = true"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>

    <div v-else>
      <p>Không có người dùng nào đang đăng nhập.</p>
    </div>

    <!-- Modal đổi mật khẩu -->
    <div
      class="modal fade"
      id="changePasswordModal"
      tabindex="-1"
      aria-labelledby="changePasswordModalLabel"
      aria-hidden="true"
      ref="changePasswordModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="changePasswordModalLabel">Đổi mật khẩu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="oldPassword" class="form-label">Mật khẩu cũ:</label>
              <input
                type="password"
                id="oldPassword"
                v-model="password.oldPassword"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Mật khẩu mới:</label>
              <input
                type="password"
                id="newPassword"
                v-model="password.newPassword"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">
                Nhập lại mật khẩu mới:
              </label>
              <input
                type="password"
                id="confirmPassword"
                v-model="password.confirmPassword"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              @click="changePassword"
            >
              Xác nhận
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br><br><br>
</template>

<script>
export default {
  data() {
    return {
      user: null, // Thông tin người dùng
      password: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  created() {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  },
  methods: {
    saveChanges() {
      // Lưu thay đổi thông tin (ngoại trừ mật khẩu)
      if (this.user) {
        localStorage.setItem('loggedInUser', JSON.stringify(this.user));
        alert('Thông tin đã được cập nhật.');
      }
    },
    changePassword() {
      // Kiểm tra mật khẩu cũ và xử lý đổi mật khẩu
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (this.password.oldPassword !== storedUser.password) {
        alert('Mật khẩu cũ không đúng.');
        return;
      }

      if (this.password.newPassword !== this.password.confirmPassword) {
        alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
        return;
      }

      storedUser.password = this.password.newPassword;
      localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
      alert('Mật khẩu đã được đổi thành công.');
      this.password = { oldPassword: '', newPassword: '', confirmPassword: '' };
      const modal = this.$refs.changePasswordModal;
      modal.hide();
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
