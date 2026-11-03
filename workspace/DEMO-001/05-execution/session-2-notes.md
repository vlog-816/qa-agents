# Exploration session 2: DEMO-001 (2026-11-03)

Same rules as session 1: demo host only, built-in browser, fake data, no register/login/checkout. Cart left empty at the end.

| # | Action | Observed |
|---|---|---|
| 10 | Product pages of all 6 books (read-only) | Out of stock: only "Copy of Computing and Internet EX". "In stock" but NO Add to cart: "Fiction EX" (has qty box) and "Science" (no qty box, no button). |
| 11 | Add Computing and Internet from its product page | Added (qty 1). The product page also shows related products with their own Add to cart buttons. |
| 12 | Qty `2.5`, Update | Reset to 1, no error message. |
| 13 | Qty empty, Update | Stayed 1, no error message. |
| 14 | Qty `0`, Update | Item removed, cart empty, no message. |
| 15 | Add Computing and Internet twice | One line, qty 2, line total 20.00. |
| 16 | Add Health Book as a second product | Two lines. Sub-Total 30.00. **Shipping and Total show "Calculated during checkout"** (no total number), header (3). With Computing/Fiction only, Shipping 0.00 and a Total were shown. |
| 17 | Reload /cart | Cart kept (2 lines, header (3)). |
| 18 | Remove both (ticks + Update) | Cart empty, header (0). |

Not done: new browser session / cleared cookies, second tab, shipping estimate (needs country and zip), checkout.
