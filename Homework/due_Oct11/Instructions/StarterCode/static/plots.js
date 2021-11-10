//Source: In class examples

var sample_data = d3.json("../data/samples.json");

//Source: In class examples/Day 3
//Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
//Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//Source: https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/
function getData() {
  d3.json("../data/samples.json").then(function(data) { 
    const names = data.names;
    const dataSelect = document.getElementById("selDataset");
    names.forEach(name => {
      const option = document.createElement("option");
      option.value=name;
      option.text=name;
      dataSelect.appendChild(option);
    });
  showdata();
  }); 
}

//Source: https://plotly.com/javascript/gauge-charts/ - Example 3
//Source: https://davidmathlogic.com/colorblind/#%23332288-%23117733-%2344AA99-%2388CCEE-%23DDCC77-%23CC6677-%23AA4499-%23882255 - Accessible palettes
function buildGauge(){
  const selectedId = Number(document.getElementById("selDataset").value);
  d3.json("../data/samples.json").then(function(data) {
    const metadata = data.metadata;
    const result = metadata.filter(sampleObj => sampleObj.id === selectedId)[0];
    const wfreq = result.wfreq;
    const gaugeData = {
      domain: {x: [0, 1], y: [0, 1]},
      value: wfreq,
      title: {text: "Belly Button Washing Frequency<br><sup>Scrubs per Week</sup>"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
      axis: {range: [null, 9], tickwigth: 1, tickcolor: "black"},
      bar: {color: "black"},
      bgcolor: "white",
      borderwidth: 2, 
      bordercolor: "black",
      steps: [
        { range: [0,1], color: "#332288"},
        { range: [1,2], color: "#117733"},
        { range: [2,3], color: "#44AA99"},
        { range: [3,4], color: "#88CCEE"},
        { range: [4,5], color: "#FEFE62"},
        { range: [5,6], color: "#DDCC77"},
        { range: [6,7], color: "#CC6677"},
        { range: [7,8], color: "#AA4499"},
        { range: [8,9], color: "#882255"}
        ],
      threshold: {
      line: {color: "black", width: 5},
      thickness: 0.95,
      value: wfreq
      }
    }
  }

  const layoutGauge = {
    width: 500,
    height: 400,
    margin: {t:0, b:0}
  }

  const data_gauge = [gaugeData];

  Plotly.newPlot("gauge", data_gauge, layoutGauge);
});
}

///Source: In class examples: Day 3
///Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 
//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
function buildChart(){
  const selectedId = document.getElementById("selDataset").value;
  d3.json("../data/samples.json").then(function(data) {
    const samples = data.samples;
    const result = samples.filter(sampleObj => sampleObj.id === selectedId)[0];
    const ids = result.otu_ids;
    const labels = result.otu_labels;
    const values = result.sample_values;
    const wfreq = result.wfreq;

    const barData = [
      {
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h",
        marker: {
        color: "rgb(0,158,115)"
        }
      }
    ];
    
    const barLayout = {
      title: "Top 10 - Belly Button Bacteria",
    };
    
    Plotly.newPlot("bar", barData, barLayout);

    // Bubble chart
    //Source: https://plotly.com/javascript/bubble-charts/

    const bubbleLayout = {
      margin: {t: 0},
      xaxis: {title: "OTU ID"},
      hovermode: "closest",
    };

    const dataBubble = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
        }
      }
    ];
    Plotly.newPlot("bubble", dataBubble, bubbleLayout);
  });
}

//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
//Source: https://careerkarma.com/blog/js-dropdown-value/
function buildData(){
  const selectedId = Number(document.getElementById("selDataset").value);
  d3.json("../data/samples.json").then(function(data) {  
    const metadata = data.metadata;
    const result = metadata.filter(sampleObj => sampleObj.id === selectedId)[0];
    const info = d3.select("#sample-metadata");
   info.html("");
    Object.entries(result).forEach(([key, value]) => {
      info.append("h5").text(`${key}: ${value}`);
    });
  });
}

function showdata(){
  buildData();
  buildChart();
  buildGauge();
}
///Source: https://plotly.com/javascript/bar-charts/
///Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
///Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
function buildPlot() {
  d3.json("../data/samples.json").then(function(data) {  
    var name = data.metadata.id;
    var ids = data.samples.map(sample => sample.otu_ids);
    var labels = data.samples.map(sample => sample.otu_labels);
    var values = data.samples.map(sample => sample.samples_values);

    // var barData = [
    //     {
    //       y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
    //       x:values.slice(0,10).reverse(),
    //       text:labels.slice(0,10).reverse(),
    //       type:"bar",
    //       orientation:"h",
    //       marker: {
    //         color: "rgb(0,158,115)"
    //       }
    //     }
    //   ];

    //   var barLayout = {
    //     title: "Top 10 Bacteria Cultures Found",
    //   };
    
    //   Plotly.newPlot("bar", barData, barLayout);
  
    })
}
getData();




