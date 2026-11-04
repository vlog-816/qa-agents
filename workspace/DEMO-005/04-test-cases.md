# Test cases: DEMO-005 login page / Test case: trang đăng nhập

Framework-neutral. Steps marked `run_by: human` are typed by a human from their own environment variables (this host has no test label, so the AI types no credentials). Post-login page and error wording are assumptions, checked loosely and recorded from the first human run. / Các bước `run_by: human` do người thực hiện nhập; trang sau đăng nhập và nội dung lỗi là giả định.

```yaml
id: TC-001
req: [REQ-001, REQ-002]
title: Login form is shown and a valid account signs in / Form đăng nhập hiển thị và tài khoản hợp lệ đăng nhập được
platform: web
priority: P1
type: functional
tags: [login, smoke, happy-path]
preconditions:
  - The dedicated test account exists and is active / Tài khoản test tồn tại và đang hoạt động
  - The browser starts logged out (fresh context) / Trình duyệt bắt đầu ở trạng thái chưa đăng nhập
  - The human has set the environment variables below / Người thực hiện đã đặt biến môi trường
test_data:
  username_env: QA_TEST_USER        # NAME only; holds the email
  password_env: QA_TEST_PASSWORD    # NAME only
steps:
  - n: 1
    run_by: ai
    action: Open the login page (/login) / Mở trang đăng nhập
    expected: The form is displayed with an empty email field, an empty password field and an enabled "Sign in" button / Form hiển thị với ô email trống, ô mật khẩu trống và nút "Sign in" bật
  - n: 2
    run_by: human
    action: Type the value of QA_TEST_USER in the email field / Nhập giá trị QA_TEST_USER vào ô email
    expected: The email field holds the typed value / Ô email có giá trị đã nhập
  - n: 3
    run_by: human
    action: Type the value of QA_TEST_PASSWORD in the password field / Nhập giá trị QA_TEST_PASSWORD vào ô mật khẩu
    expected: The password field is masked / Ô mật khẩu được che
  - n: 4
    run_by: human
    action: Click "Sign in" / Bấm "Sign in"
    expected: The browser leaves /login and a signed-in area is shown (exact page recorded from the first run); no error message is shown / Trình duyệt rời /login, khu vực đã đăng nhập hiển thị (trang cụ thể ghi từ lần chạy đầu); không có thông báo lỗi
expected_result: The form is shown correctly and a valid email and password sign the user in (leaves /login, no error).
automation_candidate: yes   # the script is run by the human (credentials), not by the AI
environment: vlog-ai-powered-assistant.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Use assumptions, approve)"
review_date: "2026-11-05"
open_questions:
  - Q1: exact post-login page is unknown (loose check)
```

```yaml
id: TC-002
req: [REQ-003]
title: Unknown email with a random password is rejected / Email không tồn tại với mật khẩu ngẫu nhiên bị từ chối
platform: web
priority: P1
type: negative
tags: [login, negative]
preconditions:
  - The browser starts logged out (fresh context) / Chưa đăng nhập
test_data:
  email: generated at run time (an address that does not exist); never written in any file
  password: generated at run time (random); never written in any file
steps:
  - n: 1
    run_by: ai
    action: Open the login page (/login) / Mở trang đăng nhập
    expected: The login form is displayed / Form hiển thị
  - n: 2
    run_by: human
    action: Type the generated unknown email in the email field / Nhập email không tồn tại (sinh lúc chạy)
    expected: The email field holds the typed value
  - n: 3
    run_by: human
    action: Type the generated random password in the password field / Nhập mật khẩu ngẫu nhiên (sinh lúc chạy)
    expected: The password field is masked
  - n: 4
    run_by: human
    action: Click "Sign in" / Bấm "Sign in"
    expected: The user stays on /login, an error message is shown (wording recorded from the first run), and no signed-in area is shown / Vẫn ở /login, có thông báo lỗi, không có khu vực đã đăng nhập
expected_result: The sign-in is rejected: stays on /login, an error is shown, no signed-in area.
automation_candidate: yes   # the script is run by the human, not by the AI
environment: vlog-ai-powered-assistant.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Use assumptions, approve)"
review_date: "2026-11-05"
open_questions:
  - Q2: error wording unknown (loose check: any error shown)
```

```yaml
id: TC-003
req: [REQ-003]
title: Valid email with a wrong password is rejected / Email hợp lệ với mật khẩu sai bị từ chối
platform: web
priority: P1
type: negative
tags: [login, negative]
preconditions:
  - The dedicated test account exists and is active / Tài khoản test tồn tại
  - The browser starts logged out (fresh context) / Chưa đăng nhập
test_data:
  username_env: QA_TEST_USER        # NAME only; holds the email
  password: generated at run time (random, different from QA_TEST_PASSWORD); never written in any file
steps:
  - n: 1
    run_by: ai
    action: Open the login page (/login) / Mở trang đăng nhập
    expected: The login form is displayed / Form hiển thị
  - n: 2
    run_by: human
    action: Type the value of QA_TEST_USER in the email field / Nhập giá trị QA_TEST_USER vào ô email
    expected: The email field holds the typed value
  - n: 3
    run_by: human
    action: Type the generated wrong password in the password field / Nhập mật khẩu sai (sinh lúc chạy)
    expected: The password field is masked
  - n: 4
    run_by: human
    action: Click "Sign in" / Bấm "Sign in"
    expected: The user stays on /login, an error message is shown (wording recorded from the first run), and no signed-in area is shown / Vẫn ở /login, có thông báo lỗi, không có khu vực đã đăng nhập
expected_result: The sign-in is rejected: stays on /login, an error is shown, no signed-in area.
automation_candidate: yes   # the script is run by the human, not by the AI
environment: vlog-ai-powered-assistant.vercel.app
review_status: approved
reviewed_by: "Boss-QA (the user, in chat: Use assumptions, approve)"
review_date: "2026-11-05"
open_questions:
  - Q2: error wording unknown (loose check: any error shown)
```

<!-- Added 2026-11-05 (amendment): registration cases TC-004 to TC-006. Status draft, waiting for human approval. Test data rules: 02-test-data.md. / Thêm các case đăng ký, đang chờ duyệt. -->

```yaml
id: TC-004
req: [REQ-005, REQ-006]
title: Registration form is shown and a new email creates an account / Form đăng ký hiển thị và email mới tạo được tài khoản
platform: web
priority: P1
type: functional
tags: [register, happy-path]
preconditions:
  - The browser starts logged out (fresh context) / Chưa đăng nhập
  - The human accepts that the created account stays on the deployment (test data only) / Tài khoản tạo ra được giữ lại
test_data:
  full_name: generated at run time; never written in any file
  email: generated at run time on the reserved domain example.com; never written in any file
  password: generated at run time (random); never written in any file
steps:
  - n: 1
    run_by: ai
    action: Open the registration page (/register) / Mở trang đăng ký
    expected: The form is displayed with empty "Full Name", "Email" and "Password" fields and an enabled "Create Account" button / Form hiển thị với 3 ô trống và nút "Create Account" bật
  - n: 2
    run_by: human
    action: Type the generated full name in the "Full Name" field / Nhập họ tên (sinh lúc chạy)
    expected: The field holds the typed value
  - n: 3
    run_by: human
    action: Type the generated new email in the "Email" field / Nhập email mới (sinh lúc chạy)
    expected: The field holds the typed value
  - n: 4
    run_by: human
    action: Type the generated password in the "Password" field / Nhập mật khẩu (sinh lúc chạy)
    expected: The password field is masked
  - n: 5
    run_by: human
    action: Click "Create Account" / Bấm "Create Account"
    expected: The account is created: the user is signed in or sent to /login (exact behavior recorded from the first run); no error message is shown / Tài khoản được tạo: đã đăng nhập hoặc chuyển về /login (ghi từ lần chạy đầu); không có thông báo lỗi
expected_result: The form is shown correctly and a new email with a valid name and password creates an account without an error.
automation_candidate: no   # typing by human only on this host; creates data
environment: vlog-ai-powered-assistant.vercel.app
review_status: withdrawn   # withdrawn 2026-11-05 for the production smoke test (could create a real account)
open_questions:
  - Q6: behavior after registering is unknown (loose check)
  - Q8: should the created account be deleted afterwards? (assumed: it stays; the human decides)
```

```yaml
id: TC-005
req: [REQ-006]
title: Registration with an existing email is rejected / Đăng ký với email đã tồn tại bị từ chối
platform: web
priority: P1
type: negative
tags: [register, negative]
preconditions:
  - The dedicated test account exists (created by the human) / Tài khoản test đã tồn tại
  - The browser starts logged out (fresh context) / Chưa đăng nhập
  - The human has set the environment variable below / Đã đặt biến môi trường
test_data:
  email_env: QA_TEST_USER     # NAME only; holds the email of the existing account
  full_name: generated at run time; never written in any file
  password: generated at run time (random); never written in any file
steps:
  - n: 1
    run_by: ai
    action: Open the registration page (/register) / Mở trang đăng ký
    expected: The registration form is displayed / Form đăng ký hiển thị
  - n: 2
    run_by: human
    action: Type the generated full name in the "Full Name" field / Nhập họ tên (sinh lúc chạy)
    expected: The field holds the typed value
  - n: 3
    run_by: human
    action: Type the value of QA_TEST_USER in the "Email" field / Nhập giá trị QA_TEST_USER vào ô email
    expected: The field holds the typed value
  - n: 4
    run_by: human
    action: Type the generated password in the "Password" field / Nhập mật khẩu (sinh lúc chạy)
    expected: The password field is masked
  - n: 5
    run_by: human
    action: Click "Create Account" / Bấm "Create Account"
    expected: An error message is shown (wording recorded from the first run) and no new account is created / Có thông báo lỗi (nội dung ghi từ lần chạy đầu) và không tạo tài khoản mới
expected_result: The duplicate email is rejected with an error and no account is created.
automation_candidate: no
environment: vlog-ai-powered-assistant.vercel.app
review_status: withdrawn   # withdrawn 2026-11-05 for the production smoke test (could create a real account)
open_questions:
  - Q6: duplicate-email error wording unknown (loose check: any error shown)
```

```yaml
id: TC-006
req: [REQ-006]
title: Malformed email or weak password is rejected at registration / Email sai định dạng hoặc mật khẩu yếu bị từ chối khi đăng ký
platform: web
priority: P2
type: negative
tags: [register, negative, validation]
preconditions:
  - The browser starts logged out (fresh context) / Chưa đăng nhập
test_data:
  full_name: generated at run time; never written in any file
  malformed_email: generated at run time following the rule in 02-test-data.md; never written in any file
  valid_shaped_email: generated at run time on the reserved domain example.com; never written in any file
  password_for_part_a: generated at run time (random); never written in any file
  weak_password: generated at run time (very short or trivial); never written in any file
steps:
  - n: 1
    run_by: ai
    action: Open the registration page (/register) / Mở trang đăng ký
    expected: The registration form is displayed / Form đăng ký hiển thị
  - n: 2
    run_by: human
    action: "Part A: type the generated full name, the generated malformed email and the generated password in the three fields / Phần A: nhập họ tên, email sai định dạng và mật khẩu (sinh lúc chạy)"
    expected: The fields hold the typed values; the password field is masked
  - n: 3
    run_by: human
    action: Click "Create Account" / Bấm "Create Account"
    expected: The form is not accepted: submit is blocked or an error is shown (wording recorded from the first run), the user stays on /register and no account is created / Form không được chấp nhận, vẫn ở /register, không tạo tài khoản
  - n: 4
    run_by: ai
    action: Open the registration page (/register) again so the form is empty / Mở lại trang đăng ký để form trống
    expected: The registration form is displayed with empty fields
  - n: 5
    run_by: human
    action: "Part B: type the generated full name, the generated valid-shaped email and the generated weak password in the three fields / Phần B: nhập họ tên, email đúng dạng và mật khẩu yếu (sinh lúc chạy)"
    expected: The fields hold the typed values; the password field is masked
  - n: 6
    run_by: human
    action: Click "Create Account" / Bấm "Create Account"
    expected: The form is not accepted: submit is blocked or an error is shown (wording recorded from the first run), the user stays on /register and no account is created; if the account is created, record it as a finding and tell the human / Form không được chấp nhận; nếu tài khoản vẫn được tạo thì ghi nhận là phát hiện
expected_result: A malformed email and a weak password are each rejected and no account is created.
automation_candidate: no
environment: vlog-ai-powered-assistant.vercel.app
review_status: withdrawn   # withdrawn 2026-11-05 for the production smoke test (could create a real account)
open_questions:
  - Q5: password rules unknown (what counts as weak is chosen by the human; loose check)
  - Q6: error wording unknown (loose check: blocked or any error shown)
```
