import React from 'react';
import { Users, Code, Rocket, Target, Globe, Sparkles } from 'lucide-react';


const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white relative overflow-hidden">
            
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
                <div className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-red-500/5 blur-3xl" />
                <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-yellow-500/5 blur-3xl" />
            </div>

            <div className="relative">
                {/* Hero Section */}
                <section className="pt-20 pb-16 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col items-center text-center mb-20">
                            <div className="relative mb-8 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                                <div className="relative w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                    <Code className="w-12 h-12 text-gray-800 dark:text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                            </div>
                            <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                                About Us
                            </h1>
                            <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
                                Empowering students to innovate, create, and grow together through technology
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {[
                                { number: "500+", label: "Active Members" },
                                { number: "50+", label: "Events Hosted" },
                                { number: "20+", label: "Projects Completed" }
                            ].map((stat, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                        <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{stat.number}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* What We Do Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {[
                                {
                                    icon: <Code />,
                                    title: "Technical Workshops",
                                    description: "Hands-on sessions on cutting-edge Google technologies",
                                    color: "from-blue-500 to-blue-700"
                                },
                                {
                                    icon: <Target />,
                                    title: "Study Jams",
                                    description: "Collaborative learning experiences and certification prep",
                                    color: "from-red-500 to-red-700"
                                },
                                {
                                    icon: <Rocket />,
                                    title: "Hackathons",
                                    description: "24-hour coding competitions to solve real problems",
                                    color: "from-yellow-500 to-yellow-700"
                                }
                            ].map((item, index) => (
                                <div key={index} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    <div className="relative h-full bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="text-white w-7 h-7">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mission Statement */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-red-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
                                </div>
                                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                    To create an inclusive tech community that empowers students to learn, grow, and innovate. We believe in hands-on experience, peer learning, and building solutions that matter.
                                </p>
                                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Through workshops, hackathons, and study groups, we're building the next generation of tech leaders at Haldia Institute of Technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: <Users />,
                                    title: "Community",
                                    description: "Building a supportive network of developers and innovators"
                                },
                                {
                                    icon: <Sparkles />,
                                    title: "Innovation",
                                    description: "Fostering creativity and technological advancement"
                                }
                            ].map((value, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center">
                                                <div className="text-white w-6 h-6">
                                                    {value.icon}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value.title}</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-lg">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUsPage;