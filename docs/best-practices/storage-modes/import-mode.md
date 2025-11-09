---
icon: material/database-import
---

# Import Mode Best Practices

Import mode loads data into memory for optimal query performance. It's the default and recommended storage mode for most scenarios.

## Key Recommendations

- **Prefer Import mode** for performance unless data size/latency requires DirectQuery/Composite.

- Choose between **Small** and **Large Model** format based on dataset size:
    - Small models: < 1 GB compressed, stored in Analysis Services
    - Large models: Can exceed 10 GB, use Premium capacity features

## Advantages

- **Fastest query performance** - all data in memory
- **Full DAX capability** - all functions and features available
- **Data compression** - VertiPaq engine provides excellent compression ratios
- **Complex transformations** - Power Query can perform any transformation

## Considerations

- **Refresh schedule required** - data becomes stale between refreshes
- **Memory capacity limits** - dataset size constrained by capacity
- **Refresh duration** - large datasets may take significant time to refresh
- **Gateway required** - for on-premises data sources

## Optimization Tips

- Remove unnecessary columns and rows
- Use appropriate data types (narrowest possible)
- Leverage incremental refresh for large tables
- Split DateTime columns to reduce cardinality
- Disable auto date/time tables
- Monitor compression and storage with VertiPaq Analyzer

## When to Use Import

- ✅ Static or slowly changing data
- ✅ Data can fit in available capacity
- ✅ Best query performance is priority
- ✅ Complex DAX calculations needed
- ✅ Data compression is beneficial

## When NOT to Use Import

- ❌ Near real-time data requirements
- ❌ Dataset exceeds capacity limits
- ❌ Data changes too frequently for practical refresh schedule
- ❌ Source system can't support extraction load
