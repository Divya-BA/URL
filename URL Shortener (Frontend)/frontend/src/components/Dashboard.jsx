import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
  const [statsData, setStatsData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const BASE_URL = 'http://localhost:3000'; // Adjust the base URL
    const ctx = document.getElementById('urlChart').getContext('2d');

    axios
      .get(`${BASE_URL}/api/data`)
      .then((response) => {
  
        setStatsData(response.data);
        console.log('statsData',statsData);
        // Update chart data with the fetched stats
        if (chartRef.current) {
          chartRef.current.destroy();
        }
         
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Created Today', 'Created This Month'],
            datasets: [
              {
                data: [statsData.urlsCreatedToday, statsData.urlsCreatedThisMonth],
                backgroundColor: ['#ffa550', '#ff4500'],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'URLs Created Statistics',
                fontSize: 16,
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <div>
      <canvas id="urlChart" width="600" height="600"></canvas>
    </div>
  );
};

export default Dashboard;
