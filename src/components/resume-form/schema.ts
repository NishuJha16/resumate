import * as yup from "yup";

export const resumeSchema = yup.object().shape({
  personal: yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
      .required("Phone is required"),
    linkedIn: yup.string().url("Invalid LinkedIn URL"),
    github: yup.string().url("Invalid GitHub URL"),
    otherUrl: yup.string().url("Invalid URL"),
    place: yup.string(),
  }),

  education: yup.array().of(
    yup.object().shape({
      institution: yup.string().required("institution is required"),
      degree: yup.string().required("Degree is required"),
      startDate: yup.string().required("Start date is required"),
      endDate: yup.string().required("End date is required"),
      branch: yup.string().required("Branch is required"),
      cgpa: yup.string(),
    })
  ),

  experience: yup.array().of(
    yup.object().shape({
      company: yup.string().required("Company is required"),
      role: yup.string().required("Role is required"),
      location: yup.string().required("Location is required"),
      startDate: yup.string().required("Start date is required"),
      endDate: yup.string().required("End date is required"),
      description: yup.string().required("Description is required"),
      techUsed: yup.string().required("Technologies used is required"),
    })
  ),

  skills: yup
    .string()
    .required("Please enter at least one skill")
    .test("comma-separated", "Enter skills separated by commas", (val) =>
      val ? val.includes(",") : false
    ),

  projects: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Project name is required"),
      startDate: yup.string().required("Start date is required"),
      endDate: yup.string().required("End date is required"),
      description: yup.string().required("Description is required"),
      link: yup.string().url("Invalid URL"),
    })
  ),
  certifications: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Certificate is required"),
      issuer: yup.string().required("Isuuer is required"),
      date: yup.string().required("End date is required"),
    })
  ),

  summary: yup
    .string()
    .min(30, "Summary should be at least 30 characters")
    .max(500, "Summary should be under 500 characters")
    .required("Professional summary is required"),
});
