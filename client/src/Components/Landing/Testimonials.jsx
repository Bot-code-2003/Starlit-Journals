import React from "react";
import { Star } from "lucide-react";

const Testimonials = ({ darkMode }) => {
  return (
    <>
      <section className="z-10 w-full max-w-6xl py-24">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 border border-[#1A1A1A] dark:border-[#F8F1E9] text-xs font-medium tracking-wider">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "The daily emails have transformed my morning routine. I feel more focused and prepared for the day.",
              author: "Alex K.",
              role: "Marketing Director",
            },
            {
              quote:
                "Mood Grid helped me identify patterns in my stress levels. Now I can anticipate and manage them better.",
              author: "Jamie T.",
              role: "Software Engineer",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className={`p-8 ${
                darkMode ? "bg-[#2A2A2A]" : "bg-white"
              } shadow-sharp`}
            >
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="text-[#F4A261] fill-current"
                  />
                ))}
              </div>
              <p className="text-lg mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center ${
                    darkMode
                      ? "bg-[#F4A261] text-[#1A1A1A]"
                      : "bg-[#1A1A1A] text-white"
                  }`}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm opacity-70">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Testimonials;
