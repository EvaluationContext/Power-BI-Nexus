---
icon: material/lightbulb-on-outline
hide:
  - toc
---

# Creating Good Issues

Follow these guidelines to help us process your contribution efficiently.

---

## Title

A good title should be short and descriptive, containing all relevant keywords to simplify searching in our issue tracker.

### :octicons-check-circle-fill-16: Good Titles

> - "Add SQLBI Tabular Editor 3 documentation to tools"
> - "Update DirectQuery best practices for Fabric"
> - "Fix broken link to Microsoft Fabric documentation"
> - "Add DAX Studio performance optimization guide"

### :octicons-x-circle-fill-16: Poor Titles

> - "New resource" (too vague)
> - "Fix this please" (not descriptive)
> - "Help!" (no context)
> - "Update" (no specificity)

---

## Description

Provide a clear and concise summary:

- **Keep it short** – If you can explain it in one or two sentences, perfect
- **One issue at a time** – Create separate issues for unrelated items
- **Include context** – Explain why the change is valuable

### :octicons-check-circle-fill-16: Good Description Example

> **Resource:** [SUMMARIZECOLUMNS best practices](https://www.sqlbi.com/articles/summarizecolumns-best-practices/)
>
> **Why:** This article from SQLBI provides comprehensive guidance on using SUMMARIZECOLUMNS functions effectively, covering common pitfalls and optimization techniques. It fills a gap in our DAX best practices section with detailed examples and performance considerations.
>
> **Author:** Marco Russo and Alberto Ferrari (SQLBI)  
> **Last Updated:** November 2024

### :octicons-x-circle-fill-16: Poor Description Example

> Add this link: https://example.com
>
> It's good.
>

---

## Resources

For resource suggestions, provide:

- **Direct link** to the resource
- **Author/creator name** and credentials  
- **RSS feed URL** (if applicable for blogs)
- **Last updated date** (verify content is current)

### Example

> ```
> Resource URL: https://evaluationcontext.github.io/
> Author: Jake Duddy
> RSS Feed: https://evaluationcontext.github.io/feed_rss_created.xml.xml
> Last Updated: November 2025
> ```

---

## Best Practices

When suggesting best practice changes:

- **Quote the current guidance** (if updating existing content)
- **Explain what should change** and why
- **Provide authoritative sources** (Microsoft docs, SQLBI, etc.)
- **Note which Power BI versions** are affected

### Example

> **Current text (in storage-modes/directquery.md):**
> "DirectQuery is recommended for real-time scenarios"
>
> **Proposed change:**
> "DirectQuery is recommended for near real-time scenarios where data must be current. For true real-time requirements, consider Direct Lake with Fabric."
>
> **Source:** https://learn.microsoft.com/fabric/...
>
> **Reason:** Direct Lake offers better performance than DirectQuery for Fabric workloads and should be mentioned as the preferred option.

## Checklist

Each issue template includes a checklist. Please ensure you've completed all items before submitting:

:octicons-check-circle-fill-16: I've searched for similar existing issues</br>
:octicons-check-circle-fill-16: I've provided all required information</br>
:octicons-check-circle-fill-16: I've disclosed any relationship to the content</br>
:octicons-check-circle-fill-16: I've verified links are working</br>
:octicons-check-circle-fill-16: I've checked the content is current (updated in last 12 months, or is foundational)
