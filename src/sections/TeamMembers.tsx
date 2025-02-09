import MemberCard from "@/components/MemberCard";
import React from "react";

interface Member {
  role: string;
  name: string;
  color: string;
  imageSrc: string;
  bgSrc: string;
  bio?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

function TeamMembers() {
  const members: Member[] = [
    {
      role: "GDSC LEAD",
      name: "Rishabh Kumar",
      color: "#7E9EFF",
      bgSrc: "/assets/RectangleBlue.svg",
      imageSrc: "/assets/members/member2.png",
      bio: "Google Developer Student Clubs Lead, passionate about building tech communities.",
      social: {
        github: "https://github.com/rishabhkumar",
        linkedin: "https://linkedin.com/in/rishabhkumar",
        twitter: "https://twitter.com/rishabhkumar",
      },
    },
    {
      role: "WEB DEVELOPMENT LEAD",
      name: "Deepak Kumar",
      color: "#79F77D",
      bgSrc: "/assets/RectangleGreen.svg",
      imageSrc: "/assets/members/deepak-kumar.png",
      bio: "Web Development Lead with expertise in modern frontend frameworks and responsive design.",
      social: {
        github: "https://github.com/deepakkumar",
        linkedin: "https://linkedin.com/in/deepakkumar",
        twitter: "https://twitter.com/deepakkumar",
      },
    },
    {
      role: "APP DEVELOPMENT LEAD",
      name: "Chinmay Verma",
      color: "#FF5752",
      bgSrc: "/assets/RectangleRed.svg",
      imageSrc: "/assets/members/member3.png",
      bio: "Mobile App Development Lead specializing in cross-platform development.",
      social: {
        github: "https://github.com/chinmayverma",
        linkedin: "https://linkedin.com/in/chinmayverma",
        twitter: "https://twitter.com/chinmayverma",
      },
    },
    {
      role: "WEB DEVELOPMENT LEAD",
      name: "Deepak Kumar",
      color: "#79F77D",
      bgSrc: "/assets/RectangleYellow.svg",
      imageSrc: "/assets/members/member4.png",
      bio: "Web Development Lead with expertise in modern frontend frameworks and responsive design.",
      social: {
        github: "https://github.com/deepakkumar",
        linkedin: "https://linkedin.com/in/deepakkumar",
        twitter: "https://twitter.com/deepakkumar",
      },
    },
  ];

  return (
    <section className="">
      <div className="max-container">
        <div className=" mb-8">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            The{" "}
            <span className="from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
              Faces
            </span>{" "}
            Behind
            <br />
            GDG HIT
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            A student-led community exploring Google Developer technologies,
            fostering innovation, and empowering students through hands-on
            learning.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5 my-20 max-sm:my-5 max-sm:gap-10  max-md:grid-cols-3 max-sm:grid-cols-1 max-sm:p-4">
          {members.map((item, index) => (
            <MemberCard key={`${index} ${item.name}`} name={item.name} role={item.role} bio={item.bio || ""} imageSrc={item.imageSrc}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamMembers;
