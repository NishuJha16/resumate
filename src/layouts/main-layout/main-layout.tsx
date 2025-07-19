import { Outlet, useNavigate } from "react-router";
import Header from "../../components/header/header";
import { supabase } from "../../supabase/config";
import { useEffect } from "react";

const MainLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen h-full flex flex-col  bg-[#F2F3F7] text-black dark:bg-gray-900 dark:text-white transition-colors">
      <Header />
      <div className="pt-[48px] flex gap-2 h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
