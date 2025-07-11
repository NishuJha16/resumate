import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import { useScaleToFit } from "../common/useScaleToFit";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useIsMobile from "../common/useMobile";
import Loader from "../../assets/loader.svg";

export default function ResumePreviewImage({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { outerRef, innerRef, width, calculateWidth } = useScaleToFit();

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        calculateWidth();
      });
    });
  };

  const handlePrev = () =>
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));

  const handleNext = () =>
    setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));

  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        height: isMobile ? "calc(100vh - 180px)" : "calc(100vh - 120px)",
        position: "relative",
        px: 2,
      }}
    >
      <Box
        ref={outerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          loading={
            <Box className="absolute top-0 left-0 right-0 bottom-0 flex flex-col flex-1 h-full justify-center items-center">
              <img width={50} height={50} src={Loader} />
              <Typography
                variant="caption"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                Loading Preview
              </Typography>
            </Box>
          }
        >
          <Box
            key={`page_${pageNumber}`}
            sx={{ my: 4, textAlign: "center" }}
            ref={innerRef}
          >
            <Page
              pageNumber={pageNumber}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            <Typography
              variant="caption"
              sx={{ mt: 1, color: "text.secondary" }}
            >
              Page {pageNumber} of {numPages}
            </Typography>
          </Box>
        </Document>
      </Box>

      <Paper
        sx={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          zIndex: 10,
          transform: "translate(-50%, 0)",
        }}
      >
        <IconButton onClick={handlePrev} disabled={pageNumber <= 1}>
          <ChevronLeft />
        </IconButton>
        {pageNumber} of {numPages}
        <IconButton onClick={handleNext} disabled={pageNumber >= numPages}>
          <ChevronRight />
        </IconButton>
      </Paper>
    </Box>
  );
}
