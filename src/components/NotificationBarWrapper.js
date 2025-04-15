"use client";
import { useState } from "react";
import RichText from "./Texts/RichText";
import Button from "./v2-components/buttons/button";

export default function NotificationBarWrapper({
  notification_text,
  cta_text,
  cta_link,
}) {
  const [close, setClose] = useState(false);

  return (
    <>
      {!close && (
        <section
          className={`bg-bright-yellow p-2 flex items-center justify-between gap-4`}
        >
          <div className="flex items-center justify-center w-[95%] gap-4">
            <RichText
              text={notification_text}
              className="font-ambit-regular text-deep-green text-base sm:text-xl md:text-2xl"
            />
            {/* <Button
              prismicLink={cta_link}
              className="!py-2 !px-4 sm:!py-2 sm:!px-8"
            >
              {cta_text}
            </Button> */}
          </div>
          <div className="w-[5%] flex items-center justify-center">
            <p
              className="cursor-pointer text-deep-green text-xl transition-all active:scale-95 hover:opacity-55"
              onClick={() => setClose(() => true)}
            >
              X
            </p>
          </div>
        </section>
      )}
    </>
  );
}
