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
        if (!resumeRef.current) return;

        try {
            const DPI = 300; // High-quality DPI
            const A4_WIDTH_MM = 210;
            const A4_HEIGHT_MM = 297;
            const MARGIN_MM = 10;
            const A4_WIDTH_PX = Math.floor((A4_WIDTH_MM * DPI) / 25.4);
            const A4_HEIGHT_PX = Math.floor((A4_HEIGHT_MM * DPI) / 25.4);
            const MARGIN_PX = Math.floor((MARGIN_MM * DPI) / 25.4);
            const CONTENT_WIDTH_PX = A4_WIDTH_PX - (2 * MARGIN_PX);

            const contentWidth = resumeRef.current.offsetWidth;
            const scale = (CONTENT_WIDTH_PX / contentWidth) * (window.devicePixelRatio || 1);

            const canvas = await html2canvas(resumeRef.current, {
                scale,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                removeContainer: true
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

            let contentHeightMM = A4_HEIGHT_MM - (2 * MARGIN_MM);
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
