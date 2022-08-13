import React, { useEffect, useRef, useState } from "react";

const GenericElement = ({
  leftIcon,
  rightIcon,
}: {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [input, setInput] = useState("");
  const inputRef: any = useRef(null);
  useEffect(() => {
    if (!!inputRef.current) {
      inputRef?.current?.focus();
    }
  }, []);

  return (
    <div
      onMouseOver={() => {
        setIsHovering(true);
      }}
      onMouseOut={() => {
        setIsHovering(false);
      }}
      className="flex justify-between items-center"
    >
      <div onClick={() => {}}>{!!leftIcon && leftIcon}</div>
      <div className="px-11 w-full">
        <input
          ref={inputRef}
          type="text"
          className="outline-none bg-[#313235] caret-[#F1F1F1] text-[#f1f1f1] w-full"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      {!!rightIcon && rightIcon}
    </div>
  );
};

export default GenericElement;
