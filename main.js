/**
 * Tên file: practice_gym_membership.js
 * Chức năng: Hệ thống quản lý hội viên và doanh thu phòng Gym
 */

// 1. Khai báo các biến lưu trữ trạng thái xuyên suốt ca làm việc
let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

// Các biến tạm để lưu trữ hồ sơ hội viên đang thao tác (Chưa thanh toán)
let pendingName = "";
let pendingPackage = "";
let pendingMonths = 0;
let pendingPtSessions = 0;

let menuChoice;
const currentYear = new Date().getFullYear().toString(); // Lấy năm hiện tại (VD: "2026")

// 2. Khung điều khiển bằng do-while
do {
  menuChoice = prompt(
    "🏋️ HỆ THỐNG QUẢN LÝ PHÒNG GYM FITNESS 🏋️\n" +
      "1. Đăng ký hồ sơ hội viên mới\n" +
      "2. Tính tiền và Thanh toán gói tập\n" +
      "3. Quét mã thẻ check-in tại cửa\n" +
      "4. Báo cáo thống kê ca trực và Thoát\n" +
      "Nhập lựa chọn của bạn (1-4):",
  );

  switch (menuChoice) {
    case "1":
      // Chức năng 1: Nhập và chuẩn hóa hồ sơ hội viên
      console.log("--- 📝 ĐĂNG KÝ HỒ SƠ ---");
      let inputName = prompt("Nhập họ tên hội viên:");
      let inputPackage = prompt("Nhập gói tập (STANDARD / VIP):");
      let inputMonths = prompt("Nhập số tháng đăng ký (VD: 6, 12):");
      let inputPt = prompt("Nhập số buổi thuê PT (Nhập 0 nếu không thuê):");

      if (inputName && inputPackage && inputMonths && inputPt) {
        // Chuẩn hóa dữ liệu
        pendingName = inputName.trim().toUpperCase();
        pendingPackage = inputPackage.trim().toUpperCase();
        pendingMonths = Number(inputMonths);
        pendingPtSessions = Number(inputPt);

        console.log(
          `✅ Đã tạo hồ sơ cho hội viên: ${pendingName}. Vui lòng sang bước 2 để tính tiền.`,
        );
      } else {
        console.log(
          "❌ Nhập thiếu thông tin. Vui lòng thao tác lại chức năng 1.",
        );
      }
      break;

    case "2":
      // Chức năng 2: Tính tiền
      console.log("--- 💳 TÍNH TIỀN & THANH TOÁN ---");

      // Chặn nếu chưa đăng ký hồ sơ ở Bước 1
      if (pendingName === "") {
        console.log(
          "❌ Chưa có hồ sơ hội viên nào đang chờ xử lý! Vui lòng chọn 1 trước.",
        );
        break;
      }

      let packagePrice = pendingPackage === "VIP" ? 800000 : 500000;
      let totalPackageFee = packagePrice * pendingMonths;

      // Áp dụng chính sách giảm giá trên tổng tiền gói tập
      let discountRate = 0;
      if (pendingMonths >= 12) {
        discountRate = 0.25; // Giảm 25%
      } else if (pendingMonths >= 6) {
        discountRate = 0.15; // Giảm 15%
      }
      let discountAmount = totalPackageFee * discountRate;
      let finalPackageFee = totalPackageFee - discountAmount;

      // Tính tiền PT riêng
      let totalPtFee = pendingPtSessions * 300000;

      // Tổng thanh toán
      let finalTotal = finalPackageFee + totalPtFee;

      // Cập nhật vào hệ thống thống kê ca trực
      registeredMembers++;
      totalRevenue += finalTotal;

      // In hóa đơn
      console.log("-".repeat(40));
      console.log(`HÓA ĐƠN HỘI VIÊN: ${pendingName}`);
      console.log(`Gói tập: ${pendingPackage} (${pendingMonths} tháng)`);
      console.log(`Thuê PT: ${pendingPtSessions} buổi`);
      console.log(
        `Thành tiền gói tập: ${totalPackageFee.toLocaleString("vi-VN")} VNĐ`,
      );
      console.log(
        `Giảm giá thẻ (${discountRate * 100}%): -${discountAmount.toLocaleString("vi-VN")} VNĐ`,
      );
      console.log(`Thành tiền PT: ${totalPtFee.toLocaleString("vi-VN")} VNĐ`);
      console.log("-".repeat(40));
      console.log(`TỔNG THANH TOÁN: ${finalTotal.toLocaleString("vi-VN")} VNĐ`);
      console.log("-".repeat(40));

      // Xóa bộ nhớ tạm để đón khách mới
      pendingName = "";
      pendingPackage = "";
      pendingMonths = 0;
      pendingPtSessions = 0;
      break;

    case "3":
      // Chức năng 3: Check-in
      console.log("--- 🚪 QUÉT MÃ THẺ CHECK-IN ---");
      let inputCode = prompt(
        `Nhập mã thẻ (Bắt đầu bằng GYM- và kết thúc bằng năm ${currentYear}):`,
      );

      if (inputCode) {
        let cardCode = inputCode.trim().toUpperCase();

        // Kiểm tra logic: Phải bắt đầu bằng GYM- và kết thúc bằng năm hiện tại
        if (cardCode.startsWith("GYM-") && cardCode.endsWith(currentYear)) {
          checkInCount++;
          console.log(
            `✅ Cửa đã mở! Check-in thành công cho mã thẻ: ${cardCode}`,
          );
        } else {
          console.log(
            "❌ Mã thẻ không hợp lệ hoặc đã hết hạn (Sai định dạng/Năm).",
          );
        }
      }
      break;

    case "4":
      // Chức năng 4: Thoát và Báo cáo
      console.log("=".repeat(40));
      console.log("      📊 BÁO CÁO TỔNG KẾT CA TRỰC");
      console.log("=".repeat(40));
      console.log(`👥 Hội viên đăng ký mới: ${registeredMembers} người`);
      console.log(`🚶 Số lượt check-in    : ${checkInCount} lượt`);
      console.log(
        `💰 Tổng doanh thu      : ${totalRevenue.toLocaleString("vi-VN")} VNĐ`,
      );
      console.log("=".repeat(40));
      console.log("👋 Đã đóng ca trực. Hệ thống kết thúc!");
      break;

    default:
      console.log("❌ Lựa chọn không hợp lệ. Vui lòng nhập số từ 1 đến 4.");
      break;
  }
} while (menuChoice !== "4");
