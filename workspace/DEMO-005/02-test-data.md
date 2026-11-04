# Test data: DEMO-005 login and registration / Dữ liệu kiểm thử: đăng nhập và đăng ký

- Feature ID: DEMO-005
- Date: 2026-11-05
- By: manual-tester
- Status: rules only; waiting for human approval together with TC-004 to TC-006 / chỉ chứa quy tắc; chờ người duyệt

<!-- Language: bilingual (vi + en). Keys and IDs stay in English. -->

> This file holds RULES ONLY: no real values, no passwords, no email addresses. Values are read from environment variable names or generated at run time and never stored. The only domain allowed in generated emails is the reserved domain `example.com`. / Tệp này chỉ chứa QUY TẮC: không có giá trị thật, không mật khẩu, không địa chỉ email. Giá trị lấy từ tên biến môi trường hoặc sinh lúc chạy, không lưu lại. Email sinh ra chỉ dùng tên miền dành riêng `example.com`.

## Data sets

| Data set | Purpose / Mục đích | Used by | How it is produced / Cách tạo | Cleanup note / Dọn dẹp |
|---|---|---|---|---|
| valid user | Sign in with a known good account (email + password) / Đăng nhập bằng tài khoản đúng | TC-001 | Env var NAME `QA_TEST_USER` (holds the email) and `QA_TEST_PASSWORD`; set by the human; account created by the human on /register | Account stays; the human decides whether to delete it |
| unknown email | An email that has no account / Email chưa có tài khoản | TC-002 | Generated at run time on `example.com`, never stored | Nothing created |
| wrong password | A password that differs from the valid one / Mật khẩu khác mật khẩu đúng | TC-002 (random password), TC-003 | Generated at run time, random, must differ from `QA_TEST_PASSWORD`, never stored | Nothing created |
| new user for registration | Create a new account / Tạo tài khoản mới: full name, email, password | TC-004 | All three generated at run time, email on `example.com`, never stored | The created account stays; the human decides whether to delete it |
| duplicate email | Register again with an email that already has an account / Đăng ký lại với email đã tồn tại | TC-005 | Email from env var NAME `QA_TEST_USER`; full name and password generated at run time, never stored | Nothing should be created; if an account is created by mistake, report it as a defect and the human decides |
| malformed email | An email without a valid shape (for example, missing the "@" part or the domain part) / Email sai định dạng | TC-006 | Generated at run time by the human following this rule, never stored | Nothing should be created; same rule as above |
| empty field | A required field left blank / Bỏ trống trường bắt buộc | none yet (REQ-004 is out of scope; reserved for a later request) | Nothing typed in the field | Nothing created |
| overly long value | A value much longer than normal in name, email or password / Giá trị quá dài | none yet (reserved, not in any approved or draft TC) | Generated at run time, never stored; length chosen by the human, kept small | Nothing should be created |
| weak password | A very short or trivial password / Mật khẩu quá yếu | TC-006 | Generated at run time by the human (short, trivial), never stored; rules unknown (Q5) | Nothing should be created; same rule as above |

## How the human prepares / Người thực hiện chuẩn bị

1. Create the real test account yourself on `/register` of the host (test data only, per the user). Do it by yourself; the AI does not sign up. / Tự tạo tài khoản test trên trang `/register`; AI không đăng ký.
2. Set `QA_TEST_USER` (the email) and `QA_TEST_PASSWORD` in your own PowerShell session with the `Read-Host` pattern (the value is typed at the prompt, not written in a command). Never type the values in chat or in any file. / Đặt hai biến trong phiên PowerShell của bạn bằng mẫu `Read-Host`; không gõ giá trị vào chat hoặc tệp.
3. Generate the run-time values (unknown email, wrong password, new user, malformed email, weak password) at the moment of the run, using only `example.com` for emails. Do not save them anywhere. / Sinh các giá trị lúc chạy, email chỉ dùng `example.com`, không lưu.
4. The AI does not sign up and does not type credentials on this host, because the host name has no test label. The AI only opens pages, takes snapshots and screenshots and reads results. / AI không đăng ký và không nhập thông tin đăng nhập trên host này vì tên host không có nhãn test; AI chỉ mở trang, chụp và đọc kết quả.
5. Mask the email and any personal-looking value in screenshots before saving; if masking is not possible, do not save the file. / Che email và giá trị giống dữ liệu cá nhân trong ảnh chụp trước khi lưu.

## Open questions

- Q5: password rules (minimum length, character types) are unknown; the weak password is chosen by the human and the result is recorded from the first run.
- Q8: should the account created by TC-004 be deleted afterwards? (Assumed: it stays; the human decides.)
