import { GlowingEffect } from "@/components/ui/glowing-effect";
import React, { ReactNode } from "react";

type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  borderColor: string;
};

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  borderColor,
}) => {
  return (
    <div className="relative gradient-card border-[1px] dark:border-white/5 rounded-xl">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div
        className={`group p-8 rounded-xl  transition-all duration-300 animate__animated animate__fadeInUp`}
      >
        <div
          className={`h-14 w-14 bg-gradient-to-br from-${borderColor}-500 to-${borderColor}-700 rounded-lg flex items-center justify-center mb-6`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-200 mb-4">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

type ListItemProps = {
  icon: ReactNode;
  text: string;
};

const ListItem: React.FC<ListItemProps> = ({ icon, text }) => {
  return (
    <li className="flex items-center">
      {icon}
      {text}
    </li>
  );
};

const InnovationIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const CommunityIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const ExcellenceIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-6 h-6 mr-3 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-6 h-6 mr-3 text-blue-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const MissionSection: React.FC = () => {
  const missionCards: CardProps[] = [
    {
      icon: <InnovationIcon />,
      title: "Innovation First",
      description:
        "Fostering a culture of innovation and creative problem-solving through technology and collaboration.",
      borderColor: "blue",
    },
    {
      icon: <CommunityIcon />,
      title: "Community Growth",
      description:
        "Building a strong, inclusive community of learners, developers, and tech enthusiasts.",
      borderColor: "red",
    },
    {
      icon: <ExcellenceIcon />,
      title: "Technical Excellence",
      description:
        "Striving for excellence in everything we do, from code to community engagement.",
      borderColor: "green",
    },
  ];

  const purposeItems: ListItemProps[] = [
    { icon: <CheckIcon />, text: "Empower students with technical skills" },
    { icon: <CheckIcon />, text: "Foster innovation and creativity" },
    { icon: <CheckIcon />, text: "Build a strong tech community" },
  ];

  const commitmentItems: ListItemProps[] = [
    { icon: <ShieldIcon />, text: "Quality learning experiences" },
    { icon: <ShieldIcon />, text: "Inclusive and diverse community" },
    { icon: <ShieldIcon />, text: "Continuous improvement" },
  ];

  return (
    <section id="mission" className="py-20">
      <div className="max-container">
        <div className="mb-8 flex flex-col items-center justify-center">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            Our Mission & Values
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            Guided by innovation, driven by community, committed to excellence
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 my-3">
          {missionCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="relative gradient-card border-[1px] dark:border-white/5 rounded-xl">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="p-8 ">
              <h3 className="text-2xl font-bold text-gray-200 mb-6">
                Our Purpose
              </h3>
              <ul className="space-y-4 text-gray-400">
                {purposeItems.map((item, index) => (
                  <ListItem key={index} {...item} />
                ))}
              </ul>
            </div>
          </div>
          <div className="relative gradient-card border-[1px] dark:border-white/5 rounded-xl">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className=" p-8 ro">
              <h3 className="text-2xl font-bold text-gray-200 mb-6">
                Our Commitment
              </h3>
              <ul className="space-y-4 text-gray-400">
                {commitmentItems.map((item, index) => (
                  <ListItem key={index} {...item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
