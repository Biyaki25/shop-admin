# ShopAdmin: Team Contributions

This file records who did what on the project. It has two kinds of entries:

- **Verified in Git/GitHub**: backed by a commit hash, branch or PR number
  that anyone can check (see "Contribution evidence" at the bottom).
- **Reported by the team**: work that does not show in Git (design, planning,
  research, testing by hand, pair work done on one laptop). Each one has a
  line where the member it is about confirms it.

Last updated: 2026-11-24

---

## Git history (as of 2026-11-24)

Taken from `git log --all` and `gh pr list --state all`. Nothing has been
changed, backdated or reassigned. All commits were made from the @Biyaki25
account (email `nyamongo.kamanda23@students.dkut.ac.ke`). Times are the
commit's own timestamp.

| Commit    | Date             | Author     | Message | Where | Claude co-author |
|-----------|------------------|------------|---------|-------|------------------|
| `dae626f` | 2026-11-21 15:19 | @Biyaki25 | Initial commit: ShopAdmin admin portal | `main` | no |
| `bc5d1fc` | 2026-11-21 15:23 | @Biyaki25 | Deploy to GitHub Pages | `main` | no |
| `33451af` | 2026-11-23 13:59 | @Biyaki25 | Redesign as admin dashboard with sidebar, dashboard home and button kit | `main` | yes |
| `54af427` | 2026-11-24 17:30 | @Biyaki25 | docs: add contributing guide, PR template and contributions record | PR #1 → `main` | yes |
| `ecaa83e` | 2026-11-24 17:32 | @Biyaki25 | docs: give Biyaki25 product-form and responsive areas | PR #1 → `main` | yes |
| `969bad9` | 2026-11-24 17:43 | @Biyaki25 (shown as "Daniel Kamanda", the account's profile name) | Merge pull request #1 | `main` | – (GitHub merge commit) |
| `83e7561` | 2026-11-24 17:54 | @Biyaki25 | docs: add "Owner merges" section to CONTRIBUTING.md | PR #10 → `main` (merge `7b45691`) | yes |
| `15dd1ab` | 2026-11-24 17:54 | @Biyaki25 | chore: ignore .env files | PR #11 → `main` (merge `cd413a8`) | yes |
| `54021c6` | 2026-11-24 17:55 | @Biyaki25 | test: stub window.scrollTo to silence jsdom warnings | PR #11 → `main` | yes |
| `1e63db1` | 2026-11-24 17:55 | @Biyaki25 | docs: bring README up to date with the dashboard redesign | PR #11 → `main` | yes |
| `b74918e` | 2026-11-24 | @Biyaki25 | docs: fill CONTRIBUTIONS.md from the real Git and GitHub history | PR #12 | yes |

"Claude co-author = yes" means the commit message ends with
`Co-Authored-By: Claude`, because the change was written with Claude Code
(see "AI tools used" in the README and Section 12 of the report).

Note: `dae626f` added the whole first version of the app (about 100 files)
in a single commit. If other members wrote parts of that code before it was
committed, Git cannot show it. Such work belongs under each member as
**reported by the team**, not as commits.

### Pull Requests

| PR | Title | Author | Branch | Status | Reviews |
|----|-------|--------|--------|--------|---------|
| #1 | docs: add team workflow docs and contributions record | @Biyaki25 | `docs/workflow` (deleted after merge) | Merged 2026-11-24 by @Biyaki25 with admin rights | 0 (review requested from @adrielmacharia1, not given) |
| #10 | docs: add Owner merges section to CONTRIBUTING.md | @Biyaki25 | `docs/contributing-admin-merge` | Merged 2026-11-24 by @Biyaki25 with admin rights | 0 (review requested from @adrielmacharia1, not given) |
| #11 | chore: final cleanup (README, .gitignore, test warnings) | @Biyaki25 | `chore/final-cleanup` | Merged 2026-11-24 by @Biyaki25 with admin rights | 0 (review requested from @Evans324, not given) |
| #12 | docs: fill CONTRIBUTIONS.md from real Git/GitHub history | @Biyaki25 | `docs/contributions-record` | Merged 2026-11-24 by @Biyaki25 with admin rights | 0 (review requested from @bensonambani, not given) |

All four PRs so far were merged by the repo owner with admin rights and no
review (see "Owner merges" in CONTRIBUTING.md). The owner chose this to finish
before the submission deadline instead of waiting for approvals.

## Task assignment (going forward)

On 2026-11-24 the 7 work areas were assigned to the 5 members by **random
draw** (`shuf`). @Biyaki25 then chose to take on more work, taking
`feature/product-form` and `feature/responsive` from the two members who had
drawn two areas. This says who **owns** each area
from now on. It is not a record of past work. The team can swap areas by
agreement; if so, update this table and the GitHub issue assignees.

| Branch | Owner |
|--------|-------|
| `feature/landing` | @adrielmacharia1 |
| `feature/product-list` | @Evans324 |
| `feature/product-detail` | @mfknotis |
| `feature/product-form` | @Biyaki25 |
| `feature/tests` | @Biyaki25 |
| `feature/responsive` | @Biyaki25 |
| `docs/report` | @bensonambani |

---

## [Name] (@Biyaki25)

**Branch(es) assigned from now on:** `feature/tests`, `feature/product-form`, `feature/responsive` (see Task assignment)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| Initial app (how it was written: [to fill by the team]) | `main` | – | `dae626f` |
| GitHub Pages deployment workflow | `main` | – | `bc5d1fc` |
| Admin dashboard redesign (sidebar, dashboard home, button kit), with Claude Code | `main` | – | `33451af` |
| Team workflow docs (CONTRIBUTING.md, PR template, this file), with Claude Code | `docs/workflow` | #1 (merged) | `54af427`, `ecaa83e` |
| "Owner merges" section in CONTRIBUTING.md, with Claude Code | `docs/contributing-admin-merge` | #10 (merged) | `83e7561` |
| Final cleanup: .gitignore, test warning fix, README update, with Claude Code | `chore/final-cleanup` | #11 (merged) | `15dd1ab`, `54021c6`, `1e63db1` |
| This contributions record, with Claude Code | `docs/contributions-record` | #12 (merged) | `b74918e` + this update |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @Biyaki25: ______________________  Date: ________

---

## [Name] (@adrielmacharia1)

**Branch(es) assigned from now on:** `feature/landing` (see Task assignment)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| No commits, PRs or reviews in Git/GitHub as of 2026-11-24 | – | – | – |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @adrielmacharia1: ______________________  Date: ________

---

## [Name] (@bensonambani)

**Branch(es) assigned from now on:** `docs/report` (see Task assignment)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| No commits, PRs or reviews in Git/GitHub as of 2026-11-24 | – | – | – |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @bensonambani: ______________________  Date: ________

---

## [Name] (@Evans324)

**Branch(es) assigned from now on:** `feature/product-list` (see Task assignment)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| No commits, PRs or reviews in Git/GitHub as of 2026-11-24 | – | – | – |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @Evans324: ______________________  Date: ________

---

## [Name] (@mfknotis)

**Branch(es) assigned from now on:** `feature/product-detail` (see Task assignment)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| No commits, PRs or reviews in Git/GitHub as of 2026-11-24 | – | – | – |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @mfknotis: ______________________  Date: ________

---

## Non-code work (reported by the team)

| Work | Done by | Confirmed by that member |
|------|---------|--------------------------|
| Figma designs (`design/*.pdf`) | [to fill] | ________ |
| Report (`docs/ShopAdmin-Report.pdf`) | [to fill] | ________ |
| Testing by hand | [to fill] | ________ |
| Presentation | [to fill] | ________ |

---

## Reviews

PR reviews are a contribution too. Fill in as PRs are merged.

| PR | Title | Author | Reviewer | Review given | Merged |
|----|-------|--------|----------|--------------|--------|
| #1 | docs: add team workflow docs and contributions record | @Biyaki25 | @adrielmacharia1 (requested) | No | Yes, by @Biyaki25 with admin rights |
| #10 | docs: add Owner merges section to CONTRIBUTING.md | @Biyaki25 | @adrielmacharia1 (requested) | No | Yes, by @Biyaki25 with admin rights |
| #11 | chore: final cleanup (README, .gitignore, test warnings) | @Biyaki25 | @Evans324 (requested) | No | Yes, by @Biyaki25 with admin rights |
| #12 | docs: fill CONTRIBUTIONS.md from real Git/GitHub history | @Biyaki25 | @bensonambani (requested) | No | Yes, by @Biyaki25 with admin rights |

---

## Contribution evidence

Anyone (including the instructor) can check the Git entries above:

```bash
git clone https://github.com/Biyaki25/shop-admin.git
cd shop-admin

# Commits per person, all branches
git shortlog -sn --all

# Same, with the email each commit was made with
git shortlog -sne --all

# Every commit by one person, with the files they changed
git log --all --author="Name or email" --stat

# Look at a single commit listed in this file
git show <hash> --stat

# Who last changed each line of a file
git blame src/pages/Dashboard.jsx
```

On GitHub:

- **Insights → Contributors**: https://github.com/Biyaki25/shop-admin/graphs/contributors
  (counts commits on `main` only, and only for emails linked to a GitHub account)
- **Pull Requests (all, including closed)**: https://github.com/Biyaki25/shop-admin/pulls?q=is%3Apr
  (shows author, reviewer, review comments and approvals for each PR)
- **Issues**: https://github.com/Biyaki25/shop-admin/issues?q=is%3Aissue
  (shows who each task was assigned to)
- **Commits**: https://github.com/Biyaki25/shop-admin/commits/main
