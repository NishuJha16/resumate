import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="flex justify-between items-center p-8 border-t-2 border-gray-500 z-30">
      <div className="text-md">© 2025 Resumate, Inc. All rights reserved.</div>
      <div className="flex gap-2 items-center z-30 ">
        <a href="https://www.facebook.com" target="_blank">
          <Facebook className="cursor-pointer" />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <Instagram className="cursor-pointer" />
        </a>
        <a
          href="https://www.linkedin.com/in/nishu-kumari-32207022b/"
          target="_blank"
        >
          <LinkedIn className="cursor-pointer" />
        </a>
        <a href="https://github.com/NishuJha16" target="_blank">
          <GitHub className="cursor-pointer" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
