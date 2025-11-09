---
icon: material/database-sync
---

# Composite Models Best Practices

Composite models combine Import and DirectQuery storage modes in a single dataset, allowing you to optimize each table based on its requirements.

## Overview

A composite model allows different tables to use different storage modes:

- **Import tables** - cached in memory for performance
- **DirectQuery tables** - queried from source for real-time data
- **Dual tables** - act as Import or DirectQuery depending on query context

## Key Scenarios

### Scenario 1: Large Fact + Small Dimensions

- **Fact table:** DirectQuery (too large for Import)
- **Dimension tables:** Import (small, improves performance)
- **Benefit:** Fast dimension filtering without loading huge fact table

### Scenario 2: Real-time + Historical

- **Current data:** DirectQuery (real-time)
- **Historical data:** Import (performance)
- **Benefit:** Recent data is live, historical is fast

### Scenario 3: Aggregations

- **Detail table:** DirectQuery
- **Aggregation table:** Import
- **Benefit:** Summary queries hit fast import aggregations, details query source

## Dual Storage Mode

Tables set to **Dual** mode dynamically switch between Import and DirectQuery:

- Queried as **Import** when combined with Import tables
- Queried as **DirectQuery** when combined with DirectQuery tables
- Typically used for dimension tables to avoid cross-source group limitations

## Best Practices

### Design Patterns

- Use Import for small, relatively static dimension tables
- Use DirectQuery for large, volatile fact tables
- Set shared dimensions to Dual to avoid cross-source issues
- Implement aggregations to accelerate common queries

### Performance

- Monitor which queries hit Import vs DirectQuery
- Use Performance Analyzer to identify slow cross-source queries
- Consider adding aggregations for frequently queried metrics
- Minimize cross-source relationships where possible

### Relationships

- Relationships between Import and DirectQuery tables create cross-source queries
- Dual tables help bridge between storage modes
- Test relationship performance with realistic data volumes
- Consider denormalizing to reduce cross-source joins

## Aggregations

Aggregations are Import tables that pre-calculate summaries:

- Queries automatically redirect to aggregations when possible
- Source detail table can be DirectQuery
- Aggregations must be at higher grain than detail table
- Dramatically improve performance for common summary queries

### Aggregation Design

- Identify common query patterns and grains
- Create aggregation tables at appropriate levels (daily, monthly, etc.)
- Map aggregation columns to detail table columns
- Test query redirection with DAX Studio

## Limitations

- Some DAX functions may not work across storage modes
- Query performance depends on cross-source query complexity
- RLS may need to be defined on both Import and DirectQuery tables
- Refresh scheduling more complex with mixed modes

## When to Use Composite Models

- ✅ Need real-time data for recent records, historical can be cached
- ✅ Fact table too large for Import, dimensions are small
- ✅ Want to use aggregations with DirectQuery detail table
- ✅ Need to combine cloud and on-premises data sources
- ✅ Different tables have different latency requirements

## When NOT to Use Composite Models

- ❌ All tables can fit comfortably in Import mode
- ❌ All tables need real-time data
- ❌ Team lacks expertise to troubleshoot cross-source issues
- ❌ Source systems can't handle DirectQuery load

## Reference

[Composite model guidance](https://learn.microsoft.com/en-us/power-bi/guidance/composite-model-guidance)
