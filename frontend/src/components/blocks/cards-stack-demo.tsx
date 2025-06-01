import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"
import Image from "next/image"

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Research and Analysis",
    description:
      "With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences. This informed approach ensures your website stands out and provides an excellent user experience.",
  },
  {
    id: "process-2",
    title: "Wireframing and Prototyping",
    description:
      "We move on to Wireframing and Prototyping, where we create skeletal representations of your website's pages. These visual indigoprints allow us to test and refine the user experience before diving into design.",
  },
  {
    id: "process-3",
    title: "Design Creation",
    description:
      "Now, it's time for the Design Creation phase. Our talented designers bring your vision to life. We focus on aesthetics, ensuring your website not only looks stunning but also aligns perfectly with your brand identity.",
  },
  {
    id: "process-4",
    title: "Development and Testing",
    description:
      "In the Development and Testing phase, our skilled developers turn designs into a fully functional website. Rigorous testing ensures everything works seamlessly, providing an exceptional user experience.",
  },
  {
    id: "process-5",
    title: "Launch and Support",
    description:
      "Our commitment continues beyond launch. We offer post-launch support to address questions, provide assistance, and ensure your website remains updated and optimized. The Website Design Process isn't just about creating a website; it's about crafting a digital experience that resonates, engages, and converts.",
  },
]

const WORK_PROJECTS = [
  {
    id: "work-project-1",
    title: "ChatBot Inteligente E-Commerce",
    description: "Sistema de IA conversacional que transforma la experiencia de compra online mediante GPT-4, aumentando las conversiones y satisfacción del cliente.",
    industry: "E-Commerce",
    releaseDate: "Marzo 2024",
    services: ["AI Chatbot", "GPT-4 Integration", "UI/UX Design", "Development"],
    imageUrl:
      "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "work-project-2",
    title: "Sistema de Análisis Predictivo",
    description: "Plataforma de machine learning que anticipa tendencias de mercado y comportamiento del consumidor usando Claude AI para decisiones estratégicas.",
    industry: "Fintech",
    releaseDate: "Febrero 2024",
    services: ["Machine Learning", "Data Analysis", "API Development", "Claude Integration"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "work-project-3",
    title: "Generador de Contenido IA",
    description: "Herramienta creativa que produce contenido personalizado y optimizado usando Gemini AI, revolucionando los flujos de trabajo de marketing digital.",
    industry: "Marketing",
    releaseDate: "Enero 2024",
    services: ["Content AI", "Gemini Integration", "UI/UX Design", "Web App"],
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

const ACHIEVEMENTS = [
  {
    id: "achivement-1",
    title: "4",
    description: "site of the day",
    bg: "rgb(58,148,118)",
  },
  {
    id: "achivement-2",
    title: "60+",
    description: "website created",
    bg: "rgb(195,97,158)",
  },
  {
    id: "achivement-3",
    title: "5+",
    description: "years of experience",
    bg: "rgb(202,128,53)",
  },
  {
    id: "achivement-4",
    title: "6+",
    description: "component created",
    bg: "rgb(135,95,195)",
  },
]

const Process = () => {
  return (
    <div className="container min-h-svh place-content-center bg-stone-50 px-6 text-stone-900 xl:px-12">
      <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
        <div className="left-0 top-0 md:sticky md:h-svh md:py-12">
          <h5 className=" text-xs uppercase tracking-wide">our process</h5>
          <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight">
            Planning your{" "}
            <span className="text-indigo-500">project development</span> journey
          </h2>
          <p className="max-w-prose text-sm">
            Our journey begins with a deep dive into your vision. In the
            Discovery phase, we engage in meaningful conversations to grasp your
            brand identity, goals, and the essence you want to convey. This
            phase sets the stage for all that follows.
          </p>
        </div>
        <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
          {PROCESS_PHASES.map((phase, index) => (
            <CardSticky
              key={phase.id}
              index={index + 2}
              className="rounded-2xl border p-8 shadow-md backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="my-6 text-2xl font-bold tracking-tighter">
                  {phase.title}
                </h2>
                <h3 className="text-2xl font-bold text-indigo-500">
                  {String(index + 1).padStart(2, "0")}
                </h3>
              </div>

              <p className="text-foreground">{phase.description}</p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </div>
  )
}

const Work = () => {
  return (
    <div className="w-full bg-black py-20">
      {/* Header Section */}
      <div className="max-w-[95vw] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h5 className="text-xs uppercase tracking-wide text-neutral-400 mb-4">Nuestros Proyectos</h5>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Descubre nuestros <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text font-normal">AI Wrappers</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Transformamos modelos de IA complejos en productos comerciales exitosos que impulsan el crecimiento empresarial
          </p>
        </div>
      </div>

      {/* Projects Container */}
      <div className="max-w-[95vw] mx-auto px-4 md:px-6">
        <ContainerScroll className="min-h-[300vh] py-12">
          {WORK_PROJECTS.map((project, index) => (
            <CardSticky
              key={project.id}
              index={index}
              className="w-full mb-8"
              incrementY={80}
              incrementZ={10}
            >
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Project Image */}
                <div className="relative h-[300px] md:h-[600px] overflow-hidden m-4 md:m-6 rounded-xl">
                  {/* Gradient Border Frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-800 to-neutral-600 p-[2px] rounded-xl">
                    <div className="relative h-full w-full rounded-xl overflow-hidden bg-black">
                      <Image
                        className="w-full h-full object-cover"
                        width={1400}
                        height={600}
                        src={project.imageUrl}
                        alt={project.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
                
                {/* Project Information */}
                <div className="p-6 md:p-12">
                  <div className="grid md:grid-cols-4 gap-6 md:gap-8 text-sm">
                    {/* Project Name */}
                    <div>
                      <h4 className="text-neutral-400 uppercase tracking-wide text-xs mb-3">Project Name:</h4>
                      <h3 className="text-white text-xl md:text-3xl font-light leading-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <h4 className="text-neutral-400 uppercase tracking-wide text-xs mb-3">Description</h4>
                      <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Industry & Release Date */}
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <h4 className="text-neutral-400 uppercase tracking-wide text-xs mb-3">Industry:</h4>
                        <p className="text-white text-base md:text-lg font-medium">{project.industry}</p>
                      </div>
                      <div>
                        <h4 className="text-neutral-400 uppercase tracking-wide text-xs mb-3">Release Date:</h4>
                        <p className="text-white text-base md:text-lg font-medium">{project.releaseDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-neutral-800">
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </div>
  )
}

const Achievements = () => {
  return (
    <ContainerScroll className="min-h-[400vh] place-items-center space-y-8 p-12 text-center text-zinc-50">
      {ACHIEVEMENTS.map((achievement, index) => (
        <CardSticky
          key={achievement.id}
          incrementY={20}
          index={index + 2}
          className="flex h-72 w-[420px] flex-col place-content-center justify-evenly rounded-2xl  border border-current p-8 shadow-md"
          style={{ rotate: index + 2, background: achievement.bg }}
        >
          <h1 className="text-left text-6xl font-semibold opacity-80">
            {achievement.title}
          </h1>
          <div className="place-items-end text-right">
            <h3 className="max-w-[10ch] text-wrap  text-4xl font-semibold capitalize tracking-tight">
              {achievement.description}
            </h3>
          </div>
        </CardSticky>
      ))}
    </ContainerScroll>
  )
}

export { Process, Work, Achievements } 