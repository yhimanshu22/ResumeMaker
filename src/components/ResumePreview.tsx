import React, { useState } from 'react';
import ResumeTemplate from './ResumeTemplate';
import TemplateSelector from './TemplateSelector';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResumePreview: React.FC<any> = (data) => {
    const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'minimal'>('modern');

    return (
        <div className="min-h-screen bg-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-lg">
            <div className="flex flex-col md:flex-row gap-8 max-w-[1400px] mx-auto">
                <div className="md:w-64 flex-shrink-0">
                    <div className="sticky top-8">
                        <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            onTemplateChange={setSelectedTemplate}
                        />
                    </div>
                </div>

                <div className="flex-grow bg-gray-800/50 rounded-lg p-6">
                    <ResumeTemplate
                        data={data}
                        selectedTemplate={selectedTemplate}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
