# Exploration notes: DEMO-001 (add to cart main flow)

- Date: 2026-11-03
- Tool: built-in browser of Claude Desktop (navigate, find, form_input, click, small page-script reads). Pane was hidden, so no screenshots were taken.
- Host: https://demowebshop.tricentis.com only. No register, login or checkout. No personal data entered.
- Cart state at the end: empty (header shows (0)).

## Observations (what the site actually did)

| # | Action | Observed result |
|---|---|---|
| 1 | Open Books page | 6 products, default 8 per page (URL `?pagesize=8`). Each shows an old price (struck through) and a selling price. Example: Computing and Internet 30.00 / 10.00; Fiction 35.00 / 24.00. |
| 2 | Add to cart buttons on the list | Found for 3 of 6 products (Computing and Internet, Fiction, Health Book). The other 3 (Copy of Computing and Internet EX, Fiction EX, Science) had no button on the list. Reason not investigated. |
| 3 | Click Add to cart (Computing and Internet) | Message "The product has been added to your shopping cart". Header counter changed to (1). |
| 4 | Open /cart | Columns: Remove, Product, Price, Qty, Total. Unit price 10.00 (the selling price). Sub-Total 10.00, Shipping 0.00, Tax 0.00, Total 10.00. Also shows discount code, gift card, estimate shipping (long country list), terms checkbox, Checkout. |
| 5 | Qty 3, Update shopping cart | Line total 30.00, Total 30.00. Header counter shows (3): it counts **quantity**, not distinct products. |
| 6 | Qty `abc`, Update | Qty went back to 3. No error message found. |
| 7 | Qty `-1`, Update | Item removed, cart shows "Your Shopping Cart is empty!", header (0). No error message. |
| 8 | Add Fiction, qty `10000`, Update | Accepted. Unit 24.00, line total 240000.00 (correct), header (10000). No maximum or warning seen. |
| 9 | Tick Remove, Update | Item removed, cart empty, header (0). |

## Not explored yet

Qty 0, decimals (2.5), empty field, very large values (above 10000), adding the same product twice, adding 2 different products, the 3 products without a list button, product detail page, coupon, shipping estimate, terms, checkout, cart after reload or new session.

## Tool notes

- The page reloads after "Update shopping cart"; element references must be looked up again after each reload.
- Reading the whole /cart page as text is expensive (long country list). Prefer small page-script reads of the cart table.
