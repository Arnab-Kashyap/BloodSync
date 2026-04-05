const urgencyConfig = {
  critical: { label: 'Critical', color: 'bg-red-50 text-red-600 border-red-200' },
  urgent:   { label: 'Urgent',   color: 'bg-amber-50 text-amber-600 border-amber-200' },
  moderate: { label: 'Moderate', color: 'bg-blue-50 text-blue-600 border-blue-200' },
};

export default function RequestCard({ request }) {
  const urgency = urgencyConfig[request.urgency] || urgencyConfig.urgent;

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date)) / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-red-200 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 border-2 border-red-100 text-red-600 font-bold text-lg px-3 py-1.5 rounded-lg leading-none">
            {request.bloodGroup}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{request.patientName}</div>
            <div className="text-xs text-gray-500">{request.hospital}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${urgency.color}`}>
            {urgency.label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <span>📍 {request.city}, {request.state}</span>
        <span>🩸 {request.units} unit{request.units > 1 ? 's' : ''} needed</span>
        <span>⏰ {timeAgo(request.createdAt)}</span>
      </div>

      {request.message && (
        <p className="text-xs text-gray-500 mb-3 bg-gray-50 rounded-lg px-3 py-2">
          {request.message}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Posted by {request.postedBy?.name}
        </span>
        <a href={`tel:${request.contactPhone}`}
          className="bg-red-600 hover:bg-red-500 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
          Call Now
        </a>
      </div>
    </div>
  );
}