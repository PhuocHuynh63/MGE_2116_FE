import SideBarMain from "@/containers/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/layout.style.scss";
import '@/app/globals.css';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <div className="layout-main ">
          <div className="sidebar">
            <SideBarMain />
          </div>

          <div className="main">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
