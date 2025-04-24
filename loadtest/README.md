# Hướng dẫn Kiểm tra Tải (Load Testing)

Thư mục này chứa các công cụ kiểm tra tải khác nhau để đánh giá hiệu suất ứng dụng web.

## Nội dung

1. [Artillery](#artillery)
2. [Apache Benchmark (ab)](#apache-benchmark)

## Artillery

Artillery là công cụ kiểm tra tải mạnh mẽ dựa trên Node.js.

### Cài đặt

```bash
npm install -g artillery
```

### Cách sử dụng

```bash
# Chạy kiểm tra tải cao với 20.000 request
artillery run loadtest/artillery.yml
```

Tập tin cấu hình `artillery.yml` được thiết lập cho 20.000 CCU với 20.000 kết nối đồng thời.

## Apache Benchmark (ab)

Apache Benchmark là công cụ kiểm tra tải đơn giản và phổ biến.

### Cài đặt

Trên macOS:

```bash
# ab đã được cài đặt sẵn với macOS
# Kiểm tra với
ab -V
```

Trên Ubuntu/Debian:

```bash
sudo apt-get install apache2-utils
```

### Cách sử dụng

Sử dụng Artillery với tập tin cấu hình ab.yml:

```bash
artillery run loadtest/ab.yml
```

Hoặc sử dụng trực tiếp lệnh ab:

```bash
# Gửi 20.000 request, 20000 kết nối đồng thời
ab -n 20000 -c 20000 http://localhost:3000/
```

## Lưu ý

- Các tập tin cấu hình đã được điều chỉnh để hỗ trợ tối đa 20.000 CCU
- Đảm bảo server của bạn đủ mạnh để xử lý lượng tải lớn
- Theo dõi tài nguyên hệ thống trong quá trình kiểm tra tải
