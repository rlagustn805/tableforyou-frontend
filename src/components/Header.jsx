import { useState, useEffect } from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { btn } from "../constants/style";
import { api } from "../services/api";
import MobileMenuBar from "./MobileMenuBar";

export default function Header({ test }) {
  const [showMobile, setShowMobile] = useState(null);
  const [menuBar, setMenuBar] = useState(false);
  const navigate = useNavigate();
  const { authenticated, nickname, accessToken } = useSelector(
    (state) => state.authToken,
  );

  const inView = useSelector((state) => state.inView);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleSize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setShowMobile(true);
      } else if (window.matchMedia("(min-width: 769px)").matches) {
        setShowMobile(false);
      }
    };

    handleSize();

    const mediaQueryLists = [
      window.matchMedia("(max-width: 768px)"),
      window.matchMedia("(min-width: 1024px)"),
    ];

    mediaQueryLists.forEach((mql) => {
      mql.addEventListener("change", handleSize);
    });

    return () => {
      mediaQueryLists.forEach((mql) => {
        mql.removeEventListener("change", handleSize);
      });
    };
  }, []);

  // const logout = () => {
  //   try {
  //     const res = api.get('/api/logout', {
  //       headers: {
  //         Authorization: `${accessToken.token}`
  //       }
  //     });

  //     console.log(res);
  //     navigate('/');
  //   } catch (err) {
  //     alert(JSON.stringify(err.response.data.message));
  //   }
  // }

  return (
    <header
      className={
        isHomePage
          ? `fixed left-0 top-0 z-20 flex h-20 w-full items-center justify-between px-5 md:px-14 lg:px-28 xl:px-44 2xl:px-72 ${isHomePage && inView ? undefined : "border-b bg-white"}`
          : `relative z-20 flex h-20 items-center justify-between border-b px-5 md:px-14 lg:px-28 xl:px-44 2xl:px-72`
      }
    >
      <div>
        <span
          className={`cursor-pointer text-2xl font-bold ${isHomePage && inView ? "text-white" : "text-tomato-color"}`}
          onClick={() => navigate("/")}
        >
          Table For You
        </span>
      </div>
      <div>
        {!showMobile ? (
          authenticated ? (
            <div className="relative">
              <div
                className={`${btn} flex items-center gap-1 ${isHomePage && inView && "bg-white"}`}
                onClick={() => setMenuBar(!menuBar)}
              >
                <span className="text-sm">{nickname}</span>
                <span className="material-symbols-outlined">menu</span>
              </div>
              {menuBar && (
                <div className="absolute h-40 w-[15vw] rounded-lg bg-white shadow-md">
                  <div className="flex cursor-pointer items-center justify-between border-b p-2 text-sm hover:bg-gray-100">
                    <p>{nickname}님 반가워요👋</p>
                    <span className="material-symbols-outlined cursor-pointer">
                      arrow_circle_right
                    </span>
                  </div>
                  <div className="mt- cursor-pointer border-b p-2 text-sm hover:bg-gray-100">
                    <p>로그아웃</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              style={`text-sm ${inView && "bg-white"}`}
            >
              로그인
            </Button>
          )
        ) : (
          <Button
            style={`material-symbols-outlined ${isHomePage && inView && "bg-white"}`}
            onClick={() => console.log("test")} //클릭시 모바일 메뉴 오른쪽에서 왼쪽으로 슬라이드 하며 나오게 해야 함.
          >
            menu
          </Button>
        )}
      </div>
    </header>
  );
}
