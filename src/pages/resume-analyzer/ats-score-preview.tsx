import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { CheckCircle, Warning, Bolt, Lightbulb } from "@mui/icons-material";

export default function ATSResultView({ parsedResult }: any) {
  if (!parsedResult) return null;

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "calc(100vh - 200px)",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={parsedResult.score}
              size={200}
              thickness={4.5}
              sx={{ color: parsedResult.score >= 70 ? "green" : "orange" }}
            />
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {parsedResult.score}/100
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ATS Score
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" gutterBottom>
                Strengths
              </Typography>
              <List dense>
                {parsedResult.strengths.map((item: string, idx: number) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" gutterBottom>
                Weaknesses
              </Typography>
              <List dense>
                {parsedResult.weaknesses.map((item: string, idx: number) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <Warning color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" gutterBottom>
                Top 5 Skills
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {parsedResult.topSkills.map((skill: any, idx: number) => (
                  <Chip
                    key={idx}
                    label={skill}
                    color="primary"
                    icon={<Bolt fontSize="small" />}
                  />
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" gutterBottom>
                Suggestions
              </Typography>
              <List dense>
                {parsedResult.suggestions.map((item: any, idx: number) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <Lightbulb color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
