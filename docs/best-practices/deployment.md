---
icon: material/rocket-launch
---

# Deployment & Lifecycle Best Practices

## Source Control

- Prefer [PBIP](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview) for source control; store in Git.

- Avoid manual edits in Production; enforce deployment pipelines/CICD pipelines

## Tools

| Tool | Deployment Technology | Semantic Model Deployment? | pbix/pbit Deployment? | pbip Deployment? |
|------|----------------------|---------------------------|----------------------|------------------|
| Pbitools | Power BI APIs / .NET | ✔ | ✔ | ✘ |
| Tabular Editor | .NET | ✔ | ✘ | ✔ v3.8+ / ✘ v2.x |
| AMO library | .NET | ✔ | ✘ | ~ |
| Power BI APIs | Power BI APIs | ✔ | ✘ | |
| Git Integration | ? | ✔ | ✔ | ✔ |
| Fabric APIs | Fabric APIs | ✔ | ✔ | ✔ |
| Semantic Link | Python | ✔ | ✘ | ✘ |

## Quality Assurance

- PBI Inspector
- Tabular Editor Best Practice Analyzer
- VS Code extension for TMDL
- Gerhart and Fabric extension
