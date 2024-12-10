export default function QuoteComponentB({ texts, className }) {
  return (
    <div
      className={`
            rounded-lg rounded-tr-lg rounded-br-lg md:rounded-bl-none md:rounded-tl-none
            bg-deep-green py-8 px-12  flex flex-col items-start justify-between ${className}
            `}
    >
      <ul className="h-full flex flex-col justify-between">
        {texts &&
          texts.map((text) => {
            return (
              <li
                className="text-soft-white list-disc w-full text-lg"
                key={text}
              >
                <span>{text.text}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
