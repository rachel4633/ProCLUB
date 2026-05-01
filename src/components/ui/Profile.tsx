import { useState, useEffect } from 'react';

// days of the week for the chart
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// total blocks per day from your schedule
const TOTAL_PER_DAY = 11;

const Profile = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [editingGithub, setEditingGithub] = useState(false);
  const [tempGithub, setTempGithub] = useState('');
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  // get user info from localStorage
  const userRaw = localStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    // load github username from localStorage
    const savedGithub = localStorage.getItem('github_username');
    if (savedGithub) setGithubUsername(savedGithub);

    // load weekly progress data
    // we check localStorage for each day's completed blocks
    const data = DAYS.map((_, i) => {
      const saved = localStorage.getItem(`weekly_progress_day_${i}`);
      return saved ? parseInt(saved) : 0;
    });
    setWeeklyData(data);

    // save today's progress automatically
    const today = new Date().getDay();
    // getDay() returns 0=Sunday 1=Monday etc
    // we convert to Mon=0 format
    const dayIndex = today === 0 ? 6 : today - 1;
    const todayDone = JSON.parse(localStorage.getItem('schedule_done') || '[]');
    localStorage.setItem(`weekly_progress_day_${dayIndex}`, String(todayDone.length));

    // update the chart with today's data
    const updated = [...data];
    updated[dayIndex] = todayDone.length;
    setWeeklyData(updated);
  }, []);

  const saveGithub = () => {
    localStorage.setItem('github_username', tempGithub);
    setGithubUsername(tempGithub);
    setEditingGithub(false);
  };

  const totalDone = weeklyData.reduce((a, b) => a + b, 0);
  const maxBlocks = Math.max(...weeklyData, 1);
  // Math.max finds the highest number in the array
  // we use it to scale the bars proportionally

  return (
    <div className="w-full px-4 py-8 max-w-3xl mx-auto">

      {/* Profile header */}
 <div className="rounded-xl bg-secondary border-l-4 border-l-blue-600 p-6 mb-6">
  <div className="flex items-center gap-4">
    
    {/* Avatar with camera button */}
    <div className="relative">
      <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
        {user?.profile_pic && user.profile_pic !== 'default_avatar.png' ? (
          <img
            src={`https://godchild.alwaysdata.net/static/profile_pics/${user.profile_pic}`}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          user?.username?.charAt(0).toUpperCase() || '?'
        )}
      </div>

      {/* Camera button on top of avatar */}
      <label
        htmlFor="profile-pic-upload"
        className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
        title="Change profile picture"
      >
        {/* camera emoji as icon */}
        <span style={{ fontSize: '12px' }}>📷</span>
      </label>

      {/* hidden file input — triggered by the camera button */}
      <input
        id="profile-pic-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // build form data and send to API
            const formdata = new FormData();
            formdata.append("profile_pic", file);
            formdata.append("email", user?.email);
            // we send email so the API knows which user to update

            try {
              const response = await fetch(
                "https://godchild.alwaysdata.net/api/update_profile_pic",
                { method: "POST", body: formdata }
              );
              const data = await response.json();

              if (data.status === "success") {
                // update localStorage with new profile pic
                const updatedUser = { ...user, profile_pic: data.filename };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                // force page to reload so new pic shows
                window.location.reload();
              }
            } catch (err) {
              console.error("Upload failed", err);
            }
          }
        }}
      />
    </div>

    <div>
      <h2 className="text-xl font-medium text-foreground">{user?.username || 'User'}</h2>
      <p className="text-sm text-muted-foreground">{user?.email || ''}</p>
      {user?.github_username && (
        <p className="text-xs text-muted-foreground">🐙 {user.github_username}</p>
      )}
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
        Pro Club Member
      </span>
    </div>
  </div>
</div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-secondary p-4 text-center">
          <p className="text-2xl font-medium text-foreground">{totalDone}</p>
          <p className="text-xs text-muted-foreground mt-1">Blocks this week</p>
        </div>
        <div className="rounded-xl bg-secondary p-4 text-center">
          <p className="text-2xl font-medium text-foreground">
            {weeklyData.filter(d => d > 0).length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Active days</p>
        </div>
        <div className="rounded-xl bg-secondary p-4 text-center">
          <p className="text-2xl font-medium text-foreground">
            {Math.round((totalDone / (TOTAL_PER_DAY * 7)) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Week completion</p>
        </div>
      </div>

      {/* Weekly progress chart */}
      <div className="rounded-xl bg-secondary border-l-4 border-l-green-600 p-5 mb-6">
        <h3 className="text-sm font-medium text-foreground mb-4">Weekly progress</h3>
        <div className="flex items-end gap-2 h-32">
          {weeklyData.map((count, i) => {
            const height = Math.round((count / maxBlocks) * 100);
            // calculate bar height as a percentage of the tallest bar
            const isToday = (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1) === i;
            return (
              <div key={i} className="flex flex-col items-center flex-1 gap-1">
                <span className="text-xs text-muted-foreground">{count}</span>
                <div className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${height}%`,
                    minHeight: count > 0 ? '8px' : '2px',
                    backgroundColor: isToday ? '#3b82f6' : '#22c55e',
                    // today's bar is blue, other days are green
                  }}
                />
                <span className={`text-xs ${isToday ? 'text-blue-500 font-medium' : 'text-muted-foreground'}`}>
                  {DAYS[i]}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Blocks completed per day this week — blue bar is today
        </p>
      </div>

      {/* GitHub section */}
      <div className="rounded-xl bg-secondary border-l-4 border-l-purple-600 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">GitHub contributions</h3>
          <button
            onClick={() => { setEditingGithub(true); setTempGithub(githubUsername); }}
            className="text-xs text-blue-500 underline"
          >
            {githubUsername ? 'Change username' : 'Add GitHub username'}
          </button>
        </div>

        {/* Edit github username */}
        {editingGithub && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={tempGithub}
              onChange={(e) => setTempGithub(e.target.value)}
              placeholder="your github username"
              className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-border bg-background text-foreground"
            />
            <button onClick={saveGithub} className="text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-lg">
              Save
            </button>
            <button onClick={() => setEditingGithub(false)} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">
              Cancel
            </button>
          </div>
        )}

        {githubUsername ? (
          <div>
            <p className="text-xs text-muted-foreground mb-3">
              @{githubUsername} — contribution activity
            </p>
            {/* embed github heatmap directly — no redirect needed! */}
            <img
              src={`https://ghchart.rshah.org/${githubUsername}`}
              alt={`${githubUsername} GitHub contributions`}
              className="w-full rounded-lg"
              style={{ filter: 'hue-rotate(200deg)' }}
              // hue-rotate shifts the green color to blue to match our app theme
            />
            
              <a href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-500 underline mt-2 block"
            >
              View full GitHub profile →
            </a>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-3">
              Add your GitHub username to see your contribution graph here
            </p>
            
             <a href="https://github.com/signup"
              target="_blank"
              rel="noreferrer"
              className="text-xs bg-purple-100 text-purple-800 px-3 py-1.5 rounded-lg inline-block"
            >
              Don't have GitHub? Create one →
            </a>
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;