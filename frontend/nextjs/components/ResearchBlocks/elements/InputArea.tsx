import Image from "next/image";
import { FC, useRef } from "react";
import TypeAnimation from "../../TypeAnimation";

type TInputAreaProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (query: string) => void;
  handleSecondary?: (query: string) => void;
  disabled?: boolean;
  reset?: () => void;
  isStopped?: boolean;
};

// Debounce function to limit the rate at which a function can fire
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | undefined;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const InputArea: FC<TInputAreaProps> = ({
  promptValue,
  setPromptValue,
  handleSubmit,
  handleSecondary,
  disabled,
  reset,
  isStopped,
}) => {
  const textareaRef = useRef< HTMLTextAreaElement | null >(null); // {{ edit_1 }}

  // Only show input if not stopped
  if (isStopped) {
    return null;
  }

  const placeholder = handleSecondary
    ? "Any questions about this report?"
    : "What would you like to research next?";


  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '3em'; // Reset to base height
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return; // Allow new line on Shift+Enter
      } else {
        e.preventDefault();
        if (!disabled) {
          if (reset) reset();
          handleSubmit(promptValue);
          setPromptValue(''); // Clear prompt value
          resetHeight(); // Reset height after submit
        }
      }
    }
  };

  // Debounced version of the height adjustment function
  const adjustHeight = debounce((target: HTMLTextAreaElement) => {
    target.style.height = 'auto'; // Reset height to auto to allow shrinking
    target.style.height = `${target.scrollHeight}px`; // Adjust height
  }, 100); // Adjust the delay as needed

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    adjustHeight(target); // Use debounced function
    setPromptValue(target.value);
  };

  return (
    <form
      className="mx-auto flex pt-2 pb-2 w-full items-center justify-between rounded-lg border bg-white px-3 shadow-[2px_2px_38px_0px_rgba(0,0,0,0.25),0px_-2px_4px_0px_rgba(0,0,0,0.25)_inset,1px_2px_4px_0px_rgba(0,0,0,0.25)_inset]"
      onSubmit={(e) => {
        e.preventDefault();
        if (reset) reset();
        handleSubmit(promptValue);
        setPromptValue(''); // Clear prompt value
        resetHeight();
      }}
    >

      <textarea
        placeholder={placeholder}
        ref={textareaRef}
        className="focus-visible::outline-0 my-1 w-full pl-5 font-light not-italic leading-[normal] 
        text-[#1B1B16]/30 text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0 
        sm:text-xl min-h-[3em] resize-none"
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={handleTextareaChange}
        value={promptValue}
      />
      <button
        type="submit"
        className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400"
        disabled={disabled}
      >
        <Image
          src="/send.svg"
          alt="send"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
};

export default InputArea;