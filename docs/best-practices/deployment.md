---
icon: material/rocket-launch
---

# Deployment & Lifecycle Best Practices

## Source Control

- Prefer [PBIP](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview) for source control, over PBIX or PBIT; store in Git

- Avoid manual edits in Production; enforce deployment pipelines/CICD pipelines

## CI

- [PBI Inspector](https://github.com/NatVanG/PBI-Inspector)
- [Tabular Editor Best Practice Analyzer](https://docs.tabulareditor.com/common/using-bpa.html?tabs=TE3Rules)

## CD

| Tool | Category | Semantic Model Deployment? | pbix/pbit Deployment? | pbip Deployment? |
|------|----------|---------------------------|----------------------|------------------|
| [Pbitools](https://pbi.tools/) | <span class="type-label">REST API</span> <span class="type-label">.NET</span> | :material-check: | :material-check: | :material-close: |
| [Tabular Editor](https://tabulareditor.com/) | <span class="type-label">.NET</span> | :material-check: | :material-close: | :material-check: v3.8+ </br> :material-close: v2.x |
| [AMO library](https://learn.microsoft.com/en-us/analysis-services/client-libraries?view=sql-analysis-services-2025) | <span class="type-label">.NET</span> | :material-check: | :material-close: | ~ |
| [Power BI APIs](https://learn.microsoft.com/en-us/rest/api/power-bi/imports/post-import-in-group) | <span class="type-label">REST API</span> | :material-check: | :material-close: | |
| [Git Integration](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-git) | <span class="type-label">Git</span> | :material-check: | :material-check: | :material-check: |
| [Fabric APIs](https://learn.microsoft.com/en-us/rest/api/fabric/core/items/create-item?tabs=HTTP) | <span class="type-label">REST API</span> | :material-check: | :material-check: | :material-check: |