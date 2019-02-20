(function() {
    var viz = {
        // id: "transposed_table",      // id is only necessary for legacy custom visualizations
        // label: "Transposed Table",   // label is only necessary for legacy custom visualizations

        // Choose a color - one of our options
        options: {
            fill_type: {
                type: "string",
                label: "Fill Style",
                display: "select",
                section: "Style",
                values: [{
                    "Full Width": "fitColumns"
                }, {
                    "Fit": "fitDataFill"
                }],
                default: "fitColumns"
            }
        },

        // Set up the initial state of the visualization
        create: function(element, config) {
            var css = element.innerHTML = "<div id='transposed_table'></div>";
            document.querySelector("head").innerHTML += "<link rel='stylesheet' href='https://gitcdn.xyz/cdn/woltapp/looker-viz-transposed-table/master/style.css' type='text/css' media='screen'>";
            document.querySelector("head").innerHTML += "<link rel='stylesheet' href='https://unpkg.com/tabulator-tables@4.2.1/dist/css/tabulator.min.css' type='text/css' media='screen'>";
        },
        // Render in response to the data or settings changing
        update: function(data, element, config, queryResponse) {

            // print data to console for debugging:
            console.log("data", data);
            console.log("config", config);
            console.log("queryResponse", queryResponse);


            // destory old viz if already exists
            if (document.querySelector("#transposed_table").classList.contains("tabulator")) {
                document.querySelector("#transposed_table.tabulator").remove()
            }

            // add measures as initial column
            var clmns = [{
                title: "",
                field: "measure",
                sortable: true,
                datanum: -1
            }];

            // get dimension name that we are switching to be column headers
            dimension_name = queryResponse.fields.dimension_like[0].name;

            // loop through values for each column
            for (var i = 0; i < data.length; i++) {
                var values = {
                    title: data[i][dimension_name].value,
                    field: data[i][dimension_name].value,
                    datanum: i,
                    sortable: true,
                    align: "right" // the actual data columns' data will align right
                };
                clmns.push(values)
            }

            var rws = [];
            // loop through the measures that we need to transpose
            for (var i = 0; i < queryResponse.fields.measure_like.length; i++) {
                measure = queryResponse.fields.measure_like[i];

                // create a row
                var rw = {
                    measure: measure.label_short
                };

                // for each dimension, set the measure value
                for (j = 1; j < clmns.length; j++) {
                    returned_value = data[clmns[j].datanum][measure.name];
                    if (returned_value.rendered != null) {
                        rw[clmns[j].field] = returned_value.rendered;
                    } else {
                        rw[clmns[j].field] = returned_value.value;
                    }
                }

                // add the row to the data
                rws.push(rw);
            }

            // add data to the table
            var tbl = new Tabulator("#transposed_table", {
                layout: config.fill_type,
                columns: clmns,
                data: rws,
                movableColumns: true
            });

        }
    };

    // initialize visualization with data
    looker.plugins.visualizations.add(viz);
}());