import { useState, useEffect } from 'react';

interface Block { // the rules or guidelines or even a checklist which should be ticked
  time: string;
  title: string;  //This part acts as the blue print listing the type,desc etc of everything in the schedule
  desc: string;
  type: 'routine' | 'workout' | 'coding' | 'class' | 'break' | 'football' | 'sleep';
  // this part tells react what exactly we are working on if we input something different it will complain
  notifyAt: string; // 24hr format "07:30"
  startHour: number;   // the exact hour the block starts as a number e.g 7
  startMinute: number; // the exact minute the block starts as a number e.g 30
  endHour: number;     // the exact hour the block ends as a number e.g 11
  endMinute: number;   // the exact minute the block ends as a number e.g 0
  // we added these 4 so we can do exact time math to know which block is happening RIGHT NOW
  motivation: string;
}

interface Section {
  section: string; // interface section is the same but holds name,range and list of blocks it tells typescript what a block looks like string etc
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
// this part acts as a color legend on a map - coding is blue football is orange sleep is indigo
// instead of writing colors everywhere you just say typeStyles[block.type] and it grabs colors automatically

const sections: Section[] = [
  {
    section: "Morning",
    timeRange: "6:00 – 11:00",
    blocks: [
      { time: "6:00 – 6:30", title: "Wake up & pray", desc: "Wake up, pray and make your bed", type: "routine", notifyAt: "06:00", startHour: 6, startMinute: 0, endHour: 6, endMinute: 30, motivation: "Rise and shine! A great day starts with gratitude 🙏" },
      { time: "6:30 – 7:00", title: "Morning stretch", desc: "Light full body stretch and warmup", type: "workout", notifyAt: "06:30", startHour: 6, startMinute: 30, endHour: 7, endMinute: 0, motivation: "Activate your body — champions warm up before they win 💪" },
      { time: "7:00 – 7:30", title: "Breakfast & freshen up", desc: "Eat a solid breakfast and get ready", type: "routine", notifyAt: "07:00", startHour: 7, startMinute: 0, endHour: 7, endMinute: 30, motivation: "Fuel your body right — you have a big day ahead 🍳" },
      { time: "7:30 – 11:00", title: "Deep coding session 1", desc: "Most important block — deep focus, no distractions", type: "coding", notifyAt: "07:30", startHour: 7, startMinute: 30, endHour: 11, endMinute: 0, motivation: "This is your power hour — lock in and build something great 💻" },
    ],
  },
  {
    section: "Classes",
    timeRange: "11:00 – 14:10",
    blocks: [
      { time: "11:00 – 14:10", title: "Class time", desc: "Attend all classes — stay focused and take notes", type: "class", notifyAt: "11:00", startHour: 11, startMinute: 0, endHour: 14, endMinute: 10, motivation: "Stay sharp in class — every lesson is an investment 📚" },
    ],
  },
  {
    section: "Afternoon",
    timeRange: "14:10 – 17:30",
    blocks: [
      { time: "14:10 – 16:00", title: "Rest & lunch", desc: "Eat lunch, rest and recharge after classes", type: "break", notifyAt: "14:10", startHour: 14, startMinute: 10, endHour: 16, endMinute: 0, motivation: "Rest is productive — recharge so you can finish strong 🍽️" },
      { time: "16:00 – 17:30", title: "Deep coding session 2", desc: "Continue from morning or work on projects", type: "coding", notifyAt: "16:00", startHour: 16, startMinute: 0, endHour: 17, endMinute: 30, motivation: "Second wind! Keep building — progress over perfection 🚀" },
    ],
  },
  {
    section: "Evening",
    timeRange: "17:30 – 22:00",
    blocks: [
      { time: "17:30 – 18:30", title: "Football training", desc: "Indoor football — drills, ball work and fitness", type: "football", notifyAt: "17:30", startHour: 17, startMinute: 30, endHour: 18, endMinute: 30, motivation: "Hit the pitch! Every touch makes you better ⚽" },
      { time: "18:30 – 19:00", title: "Shower & recover", desc: "Freshen up and let your body start recovering", type: "break", notifyAt: "18:30", startHour: 18, startMinute: 30, endHour: 19, endMinute: 0, motivation: "Recovery is part of the grind — take care of your body 🚿" },
      { time: "19:00 – 20:30", title: "Project work & learning", desc: "Work on personal projects or watch learning videos", type: "coding", notifyAt: "19:00", startHour: 19, startMinute: 0, endHour: 20, endMinute: 30, motivation: "Build something the world will use one day 🌍" },
      { time: "20:30 – 21:30", title: "Light coding tasks", desc: "Small tasks, code review and wrap up", type: "coding", notifyAt: "20:30", startHour: 20, startMinute: 30, endHour: 21, endMinute: 30, motivation: "Finish strong — small wins compound into big results ✅" },
      { time: "21:30 – 22:00", title: "Plan tomorrow & journal", desc: "Write tomorrow's plan and reflect on today", type: "routine", notifyAt: "21:30", startHour: 21, startMinute: 30, endHour: 22, endMinute: 0, motivation: "Reflect, plan and be proud of what you did today 📓" },
      { time: "22:00", title: "Sleep", desc: "Rest well — consistency is built through good recovery", type: "sleep", notifyAt: "22:00", startHour: 22, startMinute: 0, endHour: 23, endMinute: 59, motivation: "You earned this rest. See you at 6AM champion 😴" },
    ],
  },
];
// this is just your actual schedule written as data like a spreadsheet in code. No logic just information

const STORAGE_KEY = 'schedule_done';
const DATE_KEY = 'schedule_date';
const NOTIF_KEY = 'notif_enabled'; // new key to remember if notifications were already enabled

const getGridClass = (count: number) => {
  if (count === 1) return 'grid grid-cols-1';
  if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2';
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-3';
  return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
};

// this function checks if a block is happening RIGHT NOW
// it converts everything to total minutes and checks if now falls between start and end
// e.g if its 8:00am = 480 minutes and block starts at 7:30 = 450 and ends at 11:00 = 660
// 480 is between 450 and 660 so this block IS current
const isCurrentBlock = (block: Block) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes(); // e.g 8:15 = 495 minutes
  const startMinutes = block.startHour * 60 + block.startMinute; // e.g 7:30 = 450 minutes
  const endMinutes = block.endHour * 60 + block.endMinute;       // e.g 11:00 = 660 minutes
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  // returns true if now is between start and end — like checking if you are inside a building
};//this is the math machine it looks at the clock on your walls turns the time into min and checks if that
//number fits inside that start and end times of a task

const Schedule = () => {
  const [done, setDone] = useState<string[]>([]);
  const [notifEnabled, setNotifEnabled] = useState(false);

  // new memory box that holds the current time and updates every minute
  // this is what makes the "Now" highlight move automatically as time passes
  const [currentTime, setCurrentTime] = useState(new Date());

  // this runs once when page loads and then every 60 seconds updates the time
  // without this the highlight would never move — it would be stuck on the time you opened the app
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // update current time every 60 seconds
    }, 60000); // 60000 milliseconds = 1 minute
    return () => clearInterval(interval);
    // the return part is like a cleanup crew — when you leave the page it stops the timer
    // without this the timer would keep running forever even after you leave the page
  }, []);

  // Load from localStorage and reset at midnight
  useEffect(() => { // this runs ONCE when page first loads
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(DATE_KEY); // same-day restore your ticks
    const savedDone = localStorage.getItem(STORAGE_KEY);
    const savedNotif = localStorage.getItem(NOTIF_KEY); // check if notifications were already enabled before
    // this part loads saved data

    if (savedDate === today && savedDone) {
      // Same day — restore completed blocks
      setDone(JSON.parse(savedDone));
    } else {
      // New day — reset everything
      localStorage.setItem(DATE_KEY, today); // this ensures even after a refresh whatever was written stays there
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      setDone([]); // runs once when page loads
    }

    // if notifications were already enabled before — restore that state without asking again
    // Notification.permission === 'granted' double checks the browser still allows it
    if (savedNotif === 'true' && Notification.permission === 'granted') {
      setNotifEnabled(true);
      scheduleNotifications(); // reschedule all notifications for today
    }
  }, []); // empty list means only on the first load
  // steps
  // 1. check if today's date matches what's saved
  // 2. same day — restore your completed blocks
  // 3. new day — wipe everything and start fresh
  // 4. check if notifications were on — if yes restore them silently

  // Save to localStorage whenever done changes
  useEffect(() => { // runs EVERY TIME done changes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    // the JSON.stringify part changes the arrays and objects to text since localStorage only understands text
  }, [done]); // watches done specifically

  // Request notification permission
  const enableNotifications = async () => {
    // the await and async means wait for this to finish before moving on — the permission popup will appear
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotifEnabled(true);
      localStorage.setItem(NOTIF_KEY, 'true'); // save that notifications are enabled so we dont ask again
      scheduleNotifications();
    } // this will ask your phone or browser "can we send notifications?"
  };

  // Schedule all notifications
  const scheduleNotifications = () => {
    const allBlocks = sections.flatMap(s => s.blocks);
    // flatMap is like taking multiple boxes of blocks and pouring them all into ONE big box
    // it combines all blocks from all sections into one flat list
    const now = new Date();

    allBlocks.forEach((block) => {
      // we now use startHour and startMinute directly instead of splitting a string
      // this is more reliable and avoids any string parsing errors
      const notifyTime = new Date();
      notifyTime.setHours(block.startHour, block.startMinute, 0, 0);
      const delay = notifyTime.getTime() - now.getTime();
      // setTimeout is like an alarm — "after X milliseconds do this thing"
      // if delay > 0 make sure we set alarm for future times — don't set an alarm for something that already passed!

      if (delay > 0) {
        setTimeout(() => {
          new Notification(`⏰ ${block.title}`, {
            body: block.motivation,
            icon: '/icon-192.png',
          });
        }, delay);
      }
    });
  };
  // this part loops through every block and sets a countdown timer like setting multiple alarms
  // when the time arrives it fires a notification with the title and motivational message

  const toggleDone = (key: string) => {
    setDone(prev =>
      prev.includes(key) // checks if the key is already in the list
        ? prev.filter(d => d !== key) // already done — untick — keeps everything EXCEPT the key
        : [...prev, key] // not done — tick — copies the whole list and adds the new key at the end
      // the ... spread operator is like photocopying a list then writing one more item at the bottom
    );
  };

  const totalBlocks = sections.reduce((acc, s) => acc + s.blocks.length, 0);
  const completed = done.length;
  const percent = Math.round((completed / totalBlocks) * 100);
  // reduce is like a running total machine — it goes through each section and keeps adding up blocks
  // acc is accumulator — the running total. s.blocks.length is how many blocks are in the current section
  // the percentage part does the math to give you the percentage

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-medium text-center mb-1">Today's schedule</h2>

      {/* shows the current live time next to the title so you always know what time it is */}
      <p className="text-sm text-center text-muted-foreground mb-4">
        6:00 AM – 10:00 PM · {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>

      {/* Notification button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={enableNotifications}
          disabled={notifEnabled} // once enabled the button is disabled so you cant click it again
          className={`text-sm px-4 py-2 rounded-lg border transition-colors ${notifEnabled ? 'bg-green-100 text-green-800 border-green-300 cursor-default' : 'border-border text-muted-foreground hover:bg-muted'}`}
        >
          {notifEnabled ? '🔔 Notifications on' : '🔕 Enable notifications'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{completed} of {totalBlocks} blocks done</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
          {/* the green bar just grows wider as percent increases like a loading bar filling up */}
          {/* this div's width equals the percentage — as percent goes up the div gets wider. simple but effective */}
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          // .map() is like a photocopier with a template — you give it a list and a design it makes one copy
          // the map helps to not repeat the section part e.g morning, class, rest
          <div key={section.section} className="w-full">
            {/* the unique name tag for each section */}
            {/* the key prop is like a name tag on each copy — React needs it to know which copy is which */}

            <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-border">
              <h3 className="text-lg font-medium text-foreground">{section.section}</h3>
              <span className="text-xs text-muted-foreground">{section.timeRange}</span>
            </div>

            <div className={`${getGridClass(section.blocks.length)} gap-3`}>
              {section.blocks.map((block) => {
                const key = `${section.section}-${block.time}`;
                const isDone = done.includes(key);
                const style = typeStyles[block.type];
                const isCurrent = isCurrentBlock(block);
                // isCurrent is true if this block is happening right now
                // we use currentTime state so it updates every minute automatically

                return (
                  <div
                    key={key}
                    className={`rounded-xl border-l-4 ${style.border} p-4 flex flex-col justify-between transition-all duration-300
                      ${isDone
                        ? 'opacity-40 bg-secondary'           // done blocks fade out
                        : isCurrent
                          ? 'bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500' // current block glows blue
                          : 'bg-secondary'                    // normal blocks stay grey
                      }`}
                  >
                    {/* the key gives unique name tag for each block */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.badge} ${style.badgeText}`}>
                          {style.label}
                        </span>
                        {/* only show the NOW badge if this block is currently happening */}
                        {isCurrent && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                            Now
                          </span>
                          // animate-pulse makes the NOW badge blink so it catches your eye
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{block.time}</p>
                      <p className="font-medium text-foreground text-sm mb-1">{block.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{block.desc}</p>
                      <p className="text-xs italic text-muted-foreground">"{block.motivation}"</p>
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