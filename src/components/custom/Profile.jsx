import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Link as LinkIcon, Github, Twitter, Briefcase, GraduationCap, Calendar } from "lucide-react";

export function Profile(props) {
    return (
        <div className="p-4 sm:ml-64">
            <Card className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
                <CardHeader className="flex flex-col items-center gap-4 pb-8 border-b sm:flex-row">
                    <Avatar className="w-32 h-32">
                        <AvatarImage src={props.user.profilePicture} alt="profile picture" />
                        <AvatarFallback>{props.user.username}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 text-center sm:text-left">
                        <CardTitle className="text-3xl">{props.user.firstName + " " + props.user.lastName}</CardTitle>
                        <CardDescription className="text-xl">Senior Software Developer</CardDescription>
                        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                            <Badge>React</Badge>
                            <Badge>Node.js</Badge>
                            <Badge>TypeScript</Badge>
                            <Badge>GraphQL</Badge>
                            <Badge>AWS</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="mt-6 space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">About Me</h2>
                        <p className="text-gray-600">{props.user.bio}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Contact Information</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span>{props.user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span>San Francisco, CA</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <LinkIcon className="w-5 h-5 text-gray-400" />
                                <a href="https://janedoe.com" className="text-blue-600 hover:underline">
                                    janedoe.com
                                </a>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Twitter className="w-5 h-5 text-gray-400" />
                                <a href="https://twitter.com/janedoe" className="text-blue-600 hover:underline">
                                    @janedoe
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Work Experience</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Briefcase className="w-5 h-5 mt-1 text-gray-400" />
                                <div>
                                    <h3 className="font-semibold">Senior Software Developer at Tech Innovators Inc.</h3>
                                    <p className="text-gray-600">2018 - Present</p>
                                    <p className="mt-2">
                                        Leading development of cloud-native applications and mentoring junior developers.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Briefcase className="w-5 h-5 mt-1 text-gray-400" />
                                <div>
                                    <h3 className="font-semibold">Software Developer at WebSolutions Co.</h3>
                                    <p className="text-gray-600">2015 - 2018</p>
                                    <p className="mt-2">Developed and maintained various client websites and web applications.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Education</h2>
                        <div className="flex items-start space-x-3">
                            <GraduationCap className="w-5 h-5 mt-1 text-gray-400" />
                            <div>
                                <h3 className="font-semibold">BS in Computer Science</h3>
                                <p className="text-gray-600">University of Technology, 2011 - 2015</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Recent Activity</h2>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">
                                    Contributed to open-source project "WebFramework" - 2 days ago
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-600">Published article "Future of Web Development" - 1 week ago</span>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <Button>Edit Profile</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
