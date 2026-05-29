import { Link } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaVideo,
  FaRobot,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-72 h-screen bg-transparent border-r border-slate-800 p-6 fixed left-0 top-0">
      <h1 className="text-3xl font-bold text-cyan-400 mb-12">
        AETHER
      </h1>

      <div className="flex flex-col gap-5">

    
        <Link
          to="/dashboard"
          className="flex items-center gap-4 bg-slate-800 hover:bg-cyan-500/20 p-4 rounded-xl transition-all"
        >
            
          <FaChartBar />
          Dashboard
        </Link>




        <Link
          to="/tasks"
          className="flex items-center gap-4 hover:bg-cyan-500/20 p-4 rounded-xl transition-all"
        >
          <FaTasks />
          Tasks
        </Link>

        <Link
          to="/meetings"
          className="flex items-center gap-4 hover:bg-cyan-500/20 p-4 rounded-xl transition-all"
        >
          <FaVideo />
          Meetings
        </Link>

        <Link
  to="/ai-assistant"
  className="flex items-center gap-4 hover:bg-cyan-500/20 p-4 rounded-xl transition-all"
>
  <FaRobot />
  AI Assistant
</Link>
      </div>
    </div>
  );
}

export default Sidebar;