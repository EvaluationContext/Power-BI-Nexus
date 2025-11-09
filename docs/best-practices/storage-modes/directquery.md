---
icon: material/database-arrow-right
---

# DirectQuery Mode Best Practices

DirectQuery sends queries directly to the source system for each visual interaction, providing near real-time data without importing.

## Key Recommendations

- **Prefer Import**; use DirectQuery only for near real-time or very large datasets

- **Avoid complex Power Query queries** - transformations should happen in source

- **Use dynamic M parameters** for efficient parameterized queries

- **Minimize visuals per page** - each visual triggers source queries in DirectQuery

- **Use Aggregations** (imported) + Composite to offload heavy scans

- **Avoid high-cardinality text columns** - source load + slow joins

- **Limit measures with row-by-row iterators** (SUMX) on DirectQuery tables

- **Enable query reduction options**:
    - Disable auto page refresh unless needed
    - Turn off visual interactions where irrelevant

- **Evaluate cost of cross-source filters** - simplify dimension filters before crossing sources

## Performance Optimization

### Query Design

- Create indexes on source tables for join columns and filters
- Ensure statistics are up to date on source
- Use query folding where possible
- Avoid calculated columns (use source columns or measures instead)

### Visual Design

- Reduce number of visuals per page (target < 10)
- Use slicers efficiently - pre-filter before cross-filtering
- Avoid unnecessary bidirectional relationships
- Consider using aggregations for summary calculations

### Source System

- Optimize source database performance
- Use materialized views for complex queries
- Implement appropriate partitioning
- Monitor source system load during peak usage

## DAX Considerations

- Some DAX functions have limited support or poor performance
- Row-level iterators (SUMX, FILTER) execute query per row context
- Complex calculations may require multiple roundtrips to source
- Use variables to reduce query complexity

## Security

- Row-Level Security (RLS) passes filters to source
- Single Sign-On (SSO) can pass user identity to source
- Test RLS performance impact on source queries

## When to Use DirectQuery

- ✅ Need near real-time data (< hourly refresh)
- ✅ Dataset too large for Import capacity
- ✅ Source system is high-performance database
- ✅ Data volatility too high for Import refresh
- ✅ Need to leverage source security/RLS

## When NOT to Use DirectQuery

- ❌ Source system has poor query performance
- ❌ Complex DAX calculations required
- ❌ Need best possible end-user performance
- ❌ Source system can't handle query load
- ❌ Many visuals/interactions per report page

## Reference

[DirectQuery model guidance](https://learn.microsoft.com/en-us/power-bi/guidance/directquery-model-guidance)
