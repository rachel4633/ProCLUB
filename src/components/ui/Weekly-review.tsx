interface Task {
  title: string;
  desc: string;
  youtubeSearch: string;
}

interface Day {
  name: string;
  date: string;
  coding: Task;
  football: Task | null;
  rest: {
    stretches: string[];
    videos: { title: string; youtubeSearch: string }[];
  };
}

const ytLink = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

const days: Day[] = [
  {
    name: "Monday", date: "2026-04-20",
    coding: { title: "Frontend development", desc: "React, Tailwind CSS, UI/UX refinement", youtubeSearch: "React Tailwind CSS tutorial 2026" },
    football: { title: "Ball control drills", desc: "Close control, dribbling in tight indoor spaces", youtubeSearch: "indoor ball control football drills" },
    rest: {
      stretches: ["Hip flexor stretch", "Quad stretch", "Shoulder rolls"],
      videos: [
        { title: "React tutorial", youtubeSearch: "React JS full course beginner 2026" },
        { title: "Ball control tips", youtubeSearch: "football ball control drills beginner" },
      ],
    },
  },
  {
    name: "Tuesday", date: "2026-04-21",
    coding: { title: "Backend & APIs", desc: "Node.js, Python Flask, RESTful API design", youtubeSearch: "Node.js REST API tutorial 2026" },
    football: null,
    rest: {
      stretches: ["Hamstring stretch", "Calf raise stretch", "Neck rolls"],
      videos: [
        { title: "Node.js crash course", youtubeSearch: "Node.js crash course beginner" },
        { title: "Flask API tutorial", youtubeSearch: "Python Flask REST API tutorial" },
      ],
    },
  },
  {
    name: "Wednesday", date: "2026-04-22",
    coding: { title: "Data structures & algorithms", desc: "LeetCode practice, graph & tree algorithms", youtubeSearch: "data structures algorithms tutorial beginner" },
    football: { title: "Footwork exercises", desc: "Agility ladder, quick steps, balance drills", youtubeSearch: "football agility footwork drills indoor" },
    rest: {
      stretches: ["Glute stretch", "Lower back twist", "Chest opener"],
      videos: [
        { title: "DSA full course", youtubeSearch: "data structures algorithms full course" },
        { title: "Agility drills", youtubeSearch: "football agility ladder drills" },
      ],
    },
  },
  {
    name: "Thursday", date: "2026-04-23",
    coding: { title: "System design", desc: "Architecture patterns, scalability, databases", youtubeSearch: "system design tutorial beginner 2026" },
    football: null,
    rest: {
      stretches: ["IT band stretch", "Pigeon pose", "Wrist circles"],
      videos: [
        { title: "System design basics", youtubeSearch: "system design explained beginner" },
        { title: "Database design", youtubeSearch: "database design tutorial beginner" },
      ],
    },
  },
  {
    name: "Friday", date: "2026-04-24",
    coding: { title: "DevOps & tools", desc: "Docker, CI/CD pipelines, Git workflows", youtubeSearch: "Docker CI CD Git tutorial beginner 2026" },
    football: { title: "Juggling practice", desc: "Keepie-uppies, aerial control and focus", youtubeSearch: "football juggling tutorial beginner" },
    rest: {
      stretches: ["Full body forward fold", "Cobra stretch", "Side stretch"],
      videos: [
        { title: "Docker beginner guide", youtubeSearch: "Docker tutorial beginner 2026" },
        { title: "Juggling tutorial", youtubeSearch: "football juggling tips beginner" },
      ],
    },
  },
  {
    name: "Saturday", date: "2026-04-25",
    coding: { title: "Full project day", desc: "Pick a project for the week — full stack, ML or robotics and build it", youtubeSearch: "full stack project tutorial beginner 2026" },
    football: { title: "Wall passing & fitness", desc: "One-touch wall passing, indoor HIIT fitness", youtubeSearch: "indoor football wall passing HIIT fitness" },
    rest: {
      stretches: ["Full body stretch", "Foam roller back", "Hip circles"],
      videos: [
        { title: "Project ideas for developers", youtubeSearch: "full stack project ideas beginners 2026" },
        { title: "HIIT recovery routine", youtubeSearch: "HIIT recovery stretching routine" },
      ],
    },
  },
  {
    name: "Sunday", date: "2026-04-26",
    coding: { title: "Code review & refactoring", desc: "After church 3:00 PM — reviewing PRs, optimizing codebase", youtubeSearch: "code review refactoring tips beginner" },
    football: null,
    rest: {
      stretches: ["Gentle full body stretch", "Meditation breathing", "Neck and shoulder roll"],
      videos: [
        { title: "Code review tips", youtubeSearch: "code review best practices developers" },
        { title: "Mental reset routine", youtubeSearch: "mental reset meditation routine" },
      ],
    },
  },
];

const WeeklyReview = () => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-medium text-center mb-1">Weekly plan</h2>
      <p className="text-sm text-center text-muted-foreground mb-8">YouTube links open search results for each topic.</p>

      <div className="flex flex-col gap-10">
        {days.map((day) => {
          const isToday = day.date === today;
          const isWeekend = day.name === 'Saturday' || day.name === 'Sunday';
          const isSunday = day.name === 'Sunday';

          return (
            <div key={day.date} className="w-full">

              {/* Day heading */}
              <div className={`flex items-center gap-3 mb-4 pb-2 border-b-2 ${isToday ? 'border-green-500' : 'border-border'}`}>
                <h3 className="text-lg font-medium text-foreground">{day.name}</h3>
                <span className="text-xs text-muted-foreground">{day.date}</span>
                {isToday && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Today</span>}
                {isWeekend && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Weekend</span>}
              </div>

              {/* 3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {/* Coding column */}
                <div className="rounded-xl bg-secondary border-l-4 border-l-blue-600 p-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">Coding</span>
                  <p className="font-medium text-foreground mt-2 mb-1">{day.coding.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{day.coding.desc}</p>
                  <a href={ytLink(day.coding.youtubeSearch)} target="_blank" rel="noreferrer" className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg inline-block hover:bg-red-200 transition-colors">
                    Search on YouTube →
                  </a>
                </div>

                {/* Football / Church column */}
                <div className={`rounded-xl bg-secondary border-l-4 p-4 ${isSunday ? 'border-l-purple-600' : 'border-l-green-600'}`}>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isSunday ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                    {isSunday ? 'Church' : day.football ? 'Football' : 'Rest day'}
                  </span>
                  <p className="font-medium text-foreground mt-2 mb-1">
                    {isSunday ? 'Church 10:30 AM — 3:00 PM' : day.football ? day.football.title : 'Physical rest day'}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {isSunday ? 'Worship, rest and recharge for the week ahead' : day.football ? day.football.desc : 'Recovery — let your body recharge'}
                  </p>
                  {day.football && !isSunday && (
                    <a href={ytLink(day.football.youtubeSearch)} target="_blank" rel="noreferrer" className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg inline-block hover:bg-red-200 transition-colors">
                      Search on YouTube →
                    </a>
                  )}
                </div>

                {/* Rest column */}
                <div className="rounded-xl bg-secondary border-l-4 border-l-amber-500 p-4">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">Rest</span>
                  <p className="font-medium text-foreground mt-2 mb-2">Recovery</p>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Stretches:</p>
                  <ul className="text-xs text-muted-foreground mb-3 flex flex-col gap-0.5">
                    {day.rest.stretches.map((s, i) => <li key={i}>— {s}</li>)}
                  </ul>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Watch:</p>
                  <div className="flex flex-col gap-1">
                    {day.rest.videos.map((v, i) => (
                      <a key={i} href={ytLink(v.youtubeSearch)} target="_blank" rel="noreferrer" className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg inline-block hover:bg-red-200 transition-colors">
                        {v.title} →
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyReview;