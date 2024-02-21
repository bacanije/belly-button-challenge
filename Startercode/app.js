const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// init function to populate dropdown, bar chart, and bubble chart with sample dataset
function init(){
    //store drop down menu location
    let dropdown = d3.select("#selDataset");

    d3.json(url).then((data)=> {
        let data_id = data.names;
        data_id.forEach((id)=>{
            //print value of variables for entire loop
            console.log(id);
            dropdown.append("option").text(id).property("value",id);
        });

        //Set initial sample
        let first_sample = data_id[0];
        //print value of first_sample
        console.log(first_sample);
        
        buildMetadata(first_sample);
        buildBarChart(first_sample);
        buildBubbleChart(first_sample);
        buildDemographics(first_sample);
        buildGuageChart(first_sample);
    });
}

function buildMetadata(sample) {
    // Use D3 to retrieve all data
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == sample);
        console.log(value)
        let valueData = value[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valueData).forEach(([key,value]) => {
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

}

function buildBarChart(newsample) {
    d3.json(url).then((data)=> {
        let sample_data = data.samples;
        let value = sample_data.filter(result=> result.id == newsample);
        let valueData = value[0]
        console.log(valueData);

        // store first 10 results to display in bar chart 
        let sample_values = valueData.sample_values.slice(0,10);
        let otu_ids = valueData.otu_ids.slice(0,10);
        let otu_labels = valueData.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);
        
        // Set top ten items to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        //Setup trace for bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation:"h"
        };
        let layout = {
            title: "Top 10 OTUs Present"
        };
        Plotly.newPlot ("bar", [trace], layout);
    });
}

function buildBubbleChart(newsample) {
    d3.json(url).then((data)=> {
        let sample_data = data.samples;
        let value = sample_data.filter(result=> result.id == newsample);
        let valueData = value[0]
        console.log(valueData);

        // store first 10 results to display in bar chart 
        let sample_values = valueData.sample_values.slice(0,10);
        let otu_ids = valueData.otu_ids.slice(0,10);
        let otu_labels = valueData.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);
        
        // Set top ten items to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        //Setup trace for bubbkebar chart
        let second_trace = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            text: otu_labels.reverse(),
            mode: "markers",
            marker:{
                size: sample_values,
                color: otu_ids,
                colorscale: "earth"
            }
        };
        let layout = {
            title: "Bacteria Count Per Sample ID",
            hovermode: "closest",
            xaxis: {title:"OTU ID"},
            yaxis: {titel:"Number of Bacteria"}
        };
        Plotly.newPlot ("bubble", [second_trace], layout);
    });
}

function buildDemographics(newsample) {
    d3.json(url).then((data)=> {
        let demographic_info = data.metadata;
        let value = demographic_info.filter(result=> result.id == newsample);
        let valueData = value[0]
        console.log(valueData);
        d3.select('#sample-metadata').text('');

        Object.entries(valueData).forEach(([key,value]) => {
            console.log(key,value);
            //select the demographic info html section with d3 and append new key-value pair
            d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
        });

    });
}

function optionChanged(value) { 
    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildDemographics(value);
}

// Call the initialize function
init();