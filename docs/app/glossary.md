# EXP-002: Bảng chú giải (từ viết tắt, từ tiếng Anh, mã)

Ngày: 2026-11-10. Mục đích: giải nghĩa mọi từ viết tắt và từ tiếng Anh đã dùng trong EXP-002 để người dùng khỏi hỏi lại.

Cột "Nguồn" cho biết mức chắc chắn:
- **màn hình**: hệ thống tự hiện nghĩa này.
- **phản hồi**: rõ từ dữ liệu API trả về.
- **tôi đọc**: nghĩa thông thường do tôi tự điền; cần người dùng sửa nếu nhóm dùng khác.
- **chưa biết**: chưa có căn cứ.

Không có khóa API, token, mật khẩu hay dữ liệu cá nhân thật trong file này. Khóa bản đồ (`apikey=…`) là khóa bí mật, không chép giá trị.

## 1. toll_cost

**`toll_cost` = tổng phí trạm của một đường đi, tính bằng đồng (₫).**
- **toll** = phí qua một trạm thu phí trên đường, cầu hoặc cao tốc (phí qua trạm, phí cầu đường). **cost** = một khoản tiền.
- Nó bằng tổng `price` của mọi trạm trong `tolls` của đường đó. Ví dụ 133,000 + 152,000 + 19,000 + 19,000 = 323,000. (phản hồi)
- Đơn vị không ghi trong dữ liệu; giả định là đồng vì tổng khớp các số ₫ trên màn hình. (tôi đọc)

## 2. Phản hồi định tuyến (`/api/v1/map/routing/route`)

| Trường | Nghĩa | Nguồn |
|---|---|---|
| `code`, `message` | "OK" và "SUCCESS": lệnh gọi thành công | phản hồi |
| `data` → `paths` | Danh sách các đường đi có thể cho chặng (phương án thay thế); tôi đọc cái đầu | phản hồi |
| `distance` | Độ dài đường đi tính bằng mét (39525.8 = 39.53 km) | phản hồi |
| `time` | Thời gian đi tính bằng mili giây (3,693,089 ≈ 1.03 giờ) | phản hồi |
| `weight` | Điểm số để so sánh các đường; không ghi đơn vị | chưa biết |
| `points`, `points_encoded` | Hình dạng đường đi trên bản đồ nén thành chuỗi chữ ngắn ("encoded polyline") | tôi đọc |
| `snapped_waypoints` | Điểm đầu và cuối được kéo về con đường gần nhất | tôi đọc |
| `bbox` | Bounding box: hình chữ nhật nhỏ nhất (kinh độ, vĩ độ) chứa đường đi | tôi đọc |
| `transfers` | Số lần đổi phương tiện (luôn là 0) | tôi đọc |
| `instructions` | Chỉ dẫn từng đoạn rẽ: `text`, `street_name`, `distance`, `time`, `interval`, `heading` (hướng la bàn), `sign` (mã rẽ) | phản hồi |
| `sign` | -2 rẽ trái, 2 rẽ phải, 0 đi tiếp, 6 vòng xoay, 7 đi bên phải, -7 đi bên trái, -8 quay đầu, 4 kết thúc | phản hồi (từ các câu chữ) |
| `toll_cost` | Tổng phí trạm của đường đi | phản hồi |
| `tolls` | Danh sách các trạm thu phí trên đường đi | phản hồi |
| `id` (của trạm) | Số của trạm trong cơ sở dữ liệu của dịch vụ định tuyến | phản hồi |
| `name`, `address` | Tên và vị trí trạm | phản hồi |
| `price` | Phí tại trạm theo cỡ container đã chọn | phản hồi |
| `type` | Loại trạm; thấy `"exit"` (lối ra cao tốc) hoặc để trống | tôi đọc |
| `lat`, `lng` | Latitude, longitude: vĩ độ, kinh độ của trạm | phản hồi |

## 3. Tham số của yêu cầu định tuyến

| Phần | Nghĩa | Nguồn |
|---|---|---|
| `/api/proxy/api/v1/map/routing/route` | Địa chỉ tính một tuyến; proxy = máy chủ trung gian chuyển câu hỏi tới dịch vụ thật | phản hồi |
| `GET` / `POST` | GET = đọc dữ liệu; POST = gửi dữ liệu để xử lý (dùng ở `service-rates/preview`) | thông thường |
| `point=lat,lng` | Một điểm trên bản đồ; hai điểm = một chặng | phản hồi |
| `vehicle=container` | Loại xe: đầu kéo container | phản hồi |
| `capacity=30000` | Tải trọng; không ghi đơn vị, có lẽ kilôgam (30 tấn) | tôi đọc |
| `alternative=true` | "Cho cả các đường đi khác" | tôi đọc |
| `annotations=toll` | "Cho cả thông tin phí trạm" | tôi đọc |
| `container_type=20` hoặc `40` | Chiều dài container tính bằng feet; làm đổi giá trạm | phản hồi |
| `apikey=…` | Khóa bí mật của ứng dụng với nhà cung cấp bản đồ; không chia sẻ | phản hồi |

## 4. Từ về web và DevTools

| Từ | Nghĩa |
|---|---|
| API | Application Programming Interface: cách trang web hỏi máy chủ để lấy dữ liệu |
| endpoint | Một địa chỉ API cụ thể |
| request / response | Câu hỏi trang gửi đi / câu trả lời nhận về |
| payload | Dữ liệu gửi kèm trong yêu cầu (POST) |
| JSON | Định dạng chữ cho dữ liệu, ví dụ `{"price":19000}` |
| Fetch/XHR | Loại yêu cầu chạy nền để lấy dữ liệu mà không tải lại trang |
| DevTools, tab Network | Công cụ lập trình viên của trình duyệt; tab liệt kê mọi yêu cầu |
| Keep log (= Preserve log) | Không xoá danh sách yêu cầu khi trang đổi |
| 200 OK, 401, 404 | Thành công; chưa đăng nhập; không tìm thấy |
| UTC | Giờ chuẩn thế giới; Việt Nam = UTC+7 (12:21 UTC = 19:21 giờ địa phương) |
| client-side key | Khóa hiện trong trình duyệt, không giấu ở máy chủ |
| dev, staging | Bản sao dùng để thử của hệ thống (dev = development) |

## 5. Chữ viết tắt về chi phí và tiền

| Viết tắt | Nghĩa | Nguồn |
|---|---|---|
| ₫, VND | Đồng Việt Nam | thông thường |
| km, l/100km | Ki-lô-mét; lít trên 100 km (mức tiêu hao nhiên liệu) | thông thường |
| ETA | Estimated Time of Arrival (giờ đến dự kiến); ở đây còn dùng cho thời gian di chuyển của tuyến | màn hình |
| TS01 … TS22 | Mã tham số chi phí trong bảng "Đơn giá vận chuyển dự kiến (trung bình)" ("Mã tham số"); TS = tham số | màn hình; TS tôi đọc |
| DM01, DM02 | Định mức nhiên liệu (Định Mức), lít trên 100 km | tôi đọc |
| GD01 … GD07 | Đơn giá dầu (Giá Dầu) | tôi đọc |
| C001 … C030 | Mã chi phí ("Mã chi phí") | màn hình |
| PCH01, PCH02 | Phí Chi Hộ: khoản chi hộ cho khách hàng | tôi đọc |
| ADM | "Chi phí quản lý (ADM)": chi phí quản lý; nhiều khả năng là administration | màn hình cho nghĩa tiếng Việt; ADM tôi đọc |
| DT | Doanh Thu | tôi đọc |
| DK / TT | Dự Kiến / Thực Tế: kế hoạch / thực tế | tôi đọc |
| NS | Nhân Sự | tôi đọc |
| TNDS | Bảo hiểm trách nhiệm dân sự của bên thứ ba | tôi đọc |
| LOLO, LO/LO | Lift-On / Lift-Off: nâng container lên hoặc xuống xe tại bãi hay cảng | tôi đọc |
| PNL | Profit and Loss: lãi lỗ | tôi đọc |
| GPS | Định vị vệ tinh; ở đây là quãng đường và thời gian "Tự động – GPS" | thông thường |

## 6. Từ về logistics

| Viết tắt | Nghĩa | Nguồn |
|---|---|---|
| HX / HN | Hàng Xuất (xuất khẩu) / Hàng Nhập (nhập khẩu) | màn hình |
| CR, CH, CC, HT, LT, ĐS | Chuyển rỗng, Chuyển hàng, Chuyển cont, Headtruck, Làm tàu, Đi soi | tên trên màn hình; nghĩa ngắn tôi đọc |
| cont | container | thông thường |
| 20GP, 40HC, 45HC … | Số = chiều dài tính bằng feet; GP đa dụng, HC high cube (cao hơn), DC dry container, OT open top, FR flat rack, RH reefer (lạnh, high cube), TK tank | mã ngành, tôi đọc |
| seal | Khóa đánh số trên cửa container | thông thường |
| Booking / BL | Số đặt chỗ vận chuyển / Bill of Lading (vận đơn đường biển) | màn hình |
| Depot, Port | Bãi container, cảng biển | màn hình |
| CY to Door, Door to CY | Từ bãi container tới cửa khách hàng và ngược lại | màn hình |
| VSL / VOY, ETD / ETA | Tên tàu / chuyến tàu; giờ tàu đi / đến dự kiến | màn hình |
| LĐĐ | Lệnh Điều Động = dispatch order; mã dạng `#BTC26SHP-…` | màn hình |
| ĐPV | Có lẽ "điều phối viên" trong "ĐPV nhập tay" | chưa biết |
| MST, SĐT, CCCD, GPLX | Mã số thuế, số điện thoại, số căn cước công dân, giấy phép lái xe | màn hình |
| QL, CT | Quốc Lộ (QL13), Cao Tốc | thông thường |

## 7. Mã trong ID

| Mã | Nghĩa | Nguồn |
|---|---|---|
| BTC | Tiền tố dữ liệu của công ty này ("tenant") | tôi đọc |
| ORD / SHP / CLI / DG / R / DB | Đơn hàng / lệnh điều động ("shipment") / khách hàng / đơn giá / tuyến / Debit Note; ví dụ `BTC26ORD-000996`, `BTCR-0009` | màn hình |

## 8. Từ của riêng dự án

| Từ | Nghĩa |
|---|---|
| EXP-002 | Số thư mục khám phá của công việc này |
| FIND-### | Một phát hiện (điều tôi thấy), không có kết luận |
| U# / Q# | Một điểm chưa rõ / một câu hỏi mở dành cho người dùng |
| Gate 0 | Các xác nhận của người thật trước mọi lần chạy test |
| headed | Cửa sổ trình duyệt hiện ra cho người dùng thấy |
| snapshot | Bản sao dạng chữ của trang mà tôi đọc |
| oracle | Nguồn của đáp án đúng mong đợi |
| CRUD | Create, Read, Update, Delete: các thao tác cơ bản trên một bản ghi |
