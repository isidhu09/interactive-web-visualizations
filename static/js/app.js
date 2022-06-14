// All console log are commented out, they were used during coding for testing

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Code to check if the file loaded
// // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// // Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log(data);
// });

function init(){
    // code that runs once (only on page load or refresh)

    // create dropdown/select
    let selector = d3.select('#selDataset');

    d3.json(url).then(function(data){
        let names = data.names;

        selector.selectAll('option')
            .data(names)
            .enter()
            .append('option')
            .attr('value', d => d)
            .text(d => d);

        // Take in the first name upon loading the page
        let default_ = names[0];
    
    // this checks that our initial function runs.
    // console.log("The Init() function ran");

    // run functions to generate plots
    createScatter(default_)
    createBar(default_)
    createSummary(default_)
    });
}

// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
    // code that updates graphics
    // one way is to recall each function
    createScatter(newID)
    createBar(newID)
    createSummary(newID)
}

function createScatter(id){
    // code that makes scatter plot at id='bubble'
    d3.json(url).then(function(samplesData){
        let selectData = samplesData.samples.filter(function(sample){
            return sample.id == id;
        });
        let output = selectData[0];
        // console.log(selectData);
        // console.log(output);

        //loop to get array for plotting
        topArr = []
        for (i=0; i<output.sample_values.length; i++){
            topArr.push({
                id: output.otu_ids[i],
                value: output.sample_values[i],
                lable: output.otu_labels[i]
            });
        }
       // console.log(topArr);
        
        // plot chart - bubble
        let bubble = [{
            x: output.otu_ids,
            y: output.sample_values,
            text: output.otu_labels,
            mode: 'markers',
            marker: {
                size: output.sample_values,
                color:output.otu_ids,
            }
        }];
        
        let layout = {
            width: window.width
        };
        
        Plotly.newPlot('bubble', bubble, layout);
    });
    // checking to see if function is running
    // console.log(`This function generates scatter plot of ${id} `)
}

function createBar(id){
    // code that makes bar chart at id='bar'
    d3.json(url).then(function(samplesData){
        let selectData = samplesData.samples.filter(function(sample){
            return sample.id == id;
        });
        let output = selectData[0];
        // console.log(selectData);
        // console.log(output);

        // loop to get array for plotting
        topArr = []
        for (i=0; i<output.sample_values.length; i++){
            topArr.push({
                id: output.otu_ids[i],
                value: output.sample_values[i],
                lable: output.otu_labels[i]
            });
        }
        // console.log(topArr);

        // sorting and slicing for top 10
        let sortArr = topArr.sort((a,b) => b.value-a.value).slice(0,10);
        // console.log(sortArr)
        
        // need to reverse the sorte darray for the chart
        let revArr = sortArr.sort((a,b) => a.value-b.value);

        // plot chart - bar
        let bar = [{
            type: 'bar',
            x: revArr.map(row=>row.value),
            y: revArr.map(row=>"OTU"+row.id),
            text: revArr.map(row=>row.lable),
            orientation: 'h'
        }];

        Plotly.newPlot('bar', bar);
    });
    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)
}

function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    d3.json(url).then(function(data2){
        let info = data2.metadata;
        // console.log(info)
        let selectedID = info.filter(function(selected){
            return selected.id == id
        })

        // console.log(selectedID)
        let table = d3.select('#sample-metadata');
        table.html('');

        // getting array of key/value pairs to insert into table
        Object.entries(selectedID[0]).forEach(([key,value]) => {
            let row = table.append('tr');
            let cell = table.append('td');
            cell.text(key + `: ${value}`)
        });

        // creating guage image
        let data3 = [{
            domain: { x: [0,1], y: [0, 1] },
            value: selectedID[0].wfreq,
            title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {
                    range: [null, 9]
                },
                steps: [
                    {range: [0,1], color: '#FF0000'},
                    {range: [1,2], color: '#FF6347'},
                    {range: [2,3], color: '#FF8C00'},
                    {range: [3,4], color: '#DAA520'},
                    {range: [4,5], color: '#FFD700'},
                    {range: [5,6], color: '#FFFF00'},
                    {range: [6,7], color: '#9ACD32'},
                    {range: [7,8], color: '#ADFF2F'},
                    {range: [8,9], color: '#00FF00'}
                ],
            }
        }];
    
        let layout = {
            margin: { t: 0, b: 0 } 
        };

        Plotly.newPlot('gauge', data3, layout);
    });

    // checking to see if function is running
    //console.log(`This function generates summary info of ${id} `)
}

// function called, runs init instructions
// runs only on load and refresh of browser page
init()
