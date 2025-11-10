---
icon: material/database-sync
---

# Composite Models Best Practices

## Overview

- Combines Import and DirectQuery storage modes in single dataset
- Different tables use different storage modes based on requirements
- **Dual tables** act as Import or DirectQuery depending on query context

## Design Patterns

- Use Import for small, relatively static dimension tables
- Use DirectQuery for large, volatile fact tables
- Set shared dimensions to Dual to avoid cross-source issues
- Implement aggregations to accelerate common queries
- Minimize cross-source relationships where possible
- Consider denormalizing to reduce cross-source joins
- Consider adding aggregations for frequently queried metrics

## Limitations

- Some DAX functions may not work across storage modes
- Query performance depends on cross-source complexity
- RLS may need definition on both Import and DirectQuery tables
- Refresh scheduling more complex with mixed modes
- Understand **wholesale vs retail execution** [^1]
    - Calculated columns on remote tables must be wholesale (cannot reference local tables)
    - Remote calculation groups only apply to wholesale sub-queries, not retail [^2]

[Composite model guidance](https://learn.microsoft.com/en-us/power-bi/guidance/composite-model-guidance)

[^1]: https://www.sqlbi.com/articles/introducing-wholesale-and-retail-execution-in-composite-models/
[^2]: https://www.sqlbi.com/articles/understanding-the-interactions-between-composite-models-and-calculation-groups/
