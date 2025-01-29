import React from 'react';

interface ResumePreviewProps {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    qualifications: Array<{ year: string; degree: string; institute: string; performance: string }>;
    achievements: string[];
    projects: Array<{ title: string; description: string; link: string; type: string }>;
    skills: string[];
    courses: string[];
    positions: Array<{ title: string; organization: string; duration: string; responsibilities: string[] }>;
    socialImpact: string[];
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
    name,
    jobTitle,
    email,
    phone,
    linkedin,
    github,
    qualifications,
    achievements,
    projects,
    skills,
    courses,
    positions,
    socialImpact,
}) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-[210mm] mx-auto font-serif text-black capitalize">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-black mb-2">{name}</h1>
                <h2 className="text-xl font-semibold text-black mb-2">{jobTitle}</h2>
                <p className="text-sm text-black">
                    <a href={`mailto:${email}`} className="hover:underline">{email}</a> |
                    <a href={`tel:${phone}`} className="hover:underline"> {phone}</a>
                </p>
                <p className="text-sm text-black">
                    <a href={linkedin} className="hover:underline">LinkedIn</a> |
                    <a href={github} className="hover:underline"> GitHub</a>
                </p>
            </div>

            <hr className="my-6 border-black" />

            <h3 className="text-2xl font-bold text-black mb-4">Academic Qualifications</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="p-2 text-black font-bold">Year</th>
                        <th className="p-2 text-black font-bold">Degree/Certificate</th>
                        <th className="p-2 text-black font-bold">Institute</th>
                        <th className="p-2 text-black font-bold">Performance</th>
                    </tr>
                </thead>
                <tbody>
                    {qualifications.map((qual, index) => (
                        <tr key={index} className="border-b border-black">
                            <td className="p-2">{qual.year}</td>
                            <td className="p-2">{qual.degree}</td>
                            <td className="p-2">{qual.institute}</td>
                            <td className="p-2">{qual.performance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="text-2xl font-bold text-black mt-6 mb-4">Academic Achievements</h3>
            <ul className="list-disc pl-5">
                {achievements.map((ach, index) => (
                    <li key={index} className="mb-2 normal-case">{ach}</li>
                ))}
            </ul>

            <h3 className="text-2xl font-bold text-black mt-6 mb-4">Key Projects</h3>
            {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold">
                        <a href={project.link} className="text-black hover:underline">{project.title}</a> |
                        <span className="italic"> {project.type}</span>
                    </h4>
                    <p className="normal-case">{project.description}</p>
                </div>
            ))}

            <h3 className="text-2xl font-bold text-black mt-6 mb-4">Technical Skills</h3>
            <p className="normal-case">{skills.join(', ')}</p>

            <h3 className="text-2xl font-bold text-black mt-6 mb-4">Relevant Courses</h3>
            <ul className="list-disc pl-5">
                {courses.map((course, index) => (
                    <li key={index} className="mb-2 normal-case">{course}</li>
                ))}
            </ul>

            <h3 className="text-2xl font-bold text-black mt-6 mb-4">Positions of Responsibility</h3>
            {positions.map((pos, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold">{pos.title} | <span className="italic">{pos.organization}</span> ({pos.duration})</h4>
                    <ul className="list-disc pl-5">
                        {pos.responsibilities.map((resp, idx) => (
                            <li key={idx} className="mb-2 normal-case">{resp}</li>
                        ))}
                    </ul>
                </div>
            ))}

            <h3 className="text-2xl font-bold text-black mt-6 mb-4">Social Impact</h3>
            <ul className="list-disc pl-5">
                {socialImpact.map((impact, index) => (
                    <li key={index} className="mb-2 normal-case">{impact}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResumePreview;
