---
icon: material/cog-transfer
---

# Data Preparation Best Practices

## Power Query

- Data should be transformed as far upstream as possible, and as far downstream as necessary [^1]
- Filter early in transformations
- Maintain [**Query folding**](https://learn.microsoft.com/en-us/power-bi/guidance/power-query-folding) as long as possible in Power Query to push transformations to source
- Use [**Incremental refresh**](https://learn.microsoft.com/en-us/power-bi/connect-data/incremental-refresh-configure) where possible to reduce size of refreshes

[^1]: https://ssbipolar.com/2021/05/31/roches-maxim/
