<template>
  <div class="register-container">
    <h2>Đăng ký</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Họ và Tên:</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          placeholder="Nhập họ và tên"
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required placeholder="Nhập email" />
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
      <div class="form-group">
        <label>Giới tính:</label>
        <div class="gender-options">
          <label>
            <input type="radio" name="gender" value="Nam" v-model="formData.gender" />
            Nam
          </label>
          <label>
            <input type="radio" name="gender" value="Nữ" v-model="formData.gender" />
            Nữ
          </label>
          <label>
            <input type="radio" name="gender" value="Khác" v-model="formData.gender" />
            Khác
          </label>
        </div>
      </div>
      <button type="submit" class="btn-submit">Đăng ký</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        gender: '',
      },
    }
  },
  methods: {
    handleRegister() {
      // Kiểm tra xem giới tính đã chọn chưa
      if (this.formData.gender === '') {
        alert('Vui lòng chọn giới tính!')
        return
      }

      // Lấy danh sách người dùng từ Local Storage
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Kiểm tra email đã tồn tại hay chưa
      const emailExists = users.some((user) => user.email === this.formData.email)
      if (emailExists) {
        alert('Email này đã được đăng ký. Vui lòng sử dụng email khác!')
        return
      }

      // Thêm người dùng mới vào danh sách
      users.push({ ...this.formData })

      // Lưu lại danh sách vào Local Storage
      localStorage.setItem('users', JSON.stringify(users))

      // Thông báo đăng ký thành công
      alert('Đăng ký thành công!')

      // Reset dữ liệu form
      this.formData = {
        name: '',
        email: '',
        password: '',
        gender: '',
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
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fa;
  color: #333;
  line-height: 1.6;
}

.register-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #007bff;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

.gender-options {
  display: flex;
  gap: 10px;
}

.gender-options label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
