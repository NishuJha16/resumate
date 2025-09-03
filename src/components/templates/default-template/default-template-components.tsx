import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { HtmlToPdfRenderer } from "../../resume-preview/htmltoPdfRenderer";
import { formatDate } from "../../../utils/date-methods";

const styles = StyleSheet.create({
  section: {
    marginBottom: 1,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
    textAlign: "left",
  },
  subheading: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 9,
    marginBottom: 1,
    textAlign: "left",
  },
  text: {
    fontSize: 9,
    textAlign: "left",
  },
  italic: {
    fontSize: 9,
    fontStyle: "italic",
    textAlign: "left",
  },
  skillItem: {
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: "#e0ecf2",
    marginRight: 4,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  notBold: {
    fontWeight: "normal",
  },
  link: {
    fontSize: 9,
    textAlign: "left",
    color: "#37546D",
  },
  headerLink: {
    fontSize: 9,
    color: "#37546D",
  },
});

export const PersonalInfoPreview = ({ personal }: { personal: any }) => (
  <View style={styles.section}>
    <Text style={{ fontSize: 14, textAlign: "center", fontWeight: "bold" }}>
      {personal?.fullName || "Your Name"}
    </Text>
    <Text style={{ fontSize: 9, textAlign: "center", marginVertical: 4 }}>
      {personal?.email && `${personal?.email} | `}
      {personal?.phone && `${personal?.phone} | `}
      {personal?.place}
    </Text>
    <Text style={{ fontSize: 9, textAlign: "center" }}>
      {personal?.github && (
        <Link style={styles.headerLink} src={personal.github}>
          {personal.github}
        </Link>
      )}
      {personal?.linkedIn && " | "}
      {personal?.linkedIn && (
        <Link style={styles.headerLink} src={personal.linkedIn}>
          {personal.linkedIn}
        </Link>
      )}
      {personal?.otherUrl && " | "}
      {personal?.otherUrl && (
        <Link style={styles.headerLink} src={personal.otherUrl}>
          {personal.otherUrl}
        </Link>
      )}
    </Text>
  </View>
);

export const SkillsPreview = ({ skills }: any) => {
  const skillList = skills
    ?.split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  if (!skillList.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Skills</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {skillList.map((skill: string, i: number) => (
          <Text key={i} style={styles.skillItem}>
            {skill}
          </Text>
        ))}
      </View>
    </View>
  );
};

export const SummaryPreview = ({ summary }: any) => {
  return (
    summary && (
      <View style={styles.section}>
        <Text style={styles.heading}>Professional Summary</Text>
        <Text style={styles.paragraph}>{summary}</Text>
      </View>
    )
  );
};

export const EducationPreview = ({ education }: { education: any[] }) => {
  if (
    !education.length ||
    !Object.values(education[0]).some((value: any) => value?.trim() !== "")
  )
    return null;
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Education</Text>
      {education.map((edu, i) => (
        <View key={i}>
          <View style={styles.row}>
            <Text style={styles.subheading}>
              {edu.degree}, <Text>{edu.branch}</Text>
            </Text>
            <Text style={styles.italic}>
              {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>{edu.institution}</Text>
            <Text style={styles.paragraph}>CGPA/Percentage: {edu.cgpa}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export const ExperiencePreview = ({ experience }: { experience: any[] }) => {
  if (
    !experience.length ||
    !Object.values(experience[0]).some(
      (v: any) => (typeof v === "string" ? v?.trim() : "") !== ""
    )
  )
    return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Experience</Text>
      {experience.map((exp, i) => (
        <View key={i}>
          <View style={styles.row}>
            <View>
              <Text style={styles.subheading}>
                {exp.role}, <Text style={styles.notBold}>{exp.company}</Text>
              </Text>
              {exp?.location && <Text style={styles.text}>{exp.location}</Text>}
            </View>
            <Text style={styles.italic}>
              {formatDate(exp.startDate)} –
              {exp.isPresent ? "Present" : formatDate(exp.endDate)}
            </Text>
          </View>
          {exp.description && <HtmlToPdfRenderer html={exp.description} />}
          {exp.techStack && (
            <Text style={styles.italic}>Tech Used: {exp.techStack}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

export const ProjectsPreview = ({ projects }: { projects: any[] }) => {
  if (
    !projects.length ||
    !Object.values(projects[0]).some((value: any) => value?.trim() !== "")
  )
    return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Projects</Text>
      {projects.map((proj, i) => (
        <View key={i}>
          <Text style={styles.subheading}>{proj.title}</Text>
          {proj.link && (
            <Link src={proj.link} style={styles.link}>
              {proj.link}
            </Link>
          )}
          <View style={styles.row}>
            {proj.description && <HtmlToPdfRenderer html={proj.description} />}
          </View>
        </View>
      ))}
    </View>
  );
};

export const CertificationsPreview = ({
  certifications,
}: {
  certifications: any[];
}) => {
  if (
    !certifications.length ||
    !Object.values(certifications[0]).some((value: any) => value?.trim() !== "")
  )
    return null;
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Certifications</Text>
      {certifications.map((cert, i) => (
        <View key={i}>
          <Text style={styles.subheading}>{cert.name}</Text>
          {(cert.issuer || cert.date) && (
            <Text style={styles.italic}>
              {cert.issuer} — {formatDate(cert.date)}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};
