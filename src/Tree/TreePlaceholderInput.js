import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { AiOutlineFile } from "react-icons/ai";

import FILE_ICONS from "./FileIcons";
import { StyledFile } from "Tree/File/TreeFile.style";
import { FolderName } from "Tree/Folder/TreeFolder";
import { StyledFolder } from "Tree/Folder/TreeFolder.style";
import { InputWrap, StyledInput, WranBox } from "./TreePlaceholderInput.style";

const Edit = (props,) => {
  const { onBlur, defaultValue = '', inputRef, onChange, ...rest } = props;
  const [isWarn, setisWarn] = useState(defaultValue.trim() !== defaultValue)
  const handleChange = (e) => {
    const value = e.target.value;
    value.trim() === value ? setisWarn(false) : setisWarn(true)
    onChange?.(e);
  }
  return <InputWrap>
    <StyledInput
      ref={inputRef}
      onChange={handleChange}
      warn={isWarn}
      onBlur={onBlur}
      defaultValue={defaultValue}
      className="tree__input"
      {...rest}
    />
    {isWarn && <WranBox>
      Leading or trailing whitespace detected in file or folder name.
    </WranBox>}
  </InputWrap>
};
const FileEdit = ({
  ext,
  inputRef,
  updateExt,
  defaultValue,
  style,
  onBlur
}) => {
  const extension = FILE_ICONS[ext] ? FILE_ICONS[ext] : <AiOutlineFile />;

  return (
    <StyledFile className="tree__file" style={style}>
      {extension}
      &nbsp;&nbsp;
      <Edit
        inputRef={inputRef}
        onChange={updateExt}
        onBlur={onBlur}
        defaultValue={defaultValue}
      />
    </StyledFile>
  );
};

const FolderEdit = ({ name, inputRef, defaultValue = '', style, onBlur }) => {
  return (
    <StyledFolder id={v4()} name={name} style={style}>
      <FolderName
        isOpen={true}
        name={
          <Edit
            inputRef={inputRef}
            onBlur={onBlur}
            defaultValue={defaultValue}
          />
        }
      />
    </StyledFolder>
  );
};

const PlaceholderInput = ({
  type,
  name,
  onSubmit,
  onCancel,
  defaultValue,
  style
}) => {
  const [ext, setExt] = useState("");
  const inputRef = useRef();

  const updateExt = (e) => {
    let splitted = e.target.value.split(".");
    let ext = splitted && splitted[splitted.length - 1];
    setExt(ext);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    const handle = (e) => {
      const value = e.target.value;
      if (e.key === "Escape") {
        e.target.value = ''
      }
      if (['Escape', 'Enter'].includes(e.key)) {
        return inputRef.current.blur()
      }
      // onblur
      if (!e.key) {
        value ? onSubmit(e.target.value) : onCancel?.();
      }
    }


    inputRef.current.addEventListener("keyup", handle);
    inputRef.current.addEventListener("blur", handle);
    return () => {
      inputRef.current?.removeEventListener("keyup", handle);
      inputRef.current?.removeEventListener("blur", handle);
    }
  }, [inputRef]);


  return type === "file" ? (
    <FileEdit
      ext={ext}
      style={style}
      updateExt={updateExt}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  ) : (
    <FolderEdit
      style={style}
      name={name}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  );
};

export { PlaceholderInput };
