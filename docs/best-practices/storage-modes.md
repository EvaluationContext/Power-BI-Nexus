---
icon: material/server
---

# Storage Modes

| Mode | Data Loading | Performance | Latency | Best For |
|------|--------------|-------------|---------|----------|
| [**Import**](storage-modes/import-mode.md) | Cached in memory | Fastest | Refresh schedule | Most scenarios, best performance |
| [**DirectQuery**](storage-modes/directquery.md) | Query per interaction | Source-dependent | Near real-time | Large datasets, real-time needs |
| [**Composite**](storage-modes/composite-models.md) | Mixed | Optimized per table | Varies | Combining real-time + historical |
| [**Direct Lake**](storage-modes/direct-lake.md) | On-demand to memory | Fast | Near real-time | Fabric Lakehouse/Warehouse data |