---
icon: fontawesome/solid/diagram-project
---

# Data Modeling Best Practices

## Star Schema

- **Star schema:** should be used [1]

    - Data model design of the should be divorced from how data is stored in source systems and should represent the business process that is being modelled

    - Third normal form (3-NF) should be used "[every] non-key [attribute] must provide a fact about the key, the whole key, and nothing but the key"

    - Snowflaking should be avoided. Dimensional hierarchies (e.g. Category > Subcategory > Product) should be denormalized to a single table, rather normalizing, creating a snowflake. Run-length encoding and dictionaries reduce impact on table size, and avoid cost of relationships

- Avoid **Single large table** (no dimensional model), results in poor compression and unexpect measure results due to AUTOEXIST [1]

- **Degenerate dimensions** (e.g. Order Number) are acceptable; but need to consider AUTOEXIST [1] behavior from [`SUMMARIZECOLUMN()`](https://learn.microsoft.com/en-us/dax/summarizecolumns-function-dax)

- Consider collapsing one-to-one relationship into single table [2]

- **Avoid junk dimensions:** Only use when clearly beneficial

## Data Minimization

- **Remove unnecessary columns**, it is easy to add more columns to the future, it can be hard to remove them later. Extra columns can result in worse compression & segment ordering, increasing table size and slower scans/query performance.

- **Remove unnecessary rows**, if you only need data for 2025, don't import <2025 as well

- **Fact table grain**: choose most atomic grain feasible for flexibility & correct handling of semi/non-additive facts

## Aggregations

- **Aggregations**: can define aggregation fact table when have large fact tables, in cases where higher grain calculations can be leveraged

## Relationships

- **Bi-directional relationships** should be avoided, they can lead to poor performance and model ambiguity [3] [4]

    - Can avoid some of the cost by applying the Bi-directional relationship within measures by using a [`CALCULATE()`](https://learn.microsoft.com/en-us/dax/calculate-function-dax) filter modifier [`CROSSFILTER( tbl1, tbl2, BOTH))`](https://learn.microsoft.com/en-us/dax/crossfilter-function-dax)

- Hide foreign keys & fact table surrogate keys from report view; expose business fields only.

## Naming and Data Types

- **Semantic naming**: Use business-friendly table & column names (e.g. Products, Order Date) instead of technical names (dim_product). Capitalize first letter of object names; use consistent casing.

- Use the narrowest appropriate data types for accuracy requirements (whole numbers over decimals when possible), to reduce cardinality of values for optimal compression

- Split DateTime into separate Date and Time to reduce cardinality.

- Truncate time values (minute/hour) where possible to reduce cardinality.

## Date Dimensions

- Disable [auto date/time](https://learn.microsoft.com/en-us/power-bi/guidance/auto-date-time), this feature create a hidden date table for every date column in the model, a date dimension should be used instead.

- Use a **Date dimension** as a role-playing dimension:

    - Define [**Calendar-based time intelligence**](https://learn.microsoft.com/en-gb/power-bi/transform-model/desktop-time-intelligence#calendar-based-time-intelligence-preview) on date dimension, this allow for more efficient query plans to be generates when filtering on year, month etc.

    - [Mark as a date table](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-date-tables#how-to-set-your-own-date-table)

        - If using Classic time intelligence, the date table must be [marked as a date table](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-date-tables#how-to-set-your-own-date-table). This is not necessary if you use the recommended Calendar-based time intelligence, [except in specific circumstances](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-date-tables#when-you-must-mark-your-date-table).

    - Can use [`USERELATIONSHIP()`](https://learn.microsoft.com/en-us/dax/userelationship-function-dax) can activate inactive relationship to allow date dimension to act against non-default date field

    - Only create additional date dimensions when comparing two independent date contexts (i.e. [Sales Date] and [Order Date])

## References

[1]: https://learn.microsoft.com/en-us/power-bi/guidance/star-schema

[1]: https://www.sqlbi.com/articles/understanding-dax-auto-exist/

[2]: https://learn.microsoft.com/en-us/power-bi/guidance/relationships-one-to-one

[3]: https://www.sqlbi.com/articles/bidirectional-relationships-and-ambiguity-in-dax/

[4]: https://learn.microsoft.com/en-us/power-bi/guidance/relationships-bidirectional-filtering
