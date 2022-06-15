# interactive-web-visualizations

## Intro/Objective
Built an interactive dashboard to explore a Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Technologies
* JavaScript
* Plotly
* HTML/CSS

## Description
Completed the following steps:
  * Used the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
  
  * Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
    * Used sample_values as the values for the bar chart
    * Used otu_ids as the labels for the bar chart
    * Used otu_labels as the hovertext for the chart
  
  * Created a bubble chart that displays each sample
    * Used otu_ids for the x values
    * Used sample_values for the y values
    * Used sample_values for the marker size
    * Used otu_ids for the marker colors
    * Used otu_labels for the text values
  
  * Created guage chart by adapting code from https://plot.ly/javascript/gauge-charts/ to plot weekly washing frequency of the selected individual
    * Set guage values ranging from 0 through 9 
    * Chart updates when new indvidual is selected
    
  * Displayed the sample metadata, i.e., an individual's demographic information
    * Displayed each key-value pair from the metadata JSON object

  * All the plots update when a new sample is selected
  
App is deploy to GitHub Pages: https://isidhu09.github.io/interactive-web-visualizations/
