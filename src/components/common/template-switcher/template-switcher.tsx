import React, { useState } from "react";
import {
  Box,
  Popover,
  Typography,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import MODERN_TEMPLATE from "../../../assets/modern.png";
import ELEGANT_TEMPLATE from "../../../assets/elegant.png";
import DEFAULT_TEMPLATE from "../../../assets/default.png";
import COMPACT_TEMPLATE from "../../../assets/compact.png";

const resumeTemplates = [
  { id: "default", name: "Default", preview: DEFAULT_TEMPLATE },
  { id: "elegant", name: "Elegant", preview: ELEGANT_TEMPLATE },
  { id: "modern", name: "Modern", preview: MODERN_TEMPLATE },
  { id: "compact", name: "Compact", preview: COMPACT_TEMPLATE },
];

const TemplateSwitcher = ({
  updateCurrentTemplate,
  currentTemplate,
}: {
  updateCurrentTemplate: (val: string) => void;
  currentTemplate: string;
  data: any;
  steps: number[];
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTemplateChange = (id: string) => {
    updateCurrentTemplate(id);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        title="Change Resume Template"
        color="primary"
        className="!p-1 !text-xs !capitalize !border !rounded-sm"
      >
        <PaletteIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            style: {
              width: 400,
            },
          },
        }}
      >
        <Box p={2} minWidth={200}>
          <Typography variant="subtitle1" mb={1}>
            Choose a template
          </Typography>

          <Grid
            container
            columns={12}
            sx={{ width: "fit-content", margin: "0 auto" }}
            spacing={1}
          >
            {resumeTemplates.map((template) => (
              <Grid size={{ xs: 6 }} key={template.id}>
                <Paper
                  elevation={template.id === currentTemplate ? 6 : 1}
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    border:
                      template.id === currentTemplate
                        ? "2px solid #1976d2"
                        : "1px solid #ccc",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    width: 180,
                  }}
                  onClick={() => handleTemplateChange(template.id)}
                >
                  <Typography variant="body2">{template.name}</Typography>
                  <img
                    src={template.preview}
                    className="w-[150px] h-[150px] border border-b-0 border-gray-300"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </>
  );
};

export default TemplateSwitcher;
