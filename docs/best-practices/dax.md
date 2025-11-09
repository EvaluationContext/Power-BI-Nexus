---
icon: material/function-variant
---

# DAX Best Practices

## Naming Conventions

- Follow SQLBI's [DAX Naming Conventions](https://docs.sqlbi.com/dax-style/dax-naming-conventions) for constancy
    - Semantic Naming
    - Fully qualify column references (Table[Column]); do not qualify measures ([Measure])
    - Denote ad-hoc columns with `@` (i.e `[@NewCol]`) created in `ADDCOLUMN()`, `SUMMARIZE()` etc for clarity, so they are not confused with measures

## General Best Practices

- Prefer **explicit measures** (avoid implicit aggregations) [5]
- Avoid converting BLANKs to values [6]
- Use variables for readability and performance (avoid repeated evaluations) [6]
- Use [`DIVIDE()`](https://learn.microsoft.com/en-us/dax/divide-function-dax) for safe division [6] [7]
- Use [`SWITCH()`](https://learn.microsoft.com/en-us/dax/switch-function-dax) instead of nested [`IF()`](https://learn.microsoft.com/en-us/dax/if-function-dax) statements
- Use [DAX User Defined Functions](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-user-defined-functions-overview) to consolidate repeated code [7]

## Performance Optimization

- Avoid nesting iterator function (i.e `SUMX(,SUMX(,))`), this operation is O(n²), consider whether you can collapse to a single iteration
- Limit iterator functions (`SUMX()`, `FILTER()`) over large tables; pre-aggregate when possible
- Filter on columns not tables (i.e. use `FILTER( VALUES( Products[Colour] ), Product[Colour]="Red" )` instead of `FILTER( Products, Product[Colour]="Red" )`) to reduce scan granularity [6]
- Consider [`IF.EAGER()`](https://learn.microsoft.com/en-us/dax/if-eager-function-dax) if fusion between branches possible [7]
- `SUMX(DISTINCT(),1)` can sometimes have better performance than `DISTINCTCOUNT()`, test to see what works best for your measure
- Test complex measures with Performance Analyzer + DAX Studio query plan
  - Perform multiple tests of different variation of measures to determine if one is significantly better than another

## Function Usage

- Avoid [`EARLIER()`](https://learn.microsoft.com/en-us/dax/earlier-function-dax) (use variables / row context transitions)
- Use [`TREATAS()`](https://learn.microsoft.com/en-us/dax/treatas-function-dax) instead of [`INTERSECT()`](https://learn.microsoft.com/en-us/dax/intersect-function-dax) for virtual relationships (filter propagation with better performance characteristics).
- Use [`SUMMARIZE()`](https://learn.microsoft.com/en-us/dax/summarize-function-dax) only for grouping tuples; use [`ADDCOLUMNS()`](https://learn.microsoft.com/en-us/dax/addcolumns-function-dax) (or [`SUMMARIZECOLUMNS()`](https://learn.microsoft.com/en-us/dax/summarizecolumns-function-dax)) to add calculated columns safely. [^8]
- Use `COUNTROWS()` instead of `COUNT()` [^8]
- Use `SELECTEDVALUE` instead of `VALUES` [^9]
- Avoid using `FILTER` as a filter argument [^10]

## References

[5]: https://radacad.com/explicit-vs-implicit-dax-measures-in-power-bi/
[6]: https://learn.microsoft.com/en-us/dax/best-practices/dax-avoid-converting-blank
[6]: https://learn.microsoft.com/en-us/dax/best-practices/dax-variables
[6]: https://www.sqlbi.com/articles/filtering-tables/
[6]: https://learn.microsoft.com/en-us/dax/best-practices/dax-divide-function-operator
[7]: https://www.sqlbi.com/articles/divide-performance/
[6]: https://www.sqlbi.com/articles/understanding-eager-vs-strict-evaluation-in-dax/
[7]: https://www.sqlbi.com/articles/best-practices-using-summarize-and-addcolumns/
[7]: https://learn.microsoft.com/en-us/dax/best-practices/dax-user-defined-functions
[8]: https://learn.microsoft.com/en-us/dax/best-practices/dax-countrows
[9]: https://learn.microsoft.com/en-us/dax/best-practices/dax-selectedvalue
[10]: https://learn.microsoft.com/en-us/dax/best-practices/dax-avoid-avoid-filter-as-filter-argument
