import React from 'react';
import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface MakePdfProps {
    resumeRef: React.RefObject<HTMLDivElement>;
}

const MakePdf: React.FC<MakePdfProps> = ({ resumeRef }) => {
    const downloadPDF = async () => {
        const resumeContent = resumeRef.current;
        if (!resumeContent) return;

        try {
            const canvas = await html2canvas(resumeContent, {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: '#ffffff'
            });

            const contentWidth = 210; // A4 width in mm
            const contentHeight = (canvas.height * contentWidth) / canvas.width;

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Convert canvas to base64 image
            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            // Add image to PDF
            pdf.addImage({
                imageData: imgData,
                format: 'JPEG',
                x: 0,
                y: 0,
                width: contentWidth,
                height: contentHeight
            });

            // If content is longer than one page, add more pages
            const pageHeight = 297; // A4 height
            let remainingHeight = contentHeight;
            let position = 0;

            while (remainingHeight > pageHeight) {
                position -= pageHeight;
                remainingHeight -= pageHeight;
                pdf.addPage();
                pdf.addImage({
                    imageData: imgData,
                    format: 'JPEG',
                    x: 0,
                    y: position,
                    width: contentWidth,
                    height: contentHeight
                });
            }

            pdf.save('github-resume.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <Button onClick={downloadPDF} className="mt-4 bg-blue-500">
            Download PDF
        </Button>
    );
};

export default MakePdf;