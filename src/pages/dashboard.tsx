import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

interface DashboardProps {
    githubStats?: {
        languages: { [key: string]: number };
        repoTypes: { [key: string]: number };
        contributions: { [key: string]: number };
    };
}

const Dashboard: React.FC<DashboardProps> = ({ githubStats }) => {
    // Sample data (replace with actual GitHub data)
    const languageData = {
        labels: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Other'],
        datasets: [{
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
                '#f7df1e',  // JavaScript yellow
                '#3178c6',  // TypeScript blue
                '#3776ab',  // Python blue
                '#b07219',  // Java brown
                '#gray',    // Other
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
        }],
    };

    const repoTypeData = {
        labels: ['Personal', 'Forked', 'Contributed'],
        datasets: [{
            data: [60, 25, 15],
            backgroundColor: [
                '#2ecc71',  // Green
                '#3498db',  // Blue
                '#9b59b6',  // Purple
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
        }],
    };

    const contributionData = {
        labels: ['Commits', 'PRs', 'Issues', 'Code Review'],
        datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
                '#e74c3c',  // Red
                '#f1c40f',  // Yellow
                '#1abc9c',  // Turquoise
                '#34495e',  // Dark Blue
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
        }],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    font: {
                        size: 14,
                        family: "'Inter', sans-serif",
                    },
                    padding: 20,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                    GitHub Activity Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Languages Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Programming Languages
                        </h2>
                        <div className="aspect-square">
                            <Pie data={languageData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Repository Types Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Repository Types
                        </h2>
                        <div className="aspect-square">
                            <Pie data={repoTypeData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Contributions Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Contribution Breakdown
                        </h2>
                        <div className="aspect-square">
                            <Pie data={contributionData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-3">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Quick Statistics
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">152</p>
                                <p className="text-gray-600">Total Repositories</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">1.2k</p>
                                <p className="text-gray-600">Total Commits</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-2xl font-bold text-purple-600">89</p>
                                <p className="text-gray-600">Pull Requests</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-2xl font-bold text-yellow-600">234</p>
                                <p className="text-gray-600">Issues Created</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
