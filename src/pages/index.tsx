import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Github, Download, PenLine, BarChart2 } from 'lucide-react';
import ResumePreview from "@/components/ResumePreview";
import { fetchGitHubUserData } from "@/utils/github";
import MakePdf from "@/components/MakePdf";
import ProjectManager from '@/components/ProjectManager';
import Link from 'next/link';

const Home: React.FC = () => {
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isEditingProjects, setIsEditingProjects] = useState(false);
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const handleGenerateResume = async () => {
    setLoading(true);
    setError(null);
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

  const handleUpdateProjects = (updatedProjects: any[]) => {
    setResumeData({
      ...resumeData,
      projects: updatedProjects
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Card className="mb-8 bg-black/60 border-gray-800">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-center text-white">
              GitHub Resume Generator
            </CardTitle>
            <CardDescription className="text-center text-lg text-gray-300">
              Create a professional resume from your GitHub profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Enter GitHub Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button
                onClick={handleGenerateResume}
                disabled={loading || !username}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? 'Generating...' : 'Generate Resume'}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4 max-w-2xl mx-auto bg-red-900/50 border-red-800">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {resumeData && (
          <div className="space-y-6">
            <div ref={resumeRef} className="bg-white rounded-lg shadow-xl p-8">
              <ResumePreview {...resumeData} />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setIsEditingProjects(true)}
                variant="outline"
                className="flex items-center bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Edit Projects
              </Button>

              <MakePdf resumeRef={resumeRef}>
                {(onDownload) => (
                  <Button
                    onClick={onDownload}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </MakePdf>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="flex items-center bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Statistics
                </Button>
              </Link>
            </div>

            <ProjectManager
              projects={resumeData.projects}
              onUpdate={handleUpdateProjects}
              isOpen={isEditingProjects}
              onClose={() => setIsEditingProjects(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
