import React from 'react';

interface ResumeData {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    qualifications: Array<{
        year: string;
        degree: string;
        institute: string;
        performance: string;
    }>;
    achievements: string[];
    projects: Array<{
        title: string;
        description: string;
        link: string;
        type: string;
    }>;
    skills: string[];
    courses: string[];
}

interface ResumeTemplateProps {
    data: ResumeData;
    selectedTemplate: 'modern' | 'classic' | 'minimal';
}

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
    <div className="resume-content p-8 max-w-4xl mx-auto bg-gray-50 rounded-xl">
        <div className="border-l-4 border-blue-500 pl-4 mb-6 rounded-sm">
            <h1 className="text-4xl font-bold text-gray-800">{data.name}</h1>
            <p className="text-xl text-gray-600">{data.jobTitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
                <span className="mr-2">📧</span> {data.email}
            </div>
            <div className="flex items-center text-gray-600">
                <span className="mr-2">📱</span> {data.phone}
            </div>
            <div className="flex items-center text-gray-600">
                <span className="mr-2">💼</span> {data.linkedin}
            </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Projects</h2>
                    <div className="space-y-4">
                        {data.projects.map((project, index) => (
                            <div key={index} className="border-l-2 border-blue-200 pl-4">
                                <h3 className="font-semibold text-gray-800">{project.title}</h3>
                                <p className="text-gray-600 text-sm">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Achievements</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {data.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                        ))}
                    </ul>
                </section>
            </div>

            <div>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Education</h2>
                    {data.qualifications.map((qual, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-semibold text-gray-800">{qual.degree}</p>
                            <p className="text-gray-600 text-sm">{qual.institute}</p>
                            <p className="text-gray-500 text-sm">{qual.year}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    </div>
);

const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
    <div className="resume-content p-8 max-w-4xl mx-auto bg-gray-50 rounded-xl">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-xl text-gray-700 mb-4">{data.jobTitle}</p>
            <div className="flex justify-center space-x-4 text-gray-600">
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.phone}</span>
                <span>•</span>
                <span>{data.linkedin}</span>
            </div>
        </header>

        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg">
                        {skill}
                    </span>
                ))}
            </div>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 mb-4">Experience</h2>
            <div className="space-y-6">
                {data.projects.map((project, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                        <p className="text-gray-600 mb-2">{project.type}</p>
                        <p className="text-gray-700">{project.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
            <section>
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 mb-4">Education</h2>
                {data.qualifications.map((qual, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-semibold text-gray-800">{qual.degree}</h3>
                        <p className="text-gray-700">{qual.institute}</p>
                        <p className="text-gray-600">{qual.year}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 mb-4">Achievements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {data.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </section>
        </div>
    </div>
);

const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
    <div className="resume-content p-8 max-w-4xl mx-auto bg-gray-50 rounded-xl">
        <header className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">{data.name}</h1>
            <p className="text-gray-600">{data.jobTitle}</p>
            <div className="text-sm text-gray-500 mt-2 space-y-1">
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.linkedin}</p>
            </div>
        </header>

        <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">SKILLS</h2>
            <p className="text-gray-700">{data.skills.join(' • ')}</p>
        </section>

        <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">EXPERIENCE</h2>
            <div className="space-y-6">
                {data.projects.map((project, index) => (
                    <div key={index} className="space-y-1">
                        <h3 className="font-medium text-gray-800">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.type}</p>
                        <p className="text-gray-700">{project.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">EDUCATION</h2>
            {data.qualifications.map((qual, index) => (
                <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{qual.degree}</p>
                    <p className="text-sm text-gray-600">{qual.institute}</p>
                    <p className="text-sm text-gray-500">{qual.year}</p>
                </div>
            ))}
        </section>

        <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">ACHIEVEMENTS</h2>
            <ul className="space-y-2 text-gray-700">
                {data.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm">• {achievement}</li>
                ))}
            </ul>
        </section>
    </div>
);

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({
    data,
    selectedTemplate
}) => {
    const templates = {
        modern: <ModernTemplate data={data} />,
        classic: <ClassicTemplate data={data} />,
        minimal: <MinimalTemplate data={data} />
    };

    return templates[selectedTemplate];
};

export default ResumeTemplate; 