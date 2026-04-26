const About = () => {
  const pillars = [
    {
      title: "Discipline",
      desc: "Show up every single day even when motivation is gone. Discipline is what separates those who dream from those who achieve.",
      color: "border-l-blue-600",
      badge: "bg-blue-100",
      badgeText: "text-blue-800",
    },
    {
      title: "Stamina",
      desc: "Physical and mental endurance — the ability to keep going when everything says stop. Built in the gym, on the pitch and at the desk.",
      color: "border-l-green-600",
      badge: "bg-green-100",
      badgeText: "text-green-800",
    },
    {
      title: "Mastery",
      desc: "Becoming a world class full stack developer. Every line of code, every project, every bug fixed is a step closer to mastery.",
      color: "border-l-purple-600",
      badge: "bg-purple-100",
      badgeText: "text-purple-800",
    },
    {
      title: "Football",
      desc: "An indoor footballer pushing limits every session. The game teaches patience, quick thinking and teamwork — skills that go beyond the pitch.",
      color: "border-l-orange-500",
      badge: "bg-orange-100",
      badgeText: "text-orange-800",
    },
    {
      title: "Growth",
      desc: "Every day must be better than yesterday. Growth is not always visible but it is always happening when you stay consistent.",
      color: "border-l-amber-500",
      badge: "bg-amber-100",
      badgeText: "text-amber-800",
    },
    {
      title: "Faith",
      desc: "Rooted in faith — every morning starts with prayer and gratitude. The foundation that holds everything else together.",
      color: "border-l-indigo-600",
      badge: "bg-indigo-100",
      badgeText: "text-indigo-800",
    },
  ];

  return (
    <div className="w-full px-4 py-8">

      {/* Hero */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-medium text-foreground mb-4">
          Building discipline, one day at a time
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          This is my personal hub — a place to track my growth as a developer and footballer.
          No excuses, just progress. Every session logged, every block completed, every goal chased.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="rounded-xl bg-secondary border-l-4 border-l-blue-600 p-6">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">Mission</span>
          <p className="text-foreground text-base leading-relaxed mt-3">
            To become a world class full stack developer while maintaining peak physical fitness
            as an indoor footballer. This hub exists to keep me accountable, structured and
            constantly moving forward — merging technology and sport into one disciplined lifestyle.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-xl font-medium text-foreground text-center mb-6">The pillars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className={`rounded-xl bg-secondary border-l-4 ${pillar.color} p-4`}>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pillar.badge} ${pillar.badgeText}`}>
                {pillar.title}
              </span>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground mb-1">Progress over perfection</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jesus Child. All rights reserved.
        </p>
      </div>

    </div>
  );
};

export default About;