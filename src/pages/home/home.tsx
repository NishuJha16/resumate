import ResumeImage from "../../assets/resume-screenshot.png";
import Deco from "../../assets/deco.svg";
import Deco2 from "../../assets/deco2.svg";
import ResumeGif from "../../assets/owl.gif";
import { Button, Container } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router";
import FeaturesSection from "./features-section";
import Footer from "./footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-auto flex-1 no-scrollbar">
      <Container className="flex flex-col gap-8 pb-8">
        <Container className="flex flex-col md:flex-row justify-between gap-2 ">
          <img src={Deco} className="absolute left-0 fade-in" />
          <div className="flex flex-col z-20 justify-center gap-6 flex-1">
            <div className="text-[24px] md:text-[40px] font-semibold text-gray-900 dark:text-gray-100">
              Craft the{" "}
              <span className="text-[rgb(245,124,6)]">Perfect Resume</span> –
              Optimized for ATS & Hiring Managers
            </div>
            <div className="text-md text-gray-700 dark:text-gray-300">
              Build a professional, job-ready resume in minutes. Tailored
              sections, live previews, ATS scoring, and more — no design or
              writing skills required.
            </div>
            <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
              Start Building Your Resume – It’s Free and Always Will Be
            </div>
            <Button
              endIcon={<ArrowForward />}
              variant="contained"
              className="w-fit !text-white !capitalize"
              onClick={() => navigate("/resume-builder")}
            >
              Build My Resume
            </Button>
          </div>
          <div className="flex flex-1 justify-center relative items-center">
            <div className="flex p-[80px] relative h-fit">
              <img
                src={Deco2}
                className="absolute top-0 left-[0] transform-[rotate(180deg)]"
              />
              <div className="absolute top-[-50px] right-[-50px]">
                <img src={ResumeGif} className="w-[300px] h-auto" />
              </div>
              <img
                src={ResumeImage}
                width={450}
                height={700}
                className="mx-auto expand-center border-gray-300 dark:border-darkBorder-700 shadow-xl rounded-2xl border-2 dark:shadow-gray-800 relative z-20"
              />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 fade-in-right">
            <img src={Deco} className="transform-[scale(-1,-1)]" />
          </div>
        </Container>
        <FeaturesSection />
      </Container>
      <Footer />
    </div>
  );
};
export default Home;
