"use client";

import { useEffect, useRef, useState } from "react";
import { User, Mail, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function ProfileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");

        console.log("Profile Response:", res);
console.log("Profile Data:", res.data);

        const profile =
          res.data.user ||
          res.data.data ||
          res.data;

        setUser(profile);

        localStorage.setItem(
          "user",
          JSON.stringify(profile)
        );
      } catch (error) {
        console.log(error);

        const saved = localStorage.getItem("user");

        if (saved) {
          setUser(JSON.parse(saved));
        }
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener(
        "mousedown",
        close
      );
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    router.push("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 mr-10 rounded-full bg-indigo-600 text-white flex items-center justify-center"
      >
        <User size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border z-50">
          <div className="p-5 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="text-indigo-600" />
              </div>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900">
                  {user?.name ||
                    user?.fullName ||
                    "No Name"}
                </h3>

                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <Mail size={14} />
                  {user?.email ||
                    "No Email"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="w-full text-left px-5 py-3 hover:bg-gray-100"
          >
            My Profile
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-5 py-3 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}