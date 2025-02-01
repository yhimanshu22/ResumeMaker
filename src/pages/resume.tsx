import { useState } from "react";

// Define the expected structure of the API response
interface Repo {
    id: number;
    name: string;
    stargazers_count: number;
}

interface UserData {
    user: {
        name: string;
        login: string;
        bio: string;
        public_repos: number;
    };
    repos: Repo[];
}

export default function Resume() {
    const [username, setUsername] = useState<string>("");
    const [data, setData] = useState<UserData | null>(null);

    const fetchResume = async () => {
        try {
            const res = await fetch(`/api/github?username=${username}`);
            const result: UserData = await res.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">GitHub Resume Generator</h1>
            <input
                type="text"
                className="border p-2 rounded"
                placeholder="Enter GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchResume} className="bg-blue-500 text-white p-2 ml-2">
                Generate Resume
            </button>

            {data?.user && (
                <div className="mt-6 p-4 border rounded">
                    <h2 className="text-xl">{data.user.name} (@{data.user.login})</h2>
                    <p>{data.user.bio}</p>
                    <p>Public Repos: {data.user.public_repos}</p>
                    <h3 className="mt-4">Repositories:</h3>
                    <ul>
                        {data.repos.map((repo) => (
                            <li key={repo.id}>{repo.name} - ⭐ {repo.stargazers_count}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
