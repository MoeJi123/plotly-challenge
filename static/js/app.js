d3.select("#selDataset").on("change", selectedDataset);

var data = [];

var intData = [];

d3.json("data/samples.json").then((importedData) => {


    // console.log(importedData);
    data = importedData;

    intData = data.samples.filter(val => val.id == "940");

    console.log(intData); 

    init();

    // create dropdowns
    var id = data.samples.map(val => val.id);

    for (i = 0; i < id.length; i++) {
        var opt = document.createElement("option");
        document.getElementById("selDataset").innerHTML += '<option id="' + i + '">' + id[i] + '</option>';
      }  
  });

// Create initial charts for display

function init() {

  intData.sort(function(a, b) {
    return parseInt(b[0].sample_values) - parseInt(a[0].sample_values);
  });

  sample_values =  intData[0].sample_values;

  otuID =  intData[0].otu_ids;

  otuLabels =  intData[0].otu_labels;

  // Slice & reverse the first 10 objects for plotting
  sampleData = sample_values.slice(0, 10).reverse();

  otuData = otuID.slice(0,10).reverse();

  labelData = otuLabels.slice(0,10).reverse();

  var trace1 = {
    x: sampleData,
    y: otuData.map(otu => `OTU ${otu}`),
    text:  labelData,
    type: "bar",
    orientation: "h"
  };

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

  // Create the bubble Plot
  Plotly.newPlot("bar", chartData,layout);

  var bubble = d3.select("#bubble");
    
  var trace2 = {
    x: intData[0].otu_ids,
    y: intData[0].sample_values,
    mode: 'markers',
    marker: {
      size: intData[0].sample_values,
      color: intData[0].otu_ids,
      colorscale: 'Earth'
    },
    text: intData[0].otu_labels,
  };
  
  var bubbleData = [trace2];
  
  Plotly.newPlot('bubble', bubbleData);

  // Create the demgraphic table

  var  metaData = data.metadata.filter(val => val.id == "940");
  
  metaDataEntries = Object.entries(metaData[0]);

  console.log(metaDataEntries);

  d3.select("tbody")
  .selectAll("tr")
  .data(metaDataEntries)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d[0]}</td><td>${d[1]}</td>`
  });

  // Create the gauge chart

  var gauge = d3.select("#gauge");

  var gaugeData= [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: metaData[0].wfreq,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: { axis: { range: [null, 10] }}
    }
  ];

  console.log(metaData);


  Plotly.newPlot("gauge",gaugeData);

}

// Step 1: Plotly

  function selectedDataset() {

    
    var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable

    var selected_id = dropdownMenu.property("value");


    var filteredData = data.samples.filter(val => val.id == selected_id);

    console.log(filteredData);


    // Sort the data array using the greekSearchResults value
    filteredData.sort(function(a, b) {
      return parseInt(b[0].sample_values) - parseInt(a[0].sample_values);
    });

    console.log("this is line 42");
    console.log(filteredData);
  
    sample_values = filteredData[0].sample_values;

    otuID = filteredData[0].otu_ids;

    otuLabels = filteredData[0].otu_labels;

    // Slice & reverse the first 10 objects for plotting
    sampleData = sample_values.slice(0, 10).reverse();

    otuData = otuID.slice(0,10).reverse();

    labelData = otuLabels.slice(0,10).reverse();

    console.log(sampleData);
    console.log(otuData);
    console.log(labelData);
  
    var trace1 = {
      x: sampleData,
      y: otuData.map(otu => `OTU ${otu}`),
      text:  labelData,
      type: "bar",
      orientation: "h"
    };
  
    // data
    var chartData = [trace1];

    console.log(chartData);
  
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
    Plotly.newPlot("bar", chartData,layout);

    
    // Creat bubble plot

    var bubble = d3.select("#bubble");
    
    var trace2 = {
      x: filteredData[0].otu_ids,
      y: filteredData[0].sample_values,
      mode: 'markers',
      marker: {
        size: filteredData[0].sample_values,
        color: filteredData[0].otu_ids,
        colorscale: 'Earth'
      },
      text: filteredData[0].otu_labels,
    };
    
    var bubbleData = [trace2];
    
    Plotly.newPlot('bubble', bubbleData);

    // Create Demographic info table

    var  metaData = data.metadata.filter(val => val.id == selected_id);
    
    metaDataEntries = Object.entries(metaData[0]);

    console.log(metaDataEntries);

    d3.select("tbody")
    .selectAll("tr")
    .data(metaDataEntries)
    .enter()
    .append("tr")
    .html(function(d) {
      return `<td>${d[0]}</td><td>${d[1]}</td>`
    });

// Step2 Advanced Challenge Assignment - Create Gauge Chart 

  var gauge = d3.select("#gauge");

  var gaugeData= [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: metaData[0].wfreq,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: { axis: { range: [null, 10] }}
    }
  ];


  console.log(metaData);


  Plotly.newPlot("gauge",gaugeData);

  };


