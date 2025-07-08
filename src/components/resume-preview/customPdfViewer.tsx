import { BlobProvider } from "@react-pdf/renderer";
import { useRef, useState } from "react";
import TemplateOne from "./templateOne";

export const CustomPDFViewer = ({ data, steps }: any) => {
  const [zoom, setZoom] = useState(100);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [version, setVersion] = useState(0);
  const refreshPDF = () => {
    setVersion((v) => v + 1);
  };
  return (
    <div>
      <BlobProvider
        document={<TemplateOne data={data} steps={steps} />}
        key={version}
      >
        {({ url, blob, loading }) =>
          loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <iframe
                ref={iframeRef}
                title="PDF Preview"
                src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
                width="100%"
                height="700px"
                style={{
                  border: "1px solid #ccc",
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top left",
                }}
              />

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                {/* Zoom */}
                <button onClick={() => setZoom((z) => Math.max(50, z - 10))}>
                  ➖ Zoom Out
                </button>
                <span>{zoom}%</span>
                <button onClick={() => setZoom((z) => Math.min(200, z + 10))}>
                  ➕ Zoom In
                </button>

                {/* Sync/Refresh */}
                <button onClick={refreshPDF}>🔄 Sync PDF</button>

                {/* Download */}
                {blob && (
                  <a
                    href={URL.createObjectURL(blob)}
                    download="resume.pdf"
                    style={{ textDecoration: "none" }}
                  >
                    <button>⬇️ Download</button>
                  </a>
                )}

                {/* Save (same as download in browser) */}
                {blob && (
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = "saved_resume.pdf";
                      link.click();
                    }}
                  >
                    💾 Save
                  </button>
                )}
              </div>
            </>
          )
        }
      </BlobProvider>
    </div>
  );
};
