---
icon: material/database-arrow-right
---

# DirectQuery Mode Best Practices

## Overview

- Sends queries directly to source for each visual interaction
- Provides near real-time data without importing
- **Prefer Import**; use DirectQuery only for near real-time or very large datasets

## Key Recommendations

- **Avoid complex Power Query transformations** - perform in source system instead
- **Minimize visuals per page** - each visual triggers source queries (target < 10)
- **Use Aggregations** (imported) + Composite to offload heavy scans
- **Avoid high-cardinality text columns** - causes source load and slow joins
- **Limit row-by-row iterators** (SUMX, FILTER) on DirectQuery tables
- **Enable query reduction options**:
    - Disable auto page refresh unless needed
    - Turn off visual interactions where irrelevant
- **Use dynamic M parameters** for efficient parameterized queries

## Source System Optimization

- Create indexes on join columns and filter columns
- Ensure statistics are up to date
- Use materialized views for complex queries
- Implement appropriate partitioning
- Monitor source system load during peak usage

## Query & Visual Design

- Use query folding where possible
- Avoid calculated columns (use source columns or measures)
- Use slicers efficiently - pre-filter before cross-filtering
- Avoid unnecessary bidirectional relationships
- Consider aggregations for summary calculations

## DAX Considerations

- Some DAX functions have limited support or poor performance
- Row-level iterators execute query per row context
- Complex calculations may require multiple roundtrips
- Use variables to reduce query complexity

## Security

- Row-Level Security (RLS) passes filters to source
- Single Sign-On (SSO) passes user identity to source
- Test RLS performance impact on source queries

[DirectQuery model guidance](https://learn.microsoft.com/en-us/power-bi/guidance/directquery-model-guidance)
