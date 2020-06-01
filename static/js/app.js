// Step 1: Plotly
d3.select("#selDataset").on("change", selectedDataset);

var data = [];

d3.json("data/samples.json").then((importedData) => {


    // console.log(importedData);
    data = importedData;

    // console.log(data);

    // create dropdowns
    var id = data.samples.map(val => val.id);

    for (i = 0; i < id.length; i++) {
        var opt = document.createElement("option");
        document.getElementById("selDataset").innerHTML += '<option id="' + i + '">' + id[i] + '</option>';
      }  
  });

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
  
    // Trace1 for the Greek Data
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
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)']
      },
      text: filteredData[0].otu_labels,
    };
    
    var bubbleData = [trace2];
    
    Plotly.newPlot('bubble', bubbleData);

  // Create Demographic info table

  var  metaData = data.metadata.filter(val => val.id == selected_id);
  
  metaDataEntries = Object.entries(metaData);

  console.log(metaDataEntries);

  d3.select("tbody")
  .data(metaDataEntries)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d.id}</td>`
  });

// Step2 Advanced Challenge Assignment 

  var gauge = d3.select("#gauge");

  var gaugeData = [
    {
      type: "gauge",
      'scale-r': {
        aperture: 9,     //Specify your scale range.
        values: "0:9:1" //Provide min/max/step scale values.
      },
      series: 
        {
          values: metaData.wfreq,
          csize: "15%",
          size: "75%",
          'background-color': "#CC0066"
        }
    }
  ];

  console.log(gaugeData);

  Plotly.newPlot("gauge",gaugeData);


  };
  