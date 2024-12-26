import SideBarMain from "@/containers/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/layout.style.scss";
import '@/app/globals.css';
import HeaderHome from "@/components/HeaderHome/HeaderHome";
import mgeService from "@/apiRequests/mge";
import { IMGE } from "@/shemaValidations/model.schema";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const mgeResponse = await mgeService.getMge(1, 5) as IMGE;

  return (
    <html lang="en">
      <body>
        <div className="layout-main">
          <div className="sidebar">
            <SideBarMain />
          </div>

          <div className="main">
            <HeaderHome data={mgeResponse} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;