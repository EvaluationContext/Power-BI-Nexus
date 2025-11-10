---
icon: material/cog-transfer
---

# Data Preparation Best Practices

## Power Query

- Transform data as far upstream as possible (e.g. ELT layer) to avoid duplication and heavy semantic refresh cost. Create columns in up-stream system rather than crate calculated columns.

- Filter early in transformations

- Maintain [**Query folding**](https://learn.microsoft.com/en-us/power-bi/guidance/power-query-folding) as long as possible in Power Query to push transformations to source.

- Use [**Incremental refresh**](https://learn.microsoft.com/en-us/power-bi/connect-data/incremental-refresh-configure) where possible to reduce size of refreshes.
