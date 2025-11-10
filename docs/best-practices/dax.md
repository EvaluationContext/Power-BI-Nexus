---
icon: material/function-variant
---

# DAX Best Practices

## Naming Conventions

- Follow SQLBI's [DAX Naming Conventions](https://docs.sqlbi.com/dax-style/dax-naming-conventions) for consistency
    - Use semantic naming that describes what the measure/column does
    - Fully qualify column references (`Table[Column]`); do not qualify measures (`[Measure]`)
    - Denote ad-hoc columns created in `ADDCOLUMNS()`, `SUMMARIZE()` etc with `@` (i.e `[@NewCol]`) for clarity

## Code Quality & Maintainability

- **Prefer explicit measures** over implicit measures [^1]
    - Define measures explicitly rather than relying on automatic aggregation
    - Makes intent clear and calculations reusable

- **Use variables** for readability and performance [^2]
    - Store intermediate calculations to avoid repeated evaluations
    - Make complex formulas easier to understand and debug

- **Use DAX User Defined Functions** to consolidate repeated code [^3] [^4]
    - Create reusable functions for common calculation patterns
    - Improves maintainability and consistency

- **Use `SWITCH()`** instead of nested `IF()` statements
    - More readable and often better performance
    - Easier to maintain when adding new conditions

## Error Handling & Safety

- **Avoid converting BLANKs to values** [^5]
    - Can be expensive

- **Use `DIVIDE()`** for safe division [^6] [^7]
    - Automatically handles division by zero
    - Returns BLANK instead of error

## Performance Optimization

### Iterator Functions

- **Avoid nesting iterator functions** (i.e `SUMX(,SUMX(,))`)
    - Nested iterations are O(n²) operations
    - Consider collapsing to a single iteration when possible

- **Limit iterator functions over large tables**
    - Pre-aggregate data when possible
    - Use variables to cache intermediate results

- **Filter on columns, not tables** [^8]
    - Use `FILTER(VALUES(Products[Colour]), Product[Colour]="Red")`
    - Instead of `FILTER(Products, Product[Colour]="Red")`
    - Reduces scan granularity and improves performance

### Function Selection

- **Consider `SUMX(DISTINCT(),1)` vs `DISTINCTCOUNT()`**
    - Test both approaches for your specific scenario
    - Performance can vary based on data distribution

- **Consider `IF.EAGER()`** when fusion between branches is possible [^9]
    - Can improve performance in certain scenarios
    - Allows query engine to optimize both branches

- **Test with Performance Analyzer + DAX Studio**
    - Compare multiple variations of complex measures
    - Use query plans to understand performance characteristics

## Function-Specific Best Practices

### Filtering & Context

- **Avoid [`FILTER()`](https://learn.microsoft.com/en-us/dax/filter-function-dax) as a filter argument** [^10]
    - Use Boolean expressions as filter arguments whenever possible
    - Import tables are optimized for column-based filtering
    - Only use `FILTER()` when necessary for complex comparisons involving:
        - Measures
        - Multiple columns
        - OR logic
    - Use [`KEEPFILTERS()`](https://learn.microsoft.com/en-us/dax/keepfilters-function-dax) to preserve existing filters

- **Use [`TREATAS()`](https://learn.microsoft.com/en-us/dax/treatas-function-dax)** instead of [`INTERSECT()`](https://learn.microsoft.com/en-us/dax/intersect-function-dax) for virtual relationships
    - Better performance characteristics

- **Avoid `EARLIER()`** (use variables or row context transitions)
    - Variables are more readable and maintainable
    - Less confusing than multiple row contexts

### Aggregation & Counting

- **Use [`COUNTROWS()`](https://learn.microsoft.com/en-us/dax/countrows-function-dax)** instead of [`COUNT()`](https://learn.microsoft.com/en-us/dax/count-function-dax) [^11]
    - It's more efficient, and so it will perform better
    - It doesn't consider BLANKs contained in any column of the table
    - The intention of formula is clearer, to the point of being self-describing

- **Use [`SELECTEDVALUE()`](https://learn.microsoft.com/en-us/dax/selectedvalue-function-dax)** instead of [`VALUES()`](https://learn.microsoft.com/en-us/dax/values-function-dax), when determining if single value present in filter context [^12]
    - Returns scalar value instead of single-row table
    - Automatically handles single/multiple selection scenarios

### Table Functions

- **Use [`SUMMARIZE()`](https://learn.microsoft.com/en-us/dax/summarize-function-dax) only for grouping tuples** [^13]
    - Don't add calculated columns in `SUMMARIZE()`
    - Use [`ADDCOLUMNS()`](https://learn.microsoft.com/en-us/dax/addcolumns-function-dax) or `SUMMARIZECOLUMNS()` for calculations
    - Avoids context transition issues

[^1]: https://radacad.com/explicit-vs-implicit-dax-measures-in-power-bi/
[^2]: https://learn.microsoft.com/en-us/dax/best-practices/dax-variables
[^3]: https://learn.microsoft.com/en-us/dax/best-practices/dax-user-defined-functions
[^4]: https://www.sqlbi.com/articles/introducing-user-defined-functions-in-dax/
[^5]: https://learn.microsoft.com/en-us/dax/best-practices/dax-avoid-converting-blank
[^6]: https://learn.microsoft.com/en-us/dax/best-practices/dax-divide-function-operator
[^7]: https://www.sqlbi.com/articles/divide-performance/
[^8]: https://www.sqlbi.com/articles/filtering-tables/
[^9]: https://www.sqlbi.com/articles/understanding-eager-vs-strict-evaluation-in-dax/
[^10]: https://learn.microsoft.com/en-us/dax/best-practices/dax-avoid-avoid-filter-as-filter-argument
[^11]: https://learn.microsoft.com/en-us/dax/best-practices/dax-countrows
[^12]: https://learn.microsoft.com/en-us/dax/best-practices/dax-selectedvalue
[^13]: https://www.sqlbi.com/articles/best-practices-using-summarize-and-addcolumns/
