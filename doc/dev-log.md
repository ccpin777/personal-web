# Pin-Web Dev Log

Recent development logs are archived by month. For the complete history, please refer to the files below:

- [2026-06](dev-log_archive/dev-log-2026-06.md)
- [2026-07](dev-log_archive/dev-log-2026-07.md)
- [2026-08](dev-log_archive/dev-log-2026-08.md)

## 2026-10-22 — Broaden research and career positioning

- Updated index.html: Hero, My Work/Research Focus/Next Steps, Approach, Methods, Contact, and search/share summaries to emphasize chemistry, materials R&D, experimental evidence, interpretation, troubleshooting, and scientific communication.
- Kept AI as an exploratory interest in Next Steps; removed SAXS/GISAXS from core methods, qualified measurement exposure in the Argonne paragraph, and labeled Python as limited exposure.
- Preserved design files, navigation, KLA, publications, CV PDF, and contact service; no version bump or deployment.
- Verification: script.js syntax and git diff --check passed; 8 internal references and 8 local asset references resolved. Compared against HEAD: publications, navigation, KLA paragraph, form markup, and all href/src/action values unchanged.
- Limitations: no installed browser or Playwright/Puppeteer available for desktop/mobile visual QA. External publication destinations and Formspree delivery were not tested; no form submission was sent.

## 2026-10-22 — Ignore macOS folder metadata

- Added .DS_Store to the project .gitignore and removed the three existing copies (root, doc, resources) from Git tracking while retaining local files. This prevents folder metadata from being included by deploy.command.
- Verification: all three local files still exist, git ls-files reports no tracked .DS_Store files, and git check-ignore matches all three. No commit, push, or deployment performed.

## 2026-10-22 — Refine Argonne measurement wording

- At the user’s request, changed the Argonne sentence to “I conduct SAXS/GISAXS measurements with beamline scientists.” SAXS/GISAXS remains absent from the core Methods tags.
- Verification: confirmed one targeted sentence replacement and no SAXS/GISAXS skill tag; git diff --check passed. No deployment performed.

## 2026-10-22 — Restore collaborative SAXS/GISAXS method

- Added “SAXS/GISAXS (with beamline scientists)” to Characterization as requested, consistent with the Argonne measurement description without claiming data-analysis expertise.
- Verification: one skill tag added; git diff --check passed. No push or deployment performed.
