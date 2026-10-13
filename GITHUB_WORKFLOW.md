# Southbound Band Website — GitHub & Version Control Workflow Guide

**Document:** `GITHUB_WORKFLOW.md`  
**Repository:** `southbound-band-website`  
**Default Branch:** `main`  
**Project Path:** `d:\Antigravity Project\Rusty Chain`  

---

## 1. Overview & Best Practices

This guide establishes the version control workflow for the Southbound Band Website project. Adhering to these practices ensures that:
- Every feature, performance video, audio track, and press download is safely tracked.
- Client assets and documents remain intact without accidental data loss.
- Changes can be previewed, compared, and rolled back at any time.
- Secrets and temporary build files are never committed to remote repositories.

---

## 2. Daily Development Commands

### 2.1. Check Working Tree Status
Before making edits or committing, always verify what files have changed:
```bash
git status
```
For a compact overview:
```bash
git status -s
```

### 2.2. Review Changes Before Staging
Inspect the exact line-by-line differences of modified files:
```bash
# Compare unstaged changes against the last commit
git diff

# Compare changes within a specific file (e.g., index.html)
git diff index.html
```

---

## 3. Saving a New Version (Staging & Committing)

### 3.1. Stage Files for Commit
Stage specific files or directories that you have intentionally modified:
```bash
# Stage specific files
git add index.html src/components/Music/Music.js

# Or stage all tracked and modified files (respecting .gitignore)
git add .
```

### 3.2. Commit with a Clear Descriptive Message
Use imperative, descriptive commit messages outlining what was added or updated:
```bash
git commit -m "Add Watch & Listen YouTube gallery and verified audio player"
```

Good commit message examples:
- `feat(music): integrate rotating vinyl audio playback with 3 verified tracks`
- `feat(video): add 4 verified YouTube embeds with privacy-enhanced mode`
- `feat(press): add stage plot and EPK PDF download cards`
- `fix(nav): update smooth scrolling targets for header and mobile drawer`

---

## 4. Pushing Changes to GitHub

Once changes are committed locally, sync them with the remote repository:

```bash
# Push current branch to GitHub
git push origin main
```

If you are publishing a new feature branch for the first time:
```bash
git push -u origin <branch-name>
```

---

## 5. Inspecting Commit History

Review previous commits, authors, and timestamps:

```bash
# Standard chronological log
git log

# Clean one-line visual graph of recent commits
git log --oneline --graph --decorate -n 10

# Show detailed diff for the most recent commit
git show HEAD
```

---

## 6. Comparing Versions & Diffs

Compare two specific versions or review changes between branches:

```bash
# Compare current working directory with a previous commit
git diff HEAD~1

# Compare changes between two branches
git diff main feature/new-merch-section
```

---

## 7. Working with Branches (Feature Isolation)

Always create a new branch before undertaking major redesigns or experimental features:

### 7.1. Create and Switch to a New Branch
```bash
# Create and check out a feature branch
git checkout -b feature/audio-waveform-visualizer

# Modern git alternative:
git switch -c feature/audio-waveform-visualizer
```

### 7.2. Merge Back into Main
Once tested and verified:
```bash
# Switch back to main
git checkout main

# Pull any remote updates
git pull origin main

# Merge the feature branch
git merge feature/audio-waveform-visualizer

# Push updated main to GitHub
git push origin main
```

---

## 8. Restoring Earlier Versions Safely (Non-Destructive)

When an experiment doesn't work as expected, use safe, non-destructive restoration commands:

### 8.1. Discard Unstaged Changes in a Single File
```bash
# Restore a file back to its state in the last commit
git restore index.html
```

### 8.2. Unstage a File Without Losing Your Changes
```bash
# Remove a file from the staging area while keeping your edits
git restore --staged index.html
```

### 8.3. Temporarily Shelve Work in Progress (Stash)
```bash
# Save uncommitted changes to a temporary shelf
git stash push -m "WIP audio player experiment"

# Re-apply stashed changes later
git stash pop
```

### 8.4. Revert a Specific Commit Safely
Never use `git reset --hard` on shared branches. Instead, create a safe inverse commit:
```bash
git revert <commit-hash>
```

---

## 9. Pre-Publishing Quality Checklist

Before running `git push origin main`:

- [ ] **Run Status Check:** `git status` confirms no unintended files or `.env` secrets are staged.
- [ ] **Validate Build:** `npm run build` succeeds with zero errors.
- [ ] **Verify Assets:** All downloads and media links point to verified files.
- [ ] **No Force Pushes:** Never run `git push --force` or overwrite remote history.
