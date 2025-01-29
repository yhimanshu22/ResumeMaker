import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users';

export const fetchGitHubUserData = async (username: string) => {
    try {
        const userResponse = await axios.get(`${GITHUB_API_URL}/${username}`);
        const reposResponse = await axios.get(`${GITHUB_API_URL}/${username}/repos`);

        const userData = userResponse.data;
        const reposData = reposResponse.data;

        // Extracting relevant information
        const qualifications = [
            { year: '2022 - Present', degree: 'B.Tech, Civil Engineering', institute: 'Indian Institute of Technology Kanpur', performance: '6.97/10' },
            // Add more qualifications as needed
        ];

        const achievements = [
            `GitHub Profile created on ${new Date(userData.created_at).toLocaleDateString()}`,
            `Followers: ${userData.followers}`,
            `Public Repositories: ${reposData.length}`,
            // Add more achievements based on user data
        ];

        const projects = reposData.map(repo => ({
            title: repo.name,
            description: repo.description || 'No description available',
            link: repo.html_url,
            type: 'GitHub Project',
        }));

        const skills = ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Node.js', 'ReactJS', 'Next.js', 'Tailwind CSS'];
        const courses = ['Applied Probability And Statistics', 'Machine Learning Specialization', 'Web Development'];
        const positions = []; // Populate this based on your requirements
        const socialImpact = []; // Populate this based on your requirements

        return {
            name: userData.name || userData.login,
            jobTitle: userData.bio || 'No job title available',
            email: userData.email || 'Not provided',
            phone: 'Not provided', // GitHub does not provide phone numbers
            linkedin: userData.blog || 'Not provided', // Assuming blog is used for LinkedIn
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