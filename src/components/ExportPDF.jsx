import jsPDF from "jspdf";

function ExportPDF({ chat }) {

  const downloadPDF = () => {

    const doc = new jsPDF();

    let text = chat
      .map(
        (m) =>
          `${m.sender}: ${m.text}`
      )
      .join("\n\n");

    doc.text(text, 10, 10);

    doc.save(
      "chat-history.pdf"
    );
  };

  return (
    <button
      onClick={downloadPDF}
    >
      📄 Export
    </button>
  );
}

export default ExportPDF;