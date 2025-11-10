---
icon: material/database-import
---

# Import Mode Best Practices

## Overview

- **Prefer Import mode** for performance unless data size/latency requires DirectQuery/Composite/Direct Lake
- Loads data into memory for optimal query performance
- Default and recommended storage mode for most scenarios

## Model Format

- **Small models**: < 1 GB compressed, stored in Analysis Services
- **Large models**: Can exceed 10 GB, requires Premium capacity features

## Advantages & Considerations

- **Fastest query performance** - all data cached in memory
- **Full DAX capability** - all functions and features available
- **Excellent compression** - VertiPaq engine reduces storage footprint
- **Complex transformations** - Power Query can perform any transformation
- **Refresh schedule required** - data becomes stale between refreshes
- **Memory capacity limits** - dataset size constrained by capacity
- **Refresh duration** - large datasets may take significant time
- **Gateway required** - for on-premises data sources