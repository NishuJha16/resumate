import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";
import {
  PersonalInfoPreview,
  SummaryPreview,
  SkillsPreview,
  EducationPreview,
  ExperiencePreview,
  ProjectsPreview,
  CertificationsPreview,
} from "./default-template-components";
import { useMemo } from "react";

const sectionComponents = [
  {
    id: "personal",
    label: "Personal Info",
    component: PersonalInfoPreview,
    order: 0,
  },
  {
    id: "summary",
    label: "Professional Summary",
    component: SummaryPreview,
    order: 1,
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

const DefaultTemplate = ({
  steps,
  data,
}: {
  steps?: number[];
  data: any;
  id?: string;
}) => {
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
    <Document style={{ marginBottom: 16 }}>
      <Page size="A4" style={styles.body}>
        {sections.map(({ id, order, component: SectionComponent }) => (
          <View key={`${id}-${order}`} style={styles.header}>
            {SectionComponent && <SectionComponent {...data} />}
          </View>
        ))}
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 12,
    textAlign: "center",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 9,
    marginBottom: 2,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
});

export default DefaultTemplate;
