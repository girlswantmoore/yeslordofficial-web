"use client";

import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/about.jpg')" }}
    >
      <div className="min-h-screen px-6 pt-40 pb-20 md:pt-52">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="mb-10 text-4xl font-bold md:text-5xl">
            About Yes Lord
          </h1>

          <div className="space-y-8 text-base leading-9 md:text-lg">

            <p className="text-2xl font-semibold">
              Every life reaches a moment when certainty ends.
            </p>

            <p>
              A moment when the plan changes.
              <br />
              When the answers don’t come.
              <br />
              When what lies ahead cannot be controlled.
            </p>

            <p className="text-2xl font-semibold">
              In those moments, two words have the power to change everything:
            </p>

            <p className="text-5xl font-bold tracking-[0.35em]">
              YES LORD
            </p>

            <p>
              Not because life is easy.
              <br />
              Not because faith removes every obstacle.
              <br />
              But because God remains faithful through every season.
            </p>

            <p>
              We believe surrender is not weakness—it is strength placed in the
              right hands.
            </p>

            <p>
              We believe peace isn’t found in having every answer, but in
              trusting the One who does.
            </p>

            <p>
              We believe our circumstances may change, but God’s character never
              does.
            </p>

            <p>
              These convictions are woven into everything we create.
            </p>

            <p>
              Not to make a statement about fashion, but to make a quiet
              declaration of faith.
            </p>

            <p>
              Every piece is designed with purpose, crafted with excellence, and
              made to outlast trends because the truths that inspire them never
              go out of style.
            </p>

            <p>
              Whether you’re celebrating a victory, carrying a burden, waiting
              on an answer, or beginning again, may what you wear remind you of
              what remains true:
            </p>

            <div className="space-y-2 py-4 text-2xl font-semibold">
              <p>God is present.</p>
              <p>God is faithful.</p>
              <p>God is worthy of your trust.</p>
            </div>

            <p>
              This is more than a brand—it’s a daily posture.
            </p>

            <p>
              A quiet confidence.
            </p>

            <p>
              A willingness to surrender what you cannot control and faithfully
              steward what you can.
            </p>

            <p>
              Because every day presents the same invitation.
            </p>

            <div className="space-y-2 py-4 text-xl font-medium">
              <p>Faith over fear.</p>
              <p>Trust over certainty.</p>
              <p>Surrender over control.</p>
            </div>

            <p>
              And when that becomes your posture, two simple words become more
              than a name.
            </p>

            <p className="text-3xl font-semibold">
              They become a way of living.
            </p>

            <p className="pt-6 text-5xl font-bold tracking-[0.35em] md:text-6xl">
              YES LORD.
            </p>

          </div>
        </div>

        <h3 className="mt-24 text-center text-2xl font-semibold tracking-[0.3em] text-white md:text-3xl">
          Faith. Fashion. Purpose.
        </h3>
      </div>
    </main>
  );
}