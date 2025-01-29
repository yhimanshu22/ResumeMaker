export default async function handler(req, res) {
    const { username } = req.query;
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);

    if (!userRes.ok || !repoRes.ok) {
        return res.status(404).json({ error: "User not found" });
    }

    const user = await userRes.json();
    const repos = await repoRes.json();

    res.status(200).json({ user, repos });
}
