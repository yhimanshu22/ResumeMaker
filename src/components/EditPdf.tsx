import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface EditPdfProps {
    resumeData: any;
    onSave: (updatedData: any) => void;
}

const EditPdf: React.FC<EditPdfProps> = ({ resumeData, onSave }) => {
    const [editedData, setEditedData] = useState(resumeData);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (
        section: string,
        value: string | any[],
        index?: number,
        field?: string
    ) => {
        if (index !== undefined && field) {
            // Handle array of objects (like qualifications, projects, positions)
            setEditedData({
                ...editedData,
                [section]: editedData[section].map((item: any, i: number) =>
                    i === index ? { ...item, [field]: value } : item
                ),
            });
        } else {
            // Handle simple fields or arrays
            setEditedData({
                ...editedData,
                [section]: value,
            });
        }
    };

    const handleSave = () => {
        onSave(editedData);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <Button onClick={() => setIsEditing(true)} className="mt-4 bg-yellow-500 text-black">
                Edit Resume
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl text-black">
                <h2 className="text-2xl font-bold mb-4 text-black">Edit Resume</h2>

                {/* Basic Information */}
                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-black">Basic Information</h3>
                    <div className="space-y-3">
                        {['name', 'jobTitle', 'email', 'phone', 'linkedin', 'github'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium mb-1 capitalize text-black">
                                    {field.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <input
                                    type="text"
                                    value={editedData[field]}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    className="w-full p-2 border rounded text-black"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Qualifications */}
                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-black">Qualifications</h3>
                    {editedData.qualifications.map((qual: any, index: number) => (
                        <div key={index} className="mb-4 p-3 border rounded">
                            {['year', 'degree', 'institute', 'performance'].map((field) => (
                                <div key={field} className="mb-2">
                                    <label className="block text-sm font-medium mb-1 capitalize text-black">
                                        {field}
                                    </label>
                                    <input
                                        type="text"
                                        value={qual[field]}
                                        onChange={(e) => handleInputChange('qualifications', e.target.value, index, field)}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-black">Projects</h3>
                    {editedData.projects.map((project: any, index: number) => (
                        <div key={index} className="mb-4 p-3 border rounded">
                            {['title', 'description', 'link', 'type'].map((field) => (
                                <div key={field} className="mb-2">
                                    <label className="block text-sm font-medium mb-1 capitalize text-black">
                                        {field}
                                    </label>
                                    <input
                                        type="text"
                                        value={project[field]}
                                        onChange={(e) => handleInputChange('projects', e.target.value, index, field)}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </section>

                {/* Skills */}
                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-black">Skills</h3>
                    <textarea
                        value={editedData.skills.join(', ')}
                        onChange={(e) => handleInputChange('skills', e.target.value.split(', '))}
                        className="w-full p-2 border rounded text-black"
                        rows={3}
                    />
                </section>

                <div className="flex justify-end space-x-4">
                    <Button onClick={() => setIsEditing(false)} className="bg-gray-500 text-black">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-green-500 text-black">
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditPdf; 