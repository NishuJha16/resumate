import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import {
  SkillsPreview,
  ExperiencePreview,
  ProjectsPreview,
  CertificationsPreview,
  PersonalInfoPreview,
  EducationPreview,
} from "./elegant-template-component";
import { useMemo } from "react";

const sectionComponents = [
  {
    id: "personal",
    label: "Personal Info",
    component: PersonalInfoPreview,
    order: 0,
  },
  { id: "skills", label: "Skills", component: SkillsPreview, order: 2 },
  {
    id: "education",
    label: "Education",
    component: EducationPreview,
    order: 3,
  },
  {
    id: "experience",
    label: "Experience",
    component: ExperiencePreview,
    order: 4,
  },
  { id: "projects", label: "Projects", component: ProjectsPreview, order: 5 },
  {
    id: "certifications",
    label: "Certifications",
    component: CertificationsPreview,
    order: 6,
  },
];

const ElegantTemplate = ({ data, steps }: { data: any; steps?: number[] }) => {
  const sections = useMemo(() => {
    return steps
      ? steps?.map((index, newOrder) => {
          const updatedStep = { ...sectionComponents[index], order: newOrder };
          return updatedStep;
        })
      : sectionComponents;
  }, [steps, sectionComponents]);

  if (!data) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {sections.map(({ id, order, component: SectionComponent }) => (
          <View key={`${id}-${order}`}>
            {SectionComponent && <SectionComponent {...data} />}
          </View>
        ))}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontSize: 10,
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: 16,
  },
  twoColumn: {
    display: "flex",
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 5,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 5,
    paddingRight: 16,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
  },
  subText: {
    fontSize: 9,
    fontStyle: "italic",
  },
  headerLink: {
    fontSize: 9,
    color: "#37546D",
  },
});

export default ElegantTemplate;
