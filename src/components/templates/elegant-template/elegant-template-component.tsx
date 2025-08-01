import { Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";
import { HtmlToPdfRenderer } from "../../resume-preview/htmltoPdfRenderer";
import { formatDate, getPlaceholder } from "../../../utils/date-methods";
import EMAIL_ICON from "../../../assets/email-blue.png";
import GITHUB_ICON from "../../../assets/github-blue.png";
import LINKEDIN_ICON from "../../../assets/linkedin-blue.png";
import MOBILE_ICON from "../../../assets/phone-blue.png";
import PLACE_ICON from "../../../assets/place-blue.png";
import WEBSITE_ICON from "../../../assets/web-blue.png";

const styles = StyleSheet.create({
  section: {
    marginBottom: 4,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    paddingBottom: 4,
    paddingTop: 4,
    textAlign: "center",
    textTransform: "uppercase",
    borderTop: 1,
    borderBottom: 1,
    borderColor: "#000",
    color: "#034a85",
  },
  subheading: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
  },
  subText: {
    fontSize: 9,
    fontStyle: "italic",
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
    color: "gray",
  },
  skillItem: {
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 3,
    backgroundColor: "#034a85",
    marginRight: 4,
    marginBottom: 4,
    color: "#ffffff",
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
  },
  headerLink: {
    fontSize: 9,
  },
});

export const SkillsPreview = ({ skills }: any) => {
  const skillList = skills
    ?.split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  if (!skillList.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Skills</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
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
      <View
        style={{
          paddingBottom: 10,
          flex: 1,
        }}
      >
        <Text style={styles.paragraph}>{summary}</Text>
      </View>
    )
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
            </View>
          </View>
          <View style={styles.row}>
            {exp?.location && <Text style={styles.text}>{exp.location}</Text>}
            <Text style={styles.italic}>
              {formatDate(exp.startDate)} –
              {exp.isPresent ? " Present" : formatDate(exp.endDate)}
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
        <View
          key={i}
          style={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
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
export const PersonalInfoPreview = ({
  personal,
  summary,
}: {
  personal: any;
  summary: any;
}) => (
  <View style={styles.section}>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            paddingBottom: 4,
            color: "#034a85",
          }}
        >
          {personal?.fullName || getPlaceholder("Your Name")}
        </Text>
        <SummaryPreview summary={summary} />
      </View>
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: 16,
          paddingBottom: 10,
          flex: 1,
        }}
      >
        {personal?.email && (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontSize: 9,
                marginRight: 4,
              }}
            >
              {personal?.email}
            </Text>
            <Image src={EMAIL_ICON} style={{ width: 12, height: 12 }} />
          </View>
        )}
        {personal?.phone && (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 4,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 9,
                marginRight: 4,
              }}
            >
              {personal?.phone}
            </Text>
            <Image src={MOBILE_ICON} style={{ width: 12, height: 12 }} />
          </View>
        )}
        {personal?.github && (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 4,
              justifyContent: "flex-end",
            }}
          >
            <Link
              style={{
                fontSize: 9,
                color: "black",
                marginRight: 4,
              }}
              src={personal.github}
            >
              {personal.github}
            </Link>
            <Image src={GITHUB_ICON} style={{ width: 12, height: 12 }} />
          </View>
        )}
        {personal?.place && (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 4,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 9,

                marginRight: 4,
              }}
            >
              {personal.place}
            </Text>
            <Image src={PLACE_ICON} style={{ width: 12, height: 12 }} />
          </View>
        )}
        {personal?.linkedIn && (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 4,
              justifyContent: "flex-end",
            }}
          >
            <Link
              style={{
                fontSize: 9,
                color: "black",
                marginRight: 4,
              }}
              src={personal.linkedIn}
            >
              {personal.linkedIn}
            </Link>
            <Image src={LINKEDIN_ICON} style={{ width: 12, height: 12 }} />
          </View>
        )}
        {personal?.otherUrl && (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 4,
              justifyContent: "flex-end",
            }}
          >
            <Link
              style={{
                fontSize: 9,
                color: "black",
                marginRight: 4,
              }}
              src={personal.otherUrl}
            >
              {personal.otherUrl}
            </Link>
            <Image src={WEBSITE_ICON} style={{ width: 12, height: 12 }} />
          </View>
        )}
      </View>
    </View>
  </View>
);

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
        <View key={i} style={{ marginBottom: 6 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: 600 }}>{edu.degree}</Text>
            <Text style={styles.italic}>
              {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
            </Text>
          </View>
          <Text style={{ fontSize: 9 }}>{edu.branch}</Text>
          <Text style={{ fontSize: 9 }}>{edu.institution}</Text>
          <Text style={styles.text}>CGPA/Percentage: {edu.cgpa}</Text>
        </View>
      ))}
    </View>
  );
};
