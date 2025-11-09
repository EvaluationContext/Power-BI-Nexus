---
icon: material/lightning-bolt
---

# Direct Lake Mode Best Practices

Direct Lake is a new storage mode exclusive to Microsoft Fabric that reads data directly from Delta Lake files without import or DirectQuery queries.

## Overview

Direct Lake provides a hybrid approach:

- Reads directly from **Delta/Parquet files** in OneLake
- Loads data into memory **on-demand** as needed
- No data import or refresh required
- Falls back to DirectQuery if data exceeds capacity

## Key Advantages

- **No import refresh** - always current with OneLake data
- **Fast query performance** - data loaded into memory like Import
- **Automatic caching** - frequently accessed data stays in memory
- **Fabric integration** - seamless with Lakehouses and Warehouses

## Architecture

```
OneLake (Delta Lake) → Direct Lake → Power BI Semantic Model
```

- Data stored as Delta tables in Lakehouse
- Power BI reads Parquet files directly
- VertiPaq engine caches data in memory
- Automatic fallback to DirectQuery if needed

## Best Practices

### Data Organization

- **Use Lakehouses** for data lake scenarios with Delta tables
- **Use Warehouses** for governed relational layer
- Organize data in star schema in OneLake
- Optimize Parquet file sizes (aim for 100-1000 MB per file)

### Performance

- **Monitor capacity CU impact** of refresh vs interactive workloads
- Balance scheduling to avoid resource contention
- Use Fabric Capacity Metrics app to track usage
- Consider fallback behavior and capacity limits

### Data Preparation

- Apply transformations in Fabric Data Pipelines or Dataflows
- Use Spark notebooks for complex transformations
- Maintain data quality in OneLake layer
- Leverage Delta Lake features (time travel, ACID transactions)

## Direct Lake vs DirectQuery

| Feature | Direct Lake | DirectQuery |
|---------|-------------|-------------|
| **Data Loading** | On-demand to memory | Query per visual |
| **Performance** | Fast (memory-based) | Depends on source |
| **Latency** | Near real-time | Near real-time |
| **Source** | OneLake only | Many sources |
| **Fallback** | To DirectQuery | N/A |

## Direct Lake vs Import

| Feature | Direct Lake | Import |
|---------|-------------|--------|
| **Refresh Required** | No | Yes |
| **Data Latency** | As current as OneLake | Last refresh |
| **Capacity Usage** | Dynamic | Fixed at refresh |
| **Memory Management** | Automatic | Manual via refresh |

## When to Use Direct Lake

- ✅ Data already in Fabric Lakehouse/Warehouse
- ✅ Need low latency over large datasets
- ✅ Want to avoid import refresh scheduling
- ✅ Fabric Premium capacity available
- ✅ Data follows star schema design

## When NOT to Use Direct Lake

- ❌ Data not in Microsoft Fabric
- ❌ Need to combine with external sources
- ❌ Using Power BI Pro or PPU (requires Fabric)
- ❌ Complex Power Query transformations required

## Capacity Considerations

- Monitor **Capacity Units (CU)** consumption
- Direct Lake uses capacity for:
    - Initial data loading into memory
    - Query execution
    - Automatic refresh of cached data
- Plan capacity sizing based on dataset size and concurrency

## Semantic Models

- **Use Warehouses** for governed, certified semantic models
- Apply business logic and transformations in Warehouse layer
- Implement RLS in Warehouse views
- Create optimized schemas for reporting

## Limitations

- Only works with Fabric Lakehouses and Warehouses
- Requires Premium capacity (Fabric F SKU or P SKU)
- Some DAX functions may trigger fallback to DirectQuery
- Complex transformations should be done upstream

## Migration Path

1. Move data to Fabric Lakehouse/Warehouse
2. Optimize data schema for analytics
3. Create Direct Lake semantic model
4. Test performance and capacity usage
5. Monitor fallback scenarios
6. Adjust based on usage patterns

## Reference

[Direct Lake documentation](https://learn.microsoft.com/en-us/fabric/get-started/direct-lake-overview)
