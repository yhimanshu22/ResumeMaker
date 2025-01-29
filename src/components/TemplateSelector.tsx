import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
    selectedTemplate: 'modern' | 'classic' | 'minimal';
    onTemplateChange: (template: 'modern' | 'classic' | 'minimal') => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
    selectedTemplate,
    onTemplateChange
}) => {
    const templates = ['modern', 'classic', 'minimal'];

    return (
        <Card className="w-full bg-gray-800/50 border-gray-700 rounded-xl overflow-hidden">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-100">Template Style</CardTitle>
                <CardDescription className="text-gray-400">Choose your resume layout</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    value={selectedTemplate}
                    onValueChange={(value: 'modern' | 'classic' | 'minimal') => onTemplateChange(value)}
                    className="space-y-4"
                >
                    {templates.map((template) => (
                        <div key={template} className="w-full">
                            <RadioGroupItem
                                value={template}
                                id={template}
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor={template}
                                className={cn(
                                    "flex flex-col w-full rounded-xl border-2 border-gray-700 bg-gray-900/50 p-4 hover:bg-gray-800 hover:border-gray-600 cursor-pointer transition-all",
                                    selectedTemplate === template && "border-blue-500 bg-blue-500/10"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={cn(
                                        "text-sm font-medium",
                                        selectedTemplate === template ? "text-blue-400" : "text-gray-300"
                                    )}>
                                        {template.charAt(0).toUpperCase() + template.slice(1)}
                                    </span>
                                    <div className={cn(
                                        "h-4 w-4 rounded-full border-2",
                                        selectedTemplate === template
                                            ? "border-blue-500 bg-blue-500"
                                            : "border-gray-600"
                                    )} />
                                </div>
                                <div className={cn(
                                    "mt-2 h-16 w-full rounded-xl flex items-center justify-center text-xs",
                                    selectedTemplate === template
                                        ? "bg-blue-500/10 text-blue-400"
                                        : "bg-gray-800 text-gray-400"
                                )}>
                                    {template.toUpperCase()} LAYOUT
                                </div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default TemplateSelector; 