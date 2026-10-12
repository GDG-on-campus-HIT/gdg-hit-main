"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MemberCard from "@/components/MemberCard";
import MemberPhoto from "@/components/MemberPhoto";
import { GradientWord, Reveal, SectionLink } from "@/components/home/primitives";
import { useMemberQuery } from "@/redux/features/api/member/memberApi";

interface Member {
  profile_image: { public_id: string; url: string };
  _id: string;
  name: string;
  department: string;
  designation: string;
  batch: string;
  bio: string;
  linkedin_url: string;
}

type MemberGroup = Member[] | Record<string, Member[]>;

interface MembersState {
  founder?: Member[];
  facultyCoOrdinator?: Member[];
  coreTeam?: Member[];
  techTeam?: Record<string, Member[]>;
  mediaTeam?: Record<string, Member[]>;
  prTeam?: Member[];
}

const ALL = "all";

const TEAMS = [
  {
    key: "core",
    tab: "Core team",
    title: "Core team",
    description: "The organisers, leads and heads who run GDG HIT day to day.",
    source: "coreTeam",
  },
  {
    key: "tech",
    tab: "Tech",
    title: "Tech team",
    description: "Building the club's websites, apps and machine learning projects.",
    source: "techTeam",
  },
  {
    key: "media",
    tab: "Media",
    title: "Media team",
    description: "The designers, editors and writers behind everything you see from us.",
    source: "mediaTeam",
  },
  {
    key: "pr",
    tab: "PR",
    title: "Public relations",
    description: "Our voice on campus and beyond: outreach, partnerships and community.",
    source: "prTeam",
  },
  {
    key: "founders",
    tab: "Founders",
    title: "Founders",
    description: "The people who started GDG on Campus HIT and set its direction.",
    source: "founder",
  },
] as const satisfies readonly {
  key: string;
  tab: string;
  title: string;
  description: string;
  source: keyof MembersState;
}[];

type TeamKey = (typeof TEAMS)[number]["key"];

const SUBGROUP_LABELS: Record<string, string> = {
  webDeveloper: "Web development",
  appDeveloper: "App development",
  machineLearning: "Machine learning",
  techMember: "Technical members",
  videoEditor: "Video editing",
  graphicDesigner: "Graphic design",
  contentWriter: "Content writing",
  photographer: "Photography",
};

const subgroupLabel = (key: string) =>
  SUBGROUP_LABELS[key] ??
  key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());

const toGroups = (group?: MemberGroup) => {
  if (!group) return [];
  if (Array.isArray(group)) return [{ key: "all", label: null, members: group }];
  return Object.entries(group).map(([key, members]) => ({ key, label: subgroupLabel(key), members }));
};

const matches = (member: Member, search: string) =>
  !search ||
  [member.name, member.designation, member.department]
    .filter(Boolean)
    .some((field) => field.toLowerCase().includes(search));

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

export default function MembersPage() {
  const { isLoading, isError, data, refetch } = useMemberQuery({});
  const members = data?.members as MembersState | undefined;
  const [team, setTeam] = useState<TeamKey | typeof ALL>(ALL);
  const [query, setQuery] = useState("");

  const search = query.trim().toLowerCase();
  const isFiltering = team !== ALL || search !== "";

  const sections = useMemo(
    () =>
      TEAMS.filter((t) => team === ALL || t.key === team)
        .map((t) => {
          const groups = toGroups(members?.[t.source])
            .map((group) => ({ ...group, members: group.members.filter((m) => matches(m, search)) }))
            .filter((group) => group.members.length > 0);
          const total = new Set(groups.flatMap((group) => group.members.map((m) => m._id))).size;
          return { ...t, groups, total };
        })
        .filter((section) => section.total > 0),
    [members, team, search]
  );

  const faculty = team === ALL ? (members?.facultyCoOrdinator ?? []).filter((m) => matches(m, search)) : [];

  const totalMembers = useMemo(() => {
    if (!members) return 0;
    const ids = new Set<string>();
    Object.values(members).forEach((group: MemberGroup | undefined) =>
      toGroups(group).forEach(({ members: list }) => list.forEach((m) => ids.add(m._id)))
    );
    return ids.size;
  }, [members]);

  const resultCount = new Set([
    ...faculty.map((m) => m._id),
    ...sections.flatMap((s) => s.groups.flatMap((g) => g.members.map((m) => m._id))),
  ]).size;

  const clearFilters = () => {
    setTeam(ALL);
    setQuery("");
  };

  return (
    <div className="relative isolate overflow-hidden pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-14rem] h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-500/20 via-blue-500/15 to-green-500/20 opacity-50 blur-[140px] dark:opacity-30" />
      </div>

      <section className="max-container pb-24 pt-12 md:pt-20">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="white-gradient-text text-4xl leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
              The <GradientWord accent="yellow">Faces</GradientWord>
              <br className="hidden sm:block" /> Behind GDG HIT
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Get to know the passionate leaders driving GDG HIT, fostering innovation,
              collaboration, and growth within our tech community.
            </p>
          </div>
          {totalMembers > 0 && (
            <dl className="flex gap-10 md:text-right">
              <div>
                <dt className="text-sm text-neutral-500">Members</dt>
                <dd className="mt-1 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                  {totalMembers}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-neutral-500">Teams</dt>
                <dd className="mt-1 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                  {TEAMS.filter((t) => t.key !== "founders").length}
                </dd>
              </div>
            </dl>
          )}
        </Reveal>

        {isLoading && !members ? (
          <LoadingState />
        ) : isError && !members ? (
          <div className="mt-16 rounded-3xl border border-dashed border-black/15 p-12 text-center dark:border-white/10">
            <p className="text-neutral-600 dark:text-neutral-400">We couldn&apos;t load the team right now.</p>
            <button
              onClick={() => refetch()}
              className="mt-4 text-sm font-medium text-neutral-900 underline decoration-blue-500 underline-offset-4 hover:decoration-2 dark:text-white"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            {!isFiltering &&
              faculty.map((member) => (
                <Reveal key={member._id} className="mt-12 md:mt-16" delay={0.1}>
                  <FacultyCard member={member} />
                </Reveal>
              ))}

            <div className="mt-20 flex flex-col-reverse gap-6 border-b border-black/10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
              <div
                role="tablist"
                aria-label="Filter members by team"
                className="-mb-px flex gap-6 overflow-x-auto [scrollbar-width:none] md:gap-8"
              >
                {[{ key: ALL, tab: "All teams" }, ...TEAMS].map((item) => {
                  const active = team === item.key;
                  return (
                    <button
                      key={item.key}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTeam(item.key as TeamKey | typeof ALL)}
                      className={cn(
                        "relative shrink-0 whitespace-nowrap pb-4 text-sm font-medium transition-colors",
                        active
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                      )}
                    >
                      {item.tab}
                      <span
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-yellow-500 transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <label className="relative flex items-center border-b border-black/10 pb-3 dark:border-white/10 md:mb-4 md:w-72 md:border-0 md:pb-0">
                <Search className="pointer-events-none absolute left-0 h-4 w-4 text-neutral-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or role"
                  aria-label="Search members"
                  className="w-full bg-transparent py-1 pl-7 pr-7 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none dark:text-white [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-0 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
            </div>

            {search && (
              <p className="mt-6 text-sm text-neutral-500">{plural(resultCount, "member")} found</p>
            )}

            {isFiltering && faculty.length > 0 && (
              <div className="mt-10 space-y-6">
                {faculty.map((member) => (
                  <FacultyCard key={member._id} member={member} />
                ))}
              </div>
            )}

            {sections.length === 0 && faculty.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-dashed border-black/15 p-12 text-center dark:border-white/10">
                <p className="text-neutral-600 dark:text-neutral-400">No one matches your search.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm font-medium text-neutral-900 underline decoration-yellow-500 underline-offset-4 hover:decoration-2 dark:text-white"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="mt-6">
                {sections.map((section, index) => (
                  <section
                    key={section.key}
                    aria-labelledby={`team-${section.key}`}
                    className={cn(
                      index === 0 ? "pt-8 md:pt-12" : "mt-16 border-t border-black/10 pt-14 dark:border-white/10 md:mt-24 md:pt-20"
                    )}
                  >
                    <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div className="max-w-2xl">
                        <h2
                          id={`team-${section.key}`}
                          className="white-gradient-text text-3xl leading-tight tracking-tight md:text-4xl"
                        >
                          {section.title}
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {section.description}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm text-neutral-500">{plural(section.total, "member")}</p>
                    </Reveal>

                    <div className="mt-10 space-y-14">
                      {section.groups.map((group) => (
                        <div key={group.key}>
                          {group.label && (
                            <h3 className="mb-6 flex items-baseline gap-3 text-lg font-medium text-neutral-900 dark:text-white">
                              {group.label}
                              <span className="text-sm font-normal text-neutral-500">{group.members.length}</span>
                            </h3>
                          )}
                          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {group.members.map((member, memberIndex) => (
                              <Reveal key={member._id} delay={0.04 * (memberIndex % 4)}>
                                <MemberCard
                                  id={member._id}
                                  name={member.name}
                                  role={member.designation}
                                  bio={member.bio || ""}
                                  imageSrc={member.profile_image?.url}
                                  linkedin={member.linkedin_url}
                                />
                              </Reveal>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function FacultyCard({ member }: { member: Member }) {
  return (
    <article className="gradient-card group relative flex flex-col gap-8 overflow-hidden rounded-3xl border border-black/5 p-6 dark:border-white/5 sm:p-8 md:flex-row md:items-center md:gap-14 md:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-500/10 blur-[100px]"
      />
      <div className="relative isolate flex aspect-square w-full max-w-[280px] shrink-0 items-center justify-center overflow-hidden">
        <img
          src="/assets/Rectangle.svg"
          alt=""
          aria-hidden
          className="absolute bottom-0 -z-10 w-full opacity-20 transition-opacity duration-500 group-hover:opacity-0 dark:opacity-80"
        />
        <img
          src="/assets/RectangleGreen.svg"
          alt=""
          aria-hidden
          className="absolute bottom-0 -z-10 w-full opacity-0 saturate-[0.85] transition-opacity duration-500 group-hover:opacity-70 dark:group-hover:opacity-60"
        />
        <MemberPhoto
          src={member.profile_image?.url}
          name={member.name}
          tone="green"
          className="aspect-square h-auto object-contain object-bottom transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03] dark:grayscale dark:group-hover:grayscale-0"
        />
      </div>
      <div className="relative flex flex-col justify-center">
        <p className="text-sm font-medium text-green-600 dark:text-green-400">
          {member.designation || "Faculty co-ordinator"}
          {member.department && <span className="text-neutral-500"> · {member.department}</span>}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          {member.name.replace(/\s+/g, " ").trim()}
        </h2>
        {member.bio && (
          <p className="mt-5 line-clamp-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {member.bio}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <SectionLink href={`/members/${member._id}`}>View profile</SectionLink>
          {member.linkedin_url && (
            <Link
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-600 underline decoration-black/20 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-[#0A66C2] dark:text-neutral-400 dark:decoration-white/20 dark:hover:text-white"
            >
              LinkedIn
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function LoadingState() {
  return (
    <div className="mt-12 md:mt-16">
      <div className="gradient-card h-[420px] animate-pulse rounded-3xl border border-black/5 dark:border-white/5 md:h-[380px]" />
      <div className="mt-20 h-px bg-black/10 dark:bg-white/10" />
      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-full">
            <div className="aspect-square w-full animate-pulse rounded-2xl bg-neutral-200/60 dark:bg-white/[0.03]" />
            <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-neutral-200/60 dark:bg-white/[0.05]" />
            <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-neutral-200/60 dark:bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}
