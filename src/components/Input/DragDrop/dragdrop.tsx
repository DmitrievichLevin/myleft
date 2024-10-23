import React, { useCallback, useEffect, useRef, useState } from 'react';
import cntl from 'cntl';
import '../textInput.css';
import './dragdrop.css';
import dashed from '../../../res/Icons/dashedBorderRect.svg';
import imageIcon from '../../../res/Icons/imageIcon.svg';
import { SecondaryButton } from '../../Buttons/Secondary/secondaryButton';
import useFormDDUploads from './hooks/useFormDDUploads';
import { FileTypeIcon } from '../../../res/SvgComps/fileTypeIcon';
import { MIME_ABBR, ONE_MB } from '../../../constants';
import chroma from 'chroma-js';
import { IconButton } from '../../Buttons/iconButton';
import { TrashButton } from '../../Buttons/Trash/trashButton';

export type MB = number;

export type DragDropInputProps = {
  value?: string;
  name?: string;
  title?: string;
  innerText?: string;
  icon?: string;
  maxFileSize?: MB;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  forwardRef?: any;
  errorMessage?: string;
};

const dragDropCN = (className: string, dragOver: boolean) => cntl`
relative
text-[1rem]
flex
flex-col
text-center
items-center
justify-center
dd-wrapper-cn
rounded-2xl
p-1
${dragOver ? 'border-solid border-linkBlue !border-[1px]' : ''}
${className}
`;

export const DragDropInput = ({
  name,
  value = '',
  title = 'Drag and drop files to upload',
  innerText = 'Your media will be private until you publish your service.',
  maxFileSize = 10,
  icon = imageIcon,
  onChange = () => {},
  required = false,
  disabled = false,
  className = '',
  forwardRef,
  errorMessage,
}: DragDropInputProps) => {
  const inputRef = useRef(null);

  const {
    dragOver,
    onClick,
    handleDrop,
    handleDragExit,
    handleSelectFiles,
    handleOnDragOver,
    removeFile,
    files,
  } = useFormDDUploads({ onChange, maxFileSize, disabled }, inputRef);

  return (
    <div id="drag-drop-wrapper-cn" className="flex flex-col w-fit">
      <div
        aria-label="drag-drop-input-cn"
        className={dragDropCN(className, dragOver)}
        onDrop={handleDrop}
        onDragOver={handleOnDragOver}
        onDragLeave={handleDragExit}
      >
        <img
          id="dd-div-dashed-border"
          src={dashed}
          className="p-[2px] absolute top-0 left-0 w-full h-full object-fill pointer-events-none"
          alt="element-dashed-border-svg"
        />
        <div
          id="inner-dd-content"
          className="flex flex-col items-center justify-center gap-1 p-6 w-fit"
        >
          <div
            id="media-uploads-icon-wrapper"
            className="rounded-md flex p-[4px] w-fit media-uploads-icon-cn pointer-events-none"
          >
            <img
              src={icon}
              className="w-[40px] h-[40px] rounded-full shadow-inner border-solid  border-[#ddd] !border-[0.5px]"
              alt="media-uploads-icon"
            />
          </div>
          <p className="flex flex-col gap-2 tracking-tight pointer-events-none">
            <span className="font-semibold text-textGray block text-xs">
              {title}
            </span>
            <span className="block text-[0.7rem] text-[#777777]">
              {innerText}
            </span>
            <span className="block text-[0.6rem] font-semibold text-[#777777]">
              Max file size: {maxFileSize} MB
            </span>
          </p>
          <SecondaryButton
            title="Select Files"
            onClick={onClick}
            className="!text-textGray !text-xs !px-3 !py-2 !outline-[#cccccc] !font-semibold"
            disabled={disabled}
          />
        </div>
        <input
          type="file"
          className="hidden"
          name={name}
          required={required}
          ref={inputRef}
          multiple={true}
          // @ts-ignore
          onChange={handleSelectFiles}
          disabled={disabled}
        />
      </div>
      {files.map(
        (
          {
            type,
            size,
            name,
          }: {
            type: string;
            size: number;
            name: string;
          },
          idx: number
        ) => {
          const [f_n, _ext] = name.split('.');
          return (
            <div
              key={`${f_n}-${idx}-file-upload-dnd`}
              className="shadow-md w-full flex px-2 rounded-md border-solid border-[#dddddd] !border-[1px] justify-between items-center"
            >
              <div className="flex gap-3 items-center">
                <FileTypeIcon
                  type={MIME_ABBR[type]}
                  className="w-[30px] h-[30px]"
                  color={chroma.random().saturate(1).hex()}
                />
                <p className="flex flex-col max-w-[100px]">
                  <span
                    id={`file-${f_n}`}
                    className="block text-sm max-w-[100px] truncate"
                    title={f_n}
                  >
                    {f_n}
                  </span>
                  <span
                    id={`file-${f_n}-info`}
                    className="block text-xs text-[#777777]"
                  >
                    {'.' + _ext + ' | ' + `${(size / ONE_MB).toFixed(3)} MB`}
                  </span>
                </p>
              </div>

              <TrashButton
                onClick={() => removeFile(name)}
                className="!w-auto !h-auto !p-1 !rounded-full bg-white !border-solid !border-[1px] border-[#dddddd] shadow-sm transition-all"
                iconClassName="!w-[22px] !h-[22px]"
              />
            </div>
          );
        }
      )}
    </div>
  );
};
