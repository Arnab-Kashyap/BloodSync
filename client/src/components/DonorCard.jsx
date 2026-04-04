export default function DonorCard({ donor }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-400';
  };

  const daysSinceLastDonation = donor.lastDonation
    ? Math.floor((new Date() - new Date(donor.lastDonation)) / (1000 * 60 * 60 * 24))
    : null;

  const initials = donor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:border-red-200 transition-all cursor-pointer">
      {/* Avatar */}
      <div className="w-11 h-11 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center font-bold text-red-600 text-sm flex-shrink-0">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 text-sm">{donor.name}</div>
        <div className="text-xs text-gray-500 flex gap-3 mt-0.5 flex-wrap">
          <span>📍 {donor.city}, {donor.state}</span>
          <span>{donor.donationCount} donations</span>
          {daysSinceLastDonation !== null && (
            <span>Last donated {daysSinceLastDonation}d ago</span>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Score bar */}
        <div className="text-right">
          <div className="text-xs text-gray-400 mb-1">Match</div>
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getScoreColor(donor.score)}`}
                style={{ width: `${donor.score}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{donor.score}</span>
          </div>
        </div>

        {/* Availability */}
        <div className="text-center">
          <div className={`text-xs font-medium flex items-center gap-1 ${donor.isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-2 h-2 rounded-full ${donor.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`} />
            {donor.isAvailable ? 'Available' : 'Unavailable'}
          </div>
        </div>

        {/* Blood group badge */}
        <div className="bg-red-50 border border-red-200 text-red-600 font-bold text-lg px-3 py-1.5 rounded-lg leading-none">
          {donor.bloodGroup}
        </div>
      </div>
    </div>
  );
}