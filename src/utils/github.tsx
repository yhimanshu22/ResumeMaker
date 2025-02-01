import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users';

// Define the structure of a single repo
interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    fork: boolean;
}

export const fetchGitHubUserData = async (username: string) => {
    try {
        const userResponse = await axios.get(`${GITHUB_API_URL}/${username}`);

        // Fetch all repositories with pagination
        let allRepos: Repo[] = [];  // Explicitly typed as Repo[]
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const reposResponse = await axios.get(
                `${GITHUB_API_URL}/${username}/repos?per_page=100&page=${page}`
            );
            const repos: Repo[] = reposResponse.data;  // Type the response data as an array of Repo objects
            allRepos = [...allRepos, ...repos];

            // Check if there are more pages
            hasMore = repos.length === 100;
            page++;
        }

        const userData = userResponse.data;

        // Extracting relevant information
        const qualifications = [
            { year: '2022 - Present', degree: 'B.Tech, Civil Engineering', institute: 'Indian Institute of Technology Kanpur', performance: '6.97/10' },
            // Add more qualifications as needed
        ];

        const achievements = [
            `GitHub Profile created on ${new Date(userData.created_at).toLocaleDateString()}`,
            `Followers: ${userData.followers}`,
            `Public Repositories: ${allRepos.length}`,
            // Add more achievements based on user data
        ];

        const projects = allRepos.map(repo => ({
            title: repo.name,
            description: repo.description || 'No description available',
            link: repo.html_url,
            type: repo.fork ? 'Forked Project' : 'Personal Project',
        }));

        const skills = ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Node.js', 'ReactJS', 'Next.js', 'Tailwind CSS'];
        const courses = ['Applied Probability And Statistics', 'Machine Learning Specialization', 'Web Development'];
        const positions = [];
        const socialImpact = [];

        return {
            name: userData.name || userData.login,
            jobTitle: userData.bio || 'No job title available',
            email: userData.email || 'Not provided',
            phone: 'Not provided',
            linkedin: userData.blog || 'Not provided',
            github: userData.html_url,
            qualifications,
            achievements,
            projects,
            skills,
            courses,
            positions,
            socialImpact,
        };
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        throw new Error('Failed to fetch GitHub data');
    }
};
