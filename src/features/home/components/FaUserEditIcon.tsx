import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const FaUserEditIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.5 22H6.59c-1.545 0-2.774-.752-3.877-1.803c-2.26-2.153 1.45-3.873 2.865-4.715c2.55-1.52 5.628-1.87 8.422-1.054M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.933 7.349c.335-.364.503-.546.681-.652a1.4 1.4 0 0 1 1.397-.02c.18.1.354.277.7.63c.345.353.518.53.616.714c.238.447.23.988-.02 1.427c-.104.182-.282.353-.638.696l-4.231 4.075c-.674.65-1.011.974-1.432 1.139c-.421.164-.885.152-1.81.128l-.127-.003c-.282-.008-.422-.012-.504-.105s-.071-.236-.049-.523l.012-.156c.063-.808.095-1.213.253-1.576c.157-.363.43-.658.974-1.248z"
          color="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};

export default FaUserEditIcon;
