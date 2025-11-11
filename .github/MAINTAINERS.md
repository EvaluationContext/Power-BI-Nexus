# Maintainer Guide

This guide is for maintainers of Power BI Nexus. It covers review processes, decision-making, and administrative tasks.

## Table of Contents

- [Maintainer Responsibilities](#maintainer-responsibilities)
- [Review Process](#review-process)
- [Decision Framework](#decision-framework)
- [Issue Management](#issue-management)
- [Pull Request Reviews](#pull-request-reviews)
- [Monthly Maintenance](#monthly-maintenance)
- [Adding New Maintainers](#adding-new-maintainers)

## Maintainer Responsibilities

### Lead Curator
- Final decision authority on content inclusion/exclusion
- Strategic direction and quality standards
- Community engagement and growth
- Maintainer team management
- Conflict resolution

### Section Maintainers
- Review contributions in their area of expertise
- Provide technical assessment
- Recommend approval/rejection to lead curator
- Help answer technical questions

### All Maintainers
- Review PRs and issues in a timely manner (goal: 1-2 weeks)
- Provide constructive, respectful feedback
- Document decision reasoning
- Help contributors improve their submissions
- Maintain project quality and consistency

## Review Process

### For Resource Suggestions (Issues)

1. **Initial Triage** (Within 3 days)
   - Check if resource already exists
   - Verify it meets basic criteria (active, legitimate, etc.)
   - Add appropriate labels
   - Assign to relevant section maintainer if applicable

2. **Evaluation** (Within 1-2 weeks)
   - Apply [Content Inclusion Criteria](../CONTRIBUTING.md#content-inclusion-criteria)
   - Check authority, recency, uniqueness, quality
   - Review RSS feed if applicable
   - Test all links

3. **Decision**
   - **Approve**: Add label `approved`, maintainer creates PR to implement
   - **Request Changes**: Add label `needs-more-info`, explain what's needed
   - **Decline**: Add label `declined`, provide clear reasoning

4. **Implementation**
   - Approved issues are implemented by maintainers via pull request
   - Reference the issue number in the PR (e.g., "Fixes #123")
   - Contributor doesn't need to create PR - we handle the implementation

5. **Communication**
   - Use [response templates](#response-templates) for consistency
   - Always explain reasoning
   - Be respectful and constructive
   - Offer guidance for resubmission if appropriate

### For Best Practice Updates (Issues)

1. **Verify Sources**
   - Check that proposed changes link to authoritative sources
   - Verify information is current and accurate
   - Confirm it reflects current Power BI capabilities

2. **Assess Impact**
   - Does this contradict existing guidance?
   - Does it require changes in multiple places?
   - Is the change substantive or cosmetic?

3. **Get Consensus**
   - For significant changes, get input from other maintainers
   - Comment on issue with `@maintainer-name` to request review
   - Use GitHub Discussions for broader debate if needed

4. **Approve and Implement**
   - Add `approved` label
   - Maintainer creates PR to implement the changes
   - Reference issue number in PR
   - Document reasoning

### For Bug Reports

1. **Verify Issue**
   - Reproduce the problem
   - Check if it's already fixed
   - Determine severity

2. **Triage**
   - Add priority label: `priority/high`, `priority/medium`, `priority/low`
   - Assign to appropriate maintainer
   - Add to project board if tracking

3. **Fix via PR**
   - Maintainer creates PR with fix
   - Reference issue number (e.g., "Fixes #123")
   - Close issue when PR is merged

## Decision Framework

### When to Approve Resources

✅ **Approve if:**
- Meets all inclusion criteria (authority, recency, uniqueness, quality)
- Fills a genuine gap in current resources
- From established, credible source
- Active and maintained
- Provides unique value

⚠️ **Request Changes if:**
- Almost meets criteria but needs clarification
- Good resource but description needs improvement
- Missing critical information (RSS feed, author, etc.)
- Unclear how it differs from existing resources

❌ **Decline if:**
- Purely promotional without educational value
- Duplicates existing, better resources
- Outdated or incorrect information
- Low quality or questionable accuracy
- No clear unique value
- Conflict of interest without merit

### When to Approve Best Practice Changes

✅ **Approve if:**
- Backed by authoritative sources
- Reflects current Power BI capabilities
- Improves accuracy or clarity
- Fixes errors or outdated information
- Well-reasoned and documented

⚠️ **Request Changes if:**
- Sources needed or unclear
- Needs better explanation
- Contradicts other guidance (needs reconciliation)
- Formatting issues

❌ **Decline if:**
- Not supported by authoritative sources
- Based on outdated information
- Opinion without evidence
- Already covered adequately

## Issue Management

### Labels to Use

**Status:**
- `needs-review` - Awaiting maintainer review
- `needs-more-info` - Requires additional information from contributor
- `approved` - Approved for implementation
- `declined` - Not accepted, with reasoning provided
- `on-hold` - Waiting for external factors

**Type:**
- `resource-suggestion`
- `best-practice`
- `bug`
- `documentation`
- `enhancement`

**Priority:**
- `priority/high` - Broken links, incorrect information
- `priority/medium` - Improvements, additions
- `priority/low` - Nice to have

**Area:**
- `area/dax`
- `area/modeling`
- `area/tools`
- `area/security`
- `area/deployment`
- `area/visualization`

### Monthly Review

On the 1st of each month:
1. Review all open issues labeled `needs-review`
2. Follow up on issues labeled `needs-more-info` (close if no response in 30 days)
3. Review automated link check and RSS freshness reports
4. Update any stale resources
5. Archive or remove outdated content

## Pull Request Reviews

### When Maintainers Create PRs

All changes to the repository are made by maintainers via pull requests, typically after an issue has been approved.

### Review Checklist

For every PR, verify:

- [ ] **Issue Reference**: PR links to the approved issue (e.g., "Fixes #123")
- [ ] **Accuracy**: Information is correct and current
- [ ] **Sources**: Authoritative sources provided where needed
- [ ] **Links**: All links work and go to correct destinations
- [ ] **Formatting**: Follows existing markdown style
- [ ] **Disclosure**: Conflicts of interest noted if applicable
- [ ] **Scope**: Changes match the approved issue
- [ ] **Tests**: Automated checks pass (link validation, auto-labeling)

### Self-Review Process

When you create a PR as a maintainer:

1. **Reference the issue** in PR description (e.g., "Implements #123")
2. **Self-review** your changes before requesting review
3. **Request review** from another maintainer for significant changes
4. **Wait for checks** - all automated checks must pass
5. **Merge when ready** - use squash merge to keep history clean

### Merge Process

1. **Wait for checks**: All automated checks must pass
2. **Get approval**: For major changes, at least one other maintainer approval recommended
3. **Squash and merge**: Use squash merge to keep history clean
4. **Delete branch**: Clean up after merge
5. **Close issue**: Issue should auto-close via "Fixes #123" in PR

## Response Templates

### Approve Resource

```markdown
✅ **Approved**

Thank you for suggesting this resource! It meets our inclusion criteria:

- ✓ Authority: [reason]
- ✓ Recency: Last updated [date]
- ✓ Uniqueness: [what gap it fills]
- ✓ Quality: [assessment]

We'll create a PR to add this to the resources page.
```

### Request More Information

```markdown
⚠️ **More Information Needed**

Thank you for this suggestion! To evaluate it properly, we need:

1. [Specific information needed]
2. [Specific information needed]

Please provide these details and we'll re-review.
```

### Decline Resource

```markdown
❌ **Not Accepted**

Thank you for taking the time to suggest this resource. After review, we're not including it at this time because:

- [Specific reason with reference to criteria]

**Alternative:** [If applicable: "Consider resubmitting after..." or "You might find our existing resource on X helpful"]

This decision is not a reflection on the quality of the content, but rather how it fits within our curation strategy. If you believe we've misunderstood something, please feel free to provide additional context.
```

### Approve Best Practice Update

```markdown
✅ **Approved**

Great catch! This update:

- Improves accuracy/clarity
- Is well-sourced
- Reflects current best practices

Merging now.
```

### Decline Best Practice Update

```markdown
❌ **Not Accepted**

Thank you for this suggestion. We're not making this change because:

- [Specific reason]

**Sources we referenced:**
- [Link to authoritative source showing current guidance]

If you have additional sources that support this change, please share them and we'll reconsider.
```

## Monthly Maintenance

### 1st of Each Month

1. **Review Open Issues**
   ```bash
   # Check issues needing review
   # Filter: is:open label:needs-review
   ```

2. **Check Automated Reports**
   - Review link check results from workflow
   - Review RSS freshness report
   - Create issues for broken links or stale feeds

3. **Update Content**
   - Remove or archive resources that are no longer maintained
   - Update dates on "last reviewed" sections if applicable
   - Add newly discovered quality resources

4. **Community Engagement**
   - Thank active contributors
   - Highlight accepted contributions
   - Update CONTRIBUTORS.md if applicable

## Adding New Maintainers

### Criteria

Consider inviting someone as a maintainer if they:
- Have made multiple high-quality contributions
- Demonstrate expertise in Power BI
- Understand and embody project philosophy
- Communicate respectfully and constructively
- Are active in the community

### Process

1. **Discuss with current maintainers**
   - Get consensus on inviting new maintainer
   - Define their area of responsibility

2. **Extend invitation**
   - Send private message explaining role and expectations
   - Link to this maintainer guide
   - No pressure to accept

3. **Onboard**
   - Add to CODEOWNERS file
   - Grant appropriate GitHub permissions
   - Add to maintainers list in README
   - Introduce in Discussions

4. **Support**
   - Pair them with experienced maintainer for first reviews
   - Check in regularly
   - Provide feedback and guidance

## Communication Guidelines

### Tone

- Be welcoming and appreciative
- Be clear and specific
- Be respectful, even when declining
- Be constructive, not just critical
- Assume good intent

### Timeliness

- Acknowledge new issues within 3 days
- Provide full review within 1-2 weeks
- Respond to follow-ups within 3-5 days
- For urgent issues (broken links), respond same day if possible

### Transparency

- Document reasoning for decisions
- Be consistent in applying criteria
- Make the process visible
- Admit when we make mistakes

## Conflict Resolution

### Disagreements Between Maintainers

1. **Discuss openly** in the issue/PR comments
2. **Seek consensus** - try to find common ground
3. **Escalate to lead curator** if no consensus
4. **Document decision** with reasoning

### Difficult Contributors

1. **Assume good intent** - maybe they don't understand process
2. **Explain clearly** - link to guidelines and criteria
3. **Be firm but respectful** - say no clearly if needed
4. **Escalate if needed** - get help from other maintainers
5. **Block if necessary** - but only as last resort

### Appeals

If a contributor believes their submission was unfairly rejected:

1. **Encourage them to provide additional context** via GitHub Discussion
2. **Re-evaluate with fresh eyes** and other maintainers if needed
3. **Document the appeal and final decision**
4. **Lead curator makes final call**

## Administrative Tasks

### Repository Settings

- Require PR reviews before merge
- Require status checks to pass
- Require branches to be up to date
- Enable auto-delete of branches after merge

### GitHub Permissions

- **Maintainers**: Write access
- **Contributors**: No special access (fork and PR)

### Protecting Main Branch

- Require pull request reviews (1 approval minimum)
- Dismiss stale reviews when new commits are pushed
- Require status checks: link-check, markdown-lint, spell-check
- Restrict who can push: Only maintainers
- Allow force pushes: Off
- Allow deletions: Off

## Tools and Resources

- **Link Checker**: Automated via GitHub Actions
- **Markdown Lint**: Enforced in PRs
- **Spell Check**: Typos action catches common errors
- **RSS Check**: Monthly freshness verification
- **GitHub CLI**: `gh` command for bulk operations
- **GitHub Desktop**: For easier local management

## Questions?

If you have questions as a maintainer:
- Check this guide first
- Ask in private maintainer channel/discussion
- Reach out to lead curator

---

**Remember:** We're curators, not gatekeepers. Our goal is to help the community find the best Power BI resources, not to create barriers. Be thoughtful, be fair, and be kind.
