# ShopAdmin: Team Contributions

This file records who did what on the project. It has two kinds of entries:

- **Verified in Git/GitHub**: backed by a commit hash, branch or PR number
  that anyone can check (see "Contribution evidence" at the bottom).
- **Reported by the team**: work that does not show in Git (design, planning,
  research, testing by hand, pair work done on one laptop). Each one has a
  line where the member it is about confirms it.

Last updated: 2026-11-24

---

## Git history so far (as of 2026-11-24)

All commits so far were made from one GitHub account. Nothing in this table
has been changed or reassigned.

| Commit    | Date (UTC+3)      | Author (GitHub)               | Message                                                                  |
|-----------|-------------------|-------------------------------|--------------------------------------------------------------------------|
| `dae626f` | 2026-11-21 15:19  | @Biyaki25 | Initial commit: ShopAdmin admin portal                                   |
| `bc5d1fc` | 2026-11-21 15:23  | @Biyaki25 | Deploy to GitHub Pages                                                   |
| `33451af` | 2026-11-23 13:59  | @Biyaki25 | Redesign as admin dashboard with sidebar, dashboard home and button kit  |

Note: `dae626f` added the whole first version of the app (about 100 files)
in a single commit. If other members wrote parts of that code before it was
committed, Git cannot show it. Those parts are listed below under each
member as **reported by the team**, not as commits.

Pull Requests so far: none.

## Task assignment (going forward)

On 2026-11-24 the 7 work areas were assigned to the 5 members by **random
draw** (`shuf`). Two members got two areas. This says who **owns** each area
from now on. It is not a record of past work. The team can swap areas by
agreement; if so, update this table and the GitHub issue assignees.

| Branch | Owner |
|--------|-------|
| `feature/landing` | @adrielmacharia1 |
| `feature/product-list` | @Evans324 |
| `feature/product-detail` | @mfknotis |
| `feature/product-form` | @mfknotis |
| `feature/tests` | @Biyaki25 |
| `feature/responsive` | @Evans324 |
| `docs/report` | @bensonambani |

---

## [Name] (@Biyaki25)

**Branch(es) assigned from now on:** `feature/tests` (random draw, see below)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| Initial app, GitHub Pages deploy, dashboard redesign (see table above; how `dae626f` was written: [to fill]) | main | none | `dae626f`, `bc5d1fc`, `33451af` |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @Biyaki25: ______________________  Date: ________

---

## [Name] (@adrielmacharia1)

**Branch(es) assigned from now on:** `feature/landing` (random draw, see below)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| (no commits in Git yet) | | | |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @adrielmacharia1: ______________________  Date: ________

---

## [Name] (@bensonambani)

**Branch(es) assigned from now on:** `docs/report` (random draw, see below)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| (no commits in Git yet) | | | |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @bensonambani: ______________________  Date: ________

---

## [Name] (@Evans324)

**Branch(es) assigned from now on:** `feature/product-list`, `feature/responsive` (random draw, see below)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| (no commits in Git yet) | | | |

### Reported by the team (not visible in Git)
- [ ] [to fill]

Confirmed by @Evans324: ______________________  Date: ________

---

## [Name] (@mfknotis)

**Branch(es) assigned from now on:** `feature/product-detail`, `feature/product-form` (random draw, see below)

### Verified in Git/GitHub
| What | Branch | PR | Commits |
|------|--------|----|---------|
| (no commits in Git yet) | | | |

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

| PR | Title | Author | Reviewer | Merged |
|----|-------|--------|----------|--------|
|    |       |        |          |        |

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
