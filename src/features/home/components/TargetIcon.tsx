import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const TargetIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_366_26322)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.1496 0.73081C22.1084 0.565026 22.024 0.413144 21.9049 0.290703C21.7858 0.168261 21.6363 0.0796545 21.4717 0.0339486C21.3072 -0.0117573 21.1334 -0.0129221 20.9682 0.0305735C20.803 0.0740691 20.6524 0.160664 20.5316 0.281498L16.6749 4.13825C16.5573 4.25612 16.4722 4.40244 16.4279 4.56296C16.3836 4.72348 16.3817 4.89274 16.4223 5.05423L17.1165 7.83881L17.0895 7.8658L12.4787 12.4766C12.2233 12.7507 12.0842 13.1133 12.0908 13.488C12.0974 13.8627 12.2492 14.2202 12.5142 14.4852C12.7792 14.7502 13.1367 14.902 13.5113 14.9086C13.886 14.9152 14.2487 14.7761 14.5228 14.5206L19.1374 9.91181L19.1644 9.88289L21.9471 10.579C22.1086 10.6196 22.2778 10.6177 22.4383 10.5734C22.5989 10.5291 22.7452 10.444 22.8631 10.3264L26.7198 6.46966C26.8411 6.34898 26.9282 6.19818 26.972 6.03275C27.0158 5.86732 27.0147 5.69321 26.969 5.52831C26.9232 5.3634 26.8344 5.21365 26.7117 5.09441C26.5889 4.97517 26.4367 4.89075 26.2705 4.84982L22.9749 4.02833L22.1496 0.73081ZM14.1121 1.46359C14.1386 1.84612 14.0121 2.22352 13.7604 2.51281C13.5087 2.8021 13.1524 2.9796 12.7699 3.00629C10.7552 3.14592 8.82282 3.86101 7.20252 5.0666C5.58222 6.27219 4.34207 7.91758 3.62945 9.80729C2.91682 11.697 2.76166 13.7515 3.18242 15.7268C3.60317 17.7021 4.58215 19.5151 6.00302 20.9504C7.42389 22.3856 9.22692 23.3828 11.1979 23.8234C13.1688 24.264 15.2249 24.1296 17.1216 23.436C19.0184 22.7424 20.6762 21.5189 21.898 19.9108C23.1199 18.3027 23.8544 16.3777 24.0143 14.3644C24.0447 13.9819 24.2259 13.6271 24.5179 13.3781C24.8099 13.1291 25.1889 13.0063 25.5715 13.0367C25.954 13.0672 26.3088 13.2483 26.5578 13.5404C26.8068 13.8324 26.9296 14.2114 26.8991 14.5939C26.6951 17.1591 25.7589 19.6117 24.2019 21.6605C22.645 23.7093 20.5326 25.2681 18.1158 26.1516C15.6989 27.0352 13.0793 27.2064 10.568 26.6449C8.05674 26.0835 5.75943 24.8129 3.94902 22.9842C2.1386 21.1555 0.891184 18.8456 0.354962 16.3288C-0.18126 13.812 0.0162562 11.1942 0.924044 8.7864C1.83183 6.37858 3.41173 4.28195 5.47604 2.74562C7.54035 1.20928 10.0023 0.297816 12.5694 0.119514C12.9519 0.093021 13.3293 0.219521 13.6186 0.471203C13.9079 0.722885 14.0854 1.08108 14.1121 1.46359ZM12.8162 7.82531C12.8855 8.00219 12.9193 8.191 12.9156 8.38093C12.9119 8.57087 12.8708 8.75822 12.7947 8.93228C12.7186 9.10634 12.609 9.2637 12.472 9.39538C12.3351 9.52705 12.1736 9.63046 11.9966 9.69969C11.3642 9.94776 10.8036 10.3495 10.3654 10.8687C9.92724 11.3878 9.62535 12.008 9.48701 12.6731C9.34868 13.3382 9.37827 14.0273 9.57311 14.6781C9.76795 15.3289 10.1219 15.9208 10.603 16.4005C11.084 16.8802 11.677 17.2324 12.3284 17.4253C12.9798 17.6183 13.6689 17.6459 14.3336 17.5056C14.9983 17.3653 15.6176 17.0616 16.1355 16.6219C16.6533 16.1822 17.0535 15.6204 17.2997 14.9873C17.3686 14.8103 17.4716 14.6486 17.603 14.5114C17.7344 14.3742 17.8915 14.2643 18.0654 14.1878C18.2393 14.1113 18.4265 14.0699 18.6164 14.0658C18.8063 14.0617 18.9951 14.095 19.1721 14.1639C19.3492 14.2328 19.5109 14.3358 19.648 14.4672C19.7852 14.5986 19.8952 14.7557 19.9716 14.9296C20.0481 15.1034 20.0896 15.2907 20.0937 15.4806C20.0978 15.6705 20.0644 15.8593 19.9956 16.0363C19.575 17.1175 18.8916 18.0769 18.0071 18.8276C17.1227 19.5784 16.065 20.0969 14.9299 20.3362C13.7947 20.5755 12.6178 20.5282 11.5055 20.1984C10.3932 19.8687 9.38068 19.2669 8.55938 18.4475C7.73809 17.6282 7.13395 16.617 6.80159 15.5055C6.46922 14.394 6.41912 13.2172 6.65579 12.0815C6.89247 10.9458 7.40846 9.88696 8.15714 9.00074C8.9058 8.11452 9.86354 7.42886 10.9438 7.00575C11.3008 6.8664 11.6985 6.87444 12.0496 7.0281C12.4006 7.18177 12.6764 7.4685 12.8162 7.82531Z"
            fill="#54565A"
          />
        </g>
        <defs>
          <clipPath id="clip0_366_26322">
            <rect width="28" height="28" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default TargetIcon;
