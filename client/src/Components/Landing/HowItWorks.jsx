import React from "react";
import { useDarkMode } from "../../context/ThemeContext";
import { PenSquare, Mail, BarChart2 } from "lucide-react";

const HowItWorks = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full py-12">
      <div className="text-center mb-12">
        <div className="inline-block mb-4 px-3 py-1 border border-[#1A1A1A] dark:border-[#F8F1E9] text-xs font-medium tracking-wider">
          THE PROCESS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        <p className="mt-4 text-base opacity-70 font-medium max-w-xl mx-auto">
          Three simple steps to mental clarity and improved focus
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {[
          {
            step: "01",
            title: "Sign Up & Journal",
            description:
              "Sign up easily and start journaling daily to capture your thoughts and emotions.",
            icon: <PenSquare size={24} />,
          },
          {
            step: "02",
            title: "Get Tailored Emails",
            description:
              "Receive daily emails customized to your focus peace, productivity, or mindfulness.",
            icon: <Mail size={24} />,
          },
          {
            step: "03",
            title: "Unlock Monthly Insights",
            description:
              "Get ai powered monthly reports and smart suggestions to boost your mental well-being.",
            icon: <BarChart2 size={24} />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-8 ${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-sharp`}
          >
            <div className="text-sm font-bold text-[#F4A261] mb-4">
              {item.step}
            </div>
            <div className="mb-4 opacity-80">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="opacity-70">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
