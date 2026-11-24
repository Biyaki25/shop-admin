# Contributing to ShopAdmin

This is a group project. These rules keep our Git history an honest record of
who did what.

## 1. Set up your own identity (once per computer)

Every member commits **from their own GitHub account on their own machine**.

```bash
git config --global user.name  "Your Full Name"
git config --global user.email "the-email-on-your-github-account@example.com"
```

The email must be one that is added and verified under
GitHub → Settings → Emails. If it is not, your commits will not count on your
GitHub profile or in the repo's Contributors graph. Check what Git will use:

```bash
git config user.name
git config user.email
```

Do not commit using someone else's laptop or account. If you have to, see
section 5 (pair programming).

## 2. Branches

- `main` is the stable branch. Nobody pushes to it directly.
- Each member works on their **own** branch for the area they own, for example:
  `feature/landing`, `feature/product-list`, `feature/product-detail`,
  `feature/product-form`, `feature/tests`, `feature/responsive`, `docs/report`.
- Before you start working, update your branch from `main`:

  ```bash
  git checkout main
  git pull
  git checkout feature/your-branch
  git merge main
  ```

- Never use `git push --force` on a branch someone else is using, and never
  rebase commits that are already pushed.

## 3. Commit messages

Format: `type: short description in the imperative`

| Type     | Use it for                                     | Example                                      |
|----------|------------------------------------------------|----------------------------------------------|
| `feat:`  | A new feature or page                          | `feat: add category filter to product list`  |
| `fix:`   | A bug fix                                      | `fix: keep search text after page reload`    |
| `test:`  | Adding or changing tests                       | `test: cover required fields in add form`    |
| `docs:`  | README, report, comments, these files          | `docs: add setup steps to README`            |
| `style:` | CSS, layout, formatting (no behaviour change)  | `style: tighten card spacing on mobile`      |

Rules:

- **Small commits, one purpose each.** "Add price validation" is one commit;
  "add validation, fix navbar and update README" is three.
- Write the subject in under ~70 characters. Add a body below a blank line if
  the *why* is not obvious.
- Commit working code. Run `npm run lint` and `npm test` before you push.

## 4. Pull Requests and review

1. Push your branch: `git push -u origin feature/your-branch`
2. Open a Pull Request into `main` on GitHub. Fill in the template.
3. Request a review from a **different** team member. You may not approve
   your own PR. (Exception: see "Owner merges" below.)
4. The reviewer checks out the branch, runs it, and either approves or leaves
   comments. The author fixes and pushes again on the same branch.
5. After approval, the **author** merges the PR (use "Create a merge commit"
   or "Squash and merge" — agree on one as a team), then deletes the branch on
   GitHub if it is finished.

Reviewing is a real contribution and is visible on the PR page, so do it
properly: run the code, leave specific comments.

### Owner merges

The repository owner (@Biyaki25) has admin rights and may merge a PR without
waiting for approval, for example small docs fixes or when a reviewer is
unavailable. Feature PRs should still be reviewed by another member. Merges
done this way are visible on the PR page.

So far, these PRs were merged this way, all by @Biyaki25 on 2026-11-24 with
0 reviews (reviews had been requested but were not given before the merge):

| PR | Title | Review requested from |
|----|-------|-----------------------|
| #1 | docs: add team workflow docs and contributions record | @adrielmacharia1 |
| #10 | docs: add Owner merges section to CONTRIBUTING.md | @adrielmacharia1 |
| #11 | chore: final cleanup (README, .gitignore, test warnings) | @Evans324 |
| #12 | docs: fill CONTRIBUTIONS.md from real Git/GitHub history | @bensonambani |

Branch protection on `main` requires 1 approval for everyone except admins
(`enforce_admins` is off).

## 5. Pair programming and `Co-authored-by`

When two people genuinely write code **together at the same time** (one
typing, both thinking), the person who commits adds a trailer at the end of
the commit message:

```
feat: add edit mode to product detail page

Co-authored-by: Full Name <their-github-email@example.com>
```

- It must be the last lines of the message, after a blank line.
- The email must be one on the co-author's GitHub account, or GitHub won't
  link it.
- One `Co-authored-by:` line per extra person.

**Appropriate:**
- You sat together and wrote that code together.
- You worked through a bug together on a call with screen sharing, and both
  shaped the fix.

**Not appropriate:**
- Giving credit to someone who did not work on that commit, to "balance" the
  numbers.
- Adding a teammate who only reviewed the PR. Reviews already show on GitHub.
- Committing someone else's work under your account and adding them as
  co-author instead of letting them commit it themselves. They should push it.
- Adding co-authors to old commits afterwards. We do not rewrite history.

## 6. What we never do

- Change the author or date of a commit.
- Commit on behalf of someone who did not do the work.
- Rewrite shared history (`rebase` of pushed commits, `filter-branch`,
  `push --force`).
- Claim work in `CONTRIBUTIONS.md` that the person did not do.
