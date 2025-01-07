import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie chart from react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'; // Import necessary chart.js components
import Header2 from './Header2';

// Register chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Analytics() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50', '#e91e63'],
      hoverOffset: 4,
    }],
  });

  useEffect(() => {
    // Fetch news data from API
    const fetchNewsData = async () => {
      const res = await fetch('https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&sources=bbc-news,cnn,ABP-News&apiKey=5387d27d86764991a64e7fe3db6931a6');
      const data = await res.json();

      if (!data.articles || data.articles.length === 0) {
        console.log('No articles found');
        return;
      }

      // Process the data by source
      const sourceCount = data.articles.reduce((acc, article) => {
        const sourceName = article.source.name;  // Correctly access the source name
        acc[sourceName] = acc[sourceName] ? acc[sourceName] + 1 : 1;
        return acc;
      }, {});

      // Prepare chart data
      const sources = Object.keys(sourceCount);
      const counts = Object.values(sourceCount);

      setChartData({
        labels: sources,
        datasets: [{
          data: counts,
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50', '#e91e63'],
          hoverOffset: 4,
        }],
      });
    };

    fetchNewsData();
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <div className="bg-slate-900 w-screen h-screen text-white overflow-auto">
        <Header2></Header2>
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-4xl font-semibold">News-Analytics</h1>
        <div class="text-white">
          <Pie data={chartData} /> {/* Display Pie Chart */}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
