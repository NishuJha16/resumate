import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Delete, DownloadForOffline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import { deleteResume, getResumes } from "../../supabase/methods";
import LoadingIcon from "../../assets/loader.svg";
import DefaultTemplate from "../../components/templates/default-template/default-template";
import ModernTemplate from "../../components/templates/modern-template/modern-template";
import ElegantTemplate from "../../components/templates/elegant-template/elegant-template";
import CompactTemplate from "../../components/templates/compact-template/compact-template";

const SavedResumes = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
    id: string;
    steps: number[];
    resumeTemplate: string;
  } | null>(null);

  const [savedResumes, setSavedResumes] = useState<
    {
      name: string;
      formData: any;
      id: number;
      steps: number[];
      resumeTemplate: string;
    }[]
  >([]);

  const handleDeletion = (data: any) => {
    setSelectedResume(data);
  };

  const onDelete = async () => {
    if (!selectedResume?.id) return;
    setLoading(true);
    try {
      await deleteResume(selectedResume.id);
      getAllSavedResumes();
    } catch (error) {
      console.error("Error deleting resume:", error);
    } finally {
      setLoading(false);
      setSelectedResume(null);
    }
  };

  const getTemplate = (resumeTemplate: string, data: any, steps: number[]) => {
    switch (resumeTemplate) {
      case "modern":
        return <ModernTemplate data={data} steps={steps} />;
      case "elegant":
        return <ElegantTemplate data={data} steps={steps} />;
      case "default":
        return <DefaultTemplate data={data} steps={steps} />;
      case "compact":
        return <CompactTemplate data={data} steps={steps} />;
      default:
        return <DefaultTemplate data={data} steps={steps} />;
    }
  };

  const handleClose = () => {
    setSelectedResume(null);
  };

  const handleResumeDownload = async (data: any) => {
    try {
      if (!data?.formData || Object.keys(data?.formData).length === 0) return;

      const blob = await pdf(
        getTemplate(data?.resumeTemplate, data?.formData, data?.steps)
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

  const getAllSavedResumes = async () => {
    setLoading(true);
    try {
      const response = await getResumes();

      const list = response?.map((resume: any) => ({
        name: resume.resume_name,
        formData: resume.data,
        id: resume.id,
        steps: resume.step_config?.steps || [0, 1, 2, 3, 4, 5, 6],
        lastModified: new Date(resume.updated_at),
        resumeTemplate: resume.resume_template,
      }));

      if (response && response.length > 0) {
        setSavedResumes(list);
      }
    } catch (error) {
      console.error("Error fetching saved resumes:", error);
      setSavedResumes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSavedResumes();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2 md:px-8 md:py-6 flex-1">
      <div className="text-xl font-bold">Saved Resumes</div>
      {loading && (
        <Box className="flex items-center justify-center h-full w-full fixed top-0 left-0 bg-[rgba(255,255,255,0.5)] z-50 ">
          <img src={LoadingIcon} width={64} />
        </Box>
      )}
      <DataGrid
        rows={savedResumes}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        loading={loading}
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
