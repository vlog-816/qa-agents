# Test Cases: DEMO-004 login happy case / Ca kiểm thử: đăng nhập thành công

- Feature ID: DEMO-004
- Date: 2026-11-04
- Platform: web (host `the-internet.herokuapp.com` only)
- Approach: scripted, one case. Written to be automated later by the `automation-tester`. / Một ca có kịch bản, sẽ được tự động hóa sau.
- **Credentials are never written here.** They exist only as the human's environment variables `QA_TEST_USER` and `QA_TEST_PASSWORD`. The AI does not type them; the human runs the step that types them. / Không ghi thông tin đăng nhập ở đây; chỉ là biến môi trường của con người.
- Run results are not stored here (see the execution report). / Kết quả chạy không lưu ở đây.
- Status of the case: `approved` by the approver (the user, acting as Boss-QA) in chat on 2026-11-04 ("Approve plan and case"). / Đã được duyệt ngày 2026-11-04.

```yaml
id: TC-001
req: [REQ-001, REQ-002]
title: Valid username and password lead to the secure area / Username và mật khẩu hợp lệ dẫn tới khu vực bảo mật
platform: web
priority: P1
type: functional
tags: [login, smoke, happy-case]
preconditions:
  - The human has set the environment variables QA_TEST_USER and QA_TEST_PASSWORD in their own terminal session (the script fails fast if either is missing).
  - The browser starts logged out (a fresh browser context).
  - The site is reachable on the allowed host.
test_data:
  username_env: QA_TEST_USER        # NAME of the environment variable; never the value
  password_env: QA_TEST_PASSWORD    # NAME of the environment variable; never the value
steps:
  - n: 1
    action: Open the login page of the site
    expected: The login form is displayed with an empty username field, an empty password field and an enabled "Login" button (REQ-001)
  - n: 2
    action: Enter the username from the environment variable and the password from the environment variable
    expected: Both fields accept the input; the password is not shown in clear text
  - n: 3
    action: Choose the "Login" button
    expected: The browser leaves the login page and the secure area page is shown (address `/secure`) (assumed, Q1)
  - n: 4
    action: Look at the page
    expected: A success message is shown and a "Logout" control is available; no error message is displayed (assumed, Q2)
expected_result: A valid username and password sign the user in and the secure area page is shown with a success message and a Logout control
automation_candidate: yes   # the script is run by the human, not by the AI (credentials)
environment: the-internet.herokuapp.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve plan and case)"
review_date: "2026-11-04"
open_questions: []   # the exact success text is recorded from the first human run
```

## Added 2026-11-04: negative cases for REQ-003 and REQ-004 / Thêm ngày 2026-11-04: các ca âm tính cho REQ-003 và REQ-004

- Status of TC-002 and TC-003: `approved` by the approver (the user, acting as Boss-QA) in chat on 2026-11-04 ("Approve plan and cases"). / Trạng thái: đã duyệt ngày 2026-11-04.
- **The AI does not type on this site; the human runs the script.** The invalid username and the wrong password are random fake values generated at run time and never written in any file. / AI không gõ gì trên trang này; con người chạy script. Giá trị giả được sinh khi chạy, không ghi vào file.
- The exact error wording is assumed (loose check); the actual text is recorded from the first human run. / Câu chữ lỗi chính xác là giả định (kiểm tra lỏng); ghi lại từ lần chạy đầu của con người.

```yaml
id: TC-002
req: [REQ-003]
title: Unknown username is rejected with an error / Username không tồn tại bị từ chối kèm lỗi
platform: web
priority: P1
type: negative
tags: [login, negative, invalid-username]
preconditions:
  - The browser starts logged out (a fresh browser context).
  - The site is reachable on the allowed host.
  - No environment variable is needed for the invalid values; they are generated at run time.
test_data:
  username: "generated at run time: a random string that is not an existing username"
  password: "generated at run time: a random string"
steps:
  - n: 1
    action: Open the login page of the site
    expected: The login form is displayed with an empty username field, an empty password field and an enabled "Login" button
  - n: 2
    action: Enter the generated unknown username and the generated random password
    expected: Both fields accept the input; the password is not shown in clear text
  - n: 3
    action: Choose the "Login" button
    expected: The user is not signed in and stays on the login page (address `/login`)
  - n: 4
    action: Look at the page
    expected: An error message is shown that mentions the username is invalid (assumed wording, loose check, Q4); the login form is shown again; no secure area page and no "Logout" control are present
expected_result: An unknown username is rejected; the user stays on /login with an error message about an invalid username, the form is shown again, and there is no secure area and no Logout control
automation_candidate: yes   # the script is run by the human, not by the AI
environment: the-internet.herokuapp.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve plan and cases)"
review_date: "2026-11-04"
open_questions: []   # the exact error text is recorded from the first human run
```

```yaml
id: TC-003
req: [REQ-004]
title: Wrong password for the valid test user is rejected with an error / Mật khẩu sai của người dùng thử bị từ chối kèm lỗi
platform: web
priority: P1
type: negative
tags: [login, negative, invalid-password]
preconditions:
  - The human has set the environment variable QA_TEST_USER in their own terminal session (the script fails fast if it is missing).
  - The browser starts logged out (a fresh browser context).
  - The site is reachable on the allowed host.
test_data:
  username_env: QA_TEST_USER        # NAME of the environment variable; never the value
  password: "generated at run time: a random string that is not the real password"   # QA_TEST_PASSWORD is not used in this case
steps:
  - n: 1
    action: Open the login page of the site
    expected: The login form is displayed with an empty username field, an empty password field and an enabled "Login" button
  - n: 2
    action: Enter the username from the environment variable and the generated wrong password
    expected: Both fields accept the input; the password is not shown in clear text
  - n: 3
    action: Choose the "Login" button
    expected: The user is not signed in and stays on the login page (address `/login`)
  - n: 4
    action: Look at the page
    expected: An error message is shown that mentions the password is invalid (assumed wording, loose check, Q5); no secure area page and no "Logout" control are present
expected_result: A wrong password for the valid test user is rejected; the user stays on /login with an error message about an invalid password, and there is no secure area and no Logout control
automation_candidate: yes   # the script is run by the human, not by the AI
environment: the-internet.herokuapp.com
review_status: approved
reviewed_by: "Boss-QA (the user, approved in chat: Approve plan and cases)"
review_date: "2026-11-04"
open_questions: []   # the exact error text is recorded from the first human run
```
