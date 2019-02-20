# looker-viz-transposed-table
A Looker Custom Visualization that transposes first dimension onto columns and renders all measures as the first column. Supports table calculations, but will add them to the end of the rendered tabulator table.

## Installation instructions
1. Create a custom visualization in Looker pointing to `transposed_table.js`.

2. Add [tabulator](http://tabulator.info/) javascript as a dependency:
```
https://unpkg.com/tabulator-tables@4.2.1/dist/js/tabulator.min.js
```

3. Done!

## Future improvements

* Add support for subtotals
* Add nicer tooltips based on column descriptions
* Explore advanced tabulator functionality
  * User input table options
* ...
