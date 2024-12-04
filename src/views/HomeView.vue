<template>
    <div class="container mt-4">
         <div class="row">
             <div class="col-md-8">
                 <h2 class="mb-4">Tin mới nhất</h2>
                 <!-- Tin bài 1 -->
                 <div class="card mb-4">
                     <div class="card-body">
                         <a>
                             <h1>
                                 <RouterLink to="/trangchitiet" class="nav-link link-tct">
                                     Thông tin về phim hoạt hình Pokemon
                                 </RouterLink>
                             </h1>
                         </a>
                         <!-- Thay thế thẻ <p> bằng hình ảnh -->
                         <img src="../components/img/PKM-1.jpg" alt="Pokemnon" class="img-fluid mb-3">
                         <p class="card-text">
                            Khi bắt đầu một trò chơi Pokémon chính, người chơi nhận được một trong ba Pokémon "khởi đầu", chúng có thể chiến đấu và bắt những Pokémon khác.
                         </p>
                         <small class="text-muted">3 giờ trước | Thế giới</small>
                     </div>
                 </div>
 
                 <!-- Tin bài 2 -->
                 <div class="card mb-4">
                     <div class="card-body">
                         <h3 class="card-title">Dragon Ball - 7 Viên Ngọc Rồng</h3>
                         <!-- Thay thế thẻ <p> bằng hình ảnh -->
                         <img src="../components/img/7VNR_1.webp" alt="7 Viên Ngọc Rồng" class="img-fluid mb-3">
                         <p class="card-text">
                            Dragon Ball là bộ truyện nổi tiếng và phổ biến rộng rãi bậc nhất trên toàn thế giới, là một trong những bộ manga được tiêu thụ nhiều nhất mọi thời đại.                         </p>
                         <small class="text-muted">5 giờ trước | Thế giới</small>
                     </div>
                 </div>
             </div>

             <!-- Đăng ký nhận tin -->
             <div class="bg-light">
                      <h4>Đăng ký nhận tin</h4>
                      <form>
                          <div class="mb-3">
                              <input type="email" class="form-control" placeholder="Email của bạn">
                          </div>
                          <button type="submit" class="btn btn-primary">Đăng ký</button>
                      </form>
                  </div>
 
             <div class="col-md-4">
                  <div class="bg-light">
                      <h4 class="mb-4">Tin nổi bật</h4>
                      <div class="card mt-4">
                          <ul class="list">
                              <li class="mb-2"><a href="#" class="text-decoration-none text-dark">Tin tức về những truyện tranh</a></li>
                              <li class="mb-2"><a href="#" class="text-decoration-none text-dark">Dự báo thời tiết: Miền Bắc đón không khí lạnh</a></li>
                              <li class="mb-2"><a href="#" class="text-decoration-none text-dark">Kết quả bóng đá Champions League mới nhất</a></li>
                          </ul>
                      </div>
                  </div>
  
             </div>
         </div>
     </div>
 </template>
 
<script>
export default {
}
</script>

<style scoped>
/* Các điều chỉnh cho màn hình nhỏ */
@media (max-width: 767px) {
  .row {
    flex-direction: column;
  }

  .col-md-8,
  .col-md-4 {
    padding: 0;
    width: 100%;
  }

  /* Thu gọn kích thước card */
  .card {
    margin-bottom: 15px;
    border-radius: 10px; /* Giảm bo góc */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .card-body {
    padding: 12px; /* Giảm padding */
  }

  .card-title {
    font-size: 1.1rem; /* Giảm kích thước tiêu đề */
  }

  .card-text {
    font-size: 0.9rem; /* Giảm kích thước nội dung */
  }

  .text-muted {
    font-size: 0.8rem; /* Giảm kích thước thời gian đăng bài */
  }

  /* Giảm kích thước của phần form đăng ký */
  form {
    padding: 12px; /* Giảm padding */
  }

  form .form-control {
    font-size: 0.9rem; /* Giảm kích thước input */
    padding: 8px;
  }

  form .btn-primary {
    font-size: 0.95rem; /* Giảm kích thước nút */
    padding: 10px;
  }

  /* Điều chỉnh kích thước hình ảnh */
  .card img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  .bg-light h4 {
    font-size: 1.2rem; /* Giảm kích thước tiêu đề tin nổi bật */
  }

  .list li a {
    font-size: 0.9rem; /* Giảm kích thước danh sách tin nổi bật */
  }
}

</style>
