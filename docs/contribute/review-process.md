---
icon: material/clipboard-check-outline
hide:
  - toc
---

# Review Process

Understanding what happens after you submit an issue helps set expectations and ensures a smooth contribution experience.

## Timeline

Different types of contributions have different review timelines:

| Type | Expected Timeline | Review Frequency |
|------|------------------|------------------|
| **Quick fixes** (typos, broken links) | 1-3 days | Reviewed as submitted |
| **Resource suggestions** | 1-2 weeks | Every 2 weeks |
| **Best practice updates** | 1-2 weeks | Requires maintainer consensus |

## Review Steps

### 1. Automated Checks

When you submit an issue, automated workflows:

- **Validate links** (for resource suggestions)
- **Auto-label** based on content and type
- **Welcome first-time contributors** with helpful guidance
- **Track** for stale handling (30 days without activity)

### 2. Maintainer Review

A maintainer will:

- **Evaluate** against our [inclusion criteria](curation-philosophy.md)
- **Test links** and verify content quality
- **Check for duplicates** with existing resources
- **Assess authority** of the source and author
- **Verify recency** (updated within 12 months, or foundational)

### 3. Discussion

If clarification is needed:

- Maintainer adds `needs-more-info` label
- Specific questions asked in comments
- 30-day window to respond before automatic closure

### 4. Decision

The maintainer will make one of three decisions:

=== ":material-check-circle: Approved"

    - Issue labeled `approved`
    - Maintainer creates PR to implement the change
    - Issue automatically closed when PR merges
    - You'll be notified and thanked!

=== ":material-alert-circle: Needs Changes"

    - Issue labeled `needs-more-info`
    - Specific feedback provided
    - You can update the issue with additional context
    - Re-reviewed after updates

=== ":material-close-circle: Declined"

    - Issue labeled `declined`
    - **Specific reasoning provided** based on criteria
    - Issue closed with documented explanation
    - You may appeal if you believe criteria were misapplied

### 5. Implementation

For approved issues:

- **Maintainer creates PR** with the change
- **References the issue** (e.g., "Fixes #123")
- **Self-reviews** before merging
- **Automated checks** validate links and formatting
- **Issue auto-closes** when PR merges

!!! success "You don't need to create PRs"
    Contributors use issues, maintainers handle implementation. This ensures quality control and consistent formatting.

## If Your Issue is Declined

We provide specific reasons based on our [curation criteria](curation-philosophy.md). You may:

### :material-comment-text-outline: Provide Additional Context

Sometimes we miss important details. Reply with:

- Additional sources or credentials
- Clarification on unique value
- Evidence of content quality or authority

### :material-refresh: Resubmit After Updates

If the resource doesn't meet criteria yet:

- Wait for more content history (for new authors)
- Resubmit after the resource is updated
- Address specific concerns mentioned in decline

### :material-forum-outline: Discuss the Decision

If you believe criteria were misapplied:

- Comment on the issue explaining your perspective
- Provide additional evidence
- Lead curator will make final decision

**Our goal is transparency, not gatekeeping.** We document our reasoning to show consistency and fairness.

## Transparency Principles

We believe in open, documented decision-making:

1. **All decisions are public** - No private approvals/rejections
2. **Reasoning is documented** - Clear explanation against criteria
3. **Criteria are consistent** - Same standards for everyone
4. **Appeals are welcome** - Second looks if you provide new context
5. **Process is evolving** - We improve based on feedback

## Questions During Review?

- **Comment on your issue** - We'll respond within 3-5 days
- **Check similar issues** - See how others were handled
- **Review our criteria** - Understand the evaluation framework
- **Read full guidelines** - [CONTRIBUTING.md](https://github.com/EvaluationContext/Power-BI-Nexus/blob/main/CONTRIBUTING.md)
