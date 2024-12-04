<template>
  <br><br><br>
  <div class="login-container">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Tên đăng nhập:</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          required
          placeholder="Nhập email"
        />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
          placeholder="Nhập mật khẩu"
        />
      </div>
      <button type="submit" class="btn-submit">Đăng nhập</button>
    </form>
  </div>
  <br><br>

</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '', // Ở đây username sẽ là email
        password: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      // Lấy danh sách người dùng từ Local Storage
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Tìm người dùng với email và mật khẩu khớp
      const user = users.find(
        (user) =>
          user.email === this.formData.username &&
          user.password === this.formData.password,
      )

      if (user) {
        // Lưu người dùng đăng nhập vào Local Storage
        localStorage.setItem('loggedInUser', JSON.stringify(user))

        if (this.formData.username === 'admin@gmail.com') {
          // Nếu là admin
          alert(`Đăng nhập thành công! Chào mừng quản trị viên ${user.name}!`)
          this.$router.push('/admin') // Điều hướng tới trang quản trị
        } else {
          // Nếu là người dùng bình thường
          alert(`Đăng nhập thành công! Chào mừng ${user.name}!`)
          this.$router.push('/') // Điều hướng tới trang người dùng
        }
      } else {
        // Đăng nhập thất bại
        alert('Tên đăng nhập hoặc mật khẩu không chính xác.')
      }
    },
  },
}
</script>

<style scoped>
/* Cấu trúc chung */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f4f7fa;
  color: #333;
}

.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #007bff;
}

label, input {
  width: 100%;
  margin-bottom: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #007bff;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:hover {
  background: #0056b3;
}

</style>
