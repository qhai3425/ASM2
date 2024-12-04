<template>
  <div class="about">
    
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center mb-4">Đăng nhập</h2>
          
          <!-- Form đăng ký -->
         <form>
      <div class="mb-3">
        <label for="username" class="form-label">Tên người dùng</label>
        <input type="text" id="username" class="form-control" placeholder="Nhập tên người dùng" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu</label>
        <input type="password" id="password" class="form-control" placeholder="Nhập mật khẩu" />
      </div>
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </form>
  
          <!-- Chỗ để link đăng nhập -->
          <div class="mt-3 text-center">
            <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

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

header {
  padding: 20px 0;
  background-color: #007bff;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar {
  font-size: 1.1rem;
  font-weight: 600;
}

.navbar-nav {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
}

.nav-link {
  color: #fff !important;
  text-transform: uppercase;
  font-weight: 600;
  padding: 10px 15px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
  background-color: white;
  border-radius: 5px;
}

.navbar-toggler {
  background-color: white;
}

/* Điều chỉnh cho màn hình nhỏ */
@media (max-width: 768px) {
  .navbar-nav {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .nav-link {
    text-align: center;
    padding: 15px 25px;
  }
}

/* Cải tiến phần DemoView */
.demo-view {
  text-align: center;
  background-color: #fff;
  padding: 30px 0;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>

  
