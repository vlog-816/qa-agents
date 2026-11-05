# Explain before asking for approval

Applies to every moment where the user must accept something: a tool permission prompt, a plan approval, a question with choices, or a gate in `qa-profile.yaml` (user decision, 2026-11-05).

- Right before the prompt, write a short "like I am 5 years old" explanation in the same message: what I just did, what I want to do now, and why. Two or three short sentences, everyday words, no jargon. If a technical word is needed, explain it with a simple comparison (for example: "CORS is a doorman who checks a guest list").
- Say clearly what will change if the user accepts (for example "I will make a new file" or "I will open this website"), and what stays safe if they refuse.
- Write it in English first, then Vietnamese (global rule). Keep it separate from the technical details, which can follow after.
- Name the file, folder, website or command in plain words, not only in code.
- A prompt that appears with no explanation above it is a mistake: explain it in the next message and do not repeat the action.
