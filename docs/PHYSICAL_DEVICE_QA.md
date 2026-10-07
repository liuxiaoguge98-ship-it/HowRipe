# Physical-device QA — DEPLOY-00

**Status: OPEN.** Run this on a real iPhone Safari or Android Chrome. Do not mark PASS from desktop browser emulation.

Open the canonical production URL: https://www.howripe.com

The current production origin is https://www.howripe.com. Historical Vercel preview URLs in release archives are evidence for those earlier candidates.

1. Open the homepage.
2. Open Avocado.
3. Scroll normally from top to bottom.
4. Start a vertical swipe directly on a Quiz image.
5. Confirm the page continues scrolling.
6. Start a vertical swipe on **Check firmness**.
7. Confirm the page can still scroll normally.
8. Tap **Check firmness**.
9. Confirm **Resistance** appears.
10. Confirm it does not submit the answer.
11. Select A/B.
12. Test a wrong answer → **Got it**.
13. Complete the Quiz.
14. Expand an FAQ item.
15. Check there is no horizontal page movement.
16. Check images load cleanly.
17. Repeat one representative flow on a Persimmon text option.
18. Record device, OS version, browser version, and any issue/reproduction steps.

Result: **OPEN**

Device / OS / browser: _not yet recorded_

Findings: _not yet recorded_
