# Kế hoạch kiểm thử Help Dialog

Mục tiêu: ghi lại tất cả tính năng/lệnh trong Help dialog, mô tả chức năng và cách kiểm tra. Danh sách bám theo cấu trúc hiện tại trong `HelpDialog`.

## Tools (Công cụ)

| Phím tắt                    | Lệnh                   | Mô tả/Kết quả mong đợi                    |
| --------------------------- | ---------------------- | ----------------------------------------- |
| `H`                         | Hand                   | Chuyển sang công cụ pan/di chuyển canvas. |
| `V` / `1`                   | Selection              | Chuyển sang công cụ chọn.                 |
| `R` / `2`                   | Rectangle              | Vẽ hình chữ nhật.                         |
| `D` / `3`                   | Diamond                | Vẽ hình thoi.                             |
| `O` / `4`                   | Ellipse                | Vẽ hình elip.                             |
| `A` / `5`                   | Arrow                  | Vẽ mũi tên.                               |
| `L` / `6`                   | Line                   | Vẽ đường thẳng.                           |
| `P` / `7`                   | Freedraw               | Vẽ tự do.                                 |
| `T` / `8`                   | Text                   | Tạo text element.                         |
| `9`                         | Image                  | Chèn ảnh.                                 |
| `E` / `0`                   | Eraser                 | Xóa element.                              |
| `F`                         | Frame                  | Tạo frame.                                |
| `K`                         | Laser                  | Bật con trỏ laser.                        |
| `I` / `Shift+S` / `Shift+G` | Eye dropper            | Lấy màu từ canvas.                        |
| `Ctrl/Cmd+Enter`            | Edit line/arrow points | Vào chế độ sửa điểm line/arrow.           |
| `Enter`                     | Edit text              | Sửa text/ thêm nhãn.                      |
| `Enter` hoặc `Shift+Enter`  | Text new line          | Chèn dòng mới trong text editor.          |
| `Esc` hoặc `Ctrl/Cmd+Enter` | Finish text editing    | Thoát chế độ sửa text.                    |
| `A` rồi click x3            | Curved arrow           | Tạo mũi tên cong bằng 3 điểm.             |
| `L` rồi click x3            | Curved line            | Tạo đường cong bằng 3 điểm.               |
| Double click hoặc `Enter`   | Crop start             | Bắt đầu crop ảnh.                         |
| `Enter` hoặc `Esc`          | Crop finish            | Kết thúc crop ảnh.                        |
| `Q`                         | Tool lock              | Giữ công cụ sau khi vẽ.                   |
| `Ctrl/Cmd` (giữ)            | Prevent binding        | Tạm thời tắt auto binding mũi tên.        |
| `Ctrl/Cmd+K`                | Link                   | Gắn/cập nhật link cho element.            |
| `Tab` / `Shift+Tab`         | Convert element type   | Chuyển loại shape.                        |

## View (Xem)

| Phím tắt                                              | Lệnh                 | Mô tả/Kết quả mong đợi                |
| ----------------------------------------------------- | -------------------- | ------------------------------------- |
| `Ctrl/Cmd++`                                          | Zoom in              | Tăng tỷ lệ zoom.                      |
| `Ctrl/Cmd+-`                                          | Zoom out             | Giảm tỷ lệ zoom.                      |
| `Ctrl/Cmd+0`                                          | Reset zoom           | Đưa zoom về mặc định.                 |
| `Shift+1`                                             | Zoom to fit          | Fit tất cả element vào khung nhìn.    |
| `Shift+2`                                             | Zoom to selection    | Fit vùng chọn vào khung nhìn.         |
| `PgUp/PgDn`                                           | Move page up/down    | Di chuyển canvas theo chiều dọc.      |
| `Shift+PgUp/PgDn`                                     | Move page left/right | Di chuyển canvas theo chiều ngang.    |
| `Alt+Z`                                               | Zen mode             | Bật/tắt Zen mode.                     |
| `Alt+S`                                               | Objects snap mode    | Bật/tắt bắt dính theo đối tượng.      |
| `Ctrl/Cmd+'`                                          | Toggle grid          | Bật/tắt lưới.                         |
| `Alt+R`                                               | View mode            | Bật/tắt view mode.                    |
| `Alt+Shift+D`                                         | Toggle theme         | Chuyển light/dark.                    |
| `Alt+/`                                               | Stats                | Mở/đóng bảng thống kê.                |
| `Ctrl/Cmd+F` (shortcut Search menu)                   | Search               | Mở tìm kiếm trên canvas.              |
| `Ctrl/Cmd+K` (hoặc `Ctrl/Cmd+P` trên một số nền tảng) | Command palette      | Mở bảng lệnh để tìm và thực thi lệnh. |

## Editor (Chỉnh sửa)

| Phím tắt                                          | Lệnh                | Mô tả/Kết quả mong đợi                            |
| ------------------------------------------------- | ------------------- | ------------------------------------------------- |
| `Ctrl/Cmd+Arrow`                                  | Create flowchart    | Tạo flowchart từ element chung.                   |
| `Alt+Arrow`                                       | Navigate flowchart  | Di chuyển trong flowchart.                        |
| `Space+Drag` hoặc `Wheel+Drag`                    | Move canvas         | Kéo canvas khi đang ở bất kỳ tool nào.            |
| `Ctrl/Cmd+Delete`                                 | Clear canvas        | Xóa toàn bộ canvas.                               |
| `Delete`                                          | Delete selection    | Xóa element đang chọn.                            |
| `Ctrl/Cmd+X`                                      | Cut                 | Cắt selection.                                    |
| `Ctrl/Cmd+C`                                      | Copy                | Copy selection.                                   |
| `Ctrl/Cmd+V`                                      | Paste               | Dán.                                              |
| `Ctrl/Cmd+Shift+V`                                | Paste as plaintext  | Dán text dạng plain.                              |
| `Ctrl/Cmd+A`                                      | Select all          | Chọn tất cả element.                              |
| `Shift+Click`                                     | Multi select        | Chọn nhiều element.                               |
| `Ctrl/Cmd+Click`                                  | Deep select         | Chọn sâu bên trong group.                         |
| `Ctrl/Cmd+Drag`                                   | Deep box select     | Chọn sâu trong khung kéo.                         |
| `Shift+Alt+C`                                     | Copy as PNG         | Copy selection ra PNG (chỉ khi clipboard hỗ trợ). |
| `Ctrl/Cmd+Alt+C`                                  | Copy styles         | Sao chép kiểu.                                    |
| `Ctrl/Cmd+Alt+V`                                  | Paste styles        | Dán kiểu.                                         |
| `Ctrl/Cmd+Shift+[` (Win) / `Ctrl/Cmd+Alt+[` (Mac) | Send to back        | Đưa xuống cuối.                                   |
| `Ctrl/Cmd+Shift+]` (Win) / `Ctrl/Cmd+Alt+]` (Mac) | Bring to front      | Đưa lên trên cùng.                                |
| `Ctrl/Cmd+[`                                      | Send backward       | Lùi một lớp.                                      |
| `Ctrl/Cmd+]`                                      | Bring forward       | Tiến một lớp.                                     |
| `Ctrl/Cmd+Shift+Up`                               | Align top           | Căn top.                                          |
| `Ctrl/Cmd+Shift+Down`                             | Align bottom        | Căn bottom.                                       |
| `Ctrl/Cmd+Shift+Left`                             | Align left          | Căn left.                                         |
| `Ctrl/Cmd+Shift+Right`                            | Align right         | Căn right.                                        |
| `Ctrl/Cmd+D` hoặc `Alt+Drag`                      | Duplicate           | Nhân bản selection.                               |
| `Ctrl/Cmd+Shift+L`                                | Toggle element lock | Khóa/mở khóa selection.                           |
| `Ctrl/Cmd+Z`                                      | Undo                | Hoàn tác.                                         |
| `Ctrl/Cmd+Y` (Win) / `Ctrl/Cmd+Shift+Z`           | Redo                | Làm lại.                                          |
| `Ctrl/Cmd+G`                                      | Group               | Gom nhóm.                                         |
| `Ctrl/Cmd+Shift+G`                                | Ungroup             | Tách nhóm.                                        |
| `Shift+H`                                         | Flip horizontal     | Lật ngang.                                        |
| `Shift+V`                                         | Flip vertical       | Lật dọc.                                          |
| `S`                                               | Show stroke         | Mở bảng chọn màu nét.                             |
| `G`                                               | Show background     | Mở bảng chọn màu nền.                             |
| `Shift+F`                                         | Show fonts          | Mở bảng chọn font.                                |
| `Ctrl/Cmd+Shift+<`                                | Decrease font size  | Giảm cỡ chữ.                                      |
| `Ctrl/Cmd+Shift+>`                                | Increase font size  | Tăng cỡ chữ.                                      |

## Ghi chú kiểm thử

- `Command palette` mở hộp tìm kiếm lệnh, cho phép gõ từ khóa và thực thi lệnh nhanh.
- `Copy as PNG` chỉ hiển thị khi trình duyệt hỗ trợ clipboard (hoặc Firefox bật cờ clipboard).
- Một số shortcut thay đổi theo hệ điều hành (Windows/macOS) trong mục Editor.
