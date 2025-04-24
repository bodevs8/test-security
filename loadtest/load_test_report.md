# Báo cáo Kiểm tra Tải (Load Testing Report)

Báo cáo này tổng hợp kết quả kiểm tra tải sử dụng hai công cụ khác nhau: Artillery và Apache Benchmark (AB).

## Cấu hình Chung

Các bài kiểm tra được thực hiện với các thông số sau:

- **Artillery & AB**: 20,000 requests, 20,000 kết nối đồng thời, 60 giây
- **URL kiểm tra**: http://localhost:3000/ (trang chủ)

## Cấu hình PM2

```javascript
module.exports = {
  apps: [
    {
      name: 't08lega-web',
      port: '3000',
      exec_mode: 'fork',
      instances: 1,
      script:
        'node --expose-gc --inspect --trace-gc --max-semi-space-size=128 node_modules/.bin/next start',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      exp_backoff_restart_delay: 100,
      merge_logs: true,
      node_args: '',
      kill_timeout: 10000,
      max_restarts: 10,
      min_uptime: '30s',
      listen_timeout: 30000,
      wait_ready: true,
      kill_signal: 'SIGTERM',
    },
  ],
};
```

## Kết quả Kiểm tra

### 1. Artillery

```
Summary:
http.codes.200: 20000
http.request_rate: 126/sec
http.requests: 20000
http.response_time.mean: 37.6 ms
http.response_time.median: 27.9 ms
http.response_time.p95: 53 ms
http.response_time.p99: 138.4 ms
vusers.completed: 20000
vusers.failed: 0
vusers.session_length.mean: 589.2 ms
```

> Lưu ý: Lệnh `artillery report` đã bị ngừng hỗ trợ. Để có báo cáo dạng đồ thị, cần sử dụng Artillery Cloud (https://app.artillery.io).

### 2. Apache Benchmark (AB) qua Artillery

```
Summary:
http.codes.200: 20000
http.request_rate: 127/sec
http.requests: 20000
http.response_time.mean: 35 ms
http.response_time.median: 27.9 ms
http.response_time.p95: 61 ms
http.response_time.p99: 144 ms
vusers.completed: 20000
vusers.failed: 0
vusers.session_length.mean: 595.7 ms
```

## So sánh Kết quả

| Công cụ   | RPS | Độ trễ trung bình | Độ trễ P99 | Tỉ lệ lỗi |
| --------- | --- | ----------------- | ---------- | --------- |
| Artillery | 126 | 37.6 ms           | 138.4 ms   | 0%        |
| AB        | 127 | 35 ms             | 144 ms     | 0%        |

## Nhận xét

1. **Artillery và AB** cho kết quả tương đối giống nhau với khoảng 126-127 request/giây, độ trễ trung bình ~35-37ms và không có lỗi.

2. Cấu hình PM2 hiện tại chỉ chạy với 1 instance, có thể cân nhắc tăng số lượng instance để cải thiện hiệu suất.

## Kết luận

Để cải thiện hiệu suất, có thể cân nhắc:

1. Tăng số lượng PM2 instances (`instances: 'max'` thay vì `instances: 1`)
2. Sử dụng chế độ cluster thay vì fork (`exec_mode: 'cluster'` thay vì `exec_mode: 'fork'`)
3. Tối ưu hóa cấu hình Node.js với các tham số phù hợp hơn
