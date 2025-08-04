import {
  ArrowLeft,
  Linkedin,
  Mail,
  Award,
  BookOpen,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
// Placeholder images - replace with actual images when available
const dogImage = "/images/verbiPose.png";
const shayCohenImage = "/images/shay.png";
const loriAzerradImage = "/images/lori.png";

interface LeadershipProps {
  onBack: () => void;
}

export function Leadership({ onBack }: LeadershipProps) {
  return (
    <div className="min-h-screen bg-lavender-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-indigo-100/40"></div>

      {/* Subtle geometric patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
          }}
          className="w-full h-full"
        ></div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-violet-600/10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-700 hover:text-violet-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Site</span>
          </button>
          <div>
            <h1 className="h1">Leadership</h1>
            <p className="lead text-slate-600 mt-2">
              Meet the team dedicated to transforming AAC communication.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="space-y-12">
          {/* Co-founder & CEO Section */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="h2 mb-4">Shay Cohen</h2>
              <p className="lead text-slate-600">
                Leading with experience, empathy, and innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div
                  className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 p-2 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                  style={{
                    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.25)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(99, 102, 241, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(99, 102, 241, 0.25)";
                  }}
                >
                  <img
                    src={shayCohenImage}
                    alt="Shay Cohen"
                    className="w-full h-full rounded-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <p className="text-violet-600 font-medium mb-3">
                  Co-founder & CEO
                </p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/shaycoh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:shay@verbali.io"
                    className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <p className="text-slate-700">
                  Shay Cohen founded Verbali driven by a powerful personal
                  mission. As a father of three, Shay experienced firsthand the
                  struggles of AAC technology through his non-verbal son's daily
                  challenges at home, daycare, and school. He saw how cumbersome
                  interfaces limited meaningful interactions, creating
                  unnecessary barriers instead of bridges to communication.
                </p>
                <p className="text-slate-700">
                  Determined to make a difference, Shay combined his deep
                  industry expertise - over 15 years in tech leadership roles,
                  an electrical engineering background, and an MBA from George
                  Washington University - with his personal understanding of
                  communication challenges. His extensive knowledge of AI
                  technology enabled him to envision innovative solutions
                  tailored specifically for children with special needs and
                  their families.
                </p>
                <p className="text-slate-700">
                  Shay believes deeply that every child deserves the chance to
                  communicate freely.{" "}
                  <em>"Special needs require uniquely special solutions,"</em>{" "}
                  he says,{" "}
                  <em>
                    "and Verbali exists to deliver precisely that - empowering
                    children to express themselves and achieve their fullest
                    potential."
                  </em>
                </p>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">15+ Years</div>
                    <div className="text-xs text-slate-600">
                      Product Leadership
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">2 Patents</div>
                    <div className="text-xs text-slate-600">Innovation</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Parent</div>
                    <div className="text-xs text-slate-600">
                      Personal Mission
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          {/* Co-founder & CTO Section */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center mb-8">
              <h2 className="h2 mb-4">Lori Azerrad</h2>
              <p className="lead text-slate-600">
                Building with precision, purpose, and heart.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div
                  className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 p-2 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                  style={{
                    boxShadow: "0 4px 16px rgba(59, 130, 246, 0.25)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(59, 130, 246, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(59, 130, 246, 0.25)";
                  }}
                >
                  <img
                    src={loriAzerradImage}
                    alt="Lori Azerrad"
                    className="w-full h-full rounded-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <p className="text-blue-600 font-medium mb-3">
                  Co-founder & CTO
                </p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/loriazerrad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:Lori@verbali.io"
                    className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <p className="text-slate-700">
                  Lori Azerrad co-founded Verbali to create technology that
                  meets children where they are - helping them connect, express
                  themselves, and thrive. As a father of three elite-level
                  acrobatic gymnastics athletes - including two U.S. National
                  Champions and one World Championship bronze medalist - Lori
                  understands the compassion, adaptability, and support needed
                  to reach extraordinary goals.
                </p>
                <p className="text-slate-700">
                  Lori holds a BSc in Computer Science and brings over 15 years
                  of engineering leadership experience. He specializes in
                  mobile, TV, AI, and cloud technologies - using creativity and
                  engineering to solve real-world problems in ways that are both
                  practical and transformative. From on-device AI to fully
                  offline communication tools, his work is driven by the belief
                  that technology should empower - not limit - the people who
                  use it.
                </p>
                <p className="text-slate-700">
                  <em>"We didn't set out to build just another AAC app,"</em>{" "}
                  Lori explains.{" "}
                  <em>
                    "We built Verbali to be immediate, natural, and empowering -
                    because communication should never depend on connectivity or
                    complexity."
                  </em>
                </p>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-2xl mx-auto mb-2">🛠</div>
                    <div className="text-sm font-medium">15+ Years</div>
                    <div className="text-xs text-slate-600">
                      Engineering Leadership
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mx-auto mb-2">🤸‍♂️</div>
                    <div className="text-sm font-medium">Father of 3</div>
                    <div className="text-xs text-slate-600">Elite Athletes</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl mx-auto mb-2">📢</div>
                    <div className="text-sm font-medium">Advocate</div>
                    <div className="text-xs text-slate-600">
                      Assistive Technology
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          {/* Chief Robo Officer Section */}
          <motion.section
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h2 className="h2 mb-4">Verbi</h2>
              <p className="lead text-slate-600">
                Bringing joy, companionship, and innovation to every
                interaction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div
                  className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 p-2 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                  style={{
                    boxShadow: "0 4px 16px rgba(20, 184, 166, 0.25)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(20, 184, 166, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(20, 184, 166, 0.25)";
                  }}
                >
                  <img
                    src={dogImage}
                    alt="Verbi the robo-dog"
                    className="w-full h-full rounded-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <p className="text-green-600 font-medium mb-3">
                  Chief Robo Officer
                </p>
                <div className="flex justify-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <span className="text-xs">🐕</span>
                  </div>
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                    <span className="text-xs">🤖</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <p className="text-slate-700">
                  Verbi, our beloved robo-dog mascot, serves as Chief Robo
                  Officer and the heart of Verbali's mission. More than just a
                  mascot, Verbi represents the playful, approachable, and loyal
                  spirit we bring to AAC technology. With an infectious
                  enthusiasm for communication and an unwavering commitment to
                  helping every child find their voice.
                </p>
                <p className="text-slate-700">
                  As CRO, Verbi oversees user experience from a unique
                  perspective - ensuring our technology remains fun, engaging,
                  and emotionally supportive. Verbi's presence in our apps and
                  communications reminds users that AAC can be joyful and that
                  every interaction should feel like connecting with a trusted
                  friend.
                </p>
                <p className="text-slate-700">
                  "Woof! Every bark, every tail wag, every moment of connection
                  matters," says Verbi. "I'm here to make sure technology never
                  loses its heart."
                </p>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mx-auto mb-2">🎾</div>
                    <div className="text-sm font-medium">Always Playful</div>
                    <div className="text-xs text-slate-600">
                      Joy in Every Interaction
                    </div>
                  </div>
                  <div className="text-center p-3 bg-teal-50 rounded-lg">
                    <div className="text-2xl mx-auto mb-2">🤝</div>
                    <div className="text-sm font-medium">Loyal Support</div>
                    <div className="text-xs text-slate-600">Always There</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mx-auto mb-2">💫</div>
                    <div className="text-sm font-medium">Innovation</div>
                    <div className="text-xs text-slate-600">Future Forward</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          {/* Join Our Team */}
          {/* <motion.section
            id="join-our-mission"
            className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="h2 text-white mb-4">Join Our Mission</h2>
            <p className="lead text-white/90 mb-6">
              We're always looking for passionate individuals who share our
              commitment to transforming AAC communication.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-white text-violet-600 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                careers@verbali.io
              </a>
            </div>
          </motion.section> */}
        </div>
      </div>
    </div>
  );
}
