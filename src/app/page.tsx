import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, Trophy, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-indigo-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl text-left">
              <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/30 dark:text-blue-300">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-600"></span>
                Enrollment Open for 2026
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
                Advance Your Career with <br />
                <span className="text-blue-600">Expert-Led Education</span>
              </h1>

              <p className="mb-10 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Master in-demand skills in coding, design, and business.
                Join a community of 10,000+ learners achieving their goals with our structured paths and one-on-one mentorship.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/courses"
                  className="group flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-blue-600 px-8 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-zinc-200 bg-white px-8 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  Learn More
                </Link>
              </div>

              {/* Trusted By Section (Social Proof) */}
              <div className="mt-12 border-t border-zinc-100 pt-8 dark:border-zinc-800">
                <p className="mb-4 text-sm font-medium text-zinc-500">Trusted by learners at</p>
                <div className="flex flex-wrap gap-8 opacity-40 grayscale md:gap-12">
                  {["Google", "Amazon", "Meta", "Microsoft", "Netflix"].map((company) => (
                    <span key={company} className="text-base font-bold text-zinc-400 dark:text-zinc-600">{company}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1523240715639-963c6a0c6dad?q=80&w=2070&auto=format&fit=crop"
                  alt="Students collaborating and studying"
                  width={1000}
                  height={1000}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
              </div>

              {/* Floating Cards for extra professional feel */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Industry Recognized</div>
                    <div className="text-xs text-zinc-500">Verified Certificates</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 rounded-2xl bg-white p-4 shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-zinc-200 dark:border-zinc-900" />
                    ))}
                  </div>
                  <div className="text-xs font-bold font-medium leading-none">
                    <span className="text-blue-600 block">10k+ Students</span>
                    <span className="text-zinc-500">Active Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section (Authority) */}
      <section className="bg-blue-600 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { label: "Active Students", value: "15k+" },
              { label: "Expert Mentors", value: "120+" },
              { label: "Course Modules", value: "850+" },
              { label: "Career Transitions", value: "2.5k+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-3xl font-bold sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-blue-100 sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Why Choose LMS Pro?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              We provide a comprehensive learning experience designed for your success.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Structured Curriculum",
                desc: "Follow a step-by-step path designed by industry experts to take you from beginner to pro."
              },
              {
                icon: Users,
                title: "Expert Community",
                desc: "Connect with peers and mentors in our exclusive community to resolve doubts instantly."
              },
              {
                icon: Trophy,
                title: "Recognized Certification",
                desc: "Earn certificates upon completion that are validated and recognized by top employers."
              }
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
