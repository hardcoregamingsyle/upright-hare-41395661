'use client';

const timelineEvents = [
  {
    year: '1999',
    title: 'Birth',
    description: 'Alexander was born on June 1, 1999.',
  },
  {
    year: '2013',
    title: 'YouTube Beginnings',
    description: 'Created his YouTube channel on October 1, 2013.',
  },
  {
    year: '2019',
    title: 'Minecraft Monday',
    description: 'Rose to prominence through Minecraft Monday tournaments.',
  },
  {
    year: '2020',
    title: 'Dream SMP',
    description: 'Joined the Dream SMP, becoming one of its most iconic members.',
  },
  {
    year: '2021',
    title: '10 Million Subscribers',
    description: 'Reached 10 million subscribers on YouTube.',
  },
  {
    year: '2021',
    title: 'Cancer Diagnosis',
    description: 'Announced his sarcoma diagnosis in a video titled "so i have cancer".',
  },
  {
    year: '2022',
    title: 'The End',
    description: 'Passed away on June 30, 2022. Technoblade never dies.',
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blood" />
      
      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div
            key={event.year}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-crown rounded-full transform -translate-x-1/2 z-10" />
            
            <div className={`ml-12 md:ml-0 md:w-1/2 ${
              index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
            }`}>
              <div className="bg-nether/80 rounded-lg p-6 border border-blood/30">
                <span className="text-crown font-bold text-lg">{event.year}</span>
                <h3 className="text-gold font-display text-xl mt-2">{event.title}</h3>
                <p className="text-gray-300 mt-2">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
