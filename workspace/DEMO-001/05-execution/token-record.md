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

## Stage 2: execution sessions (after test plan approval)

| Point | Context tokens | Messages tokens | Pro 5-hour limit | Weekly |
|---|---|---|---|---|
| Before stage 2 | 283,363 | 206,146 | 21% | 4% |
| After stage 2 | 297,205 | 219,988 | 23% | 4% |
| **Delta** | **+13,842** | **+13,842** | +2 points | 0 |

Stage 2 covered about 25 tool calls (product pages, edge quantities, add twice, two products, reload, cleanup) and writing `06-report.md`. Using small page-script reads (instead of whole-page text) kept it lower than stage 1 per action.

Total for both stages: about 38,000 tokens of context growth (242,012 to 297,205 is 55,193 including the plan revision by the subagent, the answers round and my messages; browser stages alone: 24,124 + 13,842 = 37,966).
