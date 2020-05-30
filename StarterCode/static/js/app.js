// Step 1: Plotly
d3.json("data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;

    var id = data.metadata.map(val => val[0]);

    console.log(id);

    for (i = 0; i < id.length; i++) {
        var opt = document.createElement("option");
        document.getElementById("selDataset").innerHTML += '<option id="' + i + '">' + id[i] + '</option>';
      }
  
    // Sort the data array using the greekSearchResults value
    data.sort(function(a, b) {
      return parseInt(b.samples.sample_values) - parseInt(a.samples.sample_values);
    });
  
    // Slice the first 10 objects for plotting
    data = data.slice(0, 10);
  
    // Reverse the array due to Plotly's defaults
    data = data.reverse();

    console.log(data);
  
    // Trace1 for the Greek Data
    var trace1 = {
      x: data.map(row => row.samples.sample_values),
      y: data.map(row => row.samples.otu_ids),
      text: data.map(row => row.samples.otu_labels),
      type: "bar",
      orientation: "h"
    };
  
    // data
    var chartData = [trace1];
  
    // Apply the group bar mode to the layout
    var layout = {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", chartData, layout);
  });
  