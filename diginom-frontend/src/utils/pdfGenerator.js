import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export const downloadIdentityCard = async (elementId) => {

    const node = document.getElementById(elementId);

    if (!node) return;

    const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const img = new Image();

    img.src = dataUrl;

    await new Promise(resolve => {
        img.onload = resolve;
    });

    const pdfWidth = 190;

    const pdfHeight =
        (img.height * pdfWidth) / img.width;

    pdf.addImage(
        dataUrl,
        "PNG",
        10,
        10,
        pdfWidth,
        pdfHeight
    );

    pdf.save("DIGINOM_Identity_Card.pdf");

};