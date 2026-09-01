import type { ReactNode } from "react";
import AnalyticsTracker from "./AnalyticsTracker";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteChrome({
  children,
  maintenancePage,
}: {
  children: ReactNode;
  maintenancePage: boolean;
}) {
  if (maintenancePage) return children;

  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
