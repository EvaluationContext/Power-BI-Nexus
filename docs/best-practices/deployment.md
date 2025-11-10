---
icon: material/rocket-launch
---

# Deployment & Lifecycle Best Practices

## Source Control

- Prefer [Power BI Project (PBIP)](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview) format for source control, over PBIX or PBIT; use [Git](https://git-scm.com/)
    - Text-based format enables proper source control and diff tracking
    - Supports granular change tracking at the object level (measures, tables, visuals)
    - Enables collaborative development with merge conflict resolution
    - Separates semantic model from report for independent versioning
    - Compatible with Git workflows (branching, pull requests, code review)

- Avoid manual edits in production; enforce deployment pipelines/CI/CD pipelines

## CI

- [PBI Inspector](https://github.com/NatVanG/PBI-Inspector)
- [Tabular Editor Best Practice Analyzer](https://docs.tabulareditor.com/common/using-bpa.html?tabs=TE3Rules)

## CD

| Tool | Category | Semantic Model Deployment? | pbix/pbit Deployment? | pbip Deployment? |
|------|----------|---------------------------|----------------------|------------------|
| [pbi-tools](https://pbi.tools/) | <span class="type-label">REST API</span> <span class="type-label">.NET</span> | :material-check: | :material-check: | :material-close: |
| [Tabular Editor](https://tabulareditor.com/) | <span class="type-label">.NET</span> | :material-check: | :material-close: | :material-check: v3.8+<br>:material-close: v2.x |
| [AMO library](https://learn.microsoft.com/en-us/analysis-services/client-libraries?view=sql-analysis-services-2025) | <span class="type-label">.NET</span> | :material-check: | :material-close: | ~ |
| [Power BI APIs](https://learn.microsoft.com/en-us/rest/api/power-bi/imports/post-import-in-group) | <span class="type-label">REST API</span> | :material-check: | :material-check: | :material-close: |
| [Git Integration](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-git) | <span class="type-label">Git</span> | :material-check: | :material-close: | :material-check: |
| [Fabric APIs](https://learn.microsoft.com/en-us/rest/api/fabric/core/items/create-item?tabs=HTTP) | <span class="type-label">REST API</span> | :material-check: | :material-check: | :material-check: |