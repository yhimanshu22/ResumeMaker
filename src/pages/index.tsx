import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import ResumePreview from "@/components/ResumePreview";
import { fetchGitHubUserData } from "@/utils/github";
import MakePdf from "@/components/MakePdf";
import EditPdf from '@/components/EditPdf';
import Link from 'next/link';

const Home: React.FC = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(''); // State for GitHub username
  const resumeRef = useRef<HTMLDivElement | null>(null); // Ref for the resume preview

  const handleGenerateResume = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const data = await fetchGitHubUserData(username);
      setResumeData(data);
    } catch (error) {
      setError('Failed to load resume data. Please check the username and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = (updatedData: any) => {
    setResumeData(updatedData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-600">Resume Generator Using GitHub</h1>

        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-4 p-2 border border-gray-300 rounded"
        />

        <Button
          onClick={handleGenerateResume}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition mt-4"
          disabled={loading || !username} // Disable button if loading or username is empty
        >
          {loading ? 'Generating...' : 'Generate Resume'}
        </Button>

        <Link href="/dashboard">
          <Button className="mt-4 bg-purple-500 text-white">
            View Statistics
          </Button>
        </Link>

        {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error message */}
        {resumeData && (
          <div ref={resumeRef}>
            <ResumePreview {...resumeData} />
            <div className="flex justify-center space-x-4">
              <MakePdf resumeRef={resumeRef} />
              <EditPdf resumeData={resumeData} onSave={handleSaveEdit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
