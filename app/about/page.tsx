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
      <div className="min-h-screen bg-black/60 flex flex-col items-center px-6 pt-36 pb-10">

        <img
          src="/logo.png"
          alt="Yes Lord"
          className="w-40 md:w-52 mb-12"
        />

        <div className="max-w-4xl text-center text-white space-y-6 text-base md:text-lg leading-9">

          <p>
            <strong>About the brand...</strong>
          </p>

          <p>
            Yes Lord wasn’t created because everything in life is perfect.
            </p>
            <p>
            It was born from the moments that test us the most.
          </p>

          <p>
            Like everyone, we've all faced trials, setbacks, uncertainty, and seasons
            where it would’ve been easy to lose hope. Through every high and
            every low, one truth has remained constant:
            <strong> God is always present.</strong> Even when we can’t
            see the path ahead, He is walking it with us.
          </p>

          <p>
            This brand is more than clothing...it’s a reminder.
          </p>

          <p>
            A reminder to slow down in a world that constantly tells us to move
            faster.
          </p>

          <p>
            A reminder that we don’t have to carry every burden alone.
          </p>

          <p>
            A reminder to trust God even when life doesn’t make sense.
          </p>

          <p>
            Every design represents a simple but powerful declaration:
            <strong> “Yes Lord.”</strong> A willingness to trust His plan over
            our own, to surrender control, and to believe that His purpose is
            greater than our circumstances.
          </p>

          <p>
            Whether you’re celebrating victories or fighting battles no one else
            can see, I hope every piece reminds you that God hasn’t forgotten
            you. His presence doesn’t depend on your situation. He is with you
            in your joy, your pain, your waiting, and your breakthrough.
          </p>

          <p>
            Thank you for being part of this journey. Our goal is that every
            time you wear <strong>Yes Lord</strong>, you’re reminded to lean on
            Him, trust Him, and walk boldly in faith.
          </p>

          <div className="pt-8">
            <p className="text-xl md:text-2xl italic">
              Because no matter where you are…there you are. Make the best of it.
            </p>

          </div>

        </div>

        <h3 className="text-2xl md:text-3xl font-semibold tracking-[0.3em] text-white text-center mt-20 mb-6">
          Faith. Fashion. Purpose.
        </h3>

      </div>
    </main>
  );
}