import { PDFViewer } from "@react-pdf/renderer";
import TemplateOne from "./templateOne";

const ResumePreview = ({
  data,
  steps,
}: {
  data: any;
  steps?: number[];
  id?: string;
}) => {
  if (!data || !data.personal?.fullName) return null;

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          height: "100%",
          paddingBottom: "2px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <PDFViewer width="100%" height="100%">
          <TemplateOne data={data} steps={steps} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ResumePreview;
