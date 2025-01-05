import SparkleText from "./sparkle-text";

export default function SparkleContainer({ slice, onContentChange }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 950px:space-y-3">
      <SparkleText slice={slice} onContentChange={onContentChange} />
      <p className="font-ambit-semibold text-deep-green text-2xl md:text-xl">
        &
      </p>
      <SparkleText slice={slice} isRight onContentChange={onContentChange} />
    </div>
  );
}
