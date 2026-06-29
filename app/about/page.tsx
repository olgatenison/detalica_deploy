import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-zinc-50 text-black">
      <section className="scroll-mt-8 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Subheading className="text-center">About Detailica</Subheading>
          <Heading
            as="h1"
            className="mt-2 text-center max-w-3xl text-balance mx-auto"
          >
            Thoughtful design. Coordinated delivery. Buildable solutions.
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm/6 text-gray-600">
            Detailica is an architectural, structural, and BIM-focused studio
            founded by Alex Dvornychenko and Oksana Kuchura — a structural
            engineer and an architect united by a shared passion for thoughtful,
            well-coordinated buildings.
          </p>

          <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-2">
            <div className="text-center">
              <Image
                width={320}
                height={400}
                src="/s.jpg"
                alt="Alex Dvornychenko"
                className="mx-auto aspect-4/5 w-full max-w-xs object-cover"
              />

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-950">
                  Alex Dvornychenko
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Structural Engineer
                </p>

                <div className="mt-4 space-y-1 text-sm/6 text-gray-600">
                  <p>
                    <a
                      href="mailto:Oleksandr.Dvornychenko@detailica.com"
                      className="hover:text-gray-950"
                    >
                      Oleksandr.Dvornychenko@detailica.com
                    </a>
                  </p>

                  <p>
                    <a href="tel:+37258311129" className="hover:text-gray-950">
                      +372 583 111 29
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Image
                width={320}
                height={400}
                src="/k.jpg"
                alt="Oksana Kuchura"
                className="mx-auto aspect-4/5 w-full max-w-xs object-cover"
              />

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-950">
                  Oksana Kuchura
                </h2>

                <p className="mt-1 text-sm text-gray-600">Architect</p>

                <div className="mt-4 space-y-1 text-sm/6 text-gray-600">
                  <p>
                    <a
                      href="mailto:Oksana.Kuchura@detailica.com"
                      className="hover:text-gray-950"
                    >
                      Oksana.Kuchura@detailica.com
                    </a>
                  </p>

                  <p>
                    <a href="tel:+37258311107" className="hover:text-gray-950">
                      +372 583 111 07
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-20 mb-32 grid max-w-xl gap-y-12 lg:max-w-5xl lg:grid-cols-2 lg:gap-x-16">
            <dl>
              <dt className="text-sm font-semibold">Who We Are</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                We are Detailica — a team built around responsibility, clarity,
                collaboration, and attention to detail. Our work combines
                architectural thinking, structural logic, and BIM-based
                coordination to help projects move from ambitious ideas to
                practical, well-resolved solutions.
              </dd>
            </dl>

            <dl>
              <dt className="text-sm font-semibold">Our Founders</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                Detailica was founded by Alex Dvornychenko, a fourth-generation
                structural engineer, and Oksana Kuchura, an architect passionate
                about creating comfortable, harmonious, and lasting spaces.
                Together, they bring a balanced approach where engineering
                precision and architectural quality support each other from the
                earliest stages of a project.
              </dd>
            </dl>

            <dl>
              <dt className="text-sm font-semibold">Structural Thinking</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                For us, structural design is more than calculations. It is about
                understanding how forces flow through a building, how each
                element works within the whole system, and how the laws of
                physics can be transformed into safe, efficient, and elegant
                structures.
              </dd>
            </dl>

            <dl>
              <dt className="text-sm font-semibold">Architectural Approach</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                We believe that good architecture should not only serve its
                purpose, but also bring comfort, harmony, and long-term value to
                everyday life. Every space should feel considered, functional,
                and connected to the people who use it.
              </dd>
            </dl>

            <dl>
              <dt className="text-sm font-semibold">
                International Experience
              </dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                Together, we bring more than 18 years of professional experience
                gained through projects in different parts of the world. This
                international background has helped us adopt best practices,
                improve coordination workflows, and develop a practical approach
                focused on efficiency and quality.
              </dd>
            </dl>

            <dl>
              <dt className="text-sm font-semibold">BIM Expertise</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                For more than 13 years, BIM has been an essential part of our
                work. We develop highly detailed models and coordinated
                documentation, with levels of development up to LOD 400, helping
                teams reduce errors, improve communication, and support
                smoother, more cost-effective construction.
              </dd>
            </dl>

            <dl>
              <dt className="text-sm font-semibold">How We Work</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                Our process is based on clear communication, careful
                coordination, and respect for every project. We focus on
                understanding the design intent, identifying technical
                challenges early, and delivering documentation that is accurate,
                consistent, and ready to support construction.
              </dd>
            </dl>

            <dl>
              <dt className="text-sm font-semibold">What We Deliver</dt>
              <dd className="mt-4 text-sm/6 text-gray-600">
                Detailica supports architectural, structural, BIM, drafting,
                modeling, and technical documentation workflows. We help design
                teams, developers, contractors, and consultants turn complex
                requirements into coordinated, buildable project information.
              </dd>
            </dl>

            <div className="border-t border-gray-200 pt-8 lg:col-span-2">
              <p className="text-sm/6 text-gray-600">
                We are ready to support your team in turning ambitious and
                technically challenging ideas into well-coordinated, buildable
                solutions.
              </p>

              <p className="mt-4 text-sm font-semibold text-gray-950">
                Let’s bring great projects to life together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Subheading({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={[
        "text-sm font-medium uppercase tracking-[0.22em] text-gray-500",
        className,
      ].join(" ")}
    >
      {children}
    </p>
  );
}

function Heading({
  as: Component = "h2",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Component
      className={[
        "text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl",
        className,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
