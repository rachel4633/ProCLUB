import { useState } from 'react';

interface Block {
  time: string;
  title: string;
  desc: string;
  type: 'routine' | 'workout' | 'coding' | 'class' | 'break' | 'football' | 'sleep';
}

interface Section {
  section: string;
  timeRange: string;
  blocks: Block[];
}

const typeStyles: Record<string, { border: string; badge: string; badgeText: string; label: string }> = {
  routine:  { border: 'border-l-gray-400',   badge: 'bg-gray-100',   badgeText: 'text-gray-700',   label: 'Routine'  },
  workout:  { border: 'border-l-green-600',  badge: 'bg-green-100',  badgeText: 'text-green-800',  label: 'Workout'  },
  coding:   { border: 'border-l-blue-600',   badge: 'bg-blue-100',   badgeText: 'text-blue-800',   label: 'Coding'   },
  class:    { border: 'border-l-purple-600', badge: 'bg-purple-100', badgeText: 'text-purple-800', label: 'Class'    },
  break:    { border: 'border-l-amber-500',  badge: 'bg-amber-100',  badgeText: 'text-amber-800',  label: 'Break'    },
  football: { border: 'border-l-orange-500', badge: 'bg-orange-100', badgeText: 'text-orange-800', label: 'Football' },
  sleep:    { border: 'border-l-indigo-600', badge: 'bg-indigo-100', badgeText: 'text-indigo-800', label: 'Sleep'    },
};

const sections: Section[] = [
  {
    section: "Morning",
    timeRange: "6:00 – 11:00",
    blocks: [
      { time: "6:00 – 6:30", title: "Wake up & pray", desc: "Wake up, pray and make your bed to start the day right", type: "routine" },
      { time: "6:30 – 7:00", title: "Morning stretch", desc: "Light full body stretch and warmup to activate your muscles", type: "workout" },
      { time: "7:00 – 7:30", title: "Breakfast & freshen up", desc: "Eat a solid breakfast and get ready for the day", type: "routine" },
      { time: "7:30 – 11:00", title: "Deep coding session 1", desc: "Most important block of the day — deep focus, no distractions", type: "coding" },
    ],
  },
  {
    section: "Classes",
    timeRange: "11:00 – 14:10",
    blocks: [
      { time: "11:00 – 14:10", title: "Class time", desc: "Attend all classes — stay focused and take notes", type: "class" },
    ],
  },
  {
    section: "Afternoon",
    timeRange: "14:10 – 17:30",
    blocks: [
      { time: "14:10 – 16:00", title: "Rest & lunch", desc: "Eat lunch, rest and recharge after classes", type: "break" },
      { time: "16:00 – 17:30", title: "Deep coding session 2", desc: "Second coding block — continue from morning or work on projects", type: "coding" },
    ],
  },
  {
    section: "Evening",
    timeRange: "17:30 – 22:00",
    blocks: [
      { time: "17:30 – 18:30", title: "Football training", desc: "Indoor football session — drills, ball work and fitness", type: "football" },
      { time: "18:30 – 19:00", title: "Shower & recover", desc: "Freshen up and let your body start recovering", type: "break" },
      { time: "19:00 – 20:30", title: "Project work & learning", desc: "Work on personal projects or watch learning videos", type: "coding" },
      { time: "20:30 – 21:30", title: "Light coding tasks", desc: "Small tasks, code review and wrap up the day's coding", type: "coding" },
      { time: "21:30 – 22:00", title: "Plan tomorrow & journal", desc: "Write tomorrow's plan and reflect on today", type: "routine" },
      { time: "22:00", title: "Sleep", desc: "Rest well — consistency is built through good recovery", type: "sleep" },
    ],
  },
];

const getGridClass = (count: number) => {
  if (count === 1) return 'grid grid-cols-1';
  if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2';
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-3';
  return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
};

const Schedule = () => {
  const [done, setDone] = useState<string[]>([]);

  const toggleDone = (key: string) => {
    setDone(prev => prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]);
  };

  const totalBlocks = sections.reduce((acc, s) => acc + s.blocks.length, 0);
  const completed = done.length;
  const percent = Math.round((completed / totalBlocks) * 100);

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-medium text-center mb-1">Today's schedule</h2>
      <p className="text-sm text-center text-muted-foreground mb-4">6:00 AM – 10:00 PM daily routine</p>

      {/* Progress bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{completed} of {totalBlocks} blocks done</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <div key={section.section} className="w-full">

            {/* Section heading */}
            <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-border">
              <h3 className="text-lg font-medium text-foreground">{section.section}</h3>
              <span className="text-xs text-muted-foreground">{section.timeRange}</span>
            </div>

            {/* Blocks grid — adapts to number of blocks */}
            <div className={`${getGridClass(section.blocks.length)} gap-3`}>
              {section.blocks.map((block) => {
                const key = `${section.section}-${block.time}`;
                const isDone = done.includes(key);
                const style = typeStyles[block.type];

                return (
                  <div key={key} className={`rounded-xl bg-secondary border-l-4 ${style.border} p-4 flex flex-col justify-between transition-opacity duration-300 ${isDone ? 'opacity-40' : 'opacity-100'}`}>
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.badge} ${style.badgeText}`}>
                        {style.label}
                      </span>
                      <p className="text-xs text-muted-foreground mt-2 mb-1">{block.time}</p>
                      <p className="font-medium text-foreground text-sm mb-1">{block.title}</p>
                      <p className="text-xs text-muted-foreground">{block.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleDone(key)}
                      className={`mt-3 text-xs px-3 py-1.5 rounded-lg border transition-colors ${isDone ? 'bg-green-100 text-green-800 border-green-300' : 'border-border text-muted-foreground hover:bg-muted'}`}
                    >
                      {isDone ? 'Done ✓' : 'Mark done'}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;