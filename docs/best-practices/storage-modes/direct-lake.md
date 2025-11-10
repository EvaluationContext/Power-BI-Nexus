---
icon: material/lightning-bolt
---

# Direct Lake Mode Best Practices

## Overview

- Fabric-exclusive storage mode reading directly from Delta Lake files
- No import or DirectQuery queries required
- Loads data into memory **on-demand** as needed
- Falls back to DirectQuery if data exceeds capacity
- Always current with OneLake data (no refresh required)

## Delta table optimization

- **Use V-Order:** This optimizes the physical layout of your data for faster querying [^1]
- **Merge small files:** Regularly compact Parquet files to improve query performance and merge changes with OPTIMIZE commands [^2]
- **Compress data:** Use compression methods like Snappy for better performance
- **Keep the Delta log minimal:** Minimize the effect of data updates on the Delta log

## Semantic model design

- **Include only necessary columns:** Remove unnecessary columns to reduce storage size and loading time, even if they don't affect query performance directly
- **Avoid views and bidirectional relationships:** Views can force a fallback to DirectQuery, and many-to-many or bidirectional relationships are not performant
- P**re-aggregate data:** Reduce the data load by aggregating data before it is loaded into the model

## Query and Refresh Best Practices

- **Write efficient DAX:** Filter only required columns in your DAX measures instead of using ALL(Table)
- **Manage data refresh:** Control when your data is updated by disabling automatic propagation if you need to refresh the entire semantic model at once. Use manual or programmatic refreshes to ensure your model is in a consistent state
- **Use pure Direct Lake mode for authoring:** Test your model in pure Direct Lake mode to ensure maximum performance before considering fallback options in production

## Security and Permissions

- **Distribute reports using apps:** Do not grant end-users direct workspace access. Instead, share reports and data through a Power BI app, as recommended in the Microsoft documentation

[Direct Lake documentation](https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview)

[^1]: https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimization-and-v-order?tabs=sparksql
[^2]: https://learn.microsoft.com/en-us/fabric/data-engineering/delta-optimization-and-v-order?tabs=sparksql#delta-table-maintenance