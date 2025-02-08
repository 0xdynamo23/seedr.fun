import { LucideProps } from "lucide-react";
import Image from "next/image";

export const Icons = {
    logo: (props: LucideProps) => (
        <Image
        src="/assets/logo.png"
        alt="Cyromics"
        width={80}
        height={80}
        className="w-full h-auto"
      />
        
    ),
    wordmark: (props: LucideProps) => (
        <svg {...props} width="391" height="129" viewBox="0 0 391 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.55126 104.62C4.28626 104.62 0.371264 100.57 0.371264 95.305V9.445C0.371264 4.17999 4.28626 0.129997 9.55126 0.129997C14.6813 0.129997 18.5963 4.17999 18.5963 9.445V95.305C18.5963 100.57 14.6813 104.62 9.55126 104.62ZM48.5061 0.804996C54.5811 0.804996 59.8461 5.665 59.8461 11.875C59.8461 17.95 54.5811 22.81 48.5061 22.81C42.1611 22.81 37.0311 17.95 37.0311 11.875C37.0311 5.665 42.1611 0.804996 48.5061 0.804996ZM48.3711 104.62C43.2411 104.62 39.3261 100.57 39.3261 95.305V43.87C39.3261 38.605 43.2411 34.69 48.5061 34.69C53.6361 34.69 57.5511 38.605 57.5511 43.87V95.305C57.5511 100.57 53.6361 104.62 48.3711 104.62ZM114.596 34.69C129.851 34.69 139.706 45.22 139.706 61.555V95.305C139.706 100.705 135.926 104.62 130.661 104.62C125.531 104.62 121.616 100.57 121.616 95.305V63.985C121.616 56.29 116.621 51.025 109.196 51.025C101.771 51.025 96.506 56.425 96.506 63.985V95.305C96.506 100.705 92.591 104.62 87.461 104.62C82.196 104.62 78.281 100.57 78.281 95.305V43.87C78.281 38.605 82.196 34.69 87.326 34.69C91.511 34.69 94.886 37.525 95.831 41.575C100.556 37.255 107.171 34.69 114.596 34.69ZM169.131 0.129997C174.396 0.129997 178.176 4.04499 178.176 9.445V95.305C178.176 100.705 174.261 104.62 169.131 104.62C163.866 104.62 159.951 100.57 159.951 95.305V9.445C159.951 4.17999 163.866 0.129997 169.131 0.129997ZM219.621 90.58C221.106 92.47 221.781 94.225 221.781 96.25C221.781 100.975 218.136 104.62 213.546 104.62C210.711 104.62 208.551 103.54 206.796 101.245L183.981 73.165C181.956 70.465 181.146 68.575 181.146 66.55C181.146 64.255 182.091 62.365 184.386 59.8L205.716 37.525C207.471 35.635 209.766 34.69 212.061 34.69C216.786 34.69 220.431 38.2 220.431 42.79C220.431 45.085 219.486 47.245 217.461 49.27L200.451 66.55L219.621 90.58ZM247.373 0.804996C253.448 0.804996 258.713 5.665 258.713 11.875C258.713 17.95 253.448 22.81 247.373 22.81C241.028 22.81 235.898 17.95 235.898 11.875C235.898 5.665 241.028 0.804996 247.373 0.804996ZM247.238 104.62C242.108 104.62 238.193 100.57 238.193 95.305V43.87C238.193 38.605 242.108 34.69 247.373 34.69C252.503 34.69 256.418 38.605 256.418 43.87V95.305C256.418 100.57 252.503 104.62 247.238 104.62ZM308.198 16.465C301.988 16.465 298.478 20.245 298.478 26.86V36.175H306.848C311.303 36.175 314.543 39.415 314.543 43.87C314.543 48.325 311.303 51.565 306.848 51.565H298.478V95.305C298.478 100.705 294.563 104.62 289.433 104.62C284.168 104.62 280.253 100.57 280.253 95.305V51.565H277.283C272.828 51.565 269.453 48.325 269.453 43.87C269.453 39.415 272.828 36.175 277.283 36.175H280.253V25.24C280.253 9.445 289.568 0.129997 305.093 0.129997C308.603 0.129997 311.303 0.669998 313.733 1.885C316.568 3.1 318.323 5.8 318.323 9.17499C318.323 13.63 315.218 16.6 310.358 16.6C309.818 16.6 309.143 16.465 308.198 16.465ZM382.119 34.69C386.844 34.69 390.894 38.74 390.894 43.465C390.894 44.815 390.624 46.165 389.814 47.65L360.384 107.995C353.229 122.71 345.129 128.92 332.979 128.92C330.009 128.92 327.309 128.38 325.284 127.435C322.449 126.22 320.694 123.385 320.694 120.28C320.694 115.825 324.339 112.45 328.929 112.45C329.604 112.45 330.144 112.585 330.549 112.585C336.354 112.585 340.269 110.155 343.239 104.08L345.669 98.68L322.584 47.785C321.774 46.165 321.369 44.815 321.369 43.465C321.369 38.74 325.419 34.69 330.279 34.69C333.789 34.69 336.894 36.58 338.244 39.82L355.929 79.375L374.019 39.82C375.369 36.715 378.474 34.69 382.119 34.69Z"
                fill="black" />
        </svg>
    ),
    bolt: (props: LucideProps) => (
        <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003" transform="rotate(0)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144">
            </g>
            <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.5279 10.3736C20.1572 9.73163 19.4779 9.5206 18.8294 9.42992C18.1757 9.33852 17.3008 9.33855 16.2426 9.33858L16.1824 9.33858C15.5523 9.33858 15.1403 9.33237 14.8402 9.29064C14.5688 9.2529 14.4825 9.19704 14.4456 9.16446C14.4187 9.13635 14.3706 9.07063 14.3379 8.83366C14.2993 8.55425 14.2976 8.1711 14.2976 7.55704V7.18255C14.2977 5.59503 14.2977 4.32329 14.1755 3.4166C14.0608 2.56554 13.7882 1.60969 12.844 1.32035C11.9164 1.03608 11.1384 1.64564 10.5337 2.27405C9.88942 2.9435 9.12413 3.97895 8.16596 5.27538L5.02896 9.51969C4.41863 10.3454 3.90984 11.0337 3.60669 11.6029C3.3028 12.1735 3.08164 12.8509 3.41872 13.5268L3.41989 13.5293L3.42344 13.5365L3.42748 13.5445L3.43146 13.5522L3.4358 13.5603L3.44023 13.5685L3.44441 13.576L3.44884 13.5838L3.45289 13.5907L3.45438 13.5931C3.82188 14.2296 4.49825 14.4524 5.1526 14.5523C5.82693 14.6553 6.72671 14.6619 7.81795 14.6619C8.45456 14.6619 8.86048 14.6633 9.1586 14.7013C9.42195 14.7349 9.50071 14.7867 9.53447 14.8165C9.56438 14.8478 9.61682 14.9207 9.6538 15.1663C9.69612 15.4473 9.70276 15.8364 9.70275 16.4435L9.70274 16.8178C9.7027 18.4053 9.70266 19.6771 9.82483 20.5838C9.9395 21.4349 10.2121 22.3907 11.1563 22.6801C12.0839 22.9644 12.8619 22.3548 13.4667 21.7264C14.1109 21.0569 14.8762 20.0215 15.8344 18.725L18.9338 14.5317C19.5646 13.6783 20.0834 12.9652 20.3893 12.3718C20.6887 11.7911 20.8976 11.1097 20.5636 10.44L20.5624 10.4376L20.5589 10.4303L20.5548 10.4223L20.5508 10.4146L20.5465 10.4064L20.542 10.3982L20.5378 10.3907L20.5334 10.3829L20.5293 10.3759L20.5279 10.3736ZM11.6145 3.31416C11.0465 3.90435 10.3387 4.85927 9.335 6.21733L6.27286 10.3604C5.61517 11.2502 5.17513 11.849 4.93062 12.3081C4.81161 12.5315 4.76693 12.6725 4.75421 12.7578C4.74635 12.8105 4.75115 12.8343 4.75742 12.8496C4.78161 12.8852 4.88663 12.9943 5.379 13.0695C5.9169 13.1516 6.69032 13.1619 7.81795 13.1619L7.86392 13.1619C8.44106 13.1618 8.94393 13.1618 9.3483 13.2134C9.78148 13.2686 10.2118 13.3942 10.568 13.7293L10.5739 13.7348L10.5796 13.7404C10.9296 14.0839 11.0719 14.5099 11.1371 14.9429C11.1994 15.3568 11.2028 15.8658 11.2028 16.4435L11.2027 16.753C11.2027 18.42 11.2044 19.5894 11.3114 20.3835C11.3647 20.7789 11.4363 21.0108 11.505 21.1404C11.5564 21.2374 11.586 21.2438 11.5943 21.2456L11.5958 21.2459L11.5973 21.2464C11.6078 21.25 11.6446 21.2628 11.7583 21.2056C11.9003 21.1341 12.1032 20.98 12.3858 20.6863C12.9538 20.0961 13.6616 19.1412 14.6654 17.7831L17.7275 13.6401C18.3815 12.7553 18.8172 12.1478 19.0561 11.6845C19.2608 11.2873 19.2385 11.1528 19.2249 11.1171C19.2024 11.0843 19.1016 10.9826 18.6217 10.9155C18.0846 10.8404 17.3161 10.8386 16.1824 10.8386C15.5796 10.8386 15.0567 10.8352 14.6336 10.7763C14.1968 10.7156 13.7655 10.5841 13.4123 10.252L13.4065 10.2465L13.4008 10.2409C13.0476 9.89419 12.9114 9.46874 12.852 9.03887C12.7975 8.64454 12.7976 8.15622 12.7976 7.60538L12.7976 7.24733C12.7976 5.58044 12.7959 4.41099 12.6889 3.61692C12.6356 3.22153 12.564 2.98959 12.4954 2.86008C12.4439 2.76301 12.4143 2.75666 12.406 2.75487L12.4045 2.75451L12.403 2.75401C12.3925 2.7504 12.3557 2.73767 12.242 2.79487C12.1 2.86633 11.8972 3.02042 11.6145 3.31416Z" fill="#3f3f46">
                </path>
            </g>
        </svg>
    ),
    google: (props: LucideProps) => (
        <svg {...props} width="256" height="262" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4" />
            <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853" />
            <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05" />
            <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335" />
        </svg>
    ),
    company1: (props: LucideProps) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1000 198">
            <path fill="#fff" fillRule="evenodd" d="M974.795 150.604c.605 6.893 6.119 15.668 15.672 15.668h5.59c2.166 0 3.943-1.776 3.943-3.944V39.3998h-.025c-.113-2.0709-1.824-3.7296-3.918-3.7296h-17.32c-2.094 0-3.805 1.6587-3.92 3.7296h-.022v9.9886c-10.611-13.0803-27.342-18.5095-44.119-18.5095-38.137 0-69.051 30.9384-69.051 69.1051 0 38.169 30.914 69.108 69.051 69.108v.003c16.777 0 35.06-6.513 44.116-18.507l.003.016Zm-44.052-5.698c-24.254 0-43.918-20.11-43.918-44.9218 0-24.8074 19.664-44.9189 43.918-44.9189 24.253 0 43.914 20.1115 43.914 44.9189 0 24.8118-19.661 44.9218-43.914 44.9218Zm-91.014 9.926-.008-63.6102h.002c0-35.8566-22.604-60.046-58.648-60.046-17.206 0-31.311 9.9571-36.292 18.5105-1.077-6.6881-4.625-13.7182-15.628-13.7182h-5.608c-2.169 0-3.941 1.7772-3.941 3.9458V162.852h.022c.114 2.068 1.827 3.729 3.921 3.729h17.32c.265 0 .525-.032.776-.081.115-.022.222-.067.333-.099.129-.04.263-.07.385-.12.155-.064.294-.15.438-.23.07-.043.143-.074.211-.119.173-.111.332-.245.485-.383.025-.025.055-.042.08-.065.172-.166.329-.35.469-.541l.001-.003c.434-.596.697-1.314.74-2.088h.022V90.2356c0-19.2575 15.601-34.8704 34.846-34.8704 19.243 0 34.844 15.6129 34.844 34.8704l.016 60.6974.004-.021c0 .054.009.109.009.167v11.773h.023c.114 2.068 1.825 3.729 3.919 3.729h17.321c.266 0 .525-.032.776-.081.102-.019.197-.06.297-.088.142-.041.287-.077.424-.131.141-.059.27-.141.404-.216.082-.047.168-.08.247-.133.159-.105.306-.232.449-.357.037-.034.078-.059.113-.094.164-.158.31-.329.444-.509.009-.013.02-.024.03-.037.427-.591.688-1.303.733-2.072 0-.006.002-.011.002-.011h.023v-8.018l-.004-.002m-180.378-4.228c.606 6.893 6.12 15.668 15.672 15.668h5.59c2.167 0 3.94-1.776 3.94-3.944V39.3998h-.022c-.113-2.0709-1.826-3.7296-3.918-3.7296h-17.32c-2.094 0-3.805 1.6587-3.922 3.7296h-.02v9.9886c-10.613-13.0803-27.343-18.5095-44.121-18.5095-38.135 0-69.049 30.9384-69.049 69.1051 0 38.169 30.914 69.108 69.049 69.108v.003c16.778 0 35.063-6.513 44.119-18.507l.002.016Zm-44.054-5.698c-24.252 0-43.915-20.11-43.915-44.9218 0-24.8074 19.663-44.9189 43.915-44.9189 24.255 0 43.914 20.1115 43.914 44.9189 0 24.8118-19.659 44.9218-43.914 44.9218Zm-171.541-11.908c11.562 8.016 24.183 11.909 36.311 11.909 11.554 0 23.499-5.994 23.499-16.428 0-13.93-26.028-16.097-42.382-21.66-16.356-5.562-30.443-17.0605-30.443-35.6813 0-28.4928 25.368-40.2607 49.045-40.2607 15.002 0 30.481 4.9507 40.516 12.0427 3.456 2.6207 1.351 5.6296 1.351 5.6296l-9.579 13.692c-1.077 1.5422-2.959 2.8745-5.662 1.2054-2.702-1.6681-12.181-8.3824-26.626-8.3824-14.446 0-23.148 6.6765-23.148 14.9519 0 9.9236 11.31 13.0447 24.557 16.4271 23.085 6.2275 48.268 13.7127 48.268 42.0357 0 25.104-23.464 40.619-49.396 40.619-19.652 0-36.383-5.607-50.416-15.912-2.923-2.928-.881-5.647-.881-5.647l9.532-13.622c1.939-2.548 4.385-1.659 5.454-.919m-66.583 17.606c.606 6.893 6.12 15.668 15.673 15.668h5.59c2.166 0 3.942-1.776 3.942-3.944V39.3998h-.024c-.113-2.0709-1.824-3.7296-3.918-3.7296h-17.32c-2.094 0-3.805 1.6587-3.922 3.7296h-.021v9.9886c-10.611-13.0803-27.342-18.5095-44.119-18.5095-38.135 0-69.05 30.9384-69.05 69.1051 0 38.169 30.915 69.108 69.05 69.108v.003c16.777 0 35.061-6.513 44.117-18.507l.002.016Zm-44.051-5.698c-24.254 0-43.917-20.11-43.917-44.9218 0-24.8074 19.663-44.9189 43.917-44.9189 24.253 0 43.913 20.1115 43.913 44.9189 0 24.8118-19.66 44.9218-43.913 44.9218Z" clipRule="evenodd" />
            <path fill="#F06A6A" fillRule="evenodd" d="M167.197 104.685c-25.664 0-46.468 20.804-46.468 46.47 0 25.664 20.804 46.468 46.468 46.468 25.664 0 46.468-20.804 46.468-46.468 0-25.666-20.804-46.47-46.468-46.47Zm-120.7287.004C20.8048 104.689 0 125.49 0 151.155c0 25.664 20.8048 46.469 46.4683 46.469 25.6646 0 46.4704-20.805 46.4704-46.469 0-25.665-20.8058-46.466-46.4704-46.466ZM153.3 46.5982c0 25.6656-20.804 46.4724-46.467 46.4724-25.6649 0-46.4687-20.8068-46.4687-46.4724 0-25.6605 20.8038-46.467341 46.4687-46.467341 25.663 0 46.467 20.806841 46.467 46.467341Z" clipRule="evenodd" />
        </svg>
    ),
    company2: (props: LucideProps) => (
        <svg {...props} version="1.0" xmlns="http://www.w3.org/2000/svg" width="753.000000pt" height="100.000000pt" viewBox="0 0 753.000000 100.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
                <path d="M120 875 l-125 -125 125 -125 125 -125 125 125 125 125 -125 125
-125 125 -125 -125z" />
                <path d="M620 875 l-125 -125 125 -125 125 -125 -125 -125 -125 -125 125 -125
125 -125 125 125 125 125 -125 125 -125 125 125 125 125 125 -125 125 -125
125 -125 -125z" />
                <path d="M1120 875 l-125 -125 125 -125 125 -125 125 125 125 125 -125 125
-125 125 -125 -125z" />
                <path d="M2300 795 l0 -85 125 0 125 0 0 -345 0 -345 95 0 95 0 0 345 0 345
125 0 125 0 0 85 0 85 -345 0 -345 0 0 -85z" />
                <path d="M3570 450 l0 -430 95 0 95 0 0 430 0 430 -95 0 -95 0 0 -430z" />
                <path d="M4410 451 l0 -431 190 0 c104 0 213 5 242 11 234 49 377 254 341 488
-27 175 -132 289 -310 337 -39 10 -126 17 -260 21 l-203 6 0 -432z m442 226
c31 -15 68 -43 83 -63 79 -103 70 -260 -19 -348 -56 -56 -115 -76 -228 -76
l-88 0 0 261 0 261 98 -4 c81 -3 107 -8 154 -31z" />
                <path d="M5912 833 c-55 -130 -332 -802 -332 -807 0 -3 46 -6 103 -6 l102 0
30 83 30 82 180 3 180 2 30 -82 30 -83 109 -3 c85 -2 107 0 103 10 -11 27
-290 707 -319 776 l-30 72 -98 0 -98 0 -20 -47z m182 -336 c31 -81 56 -150 56
-152 0 -3 -57 -5 -126 -5 -69 0 -124 4 -122 8 2 5 30 79 63 165 33 86 63 151
66 144 4 -7 32 -79 63 -160z" />
                <path d="M7000 450 l0 -430 265 0 265 0 0 85 0 85 -170 0 -170 0 0 345 0 345
-95 0 -95 0 0 -430z" />
            </g>
        </svg>
    ),
    company3: (props: LucideProps) => (
        <svg {...props} width="1821" height="309" viewBox="0 0 1821 309" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_574_2)">
                <path d="M636.491 232.657H538.448L526.368 267.171C524.403 272.788 517.748 277.383 511.581 277.383H458.625C452.459 277.383 449.267 272.875 451.535 267.364L547.509 34.0849C549.774 28.5737 556.676 24.0648 562.845 24.0648H612.505C618.672 24.0648 625.568 28.5762 627.826 34.09L723.418 267.358C725.677 272.872 722.479 277.383 716.313 277.383H663.358C657.191 277.383 650.536 272.788 648.57 267.171L636.491 232.657ZM619.188 182.784L587.468 90.956L555.751 182.784H619.188ZM949.151 277.383C942.983 277.383 935.325 273.235 932.134 268.164L886.857 196.243L841.582 268.164C838.389 273.235 830.731 277.383 824.564 277.383H760.072C753.905 277.383 751.724 273.392 755.227 268.515L842.367 147.162L762.918 33.0208C759.491 28.0951 761.732 24.0648 767.899 24.0648H827.446C833.613 24.0648 841.316 28.1871 844.562 33.2258L886.857 98.874L928.774 33.2476C932 28.197 939.687 24.0648 945.854 24.0648H1005.81C1011.98 24.0648 1014.21 28.0849 1010.76 32.9984L930.934 146.765L1018.48 268.519C1021.99 273.394 1019.81 277.383 1013.64 277.383H949.151ZM1132.94 266.608C1132.94 272.535 1127.9 277.383 1121.73 277.383H1074.13C1067.96 277.383 1062.91 272.535 1062.91 266.608V34.8391C1062.91 28.9133 1067.96 24.0648 1074.13 24.0648H1121.73C1127.9 24.0648 1132.94 28.9133 1132.94 34.8391V266.608ZM1175.12 149.932C1175.12 76.312 1232.79 16.9412 1321.35 16.9412C1409.92 16.9412 1467.59 76.312 1467.59 149.932C1467.59 223.949 1409.92 283.321 1321.35 283.321C1232.79 283.321 1175.12 223.949 1175.12 149.932ZM1395.92 149.932C1395.92 111.54 1367.9 76.7066 1321.35 76.7066C1275.22 76.7066 1246.79 111.54 1246.79 149.932C1246.79 188.328 1275.22 223.949 1321.35 223.949C1367.49 223.949 1395.92 188.328 1395.92 149.932ZM1766.49 277.383C1760.33 277.383 1754.63 272.575 1753.83 266.698L1735.51 130.935L1682.58 267.288C1680.43 272.841 1673.62 277.383 1667.45 277.383H1644.15C1637.98 277.383 1631.18 272.836 1629.05 267.279L1576.09 129.746L1557.75 266.696C1556.96 272.575 1551.27 277.383 1545.1 277.383H1500.38C1494.22 277.383 1489.86 272.58 1490.7 266.709L1523.89 34.7389C1524.73 28.8682 1530.47 24.0648 1536.63 24.0648H1578.05C1584.22 24.0648 1591.06 28.5973 1593.25 34.1375L1655.59 191.889L1718.33 34.1297C1720.52 28.5938 1727.38 24.0648 1733.53 24.0648H1774.96C1781.13 24.0648 1786.87 28.8682 1787.71 34.7389L1820.9 266.709C1821.74 272.58 1817.38 277.383 1811.21 277.383H1766.49ZM354.75 215.609L278.412 87.8475C274.911 81.9755 266.285 77.1714 259.242 77.1714H211.583C200.506 77.1714 195.965 69.6237 201.49 60.3991L227.626 16.7722C229.7 13.3099 229.695 9.04737 227.615 5.5887C225.534 2.13003 221.691 0 217.533 0H151.048C144.004 0 135.36 4.79349 131.836 10.6524L2.6449 225.448C-0.880053 231.307 -0.881407 240.895 2.63949 246.755L35.8815 302.08C41.4207 311.297 50.5038 311.308 56.0661 302.103L82.0403 259.123C87.6039 249.918 96.6855 249.928 102.225 259.146L125.773 298.338C129.294 304.198 137.937 308.992 144.98 308.992H298.613C305.653 308.992 314.298 304.198 317.819 298.338L354.711 236.941C358.232 231.081 358.249 221.482 354.75 215.609ZM251.654 209.46C257.159 218.696 252.599 226.254 241.522 226.254H122.021C110.944 226.254 106.412 218.712 111.951 209.494L171.747 109.977C177.286 100.759 186.349 100.76 191.888 109.978L251.654 209.46Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_574_2">
                    <rect width="1821" height="309" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    company4: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 1000 405" xmlns="http://www.w3.org/2000/svg" width="1000" height="405">
            <g fill="#1A1919" fillRule="evenodd">
                <path d="M219.76 136.638c12.601 0 22.817-10.216 22.817-22.819 0-12.602-10.216-22.819-22.818-22.819-12.603 0-22.819 10.217-22.819 22.819 0 12.603 10.216 22.819 22.82 22.819M275.042 214.199v-.019L151.863 91c-17.822 17.823-17.722 46.619.1 64.442l39.2 39.199-.066.067 22.215 22.214c.807.807 1.341 1.921 1.341 3.152 0 1.265-.59 2.386-1.437 3.197l-25.91 25.91a4.44 4.44 0 0 1-6.277 0l-25.993-25.993a4.439 4.439 0 0 1 0-6.278c17.734-18.925 4.497-41.58-3.696-49.255l-5.795-5.795L93.6 213.805a8.878 8.878 0 0 0 0 12.555l84.257 84.257a8.876 8.876 0 0 0 12.554 0l84.077-84.077a8.392 8.392 0 0 0 2.987-6.426c0-2.306-.93-4.395-2.433-5.915M391.643 195.22c-20.552-2.691-24.019-6.909-24.019-15.345 0-8.552 7.934-13.864 20.706-13.864 14.076 0 21.077 4.579 23.41 15.312l.072.332h11.858l-.06-.48c-2.016-15.886-14.545-24.635-35.28-24.635-19.13 0-33.015 10.228-33.015 24.321 0 17.686 16.456 22.317 34.235 24.686 18.518 2.603 24.164 6.447 24.164 16.454 0 9.39-9.543 16.205-22.69 16.205-20.702 0-24.914-9.122-26.382-18.979l-.054-.361h-12.73l.06.478c1.584 12.926 9.655 28.334 39.105 28.334 20.196 0 35.425-11.357 35.425-26.416 0-17.725-13.317-23.106-34.805-26.042M510.634 157.647H438.51v11.295h29.483v77.627h13.158v-77.627h29.483v-11.295M538.383 210.996l16.117-42.908 16.117 42.908h-32.234Zm8.326-53.349-35.206 88.922h12.518l9.781-25.374h41.255l9.922 25.374h13.081l-34.634-88.922H546.71ZM599.889 168.942h29.483v77.627h13.158v-77.627h29.483v-11.295h-72.124v11.295M704.369 207.499h24.97v-11.174h-24.97v-27.383h49.202v-11.295h-62.362v88.922h62.362v-11.295h-49.202v-27.775M788.082 157.647h-13.158v88.922h59.51v-11.295h-46.352v-77.627M895.257 157.647l-25.295 40.544-26.278-40.544h-14.907l34.258 50.2v38.722h13.159v-38.605l32.39-50.317h-13.327" />
            </g>
        </svg>
    ),
    company5: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 91 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.05 8.11L7.02 4.06 0 8.1V4.06L7.03 0l7.02 4.06V8.1z" fill="#A435F0" />
            <path d="M0 11.52h3.68v8.94a3.27 3.27 0 003.35 3.44 3.3 3.3 0 003.34-3.47v-8.91h3.68v9.15c0 2.13-.67 3.77-2 4.9a7.55 7.55 0 01-5.06 1.67 7.4 7.4 0 01-5.01-1.67C.67 24.44 0 22.87 0 20.77v-9.25zm45.87 11.11a5.57 5.57 0 01-3.83 1.48c-2.64 0-4.41-1.5-4.61-3.83h11.89s.08-.76.08-1.46c0-2.2-.7-4.02-2.13-5.5a7.13 7.13 0 00-5.45-2.23 7.9 7.9 0 00-5.78 2.22 7.93 7.93 0 00-2.25 5.87v.12c0 2.4.76 4.32 2.25 5.75a8.17 8.17 0 005.87 2.16c2.8 0 5.02-1.1 6.69-3l-2.73-1.58zm-7-7.46a4.7 4.7 0 012.95-.98c1.07 0 1.95.34 2.7 1a3 3 0 011.16 2.23h-8.16c.12-.9.57-1.64 1.35-2.25zm44.04 14.1C81.41 32.8 79.86 34 77.46 34H75.8v-3.26h1.34c.83 0 1.6-.31 2.32-2l.73-1.68-6.3-15.54h3.75L82.1 22.7l4.6-11.2h3.73L82.9 29.27zM28.38 5.66v7.26a7.58 7.58 0 00-4.9-1.73c-2.16 0-3.98.76-5.47 2.31a7.87 7.87 0 00-2.2 5.69 8 8 0 002.2 5.72 7.37 7.37 0 005.47 2.28c2.5 0 4.06-.98 4.9-1.75v1.42h3.65V5.65h-3.65zm-1.1 16.88c-.88.88-2 1.34-3.31 1.34a4.4 4.4 0 01-3.26-1.34c-.85-.89-1.27-2.01-1.27-3.35 0-1.34.42-2.46 1.27-3.34.88-.89 1.95-1.34 3.26-1.34s2.43.45 3.31 1.34c.91.88 1.37 2 1.37 3.34 0 1.34-.46 2.47-1.37 3.35zM68.22 11.2a6.39 6.39 0 00-5.2 2.26c-.4-.75-1.5-2.26-4.1-2.26a5.17 5.17 0 00-4.14 1.9v-1.59h-3.62v15.33h3.62v-8.82c0-2.07 1.28-3.56 2.98-3.56 1.74 0 2.74 1.3 2.74 3.4v8.98h3.62v-8.82c0-2.1 1.24-3.56 3.04-3.56 1.73 0 2.73 1.3 2.73 3.4v8.97h3.65v-9.48c0-4-2.14-6.15-5.32-6.15z" fill="#000" />
        </svg>
    ),
    company6: (props: LucideProps) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2159 500">
            <path fill="#13171B" d="M615.473 158.84c5.214 4.374 9.075 9.323 12.898 14.937 1.439 2.318 1.439 2.318 3.629 3.223l.148-2.938c.4-7.362.951-14.68 1.852-22l.251-2.095c.623-4.841.623-4.841 1.749-5.967 2.219-.088 4.44-.107 6.66-.098l2.014.005c2.13.005 4.259.018 6.389.03A3970.043 3970.043 0 0 1 666 144a82745 82745 0 0 1 .103 79.202c.01 12.26.024 24.52.047 36.78.02 10.692.033 21.385.037 32.079.003 5.655.009 11.31.023 16.965.014 5.338.018 10.675.015 16.013 0 1.944.005 3.89.012 5.834.11 29.078-2.49 59.37-23.863 81.315-17.988 17.689-44.26 24.8-68.984 25.05l-2.427.03c-33.444.324-33.444.324-47.964-4.268l-3.613-1.133c-19.789-7.022-36.24-18.861-46.2-37.617C468.906 385.208 466 376.062 466 366h35l5 13c9.123 14.307 22.304 21.295 38.469 25.254 4.537.959 8.899 1.58 13.531 1.746l2.973.121c19.026.393 38.732-3.004 53.27-16.148 11.47-11.97 15.922-28.186 15.855-44.438l-.005-2.055c-.005-2.14-.018-4.278-.03-6.418-.006-1.461-.01-2.923-.014-4.384-.011-3.56-.028-7.119-.049-10.678l-1.795 2.237-2.396 2.962-2.358 2.925C609.626 346.348 590.89 353.948 570 356c-25.036 1.745-53.63-2.994-73.285-19.71-3.005-2.666-5.858-5.468-8.715-8.29l-1.984-1.766c-17.071-15.504-24.97-41.86-26.239-64.145-.14-4.217-.164-8.432-.152-12.651l.002-2.26c.04-12.089.853-23.54 4.373-35.178l.633-2.126c4.991-16.11 13.6-28.961 25.367-40.874l1.762-1.98c29.833-32.84 89.826-33.393 123.71-8.18Zm-99.262 31.765c-17.097 17.898-21.903 39.863-21.461 63.903.412 11.893 2.987 22.763 8.25 33.492l1.152 2.387c8.107 15.64 20.942 26.21 37.536 31.87 17.938 5.348 37.3 4.013 54.125-4.32 17.137-10.038 28.25-25.977 33.335-45.039 5.407-24.75 2.876-50.486-10.96-72.148-9.673-13.8-23.455-23.984-40.204-27.128-22.91-3.879-44.403.756-61.773 16.983ZM1908.748 141.76c2.153-.01 4.305-.04 6.457-.072 23.198-.18 44.74 5.894 62.045 21.937 17.273 18.107 19.04 41.261 19.024 65.012 0 3.451.012 6.902.03 10.354.045 9.803.07 19.606.077 29.41.005 6.019.03 12.038.065 18.057.01 2.286.012 4.573.007 6.86-.007 3.19.01 6.379.033 9.568l-.025 2.848c.07 5.533.643 9.007 4.539 13.266 6.277 2.805 6.277 2.805 19 3v31l-14.688.25-4.545.11c-9.733.08-20.31-.541-28.33-6.735-6.035-6.5-8.088-13.202-10.437-21.625l-1.547 1.871c-15.02 17.496-34.586 27.16-57.453 29.129-22.73 1.136-48.9-1.392-66.798-16.939-13.133-11.959-18.983-24.608-20.386-42.39-.54-17.161 4.818-34.223 16.446-47.023 19.35-18.35 47.052-21.017 72.39-20.843l4.913.008c4.256.008 8.512.027 12.769.05 4.364.02 8.729.03 13.094.04 8.524.02 17.048.055 25.572.097-.12-3.7-.256-7.399-.395-11.098l-.101-3.16c-.502-12.857-4.28-22.059-13.692-30.93-12.222-9.902-29.04-11.7-44.198-10.418-14.008 1.487-27.172 6.139-36.712 16.993-4.247 5.744-6.118 10.654-8.902 17.613h-34c1.933-19.333 9.196-35.258 24.305-47.934 18.273-13.45 39.102-18.246 61.443-18.306Zm-50.81 129.115c-5.628 7.16-7.817 16.1-6.938 25.125 2.204 10.486 7.214 17.83 16 24 17.977 8.73 39.41 8.138 58.129 1.969 14.487-5.477 25.403-15.31 31.84-29.446L1958 290l.969-2.336c2.213-6.495 2.176-12.772 2.105-19.55l-.016-2.951c-.014-2.388-.033-4.775-.058-7.163-8.98-.07-17.962-.123-26.943-.155a2778.77 2778.77 0 0 1-12.515-.071c-4.04-.033-8.08-.05-12.119-.059a639.1 639.1 0 0 1-4.582-.032c-16.223-.167-35.044.616-46.904 13.192ZM857 153l2.754 1.398c21.417 11.895 34.879 31.84 41.727 54.96 2.453 8.725 3.66 17.116 4.207 26.142l.147 2.337c.309 6.27-.253 11.758-.835 18.163H743c3.687 26.282 3.687 26.282 17 48l1.867 2.203c9.89 10.752 24.546 16.986 39.066 17.922 18.305.685 35.11-2.134 49.505-14.438 8.2-7.958 12.076-15.922 16.562-26.687h35c-3.376 16.878-9.6 31.038-21 44l-1.984 2.273c-15.854 16.986-38.282 25.709-61.258 26.837-31.775.824-59.425-6.888-82.946-28.86-22.392-23.573-28.545-53.96-28.058-85.54.837-29.547 11.394-55.71 32.7-76.401C770.653 137.027 820.428 134.323 857 153Zm-98.504 40.82c-8.45 10.665-11.25 19.699-13.496 33.18h125c-3.426-18.271-7.937-31.554-22.629-43.059-28.015-18.962-66.117-15.755-88.875 9.88ZM1476 159c4.29 3.373 8.17 7.119 12 11l2.02 2.023c17.564 18.794 24.196 45.31 24.105 70.352l.012 3.309-.004 3.152-.004 2.86C1514 254 1514 254 1513 256h-161c2.372 21.35 6.097 40.73 23.344 54.93 15.372 11.334 33.984 15.447 52.824 12.76 15.18-2.745 28.878-9.13 38.125-21.842 4.057-6.333 6.266-11.524 8.707-18.848h35c-.704 6.335-1.39 11.133-3.625 16.875l-.805 2.093c-8.77 21.933-26.323 37.726-47.507 47.344-24.736 10.149-55.504 9.26-80.47.196-10.553-4.428-20.081-9.775-28.593-17.508l-2.703-2.422c-18.293-17.271-29.267-42.105-30.474-67.268-.56-36.098 3.723-67.598 29.654-94.92 33.748-31.879 92.742-35.217 130.523-8.39Zm-109 35c-7.319 9.591-13 20.764-13 33h124c-1.657-18.226-8.095-31.104-22-43-28.006-20.326-66.22-14.785-89 10ZM1090 67h34l1 108 7-9c12.857-14.07 30.177-22.973 49.259-24.211 26.024-1.005 50.682 2.357 70.928 20.274 16.24 15.137 23.115 37.286 24.813 58.937.135 4.38.127 8.757.114 13.139v3.905c0 3.508-.006 7.016-.013 10.523-.006 3.676-.006 7.351-.008 11.027-.003 6.948-.01 13.896-.021 20.845-.011 7.915-.017 15.83-.022 23.746-.01 16.272-.028 32.543-.05 48.815h-34l-.06-10.762a26637.34 26637.34 0 0 0-.228-35.347c-.05-7.138-.096-14.276-.134-21.414-.033-6.23-.073-12.459-.12-18.688a3150.44 3150.44 0 0 1-.061-9.874c-.033-37.39-.033-37.39-17.46-69.665-10.286-9.53-24.78-13.12-38.437-13.625-15.466.594-30.52 5.328-42 16-19.195 21.13-19.789 47.887-19.914 74.898a8637.209 8637.209 0 0 0-.175 25.704c-.039 6.852-.088 13.703-.138 20.555-.103 14.072-.191 28.145-.273 42.218h-34V67ZM389.688 164.313C410.145 181.708 421.704 205.577 425 232c.208 4.724.228 9.447.24 14.176.01 2.225.04 4.449.072 6.674.1 13.349-1.618 26.175-6.437 38.713l-.91 2.394C412.7 307.292 405.15 317.966 395 328l-2.395 2.426c-19.696 18.913-46.763 26.189-73.529 25.926-25.28-.757-49.016-8.343-68.076-25.352-.82-.726-1.64-1.451-2.484-2.2-18.422-17.305-29.596-43.574-30.639-68.76-.745-30.648 3.212-58.348 23.123-83.04l2.05-2.55c35.832-42.12 104.725-43.056 146.637-10.137Zm-114.825 25.699c-16.193 17.28-22.446 39.397-22.078 62.629.436 12.025 3.211 23.42 8.215 34.359l1.27 2.824C269.77 304.976 283.173 316.3 299 322c18.675 5.657 37.925 4.213 55.3-4.674 6.046-3.29 10.94-7.354 15.7-12.326l1.879-1.785c14.556-14.817 18.397-37.249 18.44-57.091-.22-18.014-5.1-34.84-16.319-49.124l-1.734-2.305c-10.268-12.68-26.11-20.14-42.079-22.132-20.062-2.038-40.37 3.485-55.324 17.449ZM101 86h34v58h53v32h-53c.063 16.664.138 33.328.236 49.992.045 7.738.084 15.476.11 23.214.023 6.748.057 13.495.103 20.242.024 3.57.042 7.14.049 10.71.007 3.993.037 7.986.07 11.978l-.005 3.558c.086 7.515.551 14.675 5.375 20.743 6.507 4.93 13.752 4.728 21.617 4.88l2.732.062c2.862.065 5.725.125 8.588.183l5.844.131c4.76.108 9.52.207 14.281.307v31c-7.256.092-14.51.172-21.765.22-2.461.02-4.923.047-7.384.082-37.527.518-37.527.518-51.835-12.044-10.755-11.077-12.327-26.282-12.243-40.948v-4.082c-.002-3.67.01-7.338.024-11.007.013-3.843.014-7.687.016-11.53.006-7.268.023-14.535.043-21.802.022-8.278.033-16.556.043-24.834.021-17.019.058-34.037.101-51.055H63v-32h38V86ZM961 86h34v58h53v32h-53c.086 16.403.18 32.807.288 49.21.05 7.617.096 15.234.134 22.85.033 6.643.073 13.284.12 19.926.026 3.514.048 7.028.061 10.543.016 3.93.046 7.86.078 11.791l.007 3.5c.053 12.362.053 12.362 5.312 23.18 7.132 3.698 13.604 4.166 21.457 4.316l2.736.063c2.873.066 5.746.125 8.62.183l5.857.131c4.777.108 9.553.207 14.33.307v31c-7.256.092-14.51.172-21.765.22-2.461.02-4.923.047-7.384.082-37.856.523-37.856.523-51.613-11.892-11.057-11.837-12.715-27.99-12.579-43.484V293.9c-.002-3.594.016-7.188.037-10.782.019-3.774.02-7.548.024-11.323.01-7.125.034-14.25.064-21.375.034-8.121.05-16.242.065-24.364.031-16.685.086-33.37.151-50.056h-38v-32h38V86ZM1555 144h31l4 28c4.656-4.446 4.656-4.446 6.96-7.531 10.525-12.742 26.635-18.625 42.58-20.286 4.34-.323 8.673-.287 13.023-.245L1662 144v34c-12.75.313-12.75.313-16.69.388-13.6.422-26.567 3.12-36.935 12.424-13.875 14.834-17.476 36.261-17.58 55.815l-.03 3.49a6415.62 6415.62 0 0 0-.081 11.38l-.063 7.906c-.05 6.219-.095 12.437-.138 18.656-.05 7.084-.105 14.167-.16 21.25-.114 14.564-.22 29.128-.323 43.691h-35V144ZM2057 144h34v209h-34V144Z" />
            <path fill="#0262F2" d="M1737 291c8.363 4.823 13.282 11.64 15.938 20.875 2.078 9.893.687 17.515-4.141 26.39-5.07 7.715-12.428 12.344-21.39 14.301-8.447 1.153-16.363-.36-23.844-4.441-6.967-5.777-12.966-11.977-14.563-21.125-.873-11.015.163-19.604 7.25-28.313 10.431-11.056 26.871-14.774 40.75-7.687Z" />
            <path fill="#13171B" d="M2085.5 65.5c5.049 3.03 8.656 7.969 10.5 13.5.146 2.268.221 4.54.25 6.813l.078 3.644c-.59 6.378-3.514 10.477-8.328 14.543-6.045 4.228-11.756 4.837-19 4-6.188-1.114-9.718-4.1-13.59-8.969-3.997-5.757-4.296-12.224-3.41-19.031 2.26-7.125 5.563-11.304 12-15 6.491-2.164 15.167-2.291 21.5.5Z" />
        </svg>
    ),
    company7: (props: LucideProps) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 93 24">
            <g clip-path="url(#logo-full_svg__a)">
                <path fill="#FF6363" fill-rule="evenodd" d="M6 15.491v2.504l-6-6 1.251-1.251L6 15.49Zm2.504 2.504H6l6 6 1.251-1.251-4.747-4.749Zm14.24-4.747 1.253-1.253-12-12-1.25 1.256 4.747 4.747h-2.868L9.312 2.691 8.061 3.942l2.06 2.061h-1.44v9.314h9.314v-1.44l2.061 2.06 1.251-1.25-3.312-3.314v-2.87l4.749 4.745ZM6.626 5.374 5.37 6.627 6.714 7.97l1.252-1.252-1.34-1.344ZM17.282 16.03l-1.252 1.253 1.343 1.344 1.253-1.253-1.344-1.344ZM3.939 8.06 2.686 9.315 6 12.627v-2.506l-2.06-2.06ZM13.88 18h-2.506l3.313 3.314 1.253-1.253L13.88 18Z" clipRule="evenodd">
                </path>
                <path fill="#E6E6E6" d="M90.987 17.98c-.808 0-1.44-.219-1.89-.659-.452-.44-.678-1.05-.678-1.825v-4.8h-1.45V8.899h1.458l.26-2.4h1.707v2.4h2.227v1.8h-2.227v4.538a.948.948 0 0 0 .256.667.883.883 0 0 0 .68.278h1.29v1.799h-1.633ZM82.268 18.15c-1.077 0-1.944-.257-2.6-.77a3.45 3.45 0 0 1-1.259-2.049h2.143c.093.312.301.577.582.742.344.199.737.296 1.134.28 1.143 0 1.717-.32 1.717-.937 0-.308-.18-.544-.539-.706a6.034 6.034 0 0 0-1.302-.389 15.466 15.466 0 0 1-1.538-.376 2.669 2.669 0 0 1-1.314-.875c-.356-.427-.537-.987-.537-1.681a2.376 2.376 0 0 1 .905-1.903c.606-.505 1.446-.758 2.52-.757 1.074 0 1.92.24 2.56.719a3.222 3.222 0 0 1 1.215 1.94h-2.146c-.228-.571-.77-.857-1.624-.857-.917 0-1.373.287-1.373.86a.736.736 0 0 0 .386.64c.293.18.62.296.96.345.426.072.847.17 1.26.291.43.123.85.273 1.26.451.399.181.737.475.971.845.272.435.407.942.389 1.455a2.4 2.4 0 0 1-.96 1.974c-.639.504-1.576.757-2.81.758ZM75.88 9.636c-.66-.593-1.586-.89-2.773-.89-.95 0-1.745.255-2.386.766a3.586 3.586 0 0 0-1.28 1.979h2.026c.103-.297.3-.553.56-.728a1.786 1.786 0 0 1 1.072-.303 1.92 1.92 0 0 1 1.317.427 1.514 1.514 0 0 1 .48 1.197v.436h-2.31c-1.071 0-1.91.266-2.514.8a2.59 2.59 0 0 0-.907 2.019 2.663 2.663 0 0 0 .844 2.033c.564.534 1.31.8 2.24.8a3.42 3.42 0 0 0 1.658-.385c.411-.2.759-.51 1.005-.896h.083l.16 1.12h1.715v-5.92c.001-1.04-.329-1.858-.99-2.455Zm-.975 4.852a1.834 1.834 0 0 1-.6 1.44c-.397.353-.939.53-1.627.53-.5 0-.885-.114-1.149-.34a1.081 1.081 0 0 1-.4-.866c0-.8.523-1.197 1.55-1.197h2.226v.433ZM64.021 18.17c-1.3 0-2.338-.418-3.117-1.252-.776-.834-1.168-1.987-1.168-3.462 0-1.476.39-2.624 1.164-3.46.774-.835 1.816-1.25 3.121-1.25 1.06 0 1.94.282 2.637.849a4.017 4.017 0 0 1 1.389 2.147h-1.965a2.205 2.205 0 0 0-2.06-1.197 2.081 2.081 0 0 0-1.683.76c-.426.509-.64 1.226-.64 2.15 0 .925.214 1.643.64 2.152a2.08 2.08 0 0 0 1.682.764 2.21 2.21 0 0 0 2.06-1.2h1.966a4.025 4.025 0 0 1-1.39 2.15c-.694.565-1.573.848-2.636.848ZM52.43 21.432l1.371-3.43-3.683-9.082h2.143l2.486 6.427h.082l2.49-6.427h2.142l-4.975 12.512H52.43ZM48.267 9.636c-.66-.594-1.585-.89-2.774-.89-.949 0-1.744.255-2.386.766a3.57 3.57 0 0 0-1.27 1.979h2.024c.103-.297.299-.553.56-.728a1.794 1.794 0 0 1 1.072-.303c.556 0 .996.143 1.316.427a1.508 1.508 0 0 1 .48 1.197v.436h-2.32c-1.066 0-1.904.266-2.513.8a2.586 2.586 0 0 0-.909 2.019 2.663 2.663 0 0 0 .845 2.025c.563.534 1.31.8 2.24.8a3.412 3.412 0 0 0 1.656-.385c.412-.2.76-.51 1.006-.896h.082l.17 1.12h1.712v-5.92c0-1.035-.33-1.85-.99-2.447Zm-.978 4.852a1.834 1.834 0 0 1-.6 1.44c-.396.353-.94.53-1.628.53-.5 0-.885-.114-1.15-.34a1.086 1.086 0 0 1-.4-.866c.007-.796.523-1.195 1.55-1.197h2.228v.433ZM37.152 13.456c.306-.081.601-.197.88-.346.326-.178.631-.393.909-.64.336-.31.595-.693.757-1.12.194-.502.29-1.036.283-1.574 0-1.143-.365-2.058-1.094-2.746-.73-.688-1.68-1.03-2.848-1.027h-4.972v12h2.143v-4.454h1.625L37.923 18h2.4l-3.17-4.545ZM33.21 11.65v-3.76h2.654c.608 0 1.088.16 1.44.494.352.335.531.792.531 1.386 0 .594-.177 1.058-.534 1.389-.392.34-.9.517-1.42.491H33.21Z">
                </path>
            </g>
            <defs>
                <clipPath id="logo-full_svg__a">
                    <path fill="#fff" d="M0 0h92.622v24H0z">
                    </path>
                </clipPath>
            </defs>
        </svg>
    ),
};
