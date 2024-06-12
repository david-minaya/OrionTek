import { MouseEvent } from 'react';

interface Props {
  className?: string;
  onClick?: (e: MouseEvent<SVGElement>) => void;
}

export function CloseIcon(props: Props) {

  const { className, onClick } = props;

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      fill="#5f6368"
      className={className}
      onClick={onClick}>
        <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/>
    </svg>
  );
}
