# Báo cáo Kiểm tra Tải 50K Yêu cầu (50K Requests Load Testing Report)

Báo cáo này tổng hợp kết quả kiểm tra tải với 50,000 yêu cầu, sử dụng hai công cụ khác nhau: Artillery và Apache Benchmark (AB).

## Cấu hình Kiểm tra

Các bài kiểm tra được thực hiện với các thông số sau:

- **Số lượng yêu cầu**: 50,000
- **URL kiểm tra**: Trang chủ (http://localhost:3000/)

## Kết quả Kiểm tra

### 1. Artillery (Homepage load test)

```
Tóm tắt:
http.codes.200: 49,832
http.request_rate: 123/giây
http.requests: 50,000
http.response_time.mean: 37.4 ms
http.response_time.median: 26.8 ms
http.response_time.p95: 53 ms
http.response_time.p99: 144 ms
http.response_time.p999: 1939.5 ms
vusers.completed: 49,832
vusers.failed: 168
vusers.session_length.mean: 615.3 ms
```

Các lỗi:

- ETIMEDOUT: 159 lỗi
- ECONNRESET: 9 lỗi

### 2. Apache Benchmark (AB) - Single URL benchmark

```
Tóm tắt:
http.codes.200: 49,918
http.request_rate: 116/giây
http.requests: 50,000
http.response_time.mean: 50.3 ms
http.response_time.median: 26.8 ms
http.response_time.p95: 94.6 ms
http.response_time.p99: 550.1 ms
http.response_time.p999: 2416.8 ms
vusers.completed: 49,918
vusers.failed: 82
vusers.session_length.mean: 687.1 ms
```

Các lỗi:

- ETIMEDOUT: 48 lỗi
- ECONNRESET: 34 lỗi

## So sánh Kết quả

| Công cụ   | RPS | Độ trễ trung bình | Độ trễ P95 | Độ trễ P99 | Độ trễ P999 | Tỉ lệ lỗi | Lỗi hết thời gian | Lỗi kết nối     |
| --------- | --- | ----------------- | ---------- | ---------- | ----------- | --------- | ----------------- | --------------- |
| Artillery | 123 | 37.4 ms           | 53 ms      | 144 ms     | 1939.5 ms   | 0.34%     | 159 (ETIMEDOUT)   | 9 (ECONNRESET)  |
| AB        | 116 | 50.3 ms           | 94.6 ms    | 550.1 ms   | 2416.8 ms   | 0.16%     | 48 (ETIMEDOUT)    | 34 (ECONNRESET) |

## Phân tích

1. **Tỉ lệ xử lý yêu cầu**:

   - Artillery xử lý được 123 yêu cầu/giây
   - AB xử lý được 116 yêu cầu/giây
   - Artillery tỏ ra nhanh hơn một chút về thông lượng

2. **Độ trễ phản hồi**:

   - Độ trễ trung bình của Artillery (37.4 ms) thấp hơn AB (50.3 ms)
   - Ở ngưỡng P95, Artillery (53 ms) vẫn tốt hơn AB (94.6 ms)
   - Ở ngưỡng P99, sự khác biệt rõ rệt: Artillery (144 ms) so với AB (550.1 ms)
   - Ở ngưỡng P999 (0.1% yêu cầu chậm nhất), cả hai đều cao nhưng AB (2416.8 ms) chậm hơn Artillery (1939.5 ms)

3. **Tỉ lệ thành công**:

   - Artillery: 99.66% thành công (49,832/50,000)
   - AB: 99.84% thành công (49,918/50,000)
   - AB có tỉ lệ thành công cao hơn một chút

4. **Phân loại lỗi**:
   - Artillery có nhiều lỗi hết thời gian chờ (ETIMEDOUT: 159) nhưng ít lỗi đứt kết nối (ECONNRESET: 9)
   - AB có ít lỗi hết thời gian chờ hơn (ETIMEDOUT: 48) nhưng nhiều lỗi đứt kết nối hơn (ECONNRESET: 34)

## Kết luận và Đề xuất

1. **Hiệu suất tổng thể**: Ứng dụng cho thấy khả năng chịu tải tốt với 50,000 yêu cầu, duy trì tỉ lệ thành công trên 99.6% và độ trễ phản hồi median dưới 30ms.

2. **So sánh công cụ**:

   - Artillery có thông lượng cao hơn và độ trễ thấp hơn ở hầu hết các phân vị (percentiles)
   - AB có tỉ lệ thành công cao hơn một chút

3. **Điểm cần cải thiện**:

   - Xử lý lỗi hết thời gian chờ (ETIMEDOUT): Có thể tăng giá trị timeout hoặc tối ưu hóa xử lý của server
   - Xử lý lỗi đứt kết nối (ECONNRESET): Nâng cao khả năng duy trì kết nối và phục hồi sau lỗi

4. **Đề xuất tối ưu hóa**:
   - Tăng số lượng worker processes hoặc threads
   - Cài đặt caching cho nội dung tĩnh
   - Tối ưu hóa cấu hình Node.js với các tham số phù hợp hơn
   - Xem xét cấu hình load balancing nếu cần thiết khi triển khai production
