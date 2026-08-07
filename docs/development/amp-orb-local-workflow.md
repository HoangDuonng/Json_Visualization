# Quy trình phát triển trên Amp Orb và đồng bộ về local

> Tài liệu này được kiểm tra theo Amp CLI `0.0.1785861307-g4e053f` ngày 04/08/2026.
> Giao diện và tùy chọn CLI có thể thay đổi ở các phiên bản Amp sau.

## Mục tiêu

Chạy agent trên Amp Orb để không chiếm tài nguyên máy cá nhân, nhưng vẫn nhận thay đổi về local
một cách liên tục, dễ review và không làm lịch sử Git trở nên khó kiểm soát.

## Kết luận nhanh

Amp hiện có hai cách làm chính thức:

1. **Orb + `amp sync`**: agent làm việc trên máy từ xa; một tiến trình `amp sync` đang chạy sẽ
   liên tục mirror thay đổi từ working tree của Orb vào local checkout.
2. **Amp Runner**: agent chạy trên máy local và sửa trực tiếp checkout local; không cần đồng bộ.

Không có cơ chế để một Orb tự sửa filesystem trên laptop khi laptop không chạy tiến trình nhận
thay đổi. Nếu vẫn muốn dùng Orb, cách đúng là chạy `amp sync` một lần và giữ tiến trình đó hoạt
động trong lúc làm việc.

## Cách khuyến nghị: Orb + live `amp sync` + Git worktree riêng

### 1. Chuẩn bị branch và worktree riêng

Không nên sync một Orb vào checkout đang dùng cho công việc khác. Tạo một Git worktree riêng cho
task giúp tránh đổi branch ngoài ý muốn và giảm nguy cơ trộn các thay đổi chưa commit:

```bash
git worktree add ../json-viz-orb -b amp/my-task develop
cd ../json-viz-orb
```

Thay:

- `../json-viz-orb` bằng thư mục worktree mong muốn;
- `amp/my-task` bằng tên branch cho task;
- `develop` bằng branch hoặc commit nền phù hợp với task.

Nên bảo đảm working tree sạch trước khi sync:

```bash
git status
```

### 2. Tạo thread trên Orb

Có thể tạo Orb thread bằng một trong các cách chính thức:

- Trên web: tạo thread mới và chọn đúng project;
- Trong Amp TUI: dùng `thread: new in orb`;
- Từ CLI:

```bash
amp -ox "Mô tả task cần thực hiện"
```

Ghi lại URL hoặc ID của thread, ví dụ:

```text
https://ampcode.com/threads/T-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 3. Bật live mirror về local

Trong worktree vừa tạo, chạy:

```bash
amp sync https://ampcode.com/threads/T-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Đây là chế độ **live mirror**. Lệnh tiếp tục chạy và mirror các thay đổi trong working tree của
Orb về local trong lúc agent làm việc. Vì vậy không cần chạy lại hoặc bấm Sync sau mỗi thay đổi.

Giữ terminal này mở. Khi muốn dừng mirror, nhấn `Ctrl+C`. Việc dừng tiến trình không tự hoàn tác
những file đã được mirror về local.

Luồng hoạt động:

```text
Amp agent trên Orb
        │
        │ thay đổi working tree
        ▼
Tiến trình `amp sync` đang chạy
        │
        │ live mirror
        ▼
Git worktree trên máy local
```

### 4. Giữ quyền kiểm soát commit ở local

Nếu muốn tự quản lý lịch sử Git, hãy nói rõ với agent:

```text
Do not commit or push. Leave all changes in the working tree so I can review and commit locally.
```

Sau khi agent hoàn thành:

```bash
git status
git diff
git add -p
git commit -m "feat: mô tả thay đổi"
```

`git add -p` cho phép chọn từng phần thay đổi trước khi commit, thay vì nhận toàn bộ diff cùng
một lúc.

### 5. Dọn worktree khi task hoàn tất

Chỉ thực hiện sau khi đã commit, chuyển hoặc chủ động bỏ các thay đổi cần thiết:

```bash
cd ../Json-viz
git worktree remove ../json-viz-orb
```

Không dùng `--force` nếu chưa chắc worktree không còn dữ liệu cần giữ.

## Phân biệt live sync và apply một lần

### Live mirror

```bash
amp sync <thread-url-hoặc-id>
```

- Tiến trình tiếp tục chạy;
- thay đổi mới trên Orb tiếp tục được mirror về local;
- phù hợp khi muốn theo dõi và review trong lúc agent đang làm việc.

### Apply một lần

```bash
amp sync --apply <thread-url-hoặc-id>
```

- Chỉ apply trạng thái working tree hiện tại một lần;
- sau đó tiến trình thoát;
- thay đổi phát sinh về sau trên Orb không tự xuất hiện ở local.

## Commit hash xuất hiện khi sync là gì?

Theo phần trợ giúp của Amp CLI, `amp sync` có khái niệm **thread commit**. Đây là Git commit mà
thread đang dựa trên. Amp cần so sánh commit đó với checkout local trước khi có thể mirror chính
xác phần thay đổi trong working tree.

Vì vậy, chuỗi giống như:

```text
05f2ae59...
```

là Git commit SHA dùng để nhận diện trạng thái nền của repository; không nên hiểu nó là tên branch
hay một commit nghiệp vụ mà bắt buộc phải đưa vào lịch sử của mình.

Khi thread commit khác checkout hiện tại, Amp có các lựa chọn sau:

```bash
amp sync --checkout <thread>
```

Cho phép Amp checkout thread commit mà không hỏi lại. Chỉ dùng khi chấp nhận thay đổi checkout
hiện tại và đã kiểm tra working tree an toàn.

```bash
amp sync --skip-checkout <thread>
```

Giữ checkout hiện tại dù thread commit khác. Tùy chọn này không tự làm hai base trở nên tương
thích; chỉ nên dùng khi hiểu rõ quan hệ Git giữa local và Orb.

Nếu không chắc, không truyền hai cờ trên. Đọc thông báo của Amp và kiểm tra:

```bash
git status --short --branch
git log --oneline --decorate -5
```

Worktree riêng là cách đơn giản nhất để việc checkout thread commit không ảnh hưởng checkout chính.

## Những điều nên tránh

1. Không chạy nhiều Orb sync vào cùng một local worktree.
2. Không vừa sửa cùng một đoạn code ở local vừa để agent sửa đoạn đó trên Orb.
3. Không dùng `--checkout` một cách máy móc khi local đang có thay đổi chưa commit.
4. Không yêu cầu agent commit hoặc push nếu mục tiêu là tự xây dựng lịch sử commit ở local.
5. Không coi `amp sync --apply` là đồng bộ liên tục.
6. Không xóa worktree trước khi kiểm tra `git status` và lưu các thay đổi cần thiết.

## Khi nào nên dùng Amp Runner thay cho Orb?

Nếu yêu cầu là agent phải sửa trực tiếp code local mà không chạy `amp sync`, hãy dùng Runner:

```bash
amp --no-tui
```

Sau đó tạo thread từ Amp web và chọn runner đang chạy trên máy đó. Thread sẽ thao tác trên checkout
của runner, vì vậy không có bước chuyển thay đổi từ Orb về local.

Đánh đổi:

| Cách làm | Agent chạy ở đâu? | Cần `amp sync`? | Laptop phải online? |
| --- | --- | --- | --- |
| Orb + live sync | Amp cloud | Có, giữ tiến trình chạy | Có trong lúc nhận live changes |
| Orb không sync | Amp cloud | Không | Không, nhưng code chưa về local |
| Runner | Máy local | Không | Có |

## Quy trình ngắn dùng hằng ngày

```bash
# Tạo vùng làm việc riêng
git worktree add ../json-viz-orb -b amp/my-task develop
cd ../json-viz-orb

# Giữ lệnh này chạy trong một terminal
amp sync <thread-url-hoặc-id>

# Sau khi agent hoàn thành, dừng sync bằng Ctrl+C rồi review
git status
git diff
git add -p
git commit -m "feat: mô tả thay đổi"
```

## Nguồn chính thức

- [Amp Orbs manual](https://ampcode.com/manual/orbs)
- [Amp Owner's Manual](https://ampcode.com/manual)
- Trợ giúp của CLI đang cài đặt: `amp sync --help`

Các điểm được tài liệu Amp xác nhận trực tiếp:

- `amp sync <thread-id>` mirror thay đổi từ Orb vào local checkout trong khi agent tiếp tục làm
  việc từ xa;
- `amp sync --apply <thread>` apply working-tree changes một lần rồi thoát;
- `--checkout` và `--skip-checkout` điều khiển cách xử lý khi thread commit khác checkout hiện tại;
- Runner là cơ chế để thread chạy trên máy có tiến trình Amp runner thay vì trên Orb.
