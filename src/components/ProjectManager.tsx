import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, ExternalLink } from 'lucide-react';
import { generateProjectDescription } from '@/lib/gemini';

interface Project {
    title: string;
    description: string;
    link: string;
    type: string;
}

interface ProjectManagerProps {
    projects: Project[];
    onUpdate: (updatedProjects: Project[]) => void;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ projects, onUpdate, isOpen, onClose }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [projectForm, setProjectForm] = useState<Project>({
        title: '',
        description: '',
        link: '',
        type: ''
    });
    const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const resetForm = () => {
        setIsAdding(false);
        setEditingIndex(null);
        setProjectForm({
            title: '',
            description: '',
            link: '',
            type: ''
        });
    };

    const handleInputChange = (field: keyof Project, value: string) => {
        setProjectForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddProject = () => {
        if (projectForm.title && projectForm.description) {
            onUpdate([...projects, projectForm]);
            resetForm();
        }
    };

    const handleEditClick = (index: number) => {
        setEditingIndex(index);
        setProjectForm({ ...projects[index] });
        setIsAdding(true);
    };

    const handleUpdateProject = () => {
        if (editingIndex !== null && projectForm.title && projectForm.description) {
            const updatedProjects = [...projects];
            updatedProjects[editingIndex] = projectForm;
            onUpdate(updatedProjects);
            resetForm();
        }
    };

    const handleDeleteProject = (index: number) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        onUpdate(updatedProjects);
    };

    const generateDescription = async () => {
        if (!projectForm.title) return;

        setIsGeneratingDescription(true);
        try {
            const description = await generateProjectDescription(
                projectForm.title,
                projectForm.type,
                projectForm.description
            );
            handleInputChange('description', description);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsGeneratingDescription(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Manage Projects</DialogTitle>
                    <DialogDescription>
                        Add, edit, or remove projects from your resume
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {!isAdding && (
                        <Button
                            onClick={() => setIsAdding(true)}
                            variant="outline"
                            className="w-full"
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Project
                        </Button>
                    )}

                    {isAdding && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{editingIndex !== null ? 'Edit Project' : 'Add New Project'}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Project Title*</Label>
                                    <Input
                                        id="title"
                                        value={projectForm.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Enter project title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="description">Description*</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={generateDescription}
                                            disabled={isGeneratingDescription || !projectForm.title}
                                            className="h-8"
                                        >
                                            {isGeneratingDescription ? (
                                                <>
                                                    <span className="animate-spin mr-2">⚡</span>
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="mr-2">✨</span>
                                                    Generate Description
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <Textarea
                                        id="description"
                                        value={projectForm.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Enter project description or generate one"
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="link">Project Link</Label>
                                    <Input
                                        id="link"
                                        type="url"
                                        value={projectForm.link}
                                        onChange={(e) => handleInputChange('link', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Project Type</Label>
                                    <Input
                                        id="type"
                                        value={projectForm.type}
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        placeholder="e.g., Personal, Academic, Open Source"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={editingIndex !== null ? handleUpdateProject : handleAddProject}
                                    disabled={!projectForm.title || !projectForm.description}
                                >
                                    {editingIndex !== null ? 'Update Project' : 'Add Project'}
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{project.title}</CardTitle>
                                            <CardDescription>{project.type}</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleEditClick(index)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDeleteProject(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{project.description}</p>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm text-blue-500 hover:underline mt-2"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-1" />
                                            View Project
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectManager; 