import SideBarMain from "@/containers/Sidebar";
import "@/styles/layout.style.scss";
import '@/app/globals.css';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <div className="layout-main container">
          <div className="row flex">
            <div className="sidebar col-4 col-md-4">
              <SideBarMain />
            </div>

            <div className="main col-8 col-md-8">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
