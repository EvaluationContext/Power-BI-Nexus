---
icon: material/shield-lock
---

# Security Best Practices

## Row and Object Level Security

- Apply [**Row-Level Security (RLS)**](https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security) to limit data access at the row level
- Use [**Object-Level Security (OLS)**](https://learn.microsoft.com/en-us/fabric/security/service-admin-object-level-security?tabs=table) to hide sensitive tables or columns

## Classification and Access Control

- Apply [**Sensitivity labels**](https://learn.microsoft.com/en-us/fabric/enterprise/powerbi/service-security-sensitivity-label-overview) to classify and protect content
- Apply **least privilege** for access to workspace and items
    - Reserve Admin/Member/Contributor roles for those who need edit permissions (RLS/OLS doesn't apply)

## Data Loss Prevention and Auditing

- Enable [**Data Loss Prevention (DLP) policies**](https://learn.microsoft.com/en-us/fabric/governance/data-loss-prevention-overview) to enforce organizational security policies
- Monitor [**audit logs**](https://learn.microsoft.com/en-us/fabric/enterprise/powerbi/service-security-sensitivity-label-audit-schema) to track sensitivity label changes and data access activities
