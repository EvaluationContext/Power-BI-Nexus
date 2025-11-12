# Maintainer Quick Reference

Quick commands and templates for common maintainer tasks.

## 🏷️ Common Label Combinations

### Approving a Resource
```
Add labels: approved, resource-suggestion, area/[relevant]
Comment: Use "Approve Resource" template
```

### Declining a Resource
```
Add labels: declined, resource-suggestion
Comment: Use "Decline Resource" template
Close issue
```

### Needs More Info
```
Add labels: needs-more-info
Comment: Use "Request More Information" template
```

### Quick Fixes (Typos, Broken Links)
```
Add labels: bug, priority/high
Fix directly or assign
```

## 💬 Response Templates

### Approve Resource Template

```markdown
✅ **Approved**

Thank you for suggesting this resource! It meets our inclusion criteria:

- ✓ Authority: [Established expert/official source]
- ✓ Recency: Last updated [date]
- ✓ Uniqueness: [What gap it fills - e.g., "Only resource covering X pattern in depth"]
- ✓ Quality: [Technical accuracy, clear explanations, etc.]

We'll create a PR to add this to `docs/resources.md`
```

### Decline Resource Template

```markdown
❌ **Not Accepted**

Thank you for taking the time to suggest this resource. After review, we're not including it at this time because:

[Choose one or more:]
- ❌ **Duplicate coverage:** This topic is comprehensively covered by our existing resource: [link]
- ❌ **Recency:** Last updated [date], more than 12 months ago without foundational content
- ❌ **Authority:** Needs more demonstrated expertise in the Power BI community
- ❌ **Quality:** [Specific quality concerns]
- ❌ **Uniqueness:** Doesn't provide unique value beyond existing resources

**Alternative/Suggestion:** [If applicable - e.g., "Consider resubmitting after publishing 2-3 more quality articles" or "You might find our existing resource on X helpful: [link]"]

This decision is not a reflection on the content quality, but rather how it fits within our curation strategy. If you believe we've misunderstood something, please feel free to provide additional context.
```

### Request More Info Template

```markdown
⚠️ **More Information Needed**

Thank you for this suggestion! To evaluate it properly, we need:

[Choose relevant items:]
1. **Last updated date:** When was this resource most recently updated?
2. **Unique value:** How does this differ from our existing resources on [topic]? Compare: [link to similar resource]
3. **RSS feed:** Does this blog/site have an RSS feed we can add?
4. **Author credentials:** Can you provide more context on the author's expertise?
5. **Specific value:** What specific gap does this fill in our current collection?

Please provide these details and we'll re-review within 1 week.

If we don't receive a response within 30 days, this issue will be automatically closed.
```

### Approve Best Practice Template

```markdown
✅ **Approved**

Great catch! This update:

- ✓ Improves accuracy/clarity
- ✓ Is well-sourced: [Reference sources]
- ✓ Reflects current Power BI capabilities ([version/feature])

Creating a PR to implement this change.

Thank you for helping keep our best practices current!
```

### Decline Best Practice Template

```markdown
❌ **Not Accepted**

Thank you for this suggestion. We're not making this change because:

[Choose one or more:]
- The current guidance is still accurate based on: [Microsoft docs link / SQLBI article]
- This would contradict established best practices: [reference]
- The source provided doesn't support this change: [explain]
- This is opinion-based without authoritative backing

**Current authoritative guidance:**
- [Link to Microsoft docs]
- [Link to SQLBI/expert article]

If you have additional authoritative sources that support this change, please share them and we'll reconsider.
```

## 🔧 Common GitHub CLI Commands

### Triage New Issues
```bash
# View all issues needing review
gh issue list --label "needs-review"

# Add label
gh issue edit [ISSUE_NUMBER] --add-label "approved"

# Add multiple labels
gh issue edit [ISSUE_NUMBER] --add-label "resource-suggestion,area/dax"

# Comment on issue
gh issue comment [ISSUE_NUMBER] --body "Your comment here"
```

### PR Management
```bash
# View all open PRs
gh pr list

# Review a PR
gh pr review [PR_NUMBER] --approve
gh pr review [PR_NUMBER] --request-changes --body "Please fix..."
gh pr review [PR_NUMBER] --comment --body "Looks good but..."

# Merge with squash
gh pr merge [PR_NUMBER] --squash --delete-branch
```

### Batch Operations
```bash
# Close all stale issues (use carefully!)
gh issue list --label "stale" --json number --jq '.[].number' | xargs -I {} gh issue close {}

# List all broken-link issues
gh issue list --label "broken-link"
```

## 📅 Monthly Checklist

Copy this into your monthly review issue:

```markdown
## Monthly Maintenance - [Month Year]

### Review Open Items
- [ ] Review all `needs-review` issues - [Link](../issues?q=is%3Aissue+is%3Aopen+label%3Aneeds-review)
- [ ] Follow up on `needs-more-info` (close if 30+ days) - [Link](../issues?q=is%3Aissue+is%3Aopen+label%3Aneeds-more-info)
- [ ] Review stale PRs - [Link](../pulls?q=is%3Apr+is%3Aopen+label%3Astale)

### Automated Reports
- [ ] Check monthly link check results - [Workflow](../actions/workflows/monthly-maintenance.yml)
- [ ] Review RSS freshness report - [Artifact](../actions/workflows/monthly-maintenance.yml)
- [ ] Address any broken links found

### Content Maintenance  
- [ ] Archive or remove stale resources (not updated in 12+ months)
- [ ] Verify high-traffic pages still accurate
- [ ] Update any Power BI version-specific guidance

### Community
- [ ] Thank active contributors (comment on their PRs/issues)
- [ ] Highlight quality contributions in Discussions
- [ ] Update CONTRIBUTORS.md if applicable

### Metrics
- New issues this month: 
- Issues closed this month:
- New contributors:
- Resources added:
- Resources removed:
```

## 🚨 Urgent Issue Handling

### Broken Links
```bash
# Priority: HIGH - Fix immediately
1. Verify link is actually broken
2. Search for updated URL
3. Update if found, or remove if resource gone
4. Comment with action taken
5. Close issue
```

### Incorrect Information
```bash
# Priority: HIGH - Verify and fix ASAP
1. Verify the claim with authoritative sources
2. If confirmed incorrect: update immediately
3. If disputed: add comment requesting sources from reporter
4. Document decision
```

### Spam/Abuse
```bash
# Priority: HIGH - Handle immediately
1. Hide comment if spam
2. Block user if needed (Settings → Moderation)
3. Close and lock issue
4. Report to GitHub if serious
```

## 🤝 Welcoming New Maintainers

When inviting a new maintainer:

```markdown
Subject: Invitation to join Power BI Nexus as a Maintainer

Hi [Name],

We've been impressed with your contributions to Power BI Nexus and would like to invite you to join as a maintainer!

**Responsibilities:**
- Review [area] contributions
- Apply inclusion criteria consistently  
- Provide constructive feedback
- Help with monthly maintenance

**Time Commitment:**
- ~2-4 hours per month
- Flexible timing
- Mostly asynchronous

**Next Steps:**
1. Review our [Contributing Guidelines](../CONTRIBUTING.md)
2. Let me know if you have questions
3. If interested, I'll add you to the team

No pressure - it's totally fine if the timing isn't right!

Thanks for all your contributions,
[Your name]
```

## 📊 Quality Checks

Before approving a resource, verify:

- [ ] Link works (not 404)
- [ ] Content is actually quality (skim it)
- [ ] Author has credentials/track record
- [ ] Updated recently (check dates)
- [ ] Unique value vs existing resources
- [ ] No obvious self-promotion without merit
- [ ] Fits our curation philosophy

Before approving best practice change, verify:

- [ ] Authoritative sources cited
- [ ] Information is current
- [ ] Doesn't contradict established guidance (or reconciles it)
- [ ] Well-explained with rationale
- [ ] Technically accurate
- [ ] Applies to current Power BI version

## 🔗 Useful Links

### In This Repo
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Code Owners](../.github/CODEOWNERS)
- [Governance Setup](../GOVERNANCE_SETUP.md)

### External
- [GitHub CLI Docs](https://cli.github.com/manual/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Markdown Guide](https://www.markdownguide.org/)

### Power BI References
- [Microsoft Docs](https://learn.microsoft.com/en-us/power-bi/)
- [SQLBI Articles](https://www.sqlbi.com/articles/)
- [DAX Guide](https://dax.guide/)

---

**Pro Tips:**
- Use saved replies in GitHub for common responses
- Set up notifications for labels you monitor
- Use GitHub Projects for tracking long-term items
- Be kind and assume good intent! 💙
