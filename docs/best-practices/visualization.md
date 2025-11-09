---
icon: material/chart-bar
---

# Visualization & UX Best Practices

## Report Design

- Use [themes](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes), for constancy between reports

- Reduce visuals per page (< 15 visuals) to minimize query load

    - Combine simple cards into multi-card / appropriate visuals to enable [fusion](https://docs.sqlbi.com/dax-internals/optimization-notes/vertical-fusion), creating more efficient query plans

    - Use a background image to replace static content visual content on report pages

- Use meaningful titles, descriptions, tooltips

- Remove axis titles and values, and grid lines if they do not provide extra clarity

- Format numbers and dates consistently

- Avoid visual clutter and unnecessary slicers (favor field parameters or filters pane)

## Accessibility

- Sufficient color contrast (WCAG AA)

- Provide alt text for custom visuals/images

- Logical tab order for keyboard navigation

- Avoid color-only encoding; use shapes/icons
