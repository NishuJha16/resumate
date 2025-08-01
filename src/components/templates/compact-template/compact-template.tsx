import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import {
  SummaryPreview,
  SkillsPreview,
  ExperiencePreview,
  ProjectsPreview,
  CertificationsPreview,
  PersonalInfoPreview,
  EducationPreview,
} from "./compact-template-component";
import { useMemo } from "react";

const sectionComponents = [
  { id: "personal", component: PersonalInfoPreview },
  { id: "summary", component: SummaryPreview },
  { id: "skills", component: SkillsPreview },
  { id: "education", component: EducationPreview },
  { id: "experience", component: ExperiencePreview },
  { id: "projects", component: ProjectsPreview },
  { id: "certifications", component: CertificationsPreview },
];

const CompactTemplate = ({ data, steps }: { data: any; steps?: number[] }) => {
  const sections = useMemo(() => {
    return steps
      ? steps?.map((index, newOrder) => {
          const updatedStep = { ...sectionComponents[index], order: newOrder };
          return updatedStep;
        })
      : sectionComponents;
  }, [steps, sectionComponents]);

  if (!data) return null;

  const leftColumnIds = ["skills", "education", "experience"];
  const rightColumnIds = ["projects", "certifications"];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View>
          <PersonalInfoPreview {...data} />
        </View>
        <View style={styles.twoColumn}>
          <View style={styles.leftColumn}>
            {sections
              .filter((s) => leftColumnIds.includes(s.id))
              .map(({ id, component: Component }, idx) => (
                <Component key={id + idx} {...data} />
              ))}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {sections
              .filter((s) => rightColumnIds.includes(s.id))
              .map(({ id, component: Component }, idx) => (
                <Component key={id + idx} {...data} />
              ))}
          </View>
        </View>
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

export default CompactTemplate;
