import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";

interface MakePdfProps {
    resumeRef: React.RefObject<HTMLDivElement>;
    children?: (onDownload: () => void) => React.ReactNode;
}

const MakePdf: React.FC<MakePdfProps> = ({ resumeRef, children }) => {
    const handleDownload = async () => {
        const resumeContent = resumeRef.current?.querySelector('.resume-content');
        if (!resumeContent) return;

        try {
            const DPI = 300;
            const A4_WIDTH_MM = 210;
            const A4_HEIGHT_MM = 297;
            const MARGIN_MM = 10;
            const A4_WIDTH_PX = Math.floor((A4_WIDTH_MM * DPI) / 25.4);
            const MARGIN_PX = Math.floor((MARGIN_MM * DPI) / 25.4);
            const CONTENT_WIDTH_PX = A4_WIDTH_PX - (2 * MARGIN_PX);

            const contentWidth = resumeContent.clientWidth;
            const scale = (CONTENT_WIDTH_PX / contentWidth) * (window.devicePixelRatio || 1);

            const canvas = await html2canvas(resumeContent as HTMLElement, {
                scale,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                removeContainer: true,
                onclone: (document) => {
                    // Improve font rendering
                    const style = document.createElement('style');
                    style.innerHTML = `
                        * {
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                            text-rendering: optimizeLegibility;
                            font-smooth: always;
                        }
                    `;
                    document.head.appendChild(style);
                }
            });

            const pdf = new jsPDF({
                format: 'a4',
                unit: 'mm',
                orientation: 'portrait',
                compress: true
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const imgWidth = A4_WIDTH_MM - (2 * MARGIN_MM);
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let y = MARGIN_MM;
            pdf.addImage(imgData, 'JPEG', MARGIN_MM, y, imgWidth, imgHeight);

            const contentHeightMM = A4_HEIGHT_MM - (2 * MARGIN_MM);
            while (y + imgHeight > A4_HEIGHT_MM - MARGIN_MM) {
                y -= contentHeightMM;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', MARGIN_MM, y, imgWidth, imgHeight);
            }

            pdf.save('github-resume.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    if (children) {
        return <>{children(handleDownload)}</>;
    }

    return (
        <Button onClick={handleDownload} className="bg-red-600 hover:bg-red-700 text-white">
            Download PDF
        </Button>
    );
};

export default MakePdf;
