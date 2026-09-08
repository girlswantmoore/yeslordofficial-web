import type { Metadata } from "next";
import ComingSoonExperience from "../../components/ComingSoonExperience";

export const metadata: Metadata = {
  title: "The Harvest Collection — Yes Lord",
  description:
    "They that sow in tears shall reap in joy. The Harvest Collection arrives September 20 at 9:20 AM ET.",
};

export default function ComingSoonPage() {
  return <ComingSoonExperience />;
}
