# Token record: exploration with the built-in browser (DEMO-001)

Measured with the session usage tool (`get_usage`, session "self"), 2026-11-03.

| Point | Context tokens | Messages tokens | Context % | Pro 5-hour limit | Weekly limit |
|---|---|---|---|---|---|
| Before exploration | 242,012 | 164,795 | 24% | 16% | 3% |
| After exploration | 266,136 | 188,919 | 27% | 18% | 3% |
| **Delta** | **+24,124** | **+24,124** | +3 points | +2 points | 0 |

## How to read this

- Delta is the growth of this conversation's context between the two points. It includes my own messages and the tool calls and results of the exploration (about 40 tool calls). It is an approximation, not the browser alone.
- Fixed overhead that is not in the delta: system tools 34,851 and MCP tools 21,633 tokens are already counted in both measurements (they do not grow).
- Biggest single cost: reading the full /cart page as text (long country list), roughly several thousand tokens. Small page-script reads cost a few hundred tokens each.
- Not included: the earlier web-fetch calls for the two Playwright skills (before the baseline).
- Method for the later refactor: take `get_usage` before and after any stage, record in this table format, and note which tools were used.
