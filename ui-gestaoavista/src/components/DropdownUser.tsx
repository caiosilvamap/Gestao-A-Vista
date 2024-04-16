import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { decryptData } from './componentsGTA/GTAKeep';
import IconSVG from './IconSVG/IconSVG';



const DropdownUser = () => {
    const userName = (localStorage.getItem('name') || '');
    const position = (localStorage.getItem('position') || '');


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>('');



    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    const getImg = () => {
        const binaryData = localStorage.getItem('S7si3CmkF6');

        if (binaryData) {
            setImgUrl(binaryData);
        }
    };


    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        getImg();
        document.addEventListener('click', clickHandler);
        return () => {

            document.removeEventListener('click', clickHandler);

        }
    }, []);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('hNwdWtdsAG');
        localStorage.removeItem('WWgg4r6TJr');
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('selectedDateBegin');
        localStorage.removeItem('selectedDateEnd');
        localStorage.removeItem('S7si3CmkF6');
        localStorage.removeItem('Ym46IXDTvd');

    };

    return (
        <div className="relative">
            <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                to="#"
            >

                <span className="h-12 w-12 rounded-full">
                    <div>
                        {imgUrl ? (
                            <div
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${imgUrl}`}
                                    alt="Profile Picture"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        ) : (
                            <div
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={"/src/images/profilePictureDefault/defaultProfile.png"}
                                    alt="Profile Picture"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </span>

                <svg
                    className={`hidden fill-current sm:block ${dropdownOpen ? 'rotate-180' : ''
                        }`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                        fill=""
                    />
                </svg>
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
            >

                <span className="m-2 p-2 text-right block">
                    <span className="block text-center text-sm font-medium text-black dark:text-white">
                        {userName}
                    </span>
                    <span className="block text-center text-xs">{position}</span>
                </span>

                <Link to={"/login"}>
                    <button className="flex items-center gap-3.5 p-2 m-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" onClick={handleLogout}>
                        <IconSVG src="/src/images/icon/icon-logOut.svg" className='dark:invert'/>
                        Log Out
                    </button>
                </Link>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );

};

export default DropdownUser;
