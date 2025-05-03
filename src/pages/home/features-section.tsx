import {
  ArrowDownwardOutlined,
  LowPriorityOutlined,
  MobileFriendlyOutlined,
  UpdateOutlined,
} from "@mui/icons-material";

const features = [
  {
    title: "One-Click Resume Download",
    description:
      "Instantly download your resume in PDF or HTML format with professional styling.",
    icon: <ArrowDownwardOutlined fontWeight={400} htmlColor="#ffffff" />,
  },
  {
    title: "ATS-Friendly Templates",
    description:
      "Ensure your resume gets through Applicant Tracking Systems with optimized formatting.",
    icon: <MobileFriendlyOutlined fontWeight={400} htmlColor="#ffffff" />,
  },
  {
    title: "Real-Time Editing",
    description:
      "See your resume update in real time as you edit your information.",
    icon: <UpdateOutlined fontWeight={400} htmlColor="#ffffff" />,
  },
  {
    title: "Customizable Sections",
    description:
      "Drag and drop sections to reorder them and tailor your resume layout to your strengths.",
    icon: <LowPriorityOutlined fontWeight={400} htmlColor="#ffffff" />,
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 z-30 relative">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="text-base font-semibold text-[rgb(245,124,6)]">
            Build better resumes
          </div>
          <div className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Key features of Resumate
          </div>
          <div className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Create a professional, ATS-friendly resume in minutes — no design
            skills needed.
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, idx) => (
              <div key={idx} className="relative pl-16 fade-in">
                <dt className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(245,124,6)]">
                    <div className="h-6 w-6 text-white">{feature.icon}</div>
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
