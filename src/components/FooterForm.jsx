"use client";
import FooterFormCTA from "./UI/Button/FooterFormCTA";
import Input from "./UI/Input";

export default function FooterForm({ className }) {
  return (
    <form className={`${className} w-full`}>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Your email"
          className="py-2 px-5 h-[4.3rem] flex items-center text-xl"
        />
        <FooterFormCTA
          onClick={(e) => e.preventDefault()}
          className="rounded-xl p-2 h-[4.3rem] w-[4.6rem] hover:opacity-95 active:scale-95 transition-all"
        />
      </div>
    </form>
  );
}
