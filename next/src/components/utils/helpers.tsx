import {
  FaBrain,
  FaCircleNotch,
  FaRegCheckCircle,
  FaCheckCircle,
  FaStar,
  FaStopCircle,
  FaThumbtack,
} from "react-icons/fa";
import {
  isTask,
  TASK_STATUS_STARTED,
  TASK_STATUS_EXECUTING,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_FINAL,
  MESSAGE_TYPE_GOAL,
  MESSAGE_TYPE_THINKING,
  getTaskStatus,
} from "../../types/agentTypes";

import type { Message } from "../../types/agentTypes";

export const getMessageContainerStyle = (message: Message) => {
  if (!isTask(message)) {
    return "dxm-message dxm-message-" + message.type + " dxm-task-not border-white/10 hover:border-white/40";
  }

  switch (message.status) {
    case TASK_STATUS_STARTED:
      return "dxm-message dxm-task-started border-white/20 hover:border-white/40";
    case TASK_STATUS_EXECUTING:
      return "dxm-message dxm-task-executing border-white/20 hover:border-white/40";
    case TASK_STATUS_COMPLETED:
      return "dxm-message dxm-task-completed border-green-500 hover:border-green-400";
    case TASK_STATUS_FINAL:
      return "dxm-message dxm-task-final border-green-500 hover:border-green-400";
    default:
      return "";
  }
};

export const getTaskStatusIcon = (
  message: Message,
  config: { [key: string]: string | boolean | undefined }
) => {
  const taskStatusIconClass = "mr-1 mb-1 inline-block";
  const { isAgentStopped } = config;

  if (message.type === MESSAGE_TYPE_GOAL) {
    return <FaStar className="text-yellow-300" />;    
  } else if (message.type === MESSAGE_TYPE_THINKING) {
    return <FaBrain className="mt-[0.1em] text-pink-400" />;
  } else if (getTaskStatus(message) === TASK_STATUS_STARTED) {
    return <FaThumbtack className={`${taskStatusIconClass} -rotate-45`} />;
  } else if (getTaskStatus(message) === TASK_STATUS_EXECUTING) {
    return isAgentStopped ? (
      <FaStopCircle className={`${taskStatusIconClass}`} />
    ) : (
      <FaCircleNotch className={`${taskStatusIconClass} animate-spin`} />
    );
  } else if (getTaskStatus(message) === TASK_STATUS_COMPLETED) {
    return (
      <FaRegCheckCircle
        className={`${taskStatusIconClass} text-green-500 hover:text-green-400`}
      />
    );
  } else if (getTaskStatus(message) === TASK_STATUS_FINAL) {
    return (
      <FaCheckCircle
        className={`${taskStatusIconClass} text-green-500 hover:text-green-400`}
      />
    );
  }
};

export const getMessageAvatar = (
  message: Message
) => {
  if (message.type === MESSAGE_TYPE_GOAL) {
    return <svg className="dxm-avatar dxm-avatar1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10537" width="40" height="40"><path d="M0.00001 512.077A511.923 511.923 0 1 0 511.92301 0 511.974 511.974 0 0 0 0.00001 512.077z" fill="#FFFFFF" p-id="10538"></path><path d="M887.49001 857.89c-13.697-71.82-139.895-140.459-253.165-177.96-5.54-1.846-40.014-17.339-18.417-82.798 56.43-57.815 99.214-150.924 99.214-242.597 0-140.82-93.827-214.742-202.891-214.742s-202.635 73.82-202.635 214.742c0 91.98 42.784 185.45 99.317 243.162 22.059 57.712-17.34 79.207-25.65 82.08-107.73 38.834-232.903 107.73-246.702 177.96a511.307 511.307 0 1 1 887.49-346.635 507.87 507.87 0 0 1-136.56 346.788" fill="#B8D4FF" p-id="10539"></path></svg>;
  } else  {
    return <svg className="dxm-avatar dxm-avatar0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2940" width="40" height="40"><path d="M506.942496 517.671629m-428.081563 0a428.081564 428.081564 0 1 0 856.163127 0 428.081564 428.081564 0 1 0-856.163127 0Z" fill="#E3DEFF" p-id="2941"></path><path d="M505.786495 535.372892m-239.25605 0a239.25605 239.25605 0 1 0 478.512101 0 239.25605 239.25605 0 1 0-478.512101 0Z" fill="#FFFFFF" p-id="2942"></path><path d="M505.75037 789.078953a253.742186 253.742186 0 1 1 253.706061-253.706061A254.031186 254.031186 0 0 1 505.75037 789.078953zM505.75037 310.675228a224.842165 224.842165 0 1 0 224.80604 224.842164A225.09504 225.09504 0 0 0 505.75037 310.675228z" fill="#404951" p-id="2943"></path><path d="M519.803006 554.121781m-205.587526 0a205.587526 205.587526 0 1 0 411.175051 0 205.587526 205.587526 0 1 0-411.175051 0Z" fill="#E1D9FF" p-id="2944"></path><path d="M602.709941 572.762295m-87.205813 0a87.205814 87.205814 0 1 0 174.411627 0 87.205814 87.205814 0 1 0-174.411627 0Z" fill="#CBB8FF" p-id="2945"></path><path d="M602.709941 674.418119A101.655824 101.655824 0 1 1 704.438016 572.762295a101.7642 101.7642 0 0 1-101.728075 101.655824z m0-174.411628A72.755803 72.755803 0 1 0 675.537995 572.762295a72.828053 72.828053 0 0 0-72.828054-72.755804z" fill="#404951" p-id="2946"></path><path d="M222.385663 720.044027c-43.711282 0-70.190926-10.837508-79.077683-32.079023-18.423763-44.433783 54.18754-103.245326 118.453962-144.752981l15.714386 24.239893c-95.37007 61.629295-111.987582 98.549072-107.471953 109.45883 3.865378 9.284132 32.187399 21.675016 113.902208 8.597756 72.900303-11.560008 164.910746-39.412404 259.01644-78.499682s178.818881-84.532562 238.425174-127.990969c66.831299-48.732661 78.138432-77.452057 74.30918-86.700064-1.228251-2.962252-8.092006-12.752134-44.506033-14.052635-29.441897-1.011501-70.010301 4.046003-117.261836 14.775136l-6.321879-28.177521c78.391307-17.773513 175.856629-29.333521 194.858392 16.436887 30.164397 72.719678-179.866507 190.848515-328.412615 252.513935-96.16482 39.918154-190.487265 68.63755-265.591195 80.342059a426.925563 426.925563 0 0 1-66.036548 5.888379z" fill="#404951" p-id="2947"></path><path d="M416.84668 519.369505m-44.072532 0a44.072532 44.072532 0 1 0 88.145065 0 44.072532 44.072532 0 1 0-88.145065 0Z" fill="#CBB8FF" p-id="2948"></path><path d="M416.84668 578.000423a58.522543 58.522543 0 1 1 58.522543-58.522543 58.594793 58.594793 0 0 1-58.522543 58.522543z m0-88.145064a29.622522 29.622522 0 1 0 29.622522 29.622521 29.658647 29.658647 0 0 0-29.622522-29.730896z" fill="#404951" p-id="2949"></path></svg>;
  }
};
