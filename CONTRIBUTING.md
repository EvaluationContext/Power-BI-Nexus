# Contributing to Power BI Nexus

Thank you for your interest in contributing to Power BI Nexus! This project aims to be a curated, community-maintained hub for Power BI knowledge that evolves with the ecosystem.

## 🎯 Our Philosophy

Power BI Nexus is **not** a collection of all possible resources. We curate and maintain **pointers to the best external resources** that:

- Remain current and accurate
- Fill unique knowledge gaps
- Come from authoritative sources
- Provide genuine educational value

**We prioritize quality over quantity.** Not every suggestion will be accepted, and that's by design.

## 🤝 Ways to Contribute

We use **GitHub issues** to manage all contributions. Please use the appropriate issue template:

### 1. Suggest a Resource

Know a valuable blog, tool, video, or documentation that should be featured?

**Use the template:** [Suggest Resource](https://github.com/EvaluationContext/Power-BI-Nexus/issues/new?template=suggest-resource.yml)

**Before suggesting:**

- ✅ Check if it's already listed in [Resources](docs/resources.md)
- ✅ Verify it's been updated within the last 12 months (unless foundational content)
- ✅ Ensure it provides unique value not covered by existing resources

### 2. Improve Best Practices

Have a proven technique or updated guidance?

**Use the template:** [Improve Best Practices](https://github.com/EvaluationContext/Power-BI-Nexus/issues/new?template=improve-best-practices.yml)

**Criteria:**
- Must link to authoritative sources (Microsoft docs, established experts like SQLBI)
- Should reflect current Power BI capabilities and recommendations
- Include references/citations for credibility

### 3. Report an Issue

Found a typo, broken link, or outdated information?

**Use the template:** [Report Issue](https://github.com/EvaluationContext/Power-BI-Nexus/issues/new?template=report-issue.yml)

**Quick fixes welcome:**
- Typos and grammar corrections
- Broken or outdated links
- Incorrect information with sources

## 📋 Content Inclusion Criteria

### Resources Must Meet These Standards

#### Authority

- Official Microsoft documentation
- Established community experts with proven track record (SQLBI, Chris Webb, etc.)
- Tool creators with active maintenance
- Authors with demonstrated expertise (multiple quality articles, certifications, etc.)

#### Recency

- **Blogs/Videos:** Updated within 12 months (current practices)
- **Foundational content:** Can be older if principles remain valid (e.g., star schema design)
- **Tools:** Active maintenance, compatible with current Power BI versions

#### Uniqueness

- Fills a gap not covered by existing resources
- Provides unique perspective or depth
- Offers specialized knowledge

#### Quality

- Technically accurate
- Clear and accessible
- Well-structured and professional

### We Do NOT Include

❌ **Pure promotional content** without educational value  
❌ **Duplicate coverage** of topics well-covered by existing resources  
❌ **Outdated content** that may lead users astray  
❌ **Low-quality or inaccurate** information  
❌ **Self-promotion** without demonstrated expertise  
❌ **Commercial courses** without substantial free content/preview  

## 🔍 Review Process

### Timeline

- **Simple fixes** (typos, broken links): 1-3 days
- **Resource suggestions**: 1-2 weeks (every 2 weeks)
- **Best practice updates**: 1-2 weeks (require maintainer consensus)

### What Happens

1. **Issue submitted** via appropriate template
2. **Automated checks** validate links (for resources)
3. **Maintainer review** evaluates against inclusion criteria
4. **Discussion** in issue comments if clarification needed
5. **Decision** with documented reasoning
6. **Implementation** by maintainers if approved

### If Your Suggestion is Declined

We'll provide specific reasons based on our criteria. You may:

- Provide additional context we may have missed
- Resubmit after addressing concerns (e.g., more published content)
- Discuss in issue comments if you believe criteria were misapplied

**Our goal is transparency, not gatekeeping.** We document our reasoning to show consistency.

## 👥 Maintainer Structure

### Lead Curator

- Final decision authority on content inclusion
- Strategic direction and quality standards
- Community engagement and growth

### Section Maintainers

Experts who review contributions in specific areas:
- **DAX & Data Modeling**: Technical best practices evaluation
- **Tools & Development**: Tool and DevOps resource assessment
- **Learning & Community**: Educational content quality

### Becoming a Maintainer

- Active, high-quality contributions over time
- Demonstrated expertise in Power BI
- Alignment with project philosophy
- Invitation from lead curator

## Creating a Good Issue

Follow these guidelines to help us process your contribution efficiently.

### Title

A good title should be short and descriptive, containing all relevant keywords to simplify searching in our issue tracker.

**Examples:**

- ✅ "Add SQLBI Tabular Editor 3 documentation to tools"
- ✅ "Update DirectQuery best practices for Fabric"
- ❌ "New resource" (too vague)
- ❌ "Fix this please" (not descriptive)

### Description

Provide a clear and concise summary:

- **Keep it short** – If you can explain it in one or two sentences, perfect
- **One issue at a time** – Create separate issues for unrelated items
- **Include context** – Explain why the change is valuable

> Why we need this: describing the problem or suggestion clearly is essential for us to evaluate and implement your contribution effectively.

### Related Links

For resource suggestions, provide:

- Direct link to the resource
- Author/creator name and credentials  
- RSS feed URL (if applicable)
- Last updated date

> Why we need this: providing links helps us verify the resource quality, authority, and recency before adding it to our curated collection.

### Proposed Change (for best practices)

When suggesting best practice changes:

- Quote the current guidance
- Explain what should change and why
- Provide authoritative sources (Microsoft docs, SQLBI, etc.)
- Note which Power BI versions are affected

> Why we need this: authoritative sources ensure our best practices remain accurate and trustworthy.

### Checklist

Each issue template includes a checklist. Please ensure you've completed all items before submitting.

## 🚀 Getting Started

Simply choose the appropriate issue template and fill out all required fields:

- **[Suggest Resource](https://github.com/EvaluationContext/Power-BI-Nexus/issues/new?template=suggest-resource.yml)** - Add a new blog, tool, video, or documentation
- **[Improve Best Practices](https://github.com/EvaluationContext/Power-BI-Nexus/issues/new?template=improve-best-practices.yml)** - Update or add best practice guidance  
- **[Report Issue](https://github.com/EvaluationContext/Power-BI-Nexus/issues/new?template=report-issue.yml)** - Fix typos, broken links, or outdated content

We'll take it from there!

## ⚙️ Automated Checks

Our GitHub Actions will:

- **Validate links** - Ensure all URLs are accessible
- **Auto-label issues** - Categorize based on content and type  
- **Welcome first-timers** - Provide helpful guidance to new contributors
- **Track stale issues** - Flag inactive issues for closure after 30 days

These checks help maintain quality and keep the issue tracker organized.

## 📐 Style Guidelines

### Markdown Formatting

- Use consistent header levels (## for main sections, ### for subsections)
- Format links: `[Link Text](URL)`
- Use bold for emphasis: `**important concept**`
- Use code blocks for DAX: ` ```dax `

### Resource Table Format

```markdown
| [Resource Name](URL) | <span class="type-label">Category</span> | Description | [:material-rss:](feed-url){target="_blank"} |
```

### Best Practices Format

- Lead with the principle
- Link to authoritative sources with `[^footnote]` notation
- Include practical examples where helpful
- Keep it scannable (bullets, short paragraphs)

## ⚖️ Conflict of Interest

### Transparency Required

When suggesting content, disclose your relationship:
- ✅ "I am the author"
- ✅ "I work for the company that created this tool"
- ✅ "I have no relationship to this content"

### Self-Promotion Guidelines

We welcome authors sharing their own quality content, **provided**:

- You meet authority criteria (demonstrated expertise)
- Content fills a unique gap
- You're transparent about authorship
- Content meets quality standards

**We evaluate based on merit, not who suggests it.**

## 🤖 Automated Checks

Our CI/CD pipeline automatically:

- ✅ Validates all links (no 404s)
- ✅ Auto-labels PRs based on changed files
- ✅ Adds size labels to track PR scope

Passing automated checks does **not** guarantee acceptance—maintainer review evaluates content quality and fit.

## 💬 Questions?

- **Have questions?** Comment on your PR or open an [Issue](https://github.com/EvaluationContext/Power-BI-Nexus/issues)
- **Want to chat?** Start a discussion thread

## 📜 Code of Conduct

Be respectful, constructive, and professional. We're all here to improve Power BI knowledge sharing.

- Respectful disagreement is welcome
- Personal attacks are not
- Focus on content quality, not personal preferences
- Assume good intent

## ❓ Questions?

- Check our [Contributing Guide](https://evaluationcontext.github.io/Power-BI-Nexus/contribute/)
- Open an issue for clarification
- Review existing issues and discussions

## 🙏 Thank You!

Your contributions help make Power BI Nexus the definitive resource for the community. Whether suggesting resources, improving best practices, or fixing issues, every contribution matters.

**Ready to contribute?** [Choose an issue template](https://github.com/EvaluationContext/Power-BI-Nexus/issues/new/choose) and share your expertise!
