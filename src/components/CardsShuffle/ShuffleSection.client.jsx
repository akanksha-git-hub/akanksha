"use client";

import ShuffleMix from "./ShuffleMix";
import ShuffleMix1 from "./ShuffleMix1";

export default function ShuffleSection({ mix1Data, mix2Data }) {
  return (
    <>
      <section className="mt-32 min-h-screen">
        <ShuffleMix slice={mix1Data} />
      </section>

      <div className="h-[100vh]" />

      <section className="mt-32 min-h-screen">
        <ShuffleMix1 slice={mix2Data} />
      </section>
    </>
  );
}
