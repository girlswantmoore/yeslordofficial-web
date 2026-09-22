import type { Metadata } from "next";
import ComingSoonExperience from "../../components/ComingSoonExperience";

export const metadata: Metadata = {
  title: "The Harvest Collection — Yes Lord",
  description:
    "They that sow in tears shall reap in joy. The Harvest Collection arrives October 4 at 10:04 AM ET.",
};

export default function ComingSoonPage() {
  return <ComingSoonExperience />;
}
