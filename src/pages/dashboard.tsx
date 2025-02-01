import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from 'next/link';
import { fetchGitHubUserData } from '@/utils/github';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);


const Dashboard: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processLanguages = (projects: any[], skills: string[]) => {
        const langs: { [key: string]: number } = {};
        skills.forEach(skill => {
            langs[skill] = projects.filter(p =>
                p.description?.toLowerCase().includes(skill.toLowerCase())
            ).length || 1;
        });
        return langs;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processRepoTypes = (projects: any[]) => {
        return {
            personal: projects.filter(p => !p.type.includes('Forked')).length,
            forked: projects.filter(p => p.type.includes('Forked')).length,
            contributed: projects.filter(p => p.type.includes('Contributed')).length
        };
    };

    const fetchStats = async () => {
        if (!username) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchGitHubUserData(username);
            const processedStats = {
                languages: processLanguages(data.projects, data.skills),
                repoTypes: processRepoTypes(data.projects),
                totalRepos: data.projects.length,
                followers: parseInt(data.achievements[1].split(': ')[1]),
                created: data.achievements[0].split('on ')[1]
            };
            setStats(processedStats);
        } catch (err) {
            setError('Failed to fetch GitHub statistics');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getChartData = () => {
        if (!stats) return null;

        const languageData = {
            labels: Object.keys(stats.languages),
            datasets: [{
                data: Object.values(stats.languages),
                backgroundColor: [
                    '#f7df1e', '#3178c6', '#3776ab', '#b07219', '#e34c26',
                    '#563d7c', '#2b7489', '#f1e05a', '#41b883', '#gray'
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
            }],
        };

        const repoTypeData = {
            labels: ['Personal', 'Forked', 'Contributed'],
            datasets: [{
                data: [
                    stats.repoTypes.personal,
                    stats.repoTypes.forked,
                    stats.repoTypes.contributed
                ],
                backgroundColor: ['#2ecc71', '#3498db', '#9b59b6'],
                borderColor: '#ffffff',
                borderWidth: 2,
            }],
        };

        return { languageData, repoTypeData };
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    font: { size: 14, family: "'Inter', sans-serif" },
                    padding: 20,
                    color: '#e5e7eb',
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 px-4 py-8">
                    <h1 className="text-4xl font-bold text-white">
                        GitHub Activity Dashboard
                    </h1>
                    <Link href="/">
                        <Button variant="outline" className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                            Back to Resume
                        </Button>
                    </Link>
                </div>

                <Card className="mb-8 mx-4 bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Search GitHub User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter GitHub username"
                                className="flex-1 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                            />
                            <Button
                                onClick={fetchStats}
                                disabled={loading || !username}
                                className="bg-gray-700 text-white hover:bg-gray-600"
                            >
                                {loading ? 'Loading...' : 'Fetch Stats'}
                            </Button>
                        </div>
                        {error && (
                            <Alert variant="destructive" className="mt-4 bg-red-900/50 border-red-800">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Skills Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-square">
                                    <Pie data={getChartData()?.languageData} options={chartOptions} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Repository Types</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-square">
                                    <Pie data={getChartData()?.repoTypeData} options={chartOptions} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Quick Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-400">
                                                {stats.totalRepos}
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Total Repositories
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-400">
                                                {stats.followers}
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Followers
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-400">
                                                {Object.keys(stats.languages).length}
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Skills
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
