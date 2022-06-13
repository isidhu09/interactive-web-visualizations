const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// // Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log(data);
// });


function init(){
    // code that runs once (only on page load or refresh)

    // this checks that our initial function runs.
    console.log("The Init() function ran");

    // run functions to generate plots
    createScatter('940')
    createBar('940')
    createSummary('940')

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
        console.log(selectData);
        console.log(output);

        topArr = []
        for (i=0; i<output.sample_values.length; i++){
            topArr.push({
                id: output.otu_ids[i],
                value: output.sample_values[i],
                lable: output.otu_labels[i]
            });
        }
        console.log(topArr);

        let sortArr = topArr.sort((a,b) => b.value-a.value).slice(0,10);
        console.log(sortArr)
        
        // Plot chart - Bubble
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
    console.log(`This function generates scatter plot of ${id} `)
}

function createBar(id){
    // code that makes bar chart at id='bar'

    d3.json(url).then(function(samplesData){
        let selectData = samplesData.samples.filter(function(sample){
            return sample.id == id;
        });
        let output = selectData[0];
        console.log(selectData);
        console.log(output);

        topArr = []
        for (i=0; i<output.sample_values.length; i++){
            topArr.push({
                id: output.otu_ids[i],
                value: output.sample_values[i],
                lable: output.otu_labels[i]
            });
        }
        console.log(topArr);

        let sortArr = topArr.sort((a,b) => b.value-a.value).slice(0,10);
        console.log(sortArr)
        
        // Plot chart - Bar
        let bar = [{
            type: 'bar',
            x: sortArr.map(row=>row.value),
            y: sortArr.map(row=>row.id),
            text: sortArr.map(row=>row.lable),
            orientation: 'h'
        }];

        Plotly.newPlot('bar', bar);
    });
    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)
}

function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    d3.json(url).then(function(data){
        let info = data.metadata;
        console.log(info)
        let selectedID = info.filter(function(selected){
            return selected.id == id
        })
        console.log(selectedID)
        let table = d3.select('#sample-metadata');

        Object.entries(selectedID[0]).forEach(([key,value]) => {
            var row = table.append('tr');
            var cell = table.append('td');
            cell.text(key.toUpperCase() + `: ${value}`)
            var cell = row.append('td');
        });
    });

    let data = [{
            domain: { x: [0,1], y: [0, 1] },
            value:4,
            title: { 
                text: `<span style='font-size:0.9em'>Belly Button Washing Frequency<br>Scrubs per Week</span>`
            },
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

    Plotly.newPlot('gauge', data, layout);

    // checking to see if function is running
    console.log(`This function generates summary info of ${id} `)
}


// function called, runs init instructions
// runs only on load and refresh of browser page
init()
