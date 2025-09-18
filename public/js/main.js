// Bắt sự kiện xác nhận khi xóa
document.addEventListener("DOMContentLoaded", () => {
  const deleteForms = document.querySelectorAll(".delete-form");

  deleteForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      const ok = confirm("Bạn có chắc muốn xóa không?");
      if (!ok) {
        e.preventDefault();
      }
    });
  });
});

// Ví dụ AJAX tìm kiếm sản phẩm
const searchInput = document.querySelector("#searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", async (e) => {
    const q = e.target.value;
    if (q.length > 2) {
      const res = await fetch(`/api/products?q=${q}`);
      const data = await res.json();
      console.log("Kết quả tìm kiếm:", data);
      // TODO: update UI với kết quả tìm kiếm
    }
  });
}
