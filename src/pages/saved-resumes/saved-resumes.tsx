import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Delete, DownloadForOffline } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { format } from "date-fns";
import ResumePreviewParent from "../../components/resume-preview/ResumePreviewParent";
import TemplateOne from "../../components/resume-preview/templateOne";
import { pdf } from "@react-pdf/renderer";

const SavedResumes = () => {
  const columns: GridColDef<any[number]>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "lastModified",
      headerName: "Last Modified",
      renderCell: (val) => (
        <div>{format(val.row?.lastModified, "dd-MM-yyyy hh:mm a")}</div>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      renderCell: (val) => (
        <div className="flex gap-2 items-center h-full">
          <div className="hidden">
            <ResumePreviewParent
              data={val.row?.formData}
              steps={val.row.steps}
            />
          </div>
          <DownloadForOffline
            fontWeight={400}
            color="primary"
            className="cursor-pointer"
            onClick={() => handleResumeDownload(val.row)}
          />
          <Delete
            color="error"
            className="cursor-pointer"
            onClick={() => handleDeletion(val.row)}
          />
        </div>
      ),
    },
  ];

  const [selectedResume, setSelectedResume] = useState<{
    name: string;
    formData: any;
    id: number;
    steps: number[];
  } | null>(null);

  const [savedResumes, setSavedResumes] = useState<
    { name: string; formData: any; id: number; steps: number[] }[]
  >([]);

  const handleDeletion = (data: any) => {
    setSelectedResume(data);
  };

  const onDelete = () => {
    const newList = savedResumes?.filter(
      (_, index) => index + 1 !== selectedResume?.id
    );
    setSavedResumes(newList);
    localStorage.setItem("SAVED_RESUMES", JSON.stringify(newList));
    setSelectedResume(null);
  };

  const handleClose = () => {
    setSelectedResume(null);
  };

  const handleResumeDownload = async (data: any) => {
    try {
      if (!data?.formData || Object.keys(data?.formData).length === 0) return;

      const blob = await pdf(
        <TemplateOne data={data?.formData} steps={data?.steps} />
      ).toBlob();

      const newUrl = URL.createObjectURL(blob);
      if (newUrl) {
        const link = document.createElement("a");
        link.href = newUrl;
        link.download = data?.name;
        link.click();
        URL.revokeObjectURL(newUrl);
      }
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("SAVED_RESUMES");
    if (savedData) {
      setSavedResumes(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2 md:px-8 md:py-6 flex-1">
      <div className="text-xl font-bold">Saved Resumes</div>
      <DataGrid
        rows={savedResumes?.map((data, index) => ({ ...data, id: index + 1 }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        className="w-full"
        disableColumnFilter
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <Dialog open={!!selectedResume} onClose={handleClose}>
        <DialogTitle>{`Delete ${selectedResume?.name ?? ""}`}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this resume version? This action
          cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SavedResumes;
